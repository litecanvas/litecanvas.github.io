(() => {
  // public/js/litecanvas.js
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
    var defaultPalette = ["#211e20", "#555568", "#a0a08b", "#e9efec"];
    var assert = (condition, message = "Assertion failed") => {
      if (!condition) throw new Error(message);
    };
    var version = "0.102.2";
    function litecanvas(settings = {}) {
      const root = window, math = Math, TWO_PI = math.PI * 2, raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(() => elem.removeEventListener(evt, callback, false));
      }, lowerCase = (str) => str.toLowerCase(), preventDefault = (ev) => ev.preventDefault(), beginPath = (c) => c.beginPath(), isNumber = Number.isFinite, zzfx = setupZzFX(root), defaults = {
        width: null,
        height: null,
        autoscale: true,
        canvas: null,
        global: true,
        loop: null,
        tapEvents: true,
        keyboardEvents: true
      };
      settings = Object.assign(defaults, settings);
      let _initialized = false, _paused = true, _canvas, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _fpsInterval = 1e3 / 60, _accumulated, _rafid, _defaultTextColor = 3, _fontFamily = "sans-serif", _fontSize = 20, _fontLineHeight = 1.2, _rngSeed = Date.now(), _colorPalette = defaultPalette, _colorPaletteState = [], _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _coreEvents = "init,update,draw,tap,untap,tapping,tapped,resized", _mathFunctions = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp", _eventListeners = {};
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
            isNumber(precision) && precision >= 0,
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
            isNumber(value) && value >= 0,
            "[litecanvas] rseed() 1st param must be a positive integer or zero"
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
         * Make a custom shape in the canvas context.
         * Then, just use `fill` or `stroke` to draw the shape.
         *
         * @param {number[]} points an array of Xs and Ys coordinates
         */
        shape(points) {
          DEV: assert(
            Array.isArray(points),
            "[litecanvas] shape() 1st param must be an array of numbers"
          );
          DEV: assert(
            points.length >= 6,
            "[litecanvas] shape() 1st param must be an array with at least 6 numbers (3 points)"
          );
          beginPath(_ctx);
          for (let i = 0; i < points.length; i += 2) {
            if (0 === i) {
              _ctx.moveTo(~~points[i], ~~points[i + 1]);
            } else {
              _ctx.lineTo(~~points[i], ~~points[i + 1]);
            }
          }
          _ctx.lineTo(~~points[0], ~~points[1]);
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
         * Sets the thickness of the lines
         *
         * @param {number} value
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
         */
        linewidth(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            "[litecanvas] linewidth() 1st param must be a positive number or zero"
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
         * Draw text. You can use `\n` to break lines.
         *
         * @param {number} x
         * @param {number} y
         * @param {string} message the text message
         * @param {number} [color] the color index
         * @param {string} [fontStyle] can be "normal" (default), "italic" and/or "bold".
         */
        text(x, y, message, color = _defaultTextColor, fontStyle = "normal") {
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
          _ctx.fillStyle = getColor(color);
          const messages = ("" + message).split("\n");
          for (let i = 0; i < messages.length; i++) {
            _ctx.fillText(messages[i], ~~x, ~~y + _fontSize * _fontLineHeight * i);
          }
        },
        /**
         * Sets the height ratio of the text lines based on current text size.
         *
         * Default = `1.2`
         *
         * @param value
         */
        textgap(value) {
          _fontLineHeight = value;
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
        image(x, y, source2) {
          DEV: assert(isNumber(x), "[litecanvas] image() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] image() 2nd param must be a number");
          _ctx.drawImage(source2, ~~x, ~~y);
        },
        /**
         * Draw a sprite pixel by pixel represented by a string. Each pixel must be a base 36 number (0-9 or a-z) or a dot.
         *
         * @param {number} x
         * @param {number} y
         * @param {string} pixels
         */
        spr(x, y, pixels) {
          DEV: assert(isNumber(x), "[litecanvas] spr() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] spr() 2nd param must be a number");
          DEV: assert("string" === typeof pixels, "[litecanvas] spr() 3rd param must be a string");
          const rows = pixels.trim().split("\n");
          for (let row = 0; row < rows.length; row++) {
            const chars = rows[row].trim();
            for (let col = 0; col < chars.length; col++) {
              const char = chars[col];
              if (char !== "." && char !== " ") {
                instance.rectfill(x + col, y + row, 1, 1, parseInt(char, 36) || 0);
              }
            }
          }
        },
        /**
         * Draw in an OffscreenCanvas and returns its image.
         *
         * @param {number} width
         * @param {number} height
         * @param {drawCallback} callback
         * @param {object} [options]
         * @param {number} [options.scale=1]
         * @param {OffscreenCanvas} [options.canvas]
         * @returns {ImageBitmap}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
         */
        paint(width, height, callback, options = {}) {
          DEV: assert(
            isNumber(width) && width >= 1,
            "[litecanvas] paint() 1st param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 1,
            "[litecanvas] paint() 2nd param must be a positive number"
          );
          DEV: assert(
            "function" === typeof callback,
            "[litecanvas] paint() 3rd param must be a function"
          );
          DEV: assert(
            options && null == options.scale || isNumber(options.scale),
            "[litecanvas] paint() 4th param (options.scale) must be a number"
          );
          DEV: assert(
            options && null == options.canvas || options.canvas instanceof OffscreenCanvas,
            "[litecanvas] paint() 4th param (options.canvas) must be an OffscreenCanvas"
          );
          const canvas = options.canvas || new OffscreenCanvas(1, 1), scale = options.scale || 1, currentContext = _ctx;
          canvas.width = width * scale;
          canvas.height = height * scale;
          _ctx = canvas.getContext("2d");
          _ctx.scale(scale, scale);
          callback(_ctx);
          _ctx = currentContext;
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
        push() {
          _ctx.save();
        },
        /**
         * restores the drawing style settings and transformations
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
         */
        pop() {
          _ctx.restore();
        },
        /**
         * Adds a translation to the transformation matrix.
         *
         * @param {number} x
         * @param {number} y
         */
        translate(x, y) {
          DEV: assert(isNumber(x), "[litecanvas] translate() 1st param must be a number");
          DEV: assert(isNumber(y), "[litecanvas] translate() 2nd param must be a number");
          _ctx.translate(~~x, ~~y);
        },
        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale(x, y) {
          DEV: assert(isNumber(x), "[litecanvas] scale() 1st param must be a number");
          DEV: assert(null == y || isNumber(y), "[litecanvas] scale() 2nd param must be a number");
          _ctx.scale(x, y || x);
        },
        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate(radians) {
          DEV: assert(isNumber(radians), "[litecanvas] rotate() 1st param must be a number");
          _ctx.rotate(radians);
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
          _ctx.fillStyle = getColor(color);
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
          _ctx.strokeStyle = getColor(color);
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
          loadPlugin(callback, config);
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
          eventName = lowerCase(eventName);
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
            eventName = lowerCase(eventName);
            triggerEvent("before:" + eventName, arg1, arg2, arg3, arg4);
            triggerEvent(eventName, arg1, arg2, arg3, arg4);
            triggerEvent("after:" + eventName, arg1, arg2, arg3, arg4);
          }
        },
        /**
         * Set new palette colors or restore the default palette.
         *
         * @param {string[]} [colors] an array of colors
         * @param {number} [textColor] the default text color this palette
         */
        pal(colors, textColor = 3) {
          DEV: assert(
            null == colors || Array.isArray(colors) && colors.length > 0,
            "[litecanvas] pal() 1st param must be a array of color strings"
          );
          DEV: assert(
            isNumber(textColor) && textColor >= 0,
            "[litecanvas] pal() 2nd param must be a positive number or zero"
          );
          _colorPalette = colors || defaultPalette;
          _colorPaletteState = [];
          _defaultTextColor = textColor;
        },
        /**
         * Replace the color "a" with color "b".
         *
         * If called without arguments, reset the current palette.
         *
         * Note: `palc()` don't affect drawings made with `image()`.
         *
         * @param {number?} a
         * @param {number?} b
         */
        palc(a, b) {
          DEV: assert(
            null == a || isNumber(a) && a >= 0,
            "[litecanvas] palc() 1st param must be a positive number"
          );
          DEV: assert(
            isNumber(a) ? isNumber(b) && b >= 0 : null == b,
            "[litecanvas] palc() 2nd param must be a positive number"
          );
          if (a == null) {
            _colorPaletteState = [];
          } else {
            _colorPaletteState[a] = b;
          }
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
         * Returns information about the engine instance.
         *
         * @param {number|string} index
         * @returns {any}
         */
        stat(index) {
          DEV: assert(
            isNumber(index) || "string" === typeof index,
            "[litecanvas] stat() 1st param must be a number or string"
          );
          const internals = [
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
            _colorPalette,
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
            // 11
            _fontFamily,
            // 12
            _colorPaletteState,
            // 13
            _fontLineHeight
          ];
          const data = { index, value: internals[index] };
          instance.emit("stat", data);
          return data.value;
        },
        /**
         * Pauses the engine loop (update & draw).
         */
        pause() {
          _paused = true;
          cancelAnimationFrame(_rafid);
        },
        /**
         * Resumes (if paused) the engine loop.
         */
        resume() {
          DEV: assert(
            _initialized,
            '[litecanvas] resume() cannot be called before the "init" event and neither after the quit() function'
          );
          if (_initialized && _paused) {
            _paused = false;
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
          return _paused;
        },
        /**
         * Shutdown the litecanvas instance and remove all event listeners.
         */
        quit() {
          instance.emit("quit");
          instance.pause();
          _initialized = false;
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
          DEV: console.warn("[litecanvas] quit() terminated a Litecanvas instance.");
        }
      };
      for (const k of _mathFunctions.split(",")) {
        instance[k] = math[k];
      }
      function init() {
        if (settings.autoscale) {
          on(root, "resize", resizeCanvas);
        }
        if (settings.tapEvents) {
          const _getXY = (
            /**
             * @param {MouseEvent | Touch} ev
             */
            ((ev) => [
              (ev.pageX - _canvas.offsetLeft) / _scale,
              (ev.pageY - _canvas.offsetTop) / _scale
            ])
          ), _taps = /* @__PURE__ */ new Map(), _registerTap = (
            /**
             * @param {number} id
             * @param {number} [x]
             * @param {number} [y]
             */
            ((id, x, y) => {
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
            })
          ), _updateTap = (
            /**
             * @param {number} id
             * @param {number} x
             * @param {number} y
             */
            ((id, x, y) => {
              const tap = _taps.get(id) || _registerTap(id);
              tap.x = x;
              tap.y = y;
            })
          ), _checkTapped = (
            /**
             * @param {{t: number}} tap
             */
            ((tap) => tap && Date.now() - tap.t <= 300)
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
            key = lowerCase(key);
            return !key ? keySet.size > 0 : keySet.has("space" === key ? " " : key);
          };
          let _lastKey = "";
          on(root, "keydown", (event) => {
            const key = lowerCase(event.key);
            if (!_keysDown.has(key)) {
              _keysDown.add(key);
              _keysPress.add(key);
              _lastKey = key === " " ? "space" : key;
            }
          });
          on(root, "keyup", (event) => {
            _keysDown.delete(lowerCase(event.key));
          });
          on(root, "blur", () => _keysDown.clear());
          instance.listen("after:update", () => _keysPress.clear());
          instance.def(
            "iskeydown",
            /**
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
          instance.def(
            "lastkey",
            /**
             * @returns {string}
             */
            () => _lastKey
          );
        }
        _initialized = true;
        instance.emit("init", instance);
        instance.resume();
      }
      function drawFrame() {
        _rafid = raf(drawFrame);
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
        resizeCanvas();
        if (!_canvas.parentNode) {
          document.body.appendChild(_canvas);
        }
        _canvas.style.imageRendering = "pixelated";
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
        _ctx.imageSmoothingEnabled = false;
        instance.textalign("start", "top");
        instance.emit("resized", _scale);
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
      function getColor(index) {
        const i = _colorPaletteState[index] ?? index;
        return _colorPalette[~~i % _colorPalette.length];
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
      const source = settings.loop ? settings.loop : root;
      for (const event of _coreEvents.split(",")) {
        DEV: if (root === source && source[event]) {
          console.info(`[litecanvas] using window.${event}()`);
        }
        if (source[event]) instance.listen(event, source[event]);
      }
      if ("loading" === document.readyState) {
        on(root, "DOMContentLoaded", () => raf(init));
      } else {
        _rafid = raf(init);
      }
      return instance;
    }
    window.litecanvas = litecanvas;
  })();
  (() => {
    var Lt = Object.defineProperty;
    var St = (s, t) => {
      for (var e in t) Lt(s, e, { get: t[e], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (s = true) => {
      for (let t in globalThis.utils) t !== "global" && (s || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var H = {};
    St(H, { ANCHOR_BOT_LEFT: () => is, ANCHOR_BOT_RIGHT: () => hs, ANCHOR_CENTER: () => rs, ANCHOR_TOP_LEFT: () => et, ANCHOR_TOP_RIGHT: () => os, Actor: () => C, BACK_IN: () => ps, BACK_IN_OUT: () => fs, BACK_OUT: () => us, BOUNCE_IN: () => _t, BOUNCE_IN_OUT: () => ds, BOUNCE_OUT: () => Y, Camera: () => g, DOWN: () => ss, EASE_IN: () => ns, EASE_IN_OUT: () => cs, EASE_OUT: () => ls, ELASTIC_IN: () => _s, ELASTIC_IN_OUT: () => ms, ELASTIC_OUT: () => xs, Grid: () => M, LEFT: () => es, LINEAR: () => ft, Noise: () => U, ONE: () => Qt, RIGHT: () => ts, TypedGrid: () => N, UP: () => vt, Vector: () => I, ZERO: () => st, advance: () => it, assert: () => D, choose: () => bt, colcirc: () => j, colrect: () => V, dd: () => Nt, diff: () => rt, dist: () => at, flipImage: () => xt, formatTime: () => Tt, fract: () => ot, head: () => Mt, intersection: () => b, is: () => R, last: () => wt, lerpAngle: () => pt, log: () => A, lpad: () => At, mag: () => nt, makeCircle: () => yt, makeRectangle: () => gt, mean: () => lt, median: () => ct, mod: () => ht, percent: () => ut, range: () => It, resolverect: () => X, rpad: () => Rt, scaleImage: () => mt, shuffle: () => Et, sum: () => P, tail: () => Pt, tintImage: () => dt, tween: () => as, vec: () => h, vecAbs: () => Xt, vecAdd: () => L, vecAngle: () => Zt, vecAngleBetween: () => Ut, vecCeil: () => Dt, vecClamp: () => qt, vecCross: () => Ht, vecDist: () => Bt, vecDist2: () => Yt, vecDiv: () => k, vecDot: () => tt, vecEq: () => F, vecFloor: () => Vt, vecHeading: () => v, vecIsZero: () => $t, vecLerp: () => Wt, vecLimit: () => Ct, vecMag: () => J, vecMag2: () => Q, vecMove: () => Kt, vecMult: () => w, vecNorm: () => O, vecRand: () => Jt, vecReflect: () => Ft, vecRem: () => zt, vecRotate: () => Ot, vecRound: () => jt, vecSet: () => $, vecSetMag: () => G, vecSub: () => S, vecToArray: () => Gt });
    var g = class {
      _engine = null;
      x = 0;
      y = 0;
      ox = 0;
      oy = 0;
      width = 0;
      height = 0;
      rotation = 0;
      scale = 1;
      constructor(t = null, e = 0, r = 0, o = null, i = null) {
        this._engine = t || globalThis, this.ox = e, this.oy = r, this.resize(o || this._engine.W - e, i || this._engine.H - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
      }
      resize(t, e) {
        this.width = t, this.height = e, this._engine.emit("camera-resized", this);
      }
      start(t = false) {
        this._engine.push(), t && this._engine.clip((o) => {
          o.rect(this.ox, this.oy, this.width, this.height);
        });
        let e = this.ox + this.width / 2, r = this.oy + this.height / 2;
        this._engine.translate(e, r), this._engine.scale(this.scale), this._engine.rotate(this.rotation), this._engine.translate(-this.x + this._shake.x, -this.y + this._shake.y);
      }
      end() {
        this._engine.pop();
      }
      lookAt(t, e) {
        this.x = t, this.y = e;
      }
      move(t, e) {
        this.x += t, this.y += e;
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
      getWorldPoint(t, e, r = {}) {
        let o = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, e = (e - this.height / 2 - this.oy) / this.scale, r.x = o * t - i * e + this.x, r.y = i * t + o * e + this.y, r;
      }
      getCameraPoint(t, e, r = {}) {
        let o = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = t - this.x, e = e - this.y, t = o * t - i * e, e = i * t + o * e, r.x = t * this.scale + this.width / 2 + this.ox, r.y = e * this.scale + this.height / 2 + this.oy, r;
      }
      getBounds() {
        return [this.ox, this.oy, this.width, this.height];
      }
      shake(t = 1, e = 0.3) {
        this.shaking || (this._shake.removeListener = this._engine.listen("update", (r) => {
          this._shake.x = this._engine.randi(-t, t), this._shake.y = this._engine.randi(-t, t), e -= r, e <= 0 && this.unshake();
        }));
      }
      unshake() {
        this.shaking && (this._shake.removeListener(), this._shake.removeListener = null, this._shake.x = this._shake.y = 0);
      }
      get shaking() {
        return this._shake.removeListener !== null;
      }
    };
    var b = (s, t, e, r, o, i, a, n) => {
      let l = Math.max(s, o), x = Math.min(s + e, o + a) - l, p = Math.max(t, i), m = Math.min(t + r, i + n) - p;
      return [l, p, x, m];
    };
    var X = (s, t, e, r, o, i, a, n) => {
      let [l, x, p, m] = b(s, t, e, r, o, i, a, n), _ = "", y = s, c = t;
      return p < m ? s < o ? (_ = "right", y = o - e) : (_ = "left", y = o + a) : t < i ? (_ = "bottom", c = i - r) : (_ = "top", c = i + n), { dir: _, x: y, y: c };
    };
    var D = (s, t = "Assertion failed") => {
      if (!s) throw new Error(t);
    };
    var V = (s, t, e, r, o, i, a, n) => s < o + a && s + e > o && t < i + n && t + r > i;
    var j = (s, t, e, r, o, i) => (r - s) * (r - s) + (o - t) * (o - t) <= (e + i) * (e + i);
    var M = class s {
      _w;
      _h;
      _c;
      constructor(t, e, r = []) {
        this._w = Math.max(1, ~~t), this._h = Math.max(1, ~~e), this._c = r;
      }
      [Symbol.iterator]() {
        let t = 0;
        return { next: () => ({ value: [this.indexToPointX(t), this.indexToPointY(t), this._c[t++]], done: t > this._c.length }) };
      }
      clone() {
        return new s(this._w, this._h, this._c);
      }
      clear() {
        this.forEach((t, e) => this.set(t, e, void 0));
      }
      get width() {
        return this._w;
      }
      get height() {
        return this._h;
      }
      set(t, e, r) {
        this._c[this.pointToIndex(t, e)] = r;
      }
      get(t, e) {
        return this._c[this.pointToIndex(t, e)];
      }
      has(t, e) {
        return this.get(t, e) != null;
      }
      check(t, e) {
        return t >= 0 && t < this._w && e >= 0 && e < this._h;
      }
      get length() {
        return this._w * this._h;
      }
      pointToIndex(t, e) {
        return this.clampX(~~t) + this.clampY(~~e) * this._w;
      }
      indexToPointX(t) {
        return t % this._w;
      }
      indexToPointY(t) {
        return Math.floor(t / this._w);
      }
      forEach(t, e = false) {
        let r = e ? this.length - 1 : 0, o = e ? -1 : this.length, i = e ? -1 : 1;
        for (; r !== o; ) {
          let a = this.indexToPointX(r), n = this.indexToPointY(r), l = this._c[r];
          if (t(a, n, l, this) === false) break;
          r += i;
        }
      }
      fill(t) {
        this.forEach((e, r) => {
          this.set(e, r, t);
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
      toString(t = " ", e = true) {
        if (!e) return this._c.join(t);
        let r = [];
        return this.forEach((o, i, a) => {
          r[i] = r[i] || "", r[i] += a + t;
        }), r.join(`
`);
      }
    }, N = class s extends M {
      constructor(t, e, r = Uint8Array) {
        super(t, e, null), this._c = new r(this._w * this._h);
      }
      has(t, e) {
        return this.get(t, e) !== 0;
      }
      clone() {
        let t = new s(this._w, this._h, this._c.constructor);
        return this.forEach((e, r, o) => {
          t.set(e, r, o);
        }), t;
      }
    };
    function q(s, t, e) {
      return s < t ? t : s > e ? e : s;
    }
    var z = Math.cos, K = Math.sin, kt = 2 * Math.PI, I = class {
      constructor(t = 0, e = t) {
        this.x = parseFloat(t) || 0, this.y = parseFloat(e) || 0;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, d = (s) => s instanceof I, h = (s = 0, t = s) => (d(s) && (t = s.y, s = s.x), new I(s, t)), $ = (s, t, e = t) => (d(t) ? $(s, t.x, t.y) : (s.x = t, s.y = e), s), L = (s, t, e = t) => d(t) ? L(s, t.x, t.y) : (s.x += t, s.y += e, s), S = (s, t, e = t) => d(t) ? S(s, t.x, t.y) : (s.x -= t, s.y -= e, s), w = (s, t, e = t) => d(t) ? w(s, t.x, t.y) : (s.x *= t, s.y *= e, s), k = (s, t, e = t) => d(t) ? k(s, t.x, t.y) : (s.x /= t || 1, s.y /= e || 1, s), Ot = (s, t) => {
      let e = z(t), r = K(t);
      return s.x = e * s.x - r * s.y, s.y = r * s.x + e * s.y, s;
    }, Ft = (s, t) => {
      let e = O(h(t));
      return S(s, w(e, 2 * tt(s, e)));
    }, G = (s, t) => (O(s), w(s, t), s), J = (s) => Math.hypot(s.x, s.y), Q = (s) => s.x * s.x + s.y * s.y, O = (s) => {
      let t = J(s);
      return t > 0 && k(s, t), s;
    }, Ct = (s, t = 1) => (Q(s) > t * t && G(s, t), s), Bt = (s, t) => Math.hypot(t.x - s.x, t.y - s.y), Yt = (s, t) => {
      let e = s.x - t.x, r = s.y - t.y;
      return e * e + r * r;
    }, v = (s) => Math.atan2(s.y, s.x), Zt = (s) => v(s), Ut = (s, t) => Math.atan2(t.y - s.y, t.x - s.x), tt = (s, t) => s.x * t.x + s.y * t.y, Ht = (s, t) => s.x * t.y - s.y * t.x, Wt = (s, t, e) => (s.x += (t.x - s.x) * e || 0, s.y += (t.y - s.y) * e || 0, s), Xt = (s) => (s.x = Math.abs(s.x), s.y = Math.abs(s.y), s), Dt = (s) => (s.x = Math.ceil(s.x), s.y = Math.ceil(s.y), s), Vt = (s) => (s.x = Math.floor(s.x), s.y = Math.floor(s.y), s), jt = (s) => (s.x = Math.round(s.x), s.y = Math.round(s.y), s), qt = (s, t, e) => (s.x < t.x && (s.x = t.x), s.x > e.x && (s.x = e.x), s.y < t.y && (s.y = t.y), s.y > e.y && (s.y = e.y), s), zt = (s, t) => (s.x %= t, s.y %= t, s), Kt = (s, t, e = 1) => L(s, t.x * e, t.y * e), F = (s, t, e = t) => d(t) ? F(s, t.x, t.y) : s.x === t && s.y === e, $t = (s) => F(s, st), Gt = (s) => [s.x, s.y], Jt = (s = 1, t = s, e = globalThis.rand || Math.random) => {
      let r = e() * kt, o = e() * (t - s) + s;
      return h(z(r) * o, K(r) * o);
    }, st = h(0, 0), Qt = h(1, 1), vt = h(0, -1), ts = h(1, 0), ss = h(0, 1), es = h(-1, 0);
    var rs = h(0.5, 0.5), et = h(0, 0), os = h(1, 0), is = h(0, 1), hs = h(1, 1), C = class {
      sprite;
      pos;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, e, r = et) {
        this.sprite = t || { width: 0, height: 0 }, this.pos = e || h(0), this._o = h(r), this._s = h(1, 1);
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
      scaleTo(t, e = t) {
        this._s.x = t, this._s.y = e;
      }
      scaleBy(t, e = t) {
        this._s.x *= t, this._s.y *= e;
      }
      getBounds(t = true) {
        let e = this.sprite.width * (t ? this._s.x : 1), r = this.sprite.height * (t ? this._s.y : 1), o = this.pos.x - e * this.anchor.x, i = this.pos.y - r * this.anchor.y;
        return [o, i, e, r];
      }
      draw(t = globalThis, e = true) {
        e && t.push(), this.transform(t), this.sprite.width && this.sprite.height && !this.hidden && this.opacity > 0 && this.drawImage(t), e && t.pop();
      }
      transform(t) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t, e = true) {
        let r = this.anchor, o = -this.sprite.width * (this.flipX ? 1 - r.x : r.x), i = -this.sprite.height * (this.flipY ? 1 - r.y : r.y);
        e && t.alpha(this.opacity), t.image(o, i, this.sprite);
      }
    };
    var rt = (s, t) => Math.abs(t - s) || 0;
    var ot = (s) => s % 1 || 0;
    var it = (s, t, e, r = 1) => {
      e && (t.x += e.x * r, t.y += e.y * r), s.x += t.x * r, s.y += t.y * r;
    };
    var ht = (s, t) => (t + s % t) % t;
    var at = (s, t, e, r) => Math.hypot(e - s, r - t);
    var nt = (s, t) => Math.hypot(s, t);
    var P = (s) => {
      let t = 0;
      for (let e = 0; e < s.length; e++) t += s[e];
      return t;
    };
    var lt = (s) => P(s) / s.length;
    var ct = (s) => {
      let t = s.sort((r, o) => r - o), e = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[e - 1] + t[e]) / 2 : t[e];
    };
    var pt = (s, t, e) => {
      let r = (t - s) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), s + r * e;
    };
    var ut = (s, t = 0, e = 1) => e - t ? (s - t) / (e - t) : 0;
    var T = Math.PI / 2, as = (s, t, e, r = 1, o = ft) => new B(s, t, e, r, o), ft = (s) => s, ns = (s) => s * s, ls = (s) => -s * (s - 2), cs = (s) => s < 0.5 ? 2 * s * s : -2 * s * s + 4 * s - 1, ps = (s) => s * s * s - s * Math.sin(s * Math.PI), us = (s) => {
      let t = 1 - s;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, fs = (s) => {
      if (s < 0.5) {
        let e = 2 * s;
        return 0.5 * (e * e * e - e * Math.sin(e * Math.PI));
      }
      let t = 1 - (2 * s - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(s * Math.PI))) + 0.5;
    }, _s = (s) => Math.sin(13 * T * s) * Math.pow(2, 10 * (s - 1)), xs = (s) => Math.sin(-13 * T * (s + 1)) * Math.pow(2, -10 * s) + 1, ms = (s) => {
      if (s < 0.5) {
        let r = Math.sin(13 * T * (2 * s)), o = Math.pow(2, 10 * (2 * s - 1));
        return 0.5 * r * o;
      }
      let t = Math.sin(-13 * T * (2 * s - 1 + 1)), e = Math.pow(2, -10 * (2 * s - 1));
      return 0.5 * (t * e + 2);
    }, _t = (s) => 1 - Y(1 - s), Y = (s) => s < 4 / 11 ? 121 * s * s / 16 : s < 8 / 11 ? 363 / 40 * s * s - 99 / 10 * s + 17 / 5 : s < 9 / 10 ? 4356 / 361 * s * s - 35442 / 1805 * s + 16061 / 1805 : 54 / 5 * s * s - 513 / 25 * s + 268 / 25, ds = (s) => s < 0.5 ? 0.5 * _t(s * 2) : 0.5 * Y(s * 2 - 1) + 0.5, B = class {
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
      constructor(t, e, r, o, i) {
        this._o = t, this._p = e, this._x = r, this._d = o, this._e = i, this._w = 0;
      }
      start(t) {
        if (this.running) return this;
        this._cu.stop(false), this._ch = this._cu = this, this.running = true;
        let e = this._o[this._p] || 0, r = this._rel ? e + this._x : this._x;
        return this._lc = this._lc || t || globalThis, this._u = this._lc.listen("update", (o) => {
          if (this._t <= this._w) {
            this._t += o;
            return;
          }
          let i = this._t - this._w;
          this._o[this._p] = this._lc.lerp(e, r, this._e(i / this._d)), this._t += o, i >= this._d && (this._o[this._p] = r, this.stop());
        }), this;
      }
      stop(t = true) {
        if (!this._u) return this;
        if (this.running = false, this._u(), this._t = 0, t) for (let e of this._cb) e(this._o);
        return this;
      }
      restart(t = null, e = false) {
        return this.stop(e).restart(t);
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
    var Z = (s) => 0.5 * (1 - Math.cos(s * Math.PI)), U = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, e = 0, r = 0) {
        t < 0 && (t = -t), e < 0 && (e = -e), r < 0 && (r = -r);
        let o = Math.floor(t), i = Math.floor(e), a = Math.floor(r), n = t - o, l = e - i, x = r - a, p, m, _ = 0, y = 0.5, c, u, E;
        for (let W = 0; W < this._po; W++) {
          let f = o + (i << 4) + (a << 8);
          p = Z(n), m = Z(l), c = this._p[f & 4095], c += p * (this._p[f + 1 & 4095] - c), u = this._p[f + 16 & 4095], u += p * (this._p[f + 16 + 1 & 4095] - u), c += m * (u - c), f += 256, u = this._p[f & 4095], u += p * (this._p[f + 1 & 4095] - u), E = this._p[f + 16 & 4095], E += p * (this._p[f + 16 + 1 & 4095] - E), u += m * (E - u), c += Z(x) * (u - c), _ += c * y, y *= this._pf, o <<= 1, n *= 2, i <<= 1, l *= 2, a <<= 1, x *= 2, n >= 1 && (o++, n--), l >= 1 && (i++, l--), x >= 1 && (a++, x--);
        }
        return _;
      }
      noiseDetail(t, e) {
        t > 0 && (this._po = t), e > 0 && (this._pf = e);
      }
      noiseSeed(t = null) {
        t != null && this._e.rseed(t);
        let e = this._e.rand || Math.random;
        for (let r = 0; r < 4096; r++) this._p[r] = e();
      }
    };
    var xt = (s, t = true, e = false, r = globalThis) => r.paint(s.width, s.height, (o) => {
      r.push(), r.scale(t ? -1 : 1, e ? -1 : 1), r.image(t ? -s.width : 0, e ? -s.height : 0, s), r.pop();
    });
    var mt = (s, t, e = true, r = globalThis) => r.paint(s.width * t, s.height * t, (o) => {
      r.push(), o.imageSmoothingEnabled = !e, r.scale(t), r.image(0, 0, s), r.pop();
    });
    var dt = (s, t, e = 1, r = globalThis) => r.paint(s.width, s.height, (o) => {
      r.push(), r.alpha(e), r.rectfill(0, 0, s.width, s.height, t), o.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, s), r.pop();
    });
    var yt = (s, t, { borderWidth: e = 0, borderColor: r = 0, engine: o = globalThis } = {}) => {
      let i = s * 2 + e;
      return o.paint(i, i, () => {
        o.circfill(i / 2, i / 2, s, t), e > 0 && (o.linewidth(e), o.stroke(r));
      });
    };
    var gt = (s, t, e, { borderWidth: r = 0, borderColor: o = 0, engine: i = globalThis } = {}) => {
      let a = s + r * 2, n = t + r * 2;
      return i.paint(a, n, () => {
        let l = r > 0;
        l && i.cls(o), i.rectfill(l ? r : 0, l ? r : 0, s, t, e);
      });
    };
    var It = (s, t = 0, e = 1) => [...Array(s | 0).keys()].map((r) => t + e * r);
    var Et = (s, t = globalThis.rand || Math.random) => {
      s = [...s];
      for (let e = s.length - 1; e > 0; e--) {
        let r = Math.floor(t() * (e + 1)), o = s[e];
        s[e] = s[r], s[r] = o;
      }
      return s;
    };
    var bt = (s, t = globalThis.rand || Math.random) => s[Math.floor(t() * s.length)];
    var Mt = (s) => s[0];
    var wt = (s) => s[s.length - 1];
    var Pt = (s) => s.slice(1);
    var Tt = (s) => ~~(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + ~~(s % 60);
    var Rt = (s, t, e = "0") => (s + "").padEnd(t, e);
    var At = (s, t, e = "0") => (s + "").padStart(t, e);
    var R = (s, t) => typeof t == "function" ? s instanceof t : typeof s === t;
    var A = (s, t, e = globalThis) => e.text(16, 16, (t ? `${t}: ` : "") + (R(s, "object") ? JSON.stringify(s, null, 4) : s));
    var Nt = (s, t, e = globalThis) => {
      e.pal(["blue", "#fff"]), e.cls(0), e.ctx().resetTransform(), e.textfont("monospace"), e.textsize(16), e.textalign("start", "top"), A(s, t || "dd() output", e), e.quit();
    };
    globalThis.utils = Object.assign(globalThis.utils || {}, H);
  })();
  (() => {
    function f(e) {
      return e.split("\\").pop().split("/").pop().split(".")[0];
    }
    function b(e, t) {
      return t && !x(e) && (e = t + e), e;
    }
    function x(e) {
      try {
        return !!new URL(e).protocol;
      } catch {
      }
      return false;
    }
    var v = { crossOrigin: "anonymous", baseURL: null, allowSoundInterruptions: true, ignoreErrors: false }, o = (e, t) => {
      let m = "LOADING";
      e.def(m, ~~e[m] + ~~t);
    };
    function h(e, t = {}) {
      return t = Object.assign({}, v, t), o(e, 0), e.def("ASSETS", e.ASSETS || {}), e.ASSETS.font = {}, { loadFont: async (a, r, u) => {
        let { baseURL: p, ignoreErrors: c } = t, l = f(r);
        r = b(r, p);
        let s = new FontFace(a, `url(${r})`), n = { asset: s, type: "font", fontName: a, src: r, id: l };
        e.emit("filter-asset", s, n), document.fonts.add(s), o(e, 1);
        let i = s.load();
        return i.then((d) => {
          e.ASSETS.font[l] = d, u && u(d), e.emit("asset-load", n), o(e, -1);
        }).catch((d) => {
          if (console.error(d), !c) throw new Error("Failed to load font from " + r);
          u && u(), e.emit("asset-error", n);
        }), i;
      } };
    }
    function S(e, t = {}) {
      return t = Object.assign({}, v, t), o(e, 0), e.def("ASSETS", e.ASSETS || {}), e.ASSETS.image = {}, { loadImage: async (a, r) => {
        let { baseURL: u, ignoreErrors: p, crossOrigin: c } = t, l = { splitFrames: _ }, s = f(a);
        a = b(a, u);
        let n = new Image(), i = { asset: n, type: "image", src: a, id: s };
        return new Promise((d) => {
          o(e, 1), n.crossOrigin = c, n.onerror = (T) => {
            console.error(T);
            let L = "Failed to load image from " + a;
            if (!p) throw new Error(L);
            r && r(), e.emit("asset-error", i);
          }, n.onload = () => {
            e.ASSETS.image[s] = n, r && r(n, l), e.emit("asset-load", i), o(e, -1), d(n);
          }, e.emit("filter-asset", n, i), n.src = a;
        });
      } };
    }
    function _(e, t, m, a = 0, r = 0) {
      let u = [], p = Math.floor((e.width + r) / (t + r)), c = Math.floor((e.height + r) / (m + r));
      for (let l = 0; l < c; l++) for (let s = 0; s < p; s++) {
        let n = new OffscreenCanvas(t, m);
        n.getContext("2d").drawImage(e, a + s * t + s * r, a + l * m + l * r, t, m, 0, 0, t, m), u.push(n);
      }
      return u;
    }
    function w(e, t = {}) {
      return t = Object.assign({}, v, t), o(e, 0), e.def("ASSETS", e.ASSETS || {}), e.ASSETS.script = {}, { loadScript: async (a, r) => {
        let { baseURL: u, ignoreErrors: p, crossOrigin: c } = t, l = f(a);
        a = b(a, u);
        let s = document.createElement("script"), n = { asset: s, type: "script", src: a, id: l };
        return new Promise((i) => {
          o(e, 1), s.crossOrigin = c, s.onerror = (d) => {
            if (console.error(d), !p) throw new Error("Failed to load " + a);
            r && r(), e.emit("asset-error", n);
          }, s.onload = () => {
            e.ASSETS.script[l] = s, r && r(s), e.emit("asset-load", n), o(e, -1), i(s);
          }, e.emit("filter-asset", s, n), s.src = a, document.head.appendChild(s);
        });
      } };
    }
    function y(e, t = {}) {
      return t = Object.assign({}, v, t), o(e, 0), e.def("ASSETS", e.ASSETS || {}), e.ASSETS.sound = {}, { loadSound: async (a, r) => {
        let { crossOrigin: u, ignoreErrors: p, allowSoundInterruptions: c, baseURL: l } = t, s = f(a);
        a = b(a, l);
        let n = new Audio(), i = { asset: n, type: "sound", src: a, id: s };
        return new Promise((d) => {
          o(e, 1), n.crossOrigin = u, n.onerror = (T) => {
            if (console.error(T), !p) throw new Error("Failed to load " + a);
            r && r(null), e.emit("asset-error", i);
          }, n[c ? "oncanplay" : "oncanplaythrough"] = () => {
            e.ASSETS.sound[s] = n, r && r(n), e.emit("asset-load", i), o(e, -1), d(n);
          }, e.emit("filter-asset", n, i), n.src = a;
        });
      } };
    }
    Object.assign(HTMLAudioElement.prototype, { stop() {
      this.pause(), this.currentTime = 0, this.src = this.src;
    }, restart() {
      this.pause(), this.currentTime = 0, this.play();
    } });
    function g(e, t = {}) {
      return t = Object.assign({}, v, t), o(e, 0), e.def("ASSETS", e.ASSETS || {}), e.ASSETS.json = {}, { loadJSON: async (a, r, u) => {
        let { baseURL: p, ignoreErrors: c } = t, l = f(a);
        a = b(a, p);
        let s = { type: "json", src: a, id: l };
        e.emit("filter-asset", null, s), o(e, 1), e.ASSETS.json = {};
        let n = fetch(a, u);
        return n.then((i) => i.json()).then((i) => {
          ASSETS.json[l] = i, s.json = i, r && r(i), e.emit("asset-load", s), o(e, -1);
        }).catch((i) => {
          if (console.error(i), !c) throw new Error("Failed to load JSON from " + a);
          r && r(), e.emit("asset-error", s);
        }), n;
      } };
    }
    function E(e) {
      return o(e, 0), e.def("ASSETS", e.ASSETS || {}), { load: (m) => new Promise((a, r) => {
        o(e, 1), m((p) => (o(e, -1), a(p)), r);
      }) };
    }
    function A(e, t = {}) {
      e.use(h, t), e.use(S, t), e.use(w, t), e.use(y, t), e.use(g, t), e.use(E);
    }
    window.pluginAssetLoader = A;
  })();
  (() => {
    var x = (s, c, h, m, n, r, b, f) => s < n + b && s + h > n && c < r + f && c + m > r;
    var _ = (s, c, h, m, n, r) => (m - s) * (m - s) + (n - c) * (n - c) <= (h + r) * (h + r);
    var At = 2 * Math.PI;
    var ge = Math.PI / 2;
    var j = { warnings: true };
    function v(s, c = {}) {
      c = Object.assign({}, j, c);
      let h = s.stat(1), m = { def: u, seed: b, print: N, clear: I, setfps: S, setvar: R, textstyle: w, textmetrics: E, cliprect: M, clipcirc: T, blendmode: A, transform: k, getcolor: y, mousepos: P, resize: C, path: L, fill: Y, stroke: F, clip: X, paint: W, colrect: x, colcirc: _ };
      if (h) throw 'Plugin Migrate should be loaded before the "init" event';
      let n = s.stat(0);
      function r(t, e, a = "") {
        c.warnings && console.warn(`[litecanvas/migrate] ${t} is removed. ` + (e ? `Use ${e} instead. ` : "") + a);
      }
      function b(t) {
        return r("seed()", "rseed()"), t && s.rseed(t), s.stat(9);
      }
      let f = "";
      function w(t) {
        r("textstyle()", "the 5th param of text()"), f = t;
      }
      function N(t, e, a, i) {
        r("print()", "text()"), s.text(t, e, a, i);
      }
      function E(t, e) {
        r("textmetrics()", "ctx().measureText()");
        let a = s.ctx(), i = s.stat(10), l = s.stat(11);
        a.font = `${f || ""} ${~~(e || i)}px ${l}`;
        let p = a.measureText(t);
        return p.height = p.actualBoundingBoxAscent + p.actualBoundingBoxDescent, p;
      }
      function M(t, e, a, i) {
        r("cliprect()", "clip()");
        let l = s.ctx();
        l.beginPath(), l.rect(t, e, a, i), l.clip();
      }
      function T(t, e, a) {
        r("clipcirc()", "clip()");
        let i = s.ctx();
        i.beginPath(), i.arc(t, e, a, 0, s.TWO_PI), i.clip();
      }
      function y(t) {
        r("getcolor()", "stat(5)");
        let e = stat(5);
        return e[~~t % e.length];
      }
      function A(t) {
        r("blendmode()", "ctx().globalCompositeOperation");
        let e = s.ctx();
        e.globalCompositeOperation = t;
      }
      function I(t) {
        r("clear()", "cls()"), s.cls(t);
      }
      function k(t, e, a, i, l, p, B = true) {
        return r("transform()", "ctx().setTransform() or ctx().transform()"), s.ctx()[B ? "setTransform" : "transform"](t, e, a, i, l, p);
      }
      function P() {
        return r("mousepos()", "MX and MY"), [MX, MY];
      }
      function S(t) {
        r("setfps()", "framerate()"), s.framerate(t);
      }
      let o = s.def;
      function u(t, e) {
        switch (t) {
          case "W":
          case "WIDTH":
            o("W", e), o("WIDTH", e);
            break;
          case "H":
          case "HEIGHT":
            o("H", e), o("HEIGHT", e);
            break;
          case "T":
          case "ELAPSED":
            o("T", e), o("ELAPSED", e);
            break;
          case "CX":
          case "CENTERX":
            o("CX", e), o("CENTERX", e);
            break;
          case "CY":
          case "CENTERY":
            o("CY", e), o("CENTERY", e);
            break;
          case "MX":
          case "MOUSEX":
            o("MX", e), o("MOUSEX", e);
            break;
          case "MY":
          case "MOUSEY":
            o("MY", e), o("MOUSEY", e);
            break;
          default:
            o(t, e);
            break;
        }
      }
      function R(t, e) {
        r("setvar()", "def()"), u(t, e);
      }
      s.listen("resized", g);
      function g() {
        u("CX", s.W / 2), u("CY", s.H / 2);
      }
      g(), u("CANVAS", s.canvas());
      function C(t, e) {
        if (n.autoscale) throw "resize() don't works with autoscale enabled";
        r("resize()", null, "Avoid changing the canvas dimensions at runtime."), s.CANVAS.width = t, u("W", t), s.CANVAS.height = e, u("H", e), s.emit("resized", 1);
      }
      for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) s[t] != null && u(t, s[t]);
      if (r("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), o("FPS", ""), n.fps && s.framerate(n.fps), n.background != null) {
        r('"background" option', "You must update your canvas CSS");
        let t = s.listen("before:draw", () => {
          s.canvas().style.background = y(~~n.background), t();
        });
      }
      function L(t) {
        return r("path()", "`new Path2D()`", "See https://developer.mozilla.org/en-US/docs/Web/API/Path2D"), new Path2D(t);
      }
      let z = s.fill;
      function Y(t, e) {
        if (e instanceof Path2D) {
          r("fill(color, path)");
          let a = s.stat(5), i = s.ctx();
          i.fillStyle = a[~~t % a.length], s.ctx().fill(e);
        } else z(t);
      }
      let O = s.stroke;
      function F(t, e) {
        if (e instanceof Path2D) {
          r("stroke(color, path)");
          let a = s.stat(5), i = s.ctx();
          i.strokeStyle = a[~~t % a.length], s.ctx().stroke(e);
        } else O(t);
      }
      let D = s.clip;
      function X(t) {
        r("clip(path)", "clip(callback)", "E.g: `clip((ctx) => ctx.rect(0, 0, 200, 200))`"), t instanceof Path2D ? s.ctx().clip(t) : D(t);
      }
      n.antialias && r('"antialias" option', '"pixelart" option'), n.pixelart === false && r('"pixelart" option'), n.animate === false && r('"animate" option', "pause() in the of your draw()");
      let H = s.paint;
      function W(t, e, a, i) {
        let l = a;
        return s.spr && Array.isArray(a) && (l = () => {
          s.spr(0, 0, a.join(`
`));
        }), H(t, e, l, i);
      }
      let d = s.spr;
      return d && d.length === 3 && (m.spr = function(t, e, a, i, l) {
        Number.isFinite(a) && a > 0 ? (r("spr() width and height", "spr(x, y, pixels)"), d(t, e, l)) : d(t, e, a);
      }), m;
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
    var S = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [63, 102, 102, 62, 54, 102, 103], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]], O = (e, r, o = 3) => {
      for (let x = 0; x < 8; x++) for (let a = 0; a < 8; a++) (r[x] | 0) & 1 << a && e.rectfill(a, x, 1, 1, o);
    }, g = { id: "basic", chars: S, first: 33, w: 8, h: 8, render: O };
    var M = [[34, 32, 32], [85, 0, 0], [87, 87, 80], [99, 103, 32], [84, 33, 80], [99, 101, 96], [34, 0, 0], [33, 17, 32], [36, 68, 32], [82, 80, 0], [2, 114, 0], [0, 0, 33], [0, 112, 0], [0, 0, 16], [68, 33, 16], [117, 85, 112], [50, 34, 112], [116, 113, 112], [116, 116, 112], [85, 116, 64], [113, 116, 112], [113, 117, 112], [116, 68, 64], [117, 117, 112], [117, 116, 112], [0, 32, 32], [0, 32, 33], [66, 18, 64], [7, 7, 0], [18, 66, 16], [116, 96, 32], [37, 81, 96], [37, 117, 80], [53, 53, 48], [97, 17, 96], [53, 85, 48], [113, 49, 112], [113, 49, 16], [97, 85, 96], [85, 117, 80], [114, 34, 112], [68, 69, 32], [85, 53, 80], [17, 17, 112], [87, 117, 80], [117, 85, 80], [37, 85, 32], [117, 113, 16], [101, 83, 96], [53, 53, 80], [97, 116, 48], [114, 34, 32], [85, 85, 112], [85, 82, 32], [85, 119, 80], [85, 37, 80], [85, 34, 32], [116, 33, 112], [98, 34, 96], [17, 36, 64], [50, 34, 48], [37, 0, 0], [0, 0, 112], [18, 0, 0], [6, 85, 96], [19, 85, 48], [6, 17, 96], [70, 85, 96], [2, 83, 96], [66, 114, 32], [2, 86, 66], [17, 53, 80], [2, 2, 32], [2, 2, 33], [21, 53, 80], [34, 34, 64], [5, 117, 80], [3, 85, 80], [2, 85, 32], [3, 85, 49], [6, 85, 100], [2, 81, 16], [6, 20, 48], [39, 34, 64], [5, 85, 96], [5, 82, 32], [5, 87, 80], [5, 34, 80], [5, 86, 66], [7, 65, 112], [98, 18, 96], [34, 34, 32], [50, 66, 48], [3, 96, 0]], P = (e, r, o = 3) => {
      for (let x = 0; x < 6; x++) for (let a = 0; a < 4; a++) {
        let f = ~~(x / 2);
        (x % 2 ? r[f] & 15 : r[f] >> 4) & 1 << a && e.rectfill(a, x, 1, 1, o);
      }
    }, N = { id: "mini", chars: M, first: 33, w: 4, h: 6, render: P };
    var L = [[4, 4, 4, 4, 4, , 4, ,], [10, 10, 10, , , , , ,], [, 10, 31, 10, 10, 31, 10, ,], [4, 30, 5, 14, 20, 15, 4, ,], [17, 17, 8, 4, 2, 17, 17, ,], [6, 9, 9, 30, 9, 9, 22, ,], [4, 4, 4, , , , , ,], [8, 4, 4, 4, 4, 4, 8, ,], [2, 4, 4, 4, 4, 4, 2, ,], [, 4, 21, 14, 21, 4, , ,], [, 4, 4, 31, 4, 4, , ,], [, , , , , 4, 4, 2], [, , , 31, , , , ,], [, , , , , 4, 4, ,], [16, 16, 8, 4, 2, 1, 1, ,], [14, 17, 25, 21, 19, 17, 14, ,], [4, 6, 4, 4, 4, 4, 31, ,], [14, 17, 16, 8, 4, 2, 31, ,], [14, 17, 16, 12, 16, 17, 14, ,], [18, 18, 17, 31, 16, 16, 16, ,], [31, 1, 15, 16, 16, 17, 14, ,], [14, 1, 1, 15, 17, 17, 14, ,], [31, 16, 16, 8, 4, 4, 4, ,], [14, 17, 17, 14, 17, 17, 14, ,], [14, 17, 17, 30, 16, 17, 14, ,], [, 4, 4, , , 4, 4, ,], [, 4, 4, , , 4, 4, 2], [, 24, 6, 1, 6, 24, , ,], [, , 31, , 31, , , ,], [, 3, 12, 16, 12, 3, , ,], [14, 17, 16, 8, 4, , 4, ,], [14, 25, 21, 21, 25, 1, 14, ,], [14, 17, 17, 17, 31, 17, 17, ,], [15, 17, 17, 15, 17, 17, 15, ,], [14, 17, 1, 1, 1, 17, 14, ,], [15, 17, 17, 17, 17, 17, 15, ,], [31, 1, 1, 15, 1, 1, 31, ,], [31, 1, 1, 15, 1, 1, 1, ,], [14, 17, 1, 29, 17, 17, 14, ,], [17, 17, 17, 31, 17, 17, 17, ,], [31, 4, 4, 4, 4, 4, 31, ,], [16, 16, 16, 16, 17, 17, 14, ,], [17, 9, 5, 3, 5, 9, 17, ,], [1, 1, 1, 1, 1, 1, 31, ,], [17, 27, 21, 17, 17, 17, 17, ,], [17, 17, 19, 21, 25, 17, 17, ,], [14, 17, 17, 17, 17, 17, 14, ,], [15, 17, 17, 15, 1, 1, 1, ,], [14, 17, 17, 17, 17, 17, 14, 24], [15, 17, 17, 15, 17, 17, 17, ,], [14, 17, 1, 14, 16, 17, 14, ,], [31, 4, 4, 4, 4, 4, 4, ,], [17, 17, 17, 17, 17, 17, 14, ,], [17, 17, 17, 17, 10, 10, 4, ,], [17, 17, 17, 17, 21, 27, 17, ,], [17, 17, 10, 4, 10, 17, 17, ,], [17, 17, 10, 4, 4, 4, 4, ,], [31, 16, 8, 4, 2, 1, 31, ,], [12, 4, 4, 4, 4, 4, 12, ,], [1, 1, 2, 4, 8, 16, 16, ,], [6, 4, 4, 4, 4, 4, 6, ,], [4, 10, 17, , , , , ,], [, , , , , , 31, ,], [2, 4, , , , , , ,], [, , 30, 17, 17, 17, 30, ,], [1, 1, 15, 17, 17, 17, 15, ,], [, , 14, 17, 1, 17, 14, ,], [16, 16, 30, 17, 17, 17, 30, ,], [, , 14, 17, 31, 1, 14, ,], [12, 18, 2, 15, 2, 2, 2, ,], [, , 30, 17, 17, 17, 30, 16, 14], [1, 1, 15, 17, 17, 17, 17, ,], [4, , 6, 4, 4, 4, 31, ,], [16, , 24, 16, 16, 16, 16, 17, 14], [1, 1, 17, 9, 7, 9, 17, ,], [3, 2, 2, 2, 2, 2, 28, ,], [, , 15, 21, 21, 21, 21, ,], [, , 15, 17, 17, 17, 17, ,], [, , 14, 17, 17, 17, 14, ,], [, , 15, 17, 17, 17, 15, 1, 1], [, , 30, 17, 17, 17, 30, 16, 16], [, , 13, 19, 1, 1, 1, ,], [, , 30, 1, 14, 16, 15, ,], [2, 2, 15, 2, 2, 2, 28, ,], [, , 17, 17, 17, 17, 30, ,], [, , 17, 17, 17, 10, 4, ,], [, , 17, 17, 21, 21, 10, ,], [, , 17, 10, 4, 10, 17, ,], [, , 17, 17, 17, 17, 30, 16, 14], [, , 31, 8, 4, 2, 31, ,], [8, 4, 4, 2, 4, 4, 8, ,], [4, 4, 4, 4, 4, 4, 4, ,], [2, 4, 4, 8, 4, 4, 2, ,], [, , 18, 13, , , , ,]], y = { id: "basic", chars: L, first: 33, w: 6, h: 9, render: (e, r, o = 3) => {
      for (let x = 0; x < 9; x++) for (let a = 0; a < 6; a++) (r[x] | 0) & 1 << a && e.rectfill(a, x, 1, 1, o);
    } };
    var z = plugin = (e, { cache: r = true } = {}) => {
      if (e.stat(12) == null) throw "Plugin Pixel Font requires Litecanvas v0.99 or later";
      let o = e.text, x = e.textsize, a = e.textalign, f = e.textfont, u = r ? /* @__PURE__ */ new Map() : null, n = 1, s = null, p = null, k = (t) => {
        p = t;
      }, w = (t) => {
        n = ~~Math.round(t);
      }, T = () => console.warn("[litecanvas/plugin-pixel-font] textalign() has not yet been implemented for pixel fonts"), _ = (t, i, l, c = 3) => {
        e.push(), e.translate(t, i), e.scale(n), s.render(e, l, c), e.pop();
      }, A = (t, i, l, c = 3) => {
        if (l += "", !n || !l.length) return;
        let b = n * s.w, I = n * (s.h || s.w), E = t;
        for (let d = 0; d < l.length; d++) {
          let v = l[d], C = v.charCodeAt();
          if (v === `
`) {
            let m = e.stat(13) || 1.2;
            i = i + m * s.h * n, t = E;
            continue;
          }
          p != null && e.rectfill(t, i, s.w * n, s.h * n, p);
          let h = s.chars[C - s.first];
          if (h) if (r) {
            let m = [s.id, v, ~~c, b, e.stat(12).join(",")].join(":");
            u.has(m) || u.set(m, e.paint(b, I, () => {
              _(0, 0, h, ~~c);
            }));
            let F = u.get(m);
            e.image(t, i, F);
          } else _(t, i, h, c);
          t += b;
        }
      };
      if (r) {
        let i = setInterval(() => {
          u.clear();
        }, 6e4);
        e.listen("quit", () => {
          clearInterval(i), u.clear();
        });
        let l = e.pal;
        e.def("pal", (c) => (u.clear(), l(c)));
      }
      return { textfont: (t) => {
        typeof t == "object" ? (e.def("text", A), e.def("textsize", w), e.def("textalign", T), s = t, w(n || 1)) : (e.def("text", o), e.def("textsize", x), e.def("textalign", a), f(t));
      }, textbg: k };
    };
    window.pluginPixelFont = z;
    window.PIXEL_FONT_MINI = N;
    window.PIXEL_FONT_BASIC = g;
    window.PIXEL_FONT_MONOGRAM = y;
  })();
})();
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! Migrate for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
