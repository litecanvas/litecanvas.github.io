(() => {
  // src/zzfx.js
  zzfxX = new AudioContext();
  zzfxV = 0.3;
  zzfx = (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, N = 0) => {
    let M = Math, d = 2 * M.PI, R = 44100, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, h = N < 0 ? -1 : 1, x = d * h * N * 2 / R, L = M.cos(x), Z = M.sin, K = Z(x) / 4, O = 1 + K, X = -2 * L / O, Y = (1 - K) / O, P = (1 + h * L) / 2 / O, Q = -(h + L) / O, S = P, T = 0, U = 0, V = 0, W = 0;
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
    p *= zzfxV;
    for (h = e + m + r + t + c | 0; a < h; k[a++] = f * p)
      ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? Z(g * g) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : Z(g), f = (l ? 1 - B + B * Z(d * a / l) : 1) * (f < 0 ? -1 : 1) * M.abs(f) ** D * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2 / p) : f, N ? f = W = S * T + Q * (T = U) + P * (U = f) - Y * V - X * (V = W) : 0), x = (b += u += y) * M.cos(A * H++), g += x + x * E * Z(a ** 5), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1);
    p = zzfxX.createBuffer(1, h, R);
    p.getChannelData(0).set(k);
    b = zzfxX.createBufferSource();
    b.buffer = p;
    b.connect(zzfxX.destination);
    b.start();
  };

  // src/colors.js
  var colors = [
    "#212035",
    "#495057",
    "#adb5bd",
    "#e9ecef",
    "#cc3184",
    "#ffce6b",
    "#25a2a8",
    "#4b56eb",
    "#e87d43",
    "#5dd477",
    "#2f328f",
    "#703075"
  ];

  // src/sounds.js
  var sounds = [
    // 0 - pickup
    [0.8, 0, 2e3, 0.01, 0.05, , 1, 2, , , -600, 0.05, , , , , , 0.5, 0.05],
    // 1 - hit
    [0.5, 0, 375, 0.02, 0.01, 0.2, 1, , , , , , , 0.4, , 0.1, , 0.6, 0.1],
    // 2 - jump
    [, 0, 360, 0.01, , 0.08, 1, 1.7, 12, 32, , , , , , , , 0.63, 0.02, , 99],
    // 3 - warning
    [1.2, 0, 240, 0.02, 0.15, 0.15, 1, 4, , , , , 0.05, , , , , 0.6, 0.15]
  ];

  // src/index.js
  var root = globalThis;
  function litecanvas(settings = {}) {
    const body = document.body, math = Math, PI = math.PI, TWO_PI = PI * 2, on = (elem, evt, callback) => elem.addEventListener(evt, callback), off = (elem, evt, callback) => elem.removeEventListener(evt, callback), time = () => performance.now(), NULL = null, UNDEF = void 0, defaults = {
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
      tappingInterval: 100,
      tapEvents: true,
      useMouse: false,
      loop: NULL
    };
    settings = Object.assign(defaults, settings);
    let _initialized = false, _plugins = [], _canvas = settings.canvas || document.createElement("canvas"), _fullscreen = settings.fullscreen, _autoscale = settings.autoscale, _bg = settings.background, _hasMouse = settings.useMouse || matchMedia("(pointer:fine)").matches, _tappingHandler, _scale = 1, _offsetTop = 0, _offsetLeft = 0, _ctx, _lastFrame, _step = 1 / settings.fps, _stepMs = _step * 1e3, _accumulated = 0, _rafid, _drawCount = 0, _drawTime = 0, _fontFamily = "sans-serif", _fontStyle = "", _fontSize = 32, _textAlign = "start", _textBaseline = "top", _loop = {
      init: [],
      update: [],
      draw: [],
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
      TAPPED: NULL,
      /** @type {boolean} */
      TAPPING: NULL,
      /** @type {number} */
      TAPX: NULL,
      /** @type {number} */
      TAPY: NULL,
      /** @type {number} */
      ELAPSED: 0,
      /** @type {number} */
      FPS: settings.fps,
      /** @type {number} */
      DT: _step,
      /** @type {number} */
      CENTERX: NULL,
      /** @type {number} */
      CENTERY: NULL,
      /** MATH API */
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
       * Note: TWO_PI radians equals 360°, PI radians equals 180°,
       * HALF_PI radians equals 90°, and HALF_PI/2 radians equals 45°.
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
       * Constrains a number between `min` and `max`.
       *
       * @param {number} value
       * @param {number} min
       * @param {number} max
       * @returns {number}
       */
      clamp: (value, min, max) => math.min(math.max(value, min), max),
      /**
       * Wraps a number between `min` (inclusive) and `max` (exclusive).
       *
       * @param {number} value
       * @param {number} min
       * @param {number} max
       * @returns {number}
       */
      wrap: (value, min, max) => value - (max - min) * math.floor((value - min) / (max - min)),
      /**
       * Re-maps a number from one range to another.
       *
       * @param {number} value  the value to be remapped.
       * @param {number} min1 lower bound of the value's current range.
       * @param {number} max1  upper bound of the value's current range.
       * @param {number} min2 lower bound of the value's target range.
       * @param {number} max2  upper bound of the value's target range.
       * @param {boolean} [withinBounds=false] constrain the value to the newly mapped range
       * @returns {number} the remapped number
       */
      map(value, min1, max1, min2, max2, withinBounds = false) {
        const result = (value - min1) / (max1 - min1) * (max2 - min2) + min2;
        return !withinBounds ? result : instance.clamp(result, min2, max2);
      },
      /**
       * Maps a number from one range to a value between 0 and 1.
       *
       * @param {number} value
       * @param {number} min
       * @param {number} min
       * @returns {number} the normalized number.
       */
      norm: (value, min, max) => instance.map(value, min, max, 0, 1),
      /**
       * Returns the fractional part of a number
       *
       * @param {number} value The number
       * @returns {number}
       */
      fract: (value) => value % 1,
      /** RNG API */
      /**
       * Generates a pseudorandom float between min (inclusive) and max (exclusive)
       *
       * @param {number} [min=0.0]
       * @param {number} [max=1.0]
       * @returns {number} the random number
       */
      rand: (min = 0, max = 1) => math.random() * (max - min) + min,
      /**
       * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
       *
       * @param {number} [min=0]
       * @param {number} [max=1]
       * @returns {number} the random number
       */
      randi: (min = 0, max = 1) => instance.floor(instance.rand() * (max - min + 1) + min),
      /** BASIC GRAPHICS API */
      /**
       * Clear the game screen
       *
       * @param {number|null} color The background color (from 0 to 7) or null
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
       * @param {number} [color=0] the color index (generally from 0 to 7)
       * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
       */
      rect(x, y, width, height, color = 0, radii = UNDEF) {
        _ctx.beginPath();
        _ctx[radii ? "roundRect" : "rect"](
          ~~x,
          ~~y,
          ~~width,
          ~~height,
          radii
        );
        instance.stroke(color);
      },
      /**
       * Draw a color-filled rectangle
       *
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {number} [color=0] the color index (generally from 0 to 7)
       * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
       */
      rectfill(x, y, width, height, color = 0, radii = UNDEF) {
        _ctx.beginPath();
        _ctx[radii ? "roundRect" : "rect"](
          ~~x,
          ~~y,
          ~~width,
          ~~height,
          radii
        );
        instance.fill(color);
      },
      /**
       * Draw a circle outline
       *
       * @param {number} x
       * @param {number} y
       * @param {number} radius
       * @param {number} [color=0] the color index (generally from 0 to 7)
       */
      circ(x, y, radius, color = 0) {
        _ctx.beginPath();
        _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
        _ctx.closePath();
        instance.stroke(color);
      },
      /**
       * Draw a color-filled circle
       *
       * @param {number} x
       * @param {number} y
       * @param {number} radius
       * @param {number} [color=0] the color index (generally from 0 to 7)
       */
      circfill(x, y, radius, color = 0) {
        _ctx.beginPath();
        _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
        _ctx.closePath();
        instance.fill(color);
      },
      /**
       * Draw a line
       *
       * @param {number} x1
       * @param {number} y1
       * @param {number} x2
       * @param {number} y2
       * @param {number} [color=0] the color index (generally from 0 to 7)
       */
      line(x1, y1, x2, y2, color = 0) {
        _ctx.beginPath();
        _ctx.moveTo(~~x1, ~~y1);
        _ctx.lineTo(~~x2, ~~y2);
        instance.stroke(color);
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
       * @param {number} [offset=0] the line dash offset, or "phase".
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
       * @param {number} x
       * @param {number} y
       * @param {string} text the text message
       * @param {number} [color=3] the color index (generally from 0 to 7)
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
       * @param {number} [size]
       * @returns {TextMetrics}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
       */
      textmetrics(text, size) {
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
       * Creates a offscreen canvas to draw on it
       *
       * @param {number} width
       * @param {number} height
       * @param {string[]|drawCallback} draw
       * @param {{scale?:number}} [options]
       * @returns {OffscreenCanvas}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
       */
      paint(width, height, draw, options = {}) {
        const offscreenCanvas = new OffscreenCanvas(width, height), ctxOriginal = _ctx, scale = options.scale || 1;
        offscreenCanvas.width = width * scale;
        offscreenCanvas.height = height * scale;
        _ctx = offscreenCanvas.getContext("2d");
        _ctx.scale(scale, scale);
        if (Array.isArray(draw)) {
          let x = 0, y = 0;
          _ctx.imageSmoothingEnabled = false;
          for (const str of draw) {
            for (const color of str) {
              if (" " !== color && "." !== color) {
                instance.rectfill(x, y, 1, 1, parseInt(color, 16));
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
       * @param {number} [y]
       */
      scale: (x, y) => _ctx.scale(x, y || x),
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
       * @param {boolean} [resetFirst=true] `false` to use _ctx.transform(); by default use _ctx.setTransform()
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
       * Returns a newly instantiated Path2D object, optionally with another
       * path as an argument (creates a copy), or optionally with a string
       * consisting of SVG path data.
       *
       * @param {Path2D|string} [arg]
       * @returns Path2D
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D
       */
      path: (arg) => new Path2D(arg),
      /**
       * Fills the current or given path with a given color.
       *
       * @param {number} color
       * @param {Path2D} [path]
       */
      fill(color, path) {
        _ctx.fillStyle = instance.getcolor(color);
        _ctx.fill(path);
      },
      /**
       * Outlines the current or given path with a given color.
       *
       * @param {number} color
       * @param {Path2D} [path]
       */
      stroke(color, path) {
        _ctx.strokeStyle = instance.getcolor(color);
        path ? _ctx.stroke(path) : _ctx.stroke();
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
       * @param {number|number[]} [sound=0] the sound index (from 0 to 7) or a ZzFX array of params
       * @param {number} [volume=1]
       * @param {number} [pitch=0]
       * @param {number} [randomness=0]
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
       * Prepares a plugin to be loaded
       *
       * @param {pluginCallback} callback
       */
      use: (callback) => {
        _initialized ? loadPlugin(callback) : _plugins.push(callback);
      },
      /**
       * Add a game loop event listener
       *
       * @param {string} event should be "init", "update", "draw" or "resized"
       * @param {function} callback the function that is called when the event occurs
       * @param {boolean} [highPriority=false] determines whether the callback will be called before or after the others
       * @returns {function?} a function to remove the listener or `undefined` if passed a invalid event
       */
      listen(event, callback, highPriority = false) {
        if (!_loop[event])
          return;
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
      },
      /**
       * Resizes the game canvas and emit the "resized" event
       *
       * @param {number} width
       * @param {number} height
       */
      resize(width, height) {
        instance.setvar("WIDTH", _canvas.width = ~~width);
        instance.setvar("HEIGHT", _canvas.height = ~~(height || width));
        pageResized();
      }
    };
    instance.cls = instance.clear;
    instance.print = instance.text;
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
          if (!_rafid)
            _resume();
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
        if (!_rafid)
          _resume();
      });
      function _resume() {
        _lastFrame = time();
        _rafid = requestAnimationFrame(frame);
      }
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
      on(root, "resize", pageResized);
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
      _ctx = _canvas.getContext("2d");
      if (instance.WIDTH > 0)
        _fullscreen = false;
      _canvas.width = instance.WIDTH;
      _canvas.height = instance.HEIGHT || instance.WIDTH;
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
  root.litecanvas = litecanvas;
})();

(()=>{var G=getScriptLoader=o=>(c,i)=>{o.setvar("LOADING",o.LOADING+1),script=document.createElement("script"),image.crossOrigin="anonymous",script.onload=()=>{i&&i(script),o.setvar("LOADING",o.LOADING-1)},script.onerror=()=>{i&&i(null)},script.src=c,document.head.appendChild(script)};var N=getImageLoader=(o,{colors:c})=>{let i={convertColors:d};return(t,s)=>{o.setvar("LOADING",o.LOADING+1);let r=new Image;r.crossOrigin="anonymous",r.onload=()=>{s&&s(r,i),o.setvar("LOADING",o.LOADING-1)},r.onerror=function(){s&&s(null,i)},r.src=t};function d(t,s=!1){let r=new OffscreenCanvas(t.width,t.height),e=r.getContext("2d");e.drawImage(t,0,0);let u=e.getImageData(0,0,t.width,t.height),a=u.data,p=new Map;for(let n=0,I=a.length;n<I;n+=4){let L=a[n],m=a[n+1],g=a[n+2],A=[L,m,g],D=A.join(",");p.has(D)||p.set(D,w(A,c));let O=p.get(D),x=O.startsWith("#")?f(O):l(O);a[n]=x[0],a[n+1]=x[1],a[n+2]=x[2],a[n+3]=s?a[n+3]:255}return e.putImageData(u,0,0),r}function f(t){let s=0,r=0,e=0;return t.length===4?(s="0x"+t[1]+t[1],r="0x"+t[2]+t[2],e="0x"+t[3]+t[3]):t.length===7&&(s="0x"+t[1]+t[2],r="0x"+t[3]+t[4],e="0x"+t[5]+t[6]),[s|0,r|0,e|0]}function l(t){let s=t.indexOf(",")>-1?",":" ";t=t.substr(4).split(")")[0].split(s);let r=(+t[0]).toString(16),e=(+t[1]).toString(16),u=(+t[2]).toString(16);return r.length===1&&(r="0"+r),e.length===1&&(e="0"+e),u.length===1&&(u="0"+u),[r|0,e|0,u|0]}function w(t,s){let r=1/0,e=null,[u,a,p]=t;return s.forEach(n=>{let[I,L,m]=n.startsWith("#")?f(n):l(n),g=Math.sqrt((u-I)**2+(a-L)**2+(p-m)**2);g<r&&(r=g,e=n)}),e}};var v=getFontLoader=o=>async(c,i,d)=>{let f=new FontFace(c,`url(${i})`);o.setvar("LOADING",o.LOADING+1),document.fonts.add(f),f.load().then(l=>{d&&d(l),o.setvar("LOADING",o.LOADING-1)}).catch(()=>{d&&d(null)})};window.pluginAssetLoader=h;function h(o,c){return o.setvar("LOADING",0),{loadScript:G(o,c),loadImage:N(o,c),loadFont:v(o,c)}}})();
/*! Asset Loader plugin for litecanvas v0.5.2 by Luiz Bills | MIT Licensed */
