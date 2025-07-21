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
    var version = "0.94.0";
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
      let _initialized = false, _plugins = [], _canvas, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _deltaTime = 1 / 60, _accumulated, _rafid, _fontFamily = "sans-serif", _fontSize = 20, _rngSeed = Date.now(), _colors = defaultPalette, _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _coreEvents = "init,update,draw,tap,untap,tapping,tapped,resized", _mathFunctions = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp", _eventListeners = {};
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
            _accumulated = _deltaTime;
            _lastFrameTime = performance.now();
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
        setInterval(() => {
          if (_rafid) {
            instance.pause();
            instance.resume();
          }
        }, 5e3);
        _initialized = true;
        instance.emit("init", instance);
        instance.resume();
      }
      function drawFrame(now) {
        if (!settings.animate) {
          return instance.emit("draw", _ctx);
        } else if (_rafid) {
          _rafid = raf(drawFrame);
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
          instance.emit("draw", _ctx);
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
    var It = Object.defineProperty;
    var Mt = (e, t) => {
      for (var s in t) It(e, s, { get: t[s], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var Z = {};
    Mt(Z, { ANCHOR_BOT_LEFT: () => $t, ANCHOR_BOT_RIGHT: () => Gt, ANCHOR_CENTER: () => zt, ANCHOR_TOP_LEFT: () => J, ANCHOR_TOP_RIGHT: () => Kt, Actor: () => O, BACK_IN: () => ee, BACK_IN_OUT: () => re, BACK_OUT: () => se, BOUNCE_IN: () => at, BOUNCE_IN_OUT: () => ne, BOUNCE_OUT: () => B, Camera: () => y, DOWN: () => jt, EASE_IN: () => Qt, EASE_IN_OUT: () => te, EASE_OUT: () => vt, ELASTIC_IN: () => ie, ELASTIC_IN_OUT: () => he, ELASTIC_OUT: () => oe, Grid: () => b, LEFT: () => qt, LINEAR: () => nt, Noise: () => Y, ONE: () => Xt, RIGHT: () => Vt, TypedGrid: () => N, UP: () => Dt, Vector: () => I, ZERO: () => G, advance: () => tt, choose: () => dt, colcirc: () => X, colrect: () => W, diff: () => Q, dist: () => st, flipImage: () => lt, fract: () => v, head: () => mt, intersection: () => w, last: () => gt, lerpAngle: () => ht, mag: () => rt, makeCircle: () => pt, makeRectangle: () => ft, mean: () => it, median: () => ot, mod: () => et, range: () => _t, resolverect: () => H, scaleImage: () => ct, shuffle: () => xt, sum: () => R, tail: () => yt, tintImage: () => ut, tween: () => Jt, vec: () => h, vecAbs: () => Bt, vecAdd: () => L, vecAngle: () => Lt, vecAngleBetween: () => kt, vecCeil: () => Ft, vecClamp: () => Ut, vecCross: () => St, vecDist: () => Nt, vecDist2: () => At, vecDiv: () => P, vecDot: () => $, vecEq: () => A, vecFloor: () => Yt, vecIsZero: () => Wt, vecLerp: () => Ot, vecLimit: () => Tt, vecMag: () => z, vecMag2: () => K, vecMove: () => Ht, vecMult: () => M, vecNorm: () => S, vecRand: () => Ct, vecReflect: () => Pt, vecRotate: () => bt, vecRound: () => Zt, vecSet: () => q, vecSetMag: () => Rt, vecSub: () => k });
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
      let l = Math.max(e, i), x = Math.min(e + s, i + n) - l, u = Math.max(t, o), d = Math.min(t + r, o + a) - u;
      return [l, u, x, d];
    };
    var H = (e, t, s, r, i, o, n, a) => {
      let [l, x, u, d] = w(e, t, s, r, i, o, n, a), _ = "", g = e, c = t;
      return u < d ? e < i ? (_ = "right", g = i - s) : (_ = "left", g = i + n) : t < o ? (_ = "bottom", c = o - r) : (_ = "top", c = o + a), { direction: _, x: g, y: c };
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
    var Et = Math.sqrt, V = Math.cos, j = Math.sin, wt = 2 * Math.PI, I = class {
      x;
      y;
      constructor(t = 0, s = t) {
        this.x = t, this.y = s;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, m = (e) => e instanceof I, h = (e = 0, t = e) => (m(e) && (t = e.y, e = e.x), new I(e, t)), A = (e, t, s = t) => m(t) ? A(e, t.x, t.y) : e.x === t && e.y === s, q = (e, t, s = t) => (m(t) ? q(e, t.x, t.y) : (e.x = t, e.y = s), e), L = (e, t, s = t) => m(t) ? L(e, t.x, t.y) : (e.x += t, e.y += s, e), k = (e, t, s = t) => m(t) ? k(e, t.x, t.y) : (e.x -= t, e.y -= s, e), M = (e, t, s = t) => m(t) ? M(e, t.x, t.y) : (e.x *= t, e.y *= s, e), P = (e, t, s = t) => m(t) ? P(e, t.x, t.y) : (e.x /= t || 1, e.y /= s || 1, e), bt = (e, t) => {
      let s = V(t), r = j(t);
      return e.x = s * e.x - r * e.y, e.y = r * e.x + s * e.y, e;
    }, Pt = (e, t) => {
      let s = S(h(t));
      return k(e, M(s, 2 * $(e, s)));
    }, Rt = (e, t) => (S(e), M(e, t), e), z = (e) => Math.hypot(e.x, e.y), K = (e) => e.x * e.x + e.y * e.y, S = (e) => {
      let t = z(e);
      return t > 0 && P(e, t), e;
    }, Tt = (e, t = 1) => {
      let s = K(e);
      return s > t * t && (P(e, Et(s)), M(e, t)), e;
    }, Nt = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), At = (e, t) => {
      let s = e.x - t.x, r = e.y - t.y;
      return s * s + r * r;
    }, Lt = (e) => Math.atan2(e.y, e.x), kt = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), $ = (e, t) => e.x * t.x + e.y * t.y, St = (e, t) => e.x * t.y - e.y * t.x, Ot = (e, t, s) => (e.x += (t.x - e.x) * s || 0, e.y += (t.y - e.y) * s || 0, e), Ct = (e = 1, t = e, s = globalThis.rand || Math.random) => {
      let r = s() * wt, i = s() * (t - e) + e;
      return h(V(r) * i, j(r) * i);
    }, Bt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Ft = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Yt = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Zt = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Ut = (e, t, s) => (e.x < t.x && (e.x = t.x), e.x > s.x && (e.x = s.x), e.y < t.y && (e.y = t.y), e.y > s.y && (e.y = s.y), e), Ht = (e, t, s = 1) => L(e, t.x * s, t.y * s), Wt = (e) => A(e, G), G = h(0, 0), Xt = h(1, 1), Dt = h(0, -1), Vt = h(1, 0), jt = h(0, 1), qt = h(-1, 0);
    var zt = h(0.5, 0.5), J = h(0, 0), Kt = h(1, 0), $t = h(0, 1), Gt = h(1, 1), O = class {
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
    var T = Math.PI / 2, Jt = (e, t, s, r = 1, i = nt) => new C(e, t, s, r, i), nt = (e) => e, Qt = (e) => e * e, vt = (e) => -e * (e - 2), te = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, ee = (e) => e * e * e - e * Math.sin(e * Math.PI), se = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, re = (e) => {
      if (e < 0.5) {
        let s = 2 * e;
        return 0.5 * (s * s * s - s * Math.sin(s * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, ie = (e) => Math.sin(13 * T * e) * Math.pow(2, 10 * (e - 1)), oe = (e) => Math.sin(-13 * T * (e + 1)) * Math.pow(2, -10 * e) + 1, he = (e) => {
      if (e < 0.5) {
        let r = Math.sin(13 * T * (2 * e)), i = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * r * i;
      }
      let t = Math.sin(-13 * T * (2 * e - 1 + 1)), s = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * s + 2);
    }, at = (e) => 1 - B(1 - e), B = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, ne = (e) => e < 0.5 ? 0.5 * at(e * 2) : 0.5 * B(e * 2 - 1) + 0.5, C = class {
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
        let i = Math.floor(t), o = Math.floor(s), n = Math.floor(r), a = t - i, l = s - o, x = r - n, u, d, _ = 0, g = 0.5, c, p, E;
        for (let U = 0; U < this._po; U++) {
          let f = i + (o << 4) + (n << 8);
          u = F(a), d = F(l), c = this._p[f & 4095], c += u * (this._p[f + 1 & 4095] - c), p = this._p[f + 16 & 4095], p += u * (this._p[f + 16 + 1 & 4095] - p), c += d * (p - c), f += 256, p = this._p[f & 4095], p += u * (this._p[f + 1 & 4095] - p), E = this._p[f + 16 & 4095], E += u * (this._p[f + 16 + 1 & 4095] - E), p += d * (E - p), c += F(x) * (p - c), _ += c * g, g *= this._pf, i <<= 1, a *= 2, o <<= 1, l *= 2, n <<= 1, x *= 2, a >= 1 && (i++, a--), l >= 1 && (o++, l--), x >= 1 && (n++, x--);
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
    var lt = (e, t = true, s = false, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.scale(t ? -1 : 1, s ? -1 : 1), r.image(t ? -e.width : 0, s ? -e.height : 0, e), r.pop();
    });
    var ct = (e, t, s = true, r = globalThis) => r.paint(e.width * t, e.height * t, (i) => {
      r.push(), i.imageSmoothingEnabled = !s, r.scale(t), r.image(0, 0, e), r.pop();
    });
    var ut = (e, t, s = 1, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.alpha(s), r.rectfill(0, 0, e.width, e.height, t), i.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, e), r.pop();
    });
    var pt = (e, t, { borderWidth: s = 0, borderColor: r = 0, engine: i = globalThis } = {}) => {
      let o = e * 2 + s;
      return i.paint(o, o, () => {
        i.circfill(o / 2, o / 2, e, t), s > 0 && (i.linewidth(s), i.stroke(r));
      });
    };
    var ft = (e, t, s, { borderWidth: r = 0, borderColor: i = 0, engine: o = globalThis } = {}) => {
      let n = e + r * 2, a = t + r * 2;
      return o.paint(n, a, () => {
        let l = r > 0;
        l && o.cls(i), o.rectfill(l ? r : 0, l ? r : 0, e, t, s);
      });
    };
    var _t = (e, t = 0, s = 1) => [...new Array(e).keys()].map((r) => t + s * r);
    var xt = (e, t = globalThis.rand || Math.random) => {
      e = [...e];
      for (let s = e.length - 1; s > 0; s--) {
        let r = Math.floor(t() * (s + 1)), i = e[s];
        e[s] = e[r], e[r] = i;
      }
      return e;
    };
    var dt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var mt = (e) => e[0];
    var gt = (e) => e[e.length - 1];
    var yt = (e) => e.slice(1);
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
    function g(a, c = {}) {
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
      function v(t, e, r, i = 3, p = f) {
        w(t, e, r, i, p);
      }
      function E(t, e, r, i) {
        s("print()", "text()"), v(t, e, r, i);
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
      if (s("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), n("FPS", ""), l.fps && a.framerate(l.fps), l.background >= 0) {
        let t = stat(5);
        a.CANVAS.style.backgroundColor = t[~~l.background % t.length];
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
      return l.antialias && s('"antialias" option', '"pixelart" option'), { def: u, seed: h, print: E, clear: R, setfps: k, setvar: L, textstyle: b, textmetrics: M, text: v, cliprect: I, clipcirc: A, blendmode: P, transform: C, getcolor: T, mousepos: S, resize: N, path: O, fill: F, stroke: H, clip: B, colrect: _, colcirc: x };
    }
    window.pluginMigrate = g;
  })();
  (() => {
    function _() {
      let i = 0, a = true, l = document.createElement("div"), s = [], c = () => (performance || Date).now();
      l.style.cssText = "position:absolute;top:0;right:0;cursor:pointer;opacity:0.8;z-index:10000", l.addEventListener("click", function(e) {
        e.preventDefault(), m(++i % l.children.length);
      }, false);
      function o(e, r, x, t) {
        let w = new T(e, r, x, l, t);
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
        h = c(), y = 0;
      }
      function b(e = true) {
        a = !!e, l.style.display = a ? "" : "none";
      }
      let v = c(), h = v, y = 0, d = o("FPS", "#0ff", "#002"), f = o("MS", "#0f0", "#020"), u;
      return self.performance && self.performance.memory && (u = o("MB", "#f08", "#201")), m(0), { dom: l, addPanel: o, showPanel: m, nextPanel: p, resetPanel: n, display: b, get hidden() {
        return !a;
      }, begin: function() {
        v = c();
      }, end: function() {
        y++;
        let e = c();
        if (f.update(e - v, 200), e >= h + 1e3 && (d.update(y * 1e3 / (e - h), 100), h = e, y = 0, u)) {
          let r = performance.memory;
          u.update(r.usedJSHeapSize / 1048576, r.jsHeapSizeLimit / 1048576);
        }
        return e;
      }, update: function() {
        v = this.end();
      } };
    }
    function T(i, a, l, s, c = {}) {
      let o = Math.round, m = 1 / 0, p = 0, n = o(window.devicePixelRatio || 1), b = c.width || 80, v = 48, h = 3 * n, y = 2 * n, d = 3 * n, f = 15 * n, u = (b - 6) * n, e = 30 * n, r = document.createElement("canvas");
      r.width = b * n, r.height = v * n, r.style.cssText = `width:${b}px;height:48px;`;
      let x = s.children.length;
      s.appendChild(r);
      let t = r.getContext("2d");
      t.font = `bold ${9 * n}px Helvetica,Arial,sans-serif`, t.textBaseline = "top";
      function w() {
        t.fillStyle = l, t.fillRect(0, 0, b * n, v * n), t.fillStyle = a, t.fillText(i, h, y), t.fillRect(d, f, u, e), t.fillStyle = l, t.globalAlpha = 0.9, t.fillRect(d, f, u, e);
      }
      return w(), { id: x, dom: r, reset: w, update: function(g, S) {
        m = Math.min(m, g), p = Math.max(p, g), t.fillStyle = l, t.globalAlpha = 1, t.fillRect(0, 0, b * n, f), t.fillStyle = a;
        let E = [o(g), i];
        c.labelBefore && E.reverse(), t.fillText(E.join(" ") + " (" + o(m) + "-" + o(p) + ")", h, y), t.drawImage(r, d + n, f, u - n, e, d, f, u - n, e), t.fillRect(d + u - n, f, n, e), t.fillStyle = l, t.globalAlpha = 0.9, t.fillRect(d + u - n, f, n, o((1 - g / S) * e));
      } };
    }
    var k = { hotkeyShow: "F1", hotkeyNext: "F2", css: {}, hidden: false, id: "" };
    function A(i, a = {}) {
      a = Object.assign({}, k, a);
      let l = i.stat(0), s = new _(), c = s.display, o = (m = true) => {
        a.hidden = !m, c(m), s.resetPanel();
      };
      a.id && (s.dom.id = a.id);
      for (let [m, p] of Object.entries(a.css || {})) s.dom.style[m] = p;
      return i.canvas().parentElement.appendChild(s.dom), o(!a.hidden), l.keyboardEvents && i.listen("update", () => {
        a.hotkeyShow && i.iskeypressed(a.hotkeyShow) && o(a.hidden), a.hotkeyNext && i.iskeypressed(a.hotkeyNext) && s.nextPanel();
      }), i.listen("before:update", (m, p = 1) => {
        a.hidden || p === 1 && s.begin();
      }), i.listen("after:draw", () => {
        a.hidden || s.end();
      }), i.listen("quit", () => {
        s.dom.remove();
      }), s.display = o, { FPS_METER: s };
    }
    window.pluginFrameRateMeter = A;
  })();
  (() => {
    var S = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [63, 102, 102, 62, 54, 102, 103], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]], w = { id: "basic", chars: S, first: 33, w: 8 };
    var g = plugin = (e, { cache: o = true } = {}) => {
      let y = e.text, _ = e.textsize, A = e.textalign, E = e.textfont, z = w, c = o ? /* @__PURE__ */ new Map() : null, p = 5 * 60, s = 1, n = null, b = (t) => {
        s = Math.round(t / n.w);
      }, C = () => console.warn("[litecanvas/plugin-pixel-font] textalign() has not yet been implemented for pixel fonts"), d = (t, l, x, i = 3) => {
        for (let a = 0; a < n.w; a++) for (let r = 0; r < n.w; r++) (x[a] | 0) & 1 << r && e.rectfill(t + r * s, l + a * s, s, s, i);
      }, T = (t, l, x, i = 3) => {
        if (x += "", !s || !x.length) return;
        let a = s * n.w;
        for (let r = 0; r < x.length; r++) {
          let m = x[r], v = m.charCodeAt(), u = n.chars[v - n.first];
          if (u) if (o) {
            let f = `${n.id}:${m}:${~~i}:${a}`;
            c.has(f) || c.set(f, e.paint(a, a, () => {
              d(0, 0, u, ~~i);
            }));
            let h = c.get(f);
            h._ = e.T + p, e.image(t, l, h);
          } else d(t, l, u, i);
          t += a;
        }
      };
      if (o) {
        let t = setInterval(() => {
          let l = performance.now();
          for (let [x, i] of c) e.T > i._ && c.delete(x);
        }, 1e3 * (p / 5));
        e.listen("quit", () => {
          clearInterval(t), c.clear();
        });
      }
      return { PIXEL_FONT_BASIC: z, textfont: (t) => {
        typeof t == "object" ? (e.def("text", T), e.def("textsize", b), e.def("textalign", C), n = t, b(n.w)) : (e.def("text", y), e.def("textsize", _), e.def("textalign", A), E(t));
      } };
    };
    window.pluginPixelFont = g;
  })();
})();
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! Migrate for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
