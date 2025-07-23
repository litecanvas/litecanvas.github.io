(() => {
  // public/litecanvas.js
  (() => {
    var setupZzFX = (global) => {
      const zzfxX = new AudioContext();
      global.zzfxV = 1;
      return (i = 1, d = 0.05, z = 220, e = 0, P = 0, S = 0.1, I = 0, c = 1, T = 0, H = 0, V = 0, J = 0, h = 0, j = 0, K = 0, E = 0, r = 0, B = 1, X = 0, L = 0, D = 0) => {
        let n = Math, t = 2 * n.PI, a = 44100, F = T *= 500 * t / a / a, O = z *= (1 - d + 2 * d * n.random(d = [])) * t / a, x = 0, _ = 0, f = 0, g = 1, $ = 0, l = 0, o = 0, s = D < 0 ? -1 : 1, u = t * s * D * 2 / a, G = n.cos(u), C = n.sin, Q = C(u) / 4, M = 1 + Q, m = -2 * G / M, y = (1 - Q) / M, R = (1 + s * G) / 2 / M, A = -(s + G) / M, v = R, U = 0, W = 0, Y = 0, Z = 0;
        for (e = a * e + 9, X *= a, P *= a, S *= a, r *= a, H *= 500 * t / a ** 3, K *= t / a, V *= t / a, J *= a, h = a * h | 0, i *= 0.3 * global.zzfxV, s = e + X + P + S + r | 0; f < s; d[f++] = o * i) ++l % (100 * E | 0) || (o = I ? 1 < I ? 2 < I ? 3 < I ? C(x * x) : n.max(n.min(n.tan(x), 1), -1) : 1 - (2 * x / t % 2 + 2) % 2 : 1 - 4 * n.abs(n.round(x / t) - x / t) : C(x), o = (h ? 1 - L + L * C(t * f / h) : 1) * (o < 0 ? -1 : 1) * n.abs(o) ** c * (f < e ? f / e : f < e + X ? 1 - (f - e) / X * (1 - B) : f < e + X + P ? B : f < s - r ? (s - f - r) / S * B : 0), o = r ? o / 2 + (r > f ? 0 : (f < s - r ? 1 : (s - f) / r) * d[f - r | 0] / 2 / i) : o, D && (o = Z = v * U + A * (U = W) + R * (W = o) - y * Y - m * (Y = Z))), u = (z += T += H) * n.cos(K * _++), x += u + u * j * C(f ** 5), g && ++g > J && (z += V, O += V, g = 0), !h || ++$ % h || (z = O, T = F, g = g || 1);
        i = zzfxX.createBuffer(1, s, a), i.getChannelData(0).set(d), z = zzfxX.createBufferSource(), z.buffer = i, z.connect(zzfxX.destination), z.start();
      };
    };
    var defaultPalette = [
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
    var version = "0.94.1";
    function litecanvas(settings = {}) {
      const root = window, math = Math, TWO_PI = math.PI * 2, raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(() => elem.removeEventListener(evt, callback, false));
      }, beginPath = (c) => c.beginPath(), isNumber = Number.isFinite, zzfx = setupZzFX(root), defaults = {
        width: null,
        height: null,
        autoscale: true,
        pixelart: false,
        canvas: null,
        global: true,
        loop: null,
        tapEvents: true,
        keyboardEvents: true,
        animate: true
      };
      settings = Object.assign(defaults, settings);
      let _initialized = false, _plugins = [], _canvas, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _fpsInterval = 1e3 / 60, _accumulated, _rafid, _fontFamily = "sans-serif", _fontSize = 20, _rngSeed = Date.now(), _colors = defaultPalette, _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _coreEvents = "init,update,draw,tap,untap,tapping,tapped,resized", _mathFunctions = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp", _eventListeners = {};
      const instance = {
        /** @type {number} */
        W: 0,
        /** @type {number} */
        H: 0,
        /** @type {number} */
        T: 0,
        /** @type {number} */
        MX: -1,
        /** @type {number} */
        MY: -1,
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
        HALF_PI: TWO_PI / 4,
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
          DEV: assert(isNumber(start), "[litecanvas] lerp() 1st param must be a number");
          DEV: assert(isNumber(end), "[litecanvas] lerp() 2nd param must be a number");
          DEV: assert(isNumber(t), "[litecanvas] lerp() 3rd param must be a number");
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
          DEV: assert(isNumber(n), "[litecanvas] round() 1st param must be a number");
          DEV: assert(
            null == precision || isNumber(precision) && precision >= 0,
            "[litecanvas] round() 2nd param must be a positive number or zero"
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
          DEV: assert(isNumber(value), "[litecanvas] clamp() 1st param must be a number");
          DEV: assert(isNumber(min), "[litecanvas] clamp() 2nd param must be a number");
          DEV: assert(isNumber(max), "[litecanvas] clamp() 3rd param must be a number");
          DEV: assert(
            max > min,
            "[litecanvas] clamp() the 2nd param must be less than the 3rd param"
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
          DEV: assert(isNumber(value), "[litecanvas] wrap() 1st param must be a number");
          DEV: assert(isNumber(min), "[litecanvas] wrap() 2nd param must be a number");
          DEV: assert(isNumber(max), "[litecanvas] wrap() 3rd param must be a number");
          DEV: assert(
            max > min,
            "[litecanvas] wrap() the 2nd param must be less than the 3rd param"
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
          DEV: assert(isNumber(value), "[litecanvas] map() 1st param must be a number");
          DEV: assert(isNumber(start1), "[litecanvas] map() 2nd param must be a number");
          DEV: assert(isNumber(stop1), "[litecanvas] map() 3rd param must be a number");
          DEV: assert(isNumber(start2), "[litecanvas] map() 4th param must be a number");
          DEV: assert(isNumber(stop2), "[litecanvas] map() 5th param must be a number");
          DEV: assert(
            stop1 !== start1,
            "[litecanvas] map() the 2nd param must be different than the 3rd param"
          );
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
          DEV: assert(isNumber(value), "[litecanvas] norm() 1st param must be a number");
          DEV: assert(isNumber(start), "[litecanvas] norm() 2nd param must be a number");
          DEV: assert(isNumber(stop), "[litecanvas] norm() 3rd param must be a number");
          DEV: assert(
            start !== stop,
            "[litecanvas] norm() the 2nd param must be different than the 3rd param"
          );
          return instance.map(value, start, stop, 0, 1);
        },
        /**
         * Interpolate between 2 values using a periodic function.
         *
         * @param {number} from - the lower bound
         * @param {number} to - the higher bound
         * @param {number} t - value passed to the periodic function
         * @param {(n: number) => number} [fn] - the periodic function (which default to `Math.sin`)
         */
        wave: (from, to, t, fn = Math.sin) => {
          DEV: assert(isNumber(from), "[litecanvas] wave() 1st param must be a number");
          DEV: assert(isNumber(to), "[litecanvas] wave() 2nd param must be a number");
          DEV: assert(isNumber(t), "[litecanvas] wave() 3rd param must be a number");
          DEV: assert(
            "function" === typeof fn,
            "[litecanvas] wave() 4rd param must be a function (n: number) => number"
          );
          return from + (fn(t) + 1) / 2 * (to - from);
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
          DEV: assert(isNumber(min), "[litecanvas] rand() 1st param must be a number");
          DEV: assert(isNumber(max), "[litecanvas] rand() 2nd param must be a number");
          DEV: assert(
            max > min,
            "[litecanvas] rand() the 1st param must be less than the 2nd param"
          );
          const a = 1664525;
          const c = 1013904223;
          const m = 4294967296;
          _rngSeed = (a * _rngSeed + c) % m;
          return _rngSeed / m * (max - min) + min;
        },
        /**
         * Generates a pseudorandom integer between min (inclusive) and max (inclusive)
         *
         * @param {number} [min=0]
         * @param {number} [max=1]
         * @returns {number} the random number
         */
        randi: (min = 0, max = 1) => {
          DEV: assert(isNumber(min), "[litecanvas] randi() 1st param must be a number");
          DEV: assert(isNumber(max), "[litecanvas] randi() 2nd param must be a number");
          DEV: assert(
            max > min,
            "[litecanvas] randi() the 1st param must be less than the 2nd param"
          );
          return math.floor(instance.rand(min, max + 1));
        },
        /**
         * Initializes the random number generator with an explicit seed value.
         *
         * Note: The seed should be a integer number greater than or equal to zero.
         *
         * @param {number} value
         */
        rseed(value) {
          DEV: assert(
            null == value || isNumber(value) && value >= 0,
            "[litecanvas] rseed() 1st param must be a positive number or zero"
          );
          _rngSeed = ~~value;
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
            "[litecanvas] cls() 1st param must be a positive number or zero or undefined"
          );
          if (null == color) {
            _ctx.clearRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
          } else {
            instance.rectfill(0, 0, _ctx.canvas.width, _ctx.canvas.height, color);
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
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
         */
        rect(x, y, width, height, color, radii) {
          DEV: assert(isNumber(x), "[litecanvas] rect() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] rect() 2nd param must be a number");
          DEV: assert(
            isNumber(width) && width > 0,
            "[litecanvas] rect() 3rd param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "[litecanvas] rect() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] rect() 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            "[litecanvas] rect() 6th param must be a number or array of numbers"
          );
          beginPath(_ctx);
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
          DEV: assert(isNumber(x), "[litecanvas] rectfill() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] rectfill() 2nd param must be a number");
          DEV: assert(
            isNumber(width) && width >= 0,
            "[litecanvas] rectfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "[litecanvas] rectfill() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] rectfill() 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            "[litecanvas] rectfill() 6th param must be a number or array of at least 2 numbers"
          );
          beginPath(_ctx);
          _ctx[radii ? "roundRect" : "rect"](~~x, ~~y, ~~width, ~~height, radii);
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
          DEV: assert(isNumber(x), "[litecanvas] circ() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] circ() 2nd param must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "[litecanvas] circ() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] circ() 4th param must be a positive number or zero"
          );
          beginPath(_ctx);
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
          DEV: assert(isNumber(x), "[litecanvas] circfill() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] circfill() 2nd param must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "[litecanvas] circfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] circfill() 4th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
          instance.fill(color);
        },
        /**
         * Draw a ellipse outline
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radiusX
         * @param {number} radiusY
         * @param {number} [color=0] the color index
         */
        oval(x, y, radiusX, radiusY, color) {
          DEV: assert(isNumber(x), "[litecanvas] oval() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] oval() 2nd param must be a number");
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            "[litecanvas] oval() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            "[litecanvas] oval() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] oval() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI);
          instance.stroke(color);
        },
        /**
         * Draw a color-filled ellipse
         *
         * @param {number} x
         * @param {number} y
         * @param {number} radiusX
         * @param {number} radiusY
         * @param {number} [color=0] the color index
         */
        ovalfill(x, y, radiusX, radiusY, color) {
          DEV: assert(isNumber(x), "[litecanvas] ovalfill() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] ovalfill() 2nd param must be a number");
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            "[litecanvas] ovalfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            "[litecanvas] ovalfill() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] ovalfill() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI);
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
          DEV: assert(isNumber(x1), "[litecanvas] line() 1st param must be a number");
          DEV: assert(isNumber(y1), "[litecanvas] line() 2nd param must be a number");
          DEV: assert(
            isNumber(x2),
            "[litecanvas] line() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(y2),
            "[litecanvas] line() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] line() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
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
            "[litecanvas] linewidth() 1st param must be a positive number"
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
            "[litecanvas] linedash() 1st param must be an array of numbers"
          );
          DEV: assert(isNumber(offset), "[litecanvas] linedash() 2nd param must be a number");
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
          DEV: assert(isNumber(x), "[litecanvas] text() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] text() 2nd param must be a number");
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] text() 4th param must be a positive number or zero"
          );
          DEV: assert(
            "string" === typeof fontStyle,
            "[litecanvas] text() 5th param must be a string"
          );
          _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`;
          _ctx.fillStyle = _colors[~~color % _colors.length];
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
            "[litecanvas] textfont() 1st param must be a string"
          );
          _fontFamily = family;
        },
        /**
         * Set the font size
         *
         * @param {number} size
         */
        textsize(size) {
          DEV: assert(isNumber(size), "[litecanvas] textsize() 1st param must be a number");
          _fontSize = size;
        },
        /**
         * Sets the alignment used when drawing texts
         *
         * @param {CanvasTextAlign} align the horizontal alignment. Possible values: "left", "right", "center", "start" or "end"
         * @param {CanvasTextBaseline} baseline the vertical alignment. Possible values: "top", "bottom", "middle", "hanging" or "ideographic"
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign
         */
        textalign(align, baseline) {
          DEV: assert(
            null == align || ["left", "right", "center", "start", "end"].includes(align),
            "[litecanvas] textalign() 1st param must be null or one of the following strings: center, left, right, start or end."
          );
          DEV: assert(
            null == baseline || ["top", "bottom", "middle", "hanging", "alphabetic", "ideographic"].includes(
              baseline
            ),
            "[litecanvas] textalign() 2nd param must be null or one of the following strings: middle, top, bottom, hanging, alphabetic or ideographic."
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
         * @param {CanvasImageSource} source
         */
        image(x, y, source) {
          DEV: assert(isNumber(x), "[litecanvas] image() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] image() 2nd param must be a number");
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
         * @param {OffscreenCanvas} [options.canvas]
         * @returns {ImageBitmap}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, drawing, options = {}) {
          DEV: assert(
            isNumber(width) && width >= 1,
            "[litecanvas] paint() 1st param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 1,
            "[litecanvas] paint() 2nd param must be a positive number"
          );
          DEV: assert(
            "function" === typeof drawing || Array.isArray(drawing),
            "[litecanvas] paint() 3rd param must be a function or array"
          );
          DEV: assert(
            options && null == options.scale || isNumber(options.scale),
            "[litecanvas] paint() 4th param (options.scale) must be a number"
          );
          DEV: assert(
            options && null == options.canvas || options.canvas instanceof OffscreenCanvas,
            "[litecanvas] paint() 4th param (options.canvas) must be an OffscreenCanvas"
          );
          const canvas = options.canvas || new OffscreenCanvas(1, 1), scale = options.scale || 1, contextOriginal = _ctx;
          canvas.width = width * scale;
          canvas.height = height * scale;
          _ctx = canvas.getContext("2d");
          _ctx.scale(scale, scale);
          if (Array.isArray(drawing)) {
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
          DEV: assert(isNumber(x), "[litecanvas] translate() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] translate() 2nd param must be a number");
          return _ctx.translate(~~x, ~~y);
        },
        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
          DEV: assert(isNumber(x), "[litecanvas] scale() 1st param must be a number");
          DEV: assert(null == y || isNumber(y), "[litecanvas] scale() 2nd param must be a number");
          return _ctx.scale(x, y || x);
        },
        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate: (radians) => {
          DEV: assert(isNumber(radians), "[litecanvas] rotate() 1st param must be a number");
          return _ctx.rotate(radians);
        },
        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
          DEV: assert(isNumber(value), "[litecanvas] alpha() 1st param must be a number");
          _ctx.globalAlpha = instance.clamp(value, 0, 1);
        },
        /**
         * Fills the current path with a given color.
         *
         * @param {number} [color=0]
         */
        fill(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] fill() 1st param must be a positive number or zero"
          );
          _ctx.fillStyle = _colors[~~color % _colors.length];
          _ctx.fill();
        },
        /**
         * Outlines the current path with a given color.
         *
         * @param {number} [color=0]
         */
        stroke(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            "[litecanvas] stroke() 1st param must be a positive number or zero"
          );
          _ctx.strokeStyle = _colors[~~color % _colors.length];
          _ctx.stroke();
        },
        /**
         * Turns a path (in the callback) into the current clipping region.
         *
         * @param {clipCallback} callback
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
         */
        clip(callback) {
          DEV: assert(
            "function" === typeof callback,
            "[litecanvas] clip() 1st param must be a function"
          );
          beginPath(_ctx);
          callback(_ctx);
          _ctx.clip();
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
            "[litecanvas] sfx() 1st param must be an array"
          );
          DEV: assert(isNumber(pitchSlide), "[litecanvas] sfx() 2nd param must be a number");
          DEV: assert(isNumber(volumeFactor), "[litecanvas] sfx() 3rd param must be a number");
          if (!root.zzfxV || navigator.userActivation && !navigator.userActivation.hasBeenActive) {
            return false;
          }
          zzfxParams = zzfxParams || _defaultSound;
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
          DEV: assert(
            isNumber(value) && value >= 0,
            "[litecanvas] volume() 1st param must be a positive number or zero"
          );
          root.zzfxV = value;
        },
        /** PLUGINS API */
        /**
         * Returns the canvas
         *
         * @returns {HTMLCanvasElement}
         */
        canvas: () => _canvas,
        /**
         * Prepares a plugin to be loaded
         *
         * @param {pluginCallback} callback
         */
        use(callback, config = {}) {
          DEV: assert(
            "function" === typeof callback,
            "[litecanvas] use() 1st param must be a function"
          );
          DEV: assert(
            "object" === typeof config,
            "[litecanvas] use() 2nd param must be an object"
          );
          if (_initialized) {
            loadPlugin(callback, config);
          } else {
            _plugins.push([callback, config]);
          }
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
            "[litecanvas] listen() 1st param must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            "[litecanvas] listen() 2nd param must be a function"
          );
          eventName = eventName.toLowerCase();
          _eventListeners[eventName] = _eventListeners[eventName] || /* @__PURE__ */ new Set();
          _eventListeners[eventName].add(callback);
          return () => _eventListeners && _eventListeners[eventName].delete(callback);
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
            "[litecanvas] emit() 1st param must be a string"
          );
          if (_initialized) {
            eventName = eventName.toLowerCase();
            triggerEvent("before:" + eventName, arg1, arg2, arg3, arg4);
            triggerEvent(eventName, arg1, arg2, arg3, arg4);
            triggerEvent("after:" + eventName, arg1, arg2, arg3, arg4);
          }
        },
        /**
         * Set or reset the color palette
         *
         * @param {string[]} [colors]
         */
        pal(colors = defaultPalette) {
          DEV: assert(
            Array.isArray(colors) && colors.length > 0,
            "[litecanvas] pal() 1st param must be a array of strings"
          );
          _colors = colors;
        },
        /**
         * Define or update a instance property.
         *
         * @param {string} key
         * @param {*} value
         */
        def(key, value) {
          DEV: assert("string" === typeof key, "[litecanvas] def() 1st param must be a string");
          DEV: if (null == value) {
            console.warn(
              `[litecanvas] def() changed the key "${key}" to null (previous value was ${instance[key]})`
            );
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
            isNumber(value) && value >= 0,
            "[litecanvas] timescale() 1st param must be a positive number or zero"
          );
          _timeScale = value;
        },
        /**
         * Set the target FPS (frames per second).
         *
         * @param {number} value
         */
        framerate(value) {
          DEV: assert(
            isNumber(value) && value >= 1,
            "[litecanvas] framerate() 1st param must be a positive number"
          );
          _fpsInterval = 1e3 / ~~value;
        },
        /**
         * Returns information about that engine instance.
         *
         * @param {number} n
         * @returns {any}
         */
        stat(n) {
          DEV: assert(isNumber(n) && n >= 0, "[litecanvas] stat() 1st param must be a number");
          const list = [
            // 0
            settings,
            // 1
            _initialized,
            // 2
            _fpsInterval / 1e3,
            // 3
            _scale,
            // 4
            _eventListeners,
            // 5
            _colors,
            // 6
            _defaultSound,
            // 7
            _timeScale,
            // 8
            root.zzfxV,
            // 9
            _rngSeed,
            // 10
            _fontSize,
            //  11
            _fontFamily
          ];
          const data = { index: n, value: list[n] };
          instance.emit("stat", data);
          return data.value;
        },
        /**
         * Stops the litecanvas instance and remove all event listeners.
         */
        quit() {
          instance.pause();
          instance.emit("quit");
          _eventListeners = {};
          for (const removeListener of _browserEventListeners) {
            removeListener();
          }
          if (settings.global) {
            for (const key in instance) {
              delete root[key];
            }
            delete root.ENGINE;
          }
          _initialized = false;
        },
        /**
         * Pauses the engine loop (update & draw).
         */
        pause() {
          cancelAnimationFrame(_rafid);
          _rafid = 0;
        },
        /**
         * Resumes (if paused) the engine loop.
         */
        resume() {
          if (_initialized && !_rafid) {
            _accumulated = _fpsInterval;
            _lastFrameTime = Date.now();
            _rafid = raf(drawFrame);
          }
        },
        /**
         * Returns `true` if the engine loop is paused.
         *
         * @returns {boolean}
         */
        paused() {
          return !_rafid;
        }
      };
      for (const k of _mathFunctions.split(",")) {
        instance[k] = math[k];
      }
      function init() {
        const source = settings.loop ? settings.loop : root;
        for (const event of _coreEvents.split(",")) {
          DEV: if (root === source && source[event]) {
            console.info(`[litecanvas] using window.${event}()`);
          }
          if (source[event]) instance.listen(event, source[event]);
        }
        for (const [callback, config] of _plugins) {
          loadPlugin(callback, config);
        }
        if (settings.autoscale) {
          on(root, "resize", resizeCanvas);
        }
        if (settings.tapEvents) {
          const _getXY = (
            /**
             * @param {MouseEvent | Touch} ev
             */
            (ev) => [
              (ev.pageX - _canvas.offsetLeft) / _scale,
              (ev.pageY - _canvas.offsetTop) / _scale
            ]
          ), _taps = /* @__PURE__ */ new Map(), _registerTap = (
            /**
             * @param {number} id
             * @param {number} [x]
             * @param {number} [y]
             */
            (id, x, y) => {
              const tap = {
                // current x
                x,
                // current y
                y,
                // initial x
                xi: x,
                // initial y
                yi: y,
                // timestamp
                t: Date.now()
              };
              _taps.set(id, tap);
              return tap;
            }
          ), _updateTap = (
            /**
             * @param {number} id
             * @param {number} x
             * @param {number} y
             */
            (id, x, y) => {
              const tap = _taps.get(id) || _registerTap(id);
              tap.x = x;
              tap.y = y;
            }
          ), _checkTapped = (
            /**
             * @param {{t: number}} tap
             */
            (tap) => tap && Date.now() - tap.t <= 300
          ), preventDefault = (
            /**
             * @param {Event} ev
             */
            (ev) => ev.preventDefault()
          );
          let _pressingMouse = false;
          on(
            _canvas,
            "mousedown",
            /**
             * @param {MouseEvent} ev
             */
            (ev) => {
              if (ev.button === 0) {
                preventDefault(ev);
                const [x, y] = _getXY(ev);
                instance.emit("tap", x, y, 0);
                _registerTap(0, x, y);
                _pressingMouse = true;
              }
            }
          );
          on(
            _canvas,
            "mouseup",
            /**
             * @param {MouseEvent} ev
             */
            (ev) => {
              if (ev.button === 0) {
                preventDefault(ev);
                const tap = _taps.get(0);
                const [x, y] = _getXY(ev);
                if (_checkTapped(tap)) {
                  instance.emit("tapped", tap.xi, tap.yi, 0);
                }
                instance.emit("untap", x, y, 0);
                _taps.delete(0);
                _pressingMouse = false;
              }
            }
          );
          on(
            root,
            "mousemove",
            /**
             * @param {MouseEvent} ev
             */
            (ev) => {
              preventDefault(ev);
              const [x, y] = _getXY(ev);
              instance.def("MX", x);
              instance.def("MY", y);
              if (!_pressingMouse) return;
              instance.emit("tapping", x, y, 0);
              _updateTap(0, x, y);
            }
          );
          on(
            _canvas,
            "touchstart",
            /**
             * @param {TouchEvent} ev
             */
            (ev) => {
              preventDefault(ev);
              const touches = ev.changedTouches;
              for (const touch of touches) {
                const [x, y] = _getXY(touch);
                instance.emit("tap", x, y, touch.identifier + 1);
                _registerTap(touch.identifier + 1, x, y);
              }
            }
          );
          on(
            _canvas,
            "touchmove",
            /**
             * @param {TouchEvent} ev
             */
            (ev) => {
              preventDefault(ev);
              const touches = ev.changedTouches;
              for (const touch of touches) {
                const [x, y] = _getXY(touch);
                instance.emit("tapping", x, y, touch.identifier + 1);
                _updateTap(touch.identifier + 1, x, y);
              }
            }
          );
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
                instance.emit("tapped", tap.xi, tap.yi, id);
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
          const _keysDown = /* @__PURE__ */ new Set();
          const _keysPress = /* @__PURE__ */ new Set();
          const keyCheck = (keySet, key = "") => {
            key = key.toLowerCase();
            return !key ? keySet.size > 0 : keySet.has("space" === key ? " " : key);
          };
          on(root, "keydown", (event) => {
            const key = event.key.toLowerCase();
            if (!_keysDown.has(key)) {
              _keysDown.add(key);
              _keysPress.add(key);
            }
          });
          on(root, "keyup", (event) => {
            _keysDown.delete(event.key.toLowerCase());
          });
          on(root, "blur", () => _keysDown.clear());
          instance.listen("after:update", () => _keysPress.clear());
          instance.def(
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
                "[litecanvas] iskeydown() 1st param must be a string or undefined"
              );
              return keyCheck(_keysDown, key);
            }
          );
          instance.def(
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
                "[litecanvas] iskeypressed() 1st param must be a string or undefined"
              );
              return keyCheck(_keysPress, key);
            }
          );
        }
        _initialized = true;
        instance.emit("init", instance);
        instance.resume();
      }
      function drawFrame() {
        if (!settings.animate) {
          return instance.emit("draw", _ctx);
        }
        let now = Date.now();
        let updated = 0;
        let frameTime = now - _lastFrameTime;
        _lastFrameTime = now;
        _accumulated += frameTime < 100 ? frameTime : _fpsInterval;
        while (_accumulated >= _fpsInterval) {
          updated++;
          _accumulated -= _fpsInterval;
          let dt = _fpsInterval / 1e3 * _timeScale;
          instance.emit("update", dt, updated);
          instance.def("T", instance.T + dt);
        }
        if (updated) {
          instance.emit("draw", _ctx);
          if (updated > 1) {
            _accumulated = 0;
            DEV: console.warn(
              "[litecanvas] the last frame updated " + updated + " times. This can drop the FPS if it keeps happening."
            );
          }
        }
        _rafid = raf(drawFrame);
      }
      function setupCanvas() {
        if ("string" === typeof settings.canvas) {
          _canvas = document.querySelector(settings.canvas);
          DEV: assert(
            null != _canvas,
            '[litecanvas] litecanvas() option "canvas" is an invalid CSS selector'
          );
        } else {
          _canvas = settings.canvas;
        }
        _canvas = _canvas || document.createElement("canvas");
        DEV: assert(
          "CANVAS" === _canvas.tagName,
          '[litecanvas] litecanvas() option "canvas" should be a canvas element or string (CSS selector)'
        );
        _ctx = _canvas.getContext("2d");
        on(_canvas, "click", () => focus());
        _canvas.style = "";
        resizeCanvas();
        if (!_canvas.parentNode) {
          document.body.appendChild(_canvas);
        }
        _canvas.oncontextmenu = () => false;
      }
      function resizeCanvas() {
        DEV: assert(
          null == settings.width || isNumber(settings.width) && settings.width > 0,
          '[litecanvas] litecanvas() option "width" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || isNumber(settings.height) && settings.height > 0,
          '[litecanvas] litecanvas() option "height" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || settings.width > 0 && settings.height > 0,
          '[litecanvas] litecanvas() option "width" is required when the option "height" is defined'
        );
        const width = settings.width > 0 ? settings.width : innerWidth, height = settings.width > 0 ? settings.height || settings.width : innerHeight;
        instance.def("W", width);
        instance.def("H", height);
        _canvas.width = width;
        _canvas.height = height;
        if (settings.autoscale) {
          let maxScale = +settings.autoscale;
          if (!_canvas.style.display) {
            _canvas.style.display = "block";
            _canvas.style.margin = "auto";
          }
          _scale = math.min(innerWidth / width, innerHeight / height);
          _scale = maxScale > 1 && _scale > maxScale ? maxScale : _scale;
          _canvas.style.width = width * _scale + "px";
          _canvas.style.height = height * _scale + "px";
        }
        if (settings.pixelart) {
          _ctx.imageSmoothingEnabled = false;
          _canvas.style.imageRendering = "pixelated";
        }
        instance.textalign("start", "top");
        instance.emit("resized", _scale);
        if (!settings.animate) {
          raf(drawFrame);
        }
      }
      function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (!_eventListeners[eventName]) return;
        for (const callback of _eventListeners[eventName]) {
          callback(arg1, arg2, arg3, arg4);
        }
      }
      function loadPlugin(callback, config) {
        const pluginData = callback(instance, config);
        DEV: assert(
          null == pluginData || "object" === typeof pluginData,
          "[litecanvas] litecanvas() plugins should return an object or nothing"
        );
        for (const key in pluginData) {
          instance.def(key, pluginData[key]);
        }
      }
      if (settings.global) {
        if (root.ENGINE) {
          throw new Error("only one global litecanvas is allowed");
        }
        Object.assign(root, instance);
        root.ENGINE = instance;
      }
      DEV: console.info(`[litecanvas] version ${version} started`);
      DEV: console.debug(`[litecanvas] litecanvas() options =`, settings);
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
    var Et = Object.defineProperty;
    var wt = (e, t) => {
      for (var s in t) Et(e, s, { get: t[s], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var Z = {};
    wt(Z, { ANCHOR_BOT_LEFT: () => Jt, ANCHOR_BOT_RIGHT: () => Qt, ANCHOR_CENTER: () => $t, ANCHOR_TOP_LEFT: () => J, ANCHOR_TOP_RIGHT: () => Gt, Actor: () => O, BACK_IN: () => re, BACK_IN_OUT: () => oe, BACK_OUT: () => ie, BOUNCE_IN: () => lt, BOUNCE_IN_OUT: () => le, BOUNCE_OUT: () => B, Camera: () => y, DOWN: () => zt, EASE_IN: () => te, EASE_IN_OUT: () => se, EASE_OUT: () => ee, ELASTIC_IN: () => he, ELASTIC_IN_OUT: () => ae, ELASTIC_OUT: () => ne, Grid: () => b, LEFT: () => Kt, LINEAR: () => at, Noise: () => Y, ONE: () => Vt, RIGHT: () => qt, TypedGrid: () => N, UP: () => jt, Vector: () => I, ZERO: () => G, advance: () => tt, choose: () => mt, colcirc: () => X, colrect: () => W, diff: () => Q, dist: () => st, flipImage: () => ct, formatTime: () => Mt, fract: () => v, head: () => gt, intersection: () => w, last: () => yt, lerpAngle: () => ht, mag: () => rt, makeCircle: () => ft, makeRectangle: () => _t, mean: () => it, median: () => ot, mod: () => et, percent: () => nt, range: () => xt, resolverect: () => H, scaleImage: () => pt, shuffle: () => dt, sum: () => R, tail: () => It, tintImage: () => ut, tween: () => vt, vec: () => h, vecAbs: () => Yt, vecAdd: () => L, vecAngle: () => St, vecAngleBetween: () => Ot, vecCeil: () => Zt, vecClamp: () => Wt, vecCross: () => Ct, vecDist: () => Lt, vecDist2: () => kt, vecDiv: () => P, vecDot: () => $, vecEq: () => A, vecFloor: () => Ut, vecIsZero: () => Dt, vecLerp: () => Bt, vecLimit: () => At, vecMag: () => z, vecMag2: () => K, vecMove: () => Xt, vecMult: () => M, vecNorm: () => S, vecRand: () => Ft, vecReflect: () => Tt, vecRotate: () => Rt, vecRound: () => Ht, vecSet: () => q, vecSetMag: () => Nt, vecSub: () => k });
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
      constructor(t = null, s = 0, r = 0, i = null, o = null) {
        this._engine = t || globalThis, this.ox = s, this.oy = r, this.resize(i || this._engine.W - s, o || this._engine.H - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
      }
      resize(t, s) {
        this.width = t, this.height = s, this._engine.emit("camera-resized", this);
      }
      start(t = false) {
        this._engine.push(), t && this._engine.clip((i) => {
          i.rect(this.ox, this.oy, this.width, this.height);
        });
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
        let i = Math.cos(-this.rotation), o = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, s = (s - this.height / 2 - this.oy) / this.scale, r.x = i * t - o * s + this.x, r.y = o * t + i * s + this.y, r;
      }
      getCameraPoint(t, s, r = {}) {
        let i = Math.cos(-this.rotation), o = Math.sin(-this.rotation);
        return t = t - this.x, s = s - this.y, t = i * t - o * s, s = o * t + i * s, r.x = t * this.scale + this.width / 2 + this.ox, r.y = s * this.scale + this.height / 2 + this.oy, r;
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
    var w = (e, t, s, r, i, o, n, a) => {
      let l = Math.max(e, i), x = Math.min(e + s, i + n) - l, p = Math.max(t, o), d = Math.min(t + r, o + a) - p;
      return [l, p, x, d];
    };
    var H = (e, t, s, r, i, o, n, a) => {
      let [l, x, p, d] = w(e, t, s, r, i, o, n, a), _ = "", g = e, c = t;
      return p < d ? e < i ? (_ = "right", g = i - s) : (_ = "left", g = i + n) : t < o ? (_ = "bottom", c = o - r) : (_ = "top", c = o + a), { direction: _, x: g, y: c };
    };
    var W = (e, t, s, r, i, o, n, a) => e < i + n && e + s > i && t < o + a && t + r > o;
    var X = (e, t, s, r, i, o) => (r - e) * (r - e) + (i - t) * (i - t) <= (s + o) * (s + o);
    var b = class e {
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
        let r = s ? this.length - 1 : 0, i = s ? -1 : this.length, o = s ? -1 : 1;
        for (; r !== i; ) {
          let n = this.indexToPointX(r), a = this.indexToPointY(r), l = this._c[r];
          if (t(n, a, l, this) === false) break;
          r += o;
        }
      }
      fill(t) {
        this.forEach((s, r) => {
          this.set(s, r, t);
        });
      }
      clampX(t) {
        return D(t, 0, this._w - 1);
      }
      clampY(t) {
        return D(t, 0, this._h - 1);
      }
      toArray() {
        return this._c.slice();
      }
      toString(t = " ", s = true) {
        if (!s) return this._c.join(t);
        let r = [];
        return this.forEach((i, o, n) => {
          r[o] = r[o] || "", r[o] += n + t;
        }), r.join(`
`);
      }
    }, N = class e extends b {
      constructor(t, s, r = Uint8Array) {
        super(t, s, null), this._c = new r(this._w * this._h);
      }
      has(t, s) {
        return this.get(t, s) !== 0;
      }
      clone() {
        let t = new e(this._w, this._h, this._c.constructor);
        return this.forEach((s, r, i) => {
          t.set(s, r, i);
        }), t;
      }
    };
    function D(e, t, s) {
      return e < t ? t : e > s ? s : e;
    }
    var bt = Math.sqrt, V = Math.cos, j = Math.sin, Pt = 2 * Math.PI, I = class {
      x;
      y;
      constructor(t = 0, s = t) {
        this.x = t, this.y = s;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, m = (e) => e instanceof I, h = (e = 0, t = e) => (m(e) && (t = e.y, e = e.x), new I(e, t)), A = (e, t, s = t) => m(t) ? A(e, t.x, t.y) : e.x === t && e.y === s, q = (e, t, s = t) => (m(t) ? q(e, t.x, t.y) : (e.x = t, e.y = s), e), L = (e, t, s = t) => m(t) ? L(e, t.x, t.y) : (e.x += t, e.y += s, e), k = (e, t, s = t) => m(t) ? k(e, t.x, t.y) : (e.x -= t, e.y -= s, e), M = (e, t, s = t) => m(t) ? M(e, t.x, t.y) : (e.x *= t, e.y *= s, e), P = (e, t, s = t) => m(t) ? P(e, t.x, t.y) : (e.x /= t || 1, e.y /= s || 1, e), Rt = (e, t) => {
      let s = V(t), r = j(t);
      return e.x = s * e.x - r * e.y, e.y = r * e.x + s * e.y, e;
    }, Tt = (e, t) => {
      let s = S(h(t));
      return k(e, M(s, 2 * $(e, s)));
    }, Nt = (e, t) => (S(e), M(e, t), e), z = (e) => Math.hypot(e.x, e.y), K = (e) => e.x * e.x + e.y * e.y, S = (e) => {
      let t = z(e);
      return t > 0 && P(e, t), e;
    }, At = (e, t = 1) => {
      let s = K(e);
      return s > t * t && (P(e, bt(s)), M(e, t)), e;
    }, Lt = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), kt = (e, t) => {
      let s = e.x - t.x, r = e.y - t.y;
      return s * s + r * r;
    }, St = (e) => Math.atan2(e.y, e.x), Ot = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), $ = (e, t) => e.x * t.x + e.y * t.y, Ct = (e, t) => e.x * t.y - e.y * t.x, Bt = (e, t, s) => (e.x += (t.x - e.x) * s || 0, e.y += (t.y - e.y) * s || 0, e), Ft = (e = 1, t = e, s = globalThis.rand || Math.random) => {
      let r = s() * Pt, i = s() * (t - e) + e;
      return h(V(r) * i, j(r) * i);
    }, Yt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Zt = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Ut = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Ht = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Wt = (e, t, s) => (e.x < t.x && (e.x = t.x), e.x > s.x && (e.x = s.x), e.y < t.y && (e.y = t.y), e.y > s.y && (e.y = s.y), e), Xt = (e, t, s = 1) => L(e, t.x * s, t.y * s), Dt = (e) => A(e, G), G = h(0, 0), Vt = h(1, 1), jt = h(0, -1), qt = h(1, 0), zt = h(0, 1), Kt = h(-1, 0);
    var $t = h(0.5, 0.5), J = h(0, 0), Gt = h(1, 0), Jt = h(0, 1), Qt = h(1, 1), O = class {
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
        this.sprite = t, this.pos = s || h(0), this._o = h(r), this._s = h(1, 1);
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
        let s = this.sprite.width * (t ? this._s.x : 1), r = this.sprite.height * (t ? this._s.y : 1), i = this.pos.x - s * this.anchor.x, o = this.pos.y - r * this.anchor.y;
        return [i, o, s, r];
      }
      draw(t = globalThis, s = true) {
        this.hidden || this.opacity <= 0 || (s && t.push(), this.transform(t), this.drawImage(t), s && t.pop());
      }
      transform(t) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t, s = true) {
        let r = this.anchor, i = -this.sprite.width * (this.flipX ? 1 - r.x : r.x), o = -this.sprite.height * (this.flipY ? 1 - r.y : r.y);
        s && t.alpha(this.opacity), t.image(i, o, this.sprite);
      }
    };
    var Q = (e, t) => Math.abs(t - e) || 0;
    var v = (e) => e % 1 || 0;
    var tt = (e, t, s, r = 1) => {
      s && (t.x += s.x * r, t.y += s.y * r), e.x += t.x * r, e.y += t.y * r;
    };
    var et = (e, t) => (t + e % t) % t;
    var st = (e, t, s, r) => Math.hypot(s - e, r - t);
    var rt = (e, t) => Math.hypot(e, t);
    var R = (e) => {
      let t = 0;
      for (let s = 0; s < e.length; s++) t += e[s];
      return t;
    };
    var it = (e) => R(e) / e.length;
    var ot = (...e) => {
      let t = e.sort((r, i) => r - i), s = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[s - 1] + t[s]) / 2 : t[s];
    };
    var ht = (e, t, s) => {
      let r = (t - e) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), e + r * s;
    };
    var nt = (e, t = 0, s = 1) => s - t ? (e - t) / (s - t) : 0;
    var T = Math.PI / 2, vt = (e, t, s, r = 1, i = at) => new C(e, t, s, r, i), at = (e) => e, te = (e) => e * e, ee = (e) => -e * (e - 2), se = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, re = (e) => e * e * e - e * Math.sin(e * Math.PI), ie = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, oe = (e) => {
      if (e < 0.5) {
        let s = 2 * e;
        return 0.5 * (s * s * s - s * Math.sin(s * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, he = (e) => Math.sin(13 * T * e) * Math.pow(2, 10 * (e - 1)), ne = (e) => Math.sin(-13 * T * (e + 1)) * Math.pow(2, -10 * e) + 1, ae = (e) => {
      if (e < 0.5) {
        let r = Math.sin(13 * T * (2 * e)), i = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * r * i;
      }
      let t = Math.sin(-13 * T * (2 * e - 1 + 1)), s = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * s + 2);
    }, lt = (e) => 1 - B(1 - e), B = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, le = (e) => e < 0.5 ? 0.5 * lt(e * 2) : 0.5 * B(e * 2 - 1) + 0.5, C = class {
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
      constructor(t, s, r, i, o) {
        this._o = t, this._p = s, this._x = r, this._d = i, this._e = o, this._w = 0;
      }
      start(t) {
        if (this.running) return this;
        this._cu.stop(false), this._ch = this._cu = this, this.running = true;
        let s = this._o[this._p] || 0, r = this._rel ? s + this._x : this._x;
        return this._lc = this._lc || t || globalThis, this._u = this._lc.listen("update", (i) => {
          if (this._t <= this._w) {
            this._t += i;
            return;
          }
          let o = this._t - this._w;
          this._o[this._p] = this._lc.lerp(s, r, this._e(o / this._d)), this._t += i, o >= this._d && (this._o[this._p] = r, this.stop());
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
    var F = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), Y = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, s = 0, r = 0) {
        t < 0 && (t = -t), s < 0 && (s = -s), r < 0 && (r = -r);
        let i = Math.floor(t), o = Math.floor(s), n = Math.floor(r), a = t - i, l = s - o, x = r - n, p, d, _ = 0, g = 0.5, c, u, E;
        for (let U = 0; U < this._po; U++) {
          let f = i + (o << 4) + (n << 8);
          p = F(a), d = F(l), c = this._p[f & 4095], c += p * (this._p[f + 1 & 4095] - c), u = this._p[f + 16 & 4095], u += p * (this._p[f + 16 + 1 & 4095] - u), c += d * (u - c), f += 256, u = this._p[f & 4095], u += p * (this._p[f + 1 & 4095] - u), E = this._p[f + 16 & 4095], E += p * (this._p[f + 16 + 1 & 4095] - E), u += d * (E - u), c += F(x) * (u - c), _ += c * g, g *= this._pf, i <<= 1, a *= 2, o <<= 1, l *= 2, n <<= 1, x *= 2, a >= 1 && (i++, a--), l >= 1 && (o++, l--), x >= 1 && (n++, x--);
        }
        return _;
      }
      noiseDetail(t, s) {
        t > 0 && (this._po = t), s > 0 && (this._pf = s);
      }
      noiseSeed(t = null) {
        t != null && this._e.rseed(t);
        let s = this._e.rand || Math.random;
        for (let r = 0; r < 4096; r++) this._p[r] = s();
      }
    };
    var ct = (e, t = true, s = false, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.scale(t ? -1 : 1, s ? -1 : 1), r.image(t ? -e.width : 0, s ? -e.height : 0, e), r.pop();
    });
    var pt = (e, t, s = true, r = globalThis) => r.paint(e.width * t, e.height * t, (i) => {
      r.push(), i.imageSmoothingEnabled = !s, r.scale(t), r.image(0, 0, e), r.pop();
    });
    var ut = (e, t, s = 1, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.alpha(s), r.rectfill(0, 0, e.width, e.height, t), i.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, e), r.pop();
    });
    var ft = (e, t, { borderWidth: s = 0, borderColor: r = 0, engine: i = globalThis } = {}) => {
      let o = e * 2 + s;
      return i.paint(o, o, () => {
        i.circfill(o / 2, o / 2, e, t), s > 0 && (i.linewidth(s), i.stroke(r));
      });
    };
    var _t = (e, t, s, { borderWidth: r = 0, borderColor: i = 0, engine: o = globalThis } = {}) => {
      let n = e + r * 2, a = t + r * 2;
      return o.paint(n, a, () => {
        let l = r > 0;
        l && o.cls(i), o.rectfill(l ? r : 0, l ? r : 0, e, t, s);
      });
    };
    var xt = (e, t = 0, s = 1) => [...new Array(e).keys()].map((r) => t + s * r);
    var dt = (e, t = globalThis.rand || Math.random) => {
      e = [...e];
      for (let s = e.length - 1; s > 0; s--) {
        let r = Math.floor(t() * (s + 1)), i = e[s];
        e[s] = e[r], e[r] = i;
      }
      return e;
    };
    var mt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var gt = (e) => e[0];
    var yt = (e) => e[e.length - 1];
    var It = (e) => e.slice(1);
    var Mt = (e) => ~~(e / 60) + ":" + (e % 60 < 10 ? "0" : "") + ~~(e % 60);
    globalThis.utils = Object.assign(globalThis.utils || {}, Z);
  })();
  (() => {
    function c(t) {
      return t.split("\\").pop().split("/").pop().split(".")[0];
    }
    function b(t, e) {
      return e && !I(t) && (t = e + t), t;
    }
    function I(t) {
      try {
        return !!new URL(t).protocol;
      } catch {
      }
      return false;
    }
    var h = { crossOrigin: "anonymous", baseURL: null, allowSoundInterruptions: true, ignoreErrors: false }, l = (t, e) => {
      let i = "LOADING";
      t.def(i, ~~t[i] + ~~e);
    };
    function y(t, e = {}) {
      return e = Object.assign({}, h, e), l(t, 0), t.def("ASSETS", t.ASSETS || {}), t.ASSETS.font = {}, { loadFont: async (r, a, p) => {
        let { baseURL: m, ignoreErrors: f } = e, o = c(a);
        a = b(a, m);
        let n = new FontFace(r, `url(${a})`), u = { asset: n, type: "font", fontName: r, src: a, id: o };
        t.emit("filter-asset", n, u), document.fonts.add(n), l(t, 1);
        let s = n.load();
        return s.then((d) => {
          t.ASSETS.font[o] = d, p && p(d), t.emit("asset-load", u), l(t, -1);
        }).catch((d) => {
          if (console.error(d), !f) throw new Error("Failed to load font from " + a);
          p && p(), t.emit("asset-error", u);
        }), s;
      } };
    }
    function A(t, e = {}) {
      return e = Object.assign({}, h, e), l(t, 0), t.def("ASSETS", t.ASSETS || {}), t.ASSETS.image = {}, { loadImage: async (r, a) => {
        let { baseURL: p, ignoreErrors: m, crossOrigin: f } = e, o = t.stat(5), n = { splitFrames: F, convertColors: j(o) }, u = c(r);
        r = b(r, p);
        let s = new Image(), d = { asset: s, type: "image", src: r, id: u };
        return new Promise((w) => {
          l(t, 1), s.crossOrigin = f, s.onerror = (g) => {
            console.error(g);
            let S = "Failed to load image from " + r;
            if (!m) throw new Error(S);
            a && a(), t.emit("asset-error", d);
          }, s.onload = () => {
            t.ASSETS.image[u] = s, a && a(s, n), t.emit("asset-load", d), l(t, -1), w(s);
          }, t.emit("filter-asset", s, d), s.src = r;
        });
      } };
    }
    function F(t, e, i, r = 0, a = 0) {
      let p = [], m = Math.floor((t.width + a) / (e + a)), f = Math.floor((t.height + a) / (i + a));
      for (let o = 0; o < f; o++) for (let n = 0; n < m; n++) {
        let u = new OffscreenCanvas(e, i);
        u.getContext("2d").drawImage(t, r + n * e + n * a, r + o * i + o * a, e, i, 0, 0, e, i), p.push(u);
      }
      return p;
    }
    function j(t) {
      return (e, i = false) => {
        let r = new OffscreenCanvas(e.width, e.height), a = r.getContext("2d");
        a.drawImage(e, 0, 0);
        let p = a.getImageData(0, 0, e.width, e.height), m = p.data, f = /* @__PURE__ */ new Map();
        for (let o = 0, n = m.length; o < n; o += 4) {
          let u = m[o], s = m[o + 1], d = m[o + 2], w = [u, s, d], g = w.join(","), S = f.get(g);
          S || (S = P(w, t), f.set(g, S));
          let _ = S.startsWith("#") ? O(S) : D(S);
          m[o] = _[0], m[o + 1] = _[1], m[o + 2] = _[2], m[o + 3] = i ? m[o + 3] : 255;
        }
        return a.putImageData(p, 0, 0), r;
      };
    }
    function O(t) {
      let e = 0, i = 0, r = 0;
      return t.length === 4 ? (e = "0x" + t[1] + t[1], i = "0x" + t[2] + t[2], r = "0x" + t[3] + t[3]) : t.length === 7 && (e = "0x" + t[1] + t[2], i = "0x" + t[3] + t[4], r = "0x" + t[5] + t[6]), [~~e, ~~i, ~~r];
    }
    function D(t) {
      let e = t.indexOf(",") > -1 ? "," : " ";
      t = t.substr(4).split(")")[0].split(e);
      let i = (+t[0]).toString(16), r = (+t[1]).toString(16), a = (+t[2]).toString(16);
      return i.length === 1 && (i = "0" + i), r.length === 1 && (r = "0" + r), a.length === 1 && (a = "0" + a), [i | 0, r | 0, a | 0];
    }
    function P(t, e) {
      let i = 1 / 0, r = null, [a, p, m] = t;
      return e.forEach((f) => {
        let [o, n, u] = f.startsWith("#") ? O(f) : D(f), s = Math.sqrt((a - o) ** 2 + (p - n) ** 2 + (m - u) ** 2);
        s < i && (i = s, r = f);
      }), r;
    }
    function E(t, e = {}) {
      return e = Object.assign({}, h, e), l(t, 0), t.def("ASSETS", t.ASSETS || {}), t.ASSETS.script = {}, { loadScript: async (r, a) => {
        let { baseURL: p, ignoreErrors: m, crossOrigin: f } = e, o = c(r);
        r = b(r, p);
        let n = document.createElement("script"), u = { asset: n, type: "script", src: r, id: o };
        return new Promise((s) => {
          l(t, 1), n.crossOrigin = f, n.onerror = (d) => {
            if (console.error(d), !m) throw new Error("Failed to load " + r);
            a && a(), t.emit("asset-error", u);
          }, n.onload = () => {
            t.ASSETS.script[o] = n, a && a(n), t.emit("asset-load", u), l(t, -1), s(n);
          }, t.emit("filter-asset", n, u), n.src = r, document.head.appendChild(n);
        });
      } };
    }
    function x(t, e = {}) {
      return e = Object.assign({}, h, e), l(t, 0), t.def("ASSETS", t.ASSETS || {}), t.ASSETS.sound = {}, { loadSound: async (r, a) => {
        let { crossOrigin: p, ignoreErrors: m, allowSoundInterruptions: f, baseURL: o } = e, n = c(r);
        r = b(r, o);
        let u = new Audio(), s = { asset: u, type: "sound", src: r, id: n };
        return new Promise((d) => {
          l(t, 1), u.crossOrigin = p, u.onerror = (w) => {
            if (console.error(w), !m) throw new Error("Failed to load " + r);
            a && a(null), t.emit("asset-error", s);
          }, u[f ? "oncanplay" : "oncanplaythrough"] = () => {
            t.ASSETS.sound[n] = u, a && a(u), t.emit("asset-load", s), l(t, -1), d(u);
          }, t.emit("filter-asset", u, s), u.src = r;
        });
      } };
    }
    Object.assign(HTMLAudioElement.prototype, { stop() {
      this.pause(), this.currentTime = 0, this.src = this.src;
    }, restart() {
      this.pause(), this.currentTime = 0, this.play();
    } });
    function L(t, e = {}) {
      return e = Object.assign({}, h, e), l(t, 0), t.def("ASSETS", t.ASSETS || {}), t.ASSETS.json = {}, { loadJSON: async (r, a, p) => {
        let { baseURL: m, ignoreErrors: f } = e, o = c(r);
        r = b(r, m);
        let n = { type: "json", src: r, id: o };
        t.emit("filter-asset", null, n), l(t, 1), t.ASSETS.json = {};
        let u = fetch(r, p);
        return u.then((s) => s.json()).then((s) => {
          ASSETS.json[o] = s, n.json = s, a && a(s), t.emit("asset-load", n), l(t, -1);
        }).catch((s) => {
          if (console.error(s), !f) throw new Error("Failed to load JSON from " + r);
          a && a(), t.emit("asset-error", n);
        }), u;
      } };
    }
    function T(t) {
      return l(t, 0), t.def("ASSETS", t.ASSETS || {}), { load: (i) => new Promise((r, a) => {
        l(t, 1), i((m) => (l(t, -1), r(m)), a);
      }) };
    }
    function v(t, e = {}) {
      t.use(y, e), t.use(A, e), t.use(E, e), t.use(x, e), t.use(L, e), t.use(T);
    }
    window.pluginAssetLoader = v;
  })();
  (() => {
    var o = (a, c = "Assertion failed") => {
      if (!a) throw new Error(c);
    };
    var _ = (a, c, m, l, s, h, f, b) => (o(isFinite(a), "colrect: 1st param must be a number"), o(isFinite(c), "colrect: 2nd param must be a number"), o(isFinite(m), "colrect: 3rd param must be a number"), o(isFinite(l), "colrect: 4th param must be a number"), o(isFinite(s), "colrect: 5th param must be a number"), o(isFinite(h), "colrect: 6th param must be a number"), o(isFinite(f), "colrect: 7th param must be a number"), o(isFinite(b), "colrect: 8th param must be a number"), a < s + f && a + m > s && c < h + b && c + l > h);
    var x = (a, c, m, l, s, h) => (o(isFinite(a), "colcirc: 1st param must be a number"), o(isFinite(c), "colcirc: 2nd param must be a number"), o(isFinite(m), "colcirc: 3rd param must be a number"), o(isFinite(l), "colcirc: 4th param must be a number"), o(isFinite(s), "colcirc: 5th param must be a number"), o(isFinite(h), "colcirc: 6th param must be a number"), (l - a) * (l - a) + (s - c) * (s - c) <= (m + h) * (m + h));
    var wt = 2 * Math.PI;
    var oe = Math.PI / 2;
    var Z = { warnings: true };
    function v(a, c = {}) {
      if (c = Object.assign({}, Z, c), a.stat(1)) throw 'Plugin Migrate should be loaded before the "init" event';
      let l = a.stat(0);
      function s(t, e, r = "") {
        c.warnings && console.warn(`[litecanvas/migrate] ${t} is removed. ` + (e ? `Use ${e} instead. ` : "") + r);
      }
      function h(t) {
        return s("seed()", "rseed()"), t && a.rseed(t), a.stat(9);
      }
      let f = "";
      function b(t) {
        s("textstyle()", "the 5th param of text()"), f = t;
      }
      let w = a.text;
      function g(t, e, r, i = 3, p = f) {
        w(t, e, r, i, p);
      }
      function E(t, e, r, i) {
        s("print()", "text()"), g(t, e, r, i);
      }
      function M(t, e) {
        s("textmetrics()", "ctx().measureText()");
        let r = a.ctx(), i = a.stat(10), p = a.stat(11);
        r.font = `${f || ""} ${~~(e || i)}px ${p}`;
        let d = r.measureText(t);
        return d.height = d.actualBoundingBoxAscent + d.actualBoundingBoxDescent, d;
      }
      function I(t, e, r, i) {
        s("cliprect()", "clip()");
        let p = a.ctx();
        p.beginPath(), p.rect(t, e, r, i), p.clip();
      }
      function A(t, e, r) {
        s("clipcirc()", "clip()");
        let i = a.ctx();
        i.beginPath(), i.arc(t, e, r, 0, a.TWO_PI), i.clip();
      }
      function T(t) {
        s("getcolor()", "stat(5)");
        let e = stat(5);
        return e[~~t % e.length];
      }
      function P(t) {
        s("blendmode()", "ctx().globalCompositeOperation");
        let e = a.ctx();
        e.globalCompositeOperation = t;
      }
      function R(t) {
        s("clear()", "cls()"), a.cls(t);
      }
      function C(t, e, r, i, p, d, D = true) {
        return s("transform()", "ctx().setTransform() or ctx().transform()"), a.ctx()[D ? "setTransform" : "transform"](t, e, r, i, p, d);
      }
      function S() {
        return s("mousepos()", "MX and MY"), [MX, MY];
      }
      function k(t) {
        s("setfps()", "framerate()"), a.framerate(t);
      }
      let n = a.def;
      function u(t, e) {
        switch (t) {
          case "W":
          case "WIDTH":
            n("W", e), n("WIDTH", e);
            break;
          case "H":
          case "HEIGHT":
            n("H", e), n("HEIGHT", e);
            break;
          case "T":
          case "ELAPSED":
            n("T", e), n("ELAPSED", e);
            break;
          case "CX":
          case "CENTERX":
            n("CX", e), n("CENTERX", e);
            break;
          case "CY":
          case "CENTERY":
            n("CY", e), n("CENTERY", e);
            break;
          case "MX":
          case "MOUSEX":
            n("MX", e), n("MOUSEX", e);
            break;
          case "MY":
          case "MOUSEY":
            n("MY", e), n("MOUSEY", e);
            break;
          default:
            n(t, e);
            break;
        }
      }
      function L(t, e) {
        s("setvar()", "def()"), u(t, e);
      }
      a.listen("resized", y);
      function y() {
        u("CX", a.W / 2), u("CY", a.H / 2);
      }
      y(), u("CANVAS", a.canvas());
      function N(t, e) {
        if (l.autoscale) throw "resize() don't works with autoscale enabled";
        s("resize()", null, "Avoid changing the canvas dimensions at runtime."), a.CANVAS.width = t, u("W", t), u("CX", t / 2), a.CANVAS.height = e, u("H", e), u("CY", e / 2), a.emit("resized", 1);
      }
      for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) a[t] != null && u(t, a[t]);
      if (s("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), n("FPS", ""), l.fps && a.framerate(l.fps), l.background != null) {
        let t = a.listen("before:draw", () => {
          let e = stat(5);
          a.canvas().style.background = e[~~l.background % e.length], t();
        });
      }
      function O(t) {
        return s("path()", "`new Path2D`", "See https://developer.mozilla.org/en-US/docs/Web/API/Path2D"), new Path2D(t);
      }
      let z = a.fill;
      function F(t, e) {
        if (e instanceof Path2D) {
          s("fill(color, path)");
          let r = a.stat(5), i = a.ctx();
          i.fillStyle = r[~~t % r.length], a.ctx().fill(e);
        } else z(t);
      }
      let Y = a.stroke;
      function H(t, e) {
        if (e instanceof Path2D) {
          s("stroke(color, path)");
          let r = a.stat(5), i = a.ctx();
          i.strokeStyle = r[~~t % r.length], a.ctx().stroke(e);
        } else Y(t);
      }
      let W = a.clip;
      function B(t) {
        s("clip(path)", "clip(callback)", "E.g: `clip((ctx) => ctx.rect(0, 0, 200, 200))`"), t instanceof Path2D ? a.ctx().clip(t) : W(t);
      }
      return l.antialias && s('"antialias" option', '"pixelart" option'), { def: u, seed: h, print: E, clear: R, setfps: k, setvar: L, textstyle: b, textmetrics: M, text: g, cliprect: I, clipcirc: A, blendmode: P, transform: C, getcolor: T, mousepos: S, resize: N, path: O, fill: F, stroke: H, clip: B, colrect: _, colcirc: x };
    }
    window.pluginMigrate = v;
  })();
  (() => {
    function A(s = {}) {
      let n = 0, o = true, b = s.position, r = document.createElement("div"), i = [], p = () => (performance || Date).now();
      ["right", "left"].includes(b) || (b = "right"), r.style.cssText = `position:absolute;top:0;${b}:0;cursor:pointer;opacity:0.8;z-index:10000`, r.addEventListener("click", function(a) {
        a.preventDefault(), e(++n % r.children.length);
      }, false);
      function f(a, t, x, g) {
        let _ = new S(a, t, x, r, g);
        return i.push(_), _;
      }
      function e(a) {
        for (let t = 0; t < r.children.length; t++) r.children[t].style.display = t === a ? "block" : "none";
        n = a;
      }
      function v() {
        n++, n >= r.children.length && (n = 0), e(n);
      }
      function h(a = "all") {
        if (a === "all") for (let t = 0; t < i.length; t++) i[t].reset();
        else i[a] && i[a].reset();
        u = p(), l = 0;
      }
      function d(a = true) {
        o = !!a, r.style.display = o ? "" : "none";
      }
      let m = p(), u = m, l = 0, y = f("FPS", "#0ff", "#002"), w = f("MS", "#0f0", "#020"), c;
      return self.performance && self.performance.memory && (c = f("MB", "#f08", "#201")), e(0), { dom: r, addPanel: f, showPanel: e, nextPanel: v, resetPanel: h, display: d, get hidden() {
        return !o;
      }, begin: function() {
        m = p();
      }, end: function() {
        l++;
        let a = p();
        if (w.update(a - m, 200), a >= u + 1e3 && (y.update(l * 1e3 / (a - u), 100), u = a, l = 0, c)) {
          let t = performance.memory;
          c.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576);
        }
        return a;
      }, update: function() {
        m = this.end();
      } };
    }
    function S(s, n, o, b, r = {}) {
      let i = Math.round, p = 1 / 0, f = 0, e = i(window.devicePixelRatio || 1), v = r.width || 80, h = 48, d = 3 * e, m = 2 * e, u = 3 * e, l = 15 * e, y = (v - 6) * e, w = 30 * e, c = document.createElement("canvas");
      c.width = v * e, c.height = h * e, c.style.cssText = `width:${v}px;height:48px;`;
      let a = b.children.length;
      b.appendChild(c);
      let t = c.getContext("2d");
      t.font = `bold ${9 * e}px Helvetica,Arial,sans-serif`, t.textBaseline = "top";
      function x() {
        t.fillStyle = o, t.fillRect(0, 0, v * e, h * e), t.fillStyle = n, t.fillText(s, d, m), t.fillRect(u, l, y, w), t.fillStyle = o, t.globalAlpha = 0.9, t.fillRect(u, l, y, w);
      }
      return x(), { id: a, dom: c, reset: x, update: function(g, _) {
        p = Math.min(p, g), f = Math.max(f, g), t.fillStyle = o, t.globalAlpha = 1, t.fillRect(0, 0, v * e, l), t.fillStyle = n;
        let T = [i(g), s];
        r.labelBefore && T.reverse(), t.fillText(T.join(" ") + " (" + i(p) + "-" + i(f) + ")", d, m), t.drawImage(c, u + e, l, y - e, w, u, l, y - e, w), t.fillRect(u + y - e, l, e, w), t.fillStyle = o, t.globalAlpha = 0.9, t.fillRect(u + y - e, l, e, i((1 - g / _) * w));
      } };
    }
    var z = { hotkeyShow: "F1", hotkeyNext: "F2", css: {}, hidden: false, id: "", position: "right" };
    function E(s, n = {}) {
      let { hotkeyNext: o, hotkeyShow: b, id: r, position: i, css: p } = Object.assign({}, z, n), f = s.stat(0), e = new A({ position: i }), v = e.display, h = (d = true) => {
        n.hidden = !d, v(d), e.resetPanel();
      };
      r && (e.dom.id = r);
      for (let [d, m] of Object.entries(p || {})) e.dom.style[d] = m;
      return s.canvas().parentElement.appendChild(e.dom), h(!n.hidden), f.keyboardEvents && s.listen("update", () => {
        b && s.iskeypressed(b) && h(n.hidden), o && s.iskeypressed(o) && e.nextPanel();
      }), s.listen("before:update", (d, m = 1) => {
        n.hidden || m === 1 && e.begin();
      }), s.listen("after:draw", () => {
        n.hidden || e.end();
      }), s.listen("quit", () => {
        e.dom.remove();
      }), e.display = h, { FPS_METER: e };
    }
    window.pluginFrameRateMeter = E;
  })();
  (() => {
    var k = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [63, 102, 102, 62, 54, 102, 103], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]], w = { id: "basic", chars: k, first: 33, w: 8, h: 8 };
    var D = [[2, 2, 2, , 2], [5, 5], [5, 7, 5, 7, 5], [6, 3, 6, 7, 2], [5, 4, 2, 1, 5], [6, 3, 6, 5, 6], [2, 2, , , ,], [2, 1, 1, 1, 2], [2, 4, 4, 4, 2], [5, 2, 5], [, 2, 7, 2], [, , , , 2, 1], [, , 7], [, , , , 1], [4, 4, 2, 1, 1], [7, 5, 5, 5, 7], [3, 2, 2, 2, 7], [7, 4, 7, 1, 7], [7, 4, 7, 4, 7], [5, 5, 7, 4, 4], [7, 1, 7, 4, 7], [7, 1, 7, 5, 7], [7, 4, 4, 4, 4], [7, 5, 7, 5, 7], [7, 5, 7, 4, 7], [, , 2, , 2], [, , 2, , 2, 1], [4, 2, 1, 2, 4], [, 7, , 7], [1, 2, 4, 2, 1], [7, 4, 6, , 2], [2, 5, 5, 1, 6], [2, 5, 7, 5, 5], [3, 5, 3, 5, 3], [6, 1, 1, 1, 6], [3, 5, 5, 5, 3], [7, 1, 3, 1, 7], [7, 1, 3, 1, 1], [6, 1, 5, 5, 6], [5, 5, 7, 5, 5], [7, 2, 2, 2, 7], [4, 4, 4, 5, 2], [5, 5, 3, 5, 5], [1, 1, 1, 1, 7], [5, 7, 7, 5, 5], [7, 5, 5, 5, 5], [2, 5, 5, 5, 2], [7, 5, 7, 1, 1], [6, 5, 5, 3, 6], [3, 5, 3, 5, 5], [6, 1, 7, 4, 3], [7, 2, 2, 2, 2], [5, 5, 5, 5, 7], [5, 5, 5, 2, 2], [5, 5, 7, 7, 5], [5, 5, 2, 5, 5], [5, 5, 2, 2, 2], [7, 4, 2, 1, 7], [6, 2, 2, 2, 6], [1, 1, 2, 4, 4], [3, 2, 2, 2, 3], [2, 5], [, , , , 7], [1, 2], [, 6, 5, 5, 6], [1, 3, 5, 5, 3], [, 6, 1, 1, 6], [4, 6, 5, 5, 6], [, 2, 5, 3, 6], [4, 2, 7, 2, 2], [, 2, 5, 6, 4, 2], [1, 1, 3, 5, 5], [, 2, , 2, 2], [, 2, , 2, 2, 1], [1, 5, 3, 5, 5], [2, 2, 2, 2, 4], [, 5, 7, 5, 5], [, 3, 5, 5, 5], [, 2, 5, 5, 2], [, 3, 5, 5, 3, 1], [, 6, 5, 5, 6, 4], [, 2, 5, 1, 1], [, 6, 1, 4, 3], [2, 7, 2, 2, 4], [, 5, 5, 5, 6], [, 5, 5, 2, 2], [, 5, 5, 7, 5], [, 5, 2, 2, 5], [, 5, 5, 6, 4, 2], [, 7, 4, 1, 7], [6, 2, 1, 2, 6], [2, 2, 2, 2, 2], [3, 2, 4, 2, 3], [, 3, 6]], g = { id: "mini", chars: D, first: 33, w: 4, h: 6 };
    var y = plugin = (e, { cache: m = true } = {}) => {
      let _ = e.text, A = e.textsize, E = e.textalign, z = e.textfont, C = w, T = g, c = m ? /* @__PURE__ */ new Map() : null, b = 300, a = 1, t = null, d = (x) => {
        a = ~~Math.round(x);
      }, F = () => console.warn("[litecanvas/plugin-pixel-font] textalign() has not yet been implemented for pixel fonts"), v = (x, o, r, s = 3) => {
        let l = t.h || t.w;
        for (let i = 0; i < l; i++) for (let n = 0; n < t.w; n++) (r[i] | 0) & 1 << n && e.rectfill(x + n * a, o + i * a, a, a, s);
      }, I = (x, o, r, s = 3) => {
        if (r += "", !a || !r.length) return;
        let l = a * t.w, i = a * (t.h || t.w);
        for (let n = 0; n < r.length; n++) {
          let u = r[n], S = u.charCodeAt(), f = t.chars[S - t.first];
          if (f) if (m) {
            let p = `${t.id}:${u}:${~~s}:${l}`;
            c.has(p) || c.set(p, e.paint(l, i, () => {
              v(0, 0, f, ~~s);
            }));
            let h = c.get(p);
            h._ = e.T + b, e.image(x, o, h);
          } else v(x, o, f, s);
          x += l;
        }
      };
      if (m) {
        let x = setInterval(() => {
          let o = performance.now();
          for (let [r, s] of c) e.T > s._ && c.delete(r);
        }, 1e3 * (b / 5));
        e.listen("quit", () => {
          clearInterval(x), c.clear();
        });
      }
      return { PIXEL_FONT_BASIC: C, PIXEL_FONT_MINI: T, textfont: (x) => {
        typeof x == "object" ? (e.def("text", I), e.def("textsize", d), e.def("textalign", F), t = x, d(a || 1)) : (e.def("text", _), e.def("textsize", A), e.def("textalign", E), z(x));
      } };
    };
    window.pluginPixelFont = y;
  })();
})();
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! Migrate for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
