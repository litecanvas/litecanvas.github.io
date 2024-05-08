(() => {
  // src/zzfx.js
  var zzfxX = new AudioContext();
  zzfxV = 0.1;
  zzfx = (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, M = Math, R = 44100, d = 2 * M.PI, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, x, h) => {
    e = R * e + 9;
    m *= R;
    r *= R;
    t *= R;
    c *= R;
    y *= 500 * d / R ** 3;
    A *= d / R;
    v *= d / R;
    z *= R;
    l = R * l | 0;
    for (h = e + m + r + t + c | 0; a < h; k[a++] = f)
      ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? M.sin((g % d) ** 3) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : M.sin(g), f = (l ? 1 - B + B * M.sin(d * a / l) : 1) * (0 < f ? 1 : -1) * M.abs(f) ** D * zzfxV * p * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2) : f), x = (b += u += y) * M.cos(A * H++), g += x - x * E * (1 - 1e9 * (M.sin(a) + 1) % 2), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1);
    p = zzfxX.createBuffer(1, h, R);
    p.getChannelData(0).set(k);
    b = zzfxX.createBufferSource();
    b.buffer = p;
    b.connect(zzfxX.destination);
    b.start();
    return b;
  };

  // src/colors.js
  var colors = [
    // 0 - black
    "#1a1c2c",
    // 1 - blue
    "#29366f",
    // 2 - gray
    "#94b0c2",
    // 3 - white
    "#f4f4f4",
    // 4 - red
    "#b13e53",
    // 5 - yellow
    "#ffcd75",
    // 6 - green
    "#38b764",
    // 7 - lime
    "#a7f070"
  ];

  // src/sounds.js
  var sounds = [
    // 0 - pickup
    [1, 0, 1943, 0.01, 0.03, , 1, 1.83, , 0.8, -628, 0.06, , , , , , 0.59, 0.05, 0.16],
    // 1 - jump
    [1, 0, 152, 0.01, 0.07, 0.06, 1, 1.21, -16, , , , , , , , , 0.62, 0.03],
    // 2 - falling
    [1, 0, 468, 0.02, 0.22, 0.45, 1, 0.84, , 5.6, -37, 0.05, 0.09, , , , , 0.8, 0.27, 0.05],
    // 3 - warning
    [2, 0, 104, 0.07, 0.16, 0.23, , 1.97, 24, -24, , , 0.03, , , , , , 0.24, 0.31],
    // 4 - powerup
    [1, 0, 364, 0.02, 0.22, 0.45, , 1.58, , -3, 179, 0.13, 0.08, , , 0.1, , 0.83, 0.12],
    // 5 - hit
    [1, 0, 816, , 0.01, 0, , 0.56, , 63, 887, , , , -0.6, , , , 0.01],
    // 6 - explosion
    [2.75, 0, 328, 0.03, 0.26, 0.4, 4, 1.09, 0.5, 0.1, , , , 0.5, , 0.3, 0.33, 0.43, 0.05, 0.45],
    // 7 - shoot
    [1, 0, 234, , 0.08, 0.08, 3, 1.13, -3, , , , , , , , 0.11, 0.52, 0.04]
  ];

  // src/index.js
  function litecanvas(settings = {}) {
    const root = window, body = document.body, math = Math, PI = math.PI, TWO_PI = PI * 2, on = (elem, evt, callback) => elem.addEventListener(evt, callback), off = (elem, evt, callback) => elem.removeEventListener(evt, callback), time = () => performance.now(), NULL = null, defaults = {
      fps: 60,
      fullscreen: true,
      width: NULL,
      height: NULL,
      autoscale: true,
      pixelart: false,
      antialias: true,
      background: NULL,
      canvas: NULL,
      global: true,
      tappingInterval: true,
      tapEvents: true,
      loop: NULL
    };
    settings = Object.assign(defaults, settings);
    let _initialized = false, _plugins = [], _canvas = settings.canvas || document.createElement("canvas"), _fullscreen = settings.fullscreen, _autoscale = settings.autoscale, _bg = settings.background, _hasMouse = matchMedia("(pointer:fine)").matches, _tappingHandler, _scale = 1, _offsetTop = 0, _offsetLeft = 0, _ctx, _lastFrame, _step = 1 / settings.fps, _stepMs = _step * 1e3, _accumulated = 0, _rafid, _drawCount = 0, _drawTime = 0, _fontFamily = "sans-serif", _fontStyle = "", _fontSize = 32, _textAlign = "start", _textBaseline = "top", _loop = {
      /** @type {function[]} */
      init: [],
      /** @type {function[]} */
      update: [],
      /** @type {function[]} */
      draw: [],
      /** @type {function[]} */
      resized: []
    }, _helpers = {
      settings: Object.assign({}, settings),
      colors,
      sounds
    };
    const instance = {
      /** @type {number} */
      WIDTH: settings.width,
      /** @type {number} */
      HEIGHT: settings.height || settings.width,
      /** @type {HTMLCanvasElement} */
      CANVAS: NULL,
      /** @type {boolean} */
      TAPPED: false,
      /** @type {boolean} */
      TAPPING: false,
      /** @type {number} */
      TAPX: 0,
      /** @type {number} */
      TAPY: 0,
      /** @type {number} */
      ELAPSED: 0,
      /** @type {number} */
      FPS: settings.fps,
      /** @type {number} */
      DT: _step,
      /** @type {number} */
      CENTERX: 0,
      /** @type {number} */
      CENTERY: 0,
      /**
       * The value of the mathematical constant PI (π).
       * Approximately 3.14159
       *
       * @type {number}
       */
      PI,
      /**
       * Twice the value of the mathematical constant PI (π).
       * Approximately 6.28318
       *
       * Note: TWO_PI radians equals 360º, PI radians equals 180º,
       * HALF_PI radians equals 90º, and HALF_PI/2 radians equals 45º.
       *
       * @type {number}
       */
      TWO_PI,
      /**
       * Half the value of the mathematical constant PI (π).
       * Approximately 1.57079
       *
       * @type {number}
       */
      HALF_PI: PI * 0.5,
      /**
       * Calculates a linear (interpolation) value over t%.
       *
       * @param {number} start
       * @param {number} end
       * @param {number} t The progress in percentage, where 0 = 0% and 1 = 100%.
       * @returns {number} The unterpolated value
       * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
       */
      lerp: (start, end, t) => start + t * (end - start),
      /**
       * Convert degrees to radians
       *
       * @param {number} degs
       * @returns {number} the value in radians
       */
      deg2rad: (degs) => PI / 180 * degs,
      /**
       * Convert radians to degrees
       *
       * @param {number} rads
       * @returns {number} the value in degrees
       */
      rad2deg: (rads) => 180 / PI * rads,
      /**
       * Constrains a number between a minimum and maximum value.
       *
       * @param {number} value
       * @param {number} min
       * @param {number} max
       * @returns {number}
       */
      clamp: (value, min, max) => math.min(math.max(value, min), max),
      /**
       * Re-maps a number from one range to another.
       *
       * @param {number} value  the value to be remapped.
       * @param {number} start1 lower bound of the value's current range.
       * @param {number} stop1  upper bound of the value's current range.
       * @param {number} start2 lower bound of the value's target range.
       * @param {number} stop2  upper bound of the value's target range.
       * @param {boolean} withinBounds constrain the value to the newly mapped range
       * @returns {number} the remapped number
       */
      map(value, start1, stop1, start2, stop2, withinBounds = false) {
        const result = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds)
          return result;
        return start2 < stop2 ? instance.clamp(result, start2, stop2) : instance.clamp(result, stop2, start2);
      },
      /**
       * Maps a number from one range to a value between 0 and 1.
       *
       * @param {number} value
       * @param {number} start
       * @param {number} stop
       * @returns {number} the normalized number.
       */
      norm: (value, start, stop) => instance.map(value, start, stop, 0, 1),
      /**
       * Calculates the positive difference/distance of two given numbers
       *
       * @param {number} a
       * @param {number} b
       * @returns {number}
       */
      diff: (a, b) => math.abs(b - a),
      /** RNG API */
      /**
       * Generates a pseudorandom float between min (inclusive) and max (exclusive)
       *
       * @param {number} min
       * @param {number} max
       * @returns {number} the random number
       */
      rand: (min = 0, max = 1) => math.random() * (max - min) + min,
      /**
       * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
       *
       * @param {number} min
       * @param {number} max
       * @returns {number} the random number
       */
      randi: (min = 0, max = 1) => instance.floor(instance.rand() * (max - min + 1) + min),
      /**
       * Randomly returns `true` or `false`
       *
       * @param {number} p chance from 0 to 1 (where 0 = 0% and 1 = 100%)
       * @returns {boolean}
       */
      chance: (p) => instance.rand() < p,
      /**
       * Choose a random item from a Array
       *
       * @param {Array<T>} arr
       * @returns {T}
       */
      choose: (arr) => arr[instance.randi(0, arr.length - 1)],
      /**
       * Returns the fractional part of a number
       *
       * @param {number} value The number
       * @returns {number}
       */
      fract: (value) => value % 1,
      /**
       * Interpolate between 2 values.
       * Optionally, takes a custom periodic function (default = `Math.sin`).
       *
       * @param {number} lower
       * @param {number} higher
       * @param {number} t
       * @param {function} f
       * @returns {number}
       */
      wave(lower, higher, t, fn = math.sin) {
        return lower + (fn(t) + 1) / 2 * (higher - lower);
      },
      /** BASIC GRAPHICS API */
      /**
       * Clear the game screen
       *
       * @param {number|null} color The background color (from 0 to 7) or null
       * @alias instance.cls
       */
      clear(color) {
        if (NULL == color) {
          _ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT);
        } else {
          instance.rectfill(0, 0, instance.WIDTH, instance.HEIGHT, color);
        }
      },
      /**
       * Draw a rectangle outline
       *
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {number} color the color index (generally from 0 to 7)
       */
      rect(x, y, width, height, color = 0) {
        _ctx.strokeStyle = instance.getcolor(color);
        _ctx.strokeRect(~~x, ~~y, ~~width, ~~height);
      },
      /**
       * Draw a color-filled rectangle
       *
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {number} color the color index (generally from 0 to 7)
       */
      rectfill(x, y, width, height, color = 0) {
        _ctx.fillStyle = instance.getcolor(color);
        _ctx.fillRect(~~x, ~~y, ~~width, ~~height);
      },
      /**
       * Draw a circle outline
       *
       * @param {number} x
       * @param {number} y
       * @param {number} radius
       * @param {number} color the color index (generally from 0 to 7)
       */
      circ(x, y, radius, color = 0) {
        _ctx.strokeStyle = instance.getcolor(color);
        _ctx.beginPath();
        _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
        _ctx.closePath();
        _ctx.stroke();
      },
      /**
       * Draw a color-filled circle
       *
       * @param {number} x
       * @param {number} y
       * @param {number} radius
       * @param {number} color the color index (generally from 0 to 7)
       */
      circfill(x, y, radius, color = 0) {
        _ctx.fillStyle = instance.getcolor(color);
        _ctx.beginPath();
        _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
        _ctx.closePath();
        _ctx.fill();
      },
      /**
       * Draw a line
       *
       * @param {number} x1
       * @param {number} y1
       * @param {number} x2
       * @param {number} y2
       * @param {number} color the color index (generally from 0 to 7)
       */
      line(x1, y1, x2, y2, color = 0) {
        _ctx.strokeStyle = instance.getcolor(color);
        _ctx.beginPath();
        _ctx.moveTo(~~x1, ~~y1);
        _ctx.lineTo(~~x2, ~~y2);
        _ctx.stroke();
      },
      /**
       * Sets the thickness of lines
       *
       * @param {number} value
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
       */
      linewidth(value) {
        _ctx.lineWidth = value;
      },
      /**
       * Sets the line dash pattern used when drawing lines
       *
       * @param {number|number[]} segments the line dash pattern
       * @param {number} offset the line dash offset, or "phase".
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
       */
      linedash(segments, offset = 0) {
        _ctx.setLineDash(Array.isArray(segments) ? segments : [segments]);
        _ctx.lineDashOffset = offset;
      },
      /**
       * Determines the shape used to draw the end points of lines
       * Possible values are: "butt", "round" or "square"
       *
       * @param {string} value
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
       */
      linecap(value) {
        _ctx.lineCap = value;
      },
      /**
       * Determines the shape used to join two line segments where they meet
       * Possible values are: "round", "bevel", and "miter"
       *
       * @param {string} value
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
       */
      linejoin(value) {
        _ctx.lineJoin = value;
      },
      /** TEXT RENDERING API */
      /**
       * Draw text
       *
       * @alias instance.print
       * @param {number} x
       * @param {number} y
       * @param {string} text the text message
       * @param {number} color the color index (generally from 0 to 7)
       * @param {number} size the font size
       */
      text(x, y, text, color = 3) {
        _ctx.font = `${_fontStyle || ""} ${~~_fontSize}px ${_fontFamily}`;
        _ctx.fillStyle = instance.getcolor(color);
        _ctx.fillText(text, ~~x, ~~y);
      },
      /**
       * Set the font family
       *
       * @param {string} fontFamily
       */
      textfont(fontFamily) {
        _fontFamily = fontFamily;
      },
      /**
       * Set the font size
       *
       * @param {string} size
       */
      textsize(size) {
        _fontSize = size;
      },
      /**
       * Sets whether a font should be styled with a normal, italic, or bold.
       *
       * @param {string} style
       */
      textstyle(style) {
        _fontStyle = style;
      },
      /**
       * Sets the alignment used when drawing texts
       *
       * @param {string} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
       * @param {string} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
       */
      textalign(align, baseline) {
        _ctx.textAlign = _textAlign = align;
        _ctx.textBaseline = _textBaseline = baseline;
      },
      /**
       * Returns a TextMetrics object that contains information about the measured text (such as its width, for example)
       *
       * @param {string} text
       * @param {number} size
       * @returns {TextMetrics}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
       */
      textmetrics(text, size = NULL) {
        _ctx.font = `${_fontStyle || ""} ${~~(size || _fontSize)}px ${_fontFamily}`;
        metrics = _ctx.measureText(text);
        metrics.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return metrics;
      },
      /** IMAGE GRAPHICS API */
      /**
       * Draw an image
       *
       * @param {number} x
       * @param {number} y
       * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} image
       */
      image(x, y, image) {
        _ctx.drawImage(image, ~~x, ~~y);
      },
      /**
       * @callback drawCallback
       * @param {OffscreenCanvas} canvas
       */
      /**
       * Creates a offscreen canvas to draw on it
       *
       * @param {number} width
       * @param {number} height
       * @param {string[]|drawCallback} draw
       * @param {{scale?:number}} options
       * @returns {OffscreenCanvas}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
       */
      paint(width, height, draw, options = {}) {
        options.scale = math.max(1, ~~options.scale);
        const offscreenCanvas = new OffscreenCanvas(width, height), ctxOriginal = _ctx, pixelart = Array.isArray(draw), scale = pixelart ? math.floor(options.scale) : options.scale;
        offscreenCanvas.width = width * scale;
        offscreenCanvas.height = height * scale;
        _ctx = offscreenCanvas.getContext("2d");
        _ctx.scale(scale, scale);
        if (pixelart) {
          let x = 0, y = 0;
          _ctx.imageSmoothingEnabled = false;
          for (const str of draw) {
            for (const color of str.split("")) {
              if (" " !== color && "." !== color) {
                const colorIndex = ~~parseInt(color, 16);
                instance.rectfill(x, y, 1, 1, colorIndex);
              }
              x++;
            }
            y++;
            x = 0;
          }
        } else {
          draw(offscreenCanvas, _ctx);
        }
        _ctx = ctxOriginal;
        return offscreenCanvas;
      },
      /** ADVANCED GRAPHICS API */
      /**
       * Get the canvas context
       *
       * @returns {CanvasRenderingContext2D}
       */
      ctx: () => _ctx,
      /**
       * saves the current drawing style settings and transformations
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
       */
      push: () => _ctx.save(),
      /**
       * restores the drawing style settings and transformations
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
       */
      pop: () => _ctx.restore(),
      /**
       * Adds a translation transformation to the current matrix
       *
       * @param {number} x
       * @param {number} y
       */
      translate: (x, y) => _ctx.translate(x, y),
      /**
       * Adds a scaling transformation to the canvas units horizontally and/or vertically.
       *
       * @param {number} x
       * @param {number} y
       */
      scale: (x, y) => _ctx.scale(x, y),
      /**
       * Adds a rotation to the transformation matrix
       *
       * @param {number} radians
       */
      rotate: (radians) => _ctx.rotate(radians),
      /**
       * Adds a transformation that skews to the transformation matrix
       *
       * @param {number} a
       * @param {number} b
       * @param {number} c
       * @param {number} d
       * @param {number} e
       * @param {number} f
       * @param {boolean} resetFirst `false` to use _ctx.transform(); by default use _ctx.setTransform()
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
       */
      transform: (a, b, c, d, e, f, resetFirst = true) => _ctx[resetFirst ? "setTransform" : "transform"](a, b, c, d, e, f),
      /**
       * Sets the alpha (transparency) value to apply when drawing new shapes and images
       *
       * @param {number} alpha float from 0 to 1 (e.g: 0.5 = 50% transparent)
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
       */
      alpha(alpha) {
        _ctx.globalAlpha = alpha;
      },
      /**
       * Create a retangular clipping region.
       *
       * Note: Clip paths cannot be reverted directly. You must save your
       * canvas state using push() before calling cliprect(), and restore it
       * once you have finished drawing in the clipped area using pop().
       *
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
       */
      cliprect(x, y, width, height) {
        _ctx.beginPath();
        _ctx.rect(x, y, width, height);
        _ctx.clip();
      },
      /**
       * Create a circular clipping region.
       *
       * Note: Clip paths cannot be reverted directly. You must save your
       * canvas state using push() before calling clipcirc(), and restore it
       * once you have finished drawing in the clipped area using pop().
       *
       * @param {number} x
       * @param {number} y
       * @param {number} radius
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
       */
      clipcirc(x, y, radius) {
        _ctx.beginPath();
        _ctx.arc(x, y, radius, 0, TWO_PI);
        _ctx.clip();
      },
      /**
       * Sets the type of compositing operation to apply when drawing new shapes.
       * Default value = 'source-over'.
       *
       * @param {string} value
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
       */
      blendmode(value) {
        _ctx.globalCompositeOperation = value;
      },
      /**
       * Provides filter effects such as blurring and grayscaling.
       * It is similar to the CSS filter property and accepts the same values.
       *
       * @param {string} effect
       * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
       */
      filter(effect) {
        _ctx.filter = effect;
      },
      /** SOUND API */
      /**
       * Play a defined sound or a ZzFX array of params
       *
       * @param {number|Array} sound the sound index (from 0 to 7) or a ZzFX array of params
       * @param {number} volume
       * @param {number} pitch
       * @param {number} randomness
       * @returns {AudioBufferSourceNode}
       * @see https://github.com/KilledByAPixel/ZzFX
       */
      sfx(sound = 0, volume = 1, pitch = 0, randomness = 0) {
        if (navigator.userActivation && !navigator.userActivation.hasBeenActive) {
          return;
        }
        let z = Array.isArray(sound) ? sound : sounds[~~sound % sounds.length];
        if (volume !== 1 || pitch || randomness) {
          z = [...z];
          z[0] = (Number(volume) || 1) * (z[0] || 1);
          z[1] = randomness > 0 ? randomness : 0;
          z[10] = ~~z[10] + ~~pitch;
        }
        return zzfx(...z);
      },
      /** UTILS API */
      /**
       * Check a collision between two rectangles
       *
       * @param {number} x1 first rectangle position X
       * @param {number} y1 first rectangle position Y
       * @param {number} w1 first rectangle width
       * @param {number} h1 first rectangle height
       * @param {number} x2 second rectangle position X
       * @param {number} y2 second rectangle position Y
       * @param {number} w2 second rectangle width
       * @param {number} h2 second rectangle height
       * @returns {boolean}
       */
      colrect: (x1, y1, w1, h1, x2, y2, w2, h2) => x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2,
      /**
       * Check a collision between two circles
       *
       * @param {number} x1 first circle position X
       * @param {number} y1 first circle position Y
       * @param {number} r1 first circle position radius
       * @param {number} x2 second circle position X
       * @param {number} y2 second circle position Y
       * @param {number} r2 second circle position radius
       * @returns {boolean}
       */
      colcirc: (x1, y1, r1, x2, y2, r2) => (x2 - x1) ** 2 + (y2 - y1) ** 2 <= (r1 + r2) ** 2,
      /** PLUGINS API */
      /**
       * Loads a plugin
       *
       * @callback pluginCallback
       * @param {object} instance - The litecanvas instance
       * @param {object} helpers
       */
      /**
       * @param {pluginCallback} callback
       */
      use(callback) {
        if (_initialized) {
          loadPlugin(callback);
        } else {
          _plugins.push(callback);
        }
      },
      /**
       * Add a game loop event listener
       *
       * @param {string} event should be "init", "update", "draw" or "resized"
       * @param {function} callback the function that is called when the event occurs
       * @param {boolean} highPriority determines whether the callback will be called before or after the others
       * @returns {function|null} a function to remove the listener or null if passed a invalid event
       */
      listen(event, callback, highPriority = false) {
        if (!_loop[event])
          return NULL;
        _loop[event][highPriority ? "unshift" : "push"](callback);
        return () => {
          _loop[event] = _loop[event].filter((f) => f !== callback);
        };
      },
      /**
       * Get the color value
       *
       * @param {number} index The color number
       * @returns {string} the color value
       */
      getcolor: (index) => colors[~~index % colors.length],
      /**
       * Create or update a instance variable
       *
       * @param {string} key
       * @param {any} value
       */
      setvar(key, value) {
        instance[key] = value;
        if (settings.global) {
          root[key] = value;
        }
      }
    };
    Object.assign(instance, {
      cls: instance.clear,
      print: instance.text
    });
    for (const k of [
      "sin",
      "cos",
      "atan2",
      "hypot",
      "tan",
      "abs",
      "ceil",
      "round",
      "floor",
      "trunc",
      "min",
      "max",
      "pow",
      "sqrt",
      "sign",
      "exp"
    ]) {
      instance[k] = math[k];
    }
    function init() {
      _initialized = true;
      setupCanvas();
      if (settings.tapEvents) {
        const _tappedLimit = 200;
        const _getXY = (event) => {
          return _hasMouse ? [event.pageX, event.pageY] : [event.touches[0].pageX, event.touches[0].pageY];
        }, _eventTapStart = _hasMouse ? "mousedown" : "touchstart", _eventTapEnd = _hasMouse ? "mouseup" : "touchend", _eventTapMove = _hasMouse ? "mousemove" : "touchmove";
        let _tapStartX, _tapStartY, _last, _start;
        _tappingHandler = (ev) => {
          let now = time();
          if (now - _last > settings.tappingInterval) {
            const [x, y] = _getXY(ev);
            updateTapping(true, x, y);
            _last = now;
          }
        };
        on(instance.CANVAS, _eventTapStart, function(ev) {
          ev.preventDefault();
          on(body, _eventTapMove, _tappingHandler);
          const [x, y] = [_tapStartX, _tapStartY] = _getXY(ev);
          updateTapping(true, x, y);
          _last = _start = time();
        });
        on(instance.CANVAS, _eventTapEnd, function(ev) {
          off(body, _eventTapMove, _tappingHandler);
          updateTapping(false);
          if (time() - _start <= _tappedLimit) {
            updateTapped(true, _tapStartX, _tapStartY);
          }
        });
      }
      on(root, "focus", () => {
        if (!_rafid) {
          _lastFrame = time();
          _rafid = requestAnimationFrame(frame);
        }
      });
      on(root, "blur", () => {
        cancelAnimationFrame(_rafid);
        _rafid = 0;
        if (settings.tapEvents) {
          off(
            body,
            _hasMouse ? "mousemove" : "touchmove",
            _tappingHandler
          );
          updateTapping(false);
        }
      });
      const source = settings.loop ? settings.loop : root;
      for (const event in _loop) {
        if (source[event])
          instance.listen(event, source[event]);
      }
      for (let i = 0; i < _plugins.length; i++) {
        loadPlugin(_plugins[i]);
      }
      if (NULL != _bg) {
        instance.CANVAS.style.backgroundColor = instance.getcolor(_bg);
      }
      if (_autoscale || _fullscreen) {
        on(root, "resize", pageResized);
      }
      pageResized();
      emit("init");
      _lastFrame = time();
      _rafid = requestAnimationFrame(frame);
    }
    function frame(now) {
      let ticks = 0, t = now - _lastFrame;
      _lastFrame = now;
      _accumulated += t;
      while (_accumulated >= _stepMs) {
        emit("update", _step);
        instance.setvar("ELAPSED", instance.ELAPSED + _step);
        _accumulated -= _stepMs;
        ticks++;
        instance.setvar("TAPPED", false);
      }
      if (ticks) {
        _drawCount++;
        emit("draw");
        _drawTime += _stepMs * ticks;
        if (_drawTime + _accumulated >= 1e3) {
          instance.setvar("FPS", _drawCount);
          _drawCount = 0;
          _drawTime -= 1e3;
        }
      }
      if (_rafid)
        _rafid = requestAnimationFrame(frame);
    }
    function setupCanvas() {
      _canvas = "string" === typeof _canvas ? document.querySelector(_canvas) : _canvas;
      instance.setvar("CANVAS", _canvas);
      if (instance.WIDTH > 0)
        _fullscreen = false;
      _canvas.width = instance.WIDTH;
      _canvas.height = instance.HEIGHT || instance.WIDTH;
      _ctx = _canvas.getContext("2d");
      if (!_canvas.parentNode)
        body.appendChild(_canvas);
      if (!settings.antialias || settings.pixelart) {
        _ctx.imageSmoothingEnabled = false;
        _canvas.style.imageRendering = "pixelated";
      }
      _canvas.style.display = "block";
      if (_fullscreen) {
        _canvas.style.position = "absolute";
        _canvas.style.inset = 0;
      } else if (_autoscale) {
        _canvas.style.margin = "auto";
      }
    }
    function pageResized() {
      if (_autoscale || _fullscreen) {
        if (_fullscreen) {
          _canvas.width = innerWidth;
          _canvas.height = innerHeight;
          instance.setvar("WIDTH", innerWidth);
          instance.setvar("HEIGHT", innerHeight);
        } else if (_autoscale) {
          _scale = math.min(
            innerWidth / instance.WIDTH,
            innerHeight / instance.HEIGHT
          );
          _scale = settings.pixelart ? math.floor(_scale) : _scale;
          _canvas.style.width = instance.WIDTH * _scale + "px";
          _canvas.style.height = instance.HEIGHT * _scale + "px";
        }
      }
      instance.setvar("CENTERX", instance.WIDTH / 2);
      instance.setvar("CENTERY", instance.HEIGHT / 2);
      _offsetTop = _canvas.offsetTop;
      _offsetLeft = _canvas.offsetLeft;
      instance.textalign(_textAlign, _textBaseline);
      emit("resized");
    }
    function updateTapped(tapped, x, y) {
      instance.setvar("TAPPED", tapped);
      instance.setvar("TAPX", (x - _offsetLeft) / _scale);
      instance.setvar("TAPY", (y - _offsetTop) / _scale);
    }
    function updateTapping(tapped, x, y) {
      instance.setvar("TAPPING", tapped);
      instance.setvar("TAPX", (x - _offsetLeft) / _scale);
      instance.setvar("TAPY", (y - _offsetTop) / _scale);
    }
    function loadPlugin(callback) {
      const pluginData = callback(instance, _helpers);
      if ("object" === typeof pluginData) {
        for (const key in pluginData) {
          instance.setvar(key, pluginData[key]);
        }
      }
    }
    function emit(event, ...args) {
      if (!_loop[event])
        return;
      for (let i = 0; i < _loop[event].length; ++i) {
        _loop[event][i](...args);
      }
    }
    if (settings.global) {
      if (root.__litecanvas) {
        throw new Error("Cannot instantiate litecanvas globally twice");
      }
      Object.assign(root, instance);
      root.__litecanvas = true;
    }
    if ("loading" === document.readyState) {
      on(root, "DOMContentLoaded", init);
    } else {
      init();
    }
    return instance;
  }
  window.litecanvas = litecanvas;
})();
/*! litecanvas v0.29.0 | https://github.com/litecanvas/game-engine */

(()=>{var s=getScriptLoader=t=>(o,r)=>{t.setvar("LOADING",t.LOADING+1),script=document.createElement("script"),script.onload=()=>{r&&r(script),t.setvar("LOADING",t.LOADING-1)},script.onerror=()=>{r&&r(null)},script.src=o,document.head.appendChild(script)};var L=getImageLoader=t=>(o,r)=>{t.setvar("LOADING",t.LOADING+1);let d=new Image;d.onload=()=>{r&&r(d),t.setvar("LOADING",t.LOADING-1)},d.onerror=function(){r&&r(null)},d.src=o};var p=getFontLoader=t=>async(o,r,d)=>{let e=new FontFace(o,`url(${r})`);t.setvar("LOADING",t.LOADING+1),document.fonts.add(e),e.load().then(a=>{d&&d(a),t.setvar("LOADING",t.LOADING-1)}).catch(()=>{d&&d(null)})};window.pluginAssetLoader=u;function u(t,o){return t.setvar("LOADING",0),{loadScript:s(t,o),loadImage:L(t,o),loadFont:p(t,o)}}})();
/*! Asset Loader plugin for litecanvas v0.4.2 by Luiz Bills | MIT Licensed */
