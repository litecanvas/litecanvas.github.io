(() => {
  // public/js/litecanvas.js
  (() => {
    var setupZzFX = (global) => {
      global.zzfxX = new AudioContext();
      global.zzfxV = 1;
      return (i = 1, d = 0.05, z = 220, e = 0, P = 0, S = 0.1, I = 0, c = 1, T = 0, H = 0, V = 0, J = 0, h = 0, j = 0, K = 0, E = 0, r = 0, B = 1, X = 0, L = 0, D = 0) => {
        let n = Math, t = 2 * n.PI, a = 44100, F = T *= 500 * t / a / a, O = z *= (1 - d + 2 * d * n.random(d = [])) * t / a, x = 0, _ = 0, f = 0, g = 1, $ = 0, l = 0, o = 0, s = D < 0 ? -1 : 1, u = t * s * D * 2 / a, G = n.cos(u), C = n.sin, Q = C(u) / 4, M = 1 + Q, m = -2 * G / M, y = (1 - Q) / M, R = (1 + s * G) / 2 / M, A = -(s + G) / M, v = R, U = 0, W = 0, Y = 0, Z = 0;
        for (e = a * e + 9, X *= a, P *= a, S *= a, r *= a, H *= 500 * t / a ** 3, K *= t / a, V *= t / a, J *= a, h = a * h | 0, i *= 0.3 * zzfxV, s = e + X + P + S + r | 0; f < s; d[f++] = o * i)
          ++l % (100 * E | 0) || (o = I ? 1 < I ? 2 < I ? 3 < I ? C(x * x) : n.max(n.min(n.tan(x), 1), -1) : 1 - (2 * x / t % 2 + 2) % 2 : 1 - 4 * n.abs(n.round(x / t) - x / t) : C(x), o = (h ? 1 - L + L * C(t * f / h) : 1) * (o < 0 ? -1 : 1) * n.abs(o) ** c * (f < e ? f / e : f < e + X ? 1 - (f - e) / X * (1 - B) : f < e + X + P ? B : f < s - r ? (s - f - r) / S * B : 0), o = r ? o / 2 + (r > f ? 0 : (f < s - r ? 1 : (s - f) / r) * d[f - r | 0] / 2 / i) : o, D && (o = Z = v * U + A * (U = W) + R * (W = o) - y * Y - m * (Y = Z))), u = (z += T += H) * n.cos(K * _++), x += u + u * j * C(f ** 5), g && ++g > J && (z += V, O += V, g = 0), !h || ++$ % h || (z = O, T = F, g = g || 1);
        i = zzfxX.createBuffer(1, s, a), i.getChannelData(0).set(d), z = zzfxX.createBufferSource(), z.buffer = i, z.connect(zzfxX.destination), z.start();
      };
    };
    var defaultPalette = ["#211e20", "#555568", "#a0a08b", "#e9efec"];
    var assert = (condition, message = "Assertion failed") => {
      if (!condition) throw new Error("[Litecanvas] " + message);
    };
    var version = "0.403.0";
    var mulberry32 = (seed) => {
      return () => {
        let t = seed += 1831565813;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    };
    function litecanvas(settings = {}) {
      const root = window, math = Math, perf = performance, TAU = math.PI * 2, raf = requestAnimationFrame, isNumber = Number.isFinite, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(
          () => elem.removeEventListener(evt, callback, false)
        );
      }, lowerCase = (str) => str.toLowerCase(), preventDefault = (ev) => ev.preventDefault(), beginPath = (c) => c.beginPath(), zzfx = setupZzFX(root), defaults = {
        width: null,
        height: null,
        autoscale: true,
        canvas: null,
        global: true,
        loop: null,
        tapEvents: true,
        keyboardEvents: true
      };
      DEV: assert(
        null == settings || "object" === typeof settings,
        "litecanvas() 1st argument must be a object"
      );
      settings = Object.assign(defaults, settings);
      let _loop = settings.loop, _initialized, _paused, _canvas, _canvasScale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _fpsInterval = 1e3 / 60, _accumulated, _rafid = 0, _defaultTextColor = 3, _fontFamily = "sans-serif", _fontSize = 20, _fontLineHeight = 1.2, _rngSeed = Date.now(), _rngNext = mulberry32(_rngSeed >>> 0), _currentPalette = defaultPalette, _lastPalette = defaultPalette, _colorPaletteState = [], _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _eventListeners = {};
      const instance = {
        W: 0,
        H: 0,
        T: 0,
        MX: -1,
        MY: -1,
        rand: (min = 0, max = 1) => {
          DEV: assert(isNumber(min), "rand() 1st argument must be a number");
          DEV: assert(isNumber(max), "rand() 2nd argument must be a number");
          DEV: assert(
            max >= min,
            "rand() the 1st argument must be less than the 2nd argument"
          );
          return min + _rngNext() * (max - min);
        },
        randi: (min = 0, max = 1) => {
          DEV: assert(isNumber(min), "randi() 1st argument must be a number");
          DEV: assert(isNumber(max), "randi() 2nd argument must be a number");
          DEV: assert(
            max >= min,
            "randi() the 1st argument must be less than the 2nd argument"
          );
          return ~~instance.rand(min, max + 1);
        },
        rseed(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            "rseed() 1st argument must be a non-negative integer"
          );
          _rngSeed = value;
          _rngNext = mulberry32(_rngSeed >>> 0);
        },
        TAU,
        lerp: (start, end, t) => {
          DEV: assert(isNumber(start), "lerp() 1st argument must be a number");
          DEV: assert(isNumber(end), "lerp() 2nd argument must be a number");
          DEV: assert(isNumber(t), "lerp() 3rd argument must be a number");
          return start + t * (end - start);
        },
        deg2rad: (degs) => {
          DEV: assert(isNumber(degs), "deg2rad() 1st argument must be a number");
          return math.PI / 180 * degs;
        },
        rad2deg: (rads) => {
          DEV: assert(isNumber(rads), "rad2deg() 1st argument must be a number");
          return 180 / math.PI * rads;
        },
        mod(a, b) {
          DEV: assert(isNumber(a), "mod() 1st argument must be a number");
          DEV: assert(
            isNumber(b) && b >= 0,
            "mod() 2nd argument must be a non-negative number"
          );
          return (a % b + b) % b || 0;
        },
        round: (n, precision = 0) => {
          DEV: assert(isNumber(n), "round() 1st argument must be a number");
          DEV: assert(
            isNumber(precision) && precision >= 0,
            "round() 2nd argument must be a non-negative number"
          );
          if (!precision) {
            return math.round(n);
          }
          const multiplier = 10 ** precision;
          return math.round(n * multiplier) / multiplier;
        },
        clamp: (value, min, max) => {
          DEV: assert(isNumber(value), "clamp() 1st argument must be a number");
          DEV: assert(isNumber(min), "clamp() 2nd argument must be a number");
          DEV: assert(isNumber(max), "clamp() 3rd argument must be a number");
          DEV: assert(
            max >= min,
            "clamp() the 2nd argument must be less than the 3rd argument"
          );
          if (value < min) return min;
          if (value > max) return max;
          return value;
        },
        dist: (x1, y1, x2, y2) => {
          DEV: assert(isNumber(x1), "dist() 1st argument must be a number");
          DEV: assert(isNumber(y1), "dist() 2nd argument must be a number");
          DEV: assert(isNumber(x2), "dist() 3rd argument must be a number");
          DEV: assert(isNumber(y2), "dist() 4th argument must be a number");
          return math.hypot(x2 - x1, y2 - y1);
        },
        wrap: (value, min, max) => {
          DEV: assert(isNumber(value), "wrap() 1st argument must be a number");
          DEV: assert(isNumber(min), "wrap() 2nd argument must be a number");
          DEV: assert(isNumber(max), "wrap() 3rd argument must be a number");
          DEV: assert(
            max > min,
            "wrap() the 2nd argument must be less than the 3rd argument"
          );
          return value - (max - min) * math.floor((value - min) / (max - min));
        },
        map(value, start1, stop1, start2, stop2, withinBounds) {
          DEV: assert(isNumber(value), "map() 1st argument must be a number");
          DEV: assert(isNumber(start1), "map() 2nd argument must be a number");
          DEV: assert(isNumber(stop1), "map() 3rd argument must be a number");
          DEV: assert(isNumber(start2), "map() 4th argument must be a number");
          DEV: assert(isNumber(stop2), "map() 5th argument must be a number");
          DEV: assert(
            stop1 !== start1,
            "map() the 2nd argument must be different than the 3rd argument"
          );
          const result = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
          return withinBounds ? instance.clamp(result, start2, stop2) : result;
        },
        norm: (value, start, stop) => {
          DEV: assert(isNumber(value), "norm() 1st argument must be a number");
          DEV: assert(isNumber(start), "norm() 2nd argument must be a number");
          DEV: assert(isNumber(stop), "norm() 3rd argument must be a number");
          DEV: assert(
            start !== stop,
            "norm() the 2nd argument must be different than the 3rd argument"
          );
          return instance.map(value, start, stop, 0, 1);
        },
        cls(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "cls() 1st argument must be a non-negative number or string"
          );
          if (null == color) {
            _ctx.clearRect(0, 0, instance.W, instance.H);
          } else {
            instance.rectfill(0, 0, instance.W, instance.H, color);
          }
        },
        rect(x, y, width, height, color, radii) {
          DEV: assert(isNumber(x), "rect() 1st argument must be a number");
          DEV: assert(isNumber(y), "rect() 2nd argument must be a number");
          DEV: assert(
            isNumber(width) && width > 0,
            "rect() 3rd argument must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "rect() 4th argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "rect() 5th argument must be a non-negative number or string"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            "rect() 6th argument must be a number or array of numbers"
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
        rectfill(x, y, width, height, color, radii) {
          DEV: assert(isNumber(x), "rectfill() 1st argument must be a number");
          DEV: assert(isNumber(y), "rectfill() 2nd argument must be a number");
          DEV: assert(
            isNumber(width) && width >= 0,
            "rectfill() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            "rectfill() 4th argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "rectfill() 5th argument must be a non-negative number or string"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            "rectfill() 6th argument must be a number or array of at least 2 numbers"
          );
          beginPath(_ctx);
          _ctx[radii ? "roundRect" : "rect"](~~x, ~~y, ~~width, ~~height, radii);
          instance.fill(color);
        },
        oval(x, y, radiusX, radiusY, color) {
          DEV: assert(isNumber(x), "oval() 1st argument must be a number");
          DEV: assert(isNumber(y), "oval() 2nd argument must be a number");
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            "oval() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            "oval() 4th argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "oval() 5th argument must be a non-negative number or string"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TAU);
          instance.stroke(color);
        },
        ovalfill(x, y, radiusX, radiusY, color) {
          DEV: assert(isNumber(x), "ovalfill() 1st argument must be a number");
          DEV: assert(isNumber(y), "ovalfill() 2nd argument must be a number");
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            "ovalfill() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            "ovalfill() 4th argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "ovalfill() 5th argument must be a non-negative number or string"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TAU);
          instance.fill(color);
        },
        circ(x, y, radius, color) {
          DEV: assert(isNumber(x), "circ() 1st argument must be a number");
          DEV: assert(isNumber(y), "circ() 2nd argument must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "circ() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "circ() 4th argument must be a non-negative number or string"
          );
          instance.oval(x, y, radius, radius, color);
        },
        circfill(x, y, radius, color) {
          DEV: assert(isNumber(x), "circfill() 1st argument must be a number");
          DEV: assert(isNumber(y), "circfill() 2nd argument must be a number");
          DEV: assert(
            isNumber(radius) && radius >= 0,
            "circfill() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "circfill() 4th argument must be a non-negative number or string"
          );
          instance.ovalfill(x, y, radius, radius, color);
        },
        shape(points) {
          DEV: assert(
            Array.isArray(points),
            "shape() 1st argument must be an array of numbers"
          );
          DEV: assert(
            points.length >= 6,
            "shape() 1st argument must be an array with at least 6 numbers (3 points)"
          );
          beginPath(_ctx);
          for (let i = 0; i < points.length; i += 2) {
            if (i) {
              _ctx.lineTo(~~points[i], ~~points[i + 1]);
            } else {
              _ctx.moveTo(~~points[i], ~~points[i + 1]);
            }
          }
          _ctx.lineTo(~~points[0], ~~points[1]);
        },
        line(x1, y1, x2, y2, color) {
          DEV: assert(isNumber(x1), "line() 1st argument must be a number");
          DEV: assert(isNumber(y1), "line() 2nd argument must be a number");
          DEV: assert(
            isNumber(x2),
            "line() 3rd argument must be a non-negative number"
          );
          DEV: assert(
            isNumber(y2),
            "line() 4th argument must be a non-negative number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "line() 5th argument must be a non-negative number or string"
          );
          beginPath(_ctx);
          let xfix = _outline_fix && ~~x1 === ~~x2 ? 0.5 : 0;
          let yfix = _outline_fix && ~~y1 === ~~y2 ? 0.5 : 0;
          _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix);
          _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix);
          instance.stroke(color);
        },
        linewidth(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            "linewidth() 1st argument must be a non-negative integer"
          );
          _ctx.lineWidth = ~~value;
          _outline_fix = ~~value % 2 ? 0.5 : 0;
        },
        linedash(segments, offset = 0) {
          DEV: assert(
            Array.isArray(segments) && segments.length > 0,
            "linedash() 1st argument must be an array of numbers"
          );
          DEV: assert(
            isNumber(offset),
            "linedash() 2nd argument must be a number"
          );
          _ctx.setLineDash(segments);
          _ctx.lineDashOffset = offset;
        },
        text(x, y, message, color = _defaultTextColor, fontStyle = "normal") {
          DEV: assert(isNumber(x), "text() 1st argument must be a number");
          DEV: assert(isNumber(y), "text() 2nd argument must be a number");
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "text() 4th argument must be a non-negative number or string"
          );
          DEV: assert(
            "string" === typeof fontStyle,
            "text() 5th argument must be a string"
          );
          _ctx.font = `${fontStyle} ${_fontSize}px ${_fontFamily}`;
          _ctx.fillStyle = getColor(color);
          const messages = ("" + message).split("\n");
          for (let i = 0; i < messages.length; i++) {
            _ctx.fillText(
              messages[i],
              ~~x,
              ~~y + _fontSize * _fontLineHeight * i
            );
          }
        },
        textgap(value) {
          DEV: assert(isNumber(value), "textgap() 1st argument must be a number");
          _fontLineHeight = value;
        },
        textfont(family) {
          DEV: assert(
            "string" === typeof family,
            "textfont() 1st argument must be a string"
          );
          _fontFamily = family;
        },
        textsize(size) {
          DEV: assert(isNumber(size), "textsize() 1st argument must be a number");
          _fontSize = size;
        },
        textalign(align, baseline) {
          DEV: assert(
            null == align || ["left", "right", "center", "start", "end"].includes(align),
            "textalign() 1st argument must be null or one of the following strings: center, left, right, start or end."
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
            "textalign() 2nd argument must be null or one of the following strings: middle, top, bottom, hanging, alphabetic or ideographic."
          );
          if (align) _ctx.textAlign = align;
          if (baseline) _ctx.textBaseline = baseline;
        },
        image(x, y, source) {
          DEV: assert(isNumber(x), "image() 1st argument must be a number");
          DEV: assert(isNumber(y), "image() 2nd argument must be a number");
          _ctx.drawImage(source, ~~x, ~~y);
        },
        spr(x, y, pixels) {
          DEV: assert(isNumber(x), "spr() 1st argument must be a number");
          DEV: assert(isNumber(y), "spr() 2nd argument must be a number");
          DEV: assert(
            "string" === typeof pixels,
            "spr() 3rd argument must be a string"
          );
          const rows = pixels.replace(/[^\w.\n]/g, "").split("\n").filter((s) => s);
          for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
              if (rows[i][j] !== ".") {
                instance.rectfill(
                  x + j,
                  y + i,
                  1,
                  1,
                  parseInt(rows[i][j], 36) || 0
                );
              }
            }
          }
        },
        paint(width, height, callback, options = {}) {
          DEV: assert(
            isNumber(width) && width >= 1,
            "paint() 1st argument must be a number >= 1"
          );
          DEV: assert(
            isNumber(height) && height >= 1,
            "paint() 2nd argument must be a number >= 1"
          );
          DEV: assert(
            "function" === typeof callback,
            "paint() 3rd argument must be a function"
          );
          DEV: assert(
            options && null == options.scale || isNumber(options.scale) && options.scale > 0,
            "paint() 4th argument (options.scale) must be a positive number"
          );
          DEV: assert(
            options && null == options.canvas || options.canvas instanceof OffscreenCanvas,
            "paint() 4th argument (options.canvas) must be an OffscreenCanvas"
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
        ctx(context) {
          DEV: assert(
            null == context || context instanceof CanvasRenderingContext2D || context instanceof OffscreenCanvasRenderingContext2D,
            "ctx() 1st argument must be an [Offscreen]CanvasRenderingContext2D"
          );
          if (context) {
            _ctx = context;
          }
          return _ctx;
        },
        push(translateX = 0, translateY = translateX, rotation = 0, scaleX = 1, scaleY = scaleX) {
          DEV: assert(
            isNumber(translateX),
            "push() 1st argument must be a number"
          );
          DEV: assert(
            isNumber(translateY),
            "push() 2nd argument must be a number"
          );
          DEV: assert(isNumber(rotation), "push() 3rd argument must be a number");
          DEV: assert(isNumber(scaleX), "push() 4th argument must be a number");
          DEV: assert(isNumber(scaleY), "push() 5th argument must be a number");
          _ctx.save();
          instance.translate(translateX, translateY);
          instance.rotate(rotation);
          instance.scale(scaleX, scaleY);
        },
        pop() {
          _ctx.restore();
        },
        translate(x, y) {
          DEV: assert(isNumber(x), "translate() 1st argument must be a number");
          DEV: assert(isNumber(y), "translate() 2nd argument must be a number");
          _ctx.translate(~~x, ~~y);
        },
        scale(x, y = x) {
          DEV: assert(isNumber(x), "scale() 1st argument must be a number");
          DEV: assert(isNumber(y), "scale() 2nd argument must be a number");
          _ctx.scale(x, y);
        },
        rotate(radians) {
          DEV: assert(
            isNumber(radians),
            "rotate() 1st argument must be a number"
          );
          _ctx.rotate(radians);
        },
        alpha(value) {
          DEV: assert(isNumber(value), "alpha() 1st argument must be a number");
          _ctx.globalAlpha = instance.clamp(value, 0, 1);
        },
        fill(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "fill() 1st argument must be a non-negative number or string"
          );
          _ctx.fillStyle = getColor(color);
          _ctx.fill();
        },
        stroke(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0 || "string" === typeof color,
            "stroke() 1st argument must be a non-negative number or string"
          );
          _ctx.strokeStyle = getColor(color);
          _ctx.stroke();
        },
        clip(callback) {
          DEV: assert(
            "function" === typeof callback,
            "clip() 1st argument must be a function (ctx) => void"
          );
          beginPath(_ctx);
          callback(_ctx);
          _ctx.clip();
        },
        sfx(zzfxParams, pitchSlide, volumeFactor) {
          DEV: assert(
            null == zzfxParams || Array.isArray(zzfxParams),
            "sfx() 1st argument must be an array"
          );
          DEV: assert(
            null == pitchSlide || isNumber(pitchSlide),
            "sfx() 2nd argument must be a number"
          );
          DEV: assert(
            null == volumeFactor || isNumber(volumeFactor),
            "sfx() 3rd argument must be a number"
          );
          if (!root.zzfxV || navigator.userActivation && !navigator.userActivation.hasBeenActive) {
            return false;
          }
          zzfxParams ||= _defaultSound;
          if (pitchSlide || volumeFactor >= 0) {
            zzfxParams = zzfxParams.slice();
            zzfxParams[0] = volumeFactor * (zzfxParams[0] || 1);
            zzfxParams[10] = ~~zzfxParams[10] + pitchSlide;
          }
          zzfx.apply(0, zzfxParams);
          return zzfxParams;
        },
        volume(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            "volume() 1st argument must be a non-negative number"
          );
          root.zzfxV = value;
        },
        canvas: () => _canvas,
        use(callback, config = {}) {
          DEV: assert(
            "function" === typeof callback,
            "use() 1st argument must be a function (instance, config) => any"
          );
          DEV: assert(
            "object" === typeof config,
            "use() 2nd argument must be an object"
          );
          loadPlugin(callback, config);
        },
        resize(width, height = width, autoscale) {
          DEV: assert(
            isNumber(width) && width >= 1,
            "resize() 1st argument must be a number >= 1"
          );
          DEV: assert(
            isNumber(height) && height >= 1,
            "resize() 2nd argument must be a number >= 1"
          );
          DEV: assert(
            null == autoscale || "boolean" === typeof autoscale || isNumber(autoscale) && autoscale > 1,
            "resize() 3rd argument must be a boolean or a number > 1"
          );
          settings.width = width;
          settings.height = height;
          settings.autoscale = null == autoscale ? settings.autoscale : autoscale;
          resizeCanvas();
        },
        listen: (eventName, callback) => {
          DEV: assert(
            "string" === typeof eventName,
            "listen() 1st argument must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            "listen() 2nd argument must be a function"
          );
          eventName = lowerCase(eventName);
          _eventListeners[eventName] = _eventListeners[eventName] || /* @__PURE__ */ new Set();
          _eventListeners[eventName].add(callback);
          return () => _eventListeners[eventName].delete(callback);
        },
        unlisten: (eventName, callback) => {
          DEV: assert(
            "string" === typeof eventName,
            "unlisten() 1st argument must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            "unlisten() 2nd argument must be a function"
          );
          eventName = lowerCase(eventName);
          if (_eventListeners[eventName]) {
            _eventListeners[eventName].delete(callback);
          }
        },
        emit(eventName, data1, data2, data3, data4) {
          DEV: assert(
            "string" === typeof eventName,
            "emit() 1st argument must be a string"
          );
          if (_initialized) {
            eventName = lowerCase(eventName);
            triggerEvent("before:" + eventName, data1, data2, data3, data4);
            if (!_loop && root[eventName] !== instance[eventName] && "function" === typeof root[eventName]) {
              root[eventName](data1, data2, data3, data4);
            }
            triggerEvent(eventName, data1, data2, data3, data4);
            triggerEvent("after:" + eventName, data1, data2, data3, data4);
          }
          return data1;
        },
        pal(colors, textColor = 3) {
          DEV: assert(
            null == colors || Array.isArray(colors) && colors.length > 0,
            "pal() 1st argument must be null or an array of colors"
          );
          DEV: assert(
            isNumber(textColor) && textColor >= 0,
            "pal() 2nd argument must be a non-negative number"
          );
          if (null == colors) {
            _currentPalette = _lastPalette;
          } else {
            _lastPalette = _currentPalette;
            _currentPalette = colors;
          }
          _colorPaletteState = [];
          _defaultTextColor = textColor;
          instance.emit("pal", _currentPalette, _defaultTextColor);
        },
        palc(a, b) {
          DEV: assert(
            null == a || isNumber(a) && a >= 0,
            "palc() 1st argument must be a positive number"
          );
          DEV: assert(
            isNumber(a) ? isNumber(b) && b >= 0 : null == b,
            "palc() 2nd argument must be a positive number"
          );
          if (null == a) {
            _colorPaletteState = [];
          } else {
            _colorPaletteState[a] = b;
          }
        },
        def(key, value) {
          DEV: assert(
            "string" === typeof key,
            "def() 1st argument must be a string"
          );
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
        timescale(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            "timescale() 1st argument must be a non-negative number"
          );
          _timeScale = value;
        },
        framerate(value) {
          DEV: assert(
            isNumber(value) && value >= 1,
            "framerate() 1st argument must be a number >= 1"
          );
          _fpsInterval = 1e3 / ~~value;
        },
        stat(index) {
          DEV: assert(isNumber(index), "stat() 1st argument must be a number");
          const internals = [
            settings,
            _initialized,
            _fpsInterval / 1e3,
            _canvasScale,
            _eventListeners,
            _currentPalette,
            _defaultSound,
            _timeScale,
            root.zzfxV,
            _rngSeed,
            _fontSize,
            _fontFamily,
            _colorPaletteState,
            _fontLineHeight
          ];
          DEV: assert(
            index >= 0 && index < internals.length,
            "stat() 1st argument must be a number between 0 and " + (internals.length - 1)
          );
          return internals[index];
        },
        ispaused() {
          return _paused;
        },
        pause() {
          if (!_paused) {
            _paused = true;
            _rafid = ~~cancelAnimationFrame(_rafid);
            instance.emit("paused");
          }
        },
        resume() {
          DEV: assert(
            _initialized,
            'resume() cannot be called before the "init" event and neither after the quit() function'
          );
          if (_initialized && _paused) {
            startGameLoop();
            _paused = false;
            instance.emit("resumed");
          }
        },
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
          DEV: console.warn(
            "[litecanvas] quit() terminated a Litecanvas instance."
          );
        }
      };
      const mathProps = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,min,max,pow,sqrt,sign";
      for (const k of mathProps.split(",")) {
        instance[k] = math[k];
      }
      function startGameLoop() {
        if (!_rafid) {
          _accumulated = 0;
          _lastFrameTime = perf.now();
          _rafid = raf(drawFrame);
        }
      }
      function init() {
        if (settings.autoscale) {
          on(root, "resize", resizeCanvas);
        }
        if (settings.tapEvents) {
          const _getXY = (ev) => [
            (ev.pageX - _canvas.offsetLeft) / _canvasScale,
            (ev.pageY - _canvas.offsetTop) / _canvasScale
          ], _taps = /* @__PURE__ */ new Map(), _registerTap = (id, x, y) => {
            const tap = { x, y, xi: x, yi: y, t: perf.now() };
            _taps.set(id, tap);
            return tap;
          }, _updateTap = (id, x, y) => {
            const tap = _taps.get(id) || _registerTap(id);
            tap.x = x;
            tap.y = y;
          }, _checkTapped = (tap) => tap && perf.now() - tap.t <= 300;
          let _pressingMouse = false;
          on(_canvas, "pointerdown", (ev) => {
            const [x, y] = _getXY(ev);
            if ("mouse" === ev.pointerType) {
              if (ev.button) return;
              _pressingMouse = true;
            }
            const id = ev.pointerId;
            _registerTap(id, x, y);
            instance.emit("tap", x, y, id);
            _canvas.setPointerCapture(id);
          });
          on(_canvas, "pointermove", (ev) => {
            const [x, y] = _getXY(ev);
            if ("mouse" === ev.pointerType) {
              instance.def("MX", x);
              instance.def("MY", y);
              if (!_pressingMouse) return;
            }
            const id = ev.pointerId;
            if (_taps.get(id)) {
              instance.emit("tapping", x, y, id);
              _updateTap(id, x, y);
            }
          });
          const _pointerUpHandler = (ev) => {
            const id = ev.pointerId;
            const tap = _taps.get(id);
            const [x, y] = _getXY(ev);
            if (!tap) return;
            if ("mouse" === ev.pointerType) {
              if (ev.button) return;
              _pressingMouse = false;
            }
            if (_checkTapped(tap)) {
              instance.emit("tapped", tap.xi, tap.yi, id);
            }
            instance.emit("untap", x, y, id);
            _taps.delete(id);
            _canvas.releasePointerCapture(id);
          };
          on(_canvas, "pointerup", _pointerUpHandler);
          on(_canvas, "pointercancel", _pointerUpHandler);
          on(root, "blur", () => {
            _pressingMouse = false;
            for (const [id, tap] of _taps) {
              instance.emit("untap", tap.x, tap.y, id);
              _taps.delete(id);
              try {
                _canvas.releasePointerCapture(id);
              } catch (_) {
              }
            }
          });
        }
        if (settings.keyboardEvents) {
          const _keysDown = /* @__PURE__ */ new Set();
          const _keysPress = /* @__PURE__ */ new Set();
          const keyCheck = (keySet, key = "") => {
            key = lowerCase(key);
            return key ? keySet.has("space" === key ? " " : key) : keySet.size > 0;
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
          instance.def("iskeydown", (key) => {
            DEV: assert(
              null == key || "string" === typeof key,
              "iskeydown() 1st argument must be a string"
            );
            return keyCheck(_keysDown, key);
          });
          instance.def("iskeypressed", (key) => {
            DEV: assert(
              null == key || "string" === typeof key,
              "iskeypressed() 1st argument must be a string"
            );
            return keyCheck(_keysPress, key);
          });
          instance.def("lastkey", () => _lastKey);
        }
        _initialized = true;
        instance.emit("init", instance);
        if (!_paused) {
          startGameLoop();
        }
      }
      function drawFrame() {
        _rafid = raf(drawFrame);
        let now = perf.now();
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
          }
        }
      }
      function setupCanvas() {
        const d = document;
        if ("string" === typeof settings.canvas) {
          _canvas = d.querySelector(settings.canvas);
          DEV: assert(
            null != _canvas,
            'litecanvas() option "canvas" is an invalid CSS selector'
          );
        } else {
          _canvas = settings.canvas;
        }
        _canvas = _canvas || d.createElement("canvas");
        DEV: assert(
          _canvas instanceof HTMLElement && "CANVAS" === _canvas.tagName,
          'litecanvas() option "canvas" should be a canvas element or string (CSS selector of a canvas)'
        );
        _ctx = _canvas.getContext("2d");
        on(_canvas, "click", () => focus());
        if (!_canvas.parentNode) {
          d.body.appendChild(_canvas);
        }
        _canvas.oncontextmenu = () => false;
      }
      function resizeCanvas() {
        DEV: assert(
          null == settings.width || isNumber(settings.width) && settings.width > 0,
          'litecanvas() option "width" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || isNumber(settings.height) && settings.height > 0,
          'litecanvas() option "height" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || settings.width > 0 && settings.height > 0,
          'litecanvas() option "width" is required when the option "height" is defined'
        );
        DEV: assert(
          "boolean" === typeof settings.autoscale || isNumber(settings.autoscale) && settings.autoscale > 1,
          'litecanvas() option "autoscale" must be boolean or a number > 1'
        );
        const width = settings.width > 0 ? settings.width : innerWidth, height = settings.width > 0 ? settings.height || settings.width : innerHeight;
        instance.def("W", width);
        instance.def("H", height);
        _canvas.width = width;
        _canvas.height = height;
        _canvas.style = "image-rendering:pixelated;touch-action:none";
        if (settings.autoscale) {
          let maxScale = +settings.autoscale;
          if (!_canvas.style.display) {
            _canvas.style.display = "block";
            _canvas.style.margin = "auto";
          }
          _canvasScale = math.min(innerWidth / width, innerHeight / height);
          _canvasScale = maxScale > 1 && _canvasScale > maxScale ? maxScale : _canvasScale;
          _canvas.style.width = width * _canvasScale + "px";
          _canvas.style.height = height * _canvasScale + "px";
        }
        _ctx.imageSmoothingEnabled = false;
        instance.textalign("start", "top");
        instance.emit("resized", _canvasScale);
      }
      function triggerEvent(eventName, data1, data2, data3, data4) {
        if (_eventListeners[eventName]) {
          for (const callback of _eventListeners[eventName]) {
            callback(data1, data2, data3, data4);
          }
        }
      }
      function loadPlugin(callback, config) {
        const pluginData = callback(instance, config);
        DEV: assert(
          null == pluginData || "object" === typeof pluginData,
          "litecanvas() plugins should return an object or nothing"
        );
        for (const key in pluginData) {
          instance.def(key, pluginData[key]);
        }
      }
      function getColor(color) {
        return color >= 0 ? _currentPalette[~~(_colorPaletteState[color] ?? color) % _currentPalette.length] : color;
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
      resizeCanvas();
      if (_loop) {
        for (const eventName in _loop) {
          if (_loop[eventName]) instance.listen(eventName, _loop[eventName]);
        }
      }
      raf(init);
      return instance;
    }
    window.litecanvas = litecanvas;
  })();
  (() => {
    var Dt = Object.defineProperty;
    var jt = (s, t) => {
      for (var e in t) Dt(s, e, { get: t[e], enumerable: true });
    };
    window.utils = window.utils || {};
    window.utils.global = (s = true) => {
      for (let t in window.utils) t !== "global" && (s || globalThis[t] === void 0) && (globalThis[t] = window.utils[t]);
    };
    var X = {};
    jt(X, { ANCHOR_BOT_LEFT: () => gs, ANCHOR_BOT_RIGHT: () => Ns, ANCHOR_CENTER: () => _s, ANCHOR_TOP_LEFT: () => ot, ANCHOR_TOP_RIGHT: () => ys, Actor: () => Z, BACK_IN: () => Fs, BACK_IN_OUT: () => vs, BACK_OUT: () => Ps, BOUNCE_IN: () => It, BOUNCE_IN_OUT: () => Ls, BOUNCE_OUT: () => V, Camera: () => g, DOWN: () => xs, EASE_IN: () => Ms, EASE_IN_OUT: () => Es, EASE_OUT: () => Is, ELASTIC_IN: () => Rs, ELASTIC_IN_OUT: () => Ts, ELASTIC_OUT: () => As, Grid: () => E, LEFT: () => bs, LINEAR: () => Mt, Noise: () => W, ONE: () => ps, RIGHT: () => ds, TypedGrid: () => L, UP: () => fs, Vector: () => zt, ZERO: () => at, advance: () => ut, almost: () => _t, assert: () => q, choose: () => Lt, clamp: () => p, colcirc: () => K, colrect: () => z, colrectcirc: () => I, copysign: () => gt, dd: () => Xt, diff: () => v, dist: () => lt, dot: () => wt, flipImage: () => Et, formatTime: () => Yt, fract: () => nt, head: () => St, includes: () => Ct, intersection: () => M, is: () => R, last: () => kt, length: () => Bt, lerpAngle: () => ft, lower: () => Ht, lpad: () => Ut, mag: () => ct, makeCircle: () => vt, makeRectangle: () => Rt, mean: () => mt, median: () => pt, mod: () => ht, move: () => bt, percent: () => dt, pingpong: () => Nt, range: () => At, resolverect: () => j, rpad: () => Zt, scaleImage: () => Ft, score: () => Wt, shuffle: () => Tt, smoothstep: () => yt, sum: () => A, tail: () => Ot, tintImage: () => Pt, tween: () => ws, upper: () => Vt, vec: () => n, vecAbs: () => rs, vecAdd: () => tt, vecAngle: () => Qt, vecAngleBetween: () => ts, vecCeil: () => is, vecClamp: () => ns, vecCross: () => ss, vecDist: () => rt, vecDist2: () => Jt, vecDiv: () => O, vecDot: () => C, vecEq: () => Y, vecFloor: () => as, vecHeading: () => it, vecIsZero: () => ls, vecLerp: () => es, vecLimit: () => Gt, vecMag: () => F, vecMag2: () => et, vecMove: () => hs, vecMult: () => P, vecNorm: () => B, vecRand: () => ms, vecReflect: () => $t, vecRem: () => us, vecRotate: () => Kt, vecRound: () => os, vecSet: () => S, vecSetMag: () => st, vecSub: () => k, vecToArray: () => cs, wave: () => xt });
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
      constructor(t = null, e = 0, r = 0, i = null, a = null) {
        this._engine = t || globalThis, this.ox = e, this.oy = r, this.resize(i || this._engine.W - e, a || this._engine.H - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
      }
      resize(t, e) {
        this.width = t, this.height = e, this._engine.emit("camera-resized", this);
      }
      start(t = false) {
        this._engine.push(), t && this._engine.clip((i) => {
          i.rect(this.ox, this.oy, this.width, this.height);
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
        let i = Math.cos(-this.rotation), a = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, e = (e - this.height / 2 - this.oy) / this.scale, r.x = i * t - a * e + this.x, r.y = a * t + i * e + this.y, r;
      }
      getCameraPoint(t, e, r = {}) {
        let i = Math.cos(-this.rotation), a = Math.sin(-this.rotation);
        return t = t - this.x, e = e - this.y, t = i * t - a * e, e = a * t + i * e, r.x = t * this.scale + this.width / 2 + this.ox, r.y = e * this.scale + this.height / 2 + this.oy, r;
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
    var M = (s, t, e, r, i, a, o, u) => {
      let h = Math.max(s, i), x = Math.min(s + e, i + o) - h, c = Math.max(t, a), b = Math.min(t + r, a + u) - c;
      return [h, c, x, b];
    };
    var j = (s, t, e, r, i, a, o, u) => {
      let [h, x, c, b] = M(s, t, e, r, i, a, o, u), d = "", y = s, l = t;
      return c < b ? s < i ? (d = "right", y = i - e) : (d = "left", y = i + o) : t < a ? (d = "bottom", l = a - r) : (d = "top", l = a + u), { dir: d, x: y, y: l };
    };
    var q = (s, t = "Assertion failed") => {
      if (!s) throw new Error(t);
    };
    var z = (s, t, e, r, i, a, o, u) => s < i + o && s + e > i && t < a + u && t + r > a;
    var K = (s, t, e, r, i, a) => (r - s) * (r - s) + (i - t) * (i - t) <= (e + a) * (e + a);
    var I = (s, t, e, r, i, a, o) => {
      let u = i - Math.max(s, Math.min(i, s + e)), h = a - Math.max(t, Math.min(a, t + r));
      return u * u + h * h <= o * o;
    };
    var E = class s {
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
        let r = e ? this.length - 1 : 0, i = e ? -1 : this.length, a = e ? -1 : 1;
        for (; r !== i; ) {
          let o = this.indexToPointX(r), u = this.indexToPointY(r), h = this._c[r];
          if (t(o, u, h, this) === false) break;
          r += a;
        }
      }
      fill(t) {
        this.forEach((e, r) => {
          this.set(e, r, t);
        });
      }
      clampX(t) {
        return $(t, 0, this._w - 1);
      }
      clampY(t) {
        return $(t, 0, this._h - 1);
      }
      toArray() {
        return this._c.slice();
      }
      toString(t = " ", e = true) {
        if (!e) return this._c.join(t);
        let r = [];
        return this.forEach((i, a, o) => {
          r[a] = r[a] || "", r[a] += o + t;
        }), r.join(`
`);
      }
    }, L = class s extends E {
      constructor(t, e, r = Uint8Array) {
        super(t, e, null), this._c = new r(this._w * this._h);
      }
      has(t, e) {
        return this.get(t, e) !== 0;
      }
      clone() {
        let t = new s(this._w, this._h, this._c.constructor);
        return this.forEach((e, r, i) => {
          t.set(e, r, i);
        }), t;
      }
    };
    function $(s, t, e) {
      return s < t ? t : s > e ? e : s;
    }
    var p = (s, t, e) => s < t ? t : s > e ? e : s;
    var J = Math.cos, Q = Math.sin, qt = 2 * Math.PI, G = parseFloat, N = class {
      constructor(t = 0, e = t) {
        this.x = G(t) || 0, this.y = G(e) || 0;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, zt = N, _ = (s) => s instanceof N, n = (s = 0, t = s) => (_(s) && (t = s.y, s = s.x), new N(s, t)), S = (s, t, e = t) => (_(t) ? S(s, t.x, t.y) : (s.x = t, s.y = e), s), tt = (s, t, e = t) => _(t) ? tt(s, t.x, t.y) : (s.x += t, s.y += e, s), k = (s, t, e = t) => _(t) ? k(s, t.x, t.y) : (s.x -= t, s.y -= e, s), P = (s, t, e = t) => _(t) ? P(s, t.x, t.y) : (s.x *= t, s.y *= e, s), O = (s, t, e = t) => _(t) ? O(s, t.x, t.y) : (s.x /= t || 1, s.y /= e || 1, s), Kt = (s, t) => {
      let e = J(t), r = Q(t);
      return s.x = e * s.x - r * s.y, s.y = r * s.x + e * s.y, s;
    }, $t = (s, t) => {
      let e = B(n(t));
      return k(s, P(e, 2 * C(s, e)));
    }, st = (s, t) => P(B(s), t), F = (s) => Math.hypot(s.x, s.y), et = (s) => s.x * s.x + s.y * s.y, B = (s) => {
      let t = F(s);
      return t > 0 && O(s, t), s;
    }, Gt = (s, t = 1) => (et(s) > t * t && st(s, t), s), rt = (s, t) => Math.hypot(t.x - s.x, t.y - s.y), Jt = (s, t) => {
      let e = s.x - t.x, r = s.y - t.y;
      return e * e + r * r;
    }, it = (s) => Math.atan2(s.y, s.x), Qt = (s) => it(s), C = (s, t) => s.x * t.x + s.y * t.y, ts = (s, t) => {
      let e = F(s), r = F(t);
      return r - e ? Math.acos(p(C(s, t) / (e * r), -1, 1)) : 0;
    }, ss = (s, t) => s.x * t.y - s.y * t.x, es = (s, t, e) => (s.x += (t.x - s.x) * e || 0, s.y += (t.y - s.y) * e || 0, s), rs = (s) => (s.x = Math.abs(s.x), s.y = Math.abs(s.y), s), is = (s) => (s.x = Math.ceil(s.x), s.y = Math.ceil(s.y), s), as = (s) => (s.x = Math.floor(s.x), s.y = Math.floor(s.y), s), os = (s) => (s.x = Math.round(s.x), s.y = Math.round(s.y), s), ns = (s, t, e) => S(s, p(s.x, t, e), p(s.y, t, e)), us = (s, t) => (s.x %= t, s.y %= t, s), hs = (s, t, e = 1) => {
      let r = t.x - s.x, i = t.y - s.y, a = Math.hypot(r, i);
      if (e = Math.abs(e), a <= e || a === 0) s.x = t.x, s.y = t.y;
      else {
        let o = e / a;
        s.x = s.x + r * o, s.y = s.y + i * o;
      }
      return s;
    }, Y = (s, t, e = t, r = 1e-5) => _(t) ? Y(s, t.x, t.y, r) : rt(s, t, e) <= r, ls = (s) => Y(s, at), cs = (s) => [s.x, s.y], ms = (s = 1, t = s, e = window.rand || Math.random) => {
      let r = e() * qt, i = e() * (t - s) + s;
      return n(J(r) * i, Q(r) * i);
    }, at = n(0, 0), ps = n(1, 1), fs = n(0, -1), ds = n(1, 0), xs = n(0, 1), bs = n(-1, 0);
    var _s = n(0.5, 0.5), ot = n(0, 0), ys = n(1, 0), gs = n(0, 1), Ns = n(1, 1), Z = class {
      sprite;
      pos;
      spd;
      acc;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, e, r = ot) {
        this.sprite = t || { width: 0, height: 0 }, this.pos = e || n(0), this.spd = n(0), this.acc = n(0), this._o = n(r), this._s = n(1, 1);
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
      set dx(t) {
        this.spd.x = t;
      }
      get dx() {
        return this.spd.x;
      }
      set dy(t) {
        this.spd.y = t;
      }
      get dy() {
        return this.spd.y;
      }
      set ddx(t) {
        this.acc.x = t;
      }
      get ddx() {
        return this.acc.x;
      }
      set ddy(t) {
        this.acc.y = t;
      }
      get ddy() {
        return this.acc.y;
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
        let e = this.sprite.width * (t ? this._s.x : 1), r = this.sprite.height * (t ? this._s.y : 1), i = this.pos.x - e * this.anchor.x, a = this.pos.y - r * this.anchor.y;
        return [i, a, e, r];
      }
      in(t, e, r = 1) {
        return I(...this.getBounds(), t, e, r);
      }
      col(t) {
        return colrect(...this.getBounds(), ...t.getBounds());
      }
      update(t = 1) {
        this.spd.x += this.acc.x * t, this.spd.y += this.acc.y * t, this.pos.x += this.spd.x * t, this.pos.y += this.spd.y * t;
      }
      draw(t = globalThis, e = true) {
        e && t.push(), this.transform(t), this.sprite.width && this.sprite.height && !this.hidden && this.opacity > 0 && this.drawImage(t), e && t.pop();
      }
      transform(t = globalThis) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t = globalThis, e = true) {
        let r = this.anchor, i = -this.sprite.width * (this.flipX ? 1 - r.x : r.x), a = -this.sprite.height * (this.flipY ? 1 - r.y : r.y);
        e && t.alpha(this.opacity), t.image(i, a, this.sprite);
      }
    };
    var v = (s, t) => Math.abs(t - s);
    var nt = (s) => s % 1;
    var R = (s, t, e) => {
      switch (t) {
        case "function":
          return typeof s == "function";
        case "array":
          return Array.isArray(s);
        case "int":
          return Number.isInteger(s);
        case "number":
          return typeof s == "number" && !Number.isNaN(s);
        case "infinity":
          return typeof s == "number" && Math.abs(s) === 1 / 0;
        default:
          return typeof s === t;
      }
    };
    var ut = (s, t, e, r = 1) => {
      e && (t.x += e.x * r, t.y += e.y * r), s.x += t.x * r, s.y += t.y * r;
    };
    var ht = (s, t) => (s % t + t) % t || 0;
    var lt = (s, t, e, r) => Math.hypot(e - s, r - t) || 0;
    var ct = (s, t) => Math.hypot(s, t);
    var A = (s) => {
      let t = 0;
      for (let e = 0; e < s.length; e++) t += s[e];
      return t;
    };
    var mt = (s) => A(s) / s.length;
    var pt = (s) => {
      let t = s.sort((r, i) => r - i), e = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[e - 1] + t[e]) / 2 : t[e];
    };
    var ft = (s, t, e) => {
      let r = (t - s) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), s + r * e;
    };
    var dt = (s, t, e) => p((s - t) / (e - t), 0, 1);
    var xt = (s, t, e, r = Math.sin) => s + (r(e) + 1) / 2 * (t - s);
    var bt = (s, t, e) => Math.abs(t - s) <= e ? t : s + Math.sign(t - s) * e;
    var _t = (s, t, e = 1e-5) => v(s, t) <= e;
    var yt = (s, t, e) => {
      let r = p((e - s) / (t - s), 0, 1);
      return r * r * (3 - 2 * r);
    };
    var gt = (s, t) => Math.sign(t) * Math.abs(s);
    var Nt = (s, t = 1) => t - Math.abs(s % (t * 2) - t);
    var wt = (s, t, e, r) => s * e + t * r;
    var T = Math.PI / 2, ws = (s, t, e, r = 1, i = Mt) => new U(s, t, e, r, i), Mt = (s) => s, Ms = (s) => s * s, Is = (s) => -s * (s - 2), Es = (s) => s < 0.5 ? 2 * s * s : -2 * s * s + 4 * s - 1, Fs = (s) => s * s * s - s * Math.sin(s * Math.PI), Ps = (s) => {
      let t = 1 - s;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, vs = (s) => {
      if (s < 0.5) {
        let e = 2 * s;
        return 0.5 * (e * e * e - e * Math.sin(e * Math.PI));
      }
      let t = 1 - (2 * s - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(s * Math.PI))) + 0.5;
    }, Rs = (s) => Math.sin(13 * T * s) * Math.pow(2, 10 * (s - 1)), As = (s) => Math.sin(-13 * T * (s + 1)) * Math.pow(2, -10 * s) + 1, Ts = (s) => {
      if (s < 0.5) {
        let r = Math.sin(13 * T * (2 * s)), i = Math.pow(2, 10 * (2 * s - 1));
        return 0.5 * r * i;
      }
      let t = Math.sin(-13 * T * (2 * s - 1 + 1)), e = Math.pow(2, -10 * (2 * s - 1));
      return 0.5 * (t * e + 2);
    }, It = (s) => 1 - V(1 - s), V = (s) => s < 4 / 11 ? 121 * s * s / 16 : s < 8 / 11 ? 363 / 40 * s * s - 99 / 10 * s + 17 / 5 : s < 9 / 10 ? 4356 / 361 * s * s - 35442 / 1805 * s + 16061 / 1805 : 54 / 5 * s * s - 513 / 25 * s + 268 / 25, Ls = (s) => s < 0.5 ? 0.5 * It(s * 2) : 0.5 * V(s * 2 - 1) + 0.5, U = class {
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
      constructor(t, e, r, i, a) {
        this._o = t, this._p = e, this._x = r, this._d = i, this._e = a, this._w = 0;
      }
      start(t) {
        if (this.running) return this;
        this._cu.stop(false), this._ch = this._cu = this, this.running = true;
        let e = this._o[this._p] || 0, r = this._rel ? e + this._x : this._x;
        return this._lc = this._lc || t || globalThis, this._u = this._lc.listen("update", (i) => {
          if (this._t <= this._w) {
            this._t += i;
            return;
          }
          let a = this._t - this._w;
          this._o[this._p] = this._lc.lerp(e, r, this._e(a / this._d)), this._t += i, a >= this._d && (this._o[this._p] = r, this.stop());
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
    var H = (s) => 0.5 * (1 - Math.cos(s * Math.PI)), W = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, e = 0, r = 0) {
        t < 0 && (t = -t), e < 0 && (e = -e), r < 0 && (r = -r);
        let i = Math.floor(t), a = Math.floor(e), o = Math.floor(r), u = t - i, h = e - a, x = r - o, c, b, d = 0, y = 0.5, l, m, w;
        for (let D = 0; D < this._po; D++) {
          let f = i + (a << 4) + (o << 8);
          c = H(u), b = H(h), l = this._p[f & 4095], l += c * (this._p[f + 1 & 4095] - l), m = this._p[f + 16 & 4095], m += c * (this._p[f + 16 + 1 & 4095] - m), l += b * (m - l), f += 256, m = this._p[f & 4095], m += c * (this._p[f + 1 & 4095] - m), w = this._p[f + 16 & 4095], w += c * (this._p[f + 16 + 1 & 4095] - w), m += b * (w - m), l += H(x) * (m - l), d += l * y, y *= this._pf, i <<= 1, u *= 2, a <<= 1, h *= 2, o <<= 1, x *= 2, u >= 1 && (i++, u--), h >= 1 && (a++, h--), x >= 1 && (o++, x--);
        }
        return d;
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
    var Et = (s, t = true, e = false, r = globalThis) => r.paint(s.width, s.height, (i) => {
      r.push(), r.scale(t ? -1 : 1, e ? -1 : 1), r.image(t ? -s.width : 0, e ? -s.height : 0, s), r.pop();
    });
    var Ft = (s, t, e = true, r = globalThis) => r.paint(s.width * t, s.height * t, (i) => {
      r.push(), i.imageSmoothingEnabled = !e, r.scale(t), r.image(0, 0, s), r.pop();
    });
    var Pt = (s, t, e = 1, r = globalThis) => r.paint(s.width, s.height, (i) => {
      r.push(), r.alpha(e), r.rectfill(0, 0, s.width, s.height, t), i.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, s), r.pop();
    });
    var vt = (s, t, { borderWidth: e = 0, borderColor: r = 0, engine: i = globalThis } = {}) => {
      let a = s * 2 + e;
      return i.paint(a, a, () => {
        i.circfill(a / 2, a / 2, s, t), e > 0 && (i.linewidth(e), i.stroke(r));
      });
    };
    var Rt = (s, t, e, { borderWidth: r = 0, borderColor: i = 0, engine: a = globalThis } = {}) => {
      let o = s + r * 2, u = t + r * 2;
      return a.paint(o, u, () => {
        let h = r > 0;
        h && a.cls(i), a.rectfill(h ? r : 0, h ? r : 0, s, t, e);
      });
    };
    var At = (s, t = 0, e = 1) => [...Array(s | 0).keys()].map((r) => t + e * r);
    var Tt = (s, t = window.rand || Math.random) => {
      s = [...s];
      for (let e = s.length - 1; e > 0; e--) {
        let r = Math.floor(t() * (e + 1)), i = s[e];
        s[e] = s[r], s[r] = i;
      }
      return s;
    };
    var Lt = (s, t = window.rand || Math.random) => s[Math.floor(t() * s.length)];
    var St = (s) => s[0];
    var kt = (s) => s[s.length - 1];
    var Ot = (s) => s.slice(1);
    var Bt = (s) => ~~s?.length;
    var Ct = (s, t, e = 0) => s?.includes(t, e);
    var Yt = (s) => ~~(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + ~~(s % 60);
    var Zt = (s, t, e = "0") => (s + "").padEnd(t, e);
    var Ut = (s, t, e = "0") => (s + "").padStart(t, e);
    var Vt = (s) => (s + "").toUpperCase();
    var Ht = (s) => (s + "").toLowerCase();
    var Wt = (s, t = 6) => (s + "").padStart(t, "0");
    var Xt = (s, t, e = globalThis) => {
      e.pal(["blue", "#fff"]), e.cls(0), e.ctx().resetTransform(), e.textfont("monospace"), e.textsize(16), e.textalign("start", "top"), e.text(16, 16, `${t ?? "dd() output"}: ` + (R(s, "object") ? JSON.stringify(s, null, 4) : s)), e.quit();
    };
    window.utils = Object.assign(window.utils || {}, X);
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
    var _ = (e, l, c, m, o, h, b, g) => e < o + b && e + c > o && l < h + g && l + m > h;
    var y = (e, l, c, m, o, h) => (m - e) * (m - e) + (o - l) * (o - l) <= (c + h) * (c + h);
    var Wt = 2 * Math.PI;
    var v = (e, l, c, m = Math.sin) => e + (m(c) + 1) / 2 * (l - e);
    var Ts = Math.PI / 2;
    var et = { warnings: true };
    function w(e, l = {}) {
      if (e.stat(1)) throw 'Plugin Migrate should be loaded before the "init" event';
      l = Object.assign({}, et, l);
      let m = { def: p, seed: h, print: T, clear: C, setfps: O, setvar: X, textstyle: g, textmetrics: k, cliprect: F, clipcirc: S, blendmode: R, transform: L, getcolor: E, mousepos: Y, path: H, fill: D, stroke: z, clip: Z, paint: $, colrect: (...t) => (x("colrect()"), _(...t)), colcirc: (...t) => (x("colrect()"), y(...t)), wave: (...t) => (x("wave()"), v(...t)) };
      e.def("TWO_PI", e.PI * 2), e.def("HALF_PI", e.PI / 2);
      let o = e.stat(0);
      function h(t) {
        return a("seed()", "rseed()"), t && e.rseed(t), e.stat(9);
      }
      let b = "";
      function g(t) {
        a("textstyle()", "the 5th param of text()"), b = t;
      }
      function T(t, s, r, n) {
        a("print()", "text()"), e.text(t, s, r, n);
      }
      function k(t, s) {
        a("textmetrics()", "ctx().measureText()");
        let r = e.ctx(), n = e.stat(10), u = e.stat(11);
        r.font = `${b || ""} ${~~(s || n)}px ${u}`;
        let f = r.measureText(t);
        return f.height = f.actualBoundingBoxAscent + f.actualBoundingBoxDescent, f;
      }
      function F(t, s, r, n) {
        a("cliprect()", "clip()");
        let u = e.ctx();
        u.beginPath(), u.rect(t, s, r, n), u.clip();
      }
      function S(t, s, r) {
        a("clipcirc()", "clip()");
        let n = e.ctx();
        n.beginPath(), n.arc(t, s, r, 0, e.TWO_PI), n.clip();
      }
      function E(t) {
        a("getcolor()", "stat(5)");
        let s = stat(5);
        return s[~~t % s.length];
      }
      function R(t) {
        a("blendmode()", "ctx().globalCompositeOperation");
        let s = e.ctx();
        s.globalCompositeOperation = t;
      }
      function C(t) {
        a("clear()", "cls()"), e.cls(t);
      }
      function L(t, s, r, n, u, f, q = true) {
        return a("transform()", "ctx().setTransform() or ctx().transform()"), e.ctx()[q ? "setTransform" : "transform"](t, s, r, n, u, f);
      }
      function Y() {
        return a("mousepos()", "MX and MY"), [MX, MY];
      }
      function O(t) {
        a("setfps()", "framerate()"), e.framerate(t);
      }
      let i = e.def;
      function p(t, s) {
        switch (t) {
          case "W":
          case "WIDTH":
            i("W", s), i("WIDTH", s);
            break;
          case "H":
          case "HEIGHT":
            i("H", s), i("HEIGHT", s);
            break;
          case "T":
          case "ELAPSED":
            i("T", s), i("ELAPSED", s);
            break;
          case "CX":
          case "CENTERX":
            i("CX", s), i("CENTERX", s);
            break;
          case "CY":
          case "CENTERY":
            i("CY", s), i("CENTERY", s);
            break;
          case "MX":
          case "MOUSEX":
            i("MX", s), i("MOUSEX", s);
            break;
          case "MY":
          case "MOUSEY":
            i("MY", s), i("MOUSEY", s);
            break;
          default:
            i(t, s);
            break;
        }
      }
      function X(t, s) {
        a("setvar()", "def()"), p(t, s);
      }
      e.listen("resized", M);
      function M() {
        p("CX", e.W / 2), p("CY", e.H / 2);
      }
      M(), p("CANVAS", e.canvas());
      for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) e[t] != null && p(t, e[t]);
      a("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), i("FPS", ""), o.fps && e.framerate(o.fps), o.background != null && (a('"background" option', "You must update your canvas CSS"), e.listen("after:init", () => {
        e.canvas().style.background = E(~~o.background);
      }));
      function H(t) {
        return a("path()", "`new Path2D()`", "See https://developer.mozilla.org/en-US/docs/Web/API/Path2D"), new Path2D(t);
      }
      let B = e.fill;
      function D(t, s) {
        if (s instanceof Path2D) {
          a("fill(color, path)");
          let r = e.stat(5), n = e.ctx();
          n.fillStyle = r[~~t % r.length], e.ctx().fill(s);
        } else B(t);
      }
      let W = e.stroke;
      function z(t, s) {
        if (s instanceof Path2D) {
          a("stroke(color, path)");
          let r = e.stat(5), n = e.ctx();
          n.strokeStyle = r[~~t % r.length], e.ctx().stroke(s);
        } else W(t);
      }
      let U = e.clip;
      function Z(t) {
        a("clip(path)", "clip(callback)", "E.g: `clip((ctx) => ctx.rect(0, 0, 200, 200))`"), t instanceof Path2D ? e.ctx().clip(t) : U(t);
      }
      o.antialias && a('"antialias" option', '"pixelart" option'), o.pixelart === false && a('"pixelart" option'), o.animate === false && a('"animate" option', "pause() in the of your draw()");
      let V = e.paint;
      function $(t, s, r, n) {
        let u = r;
        return e.spr && Array.isArray(r) && (u = () => {
          e.spr(0, 0, r.join(`
`));
        }), V(t, s, u, n);
      }
      let d = e.spr;
      d && d.length === 3 && (m.spr = function(t, s, r, n, u) {
        Number.isFinite(r) && r > 0 ? (a("spr() width and height", "spr(x, y, pixels)"), d(t, s, u)) : d(t, s, r);
      });
      let j = e.listen, I = e.unlisten;
      I && (m.listen = (t, s) => (j(t, s), () => {
        P("listen() not returns a function anymore. Please use unlisten(event, callback) instead."), I(t, s);
      }));
      let A = e.ispaused;
      A && (m.paused = () => (a("paused()", "ispaused()"), A()));
      function P(t) {
        l.warnings && console.warn(`[litecanvas/migrate] ${t}`);
      }
      function a(t, s, r = "") {
        P(`${t} is removed. ` + (s ? `Please use ${s} instead. ` : "") + r);
      }
      function x(t, s = "function") {
        a(t, `This ${s} was moved to @litecanvas/utils package.`);
      }
      return m;
    }
    window.pluginMigrate = w;
  })();
  (() => {
    function T(s = {}) {
      let n = 0, m = true, b = s.position, r = document.createElement("div"), i = [], f = () => (performance || Date).now();
      ["right", "left"].includes(b) || (b = "right"), r.style.cssText = `position:absolute;top:0;${b}:0;cursor:pointer;opacity:0.8;z-index:10000`, r.addEventListener("click", function(a) {
        a.preventDefault(), e(++n % r.children.length);
      }, false);
      function c(a, t, _, w) {
        let x = new E(a, t, _, r, w);
        return i.push(x), x;
      }
      function e(a) {
        for (let t = 0; t < r.children.length; t++) r.children[t].style.display = t === a ? "block" : "none";
        n = a;
      }
      function h() {
        n++, n >= r.children.length && (n = 0), e(n);
      }
      function y(a = "all") {
        if (a === "all") for (let t = 0; t < i.length; t++) i[t].reset();
        else i[a] && i[a].reset();
        l = f(), o = 0;
      }
      function d(a = true) {
        m = !!a, r.style.display = m ? "" : "none";
      }
      let u = f(), l = u, o = 0, g = c("FPS", "#0ff", "#002"), v = c("MS", "#0f0", "#020"), p;
      return self.performance && self.performance.memory && (p = c("MB", "#f08", "#201")), e(0), { dom: r, addPanel: c, showPanel: e, nextPanel: h, resetPanel: y, display: d, get hidden() {
        return !m;
      }, begin: function() {
        u = f();
      }, end: function() {
        o++;
        let a = f();
        if (v.update(a - u, 200), a >= l + 1e3 && (g.update(o * 1e3 / (a - l), 100), l = a, o = 0, p)) {
          let t = performance.memory;
          p.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576);
        }
        return a;
      }, update: function() {
        u = this.end();
      } };
    }
    function E(s, n, m, b, r = {}) {
      let i = Math.round, f = 1 / 0, c = 0, e = i(window.devicePixelRatio || 1), h = r.width || 80, y = 48, d = 3 * e, u = 2 * e, l = 3 * e, o = 15 * e, g = (h - 6) * e, v = 30 * e, p = document.createElement("canvas");
      p.width = h * e, p.height = y * e, p.style.cssText = `width:${h}px;height:48px;`;
      let a = b.children.length;
      b.appendChild(p);
      let t = p.getContext("2d");
      t.font = `bold ${9 * e}px Helvetica,Arial,sans-serif`, t.textBaseline = "top";
      function _() {
        t.fillStyle = m, t.fillRect(0, 0, h * e, y * e), t.fillStyle = n, t.fillText(s, d, u), t.fillRect(l, o, g, v), t.fillStyle = m, t.globalAlpha = 0.9, t.fillRect(l, o, g, v);
      }
      return _(), { id: a, dom: p, reset: _, update: function(w, x) {
        f = Math.min(f, w), c = Math.max(c, w), t.fillStyle = m, t.globalAlpha = 1, t.fillRect(0, 0, h * e, o), t.fillStyle = n;
        let S = [i(w), s];
        r.labelBefore && S.reverse(), t.fillText(S.join(" ") + " (" + i(f) + "-" + i(c) + ")", d, u), t.drawImage(p, l + e, o, g - e, v, l, o, g - e, v), t.fillRect(l + g - e, o, e, v), t.fillStyle = m, t.globalAlpha = 0.9, t.fillRect(l + g - e, o, e, i((1 - w / x) * v));
      } };
    }
    var C = { hotkeyShow: "F1", hotkeyNext: "F2", css: {}, hidden: false, id: "", position: "right" };
    function A(s, n = {}) {
      let { hotkeyNext: m, hotkeyShow: b, id: r, position: i, css: f } = Object.assign({}, C, n), c = s.stat(0), e = new T({ position: i }), h = e.display, y = (d = true) => {
        n.hidden = !d, h(d), e.resetPanel();
      };
      r && (e.dom.id = r);
      for (let [d, u] of Object.entries(f || {})) e.dom.style[d] = u;
      return s.canvas().parentElement.appendChild(e.dom), y(!n.hidden), c.keyboardEvents && s.listen("update", () => {
        b && s.iskeypressed(b) && y(n.hidden), m && s.iskeypressed(m) && e.nextPanel();
      }), s.listen("before:update", (d, u = 1) => {
        n.hidden || u === 1 && e.begin();
      }), s.listen("after:draw", () => {
        n.hidden || e.end();
      }), s.listen("quit", () => {
        e.dom.remove();
      }), e.display = y, { FPS_METER: e };
    }
    window.pluginFrameRateMeter = A;
  })();
  (() => {
    var S = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [63, 102, 102, 62, 54, 102, 103], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]], O = (e, r, o = 3) => {
      for (let x = 0; x < 8; x++) for (let a = 0; a < 8; a++) (r[x] | 0) & 1 << a && e.rectfill(a, x, 1, 1, o);
    }, g = { id: "basic", chars: S, first: 33, w: 8, h: 8, render: O };
    var P = [[34, 32, 32], [85, 0, 0], [87, 87, 80], [99, 103, 32], [84, 33, 80], [99, 101, 96], [34, 0, 0], [33, 17, 32], [36, 68, 32], [82, 80, 0], [2, 114, 0], [0, 0, 33], [0, 112, 0], [0, 0, 16], [68, 33, 16], [117, 85, 112], [50, 34, 112], [116, 113, 112], [116, 116, 112], [85, 116, 64], [113, 116, 112], [113, 117, 112], [116, 68, 64], [117, 117, 112], [117, 116, 112], [0, 32, 32], [0, 32, 33], [66, 18, 64], [7, 7, 0], [18, 66, 16], [116, 96, 32], [37, 81, 96], [37, 117, 80], [53, 53, 48], [97, 17, 96], [53, 85, 48], [113, 49, 112], [113, 49, 16], [97, 85, 96], [85, 117, 80], [114, 34, 112], [68, 69, 32], [85, 53, 80], [17, 17, 112], [87, 117, 80], [117, 85, 80], [37, 85, 32], [117, 113, 16], [101, 83, 96], [53, 53, 80], [97, 116, 48], [114, 34, 32], [85, 85, 112], [85, 82, 32], [85, 119, 80], [85, 37, 80], [85, 34, 32], [116, 33, 112], [98, 34, 96], [17, 36, 64], [50, 34, 48], [37, 0, 0], [0, 0, 112], [18, 0, 0], [6, 85, 96], [19, 85, 48], [6, 17, 96], [70, 85, 96], [2, 83, 96], [66, 114, 32], [2, 86, 66], [17, 53, 80], [2, 2, 32], [2, 2, 33], [21, 53, 80], [34, 34, 64], [5, 117, 80], [3, 85, 80], [2, 85, 32], [3, 85, 49], [6, 85, 100], [2, 81, 16], [6, 20, 48], [39, 34, 64], [5, 85, 96], [5, 82, 32], [5, 87, 80], [5, 34, 80], [5, 86, 66], [7, 65, 112], [98, 18, 96], [34, 34, 32], [50, 66, 48], [3, 96, 0]], L = (e, r, o = 3) => {
      for (let x = 0; x < 6; x++) for (let a = 0; a < 4; a++) {
        let f = ~~(x / 2);
        (x % 2 ? r[f] & 15 : r[f] >> 4) & 1 << a && e.rectfill(a, x, 1, 1, o);
      }
    }, N = { id: "mini", chars: P, first: 33, w: 4, h: 6, render: L };
    var M = [[4, 4, 4, 4, 4, , 4, ,], [10, 10, 10, , , , , ,], [, 10, 31, 10, 10, 31, 10, ,], [4, 30, 5, 14, 20, 15, 4, ,], [17, 17, 8, 4, 2, 17, 17, ,], [6, 9, 9, 30, 9, 9, 22, ,], [4, 4, 4, , , , , ,], [8, 4, 4, 4, 4, 4, 8, ,], [2, 4, 4, 4, 4, 4, 2, ,], [, 4, 21, 14, 21, 4, , ,], [, 4, 4, 31, 4, 4, , ,], [, , , , , 4, 4, 2], [, , , 31, , , , ,], [, , , , , 4, 4, ,], [16, 16, 8, 4, 2, 1, 1, ,], [14, 17, 25, 21, 19, 17, 14, ,], [4, 6, 4, 4, 4, 4, 31, ,], [14, 17, 16, 8, 4, 2, 31, ,], [14, 17, 16, 12, 16, 17, 14, ,], [18, 18, 17, 31, 16, 16, 16, ,], [31, 1, 15, 16, 16, 17, 14, ,], [14, 1, 1, 15, 17, 17, 14, ,], [31, 16, 16, 8, 4, 4, 4, ,], [14, 17, 17, 14, 17, 17, 14, ,], [14, 17, 17, 30, 16, 17, 14, ,], [, 4, 4, , , 4, 4, ,], [, 4, 4, , , 4, 4, 2], [, 24, 6, 1, 6, 24, , ,], [, , 31, , 31, , , ,], [, 3, 12, 16, 12, 3, , ,], [14, 17, 16, 8, 4, , 4, ,], [14, 25, 21, 21, 25, 1, 14, ,], [14, 17, 17, 17, 31, 17, 17, ,], [15, 17, 17, 15, 17, 17, 15, ,], [14, 17, 1, 1, 1, 17, 14, ,], [15, 17, 17, 17, 17, 17, 15, ,], [31, 1, 1, 15, 1, 1, 31, ,], [31, 1, 1, 15, 1, 1, 1, ,], [14, 17, 1, 29, 17, 17, 14, ,], [17, 17, 17, 31, 17, 17, 17, ,], [31, 4, 4, 4, 4, 4, 31, ,], [16, 16, 16, 16, 17, 17, 14, ,], [17, 9, 5, 3, 5, 9, 17, ,], [1, 1, 1, 1, 1, 1, 31, ,], [17, 27, 21, 17, 17, 17, 17, ,], [17, 17, 19, 21, 25, 17, 17, ,], [14, 17, 17, 17, 17, 17, 14, ,], [15, 17, 17, 15, 1, 1, 1, ,], [14, 17, 17, 17, 17, 17, 14, 24], [15, 17, 17, 15, 17, 17, 17, ,], [14, 17, 1, 14, 16, 17, 14, ,], [31, 4, 4, 4, 4, 4, 4, ,], [17, 17, 17, 17, 17, 17, 14, ,], [17, 17, 17, 17, 10, 10, 4, ,], [17, 17, 17, 17, 21, 27, 17, ,], [17, 17, 10, 4, 10, 17, 17, ,], [17, 17, 10, 4, 4, 4, 4, ,], [31, 16, 8, 4, 2, 1, 31, ,], [12, 4, 4, 4, 4, 4, 12, ,], [1, 1, 2, 4, 8, 16, 16, ,], [6, 4, 4, 4, 4, 4, 6, ,], [4, 10, 17, , , , , ,], [, , , , , , 31, ,], [2, 4, , , , , , ,], [, , 30, 17, 17, 17, 30, ,], [1, 1, 15, 17, 17, 17, 15, ,], [, , 14, 17, 1, 17, 14, ,], [16, 16, 30, 17, 17, 17, 30, ,], [, , 14, 17, 31, 1, 14, ,], [12, 18, 2, 15, 2, 2, 2, ,], [, , 30, 17, 17, 17, 30, 16, 14], [1, 1, 15, 17, 17, 17, 17, ,], [4, , 6, 4, 4, 4, 31, ,], [16, , 24, 16, 16, 16, 16, 17, 14], [1, 1, 17, 9, 7, 9, 17, ,], [3, 2, 2, 2, 2, 2, 28, ,], [, , 15, 21, 21, 21, 21, ,], [, , 15, 17, 17, 17, 17, ,], [, , 14, 17, 17, 17, 14, ,], [, , 15, 17, 17, 17, 15, 1, 1], [, , 30, 17, 17, 17, 30, 16, 16], [, , 13, 19, 1, 1, 1, ,], [, , 30, 1, 14, 16, 15, ,], [2, 2, 15, 2, 2, 2, 28, ,], [, , 17, 17, 17, 17, 30, ,], [, , 17, 17, 17, 10, 4, ,], [, , 17, 17, 21, 21, 10, ,], [, , 17, 10, 4, 10, 17, ,], [, , 17, 17, 17, 17, 30, 16, 14], [, , 31, 8, 4, 2, 31, ,], [8, 4, 4, 2, 4, 4, 8, ,], [4, 4, 4, 4, 4, 4, 4, ,], [2, 4, 4, 8, 4, 4, 2, ,], [, , 18, 13, , , , ,]], y = { id: "monogram", chars: M, first: 33, w: 6, h: 9, render: (e, r, o = 3) => {
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
  (() => {
    var _ = (r, n, c, N, p, i, b) => {
      let l = p - Math.max(r, Math.min(p, r + c)), m = i - Math.max(n, Math.min(i, n + N));
      return l * l + m * m <= b * b;
    };
    var f = (r, n, c) => r < n ? n : r > c ? c : r;
    var Me = 2 * Math.PI, k = parseFloat, y = class {
      constructor(n = 0, c = n) {
        this.x = k(n) || 0, this.y = k(c) || 0;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    };
    var R = (r) => r instanceof y, P = (r = 0, n = r) => (R(r) && (n = r.y, r = r.x), new y(r, n));
    var nr = Math.PI / 2;
    var h = Math, O = { enabled: true, color: 1, size: 64, position: [0.5, 0.5], fixed: false, opacityActive: 1, opacityInactive: 0, zone: null, lock: null, render: null };
    function v(r, n = {}) {
      if (!r.stat(1)) throw 'Plugin Joystick should be loaded after or inside of the "init" event';
      let N = { "before:tap": A, "before:untap": T, "before:tapping": w, "after:draw": F }, p = [], i = [], b = true, l = P(0, 0), m, d = false, a = null, e = { on: false, active: false, vector: P(0, 0), angle: 0, force: 0, forceMax: 2, forceMin: 0, tapSize: 16, stickSize: 0.5, style: null, draw(t, s, o, u) {
        u.linewidth(e.style.border), u.circ(t.x, t.y, o.size, o.color), u.circfill(s.x, s.y, o.size * e.stickSize, o.color);
      }, checkTap(t, s) {
        return _(i[0], i[1], i[2], i[3], t, s, e.tapSize);
      }, set zone(t) {
        let s = !Array.isArray(t) || t.length === 0, [o, u, x, g] = s ? M() : t;
        i = [~~o, ~~u, ~~x, ~~g], b = s;
      }, get zone() {
        return i;
      }, get enabled() {
        return d;
      }, enable() {
        if (!d) {
          for (let [t, s] of Object.entries(N)) r.listen(t, s), p.push([t, s]);
          d = true;
        }
      }, disable() {
        if (d) {
          for (let t of p) r.unlisten(...t);
          p.length = 0, d = e.active = e.on = false, m = null;
        }
      }, reset(t) {
        t && (a = Object.assign({}, a ?? O, t)), (!this.style || t) && (this.style = { color: a.color, size: a.size, opacityActive: a.opacityActive, opacityInactive: a.opacityInactive, border: 2 }), (!i || t) && (e.zone = a.zone);
        let s = this.style.size + this.style.border, o = i[2] - 2 * s, u = i[3] - 2 * s;
        l.x = i[0] + s + a.position[0] * o, l.y = i[1] + s + a.position[1] * u, t && (a.enabled ? e.enable() : e.disable()), m = null, this.active = this.on = false, e.force = e.angle = 0;
      } };
      function A(t, s, o) {
        m === null && e.checkTap(t, s) && (m = o, e.active = e.on = true, a.fixed || (l.x = t, l.y = s), e.vector.x = t, e.vector.y = s, w(t, s, o));
      }
      function T(t, s, o) {
        m === o && e.reset();
      }
      function w(t, s, o) {
        if (o !== m) return;
        let u = a.lock === "y" ? 0 : t - l.x, x = a.lock === "x" ? 0 : s - l.y, g = h.hypot(u, x);
        if (g === 0) return;
        let E = e.style.size, I = h.min(g, E);
        e.vector.x = l.x + h.cos(e.angle) * (a.lock === "y" ? 0 : I), e.vector.y = l.y + h.sin(e.angle) * (a.lock === "x" ? 0 : I), e.angle = h.atan2(x, u), e.force = f(h.abs(g / E), e.forceMin, e.forceMax), r.emit("joystick-update");
      }
      function F() {
        let t = e.style[e.on ? "opacityActive" : "opacityInactive"];
        t > 0 && (r.push(), r.alpha(t), (a.render ? a.render : e.draw)(l, e.on ? e.vector : l, e.style, r), r.pop());
      }
      r.listen("resized", () => {
        b && (i = M());
      });
      function M() {
        return [0, 0, r.W, r.H];
      }
      return e.reset(n), { joystick: e, JOYSTICK: e };
    }
    window.pluginJoystick = v;
  })();
})();
/**
 * Mulberry32 is a 32-bit pseudo-random number generator (PRNG).
 * You provide a 32-bit seed, and it produces a deterministic sequence of values.
 * The same seed always gives the same sequence.
 *
 * @copyright https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
 * @license CC0-1.0 (Public Domain)
 *
 * @param {number} seed an unsigned 32-bit integer
 * @param {number} t
 * @param {typeof Math.imul} i
 * @returns {() => number}
 */
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! Migrate for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
/*! Joystick plugin for Litecanvas by Luiz Bills | MIT Licensed */
