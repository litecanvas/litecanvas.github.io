import pako from "pako";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { keymap, scrollPastEnd } from "@codemirror/view";
import {
  javascript,
  javascriptLanguage,
  esLint,
} from "@codemirror/lang-javascript";
import { linter, lintGutter } from "@codemirror/lint";
import { indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import * as eslint from "eslint-linter-browserify";

import editorSetup from "./editorSetup";
import { show, hide, $ } from "./utils";
import demo from "./demo";
import customCompletions from "./completions";
import mobileBar from "./mobileBar";

const config = {
  autosave: true,
  autosaveInterval: 5000,
  codeChanged: false,
};

const url = new URL(location.href);
if (url.searchParams.get("reset") !== null) {
  resetStorage();
  window.location = location.origin;
}

const autoplay = !["0", "false"].includes(url.searchParams.get("autoplay"));
let blank = url.searchParams.get("blank") != null;

let codeFromURL = url.searchParams.get("c");
if (codeFromURL !== null) {
  codeFromURL = decompressString(codeFromURL);
  // url.searchParams.delete("c");
  // history.pushState({}, "", url);
  if (codeFromURL) {
    config.autosave = false;
    $("#changing-shared-code").style.display = "";
    blank = false;
  }
}

document.addEventListener("visibilitychange", function () {
  // fires when user switches tabs, apps, goes to homescreen, etc.
  if (document.visibilityState === "hidden" && config.autosave) {
    saveCode();
  }
});

window.addEventListener("beforeunload", (evt) => {
  if (!config.autosave) {
    evt.preventDefault();
    evt.returnValue = true;
  }
});

const desktopExtensions = [];
const code = $(".code");
const game = $(".game");
const playButton = $("#play");
const stopButton = $("#stop");
const shareButton = $("#share");
const copyButton = $("#copy");
const hideEditor = $("#hide-editor");

const smallScreen = innerWidth < 1024;
const isMobile = navigator.userAgent.match(/android|iphone|ipad/i) !== null;

playButton.addEventListener("click", () => {
  hide(code);
  show(game);
  hide(playButton);
  show(stopButton);
  runCode();
  if (smallScreen) {
    getIframe().focus();
  }
});

stopButton.addEventListener("click", stopGame);
document.addEventListener("backbutton", stopGame);
function stopGame(evt) {
  evt.preventDefault();
  show(code);
  hide(game);
  show(playButton);
  hide(stopButton);
  getIframe().remove();
}

shareButton.addEventListener("click", (evt) => {
  if (!navigator.clipboard) {
    return alert(
      "Your browser not support this feature. Consider installing Firefox or Chrome."
    );
  }
  const code = window.codeEditor.state.doc.toString();
  const url =
    location.origin + "?c=" + encodeURIComponent(compressString(code));

  if (url.length > 2000) {
    console.log("Your too long URL:", url);
    return alert("Code too long to encode in URL");
  }

  navigator.clipboard.writeText(url).then(
    () => {
      alert("Your shareable url was copied to clipboard!");
    },
    (err) => {
      alert("Error: Unable to generate your shareable url!");
      console.error("Error on copying text to clipboard:", err);
    }
  );
});

copyButton.addEventListener("click", (evt) => {
  if (!navigator.clipboard) {
    return alert(
      "Your browser not support this feature. Consider installing Firefox or Chrome."
    );
  }
  const code = window.codeEditor.state.doc.toString();

  navigator.clipboard.writeText(code).then(
    () => {},
    (err) => {
      alert("Error: Unable to generate your shareable url!");
      console.error("Error on copying text to clipboard:", err);
    }
  );
});

hideEditor.addEventListener("click", (evt) => {
  if (code.hasAttribute("hidden")) {
    code.removeAttribute("hidden");
    hideEditor.classList.remove("active");
  } else {
    code.setAttribute("hidden", true);
    hideEditor.classList.add("active");
  }
  getIframe().focus();
});

function runCode() {
  const iframe = getIframe();
  iframe.src = "preview.html"; // reload the iframe
  if (!iframe.onload) {
    iframe.onload = loadCode;
  }
}

function loadCode() {
  const code = window.codeEditor.state.doc.toString();
  getIframe().contentDocument.querySelector("#code").innerHTML = code;
}

/**
 * @returns {HTMLIFrameElement}
 */
function getIframe() {
  const ID = "frame";
  let iframe = $("#" + ID);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = ID;
    iframe.setAttribute("frameborder", "0");
    game.appendChild(iframe);
  }
  return iframe;
}

