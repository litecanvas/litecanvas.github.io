import pako from "pako";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { show, hide, $ } from "./utils";
import demo from "./demo";
import template from "./template";
import customCompletions from "./autocomplete";
import mobileBar from "./mobileBar";

const url = new URL(location.href);
if (url.searchParams.get("reset") !== null) {
  resetStorage();
  window.location = location.origin;
}

let codeFromURL = url.searchParams.get("c");
if (codeFromURL !== null) {
  codeFromURL = decompressString(codeFromURL);
}

const desktopExtensions = [];
const code = $(".code");
const game = $(".game");
const playButton = $("#play");
const stopButton = $("#stop");
const shareButton = $("#share");
const copyButton = $("#copy");
const iframe = $("#frame");
const smallScreen = innerWidth < 1024;
const isMobile = navigator.userAgent.match(/android|iphone|ipad/i) !== null;
let library = null;

fetch("litecanvas.js")
  .then((response) => response.text())
  .then((source) => {
    library = source;
    if (!smallScreen) {
      runCode();
    } else {
      show(playButton);
      hide(game);
    }
  });

playButton.addEventListener("click", () => {
  hide(code);
  show(game);
  hide(playButton);
  show(stopButton);
  runCode();
});

stopButton.addEventListener("click", stopGame);
document.addEventListener("backbutton", stopGame);
function stopGame(evt) {
  evt.preventDefault();
  show(code);
  hide(game);
  show(playButton);
  hide(stopButton);
  iframe.srcdoc = "";
}

shareButton.addEventListener("click", (evt) => {
  if (!navigator.clipboard) {
    return alert(
      "Your browser not support this feature. Consider installing Firefox or Chrome."
    );
  }
  const code = codeEditor.state.doc.toString();
  const url =
    location.origin + "?c=" + encodeURIComponent(compressString(code));

  if (url.length > 2048) {
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
  const code = codeEditor.state.doc.toString();

  navigator.clipboard.writeText(code).then(
    () => {},
    (err) => {
      alert("Error: Unable to generate your shareable url!");
      console.error("Error on copying text to clipboard:", err);
    }
  );
});

function runCode() {
  if (!library) return;
  const code = codeEditor.state.doc.toString();
  let content = template.replace(/{game}/, code);
  content = content.replace(/{library}/, library);
  iframe.srcdoc = content;
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
  doc: codeFromURL || loadFromStorage() || demo(),
  extensions: [
    basicSetup,
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
    javascriptLanguage.data.of({
      autocomplete: customCompletions,
    }),
    EditorView.theme({
      "&": { height: "100%" },
      ".cm-scroller": { overflow: "auto" },
    }),
    EditorView.lineWrapping,
    ...desktopExtensions,
  ],
});

window.codeEditor = new EditorView({
  state,
  parent: $(".code"),
});

function compressString(str) {
  return btoa(String.fromCharCode.apply(null, Array.from(pako.deflate(str))));
}

function decompressString(str) {
  return pako.inflate(
    new Uint8Array(
      atob(str)
        .split("")
        .map((c) => c.charCodeAt(0))
    ),
    { to: "string" }
  );
}

// autosave
const autosave = 5000; // 5 seconds
setInterval(() => {
  localStorage.setItem("litecanvas_code", codeEditor.state.doc.toString());
}, autosave);

function loadFromStorage() {
  return localStorage.getItem("litecanvas_code");
}

function resetStorage() {
  localStorage.clear();
}

if (isMobile) {
  mobileBar(codeEditor);
}

window.isUpdateAvailable = new Promise(function (resolve) {
  if (
    "serviceWorker" in navigator &&
    location.hostname.indexOf("127.0.0") === -1
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
