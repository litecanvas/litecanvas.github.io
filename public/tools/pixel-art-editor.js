const ctx = art.getContext("2d");
const $ = (selector) => document.querySelector(selector);
// color palette
const colors = [
  "#111",
  "#6a7799",
  "#aec2c2",
  "#FFF1E8",

  "#e83b3b",
  "#fabc20",
  "#155fd9",
  "#3cbcfc",

  "#327345",
  "#63c64d",
  "#6c2c1f",
  "#ac7c00",
];
// local storage wrapper
const storage = {
  prefix: "litepixel_",
  getItem(key) {
    return localStorage.getItem(this.prefix + key);
  },
  setItem(key, value) {
    return localStorage.setItem(this.prefix + key, value);
  },
};

/** @type HTMLElement */
let selected = null,
  currentColor = 0,
  W,
  H,
  ps,
  dirty = false,
  firstPaint = true,
  pixels;

// Restore from user's local storage
width.value = ~~storage.getItem("width") || 8;
height.value = ~~storage.getItem("height") || 8;
pixelSize.value = ~~storage.getItem("ps") || "";

if (!pixelSize.value) {
  pixelSize.value = innerWidth < 800 ? 36 : 24;
}

try {
  json = storage.getItem("pixels");
  pixels = json ? JSON.parse(json) : pixels;
  pixels = Array.isArray(pixels) ? pixels : [];
} catch (error) {
  console.error(error);
}

// Setup canvas
function prepare() {
  pixels = pixels || [];
  ps = ~~pixelSize.value || 1;
  W = ~~width.value || 1;
  H = ~~height.value || 1;

  art.width = W * ps;
  art.height = H * ps;

  for (let i = 0; i < W; i++) {
    pixels[i] = pixels[i] || [];
  }

  art.style.backgroundPosition = `0 0, ${ps}px ${ps}px`;
  art.style.backgroundSize = `${2 * ps}px ${2 * ps}px`;

  exported.value = "";
  copy.disabled = true;
}

// setup controls
pixelSize.onchange =
  pixelSize.oninput =
  width.onchange =
  width.oninput =
  height.onchange =
  height.oninput =
    prepare;

function renderPixels(ctx) {
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      const color = getPixel(x, y);
      if (-1 === color) {
        ctx.clearRect(x * ps, y * ps, ps, ps);
      } else {
        const c = color % colors.length;
        ctx.fillStyle = colors[c];
        ctx.fillRect(x * ps, y * ps, ps, ps);
      }
    }
  }
  once = false;
}

function renderArt() {
  requestAnimationFrame(renderArt);
  renderPixels(ctx);
  saveArt();
  dirty = false;
}

// Trace
let holding = false;

art["onmousedown"] = art["ontouchstart"] = function (evt) {
  if (evt.target !== art) return;
  evt.preventDefault();
  holding = true;
  trace(evt, true);
};

art["onmousemove"] = art["ontouchmove"] = function (evt) {
  if (evt.target !== art) return;
  evt.preventDefault();
  if (holding) {
    trace(evt);
  }
};

window["onmouseup"] = window["ontouchend"] = function (evt) {
  if (evt.target !== art) return;
  evt.preventDefault();
  holding = false;
};

function trace(evt, tapped = false) {
  let [pageX, pageY] = getPageXY(evt);
  if (undefined === pageX || undefined === pageY) return;

  const x = ~~(Math.floor(pageX - art.offsetLeft) / ps),
    y = ~~(Math.floor(pageY - art.offsetTop) / ps);

  switch (paintTool.value) {
    case "pencil":
      setPixel(x, y, ~~currentColor);
      break;
    case "bucket":
      if (tapped) bucketFill(x, y, ~~currentColor);
      break;
    default:
      break;
  }
}

function bucketFill(fromX, fromY, color) {
  if (null == fromX || null == fromY) return;

  const fromcolor = getPixel(fromX, fromY);

  if (fromcolor === color) return;

  const search = [];

  search.push([fromX, fromY]);

  while (search.length > 0) {
    const [x, y] = search.pop();

    if (x < 0 || x >= W || y < 0 || y >= H || getPixel(x, y) !== fromcolor) {
      continue;
    }

    setPixel(x, y, color);
    search.push([x + 1, y]);
    search.push([x - 1, y]);
    search.push([x, y + 1]);
    search.push([x, y - 1]);
  }
}

function getPageXY(evt) {
  return event.touches
    ? [event.touches[0].pageX, event.touches[0].pageY]
    : [event.pageX, event.pageY];
}

function setPixel(x, y, color) {
  if (null == x || null == y || x < 0 || x >= W || y < 0 || y >= H) {
    return;
  }
  pixels[x][y] = color;
  dirty = true;
}

function getPixel(x, y) {
  if (null == x || null == y || x < 0 || x >= W || y < 0 || y >= H) {
    return -1;
  }
  const color = pixels[x][y] == null ? -1 : Number(pixels[x][y]);
  if (Number.isNaN(color) || !Number.isFinite(color) || color < 0) {
    return -1;
  }
  return color;
}

/**
 * @param {number} colorindex
 * @param {HTMLElement} [element]
 */
function setCurrentColor(colorindex, element) {
  currentColor = ~~colorindex;
  if (selected) {
    selected.classList.remove("selected");
  }
  if (element) {
    selected = element;
    selected.classList.add("selected");
  }
}

