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
    var version = "0.90.0";
    function litecanvas(settings = {}) {
      const root = window, math = Math, TWO_PI = math.PI * 2, raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(() => elem.removeEventListener(evt, callback, false));
      }, beginPath = (c) => c.beginPath(), isNumber = Number.isFinite, zzfx = setupZzFX(root), defaults = {
        width: null,
        height: null,
        autoscale: true,
        pixelart: false,
        antialias: false,
        canvas: null,
        global: true,
        loop: null,
        tapEvents: true,
        keyboardEvents: true,
        animate: true
      };
      settings = Object.assign(defaults, settings);
      let _initialized = false, _plugins = [], _canvas, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _deltaTime = 1 / 60, _accumulated = 0, _rafid, _fontFamily = "sans-serif", _fontSize = 20, _rngSeed = Date.now(), _colors = defaultPalette, _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _coreEvents = "init,update,draw,tap,untap,tapping,tapped,resized", _mathFunctions = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp", _eventListeners = {};
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
         * @param {OffscreenCanvas|HTMLImageElement|HTMLCanvasElement} source
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
          if (
            // @ts-ignore
            root.zzfxV <= 0 || navigator.userActivation && !navigator.userActivation.hasBeenActive
          ) {
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
          DEV: assert(isNumber(value), "[litecanvas] volume() 1st param must be a number");
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
            console.warn(`def: key "${key}" was defined as ${value} but now is null`);
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
          _deltaTime = 1 / ~~value;
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
            _deltaTime,
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
            // @ts-ignore
            root.zzfxV || 1,
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
          if (!_rafid && _initialized) {
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
             * @param {number} pageX
             * @param {number} pageY
             */
            (pageX, pageY) => [
              (pageX - _canvas.offsetLeft) / _scale,
              (pageY - _canvas.offsetTop) / _scale
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
                t: performance.now()
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
            (tap) => tap && performance.now() - tap.t <= 300
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
                const [x, y] = _getXY(ev.pageX, ev.pageY);
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
                const [x, y] = _getXY(ev.pageX, ev.pageY);
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
            _canvas,
            "mousemove",
            /**
             * @param {MouseEvent} ev
             */
            (ev) => {
              preventDefault(ev);
              const [x, y] = _getXY(ev.pageX, ev.pageY);
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
                const [x, y] = _getXY(touch.pageX, touch.pageY);
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
                const [x, y] = _getXY(touch.pageX, touch.pageY);
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
        _lastFrameTime = performance.now();
        instance.resume();
      }
      function drawFrame(now) {
        if (!settings.animate) {
          return instance.emit("draw");
        }
        let updated = 0;
        let frameTime = (now - _lastFrameTime) / 1e3;
        _lastFrameTime = now;
        if (frameTime < 0.1) {
          _accumulated += frameTime;
          while (_accumulated >= _deltaTime) {
            updated++;
            instance.emit("update", _deltaTime * _timeScale, updated);
            instance.def("T", instance.T + _deltaTime * _timeScale);
            _accumulated -= _deltaTime;
          }
        }
        if (updated) {
          instance.emit("draw");
        }
        if (_rafid) {
          _rafid = raf(drawFrame);
        }
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
        on(_canvas, "click", () => root.focus());
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
        const width = settings.width || root.innerWidth, height = settings.height || settings.width || root.innerHeight;
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
          _scale = math.min(root.innerWidth / width, root.innerHeight / height);
          _scale = maxScale > 1 && _scale > maxScale ? maxScale : _scale;
          _scale = (settings.pixelart ? ~~_scale : _scale) || 1;
          _canvas.style.width = width * _scale + "px";
          _canvas.style.height = height * _scale + "px";
        }
        if (!settings.antialias || settings.pixelart) {
          _ctx.imageSmoothingEnabled = false;
          _canvas.style.imageRendering = "pixelated";
        }
        instance.textalign("start", "top");
        instance.emit("resized", _scale);
        instance.cls(0);
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
    var Tt = Object.defineProperty;
    var kt = (e, t) => {
      for (var s in t) Tt(e, s, { get: t[s], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var X = {};
    kt(X, { ANCHOR_BOT_LEFT: () => Jt, ANCHOR_BOT_RIGHT: () => te, ANCHOR_CENTER: () => Kt, ANCHOR_TOP_LEFT: () => J, ANCHOR_TOP_RIGHT: () => Qt, Actor: () => S, BACK_IN: () => ie, BACK_IN_OUT: () => ne, BACK_OUT: () => oe, BOUNCE_IN: () => ht, BOUNCE_IN_OUT: () => me, BOUNCE_OUT: () => z, Camera: () => y, DOWN: () => $t, EASE_IN: () => se, EASE_IN_OUT: () => ae, EASE_OUT: () => re, ELASTIC_IN: () => ue, ELASTIC_IN_OUT: () => he, ELASTIC_OUT: () => le, Grid: () => k, LEFT: () => Gt, LINEAR: () => lt, Noise: () => Y, ONE: () => Vt, RIGHT: () => Zt, TypedGrid: () => C, UP: () => Wt, Vector: () => w, ZERO: () => Q, advance: () => st, choose: () => yt, colcirc: () => j, colrect: () => U, diff: () => tt, dist: () => at, flipImage: () => pt, fract: () => et, head: () => wt, intersection: () => T, last: () => Nt, lerpAngle: () => ut, mag: () => it, makeCircle: () => dt, makeRectangle: () => xt, mean: () => ot, median: () => nt, mod: () => rt, range: () => gt, resolverect: () => B, scaleImage: () => ft, shuffle: () => _t, sum: () => A, tail: () => Mt, tintImage: () => bt, tween: () => ee, vec: () => o, vecAbs: () => Yt, vecAdd: () => O, vecAngle: () => vt, vecAngleBetween: () => St, vecCeil: () => Xt, vecClamp: () => Ut, vecCross: () => Rt, vecDist: () => Ot, vecDist2: () => Ft, vecDiv: () => E, vecDot: () => K, vecEq: () => L, vecFloor: () => Ht, vecIsZero: () => qt, vecLerp: () => zt, vecLimit: () => Lt, vecMag: () => $, vecMag2: () => G, vecMove: () => jt, vecMult: () => N, vecNorm: () => v, vecRand: () => Dt, vecReflect: () => Pt, vecRotate: () => It, vecRound: () => Bt, vecSet: () => Z, vecSetMag: () => Ct, vecSub: () => F });
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
        this._engine = t || globalThis, this.ox = s, this.oy = r, this.resize(a || this._engine.W - s, i || this._engine.H - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
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
    var T = (e, t, s, r, a, i, n, u) => {
      let h = Math.max(e, a), d = Math.min(e + s, a + n) - h, m = Math.max(t, i), x = Math.min(t + r, i + u) - m;
      return [h, m, d, x];
    };
    var B = (e, t, s, r, a, i, n, u) => {
      let [h, d, m, x] = T(e, t, s, r, a, i, n, u), b = "", _ = e, l = t;
      return m < x ? e < a ? (b = "right", _ = a - s) : (b = "left", _ = a + n) : t < i ? (b = "bottom", l = i - r) : (b = "top", l = i + u), { direction: b, x: _, y: l };
    };
    var U = (e, t, s, r, a, i, n, u) => e < a + n && e + s > a && t < i + u && t + r > i;
    var j = (e, t, s, r, a, i) => (r - e) * (r - e) + (a - t) * (a - t) <= (s + i) * (s + i);
    var k = class e {
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
    }, C = class e extends k {
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
    var Et = Math.sqrt, V = Math.cos, W = Math.sin, At = 2 * Math.PI, w = class {
      x;
      y;
      constructor(t = 0, s = t) {
        this.x = t, this.y = s;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, g = (e) => e instanceof w, o = (e = 0, t = e) => (g(e) && (t = e.y, e = e.x), new w(e, t)), L = (e, t, s = t) => g(t) ? L(e, t.x, t.y) : e.x === t && e.y === s, Z = (e, t, s = t) => (g(t) ? Z(e, t.x, t.y) : (e.x = t, e.y = s), e), O = (e, t, s = t) => g(t) ? O(e, t.x, t.y) : (e.x += t, e.y += s, e), F = (e, t, s = t) => g(t) ? F(e, t.x, t.y) : (e.x -= t, e.y -= s, e), N = (e, t, s = t) => g(t) ? N(e, t.x, t.y) : (e.x *= t, e.y *= s, e), E = (e, t, s = t) => g(t) ? E(e, t.x, t.y) : (e.x /= t || 1, e.y /= s || 1, e), It = (e, t) => {
      let s = V(t), r = W(t);
      return e.x = s * e.x - r * e.y, e.y = r * e.x + s * e.y, e;
    }, Pt = (e, t) => {
      let s = v(o(t));
      return F(e, N(s, 2 * K(e, s)));
    }, Ct = (e, t) => (v(e), N(e, t), e), $ = (e) => Math.hypot(e.x, e.y), G = (e) => e.x * e.x + e.y * e.y, v = (e) => {
      let t = $(e);
      return t > 0 && E(e, t), e;
    }, Lt = (e, t = 1) => {
      let s = G(e);
      return s > t * t && (E(e, Et(s)), N(e, t)), e;
    }, Ot = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), Ft = (e, t) => {
      let s = e.x - t.x, r = e.y - t.y;
      return s * s + r * r;
    }, vt = (e) => Math.atan2(e.y, e.x), St = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), K = (e, t) => e.x * t.x + e.y * t.y, Rt = (e, t) => e.x * t.y - e.y * t.x, zt = (e, t, s) => (e.x += (t.x - e.x) * s || 0, e.y += (t.y - e.y) * s || 0, e), Dt = (e = 1, t = e, s = globalThis.rand || Math.random) => {
      let r = s() * At, a = s() * (t - e) + e;
      return o(V(r) * a, W(r) * a);
    }, Yt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Xt = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Ht = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Bt = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Ut = (e, t, s) => (e.x < t.x && (e.x = t.x), e.x > s.x && (e.x = s.x), e.y < t.y && (e.y = t.y), e.y > s.y && (e.y = s.y), e), jt = (e, t, s = 1) => O(e, t.x * s, t.y * s), qt = (e) => L(e, Q), Q = o(0, 0), Vt = o(1, 1), Wt = o(0, -1), Zt = o(1, 0), $t = o(0, 1), Gt = o(-1, 0);
    var Kt = o(0.5, 0.5), J = o(0, 0), Qt = o(1, 0), Jt = o(0, 1), te = o(1, 1), S = class {
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
    var et = (e) => e % 1 || 0;
    var st = advance = (e, t, s, r = 1) => {
      s && (t.x += s.x * r, t.y += s.y * r), e.x += t.x * r, e.y += t.y * r;
    };
    var rt = (e, t) => (t + e % t) % t;
    var at = (e, t, s, r) => Math.hypot(s - e, r - t);
    var it = (e, t) => Math.hypot(e, t);
    var A = (e) => {
      let t = 0;
      for (let s = 0; s < e.length; s++) t += e[s];
      return t;
    };
    var ot = (e) => A(e) / e.length;
    var nt = (...e) => {
      let t = e.sort((r, a) => r - a), s = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[s - 1] + t[s]) / 2 : t[s];
    };
    var ut = (e, t, s) => {
      let r = (t - e) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), e + r * s;
    };
    var I = Math.PI / 2, ee = (e, t, s, r = 1, a = lt) => new R(e, t, s, r, a), lt = (e) => e, se = (e) => e * e, re = (e) => -e * (e - 2), ae = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, ie = (e) => e * e * e - e * Math.sin(e * Math.PI), oe = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, ne = (e) => {
      if (e < 0.5) {
        let s = 2 * e;
        return 0.5 * (s * s * s - s * Math.sin(s * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, ue = (e) => Math.sin(13 * I * e) * Math.pow(2, 10 * (e - 1)), le = (e) => Math.sin(-13 * I * (e + 1)) * Math.pow(2, -10 * e) + 1, he = (e) => {
      if (e < 0.5) {
        let r = Math.sin(13 * I * (2 * e)), a = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * r * a;
      }
      let t = Math.sin(-13 * I * (2 * e - 1 + 1)), s = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * s + 2);
    }, ht = (e) => 1 - z(1 - e), z = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, me = (e) => e < 0.5 ? 0.5 * ht(e * 2) : 0.5 * z(e * 2 - 1) + 0.5, R = class {
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
    var mt = 4, P = 1 << mt, ct = 8, ce = 1 << ct, f = 4095, D = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), Y = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, s = 0, r = 0) {
        t < 0 && (t = -t), s < 0 && (s = -s), r < 0 && (r = -r);
        let a = Math.floor(t), i = Math.floor(s), n = Math.floor(r), u = t - a, h = s - i, d = r - n, m, x, b = 0, _ = 0.5, l, c, M;
        for (let H = 0; H < this._po; H++) {
          let p = a + (i << mt) + (n << ct);
          m = D(u), x = D(h), l = this._p[p & f], l += m * (this._p[p + 1 & f] - l), c = this._p[p + P & f], c += m * (this._p[p + P + 1 & f] - c), l += x * (c - l), p += ce, c = this._p[p & f], c += m * (this._p[p + 1 & f] - c), M = this._p[p + P & f], M += m * (this._p[p + P + 1 & f] - M), c += x * (M - c), l += D(d) * (c - l), b += l * _, _ *= this._pf, a <<= 1, u *= 2, i <<= 1, h *= 2, n <<= 1, d *= 2, u >= 1 && (a++, u--), h >= 1 && (i++, h--), d >= 1 && (n++, d--);
        }
        return b;
      }
      noiseDetail(t, s) {
        t > 0 && (this._po = t), s > 0 && (this._pf = s);
      }
      noiseSeed(t = null) {
        t != null && this._e.rseed(t);
        let s = this._e.rand || Math.random;
        for (let r = 0; r < f + 1; r++) this._p[r] = s();
      }
    };
    var pt = (e, t = true, s = false, r = globalThis) => r.paint(e.width, e.height, (a) => {
      r.push(), r.scale(t ? -1 : 1, s ? -1 : 1), r.image(t ? -e.width : 0, s ? -e.height : 0, e), r.pop();
    });
    var ft = (e, t, s = true, r = globalThis) => r.paint(e.width * t, e.height * t, (a) => {
      r.push(), a.imageSmoothingEnabled = !s, r.scale(t), r.image(0, 0, e), r.pop();
    });
    var bt = (e, t, s = 1, r = globalThis) => r.paint(e.width, e.height, (a) => {
      r.push(), r.alpha(s), r.rectfill(0, 0, e.width, e.height, t), a.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, e), r.pop();
    });
    var dt = (e, t, { borderWidth: s = 0, borderColor: r = 0, engine: a = globalThis } = {}) => {
      let i = e * 2 + s;
      return a.paint(i, i, () => {
        a.circfill(i / 2, i / 2, e, t), s > 0 && (a.linewidth(s), a.stroke(r));
      });
    };
    var xt = (e, t, s, { borderWidth: r = 0, borderColor: a = 0, engine: i = globalThis } = {}) => {
      let n = e + r * 2, u = t + r * 2;
      return i.paint(n, u, () => {
        i.rectfill(r > 0 ? r : 0, r > 0 ? r : 0, e, t, s), r > 0 && (i.linewidth(r), i.stroke(a));
      });
    };
    var gt = (e, t = 0, s = 1) => [...new Array(e).keys()].map((r) => t + s * r);
    var _t = (e, t = globalThis.rand || Math.random) => {
      e = [...e];
      for (let s = e.length - 1; s > 0; s--) {
        let r = Math.floor(t() * (s + 1)), a = e[s];
        e[s] = e[r], e[r] = a;
      }
      return e;
    };
    var yt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var wt = (e) => e[0];
    var Nt = (e) => e[e.length - 1];
    var Mt = (e) => e.slice(1);
    globalThis.utils = Object.assign(globalThis.utils || {}, X);
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
    var Et = 2 * Math.PI;
    var he = Math.PI / 2;
    var $ = 4, fe = 1 << $, V = 8, de = 1 << V;
    var j = { warnings: true };
    function g(a, c = {}) {
      if (c = Object.assign({}, j, c), a.stat(1)) throw 'Plugin Migrate should be loaded before the "init" event';
      let l = a.stat(0);
      function s(t, e, r = "") {
        c.warnings && console.warn(`[migrate] ${t} is removed. ` + (e ? `Use ${e} instead. ` : "") + r);
      }
      function h(t) {
        return s("seed()", "rseed()"), t && a.rseed(t), a.stat(9);
      }
      let f = "";
      function b(t) {
        s("textstyle()", "the 5th param of text()"), f = t;
      }
      let w = a.text;
      function y(t, e, r, i = 3, p = f) {
        w(t, e, r, i, p);
      }
      function M(t, e, r, i) {
        s("print()", "text()"), y(t, e, r, i);
      }
      function E(t, e) {
        s("textmetrics()", "ctx().measureText()");
        let r = a.ctx(), i = a.stat(10), p = a.stat(11);
        r.font = `${f || ""} ${~~(e || i)}px ${p}`;
        let d = r.measureText(t);
        return d.height = d.actualBoundingBoxAscent + d.actualBoundingBoxDescent, d;
      }
      function T(t, e, r, i) {
        s("cliprect()", "clip()");
        let p = a.ctx();
        p.beginPath(), p.rect(t, e, r, i), p.clip();
      }
      function A(t, e, r) {
        s("clipcirc()", "clip()");
        let i = a.ctx();
        i.beginPath(), i.arc(t, e, r, 0, a.TWO_PI), i.clip();
      }
      function C(t) {
        s("getcolor()", "stat(5)");
        let e = stat(5);
        return e[~~t % e.length];
      }
      function k(t) {
        s("blendmode()", "ctx().globalCompositeOperation");
        let e = a.ctx();
        e.globalCompositeOperation = t;
      }
      function I(t) {
        s("clear()", "cls()"), a.cls(t);
      }
      function S(t, e, r, i, p, d, B = true) {
        return s("transform()", "ctx().setTransform() or ctx().transform()"), a.ctx()[B ? "setTransform" : "transform"](t, e, r, i, p, d);
      }
      function P() {
        return s("mousepos()", "MX and MY"), [MX, MY];
      }
      function O(t) {
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
      a.listen("resized", v);
      function v() {
        u("CX", a.W / 2), u("CY", a.H / 2);
      }
      v(), u("CANVAS", a.canvas());
      function R(t, e) {
        if (l.autoscale) throw "resize() don't works with autoscale enabled";
        s("resize()", null, "Avoid changing the canvas dimensions at runtime."), a.CANVAS.width = t, u("W", t), u("CX", t / 2), a.CANVAS.height = e, u("H", e), u("CY", e / 2), a.emit("resized", 1);
      }
      for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) a[t] != null && u(t, a[t]);
      if (s("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), n("FPS", ""), l.fps && a.framerate(l.fps), l.background >= 0) {
        let t = stat(5);
        a.CANVAS.style.backgroundColor = t[~~l.background % t.length];
      }
      function F(t) {
        return s("path()", "`new Path2D`", "See https://developer.mozilla.org/en-US/docs/Web/API/Path2D"), new Path2D(t);
      }
      let z = a.fill;
      function N(t, e) {
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
      let X = a.clip;
      function D(t) {
        s("clip(path)", "clip(callback)", "E.g: `clip((ctx) => ctx.rect(0, 0, 200, 200))`"), t instanceof Path2D ? a.ctx().clip(t) : X(t);
      }
      return { def: u, seed: h, print: M, clear: I, setfps: O, setvar: L, textstyle: b, textmetrics: E, text: y, cliprect: T, clipcirc: A, blendmode: k, transform: S, getcolor: C, mousepos: P, resize: R, path: F, fill: N, stroke: H, clip: D, colrect: _, colcirc: x };
    }
    window.pluginMigrate = g;
  })();
  (() => {
    function _() {
      let i = 0, t = true, l = document.createElement("div"), s = [], u = () => (performance || Date).now();
      l.style.cssText = "position:absolute;top:0;right:0;cursor:pointer;opacity:0.8;z-index:10000", l.addEventListener("click", function(e) {
        e.preventDefault(), m(++i % l.children.length);
      }, false);
      function o(e, r, x, a) {
        let w = new T(e, r, x, l, a);
        return s.push(w), w;
      }
      function m(e) {
        for (let r = 0; r < l.children.length; r++) l.children[r].style.display = r === e ? "block" : "none";
        i = e;
      }
      function p() {
        i++, i >= l.children.length && (i = 0), m(i);
      }
      function n(e = "all") {
        if (e === "all") for (let r = 0; r < s.length; r++) s[r].reset();
        else s[e] && s[e].reset();
        v = u(), h = 0;
      }
      function y(e = true) {
        t = !!e, l.style.display = t ? "" : "none";
      }
      let b = u(), v = b, h = 0, d = o("FPS", "#0ff", "#002"), f = o("MS", "#0f0", "#020"), c;
      return self.performance && self.performance.memory && (c = o("MB", "#f08", "#201")), m(0), { dom: l, addPanel: o, showPanel: m, nextPanel: p, resetPanel: n, display: y, get hidden() {
        return !t;
      }, begin: function() {
        b = u();
      }, end: function() {
        h++;
        let e = u();
        if (f.update(e - b, 200), e >= v + 1e3 && (d.update(h * 1e3 / (e - v), 100), v = e, h = 0, c)) {
          let r = performance.memory;
          c.update(r.usedJSHeapSize / 1048576, r.jsHeapSizeLimit / 1048576);
        }
        return e;
      }, update: function() {
        b = this.end();
      } };
    }
    function T(i, t, l, s, u = {}) {
      let o = Math.round, m = 1 / 0, p = 0, n = o(window.devicePixelRatio || 1), y = u.width || 80, b = 48, v = 3 * n, h = 2 * n, d = 3 * n, f = 15 * n, c = (y - 6) * n, e = 30 * n, r = document.createElement("canvas");
      r.width = y * n, r.height = b * n, r.style.cssText = `width:${u.width};height:48px`;
      let x = s.children.length;
      s.appendChild(r);
      let a = r.getContext("2d");
      a.font = `bold ${9 * n}px Helvetica,Arial,sans-serif`, a.textBaseline = "top";
      function w() {
        a.fillStyle = l, a.fillRect(0, 0, y * n, b * n), a.fillStyle = t, a.fillText(i, v, h), a.fillRect(d, f, c, e), a.fillStyle = l, a.globalAlpha = 0.9, a.fillRect(d, f, c, e);
      }
      return w(), { id: x, dom: r, reset: w, update: function(g, S) {
        m = Math.min(m, g), p = Math.max(p, g), a.fillStyle = l, a.globalAlpha = 1, a.fillRect(0, 0, y * n, f), a.fillStyle = t;
        let E = [o(g), i];
        u.labelBefore && E.reverse(), a.fillText(E.join(" ") + " (" + o(m) + "-" + o(p) + ")", v, h), a.drawImage(r, d + n, f, c - n, e, d, f, c - n, e), a.fillRect(d + c - n, f, n, e), a.fillStyle = l, a.globalAlpha = 0.9, a.fillRect(d + c - n, f, n, o((1 - g / S) * e));
      } };
    }
    var k = { hotkeyShow: "F1", hotkeyNext: "F2", css: {}, hidden: false, id: "" };
    function A(i, t = {}) {
      t = Object.assign({}, k, t);
      let l = i.stat(0), s = new _(), u = s.display, o = (m = true) => {
        t.hidden = !m, u(m), s.resetPanel();
      };
      t.id && (s.dom.id = t.id);
      for (let [m, p] of Object.entries(t.css || {})) s.dom.style[m] = p;
      return i.canvas().parentElement.appendChild(s.dom), o(!t.hidden), l.keyboardEvents && i.listen("update", () => {
        t.hotkeyShow && i.iskeypressed(t.hotkeyShow) && o(t.hidden), t.hotkeyNext && i.iskeypressed(t.hotkeyNext) && s.nextPanel();
      }), i.listen("before:update", (m, p = 1) => {
        t.hidden || p === 1 && s.begin();
      }), i.listen("after:draw", () => {
        t.hidden || s.end();
      }), i.listen("quit", () => {
        s.dom.remove();
      }), s.display = o, { FPS_METER: s };
    }
    window.pluginFrameRateMeter = A;
  })();
  (() => {
    var u = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [63, 102, 102, 62, 54, 102, 103], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]];
    function o(e, y = {}) {
      let p = e.text, f = e.textsize, b = e.textalign, d = { chars: u, first: 33, size: 8 }, n = 1, t = null, v = (a) => {
        n = Math.round(a / t.size);
      }, h = () => console.warn("textalign() has not yet been implemented for pixel font"), g = (a, c, x, l = 3) => {
        let m = x.charCodeAt(0), r = t.chars[m - t.first];
        if (r) for (let s = 0; s < t.size; s++) for (let i = 0; i < t.size; i++) (r[s] | 0) & 1 << i && e.rectfill(a + i * n, c + s * n, n, n, l);
      }, w = (a, c, x, l = 3) => {
        x += "";
        let m = n * t.size;
        for (let r = 0; r < x.length; r++) g(a, c, x[r], l), a += m;
      };
      return { PIXEL_FONT_BASIC: d, textfont: (a) => {
        typeof a == "object" ? (e.def("text", w), e.def("textsize", v), e.def("textalign", h), t = a) : (e.def("text", p), e.def("textsize", f), e.def("textalign", b), t = null);
      } };
    }
    window.pluginPixelFont = o;
  })();
})();
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginMigrate for litecanvas v0.0.1 by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
