(() => {
  // public/litecanvas.js
  (() => {
    var zzfxX = /* @__PURE__ */ new AudioContext();
    var zzfx = (i = 1, d = 0.05, z = 220, e = 0, P = 0, S = 0.1, I = 0, c = 1, T = 0, H = 0, V = 0, J = 0, h = 0, j = 0, K = 0, E = 0, r = 0, B = 1, X = 0, L = 0, D = 0) => {
      let n = Math, t = 2 * n.PI, a = 44100, F = T *= 500 * t / a / a, O = z *= (1 - d + 2 * d * n.random(d = [])) * t / a, x = 0, _ = 0, f = 0, g = 1, $ = 0, l = 0, o = 0, s = D < 0 ? -1 : 1, u = t * s * D * 2 / a, G = n.cos(u), C = n.sin, Q = C(u) / 4, M = 1 + Q, m = -2 * G / M, y = (1 - Q) / M, R = (1 + s * G) / 2 / M, A = -(s + G) / M, v = R, U = 0, W = 0, Y = 0, Z = 0;
      for (e = a * e + 9, X *= a, P *= a, S *= a, r *= a, H *= 500 * t / a ** 3, K *= t / a, V *= t / a, J *= a, h = a * h | 0, i *= 0.3 * (globalThis.zzfxV || 1), s = e + X + P + S + r | 0; f < s; d[f++] = o * i) ++l % (100 * E | 0) || (o = I ? 1 < I ? 2 < I ? 3 < I ? C(x * x) : n.max(n.min(n.tan(x), 1), -1) : 1 - (2 * x / t % 2 + 2) % 2 : 1 - 4 * n.abs(n.round(x / t) - x / t) : C(x), o = (h ? 1 - L + L * C(t * f / h) : 1) * (o < 0 ? -1 : 1) * n.abs(o) ** c * (f < e ? f / e : f < e + X ? 1 - (f - e) / X * (1 - B) : f < e + X + P ? B : f < s - r ? (s - f - r) / S * B : 0), o = r ? o / 2 + (r > f ? 0 : (f < s - r ? 1 : (s - f) / r) * d[f - r | 0] / 2 / i) : o, D && (o = Z = v * U + A * (U = W) + R * (W = o) - y * Y - m * (Y = Z))), u = (z += T += H) * n.cos(K * _++), x += u + u * j * C(f ** 5), g && ++g > J && (z += V, O += V, g = 0), !h || ++$ % h || (z = O, T = F, g = g || 1);
      i = zzfxX.createBuffer(1, s, a), i.getChannelData(0).set(d), z = zzfxX.createBufferSource(), z.buffer = i, z.connect(zzfxX.destination), z.start();
    };
    var colors = [
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
      "#ac7c00"
    ];
    var assert = (condition, message = "Assertion failed") => {
      if (!condition) throw new Error(message);
    };
    function litecanvas(settings = {}) {
      const root = globalThis, PI = Math.PI, TWO_PI = PI * 2, raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(
          () => elem.removeEventListener(evt, callback, false)
        );
      }, isFinite = Number.isFinite, defaults = {
        width: null,
        height: null,
        autoscale: true,
        pixelart: false,
        antialias: false,
        canvas: null,
        global: true,
        loop: null,
        pauseOnBlur: true,
        tapEvents: true,
        keyboardEvents: true,
        animate: true
      };
      settings = Object.assign(defaults, settings);
      let _initialized = false, _plugins = [], _canvas = settings.canvas || document.createElement("canvas"), _autoscale = settings.autoscale, _animated = settings.animate, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _deltaTime, _accumulated = 0, _rafid, _fontFamily = "sans-serif", _fontSize = 32, _rng_seed = Date.now(), _global = settings.global, _events = {
        init: null,
        update: null,
        draw: null,
        resized: null,
        tap: null,
        untap: null,
        tapping: null,
        tapped: null
      }, _helpers = {
        settings: Object.assign({}, settings),
        colors
      };
      const instance = {
        /** @type {number} */
        WIDTH: settings.width,
        /** @type {number} */
        HEIGHT: settings.height || settings.width,
        /** @type {HTMLCanvasElement} */
        CANVAS: null,
        /** @type {number} */
        ELAPSED: 0,
        /** @type {number} */
        CENTERX: 0,
        /** @type {number} */
        CENTERY: 0,
        /** @type {number} */
        MOUSEX: -1,
        /** @type {number} */
        MOUSEY: -1,
        /** @type {number[]} */
        DEFAULT_SFX: [0.5, , 1675, , 0.06, 0.2, 1, 1.8, , , 637, 0.06],
        /** MATH API */
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
        HALF_PI: PI / 2,
        /**
         * Calculates a linear (interpolation) value over t%.
         *
         * @param {number} start
         * @param {number} end
         * @param {number} t The progress in percentage, where 0 = 0% and 1 = 100%.
         * @returns {number} The unterpolated value
         * @tutorial https://gamedev.net/tutorials/programming/general-and-gameplay-programming/a-brief-introduction-to-lerp-r4954/
         */
        lerp: (start, end, t) => {
          DEV: assert(isFinite(start), "lerp: 1st param must be a number");
          DEV: assert(isFinite(end), "lerp: 2nd param must be a number");
          DEV: assert(isFinite(t), "lerp: 3rd param must be a number");
          return t * (end - start) + start;
        },
        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
          DEV: assert(isFinite(degs), "deg2rad: 1st param must be a number");
          return PI / 180 * degs;
        },
        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
          DEV: assert(isFinite(rads), "rad2deg: 1st param must be a number");
          return 180 / PI * rads;
        },
        /**
         * Constrains a number between `min` and `max`.
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        clamp: (value, min, max) => {
          DEV: assert(isFinite(value), "clamp: 1st param must be a number");
          DEV: assert(isFinite(min), "clamp: 2nd param must be a number");
          DEV: assert(isFinite(max), "clamp: 3rd param must be a number");
          DEV: assert(
            max > min,
            "randi: the 2nd param must be less than the 3rd param"
          );
          if (value < min) return min;
          if (value > max) return max;
          return value;
        },
        /**
         * Wraps a number between `min` (inclusive) and `max` (exclusive).
         *
         * @param {number} value
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        wrap: (value, min, max) => {
          DEV: assert(isFinite(value), "wrap: 1st param must be a number");
          DEV: assert(isFinite(min), "wrap: 2nd param must be a number");
          DEV: assert(isFinite(max), "wrap: 3rd param must be a number");
          DEV: assert(
            max > min,
            "randi: the 2nd param must be less than the 3rd param"
          );
          DEV: assert(
            max !== min,
            "randi: the 2nd param must be not equal to the 3rd param"
          );
          return value - (max - min) * Math.floor((value - min) / (max - min));
        },
        /**
         * Re-maps a number from one range to another.
         *
         * @param {number} value  the value to be remapped.
         * @param {number} start1 lower bound of the value's current range.
         * @param {number} stop1  upper bound of the value's current range.
         * @param {number} start2 lower bound of the value's target range.
         * @param {number} stop2  upper bound of the value's target range.
         * @param {boolean} [withinBounds=false] constrain the value to the newly mapped range
         * @returns {number} the remapped number
         */
        map(value, start1, stop1, start2, stop2, withinBounds) {
          DEV: assert(isFinite(value), "map: 1st param must be a number");
          DEV: assert(isFinite(start1), "map: 2nd param must be a number");
          DEV: assert(isFinite(stop1), "map: 3rd param must be a number");
          DEV: assert(isFinite(start2), "map: 4th param must be a number");
          DEV: assert(isFinite(stop2), "map: 5th param must be a number");
          const result = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
          return withinBounds ? instance.clamp(result, start2, stop2) : result;
        },
        /**
         * Maps a number from one range to a value between 0 and 1.
         * Identical to `map(value, min, max, 0, 1)`.
         * Note: Numbers outside the range are not clamped to 0 and 1.
         *
         * @param {number} value
         * @param {number} start
         * @param {number} stop
         * @returns {number} the normalized number.
         */
        norm: (value, start, stop) => {
          DEV: assert(isFinite(value), "norm: 1st param must be a number");
          DEV: assert(isFinite(start), "norm: 2nd param must be a number");
          DEV: assert(isFinite(stop), "norm: 3rd param must be a number");
          return instance.map(value, start, stop, 0, 1);
        },
        /** RNG API */
        /**
         * Generates a pseudorandom float between min (inclusive) and max (exclusive)
         * using the Linear Congruential Generator (LCG) algorithm.
         *
         * @param {number} [min=0.0]
         * @param {number} [max=1.0]
         * @returns {number} the random number
         */
        rand: (min = 0, max = 1) => {
          DEV: assert(isFinite(min), "rand: 1st param must be a number");
          DEV: assert(isFinite(max), "rand: 2nd param must be a number");
          DEV: assert(
            max > min,
            "rand: the 1st param must be less than the 2nd param"
          );
          const a = 1664525;
          const c = 1013904223;
          const m = 4294967296;
          _rng_seed = (a * _rng_seed + c) % m;
          return _rng_seed / m * (max - min) + min;
        },
        /**
         * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
         *
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {number} the random number
         */
        randi: (min = 0, max = 1) => {
          DEV: assert(isFinite(min), "randi: 1st param must be a number");
          DEV: assert(isFinite(max), "randi: 2nd param must be a number");
          DEV: assert(
            max > min,
            "randi: the 1st param must be less than the 2nd param"
          );
          return Math.floor(instance.rand(min, max + 1));
        },
        /**
         * If a value is passed, initializes the random number generator with an explicit seed value.
         * Otherwise, returns the current seed state.
         *
         * @param {number} value
         * @returns {number} the seed state
         */
        seed: (value) => {
          DEV: assert(
            null == value || isFinite(value) && value >= 0,
            "seed: 1st param must be a positive number or zero"
          );
          return null == value ? _rng_seed : _rng_seed = ~~value;
        },
        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen with an optional color
         *
         * @param {number?} color The background color (index) or null (for transparent)
         */
        cls(color) {
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "cls: 1st param must be a positive number or zero or null"
          );
          if (null == color) {
            _ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
          } else {
            instance.rectfill(
              0,
              0,
              _ctx.canvas.width,
              _ctx.canvas.height,
              color
            );
          }
        },
        /**
         * Draw a rectangle outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {number} [color=0] the color index
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rect(x, y, width, height, color, radii = null) {
          DEV: assert(isFinite(x), "rect: 1st param must be a number");
          DEV: assert(isFinite(y), "rect: 2nd param must be a number");
          DEV: assert(
            isFinite(width) && width > 0,
            "rect: 3rd param must be a positive number"
          );
          DEV: assert(
            isFinite(height) && height >= 0,
            "rect: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "rect: 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isFinite(radii) || Array.isArray(radii) && radii.length >= 1,
            "rect: 6th param must be a number or array of numbers"
          );
          _ctx.beginPath();
          _ctx[radii ? "roundRect" : "rect"](
            ~~x - _outline_fix,
            ~~y - _outline_fix,
            ~~width + _outline_fix * 2,
            ~~height + _outline_fix * 2,
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
         * @param {number} [color=0] the color index
         * @param {number|number[]} [radii] A number or list specifying the radii used to draw a rounded-borders rectangle
         */
        rectfill(x, y, width, height, color, radii = null) {
          DEV: assert(isFinite(x), "rectfill: 1st param must be a number");
          DEV: assert(isFinite(y), "rectfill: 2nd param must be a number");
          DEV: assert(
            isFinite(width) && width >= 0,
            "rectfill: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isFinite(height) && height >= 0,
            "rectfill: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "rectfill: 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isFinite(radii) || Array.isArray(radii) && radii.length >= 1,
            "rectfill: 6th param must be a number or array of at least 2 numbers"
          );
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
         * @param {number} [color=0] the color index
         */
        circ(x, y, radius, color) {
          DEV: assert(isFinite(x), "circ: 1st param must be a number");
          DEV: assert(isFinite(y), "circ: 2nd param must be a number");
          DEV: assert(
            isFinite(radius) && radius >= 0,
            "circ: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "circ: 4th param must be a positive number or zero"
          );
          _ctx.beginPath();
          _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
          instance.stroke(color);
        },
        /**
         * Draw a color-filled circle
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radius
         * @param {number} [color=0] the color index
         */
        circfill(x, y, radius, color) {
          DEV: assert(isFinite(x), "circfill: 1st param must be a number");
          DEV: assert(isFinite(y), "circfill: 2nd param must be a number");
          DEV: assert(
            isFinite(radius) && radius >= 0,
            "circfill: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "circfill: 4th param must be a positive number or zero"
          );
          _ctx.beginPath();
          _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
          instance.fill(color);
        },
        /**
         * Draw a line
         *
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @param {number} [color=0] the color index
         */
        line(x1, y1, x2, y2, color) {
          DEV: assert(isFinite(x1), "line: 1st param must be a number");
          DEV: assert(isFinite(y1), "line: 2nd param must be a number");
          DEV: assert(
            isFinite(x2),
            "line: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isFinite(y2),
            "line: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "line: 5th param must be a positive number or zero"
          );
          _ctx.beginPath();
          let xfix = _outline_fix !== 0 && ~~x1 === ~~x2 ? 0.5 : 0;
          let yfix = _outline_fix !== 0 && ~~y1 === ~~y2 ? 0.5 : 0;
          _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix);
          _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix);
          instance.stroke(color);
        },
        /**
         * Sets the thickness of lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth(value) {
          DEV: assert(
            isFinite(value) && ~~value > 0,
            "linewidth: 1st param must be a positive number"
          );
          _ctx.lineWidth = ~~value;
          _outline_fix = ~~value % 2 === 0 ? 0 : 0.5;
        },
        /**
         * Sets the line dash pattern used when drawing lines
         *
         * @param {number[]} segments the line dash pattern
         * @param {number} [offset=0] the line dash offset, or "phase".
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
         */
        linedash(segments, offset = 0) {
          DEV: assert(
            Array.isArray(segments) && segments.length > 0,
            "linedash: 1st param must be an array of numbers"
          );
          DEV: assert(
            isFinite(offset),
            "linedash: 2nd param must be a number"
          );
          _ctx.setLineDash(segments);
          _ctx.lineDashOffset = offset;
        },
        /** TEXT RENDERING API */
        /**
         * Draw text
         *
         * @param {number} x
         * @param {number} y
         * @param {string} message the text message
         * @param {number} [color=3] the color index
         * @param {string} [fontStyle] can be "normal" (default), "italic" and/or "bold".
         */
        text(x, y, message, color = 3, fontStyle = "normal") {
          DEV: assert(isFinite(x), "text: 1st param must be a number");
          DEV: assert(isFinite(y), "text: 2nd param must be a number");
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "text: 4th param must be a positive number or zero"
          );
          DEV: assert(
            "string" === typeof fontStyle,
            "text: 5th param must be a string"
          );
          _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`;
          _ctx.fillStyle = instance.getcolor(color);
          _ctx.fillText(message, ~~x, ~~y);
        },
        /**
         * Set the font family
         *
         * @param {string} family
         */
        textfont(family) {
          DEV: assert(
            "string" === typeof family,
            "textfont: 1st param must be a string"
          );
          _fontFamily = family;
        },
        /**
         * Set the font size
         *
         * @param {number} size
         */
        textsize(size) {
          DEV: assert(isFinite(size), "textsize: 1st param must be a number");
          _fontSize = size;
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
          DEV: assert(
            null == align || ["left", "right", "center", "start", "end"].includes(align),
            "textalign: 1st param must be a string"
          );
          DEV: assert(
            null == baseline || [
              "top",
              "bottom",
              "middle",
              "hanging",
              "alphabetic",
              "ideographic"
            ].includes(baseline),
            "textalign: 2nd param must be a string"
          );
          if (align) _ctx.textAlign = align;
          if (baseline) _ctx.textBaseline = baseline;
        },
        /** IMAGE GRAPHICS API */
        /**
         * Draw an image
         *
         * @param {number} x
         * @param {number} y
         * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} source
         */
        image(x, y, source) {
          DEV: assert(isFinite(x), "image: 1st param must be a number");
          DEV: assert(isFinite(y), "image: 2nd param must be a number");
          _ctx.drawImage(source, ~~x, ~~y);
        },
        /**
         * Creates a offscreen canvas to draw on it
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} drawing
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas | HTMLCanvasElement} [options.canvas]
         * @returns {OffscreenCanvas}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, drawing, options = {}) {
          DEV: assert(isFinite(width), "paint: 1st param must be a number");
          DEV: assert(isFinite(height), "paint: 2nd param must be a number");
          DEV: assert(
            "function" === typeof drawing || Array.isArray(drawing),
            "paint: 3rd param must be a function or array"
          );
          DEV: assert(
            options && !options.scale || isFinite(options.scale),
            "paint: 4th param (options.scale) must be a number"
          );
          const canvas = options.canvas || new OffscreenCanvas(1, 1), scale = options.scale || 1, contextOriginal = _ctx;
          canvas.width = width * scale;
          canvas.height = height * scale;
          _ctx = canvas.getContext("2d");
          _ctx.scale(scale, scale);
          if (drawing.push) {
            let x = 0, y = 0;
            _ctx.imageSmoothingEnabled = false;
            for (const str of drawing) {
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
            drawing(_ctx);
          }
          _ctx = contextOriginal;
          return canvas;
        },
        /** ADVANCED GRAPHICS API */
        /**
         * Get or set the canvas context 2D
         *
         * @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} [context]
         * @returns {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
         */
        ctx(context) {
          if (context) {
            _ctx = context;
          }
          return _ctx;
        },
        /**
         * saves the current drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
         */
        push: () => _ctx.save(),
        /**
         * restores the drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        pop: () => _ctx.restore(),
        /**
         * Adds a translation to the transformation matrix.
         *
         * @param {number} x
         * @param {number} y
         */
        translate: (x, y) => {
          DEV: assert(isFinite(x), "translate: 1st param must be a number");
          DEV: assert(isFinite(y), "translate: 2nd param must be a number");
          return _ctx.translate(~~x, ~~y);
        },
        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
          DEV: assert(isFinite(x), "scale: 1st param must be a number");
          DEV: assert(
            y == null || isFinite(y),
            "scale: 2nd param must be a number"
          );
          return _ctx.scale(x, y || x);
        },
        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate: (radians) => {
          DEV: assert(isFinite(radians), "rotate: 1st param must be a number");
          return _ctx.rotate(radians);
        },
        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
          DEV: assert(isFinite(value), "alpha: 1st param must be a number");
          _ctx.globalAlpha = instance.clamp(value, 0, 1);
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
        path: (arg) => {
          DEV: assert(
            null == arg || "string" === typeof arg || arg instanceof Path2D,
            "path: 1st param must be a string or a Path2D instance"
          );
          return new Path2D(arg);
        },
        /**
         * Fills the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        fill(color, path2) {
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "fill: 1st param must be a positive number or zero"
          );
          DEV: assert(
            null == path2 || path2 instanceof Path2D,
            "fill: 2nd param must be a Path2D instance"
          );
          _ctx.fillStyle = instance.getcolor(color);
          if (path2) {
            _ctx.fill(path2);
          } else {
            _ctx.fill();
          }
        },
        /**
         * Outlines the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        stroke(color, path2) {
          DEV: assert(
            null == color || isFinite(color) && color >= 0,
            "stroke: 1st param must be a positive number or zero"
          );
          DEV: assert(
            null == path2 || path2 instanceof Path2D,
            "stroke: 2nd param must be a Path2D instance"
          );
          _ctx.strokeStyle = instance.getcolor(color);
          if (path2) {
            _ctx.stroke(path2);
          } else {
            _ctx.stroke();
          }
        },
        /**
         * Turn given path into a clipping region.
         *
         * @param {Path2D} path
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clip(path2) {
          DEV: assert(
            path2 instanceof Path2D,
            "clip: 1st param must be a Path2D instance"
          );
          _ctx.clip(path2);
        },
        /** SOUND API */
        /**
         * Play a sound effects using ZzFX library.
         * If the first argument is omitted, plays an default sound.
         *
         * @param {number[]} [zzfxParams] a ZzFX array of params
         * @param {number} [pitchSlide] a value to increment/decrement the pitch
         * @param {number} [volumeFactor] the volume factor
         * @returns {number[] | boolean} The sound that was played or `false`
         *
         * @see https://github.com/KilledByAPixel/ZzFX
         */
        sfx(zzfxParams, pitchSlide = 0, volumeFactor = 1) {
          DEV: assert(
            null == zzfxParams || Array.isArray(zzfxParams),
            "sfx: 1st param must be an array"
          );
          DEV: assert(isFinite(pitchSlide), "sfx: 2nd param must be a number");
          DEV: assert(
            isFinite(volumeFactor),
            "sfx: 3rd param must be a number"
          );
          if (root.zzfxV <= 0 || navigator.userActivation && !navigator.userActivation.hasBeenActive) {
            return false;
          }
          zzfxParams = zzfxParams || instance.DEFAULT_SFX;
          if (pitchSlide !== 0 || volumeFactor !== 1) {
            zzfxParams = zzfxParams.slice();
            zzfxParams[0] = volumeFactor * (zzfxParams[0] || 1);
            zzfxParams[10] = ~~zzfxParams[10] + pitchSlide;
          }
          zzfx.apply(0, zzfxParams);
          return zzfxParams;
        },
        /**
         * Set the ZzFX's global volume factor.
         * Note: use 0 to mute all sound effects.
         *
         * @param {number} value
         */
        volume(value) {
          DEV: assert(isFinite(value), "volume: 1st param must be a number");
          root.zzfxV = value;
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
        colrect: (x1, y1, w1, h1, x2, y2, w2, h2) => {
          DEV: assert(isFinite(x1), "colrect: 1st param must be a number");
          DEV: assert(isFinite(y1), "colrect: 2nd param must be a number");
          DEV: assert(isFinite(w1), "colrect: 3rd param must be a number");
          DEV: assert(isFinite(h1), "colrect: 4th param must be a number");
          DEV: assert(isFinite(x2), "colrect: 5th param must be a number");
          DEV: assert(isFinite(y2), "colrect: 6th param must be a number");
          DEV: assert(isFinite(w2), "colrect: 7th param must be a number");
          DEV: assert(isFinite(h2), "colrect: 8th param must be a number");
          return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
        },
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
        colcirc: (x1, y1, r1, x2, y2, r2) => {
          DEV: assert(isFinite(x1), "colcirc: 1st param must be a number");
          DEV: assert(isFinite(y1), "colcirc: 2nd param must be a number");
          DEV: assert(isFinite(r1), "colcirc: 3rd param must be a number");
          DEV: assert(isFinite(x2), "colcirc: 4th param must be a number");
          DEV: assert(isFinite(y2), "colcirc: 5th param must be a number");
          DEV: assert(isFinite(r2), "colcirc: 6th param must be a number");
          return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) <= (r1 + r2) * (r1 + r2);
        },
        /** PLUGINS API */
        /**
         * Prepares a plugin to be loaded
         *
         * @param {pluginCallback} callback
         */
        use(callback, config = {}) {
          DEV: assert(
            "function" === typeof callback,
            "use: 1st param must be a function"
          );
          DEV: assert(
            "object" === typeof config,
            "use: 2nd param must be an object"
          );
          _initialized ? loadPlugin(callback, config) : _plugins.push([callback, config]);
        },
        /**
         * Add a game event listener
         *
         * @param {string} eventName the event type name
         * @param {Function} callback the function that is called when the event occurs
         * @returns {Function} a function to remove the listener
         */
        listen(eventName, callback) {
          DEV: assert(
            "string" === typeof eventName,
            "listen: 1st param must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            "listen: 2nd param must be a function"
          );
          _events[eventName] = _events[eventName] || /* @__PURE__ */ new Set();
          _events[eventName].add(callback);
          return () => _events[eventName].delete(callback);
        },
        /**
         * Call all listeners attached to a game event
         *
         * @param {string} eventName The event type name
         * @param {*} [arg1] any data to be passed over the listeners
         * @param {*} [arg2] any data to be passed over the listeners
         * @param {*} [arg3] any data to be passed over the listeners
         * @param {*} [arg4] any data to be passed over the listeners
         */
        emit(eventName, arg1, arg2, arg3, arg4) {
          DEV: assert(
            "string" === typeof eventName,
            "emit: 1st param must be a string"
          );
          if (_initialized) {
            triggerEvent("before:" + eventName, arg1, arg2, arg3, arg4);
            triggerEvent(eventName, arg1, arg2, arg3, arg4);
            triggerEvent("after:" + eventName, arg1, arg2, arg3, arg4);
          }
        },
        /**
         * Get a color by index
         *
         * @param {number} [index=0] The color number
         * @returns {string} the color code
         */
        getcolor: (index) => {
          DEV: assert(
            null == index || isFinite(index) && index >= 0,
            "getcolor: 1st param must be a number"
          );
          return colors[~~index % colors.length];
        },
        /**
         * Create or update a instance variable
         *
         * @param {string} key
         * @param {*} value
         */
        setvar(key, value) {
          DEV: assert(
            "string" === typeof key,
            "setvar: 1st param must be a string"
          );
          if (value == null) {
            console.warn(`setvar: key "${key}" was defined as ${value}`);
          }
          instance[key] = value;
          if (_global) {
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
          DEV: assert(
            isFinite(width) && width > 0,
            "resize: 1st param must be a number"
          );
          DEV: assert(
            isFinite(height) && height > 0,
            "resize: 2nd param must be a number"
          );
          instance.setvar("WIDTH", _canvas.width = width);
          instance.setvar("HEIGHT", _canvas.height = height);
          instance.setvar("CENTERX", instance.WIDTH / 2);
          instance.setvar("CENTERY", instance.HEIGHT / 2);
          onResize();
        },
        /**
         * The scale of the game's delta time (dt).
         * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
         * A value of 0 freezes time and is effectively equivalent to pausing.
         *
         * @param {number} value
         */
        timescale(value) {
          DEV: assert(
            isFinite(value),
            "timescale: 1st param must be a number"
          );
          _timeScale = value;
        },
        /**
         * Set the target FPS at runtime.
         *
         * @param {number} value
         */
        setfps(value) {
          DEV: assert(
            isFinite(value) && value >= 1,
            "setfps: 1st param must be a positive number"
          );
          _deltaTime = 1 / ~~value;
        },
        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
          instance.emit("quit");
          for (const removeListener of _browserEventListeners) {
            removeListener();
          }
          cancelAnimationFrame(_rafid);
          _events = false;
          if (_global) {
            for (const key in instance) {
              delete root[key];
            }
            delete root.__litecanvas;
          }
        }
      };
      for (const k of "PI,sin,cos,atan2,hypot,tan,abs,ceil,round,floor,trunc,min,max,pow,sqrt,sign,exp".split(",")) {
        instance[k] = Math[k];
      }
      function init() {
        _initialized = true;
        const source = settings.loop ? settings.loop : root;
        for (const event in _events) {
          if (source[event]) instance.listen(event, source[event]);
        }
        for (const [callback, config] of _plugins) {
          loadPlugin(callback, config);
        }
        if (_autoscale) {
          on(root, "resize", onResize);
        }
        if (settings.tapEvents) {
          const _getXY = (pageX, pageY) => [
            (pageX - _canvas.offsetLeft) / _scale,
            (pageY - _canvas.offsetTop) / _scale
          ], _taps = /* @__PURE__ */ new Map(), _registerTap = (id, x, y) => {
            const tap = {
              x,
              y,
              startX: x,
              startY: y,
              // timestamp
              ts: performance.now()
            };
            _taps.set(id, tap);
            return tap;
          }, _updateTap = (id, x, y) => {
            const tap = _taps.get(id) || _registerTap(id);
            tap.x = x;
            tap.y = y;
          }, _checkTapped = (tap) => tap && performance.now() - tap.ts <= 200, preventDefault = (ev) => ev.preventDefault();
          let _pressingMouse = false;
          on(_canvas, "mousedown", (ev) => {
            if (ev.button === 0) {
              preventDefault(ev);
              const [x, y] = _getXY(ev.pageX, ev.pageY);
              instance.emit("tap", x, y, 0);
              _registerTap(0, x, y);
              _pressingMouse = true;
            }
          });
          on(_canvas, "mouseup", (ev) => {
            if (ev.button === 0) {
              preventDefault(ev);
              const tap = _taps.get(0);
              const [x, y] = _getXY(ev.pageX, ev.pageY);
              if (_checkTapped(tap)) {
                instance.emit("tapped", tap.startX, tap.startY, 0);
              }
              instance.emit("untap", x, y, 0);
              _taps.delete(0);
              _pressingMouse = false;
            }
          });
          on(_canvas, "mousemove", (ev) => {
            preventDefault(ev);
            const [x, y] = _getXY(ev.pageX, ev.pageY);
            instance.setvar("MOUSEX", x);
            instance.setvar("MOUSEY", y);
            if (!_pressingMouse) return;
            instance.emit("tapping", x, y, 0);
            _updateTap(0, x, y);
          });
          on(_canvas, "touchstart", (ev) => {
            preventDefault(ev);
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch.pageX, touch.pageY);
              instance.emit("tap", x, y, touch.identifier + 1);
              _registerTap(touch.identifier + 1, x, y);
            }
          });
          on(_canvas, "touchmove", (ev) => {
            preventDefault(ev);
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch.pageX, touch.pageY);
              instance.emit("tapping", x, y, touch.identifier + 1);
              _updateTap(touch.identifier + 1, x, y);
            }
          });
          const _touchEndHandler = (ev) => {
            preventDefault(ev);
            const existing = [];
            if (ev.targetTouches.length > 0) {
              for (const touch of ev.targetTouches) {
                existing.push(touch.identifier + 1);
              }
            }
            for (const [id, tap] of _taps) {
              if (existing.includes(id)) continue;
              if (_checkTapped(tap)) {
                instance.emit("tapped", tap.startX, tap.startY, id);
              }
              instance.emit("untap", tap.x, tap.y, id);
              _taps.delete(id);
            }
          };
          on(_canvas, "touchend", _touchEndHandler);
          on(_canvas, "touchcancel", _touchEndHandler);
          on(root, "blur", () => {
            _pressingMouse = false;
            for (const [id, tap] of _taps) {
              instance.emit("untap", tap.x, tap.y, id);
              _taps.delete(id);
            }
          });
        }
        if (settings.keyboardEvents) {
          const _keyDownList = /* @__PURE__ */ new Set();
          const iskeydown = (key) => {
            DEV: assert(
              "string" === typeof key,
              "iskeydown: 1st param must be a string"
            );
            key = key.toLowerCase();
            return "any" === key ? _keyDownList.size > 0 : _keyDownList.has("space" === key ? " " : key);
          };
          instance.setvar("iskeydown", iskeydown);
          on(root, "keydown", (event) => {
            _keyDownList.add(event.key.toLowerCase());
          });
          on(root, "keyup", (event) => {
            _keyDownList.delete(event.key.toLowerCase());
          });
          on(root, "blur", () => _keyDownList.clear());
        }
        if (settings.pauseOnBlur) {
          on(root, "blur", () => {
            _rafid = cancelAnimationFrame(_rafid);
          });
          on(root, "focus", () => {
            if (!_rafid) {
              _rafid = raf(drawFrame);
            }
          });
        }
        instance.setfps(60);
        instance.emit("init", instance);
        _lastFrameTime = performance.now();
        _rafid = raf(drawFrame);
      }
      function drawFrame(now) {
        if (_animated) {
          _rafid = raf(drawFrame);
        }
        let updated = 0, frameTime = (now - _lastFrameTime) / 1e3;
        _lastFrameTime = now;
        if (frameTime > _deltaTime * 30) {
          console.log("skipping too long frame");
        } else {
          _accumulated += frameTime;
          if (!_animated) {
            _accumulated = _deltaTime;
          }
          for (; _accumulated >= _deltaTime; _accumulated -= _deltaTime) {
            instance.emit("update", _deltaTime * _timeScale);
            instance.setvar(
              "ELAPSED",
              instance.ELAPSED + _deltaTime * _timeScale
            );
            updated++;
          }
        }
        if (updated || !_animated) {
          instance.textalign("start", "top");
          instance.emit("draw");
        }
      }
      function setupCanvas() {
        _canvas = "string" === typeof _canvas ? document.querySelector(_canvas) : _canvas;
        DEV: assert(
          _canvas && _canvas.tagName === "CANVAS",
          "Invalid canvas element"
        );
        DEV: assert(
          null == instance.WIDTH || instance.WIDTH > 0,
          `Litecanvas' "width" option should be null or a positive number`
        );
        DEV: assert(
          null == instance.HEIGHT || instance.HEIGHT > 0,
          `Litecanvas' "width" option should be null or a positive number`
        );
        DEV: assert(
          null == instance.HEIGHT || instance.WIDTH > 0 && instance.HEIGHT > 0,
          `Litecanvas' "width" is required when "heigth" is passed`
        );
        instance.setvar("CANVAS", _canvas);
        _ctx = _canvas.getContext("2d");
        on(_canvas, "click", () => root.focus());
        _canvas.style = "";
        if (!instance.WIDTH) {
          instance.WIDTH = root.innerWidth;
          instance.HEIGHT = root.innerHeight;
        }
        instance.resize(instance.WIDTH, instance.HEIGHT, false);
        if (!_canvas.parentNode) document.body.appendChild(_canvas);
      }
      function onResize() {
        const styles = _canvas.style;
        if (_autoscale) {
          if (!styles.display) {
            styles.display = "block";
            styles.margin = "auto";
          }
          _scale = Math.min(
            root.innerWidth / instance.WIDTH,
            root.innerHeight / instance.HEIGHT
          );
          _scale = (settings.pixelart ? ~~_scale : _scale) || 1;
          styles.width = instance.WIDTH * _scale + "px";
          styles.height = instance.HEIGHT * _scale + "px";
        }
        if (!settings.antialias || settings.pixelart) {
          _ctx.imageSmoothingEnabled = false;
          styles.imageRendering = "pixelated";
        }
        instance.emit("resized", _scale);
        if (!_animated) {
          raf(drawFrame);
        }
      }
      function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (!_events[eventName]) return;
        for (const callback of _events[eventName]) {
          callback(arg1, arg2, arg3, arg4);
        }
      }
      function loadPlugin(callback, config) {
        const pluginData = callback(instance, _helpers, config);
        DEV: assert(
          null == pluginData || "object" === typeof pluginData,
          "Litecanvas plugins should return an object or nothing"
        );
        for (const key in pluginData) {
          instance.setvar(key, pluginData[key]);
        }
      }
      if (_global) {
        if (root.__litecanvas) {
          throw "global litecanvas already instantiated";
        }
        Object.assign(root, instance);
        root.__litecanvas = instance;
      }
      setupCanvas();
      if ("loading" === document.readyState) {
        on(root, "DOMContentLoaded", () => raf(init));
      } else {
        raf(init);
      }
      return instance;
    }
    globalThis.litecanvas = litecanvas;
  })();
  (() => {
    var Mt = Object.defineProperty;
    var Et = (e, t) => {
      for (var r in t) Mt(e, r, { get: t[r], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var U = {};
    Et(U, { ANCHOR_BOT_LEFT: () => Jt, ANCHOR_BOT_RIGHT: () => vt, ANCHOR_CENTER: () => Kt, ANCHOR_TOP_LEFT: () => Q, ANCHOR_TOP_RIGHT: () => Qt, Actor: () => R, BACK_IN: () => ae, BACK_IN_OUT: () => ie, BACK_OUT: () => ne, BOUNCE_IN: () => ut, BOUNCE_IN_OUT: () => le, BOUNCE_OUT: () => Y, Camera: () => y, DOWN: () => $t, EASE_IN: () => ee, EASE_IN_OUT: () => se, EASE_OUT: () => re, ELASTIC_IN: () => oe, ELASTIC_IN_OUT: () => ue, ELASTIC_OUT: () => he, Grid: () => I, LEFT: () => Zt, LINEAR: () => ht, Noise: () => F, ONE: () => jt, RIGHT: () => Vt, TypedGrid: () => P, UP: () => qt, Vector: () => T, ZERO: () => K, advance: () => et, diff: () => J, dist: () => at, flipImage: () => ct, fract: () => tt, head: () => yt, intersection: () => E, last: () => Tt, lerpAngle: () => ot, mag: () => nt, makeCircle: () => bt, makeRectangle: () => dt, mean: () => it, mod: () => rt, range: () => _t, resolve: () => W, roundd: () => st, sample: () => gt, scaleImage: () => mt, shuffle: () => xt, sum: () => k, tail: () => wt, tintImage: () => ft, tween: () => te, vec: () => i, vecAbs: () => Xt, vecAdd: () => D, vecAngle: () => Lt, vecAngleBetween: () => St, vecCeil: () => Ft, vecClamp: () => Wt, vecCross: () => Rt, vecDist: () => Ct, vecDist2: () => Dt, vecDiv: () => A, vecDot: () => Z, vecEq: () => C, vecFloor: () => Ut, vecIsZero: () => Gt, vecLerp: () => Nt, vecLimit: () => Pt, vecMag: () => V, vecMag2: () => $, vecMove: () => zt, vecMult: () => w, vecNorm: () => S, vecRand: () => Yt, vecReflect: () => Ht, vecRotate: () => kt, vecRound: () => Bt, vecSet: () => q, vecSetMag: () => Ot, vecSub: () => L, wave: () => v });
    var E = (e, t, r, s, a, n, o, h) => {
      let u = Math.max(e, a), d = Math.min(e + r, a + o) - u, p = Math.max(t, n), _ = Math.min(t + s, n + h) - p;
      return [u, p, d, _];
    };
    var W = (e, t, r, s, a, n, o, h) => {
      let [u, d, p, _] = E(e, t, r, s, a, n, o, h), b = "", g = e, l = t;
      return p < _ ? e < a ? (b = "right", g = a - r) : (b = "left", g = a + o) : t < n ? (b = "bottom", l = n - s) : (b = "top", l = n + h), { direction: b, x: g, y: l };
    };
    var y = class {
      _engine = null;
      x = 0;
      y = 0;
      ox = 0;
      oy = 0;
      width = 0;
      height = 0;
      rotation = 0;
      scale = 1;
      _shake = { x: 0, y: 0, removeListener: null };
      constructor(t = null, r = 0, s = 0, a = null, n = null) {
        this._engine = t || globalThis, this.ox = r, this.oy = s, this.resize(a || this._engine.WIDTH - r, n || this._engine.HEIGHT - s), this.x = this.width / 2, this.y = this.height / 2;
      }
      resize(t, r) {
        this.width = t, this.height = r, this._engine.emit("camera-resized", this);
      }
      start(t = false) {
        if (this._engine.push(), t) {
          let a = path();
          a.rect(this.ox, this.oy, this.width, this.height), this._engine.clip(a);
        }
        let r = this.ox + this.width / 2, s = this.oy + this.height / 2;
        this._engine.translate(r, s), this._engine.scale(this.scale), this._engine.rotate(this.rotation), this._engine.translate(-this.x + this._shake.x, -this.y + this._shake.y);
      }
      end() {
        this._engine.pop();
      }
      lookAt(t, r) {
        this.x = t, this.y = r;
      }
      move(t, r) {
        this.x += t, this.y += r;
      }
      zoom(t) {
        this.scale *= t;
      }
      zoomTo(t) {
        this.scale = t;
      }
      rotate(t) {
        this.rotation += t;
      }
      rotateTo(t) {
        this.rotation = t;
      }
      getWorldPoint(t, r, s = {}) {
        let a = Math.cos(-this.rotation), n = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, r = (r - this.height / 2 - this.oy) / this.scale, s.x = a * t - n * r + this.x, s.y = n * t + a * r + this.y, s;
      }
      getCameraPoint(t, r, s = {}) {
        let a = Math.cos(-this.rotation), n = Math.sin(-this.rotation);
        return t = t - this.x, r = r - this.y, t = a * t - n * r, r = n * t + a * r, s.x = t * this.scale + this.width / 2 + this.ox, s.y = r * this.scale + this.height / 2 + this.oy, s;
      }
      getBounds() {
        return [this.ox, this.oy, this.width, this.height];
      }
      viewing(t, r, s, a) {
        let n = this.width / 2 - this.x, o = this.height / 2 - this.y, h = this.width / this.scale, u = this.height / this.scale;
        return this._engine.colrect(t, r, s, a, n, o, h, u);
      }
      shake(t = 1, r = 0.3) {
        this.shaking || (this._shake.removeListener = this._engine.listen("update", (s) => {
          this._shake.x = this._engine.randi(-t, t), this._shake.y = this._engine.randi(-t, t), r -= s, r <= 0 && this.unshake();
        }));
      }
      unshake() {
        this.shaking && (this._shake.removeListener(), this._shake.removeListener = null, this._shake.x = this._shake.y = 0);
      }
      get shaking() {
        return this._shake.removeListener !== null;
      }
    };
    var I = class e {
      _w;
      _h;
      _c;
      constructor(t, r, s = []) {
        this._w = Math.max(1, ~~t), this._h = Math.max(1, ~~r), this._c = s;
      }
      [Symbol.iterator]() {
        let t = 0;
        return { next: () => ({ value: [this.indexToPointX(t), this.indexToPointY(t), this._c[t++]], done: t > this._c.length }) };
      }
      clone() {
        return new e(this._w, this._h, this._c);
      }
      clear() {
        this.forEach((t, r) => this.set(t, r, void 0));
      }
      get width() {
        return this._w;
      }
      get height() {
        return this._h;
      }
      set(t, r, s) {
        this._c[this.pointToIndex(t, r)] = s;
      }
      get(t, r) {
        return this._c[this.pointToIndex(t, r)];
      }
      has(t, r) {
        return this.get(t, r) != null;
      }
      check(t, r) {
        return t >= 0 && t < this._w && r >= 0 && r < this._h;
      }
      get length() {
        return this._w * this._h;
      }
      pointToIndex(t, r) {
        return this.clampX(~~t) + this.clampY(~~r) * this._w;
      }
      indexToPointX(t) {
        return t % this._w;
      }
      indexToPointY(t) {
        return Math.floor(t / this._w);
      }
      forEach(t, r = false) {
        let s = r ? this.length - 1 : 0, a = r ? -1 : this.length, n = r ? -1 : 1;
        for (; s !== a; ) {
          let o = this.indexToPointX(s), h = this.indexToPointY(s), u = this._c[s];
          if (t(o, h, u, this) === false) break;
          s += n;
        }
      }
      fill(t) {
        this.forEach((r, s) => {
          this.set(r, s, t);
        });
      }
      clampX(t) {
        return z(t, 0, this._w - 1);
      }
      clampY(t) {
        return z(t, 0, this._h - 1);
      }
      toArray() {
        return this._c.slice();
      }
      toString(t = " ", r = true) {
        if (!r) return this._c.join(t);
        let s = [];
        return this.forEach((a, n, o) => {
          s[n] = s[n] || "", s[n] += o + t;
        }), s.join(`
`);
      }
    }, P = class e extends I {
      constructor(t, r, s = Uint8Array) {
        super(t, r, null), this._c = new s(this._w * this._h);
      }
      has(t, r) {
        return this.get(t, r) !== 0;
      }
      clone() {
        let t = new e(this._w, this._h, this._c.constructor);
        return this.forEach((r, s, a) => {
          t.set(r, s, a);
        }), t;
      }
    };
    function z(e, t, r) {
      return e < t ? t : e > r ? r : e;
    }
    var It = Math.sqrt, G = Math.cos, j = Math.sin, At = 2 * Math.PI, T = class {
      x;
      y;
      constructor(t = 0, r = t) {
        this.x = t, this.y = r;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, x = (e) => e instanceof T, i = (e = 0, t = e) => (x(e) && (t = e.y, e = e.x), new T(e, t)), C = (e, t, r = t) => x(t) ? C(e, t.x, t.y) : e.x === t && e.y === r, q = (e, t, r = t) => (x(t) ? q(e, t.x, t.y) : (e.x = t, e.y = r), e), D = (e, t, r = t) => x(t) ? D(e, t.x, t.y) : (e.x += t, e.y += r, e), L = (e, t, r = t) => x(t) ? L(e, t.x, t.y) : (e.x -= t, e.y -= r, e), w = (e, t, r = t) => x(t) ? w(e, t.x, t.y) : (e.x *= t, e.y *= r, e), A = (e, t, r = t) => x(t) ? A(e, t.x, t.y) : (e.x /= t || 1, e.y /= r || 1, e), kt = (e, t) => {
      let r = G(t), s = j(t);
      return e.x = r * e.x - s * e.y, e.y = s * e.x + r * e.y, e;
    }, Ht = (e, t) => {
      let r = S(i(t));
      return L(e, w(r, 2 * Z(e, r)));
    }, Ot = (e, t) => (S(e), w(e, t), e), V = (e) => Math.hypot(e.x, e.y), $ = (e) => e.x * e.x + e.y * e.y, S = (e) => {
      let t = V(e);
      return t > 0 && A(e, t), e;
    }, Pt = (e, t = 1) => {
      let r = $(e);
      return r > t * t && (A(e, It(r)), w(e, t)), e;
    }, Ct = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), Dt = (e, t) => {
      let r = e.x - t.x, s = e.y - t.y;
      return r * r + s * s;
    }, Lt = (e) => Math.atan2(e.y, e.x), St = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), Z = (e, t) => e.x * t.x + e.y * t.y, Rt = (e, t) => e.x * t.y - e.y * t.x, Nt = (e, t, r) => (e.x += (t.x - e.x) * r || 0, e.y += (t.y - e.y) * r || 0, e), Yt = (e = 1, t = e, r = globalThis.rand || Math.random) => {
      let s = r() * At, a = r() * (t - e) + e;
      return i(G(s) * a, j(s) * a);
    }, Xt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Ft = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Ut = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Bt = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Wt = (e, t, r) => (e.x < t.x && (e.x = t.x), e.x > r.x && (e.x = r.x), e.y < t.y && (e.y = t.y), e.y > r.y && (e.y = r.y), e), zt = (e, t, r = 1) => D(e, t.x * r, t.y * r), Gt = (e) => C(e, K), K = i(0, 0), jt = i(1, 1), qt = i(0, -1), Vt = i(1, 0), $t = i(0, 1), Zt = i(-1, 0);
    var Kt = i(0.5, 0.5), Q = i(0, 0), Qt = i(1, 0), Jt = i(0, 1), vt = i(1, 1), R = class {
      sprite;
      pos;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, r, s = Q) {
        this.sprite = t, this.pos = r || i(0), this._o = i(s), this._s = i(1, 1);
      }
      set x(t) {
        this.pos.x = t;
      }
      get x() {
        return this.pos.x;
      }
      set y(t) {
        this.pos.y = t;
      }
      get y() {
        return this.pos.y;
      }
      set anchor(t) {
        this._o.x = t.x, this._o.y = t.y;
      }
      get anchor() {
        return this._o;
      }
      get width() {
        return this.sprite.width * this._s.x;
      }
      get height() {
        return this.sprite.height * this._s.y;
      }
      get scale() {
        return this._s;
      }
      scaleTo(t, r = t) {
        this._s.x = t, this._s.y = r;
      }
      scaleBy(t, r = t) {
        this._s.x *= t, this._s.y *= r;
      }
      getBounds(t = true) {
        let r = this.sprite.width * (t ? this._s.x : 1), s = this.sprite.height * (t ? this._s.y : 1), a = this.pos.x - r * this.anchor.x, n = this.pos.y - s * this.anchor.y;
        return [a, n, r, s];
      }
      draw(t = globalThis, r = true) {
        this.hidden || this.opacity <= 0 || (r && t.push(), this.transform(t), this.drawImage(t), r && t.pop());
      }
      transform(t) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t, r = true) {
        let s = this.anchor, a = -this.sprite.width * (this.flipX ? 1 - s.x : s.x), n = -this.sprite.height * (this.flipY ? 1 - s.y : s.y);
        r && t.alpha(this.opacity), t.image(a, n, this.sprite);
      }
    };
    var J = (e, t) => Math.abs(t - e) || 0;
    var v = (e, t, r, s = Math.sin) => e + (s(r) + 1) / 2 * (t - e);
    var tt = (e) => e % 1 || 0;
    var et = advance = (e, t, r, s = 1) => {
      r && (t.x += r.x * s, t.y += r.y * s), e.x += t.x * s, e.y += t.y * s;
    };
    var rt = (e, t) => (t + e % t) % t;
    var st = (e, t = 0) => {
      if (!t) return Math.round(e);
      let r = Math.pow(10, t);
      return Math.round(e * r) / r;
    };
    var at = (e, t, r, s) => Math.hypot(r - e, s - t);
    var nt = (e, t) => Math.hypot(e, t);
    var k = (e) => {
      let t = 0;
      for (let r = 0; r < e.length; r++) t += e[r];
      return t;
    };
    var it = (e) => k(e) / e.length;
    var ot = (e, t, r) => {
      let s = (t - e) % 360;
      return s > 180 ? s -= 360 : s < -180 && (s += 360), e + s * r;
    };
    var H = Math.PI / 2, te = (e, t, r, s = 1, a = ht) => new N(e, t, r, s, a), ht = (e) => e, ee = (e) => e * e, re = (e) => -e * (e - 2), se = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, ae = (e) => e * e * e - e * Math.sin(e * Math.PI), ne = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, ie = (e) => {
      if (e < 0.5) {
        let r = 2 * e;
        return 0.5 * (r * r * r - r * Math.sin(r * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, oe = (e) => Math.sin(13 * H * e) * Math.pow(2, 10 * (e - 1)), he = (e) => Math.sin(-13 * H * (e + 1)) * Math.pow(2, -10 * e) + 1, ue = (e) => {
      if (e < 0.5) {
        let s = Math.sin(13 * H * (2 * e)), a = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * s * a;
      }
      let t = Math.sin(-13 * H * (2 * e - 1 + 1)), r = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * r + 2);
    }, ut = (e) => 1 - Y(1 - e), Y = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, le = (e) => e < 0.5 ? 0.5 * ut(e * 2) : 0.5 * Y(e * 2 - 1) + 0.5, N = class {
      running = false;
      _o;
      _p;
      _x;
      _d;
      _w;
      _e;
      _rel;
      _cb = [];
      _t = 0;
      _u = 0;
      _ch = this;
      _cu = this;
      _lc;
      constructor(t, r, s, a, n) {
        this._o = t, this._p = r, this._x = s, this._d = a, this._e = n, this._w = 0;
      }
      start(t) {
        if (this.running) return this;
        this._cu.stop(false), this._ch = this._cu = this, this.running = true;
        let r = this._o[this._p] || 0, s = this._rel ? r + this._x : this._x;
        return this._lc = this._lc || t || globalThis, this._u = this._lc.listen("update", (a) => {
          if (this._t <= this._w) {
            this._t += a;
            return;
          }
          let n = this._t - this._w;
          this._o[this._p] = this._lc.lerp(r, s, this._e(n / this._d)), this._t += a, n >= this._d && (this._o[this._p] = s, this.stop());
        }), this;
      }
      stop(t = true) {
        if (!this._u) return this;
        if (this.running = false, this._u(), this._t = 0, t) for (let r of this._cb) r(this._o);
        return this;
      }
      restart(t = null, r = false) {
        return this.stop(r).restart(t);
      }
      onEnd(t) {
        return this._cb.push(t), this;
      }
      chain(t) {
        return this._ch.onEnd(() => {
          this._cu = t.start(this._lc);
        }), this._ch = t, this;
      }
      reset() {
        return this._cb.length = 0, this.stop();
      }
      relative(t = true) {
        return this._rel = t, this;
      }
      delay(t) {
        return this._w = t, this;
      }
      get current() {
        return this._cu;
      }
      get progress() {
        return this.running && this._t > this._w ? (this._t - this._w) / this._d : 0;
      }
    };
    var lt = 4, O = 1 << lt, pt = 8, pe = 1 << pt, f = 4095, X = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), F = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, r = 0, s = 0) {
        t < 0 && (t = -t), r < 0 && (r = -r), s < 0 && (s = -s);
        let a = Math.floor(t), n = Math.floor(r), o = Math.floor(s), h = t - a, u = r - n, d = s - o, p, _, b = 0, g = 0.5, l, c, M;
        for (let B = 0; B < this._po; B++) {
          let m = a + (n << lt) + (o << pt);
          p = X(h), _ = X(u), l = this._p[m & f], l += p * (this._p[m + 1 & f] - l), c = this._p[m + O & f], c += p * (this._p[m + O + 1 & f] - c), l += _ * (c - l), m += pe, c = this._p[m & f], c += p * (this._p[m + 1 & f] - c), M = this._p[m + O & f], M += p * (this._p[m + O + 1 & f] - M), c += _ * (M - c), l += X(d) * (c - l), b += l * g, g *= this._pf, a <<= 1, h *= 2, n <<= 1, u *= 2, o <<= 1, d *= 2, h >= 1 && (a++, h--), u >= 1 && (n++, u--), d >= 1 && (o++, d--);
        }
        return b;
      }
      noiseDetail(t, r) {
        t > 0 && (this._po = t), r > 0 && (this._pf = r);
      }
      noiseSeed(t = null) {
        t != null && this._e.seed(t);
        let r = this._e.rand || Math.random;
        for (let s = 0; s < f + 1; s++) this._p[s] = r();
      }
    };
    var ct = (e, t = true, r = false, s = globalThis) => s.paint(e.width, e.height, (a) => {
      s.push(), s.scale(t ? -1 : 1, r ? -1 : 1), s.image(t ? -e.width : 0, r ? -e.height : 0, e), s.pop();
    });
    var mt = (e, t, r = true, s = globalThis) => s.paint(e.width * t, e.height * t, (a) => {
      s.push(), a.imageSmoothingEnabled = !r, s.scale(t), s.image(0, 0, e), s.pop();
    });
    var ft = (e, t, r = 1, s = globalThis) => s.paint(e.width, e.height, (a) => {
      s.push(), s.alpha(r), s.rectfill(0, 0, e.width, e.height, t), a.globalCompositeOperation = "destination-atop", s.alpha(1), s.image(0, 0, e), s.pop();
    });
    var bt = (e, t, { borderWidth: r = 0, borderColor: s = 0, engine: a = globalThis } = {}) => {
      let n = e * 2 + r;
      return a.paint(n, n, () => {
        a.circfill(n / 2, n / 2, e, t), r > 0 && (a.linewidth(r), a.stroke(s));
      });
    };
    var dt = (e, t, r, { borderWidth: s = 0, borderColor: a = 0, engine: n = globalThis } = {}) => {
      let o = e + s * 2, h = t + s * 2;
      return n.paint(o, h, () => {
        n.rectfill(s > 0 ? s : 0, s > 0 ? s : 0, e, t, r), s > 0 && (n.linewidth(s), n.stroke(a));
      });
    };
    var _t = (e, t = 0, r = 1) => Array.from(Array(e).keys().map((s) => t + r * s));
    var xt = (e, t = globalThis.rand || Math.random) => {
      e = Array.from(e);
      for (let r = e.length - 1; r > 0; r--) {
        let s = Math.floor(t() * (r + 1)), a = e[r];
        e[r] = e[s], e[s] = a;
      }
      return e;
    };
    var gt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var yt = (e) => e[0];
    var Tt = (e) => e[e.length - 1];
    var wt = (e) => e.slice(1);
    globalThis.utils = Object.assign(globalThis.utils || {}, U);
  })();
  (() => {
    function m(t) {
      return t.split("\\").pop().split("/").pop().split(".")[0];
    }
    function S(t, n) {
      return n && !b(t) && (t = n + t), t;
    }
    function b(t) {
      try {
        return !!new URL(t).protocol;
      } catch {
      }
      return false;
    }
    var E = { crossOrigin: "anonymous", baseURL: null, allowSoundInterruptions: true, ignoreErrors: false }, d = (t, n) => {
      let e = "LOADING";
      t.setvar(e, ~~t[e] + ~~n);
    };
    function T(t, n, e = {}) {
      return e = Object.assign({}, E, e), t.setvar("ASSETS", t.ASSETS || {}), t.ASSETS.font = {}, { loadFont: async (o, r, i) => {
        let { baseURL: p, ignoreErrors: l } = e, c = m(r);
        r = S(r, p);
        let a = new FontFace(o, `url(${r})`), s = { asset: a, type: "font", fontName: o, src: r, id: c };
        t.emit("filter-asset", a, s), document.fonts.add(a), d(t, 1);
        let f = a.load();
        return f.then((h) => {
          ASSETS.font[c] = h, i && i(h), t.emit("asset-load", s), d(t, -1);
        }).catch((h) => {
          if (console.error(h), !l) throw new Error("Failed to load font from " + r);
          i && i(), t.emit("asset-error", s);
        }), f;
      } };
    }
    function x(t, { colors: n }, e = {}) {
      return e = Object.assign({}, E, e), t.setvar("ASSETS", t.ASSETS || {}), t.ASSETS.image = {}, { loadImage: async (o, r) => {
        let { baseURL: i, ignoreErrors: p, crossOrigin: l } = e, c = { splitFrames: H, convertColors: F(n) }, a = m(o);
        o = S(o, i);
        let s = new Image(), f = { asset: s, type: "image", src: o, id: a };
        return new Promise((h) => {
          d(t, 1), s.crossOrigin = l, s.onerror = (w) => {
            console.error(w);
            let g = "Failed to load image from " + o;
            if (!p) throw new Error(g);
            r && r(), t.emit("asset-error", f);
          }, s.onload = () => {
            t.ASSETS.image[a] = s, r && r(s, c), t.emit("asset-load", f), d(t, -1), h(s);
          }, t.emit("filter-asset", s, f), s.src = o;
        });
      } };
    }
    function H(t, n, e, u = 0, o = 0) {
      let r = [], i = Math.floor((t.width + o) / (n + o)), p = Math.floor((t.height + o) / (e + o));
      for (let l = 0; l < p; l++) for (let c = 0; c < i; c++) {
        let a = new OffscreenCanvas(n, e);
        a.getContext("2d").drawImage(t, u + c * n + c * o, u + l * e + l * o, n, e, 0, 0, n, e), r.push(a);
      }
      return r;
    }
    function F(t) {
      return (n, e = false) => {
        let u = new OffscreenCanvas(n.width, n.height), o = u.getContext("2d");
        o.drawImage(n, 0, 0);
        let r = o.getImageData(0, 0, n.width, n.height), i = r.data, p = /* @__PURE__ */ new Map();
        for (let l = 0, c = i.length; l < c; l += 4) {
          let a = i[l], s = i[l + 1], f = i[l + 2], h = [a, s, f], w = h.join(","), g = p.get(w);
          g || (g = R(h, t), p.set(w, g));
          let D = g.startsWith("#") ? I(g) : O(g);
          i[l] = D[0], i[l + 1] = D[1], i[l + 2] = D[2], i[l + 3] = e ? i[l + 3] : 255;
        }
        return o.putImageData(r, 0, 0), u;
      };
    }
    function I(t) {
      let n = 0, e = 0, u = 0;
      return t.length === 4 ? (n = "0x" + t[1] + t[1], e = "0x" + t[2] + t[2], u = "0x" + t[3] + t[3]) : t.length === 7 && (n = "0x" + t[1] + t[2], e = "0x" + t[3] + t[4], u = "0x" + t[5] + t[6]), [~~n, ~~e, ~~u];
    }
    function O(t) {
      let n = t.indexOf(",") > -1 ? "," : " ";
      t = t.substr(4).split(")")[0].split(n);
      let e = (+t[0]).toString(16), u = (+t[1]).toString(16), o = (+t[2]).toString(16);
      return e.length === 1 && (e = "0" + e), u.length === 1 && (u = "0" + u), o.length === 1 && (o = "0" + o), [e | 0, u | 0, o | 0];
    }
    function R(t, n) {
      let e = 1 / 0, u = null, [o, r, i] = t;
      return n.forEach((p) => {
        let [l, c, a] = p.startsWith("#") ? I(p) : O(p), s = Math.sqrt((o - l) ** 2 + (r - c) ** 2 + (i - a) ** 2);
        s < e && (e = s, u = p);
      }), u;
    }
    function L(t, n, e = {}) {
      return e = Object.assign({}, E, e), t.setvar("ASSETS", t.ASSETS || {}), t.ASSETS.script = {}, { loadScript: async (o, r) => {
        let { baseURL: i, ignoreErrors: p, crossOrigin: l } = e, c = m(o);
        o = S(o, i);
        let a = document.createElement("script"), s = { asset: a, type: "script", src: o, id: c };
        return new Promise((f) => {
          d(t, 1), a.crossOrigin = l, a.onerror = (h) => {
            if (console.error(h), !p) throw new Error("Failed to load " + o);
            r && r(), t.emit("asset-error", s);
          }, a.onload = () => {
            t.ASSETS.script[c] = a, r && r(a), t.emit("asset-load", s), d(t, -1), f(a);
          }, t.emit("filter-asset", a, s), a.src = o, document.head.appendChild(a);
        });
      } };
    }
    function y(t, n, e = {}) {
      return e = Object.assign({}, E, e), t.setvar("ASSETS", t.ASSETS || {}), t.ASSETS.sound = {}, { loadSound: async (o, r) => {
        let { crossOrigin: i, ignoreErrors: p, allowSoundInterruptions: l, baseURL: c } = e, a = m(o);
        o = S(o, c);
        let s = new Audio(), f = { asset: s, type: "sound", src: o, id: a };
        return new Promise((h) => {
          d(t, 1), s.crossOrigin = i, s.onerror = (w) => {
            if (console.error(w), !p) throw new Error("Failed to load " + o);
            r && r(null), t.emit("asset-error", f);
          }, s[l ? "oncanplay" : "oncanplaythrough"] = () => {
            t.ASSETS.sound[a] = s, r && r(s), t.emit("asset-load", f), d(t, -1), h(s);
          }, t.emit("filter-asset", s, f), s.src = o;
        });
      } };
    }
    Object.assign(HTMLAudioElement.prototype, { stop() {
      this.pause(), this.currentTime = 0, this.src = this.src;
    }, restart() {
      this.pause(), this.currentTime = 0, this.play();
    } });
    function v(t, n, e = {}) {
      return e = Object.assign({}, E, e), t.setvar("ASSETS", t.ASSETS || {}), t.ASSETS.json = {}, { loadJSON: async (o, r, i) => {
        let { baseURL: p, ignoreErrors: l } = e, c = m(o);
        o = S(o, p);
        let a = { type: "json", src: o, id: c };
        t.emit("filter-asset", null, a), d(t, 1), t.ASSETS.json = {};
        let s = fetch(o, i);
        return s.then((f) => f.json()).then((f) => {
          ASSETS.json[c] = f, a.json = f, r && r(f), t.emit("asset-load", a), d(t, -1);
        }).catch((f) => {
          if (console.error(f), !l) throw new Error("Failed to load JSON from " + o);
          r && r(), t.emit("asset-error", a);
        }), s;
      } };
    }
    function _(t) {
      return { load: (e) => new Promise((u, o) => {
        d(t, 1), e((i) => (d(t, -1), u(i)), o);
      }) };
    }
    function A(t, n, e = {}) {
      t.use(T, e), t.use(x, e), t.use(L, e), t.use(y, e), t.use(v, e), t.use(_);
    }
    window.pluginAssetLoader = A;
  })();
})();
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
