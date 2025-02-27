(() => {
  // public/litecanvas.js
  (() => {
    var zzfxX = /* @__PURE__ */ new AudioContext();
    var zzfx = (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, N = 0) => {
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
      p *= 0.3 * (globalThis.zzfxV || 1);
      for (h = e + m + r + t + c | 0; a < h; k[a++] = f * p)
        ++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? Z(g * g) : M.max(M.min(M.tan(g), 1), -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : Z(g), f = (l ? 1 - B + B * Z(d * a / l) : 1) * (f < 0 ? -1 : 1) * M.abs(f) ** D * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f / 2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2 / p) : f, N ? f = W = S * T + Q * (T = U) + P * (U = f) - Y * V - X * (V = W) : 0), x = (b += u += y) * M.cos(A * H++), g += x + x * E * Z(a ** 5), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1);
      p = zzfxX.createBuffer(1, h, R);
      p.getChannelData(0).set(k);
      b = zzfxX.createBufferSource();
      b.buffer = p;
      b.connect(zzfxX.destination);
      b.start();
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
        fullscreen: true,
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
      let _initialized = false, _plugins = [], _canvas = settings.canvas || document.createElement("canvas"), _fullscreen = settings.fullscreen, _autoscale = settings.autoscale, _animated = settings.animate, _scale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _deltaTime, _accumulated = 0, _rafid, _fontFamily = "sans-serif", _fontSize = 32, _rng_seed = Date.now(), _global = settings.global, _events = {
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
        lerp: (start, end, t) => {
          if (true) {
            assert(isFinite(start), "lerp: 1st param must be a number");
            assert(isFinite(end), "lerp: 2nd param must be a number");
            assert(isFinite(t), "lerp: 3rd param must be a number");
          }
          return start + t * (end - start);
        },
        /**
         * Convert degrees to radians
         *
         * @param {number} degs
         * @returns {number} the value in radians
         */
        deg2rad: (degs) => {
          if (true) {
            assert(isFinite(degs), "deg2rad: 1st param must be a number");
          }
          return PI / 180 * degs;
        },
        /**
         * Convert radians to degrees
         *
         * @param {number} rads
         * @returns {number} the value in degrees
         */
        rad2deg: (rads) => {
          if (true) {
            assert(isFinite(rads), "rad2deg: 1st param must be a number");
          }
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
          if (true) {
            assert(isFinite(value), "clamp: 1st param must be a number");
            assert(isFinite(min), "clamp: 2nd param must be a number");
            assert(isFinite(max), "clamp: 3rd param must be a number");
            assert(
              max > min,
              "randi: the 2nd param must be less than the 3rd param"
            );
          }
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
          if (true) {
            assert(isFinite(value), "wrap: 1st param must be a number");
            assert(isFinite(min), "wrap: 2nd param must be a number");
            assert(isFinite(max), "wrap: 3rd param must be a number");
            assert(
              max > min,
              "randi: the 2nd param must be less than the 3rd param"
            );
            assert(
              max !== min,
              "randi: the 2nd param must be not equal to the 3rd param"
            );
          }
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
          if (true) {
            assert(isFinite(value), "map: 1st param must be a number");
            assert(isFinite(start1), "map: 2nd param must be a number");
            assert(isFinite(stop1), "map: 3rd param must be a number");
            assert(isFinite(start2), "map: 4th param must be a number");
            assert(isFinite(stop2), "map: 5th param must be a number");
          }
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
          if (true) {
            assert(isFinite(value), "norm: 1st param must be a number");
            assert(isFinite(start), "norm: 2nd param must be a number");
            assert(isFinite(stop), "norm: 3rd param must be a number");
          }
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
          if (true) {
            assert(isFinite(min), "rand: 1st param must be a number");
            assert(isFinite(max), "rand: 2nd param must be a number");
            assert(
              max > min,
              "rand: the 1st param must be less than the 2nd param"
            );
          }
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
          if (true) {
            assert(isFinite(min), "randi: 1st param must be a number");
            assert(isFinite(max), "randi: 2nd param must be a number");
            assert(
              max > min,
              "randi: the 1st param must be less than the 2nd param"
            );
          }
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
          if (true) {
            assert(
              null == value || isFinite(value) && value >= 0,
              "seed: 1st param must be a positive number or zero"
            );
          }
          return null == value ? _rng_seed : _rng_seed = ~~value;
        },
        /** BASIC GRAPHICS API */
        /**
         * Clear the game screen with an optional color
         *
         * @param {number?} color The background color (index) or null (for transparent)
         */
        cls(color) {
          if (true) {
            assert(
              null == color || isFinite(color) && color >= 0,
              "cls: 1st param must be a positive number or zero or null"
            );
          }
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
          if (true) {
            assert(isFinite(x), "rect: 1st param must be a number");
            assert(isFinite(y), "rect: 2nd param must be a number");
            assert(
              isFinite(width) && width > 0,
              "rect: 3rd param must be a positive number"
            );
            assert(
              isFinite(height) && height >= 0,
              "rect: 4th param must be a positive number or zero"
            );
            assert(
              null == color || isFinite(color) && color >= 0,
              "rect: 5th param must be a positive number or zero"
            );
            assert(
              null == radii || isFinite(radii) || Array.isArray(radii) && radii.length >= 1,
              "rect: 6th param must be a number or array of numbers"
            );
          }
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
          if (true) {
            assert(isFinite(x), "rectfill: 1st param must be a number");
            assert(isFinite(y), "rectfill: 2nd param must be a number");
            assert(
              isFinite(width) && width >= 0,
              "rectfill: 3rd param must be a positive number or zero"
            );
            assert(
              isFinite(height) && height >= 0,
              "rectfill: 4th param must be a positive number or zero"
            );
            assert(
              null == color || isFinite(color) && color >= 0,
              "rectfill: 5th param must be a positive number or zero"
            );
            assert(
              null == radii || isFinite(radii) || Array.isArray(radii) && radii.length >= 1,
              "rectfill: 6th param must be a number or array of at least 2 numbers"
            );
          }
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
          if (true) {
            assert(isFinite(x), "circ: 1st param must be a number");
            assert(isFinite(y), "circ: 2nd param must be a number");
            assert(
              isFinite(radius) && radius >= 0,
              "circ: 3rd param must be a positive number or zero"
            );
            assert(
              null == color || isFinite(color) && color >= 0,
              "circ: 4th param must be a positive number or zero"
            );
          }
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
          if (true) {
            assert(isFinite(x), "circfill: 1st param must be a number");
            assert(isFinite(y), "circfill: 2nd param must be a number");
            assert(
              isFinite(radius) && radius >= 0,
              "circfill: 3rd param must be a positive number or zero"
            );
            assert(
              null == color || isFinite(color) && color >= 0,
              "circfill: 4th param must be a positive number or zero"
            );
          }
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
          if (true) {
            assert(isFinite(x1), "line: 1st param must be a number");
            assert(isFinite(y1), "line: 2nd param must be a number");
            assert(
              isFinite(x2),
              "line: 3rd param must be a positive number or zero"
            );
            assert(
              isFinite(y2),
              "line: 4th param must be a positive number or zero"
            );
            assert(
              null == color || isFinite(color) && color >= 0,
              "line: 5th param must be a positive number or zero"
            );
          }
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
          if (true) {
            assert(
              isFinite(value) && ~~value > 0,
              "linewidth: 1st param must be a positive number"
            );
          }
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
          if (true) {
            assert(
              Array.isArray(segments) && segments.length > 0,
              "linedash: 1st param must be an array of numbers"
            );
            assert(isFinite(offset), "linedash: 2nd param must be a number");
          }
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
          if (true) {
            assert(isFinite(x), "text: 1st param must be a number");
            assert(isFinite(y), "text: 2nd param must be a number");
            assert(
              null == color || isFinite(color) && color >= 0,
              "text: 4th param must be a positive number or zero"
            );
            assert(
              "string" === typeof fontStyle,
              "text: 5th param must be a string"
            );
          }
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
          if (true) {
            assert(
              "string" === typeof family,
              "textfont: 1st param must be a string"
            );
          }
          _fontFamily = family;
        },
        /**
         * Set the font size
         *
         * @param {number} size
         */
        textsize(size) {
          if (true) {
            assert(isFinite(size), "textsize: 1st param must be a number");
          }
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
          if (true) {
            assert(
              null == align || ["left", "right", "center", "start", "end"].includes(
                align
              ),
              "textalign: 1st param must be a string"
            );
            assert(
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
          }
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
          if (true) {
            assert(isFinite(x), "image: 1st param must be a number");
            assert(isFinite(y), "image: 2nd param must be a number");
          }
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
          if (true) {
            assert(isFinite(width), "paint: 1st param must be a number");
            assert(isFinite(height), "paint: 2nd param must be a number");
            assert(
              "function" === typeof drawing || Array.isArray(drawing),
              "paint: 3rd param must be a function or array"
            );
            assert(
              options && !options.scale || isFinite(options.scale),
              "paint: 4th param (options.scale) must be a number"
            );
          }
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
          if (true) {
          }
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
          if (true) {
            assert(isFinite(x), "translate: 1st param must be a number");
            assert(isFinite(y), "translate: 2nd param must be a number");
          }
          return _ctx.translate(~~x, ~~y);
        },
        /**
         * Adds a scaling transformation to the canvas units horizontally and/or vertically.
         *
         * @param {number} x
         * @param {number} [y]
         */
        scale: (x, y) => {
          if (true) {
            assert(isFinite(x), "scale: 1st param must be a number");
            assert(
              y == null || isFinite(y),
              "scale: 2nd param must be a number"
            );
          }
          return _ctx.scale(x, y || x);
        },
        /**
         * Adds a rotation to the transformation matrix.
         *
         * @param {number} radians
         */
        rotate: (radians) => {
          if (true) {
            assert(isFinite(radians), "rotate: 1st param must be a number");
          }
          return _ctx.rotate(radians);
        },
        /**
         * Sets the alpha (opacity) value to apply when drawing new shapes and images
         *
         * @param {number} value float from 0 to 1 (e.g: 0.5 = 50% transparent)
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
         */
        alpha(value) {
          if (true) {
            assert(isFinite(value), "alpha: 1st param must be a number");
          }
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
          if (true) {
            assert(
              null == arg || "string" === typeof arg || arg instanceof Path2D,
              "path: 1st param must be a string or a Path2D instance"
            );
          }
          return new Path2D(arg);
        },
        /**
         * Fills the current or given path with a given color.
         *
         * @param {number} [color=0]
         * @param {Path2D} [path]
         */
        fill(color, path2) {
          if (true) {
            assert(
              null == color || isFinite(color) && color >= 0,
              "fill: 1st param must be a positive number or zero"
            );
            assert(
              null == path2 || path2 instanceof Path2D,
              "fill: 2nd param must be a Path2D instance"
            );
          }
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
          if (true) {
            assert(
              null == color || isFinite(color) && color >= 0,
              "stroke: 1st param must be a positive number or zero"
            );
            assert(
              null == path2 || path2 instanceof Path2D,
              "stroke: 2nd param must be a Path2D instance"
            );
          }
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
          if (true) {
            assert(
              path2 instanceof Path2D,
              "clip: 1st param must be a Path2D instance"
            );
          }
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
          if (true) {
            assert(
              null == zzfxParams || Array.isArray(zzfxParams),
              "sfx: 1st param must be an array"
            );
            assert(isFinite(pitchSlide), "sfx: 2nd param must be a number");
            assert(
              isFinite(volumeFactor),
              "sfx: 3rd param must be a number"
            );
          }
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
          if (true) {
            assert(isFinite(value), "volume: 1st param must be a number");
          }
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
          if (true) {
            assert(isFinite(x1), "colrect: 1st param must be a number");
            assert(isFinite(y1), "colrect: 2nd param must be a number");
            assert(isFinite(w1), "colrect: 3rd param must be a number");
            assert(isFinite(h1), "colrect: 4th param must be a number");
            assert(isFinite(x2), "colrect: 5th param must be a number");
            assert(isFinite(y2), "colrect: 6th param must be a number");
            assert(isFinite(w2), "colrect: 7th param must be a number");
            assert(isFinite(h2), "colrect: 8th param must be a number");
          }
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
          if (true) {
            assert(isFinite(x1), "colcirc: 1st param must be a number");
            assert(isFinite(y1), "colcirc: 2nd param must be a number");
            assert(isFinite(r1), "colcirc: 3rd param must be a number");
            assert(isFinite(x2), "colcirc: 4th param must be a number");
            assert(isFinite(y2), "colcirc: 5th param must be a number");
            assert(isFinite(r2), "colcirc: 6th param must be a number");
          }
          return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) <= (r1 + r2) * (r1 + r2);
        },
        /** PLUGINS API */
        /**
         * Prepares a plugin to be loaded
         *
         * @param {pluginCallback} callback
         */
        use(callback, config = {}) {
          if (true) {
            assert(
              "function" === typeof callback,
              "use: 1st param must be a function"
            );
            assert(
              "object" === typeof config,
              "use: 2nd param must be an object"
            );
          }
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
          if (true) {
            assert(
              "string" === typeof eventName,
              "listen: 1st param must be a string"
            );
            assert(
              "function" === typeof callback,
              "listen: 2nd param must be a function"
            );
          }
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
          if (true) {
            assert(
              "string" === typeof eventName,
              "emit: 1st param must be a string"
            );
          }
          triggerEvent("before:" + eventName, arg1, arg2, arg3, arg4);
          triggerEvent(eventName, arg1, arg2, arg3, arg4);
          triggerEvent("after:" + eventName, arg1, arg2, arg3, arg4);
        },
        /**
         * Get a color by index
         *
         * @param {number} [index=0] The color number
         * @returns {string} the color code
         */
        getcolor: (index) => {
          if (true) {
            assert(
              null == index || isFinite(index) && index >= 0,
              "getcolor: 1st param must be a number"
            );
          }
          return colors[~~index % colors.length];
        },
        /**
         * Create or update a instance variable
         *
         * @param {string} key
         * @param {*} value
         */
        setvar(key, value) {
          if (true) {
            assert(
              "string" === typeof key,
              "setvar: 1st param must be a string"
            );
            if (value == null) {
            }
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
          if (true) {
            assert(isFinite(width), "resize: 1st param must be a number");
            assert(isFinite(height), "resize: 2nd param must be a number");
          }
          instance.setvar("WIDTH", _canvas.width = width);
          instance.setvar("HEIGHT", _canvas.height = height);
          pageResized();
        },
        /**
         * The scale of the game's delta time (dt).
         * Values higher than 1 increase the speed of time, while values smaller than 1 decrease it.
         * A value of 0 freezes time and is effectively equivalent to pausing.
         *
         * @param {number} value
         */
        timescale(value) {
          if (true) {
            assert(isFinite(value), "timescale: 1st param must be a number");
          }
          _timeScale = value;
        },
        /**
         * Set the target FPS at runtime.
         *
         * @param {number} value
         */
        setfps(value) {
          if (true) {
            assert(
              isFinite(value) && value >= 1,
              "setfps: 1st param must be a positive number"
            );
          }
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
        if (_fullscreen || _autoscale) {
          on(root, "resize", pageResized);
        }
        pageResized();
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
          }, _checkTapped = (tap) => tap && performance.now() - tap.ts <= 200;
          let _pressingMouse = false;
          on(_canvas, "mousedown", (ev) => {
            ev.preventDefault();
            const [x, y] = _getXY(ev.pageX, ev.pageY);
            instance.emit("tap", x, y, 0);
            _registerTap(0, x, y);
            _pressingMouse = true;
          });
          on(_canvas, "mousemove", (ev) => {
            ev.preventDefault();
            const [x, y] = _getXY(ev.pageX, ev.pageY);
            instance.setvar("MOUSEX", x);
            instance.setvar("MOUSEY", y);
            if (!_pressingMouse) return;
            instance.emit("tapping", x, y, 0);
            _updateTap(0, x, y);
          });
          on(_canvas, "mouseup", (ev) => {
            ev.preventDefault();
            const tap = _taps.get(0);
            const [x, y] = _getXY(ev.pageX, ev.pageY);
            if (_checkTapped(tap)) {
              instance.emit("tapped", tap.startX, tap.startY, 0);
            }
            instance.emit("untap", x, y, 0);
            _taps.delete(0);
            _pressingMouse = false;
          });
          on(_canvas, "touchstart", (ev) => {
            ev.preventDefault();
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch.pageX, touch.pageY);
              instance.emit("tap", x, y, touch.identifier + 1);
              _registerTap(touch.identifier + 1, x, y);
            }
          });
          on(_canvas, "touchmove", (ev) => {
            ev.preventDefault();
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch.pageX, touch.pageY);
              instance.emit("tapping", x, y, touch.identifier + 1);
              _updateTap(touch.identifier + 1, x, y);
            }
          });
          const _touchEndHandler = (ev) => {
            ev.preventDefault();
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
          const _keys = /* @__PURE__ */ new Set();
          const iskeydown = (key) => {
            if (true) {
              assert(
                "string" === typeof key,
                "iskeydown: 1st param must be a string"
              );
            }
            return "any" === key ? _keys.size > 0 : _keys.has(key.toLowerCase());
          };
          instance.setvar("iskeydown", iskeydown);
          on(root, "keydown", (event) => {
            _keys.add(event.key.toLowerCase());
          });
          on(root, "keyup", (event) => {
            _keys.delete(event.key.toLowerCase());
          });
          on(root, "blur", () => _keys.clear());
        }
        if (settings.pauseOnBlur) {
          on(root, "blur", () => {
            _rafid = cancelAnimationFrame(_rafid);
          });
          on(root, "focus", () => {
            if (!_rafid) {
              _lastFrameTime = performance.now();
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
        _accumulated += frameTime;
        _lastFrameTime = now;
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
        if (updated) {
          instance.textalign("start", "top");
          instance.emit("draw");
        }
      }
      function setupCanvas() {
        _canvas = "string" === typeof _canvas ? document.querySelector(_canvas) : _canvas;
        instance.setvar("CANVAS", _canvas);
        _ctx = _canvas.getContext("2d");
        on(_canvas, "click", () => root.focus());
        if (instance.WIDTH > 0) {
          _fullscreen = false;
        }
        _canvas.style = "";
        _canvas.width = instance.WIDTH;
        _canvas.height = instance.HEIGHT || instance.WIDTH;
        if (!_canvas.parentNode) document.body.appendChild(_canvas);
      }
      function pageResized() {
        const pageWidth = root.innerWidth, pageHeight = root.innerHeight, styles = _canvas.style;
        styles.display = "block";
        if (_fullscreen) {
          styles.position = "absolute";
          styles.inset = 0;
          instance.setvar("WIDTH", _canvas.width = pageWidth);
          instance.setvar("HEIGHT", _canvas.height = pageHeight);
        } else if (_autoscale) {
          styles.margin = "auto";
          _scale = Math.min(
            pageWidth / instance.WIDTH,
            pageHeight / instance.HEIGHT
          );
          _scale = (settings.pixelart ? ~~_scale : _scale) || 1;
          styles.width = instance.WIDTH * _scale + "px";
          styles.height = instance.HEIGHT * _scale + "px";
        }
        instance.setvar("CENTERX", instance.WIDTH / 2);
        instance.setvar("CENTERY", instance.HEIGHT / 2);
        if (!settings.antialias || settings.pixelart) {
          _ctx.imageSmoothingEnabled = false;
          _canvas.style.imageRendering = "pixelated";
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
        if ("object" === typeof pluginData) {
          for (const key of Object.keys(pluginData)) {
            instance.setvar(key, pluginData[key]);
          }
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
    var mt = Object.defineProperty;
    var ft = (e, t) => {
      for (var r in t) mt(e, r, { get: t[r], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var X = {};
    ft(X, { ANCHOR_BOT_LEFT: () => Wt, ANCHOR_BOT_RIGHT: () => zt, ANCHOR_CENTER: () => Yt, ANCHOR_TOP_LEFT: () => K, ANCHOR_TOP_RIGHT: () => Nt, Actor: () => O, BACK_IN: () => $t, BACK_IN_OUT: () => Kt, BACK_OUT: () => Zt, BOUNCE_IN: () => ot, BOUNCE_IN_OUT: () => te, BOUNCE_OUT: () => C, Camera: () => D, DOWN: () => Rt, EASE_IN: () => jt, EASE_IN_OUT: () => qt, EASE_OUT: () => Gt, ELASTIC_IN: () => Jt, ELASTIC_IN_OUT: () => vt, ELASTIC_OUT: () => Qt, Grid: () => w, LEFT: () => Xt, LINEAR: () => nt, Noise: () => R, ONE: () => kt, RIGHT: () => St, TypedGrid: () => B, UP: () => Ct, Vector: () => y, ZERO: () => Z, advance: () => et, diff: () => J, dist: () => at, flipImage: () => pt, fract: () => v, intersection: () => T, mag: () => it, mod: () => rt, range: () => tt, resolve: () => N, roundd: () => st, scaleImage: () => ct, tint: () => lt, tween: () => Ft, vec: () => n, vecAbs: () => Ut, vecAdd: () => A, vecAngle: () => It, vecAngleBetween: () => Tt, vecCeil: () => Bt, vecClamp: () => Pt, vecCross: () => wt, vecDist: () => yt, vecDist2: () => Et, vecDiv: () => L, vecDot: () => $, vecEq: () => V, vecFloor: () => Vt, vecIsZero: () => Ot, vecLerp: () => Lt, vecLimit: () => Dt, vecMag: () => G, vecMag2: () => q, vecMove: () => Ht, vecMult: () => E, vecNorm: () => H, vecRand: () => Mt, vecReflect: () => xt, vecRotate: () => dt, vecRound: () => At, vecSet: () => j, vecSetMag: () => gt, vecSub: () => P, wave: () => Q });
    var T = (e, t, r, s, a, i, o, h) => {
      let u = Math.max(e, a), b = Math.min(e + r, a + o) - u, c = Math.max(t, i), d = Math.min(t + s, i + h) - c;
      return [u, c, b, d];
    };
    var N = (e, t, r, s, a, i, o, h) => {
      let [u, b, c, d] = T(e, t, r, s, a, i, o, h), _ = "", g = e, l = t;
      return c < d ? e < a ? (_ = "right", g = a - r) : (_ = "left", g = a + o) : t < i ? (_ = "bottom", l = i - s) : (_ = "top", l = i + h), { direction: _, x: g, y: l };
    };
    var D = class {
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
      constructor(t = null, r = 0, s = 0, a = null, i = null) {
        this._engine = t || globalThis, this.ox = r, this.oy = s, this.resize(a || this._engine.WIDTH - r, i || this._engine.HEIGHT - s), this.x = this.width / 2, this.y = this.height / 2;
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
        let a = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, r = (r - this.height / 2 - this.oy) / this.scale, s.x = a * t - i * r + this.x, s.y = i * t + a * r + this.y, s;
      }
      getCameraPoint(t, r, s = {}) {
        let a = Math.cos(-this.rotation), i = Math.sin(-this.rotation);
        return t = t - this.x, r = r - this.y, t = a * t - i * r, r = i * t + a * r, s.x = t * this.scale + this.width / 2 + this.ox, s.y = r * this.scale + this.height / 2 + this.oy, s;
      }
      getBounds() {
        return [this.ox, this.oy, this.width, this.height];
      }
      viewing(t, r, s, a) {
        let i = this.width / 2 - this.x, o = this.height / 2 - this.y, h = this.width / this.scale, u = this.height / this.scale;
        return this._engine.colrect(t, r, s, a, i, o, h, u);
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
    var w = class e {
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
        let s = r ? this.length - 1 : 0, a = r ? -1 : this.length, i = r ? -1 : 1;
        for (; s !== a; ) {
          let o = this.indexToPointX(s), h = this.indexToPointY(s), u = this._c[s];
          if (t(o, h, u, this) === false) break;
          s += i;
        }
      }
      fill(t) {
        this.forEach((r, s) => {
          this.set(r, s, t);
        });
      }
      clampX(t) {
        return W(t, 0, this._w - 1);
      }
      clampY(t) {
        return W(t, 0, this._h - 1);
      }
      toArray() {
        return this._c.slice();
      }
      toString(t = " ", r = true) {
        if (!r) return this._c.join(t);
        let s = [];
        return this.forEach((a, i, o) => {
          s[i] = s[i] || "", s[i] += o + t;
        }), s.join(`
`);
      }
    }, B = class e extends w {
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
    function W(e, t, r) {
      return e < t ? t : e > r ? r : e;
    }
    var _t = Math.sqrt, z = Math.cos, F = Math.sin, bt = 2 * Math.PI, y = class {
      x;
      y;
      constructor(t = 0, r = t) {
        this.x = t, this.y = r;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, x = (e) => e instanceof y, n = (e = 0, t = e) => (x(e) && (t = e.y, e = e.x), new y(e, t)), V = (e, t, r = t) => x(t) ? V(e, t.x, t.y) : e.x === t && e.y === r, j = (e, t, r = t) => (x(t) ? j(e, t.x, t.y) : (e.x = t, e.y = r), e), A = (e, t, r = t) => x(t) ? A(e, t.x, t.y) : (e.x += t, e.y += r, e), P = (e, t, r = t) => x(t) ? P(e, t.x, t.y) : (e.x -= t, e.y -= r, e), E = (e, t, r = t) => x(t) ? E(e, t.x, t.y) : (e.x *= t, e.y *= r, e), L = (e, t, r = t) => x(t) ? L(e, t.x, t.y) : (e.x /= t || 1, e.y /= r || 1, e), dt = (e, t) => {
      let r = z(t), s = F(t);
      return e.x = r * e.x - s * e.y, e.y = s * e.x + r * e.y, e;
    }, xt = (e, t) => {
      let r = H(n(t));
      return P(e, E(r, 2 * $(e, r)));
    }, gt = (e, t) => (H(e), E(e, t), e), G = (e) => Math.hypot(e.x, e.y), q = (e) => e.x * e.x + e.y * e.y, H = (e) => {
      let t = G(e);
      return t > 0 && L(e, t), e;
    }, Dt = (e, t = 1) => {
      let r = q(e);
      return r > t * t && (L(e, _t(r)), E(e, t)), e;
    }, yt = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), Et = (e, t) => {
      let r = e.x - t.x, s = e.y - t.y;
      return r * r + s * s;
    }, It = (e) => Math.atan2(e.y, e.x), Tt = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), $ = (e, t) => e.x * t.x + e.y * t.y, wt = (e, t) => e.x * t.y - e.y * t.x, Lt = (e, t, r) => (e.x += (t.x - e.x) * r || 0, e.y += (t.y - e.y) * r || 0, e), Mt = (e = 1, t = e, r = globalThis.rand || Math.random) => {
      let s = r() * bt, a = r() * (t - e) + e;
      return n(z(s) * a, F(s) * a);
    }, Ut = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), Bt = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Vt = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), At = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Pt = (e, t, r) => (e.x < t.x && (e.x = t.x), e.x > r.x && (e.x = r.x), e.y < t.y && (e.y = t.y), e.y > r.y && (e.y = r.y), e), Ht = (e, t, r = 1) => A(e, t.x * r, t.y * r), Ot = (e) => V(e, Z), Z = n(0, 0), kt = n(1, 1), Ct = n(0, -1), St = n(1, 0), Rt = n(0, 1), Xt = n(-1, 0);
    var Yt = n(0.5, 0.5), K = n(0, 0), Nt = n(1, 0), Wt = n(0, 1), zt = n(1, 1), O = class {
      sprite;
      pos;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, r, s = K) {
        this.sprite = t, this.pos = r || n(0), this._o = n(s), this._s = n(1, 1);
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
        let r = this.sprite.width * (t ? this._s.x : 1), s = this.sprite.height * (t ? this._s.y : 1), a = this.pos.x - r * this.anchor.x, i = this.pos.y - s * this.anchor.y;
        return [a, i, r, s];
      }
      draw(t = globalThis, r = true) {
        this.hidden || this.opacity <= 0 || (r && t.push(), this.transform(t), this.drawImage(t), r && t.pop());
      }
      transform(t) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t, r = true) {
        let s = this.anchor, a = -this.sprite.width * (this.flipX ? 1 - s.x : s.x), i = -this.sprite.height * (this.flipY ? 1 - s.y : s.y);
        r && t.alpha(this.opacity), t.image(a, i, this.sprite);
      }
    };
    var J = (e, t) => Math.abs(t - e) || 0;
    var Q = (e, t, r, s = Math.sin) => e + (s(r) + 1) / 2 * (t - e);
    var v = (e) => e % 1 || 0;
    var tt = (e) => Array.from(Array(e).keys());
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
    var it = (e, t) => Math.hypot(e, t);
    var M = Math.PI / 2, Ft = (e, t, r, s = 1, a = nt) => new k(e, t, r, s, a), nt = (e) => e, jt = (e) => e * e, Gt = (e) => -e * (e - 2), qt = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, $t = (e) => e * e * e - e * Math.sin(e * Math.PI), Zt = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, Kt = (e) => {
      if (e < 0.5) {
        let r = 2 * e;
        return 0.5 * (r * r * r - r * Math.sin(r * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, Jt = (e) => Math.sin(13 * M * e) * Math.pow(2, 10 * (e - 1)), Qt = (e) => Math.sin(-13 * M * (e + 1)) * Math.pow(2, -10 * e) + 1, vt = (e) => {
      if (e < 0.5) {
        let s = Math.sin(13 * M * (2 * e)), a = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * s * a;
      }
      let t = Math.sin(-13 * M * (2 * e - 1 + 1)), r = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * r + 2);
    }, ot = (e) => 1 - C(1 - e), C = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, te = (e) => e < 0.5 ? 0.5 * ot(e * 2) : 0.5 * C(e * 2 - 1) + 0.5, k = class {
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
      constructor(t, r, s, a, i) {
        this._o = t, this._p = r, this._x = s, this._d = a, this._e = i, this._w = 0;
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
          let i = this._t - this._w;
          this._o[this._p] = this._lc.lerp(r, s, this._e(i / this._d)), this._t += a, i >= this._d && (this._o[this._p] = s, this.stop());
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
    var ht = 4, U = 1 << ht, ut = 8, ee = 1 << ut, f = 4095, S = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), R = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, r = 0, s = 0) {
        t < 0 && (t = -t), r < 0 && (r = -r), s < 0 && (s = -s);
        let a = Math.floor(t), i = Math.floor(r), o = Math.floor(s), h = t - a, u = r - i, b = s - o, c, d, _ = 0, g = 0.5, l, p, I;
        for (let Y = 0; Y < this._po; Y++) {
          let m = a + (i << ht) + (o << ut);
          c = S(h), d = S(u), l = this._p[m & f], l += c * (this._p[m + 1 & f] - l), p = this._p[m + U & f], p += c * (this._p[m + U + 1 & f] - p), l += d * (p - l), m += ee, p = this._p[m & f], p += c * (this._p[m + 1 & f] - p), I = this._p[m + U & f], I += c * (this._p[m + U + 1 & f] - I), p += d * (I - p), l += S(b) * (p - l), _ += l * g, g *= this._pf, a <<= 1, h *= 2, i <<= 1, u *= 2, o <<= 1, b *= 2, h >= 1 && (a++, h--), u >= 1 && (i++, u--), b >= 1 && (o++, b--);
        }
        return _;
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
    var lt = (e, t, r = 1, s = globalThis) => s.paint(e.width, e.height, (a) => {
      s.push(), s.alpha(r), s.rectfill(0, 0, e.width, e.height, t), a.globalCompositeOperation = "destination-atop", s.alpha(1), s.image(0, 0, e), s.pop();
    });
    var ct = (e, t, r = true, s = globalThis) => s.paint(e.width * t, e.height * t, (a) => {
      s.push(), a.imageSmoothingEnabled = !r, s.scale(t), s.image(0, 0, e), s.pop();
    });
    var pt = (e, t = true, r = false, s = globalThis) => s.paint(e.width, e.height, (a) => {
      s.push(), s.scale(t ? -1 : 1, r ? -1 : 1), s.image(t ? -e.width : 0, r ? -e.height : 0, e), s.pop();
    });
    globalThis.utils = Object.assign(globalThis.utils || {}, X);
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