if (!smallScreen) {
  let updateTimeout = 0;
  const delay = 1000;
  function previewChanges(update) {
    if (update.docChanged) {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
        updateTimeout = 0;
      }
      updateTimeout = setTimeout(runCode, delay);
    }
  }
  desktopExtensions.push(EditorView.updateListener.of(previewChanges));
}

const state = EditorState.create({
  doc: codeFromURL || (blank ? "" : loadFromStorage() || demo()),
  extensions: [
    editorSetup(),
    // Ctrl+S to run the code
    keymap.of([
      indentWithTab,
      {
        key: "Ctrl-s",
        run() {
          runCode();
          return true;
        },
      },
    ]),
    oneDark,
    javascript(),
    lintGutter(),
    linter(
      esLint(new eslint.Linter(), {
        // eslint configuration
        languageOptions: {
          ecmaVersion: "latest",
          sourceType: "script",
        },
        rules: {},
      })
    ),
    javascriptLanguage.data.of({
      autocomplete: customCompletions,
    }),
    EditorView.theme({
      "&": { height: "100%", fontSize: smallScreen ? "16px" : "18px" },
      ".cm-scroller": { overflow: "auto" },
    }),
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) config.codeChanged = true;
    }),
    scrollPastEnd(),
    ...desktopExtensions,
  ],
});

window.codeEditor = new EditorView({
  state,
  parent: $(".code .cm-container"),
});

window.addEventListener("click", (evt) => {
  if (evt.target === playButton) return;
  if (evt.target === hideEditor) return;
  getIframe().blur();
});

window.addEventListener("blur", (evt) => {
  getIframe().blur();
});

function compressString(str) {
  return btoa(String.fromCharCode.apply(null, Array.from(pako.deflate(str))));
}

function decompressString(str) {
  let code = null;
  let attempts = 0;

  while (attempts < 2) {
    try {
      if (attempts === 1) {
        // try a second time fixing some characters
        str = decodeURIComponent(str);
        str = str.replace(/ /g, "+");
      }

      // decode
      code = pako.inflate(
        new Uint8Array(
          atob(str)
            .split("")
            .map((c) => c.charCodeAt(0))
        ),
        { to: "string" }
      );
      console.log("Playground url decoded successfully!");
      break;
    } catch (e) {
      console.error(
        `Failed decode the playground url (${attempts + 1}/2). Error:`,
        e
      );
      console.log("Trying to decode again (fixing some characters)...");
      code = null;
      attempts++;
    }
  }

  if (!code) {
    alert("Invalid playground url.");
  }

  return code;
}

// autosave
if (config.autosave) {
  setInterval(() => {
    if ("visible" !== document.visibilityState) return;
    saveCode();
  }, config.autosaveInterval);
}

function saveCode() {
  localStorage.setItem(
    "litecanvas_code",
    window.codeEditor.state.doc.toString()
  );
}

function loadFromStorage() {
  return localStorage.getItem("litecanvas_code");
}

function resetStorage() {
  localStorage.clear();
}

if (isMobile) {
  mobileBar(window.codeEditor);
}

window.isUpdateAvailable = new Promise(function (resolve) {
  if (
    url.searchParams.get("test_service_worker") === "on" ||
    ("serviceWorker" in navigator &&
      location.hostname.indexOf("127.0.0") === -1)
  ) {
    // register service worker file
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  resolve(true);
                } else {
                  resolve(false);
                }
                break;
            }
          };
        };
      })
      .catch((err) => console.error("[SW ERROR]", err));

    navigator.serviceWorker.ready.then((reg) => {
      reg.active.postMessage({ type: "GET_VERSION" });
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      const type = event.data.type;
      if ("GET_VERSION" === type) {
        console.log("litecanvas playground version:", event.data.res);
      }
    });
  }
});

window.isUpdateAvailable.then((isAvailable) => {
  if (!isAvailable) return;
  alert("New Update available! Reload the webapp to see the latest changes.");
});

if (!smallScreen) {
  show(hideEditor);
  if (autoplay) runCode();
} else {
  show(playButton);
  hide(game);
}
