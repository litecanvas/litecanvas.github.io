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
      const root = globalThis, math = Math, TWO_PI = math.PI * 2, raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(
          () => elem.removeEventListener(evt, callback, false)
        );
      }, isNumber = Number.isFinite, defaults = {
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
      let _initialized = false, _plugins = [], _canvas, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _deltaTime = 1 / 60, _accumulated = 0, _rafid, _fontFamily = "sans-serif", _fontSize = 20, _rng_seed = Date.now(), _events = {
        init: false,
        update: false,
        draw: false,
        resized: false,
        tap: false,
        untap: false,
        tapping: false,
        tapped: false
      }, _helpers = {
        settings: Object.assign({}, settings),
        colors
      };
      const instance = {
        /** @type {number} */
        WIDTH: 0,
        /** @type {number} */
        HEIGHT: 0,
        /** @type {HTMLCanvasElement} */
        CANVAS: false,
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
        DEFAULT_SFX: [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1],
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
        HALF_PI: math.PI / 2,
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
          DEV: assert(isNumber(start), "lerp: 1st param must be a number");
          DEV: assert(isNumber(end), "lerp: 2nd param must be a number");
          DEV: assert(isNumber(t), "lerp: 3rd param must be a number");
          return t * (end - start) + start;
        },
        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
          DEV: assert(isNumber(degs), "deg2rad: 1st param must be a number");
          return math.PI / 180 * degs;
        },
        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
          DEV: assert(isNumber(rads), "rad2deg: 1st param must be a number");
          return 180 / math.PI * rads;
        },
        /**
         * Returns the rounded value of an number to optional precision (number of digits after the decimal point).
         *
         * Note: precision is optional but must be >= 0
         *
         * @param {number} n number to round.
         * @param {number} [precision] number of decimal digits to round to, default is 0.
         * @returns {number} rounded number.
         */
        round: (n, precision = 0) => {
          DEV: assert(isNumber(n), "round: 1st param must be a number");
          DEV: assert(
            null == precision || isNumber(precision) && precision >= 0,
            "round: 2nd param must be a positive number or zero"
          );
          if (!precision) {
            return math.round(n);
          }
          const multiplier = 10 ** precision;
          return math.round(n * multiplier) / multiplier;
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
          DEV: assert(isNumber(value), "clamp: 1st param must be a number");
          DEV: assert(isNumber(min), "clamp: 2nd param must be a number");
          DEV: assert(isNumber(max), "clamp: 3rd param must be a number");
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
          DEV: assert(isNumber(value), "wrap: 1st param must be a number");
          DEV: assert(isNumber(min), "wrap: 2nd param must be a number");
          DEV: assert(isNumber(max), "wrap: 3rd param must be a number");
          DEV: assert(
            max > min,
            "randi: the 2nd param must be less than the 3rd param"
          );
          DEV: assert(
            max !== min,
            "randi: the 2nd param must be not equal to the 3rd param"
          );
          return value - (max - min) * math.floor((value - min) / (max - min));
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
          DEV: assert(isNumber(value), "map: 1st param must be a number");
          DEV: assert(isNumber(start1), "map: 2nd param must be a number");
          DEV: assert(isNumber(stop1), "map: 3rd param must be a number");
          DEV: assert(isNumber(start2), "map: 4th param must be a number");
          DEV: assert(isNumber(stop2), "map: 5th param must be a number");
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
          DEV: assert(isNumber(value), "norm: 1st param must be a number");
          DEV: assert(isNumber(start), "norm: 2nd param must be a number");
          DEV: assert(isNumber(stop), "norm: 3rd param must be a number");
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
          DEV: assert(isNumber(min), "rand: 1st param must be a number");
          DEV: assert(isNumber(max), "rand: 2nd param must be a number");
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
          DEV: assert(isNumber(min), "randi: 1st param must be a number");
          DEV: assert(isNumber(max), "randi: 2nd param must be a number");
          DEV: assert(
            max > min,
            "randi: the 1st param must be less than the 2nd param"
          );
          return math.floor(instance.rand(min, max + 1));
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
            null == value || isNumber(value) && value >= 0,
            "seed: 1st param must be a positive number or zero"
          );
          return null == value ? _rng_seed : _rng_seed = ~~value;
        },
        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen with an optional color
         *
         * @param {number} [color] The background color (index) or null/undefined (for transparent)
         */
        cls(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "cls: 1st param must be a positive number or zero or undefined"
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
        rect(x, y, width, height, color, radii) {
          DEV: assert(isNumber(x), "rect: 1st param must be a number");
          DEV: assert(isNumber(y), "rect: 2nd param must be a number");
          DEV: assert(
            isNumber(width) && width > 0,
            "rect: 3rd param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "rect: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "rect: 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
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
        rectfill(x, y, width, height, color, radii) {
          DEV: assert(isNumber(x), "rectfill: 1st param must be a number");
          DEV: assert(isNumber(y), "rectfill: 2nd param must be a number");
          DEV: assert(
            isNumber(width) && width >= 0,
            "rectfill: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "rectfill: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "rectfill: 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
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
          DEV: assert(isNumber(x), "circ: 1st param must be a number");
          DEV: assert(isNumber(y), "circ: 2nd param must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "circ: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
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
          DEV: assert(isNumber(x), "circfill: 1st param must be a number");
          DEV: assert(isNumber(y), "circfill: 2nd param must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "circfill: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
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
          DEV: assert(isNumber(x1), "line: 1st param must be a number");
          DEV: assert(isNumber(y1), "line: 2nd param must be a number");
          DEV: assert(
            isNumber(x2),
            "line: 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(y2),
            "line: 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
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
            isNumber(value) && ~~value > 0,
            "linewidth: 1st param must be a positive number"
          );
          _ctx.lineWidth = ~~value;
          _outline_fix = 0 === ~~value % 2 ? 0 : 0.5;
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
            isNumber(offset),
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
          DEV: assert(isNumber(x), "text: 1st param must be a number");
          DEV: assert(isNumber(y), "text: 2nd param must be a number");
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
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
          DEV: assert(isNumber(size), "textsize: 1st param must be a number");
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
            "textalign: 1st param must be null or one of the following values: center, left, right, start or end."
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
            "textalign: 2nd param must be null or one of the following values: middle, top, bottom, hanging, alphabetic or ideographic."
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
          DEV: assert(isNumber(x), "image: 1st param must be a number");
          DEV: assert(isNumber(y), "image: 2nd param must be a number");
          _ctx.drawImage(source, ~~x, ~~y);
        },
        /**
         * Draw in an OffscreenCanvas and returns its image.
         *
         * @param {number} width
         * @param {number} height
         * @param {string[]|drawCallback} drawing
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas | HTMLCanvasElement} [options.canvas]
         * @returns {ImageBitmap}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, drawing, options = {}) {
          DEV: assert(isNumber(width), "paint: 1st param must be a number");
          DEV: assert(isNumber(height), "paint: 2nd param must be a number");
          DEV: assert(
            "function" === typeof drawing || Array.isArray(drawing),
            "paint: 3rd param must be a function or array"
          );
          DEV: assert(
            options && !options.scale || isNumber(options.scale),
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
          return canvas.transferToImageBitmap();
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
          DEV: assert(isNumber(x), "translate: 1st param must be a number");
          DEV: assert(isNumber(y), "translate: 2nd param must be a number");
          return _ctx.translate(~~x, ~~y);
        },
        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
          DEV: assert(isNumber(x), "scale: 1st param must be a number");
          DEV: assert(
            null == y || isNumber(y),
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
          DEV: assert(isNumber(radians), "rotate: 1st param must be a number");
          return _ctx.rotate(radians);
        },
        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
          DEV: assert(isNumber(value), "alpha: 1st param must be a number");
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
            null == color || isNumber(color) && color >= 0,
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
            null == color || isNumber(color) && color >= 0,
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
          DEV: assert(isNumber(pitchSlide), "sfx: 2nd param must be a number");
          DEV: assert(
            isNumber(volumeFactor),
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
          DEV: assert(isNumber(value), "volume: 1st param must be a number");
          root.zzfxV = value;
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
            null == index || isNumber(index) && index >= 0,
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
          if (null == value) {
            console.warn(`setvar: key "${key}" was defined as ${value}`);
          }
          instance[key] = value;
          if (settings.global) {
            root[key] = value;
          }
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
            isNumber(value),
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
            isNumber(value) && value >= 1,
            "setfps: 1st param must be a positive number"
          );
          _deltaTime = 1 / ~~value;
        },
        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
          cancelAnimationFrame(_rafid);
          instance.emit("quit");
          _events = [];
          for (const removeListener of _browserEventListeners) {
            removeListener();
          }
          if (settings.global) {
            for (const key in instance) {
              delete root[key];
            }
            delete root.ENGINE;
          }
        }
      };
      for (const k of "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp".split(",")) {
        instance[k] = math[k];
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
        if (settings.autoscale) {
          on(root, "resize", resizeCanvas);
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
          }, _checkTapped = (tap) => tap && performance.now() - tap.ts <= 300, preventDefault = (ev) => ev.preventDefault();
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
          const toLowerCase = (s) => s.toLowerCase();
          const _keysDown = /* @__PURE__ */ new Set();
          const _keysPress = /* @__PURE__ */ new Set();
          const keyCheck = (keysSet, key) => {
            return !key ? keysSet.size > 0 : keysSet.has(
              "space" === toLowerCase(key) ? " " : toLowerCase(key)
            );
          };
          on(root, "keydown", (event) => {
            if (!_keysDown.has(toLowerCase(event.key))) {
              _keysDown.add(toLowerCase(event.key));
              _keysPress.add(toLowerCase(event.key));
            }
          });
          on(root, "keyup", (event) => {
            _keysDown.delete(toLowerCase(event.key));
          });
          on(root, "blur", () => _keysDown.clear());
          instance.listen("after:draw", () => _keysPress.clear());
          instance.setvar(
            "iskeydown",
            /**
             * Checks if a which key is pressed (down) on the keyboard.
             * Note: use `iskeydown()` to check for any key.
             *
             * @param {string} [key]
             * @returns {boolean}
             */
            (key) => {
              DEV: assert(
                null == key || "string" === typeof key,
                "iskeydown: 1st param must be a string or undefined"
              );
              return keyCheck(_keysDown, key);
            }
          );
          instance.setvar(
            "iskeypressed",
            /**
             * Checks if a which key just got pressed on the keyboard.
             * Note: use `iskeypressed()` to check for any key.
             *
             * @param {string} [key]
             * @returns {boolean}
             */
            (key) => {
              DEV: assert(
                null == key || "string" === typeof key,
                "iskeypressed: 1st param must be a string or undefined"
              );
              return keyCheck(_keysPress, key);
            }
          );
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
        instance.emit("init", instance);
        _lastFrameTime = performance.now();
        _rafid = raf(drawFrame);
      }
      function drawFrame(now) {
        let updated = 0, frameTime = (now - _lastFrameTime) / 1e3;
        _lastFrameTime = now;
        if (settings.animate) {
          _rafid = raf(drawFrame);
          if (frameTime > 0.3) {
            return console.warn("skipping too long frame");
          }
          _accumulated += frameTime;
          while (_accumulated >= _deltaTime) {
            instance.emit("update", _deltaTime * _timeScale);
            instance.setvar(
              "ELAPSED",
              instance.ELAPSED + _deltaTime * _timeScale
            );
            updated++;
            _accumulated -= _deltaTime;
          }
        } else {
          updated = 1;
        }
        if (updated) {
          instance.textalign("start", "top");
          instance.emit("draw");
        }
      }
      function setupCanvas() {
        _canvas = settings.canvas || document.createElement("canvas");
        _canvas = "string" === typeof _canvas ? document.querySelector(_canvas) : _canvas;
        DEV: assert(
          _canvas && _canvas.tagName === "CANVAS",
          "Invalid canvas element"
        );
        instance.setvar("CANVAS", _canvas);
        _ctx = _canvas.getContext("2d");
        on(_canvas, "click", () => root.focus());
        _canvas.style = "";
        resizeCanvas();
        if (!_canvas.parentNode) document.body.appendChild(_canvas);
      }
      function resizeCanvas() {
        DEV: assert(
          null == settings.width || isNumber(settings.width) && settings.width > 0,
          `Litecanvas' option "width" should be a positive number when defined`
        );
        DEV: assert(
          null == settings.height || isNumber(settings.height) && settings.height > 0,
          `Litecanvas' option "height" should be a positive number when defined`
        );
        DEV: assert(
          null == settings.height || settings.width > 0 && settings.height > 0,
          `Litecanvas' option "width" is required when the option "height" is defined`
        );
        const width = settings.width || root.innerWidth, height = settings.height || settings.width || root.innerHeight;
        instance.setvar("WIDTH", _canvas.width = width);
        instance.setvar("HEIGHT", _canvas.height = height);
        instance.setvar("CENTERX", instance.WIDTH / 2);
        instance.setvar("CENTERY", instance.HEIGHT / 2);
        if (settings.autoscale) {
          if (!_canvas.style.display) {
            _canvas.style.display = "block";
            _canvas.style.margin = "auto";
          }
          _scale = math.min(
            root.innerWidth / instance.WIDTH,
            root.innerHeight / instance.HEIGHT
          );
          _scale = (settings.pixelart ? ~~_scale : _scale) || 1;
          _canvas.style.width = instance.WIDTH * _scale + "px";
          _canvas.style.height = instance.HEIGHT * _scale + "px";
        }
        if (!settings.antialias || settings.pixelart) {
          _ctx.imageSmoothingEnabled = false;
          _canvas.style.imageRendering = "pixelated";
        }
        instance.emit("resized", _scale);
        if (!settings.animate) {
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
      if (settings.global) {
        if (root.ENGINE) {
          throw new Error("two global litecanvas detected");
        }
        Object.assign(root, instance);
        root.ENGINE = instance;
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
    var It = (e, t) => {
      for (var s in t) Mt(e, s, { get: t[s], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var z = {};
    It(z, { ANCHOR_BOT_LEFT: () => te, ANCHOR_BOT_RIGHT: () => ee, ANCHOR_CENTER: () => Qt, ANCHOR_TOP_LEFT: () => J, ANCHOR_TOP_RIGHT: () => Jt, Actor: () => F, BACK_IN: () => oe, BACK_IN_OUT: () => ue, BACK_OUT: () => ne, BOUNCE_IN: () => mt, BOUNCE_IN_OUT: () => ce, BOUNCE_OUT: () => H, Camera: () => y, DOWN: () => Zt, EASE_IN: () => re, EASE_IN_OUT: () => ie, EASE_OUT: () => ae, ELASTIC_IN: () => le, ELASTIC_IN_OUT: () => me, ELASTIC_OUT: () => he, Grid: () => M, LEFT: () => Kt, LINEAR: () => ht, Noise: () => Y, ONE: () => Vt, RIGHT: () => $t, TypedGrid: () => C, UP: () => Wt, Vector: () => w, ZERO: () => Q, advance: () => rt, choose: () => wt, colcirc: () => j, colrect: () => B, diff: () => tt, dist: () => it, flipImage: () => ft, fract: () => st, head: () => Nt, intersection: () => E, last: () => Tt, lerpAngle: () => lt, mag: () => ot, makeCircle: () => xt, makeRectangle: () => gt, mean: () => nt, median: () => ut, mod: () => at, range: () => _t, resolverect: () => U, scaleImage: () => bt, shuffle: () => yt, sum: () => A, tail: () => Et, tintImage: () => dt, tween: () => se, vec: () => o, vecAbs: () => zt, vecAdd: () => S, vecAngle: () => Ft, vecAngleBetween: () => Rt, vecCeil: () => Xt, vecClamp: () => jt, vecCross: () => Ht, vecDist: () => Lt, vecDist2: () => Dt, vecDiv: () => I, vecDot: () => K, vecEq: () => O, vecFloor: () => Ut, vecIsZero: () => Gt, vecLerp: () => vt, vecLimit: () => St, vecMag: () => $, vecMag2: () => Z, vecMove: () => qt, vecMult: () => N, vecNorm: () => D, vecRand: () => Yt, vecReflect: () => Ct, vecRotate: () => Pt, vecRound: () => Bt, vecSet: () => W, vecSetMag: () => Ot, vecSub: () => L, wave: () => et });
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
      constructor(t = null, s = 0, r = 0, a = null, i = null) {
        this._engine = t || globalThis, this.ox = s, this.oy = r, this.resize(a || this._engine.WIDTH - s, i || this._engine.HEIGHT - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
      }
      resize(t, s) {
        this.width = t, this.height = s, this._engine.emit("camera-resized", this);
      }
      start(t = false) {
        if (this._engine.push(), t) {
          let a = path();
          a.rect(this.ox, this.oy, this.width, this.height), this._engine.clip(a);
        }
        let s = this.ox + this.width / 2, r = this.oy + this.height / 2;
        this._engine.translate(s, r), this._engine.scale(this.scale), this._engine.rotate(this.rotation), this._engine.translate(-this.x + this._shake.x, -this.y + this._shake.y);
      }
      end() {
        this._engine.pop();
      }
      lookAt(t, s) {
        this.x = t, this.y = s;
      }
      move(t, s) {
        this.x += t, this.y += s;
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
      getWorldPoint(t, s, r = {}) {
        let a = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, s = (s - this.height / 2 - this.oy) / this.scale, r.x = a * t - i * s + this.x, r.y = i * t + a * s + this.y, r;
      }
      getCameraPoint(t, s, r = {}) {
        let a = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = t - this.x, s = s - this.y, t = a * t - i * s, s = i * t + a * s, r.x = t * this.scale + this.width / 2 + this.ox, r.y = s * this.scale + this.height / 2 + this.oy, r;
      }
      getBounds() {
        return [this.ox, this.oy, this.width, this.height];
      }
      shake(t = 1, s = 0.3) {
        this.shaking || (this._shake.removeListener = this._engine.listen("update", (r) => {
          this._shake.x = this._engine.randi(-t, t), this._shake.y = this._engine.randi(-t, t), s -= r, s <= 0 && this.unshake();
        }));
      }
      unshake() {
        this.shaking && (this._shake.removeListener(), this._shake.removeListener = null, this._shake.x = this._shake.y = 0);
      }
      get shaking() {
        return this._shake.removeListener !== null;
      }
    };
    var E = (e, t, s, r, a, i, n, u) => {
      let h = Math.max(e, a), d = Math.min(e + s, a + n) - h, m = Math.max(t, i), x = Math.min(t + r, i + u) - m;
      return [h, m, d, x];
    };
    var U = (e, t, s, r, a, i, n, u) => {
      let [h, d, m, x] = E(e, t, s, r, a, i, n, u), b = "", _ = e, l = t;
      return m < x ? e < a ? (b = "right", _ = a - s) : (b = "left", _ = a + n) : t < i ? (b = "bottom", l = i - r) : (b = "top", l = i + u), { direction: b, x: _, y: l };
    };
    var B = (e, t, s, r, a, i, n, u) => e < a + n && e + s > a && t < i + u && t + r > i;
    var j = (e, t, s, r, a, i) => (r - e) * (r - e) + (a - t) * (a - t) <= (s + i) * (s + i);
    var M = class e {
      _w;
      _h;
      _c;
      constructor(t, s, r = []) {
        this._w = Math.max(1, ~~t), this._h = Math.max(1, ~~s), this._c = r;
      }
      [Symbol.iterator]() {
        let t = 0;
        return { next: () => ({ value: [this.indexToPointX(t), this.indexToPointY(t), this._c[t++]], done: t > this._c.length }) };
      }
      clone() {
        return new e(this._w, this._h, this._c);
      }
      clear() {
        this.forEach((t, s) => this.set(t, s, void 0));
      }
      get width() {
        return this._w;
      }
      get height() {
        return this._h;
      }
      set(t, s, r) {
        this._c[this.pointToIndex(t, s)] = r;
      }
      get(t, s) {
        return this._c[this.pointToIndex(t, s)];
      }
      has(t, s) {
        return this.get(t, s) != null;
      }
      check(t, s) {
        return t >= 0 && t < this._w && s >= 0 && s < this._h;
      }
      get length() {
        return this._w * this._h;
      }
      pointToIndex(t, s) {
        return this.clampX(~~t) + this.clampY(~~s) * this._w;
      }
      indexToPointX(t) {
        return t % this._w;
      }
      indexToPointY(t) {
        return Math.floor(t / this._w);
      }
      forEach(t, s = false) {
        let r = s ? this.length - 1 : 0, a = s ? -1 : this.length, i = s ? -1 : 1;
        for (; r !== a; ) {
          let n = this.indexToPointX(r), u = this.indexToPointY(r), h = this._c[r];
          if (t(n, u, h, this) === false) break;
          r += i;
        }
      }
      fill(t) {
        this.forEach((s, r) => {
          this.set(s, r, t);
        });
      }
      clampX(t) {
        return q(t, 0, this._w - 1);
      }
      clampY(t) {
        return q(t, 0, this._h - 1);
      }
      toArray() {
        return this._c.slice();
      }
      toString(t = " ", s = true) {
        if (!s) return this._c.join(t);
        let r = [];
        return this.forEach((a, i, n) => {
          r[i] = r[i] || "", r[i] += n + t;
        }), r.join(`
`);
      }
    }, C = class e extends M {
      constructor(t, s, r = Uint8Array) {
        super(t, s, null), this._c = new r(this._w * this._h);
      }
      has(t, s) {
        return this.get(t, s) !== 0;
      }
      clone() {
        let t = new e(this._w, this._h, this._c.constructor);
        return this.forEach((s, r, a) => {
          t.set(s, r, a);
        }), t;
      }
    };
    function q(e, t, s) {
      return e < t ? t : e > s ? s : e;
    }
    var At = Math.sqrt, G = Math.cos, V = Math.sin, kt = 2 * Math.PI, w = class {
      x;
      y;
      constructor(t = 0, s = t) {
        this.x = t, this.y = s;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, g = (e) => e instanceof w, o = (e = 0, t = e) => (g(e) && (t = e.y, e = e.x), new w(e, t)), O = (e, t, s = t) => g(t) ? O(e, t.x, t.y) : e.x === t && e.y === s, W = (e, t, s = t) => (g(t) ? W(e, t.x, t.y) : (e.x = t, e.y = s), e), S = (e, t, s = t) => g(t) ? S(e, t.x, t.y) : (e.x += t, e.y += s, e), L = (e, t, s = t) => g(t) ? L(e, t.x, t.y) : (e.x -= t, e.y -= s, e), N = (e, t, s = t) => g(t) ? N(e, t.x, t.y) : (e.x *= t, e.y *= s, e), I = (e, t, s = t) => g(t) ? I(e, t.x, t.y) : (e.x /= t || 1, e.y /= s || 1, e), Pt = (e, t) => {
      let s = G(t), r = V(t);
      return e.x = s * e.x - r * e.y, e.y = r * e.x + s * e.y, e;
    }, Ct = (e, t) => {
      let s = D(o(t));
      return L(e, N(s, 2 * K(e, s)));
    }, Ot = (e, t) => (D(e), N(e, t), e), $ = (e) => Math.hypot(e.x, e.y), Z = (e) => e.x * e.x + e.y * e.y, D = (e) => {
      let t = $(e);
      return t > 0 && I(e, t), e;
    }, St = (e, t = 1) => {
      let s = Z(e);
      return s > t * t && (I(e, At(s)), N(e, t)), e;
    }, Lt = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), Dt = (e, t) => {
      let s = e.x - t.x, r = e.y - t.y;
      return s * s + r * r;
    }, Ft = (e) => Math.atan2(e.y, e.x), Rt = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), K = (e, t) => e.x * t.x + e.y * t.y, Ht = (e, t) => e.x * t.y - e.y * t.x, vt = (e, t, s) => (e.x += (t.x - e.x) * s || 0, e.y += (t.y - e.y) * s || 0, e), Yt = (e = 1, t = e, s = globalThis.rand || Math.random) => {
      let r = s() * kt, a = s() * (t - e) + e;
      return o(G(r) * a, V(r) * a);
    }, zt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Xt = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Ut = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Bt = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), jt = (e, t, s) => (e.x < t.x && (e.x = t.x), e.x > s.x && (e.x = s.x), e.y < t.y && (e.y = t.y), e.y > s.y && (e.y = s.y), e), qt = (e, t, s = 1) => S(e, t.x * s, t.y * s), Gt = (e) => O(e, Q), Q = o(0, 0), Vt = o(1, 1), Wt = o(0, -1), $t = o(1, 0), Zt = o(0, 1), Kt = o(-1, 0);
    var Qt = o(0.5, 0.5), J = o(0, 0), Jt = o(1, 0), te = o(0, 1), ee = o(1, 1), F = class {
      sprite;
      pos;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, s, r = J) {
        this.sprite = t, this.pos = s || o(0), this._o = o(r), this._s = o(1, 1);
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
      scaleTo(t, s = t) {
        this._s.x = t, this._s.y = s;
      }
      scaleBy(t, s = t) {
        this._s.x *= t, this._s.y *= s;
      }
      getBounds(t = true) {
        let s = this.sprite.width * (t ? this._s.x : 1), r = this.sprite.height * (t ? this._s.y : 1), a = this.pos.x - s * this.anchor.x, i = this.pos.y - r * this.anchor.y;
        return [a, i, s, r];
      }
      draw(t = globalThis, s = true) {
        this.hidden || this.opacity <= 0 || (s && t.push(), this.transform(t), this.drawImage(t), s && t.pop());
      }
      transform(t) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t, s = true) {
        let r = this.anchor, a = -this.sprite.width * (this.flipX ? 1 - r.x : r.x), i = -this.sprite.height * (this.flipY ? 1 - r.y : r.y);
        s && t.alpha(this.opacity), t.image(a, i, this.sprite);
      }
    };
    var tt = (e, t) => Math.abs(t - e) || 0;
    var et = (e, t, s, r = Math.sin) => e + (r(s) + 1) / 2 * (t - e);
    var st = (e) => e % 1 || 0;
    var rt = advance = (e, t, s, r = 1) => {
      s && (t.x += s.x * r, t.y += s.y * r), e.x += t.x * r, e.y += t.y * r;
    };
    var at = (e, t) => (t + e % t) % t;
    var it = (e, t, s, r) => Math.hypot(s - e, r - t);
    var ot = (e, t) => Math.hypot(e, t);
    var A = (e) => {
      let t = 0;
      for (let s = 0; s < e.length; s++) t += e[s];
      return t;
    };
    var nt = (e) => A(e) / e.length;
    var ut = (...e) => {
      let t = e.sort((r, a) => r - a), s = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[s - 1] + t[s]) / 2 : t[s];
    };
    var lt = (e, t, s) => {
      let r = (t - e) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), e + r * s;
    };
    var k = Math.PI / 2, se = (e, t, s, r = 1, a = ht) => new R(e, t, s, r, a), ht = (e) => e, re = (e) => e * e, ae = (e) => -e * (e - 2), ie = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, oe = (e) => e * e * e - e * Math.sin(e * Math.PI), ne = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, ue = (e) => {
      if (e < 0.5) {
        let s = 2 * e;
        return 0.5 * (s * s * s - s * Math.sin(s * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, le = (e) => Math.sin(13 * k * e) * Math.pow(2, 10 * (e - 1)), he = (e) => Math.sin(-13 * k * (e + 1)) * Math.pow(2, -10 * e) + 1, me = (e) => {
      if (e < 0.5) {
        let r = Math.sin(13 * k * (2 * e)), a = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * r * a;
      }
      let t = Math.sin(-13 * k * (2 * e - 1 + 1)), s = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * s + 2);
    }, mt = (e) => 1 - H(1 - e), H = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, ce = (e) => e < 0.5 ? 0.5 * mt(e * 2) : 0.5 * H(e * 2 - 1) + 0.5, R = class {
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
      constructor(t, s, r, a, i) {
        this._o = t, this._p = s, this._x = r, this._d = a, this._e = i, this._w = 0;
      }
      start(t) {
        if (this.running) return this;
        this._cu.stop(false), this._ch = this._cu = this, this.running = true;
        let s = this._o[this._p] || 0, r = this._rel ? s + this._x : this._x;
        return this._lc = this._lc || t || globalThis, this._u = this._lc.listen("update", (a) => {
          if (this._t <= this._w) {
            this._t += a;
            return;
          }
          let i = this._t - this._w;
          this._o[this._p] = this._lc.lerp(s, r, this._e(i / this._d)), this._t += a, i >= this._d && (this._o[this._p] = r, this.stop());
        }), this;
      }
      stop(t = true) {
        if (!this._u) return this;
        if (this.running = false, this._u(), this._t = 0, t) for (let s of this._cb) s(this._o);
        return this;
      }
      restart(t = null, s = false) {
        return this.stop(s).restart(t);
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
    var ct = 4, P = 1 << ct, pt = 8, pe = 1 << pt, f = 4095, v = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), Y = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, s = 0, r = 0) {
        t < 0 && (t = -t), s < 0 && (s = -s), r < 0 && (r = -r);
        let a = Math.floor(t), i = Math.floor(s), n = Math.floor(r), u = t - a, h = s - i, d = r - n, m, x, b = 0, _ = 0.5, l, c, T;
        for (let X = 0; X < this._po; X++) {
          let p = a + (i << ct) + (n << pt);
          m = v(u), x = v(h), l = this._p[p & f], l += m * (this._p[p + 1 & f] - l), c = this._p[p + P & f], c += m * (this._p[p + P + 1 & f] - c), l += x * (c - l), p += pe, c = this._p[p & f], c += m * (this._p[p + 1 & f] - c), T = this._p[p + P & f], T += m * (this._p[p + P + 1 & f] - T), c += x * (T - c), l += v(d) * (c - l), b += l * _, _ *= this._pf, a <<= 1, u *= 2, i <<= 1, h *= 2, n <<= 1, d *= 2, u >= 1 && (a++, u--), h >= 1 && (i++, h--), d >= 1 && (n++, d--);
        }
        return b;
      }
      noiseDetail(t, s) {
        t > 0 && (this._po = t), s > 0 && (this._pf = s);
      }
      noiseSeed(t = null) {
        t != null && this._e.seed(t);
        let s = this._e.rand || Math.random;
        for (let r = 0; r < f + 1; r++) this._p[r] = s();
      }
    };
    var ft = (e, t = true, s = false, r = globalThis) => r.paint(e.width, e.height, (a) => {
      r.push(), r.scale(t ? -1 : 1, s ? -1 : 1), r.image(t ? -e.width : 0, s ? -e.height : 0, e), r.pop();
    });
    var bt = (e, t, s = true, r = globalThis) => r.paint(e.width * t, e.height * t, (a) => {
      r.push(), a.imageSmoothingEnabled = !s, r.scale(t), r.image(0, 0, e), r.pop();
    });
    var dt = (e, t, s = 1, r = globalThis) => r.paint(e.width, e.height, (a) => {
      r.push(), r.alpha(s), r.rectfill(0, 0, e.width, e.height, t), a.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, e), r.pop();
    });
    var xt = (e, t, { borderWidth: s = 0, borderColor: r = 0, engine: a = globalThis } = {}) => {
      let i = e * 2 + s;
      return a.paint(i, i, () => {
        a.circfill(i / 2, i / 2, e, t), s > 0 && (a.linewidth(s), a.stroke(r));
      });
    };
    var gt = (e, t, s, { borderWidth: r = 0, borderColor: a = 0, engine: i = globalThis } = {}) => {
      let n = e + r * 2, u = t + r * 2;
      return i.paint(n, u, () => {
        i.rectfill(r > 0 ? r : 0, r > 0 ? r : 0, e, t, s), r > 0 && (i.linewidth(r), i.stroke(a));
      });
    };
    var _t = (e, t = 0, s = 1) => [...new Array(e).keys()].map((r) => t + s * r);
    var yt = (e, t = globalThis.rand || Math.random) => {
      e = [...e];
      for (let s = e.length - 1; s > 0; s--) {
        let r = Math.floor(t() * (s + 1)), a = e[s];
        e[s] = e[r], e[r] = a;
      }
      return e;
    };
    var wt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var Nt = (e) => e[0];
    var Tt = (e) => e[e.length - 1];
    var Et = (e) => e.slice(1);
    globalThis.utils = Object.assign(globalThis.utils || {}, z);
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