// Hotkeys
window.onkeypress = (evt) => {
  if ("INPUT" === evt.target.tagName) return;

  evt.preventDefault();

  const num = " " === evt.key ? 0 : parseInt(evt.key, 16);

  if (num >= 0 && num + 1 <= colors.length) {
    const el = $(`[data-color="${num}"]`);
    setCurrentColor(num, el);
  } else {
    switch (evt.key.toLowerCase()) {
      case "x":
        const el = $(`[data-color="-1"]`);
        setCurrentColor(-1, el);
        break;
      case "p":
        paintTool.value = "pencil";
        break;
      case "u":
        paintTool.value = "bucket";
        break;
    }
  }
};

// Reset
clearButton.onclick = () => {
  if (
    confirm(
      "Are you sure you want to erase the canvas? This action cannot be undone."
    )
  ) {
    pixels.length = 0;
    storage.setItem("pixels", pixels);
    prepare();
    ctx.clearRect(0, 0, W * ps, H * ps);
  }
};

// Export
exportButton.onclick = function () {
  let output = "";
  const _pixels = [];

  output += `const renameThisVar = paint(${W}, ${H}, [\n`;

  for (let y = 0; y < H; y++) {
    output += "  '";
    for (let x = 0; x < W; x++) {
      let color = getPixel(x, y);
      if (-1 === ~~color) color = ".";
      output += color >= 0 ? (color % colors.length).toString(16) : color;
      _pixels.push(color === "." ? "#" : color);
    }
    output += "',\n";
  }

  output += "], {\n  scale: 1\n})";

  const importCode = `Art Code: ${W}x${H}/${_pixels.join(" ")}`;
  output = `// ${importCode}\n` + output;

  exported.value = output;

  copy.disabled = false;
};

// Import
importButton.onclick = (ev) => {
  const importCode = prompt("Paste the Art Code here:");
  let [_size, _pixels] = importCode.replace("//", "").split("/");

  // validate the dimensions
  _size = _size
    .replace(/[^0-9]/g, " ")
    .trim()
    .split(" ");

  if (_size.length !== 2) {
    alert("Invalid size: " + _size.join(" x "));
    console.error("Invalid art size: " + _size);
    return;
  } else {
    _size[0] = _size[0] < 1 ? 8 : ~~_size[0];
    _size[1] = _size[1] < 1 ? 8 : ~~_size[1];
  }

  // validate the pixels
  _pixels = _pixels.trim().replace(/\#/g, ".").split(" ");

  if (_pixels.length !== _size[0] * _size[1]) {
    alert("Invalid amount of pixels");
    return;
  }

  console.log(
    "importing... size:",
    _size.join("x"),
    "colors:",
    _pixels.join(" ")
  );

  // reset the canvas
  width.value = _size[0];
  height.value = _size[1];
  pixels.length = 0;
  prepare();

  // set the pixels
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * H + x;
      const color = _pixels[i];
      setPixel(x, y, "." === color ? null : ~~color);
    }
  }
};

// Download
downloadButton.onclick = (ev) => {
  const offcanvas = new OffscreenCanvas(art.width, art.height);
  const toBlob = offcanvas.toBlob ? "toBlob" : "convertToBlob";

  renderPixels(offcanvas.getContext("2d"));

  offcanvas[toBlob]().then((blob) => {
    const link = document.createElement("a");
    link.download = "pixelart.png";
    link.href = URL.createObjectURL(blob);
    link.click();
  });
};

// Copy to clipboard
copy.onclick = () => {
  if (!navigator.clipboard) {
    return alert(
      "Your browser not support this feature. Consider installing Firefox or Chrome."
    );
  }
  if (!exported.value) return;

  const code = exported.value;

  exported.select();

  copy.disabled = true;

  navigator.clipboard.writeText(code).then(
    () => {
      copy.textContent = "copied";
    },
    (err) => {
      alert("Error: Unable to generate your shareable url!");
      console.error("Error on copying text to clipboard:", err);
    }
  );

  setTimeout(() => {
    copy.textContent = "copy";
    copy.disabled = false;
  }, 600);
};

// Save in local storage
function saveArt() {
  storage.setItem("width", W);
  storage.setItem("height", H);
  storage.setItem("pixels", JSON.stringify(pixels));
  storage.setItem("ps", ps);
}

window.addEventListener("beforeunload", (evt) => {
  if (dirty) {
    evt.preventDefault();
    evt.returnValue = true;
  }
});

// Setup color palette
for (let i = 0; i < colors.length; i++) {
  let color = colors[i];
  const el = document.createElement("label");
  el.dataset.color = i;
  el.innerHTML = `<span style="background:${color}">${i.toString(16)}</span>`;
  palette.appendChild(el);
  el.title = "Select color #" + i;
  if (i === 0) {
    setCurrentColor(0, el);
  } else if (i + 1 === colors.length) {
    const eraser = document.createElement("label");
    eraser.dataset.color = -1;
    eraser.innerHTML = `<span style="background:#fff;font-size: 26px;color: #c92a2a;">&times;</span>`;
    eraser.title = "Select the pixel eraser";
    palette.appendChild(eraser);
  }
}

palette.onclick = (evt) => {
  const target = evt.target;
  let label = null;
  if ("SPAN" === target.tagName) {
    label = target.parentNode;
  }
  if ("LABEL" === target.tagName) {
    label = target;
  }
  if (label) {
    setCurrentColor(label.dataset.color, label);
  }
};

// Init
prepare();
requestAnimationFrame(renderArt);
