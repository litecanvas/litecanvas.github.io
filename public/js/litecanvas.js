(() => {
  // public/js/litecanvas.js
  (() => {
    var setupZzFX = (global) => {
      const zzfxX = new AudioContext();
      global.zzfxV = 1;
      return (i = 1, d = 0.05, z = 220, e = 0, P = 0, S = 0.1, I = 0, c = 1, T = 0, H = 0, V = 0, J = 0, h = 0, j = 0, K = 0, E = 0, r = 0, B = 1, X = 0, L = 0, D = 0) => {
        let n = Math, t = 2 * n.PI, a = 44100, F = T *= 500 * t / a / a, O = z *= (1 - d + 2 * d * n.random(d = [])) * t / a, x = 0, _ = 0, f = 0, g = 1, $ = 0, l = 0, o = 0, s = D < 0 ? -1 : 1, u = t * s * D * 2 / a, G = n.cos(u), C = n.sin, Q = C(u) / 4, M = 1 + Q, m = -2 * G / M, y = (1 - Q) / M, R = (1 + s * G) / 2 / M, A = -(s + G) / M, v = R, U = 0, W = 0, Y = 0, Z = 0;
        for (e = a * e + 9, X *= a, P *= a, S *= a, r *= a, H *= 500 * t / a ** 3, K *= t / a, V *= t / a, J *= a, h = a * h | 0, i *= 0.3 * global.zzfxV, s = e + X + P + S + r | 0; f < s; d[f++] = o * i)
          ++l % (100 * E | 0) || (o = I ? 1 < I ? 2 < I ? 3 < I ? C(x * x) : n.max(n.min(n.tan(x), 1), -1) : 1 - (2 * x / t % 2 + 2) % 2 : 1 - 4 * n.abs(n.round(x / t) - x / t) : C(x), o = (h ? 1 - L + L * C(t * f / h) : 1) * (o < 0 ? -1 : 1) * n.abs(o) ** c * (f < e ? f / e : f < e + X ? 1 - (f - e) / X * (1 - B) : f < e + X + P ? B : f < s - r ? (s - f - r) / S * B : 0), o = r ? o / 2 + (r > f ? 0 : (f < s - r ? 1 : (s - f) / r) * d[f - r | 0] / 2 / i) : o, D && (o = Z = v * U + A * (U = W) + R * (W = o) - y * Y - m * (Y = Z))), u = (z += T += H) * n.cos(K * _++), x += u + u * j * C(f ** 5), g && ++g > J && (z += V, O += V, g = 0), !h || ++$ % h || (z = O, T = F, g = g || 1);
        i = zzfxX.createBuffer(1, s, a), i.getChannelData(0).set(d), z = zzfxX.createBufferSource(), z.buffer = i, z.connect(zzfxX.destination), z.start();
      };
    };
    var defaultPalette = ["#211e20", "#555568", "#a0a08b", "#e9efec"];
    var assert = (condition, message = "Assertion failed") => {
      if (!condition) throw new Error("[litecanvas] " + message);
    };
    var version = "0.202.0";
    function litecanvas(settings = {}) {
      const root = window, math = Math, perf = performance, TWO_PI = math.PI * 2, loggerPrefix = "[Litecanvas] ", raf = requestAnimationFrame, _browserEventListeners = [], on = (elem, evt, callback) => {
        elem.addEventListener(evt, callback, false);
        _browserEventListeners.push(
          () => elem.removeEventListener(evt, callback, false)
        );
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
      let _initialized = false, _paused = true, _canvas, _canvasScale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _fpsInterval = 1e3 / 60, _accumulated, _rafid, _defaultTextColor = 3, _fontFamily = "sans-serif", _fontSize = 20, _fontLineHeight = 1.2, _rngSeed = Date.now(), _colorPalette = defaultPalette, _colorPaletteState = [], _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _mathFunctions = "PI,sin,cos,atan2,hypot,tan,abs,ceil,floor,trunc,min,max,pow,sqrt,sign,exp", _eventListeners = {};
      const instance = {
        W: 0,
        H: 0,
        T: 0,
        MX: -1,
        MY: -1,
        TWO_PI,
        HALF_PI: TWO_PI / 4,
        lerp: (start, end, t) => {
          DEV: assert(
            isNumber(start),
            loggerPrefix + "lerp() 1st param must be a number"
          );
          DEV: assert(
            isNumber(end),
            loggerPrefix + "lerp() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(t),
            loggerPrefix + "lerp() 3rd param must be a number"
          );
          return start + t * (end - start);
        },
        deg2rad: (degs) => {
          DEV: assert(isNumber(degs), "deg2rad: 1st param must be a number");
          return math.PI / 180 * degs;
        },
        rad2deg: (rads) => {
          DEV: assert(isNumber(rads), "rad2deg: 1st param must be a number");
          return 180 / math.PI * rads;
        },
        round: (n, precision = 0) => {
          DEV: assert(
            isNumber(n),
            loggerPrefix + "round() 1st param must be a number"
          );
          DEV: assert(
            isNumber(precision) && precision >= 0,
            loggerPrefix + "round() 2nd param must be a positive number or zero"
          );
          if (!precision) {
            return math.round(n);
          }
          const multiplier = 10 ** precision;
          return math.round(n * multiplier) / multiplier;
        },
        clamp: (value, min, max) => {
          DEV: assert(
            isNumber(value),
            loggerPrefix + "clamp() 1st param must be a number"
          );
          DEV: assert(
            isNumber(min),
            loggerPrefix + "clamp() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(max),
            loggerPrefix + "clamp() 3rd param must be a number"
          );
          DEV: assert(
            max >= min,
            loggerPrefix + "clamp() the 2nd param must be less than the 3rd param"
          );
          if (value < min) return min;
          if (value > max) return max;
          return value;
        },
        dist: (x1, y1, x2, y2) => {
          DEV: assert(
            isNumber(x1),
            loggerPrefix + "dist() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y1),
            loggerPrefix + "dist() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(x2),
            loggerPrefix + "dist() 3rd param must be a number"
          );
          DEV: assert(
            isNumber(y2),
            loggerPrefix + "dist() 4th param must be a number"
          );
          return math.hypot(x2 - x1, y2 - y1);
        },
        wrap: (value, min, max) => {
          DEV: assert(
            isNumber(value),
            loggerPrefix + "wrap() 1st param must be a number"
          );
          DEV: assert(
            isNumber(min),
            loggerPrefix + "wrap() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(max),
            loggerPrefix + "wrap() 3rd param must be a number"
          );
          DEV: assert(
            max > min,
            loggerPrefix + "wrap() the 2nd param must be less than the 3rd param"
          );
          return value - (max - min) * math.floor((value - min) / (max - min));
        },
        map(value, start1, stop1, start2, stop2, withinBounds) {
          DEV: assert(
            isNumber(value),
            loggerPrefix + "map() 1st param must be a number"
          );
          DEV: assert(
            isNumber(start1),
            loggerPrefix + "map() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(stop1),
            loggerPrefix + "map() 3rd param must be a number"
          );
          DEV: assert(
            isNumber(start2),
            loggerPrefix + "map() 4th param must be a number"
          );
          DEV: assert(
            isNumber(stop2),
            loggerPrefix + "map() 5th param must be a number"
          );
          DEV: assert(
            stop1 !== start1,
            loggerPrefix + "map() the 2nd param must be different than the 3rd param"
          );
          const result = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
          return withinBounds ? instance.clamp(result, start2, stop2) : result;
        },
        norm: (value, start, stop) => {
          DEV: assert(
            isNumber(value),
            loggerPrefix + "norm() 1st param must be a number"
          );
          DEV: assert(
            isNumber(start),
            loggerPrefix + "norm() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(stop),
            loggerPrefix + "norm() 3rd param must be a number"
          );
          DEV: assert(
            start !== stop,
            loggerPrefix + "norm() the 2nd param must be different than the 3rd param"
          );
          return instance.map(value, start, stop, 0, 1);
        },
        rand: (min = 0, max = 1) => {
          DEV: assert(
            isNumber(min),
            loggerPrefix + "rand() 1st param must be a number"
          );
          DEV: assert(
            isNumber(max),
            loggerPrefix + "rand() 2nd param must be a number"
          );
          DEV: assert(
            max >= min,
            loggerPrefix + "rand() the 1st param must be less than the 2nd param"
          );
          const a = 1664525;
          const c = 1013904223;
          const m = 4294967296;
          _rngSeed = (a * _rngSeed + c) % m;
          return _rngSeed / m * (max - min) + min;
        },
        randi: (min = 0, max = 1) => {
          DEV: assert(
            isNumber(min),
            loggerPrefix + "randi() 1st param must be a number"
          );
          DEV: assert(
            isNumber(max),
            loggerPrefix + "randi() 2nd param must be a number"
          );
          DEV: assert(
            max >= min,
            loggerPrefix + "randi() the 1st param must be less than the 2nd param"
          );
          return ~~instance.rand(min, max + 1);
        },
        rseed(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            loggerPrefix + "rseed() 1st param must be a positive integer or zero"
          );
          _rngSeed = ~~value;
        },
        cls(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "cls() 1st param must be a positive number or zero or undefined"
          );
          if (null == color) {
            _ctx.clearRect(0, 0, instance.W, instance.H);
          } else {
            instance.rectfill(0, 0, instance.W, instance.H, color);
          }
        },
        rect(x, y, width, height, color, radii) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "rect() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "rect() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(width) && width > 0,
            loggerPrefix + "rect() 3rd param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            loggerPrefix + "rect() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "rect() 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            loggerPrefix + "rect() 6th param must be a number or array of numbers"
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
          DEV: assert(
            isNumber(x),
            loggerPrefix + "rectfill() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "rectfill() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(width) && width >= 0,
            loggerPrefix + "rectfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(height) && height >= 0,
            loggerPrefix + "rectfill() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "rectfill() 5th param must be a positive number or zero"
          );
          DEV: assert(
            null == radii || isNumber(radii) || Array.isArray(radii) && radii.length >= 1,
            loggerPrefix + "rectfill() 6th param must be a number or array of at least 2 numbers"
          );
          beginPath(_ctx);
          _ctx[radii ? "roundRect" : "rect"](~~x, ~~y, ~~width, ~~height, radii);
          instance.fill(color);
        },
        circ(x, y, radius, color) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "circ() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "circ() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(radius) && radius >= 0,
            loggerPrefix + "circ() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "circ() 4th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
          instance.stroke(color);
        },
        circfill(x, y, radius, color) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "circfill() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "circfill() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(radius) && radius >= 0,
            loggerPrefix + "circfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "circfill() 4th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.arc(~~x, ~~y, ~~radius, 0, TWO_PI);
          instance.fill(color);
        },
        oval(x, y, radiusX, radiusY, color) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "oval() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "oval() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            loggerPrefix + "oval() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            loggerPrefix + "oval() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "oval() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI);
          instance.stroke(color);
        },
        ovalfill(x, y, radiusX, radiusY, color) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "ovalfill() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "ovalfill() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(radiusX) && radiusX >= 0,
            loggerPrefix + "ovalfill() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(radiusY) && radiusY >= 0,
            loggerPrefix + "ovalfill() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "ovalfill() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
          _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TWO_PI);
          instance.fill(color);
        },
        shape(points) {
          DEV: assert(
            Array.isArray(points),
            loggerPrefix + "shape() 1st param must be an array of numbers"
          );
          DEV: assert(
            points.length >= 6,
            loggerPrefix + "shape() 1st param must be an array with at least 6 numbers (3 points)"
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
        line(x1, y1, x2, y2, color) {
          DEV: assert(
            isNumber(x1),
            loggerPrefix + "line() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y1),
            loggerPrefix + "line() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(x2),
            loggerPrefix + "line() 3rd param must be a positive number or zero"
          );
          DEV: assert(
            isNumber(y2),
            loggerPrefix + "line() 4th param must be a positive number or zero"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "line() 5th param must be a positive number or zero"
          );
          beginPath(_ctx);
          let xfix = _outline_fix !== 0 && ~~x1 === ~~x2 ? 0.5 : 0;
          let yfix = _outline_fix !== 0 && ~~y1 === ~~y2 ? 0.5 : 0;
          _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix);
          _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix);
          instance.stroke(color);
        },
        linewidth(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            loggerPrefix + "linewidth() 1st param must be a positive number or zero"
          );
          _ctx.lineWidth = ~~value;
          _outline_fix = 0 === ~~value % 2 ? 0 : 0.5;
        },
        linedash(segments, offset = 0) {
          DEV: assert(
            Array.isArray(segments) && segments.length > 0,
            loggerPrefix + "linedash() 1st param must be an array of numbers"
          );
          DEV: assert(
            isNumber(offset),
            loggerPrefix + "linedash() 2nd param must be a number"
          );
          _ctx.setLineDash(segments);
          _ctx.lineDashOffset = offset;
        },
        text(x, y, message, color = _defaultTextColor, fontStyle = "normal") {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "text() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "text() 2nd param must be a number"
          );
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "text() 4th param must be a positive number or zero"
          );
          DEV: assert(
            "string" === typeof fontStyle,
            loggerPrefix + "text() 5th param must be a string"
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
          _fontLineHeight = value;
        },
        textfont(family) {
          DEV: assert(
            "string" === typeof family,
            loggerPrefix + "textfont() 1st param must be a string"
          );
          _fontFamily = family;
        },
        textsize(size) {
          DEV: assert(
            isNumber(size),
            loggerPrefix + "textsize() 1st param must be a number"
          );
          _fontSize = size;
        },
        textalign(align, baseline) {
          DEV: assert(
            null == align || ["left", "right", "center", "start", "end"].includes(align),
            loggerPrefix + "textalign() 1st param must be null or one of the following strings: center, left, right, start or end."
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
            loggerPrefix + "textalign() 2nd param must be null or one of the following strings: middle, top, bottom, hanging, alphabetic or ideographic."
          );
          if (align) _ctx.textAlign = align;
          if (baseline) _ctx.textBaseline = baseline;
        },
        image(x, y, source) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "image() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "image() 2nd param must be a number"
          );
          _ctx.drawImage(source, ~~x, ~~y);
        },
        spr(x, y, pixels) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "spr() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "spr() 2nd param must be a number"
          );
          DEV: assert(
            "string" === typeof pixels,
            loggerPrefix + "spr() 3rd param must be a string"
          );
          const rows = pixels.trim().split("\n");
          for (let row = 0; row < rows.length; row++) {
            const chars = rows[row].trim();
            for (let col = 0; col < chars.length; col++) {
              const char = chars[col];
              if (char !== "." && char !== " ") {
                instance.rectfill(
                  x + col,
                  y + row,
                  1,
                  1,
                  parseInt(char, 36) || 0
                );
              }
            }
          }
        },
        paint(width, height, callback, options = {}) {
          DEV: assert(
            isNumber(width) && width >= 1,
            loggerPrefix + "paint() 1st param must be a positive number"
          );
          DEV: assert(
            isNumber(height) && height >= 1,
            loggerPrefix + "paint() 2nd param must be a positive number"
          );
          DEV: assert(
            "function" === typeof callback,
            loggerPrefix + "paint() 3rd param must be a function"
          );
          DEV: assert(
            options && null == options.scale || isNumber(options.scale),
            loggerPrefix + "paint() 4th param (options.scale) must be a number"
          );
          DEV: assert(
            options && null == options.canvas || options.canvas instanceof OffscreenCanvas,
            loggerPrefix + "paint() 4th param (options.canvas) must be an OffscreenCanvas"
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
          if (context) {
            _ctx = context;
          }
          return _ctx;
        },
        push() {
          _ctx.save();
        },
        pop() {
          _ctx.restore();
        },
        translate(x, y) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "translate() 1st param must be a number"
          );
          DEV: assert(
            isNumber(y),
            loggerPrefix + "translate() 2nd param must be a number"
          );
          _ctx.translate(~~x, ~~y);
        },
        scale(x, y) {
          DEV: assert(
            isNumber(x),
            loggerPrefix + "scale() 1st param must be a number"
          );
          DEV: assert(
            null == y || isNumber(y),
            loggerPrefix + "scale() 2nd param must be a number"
          );
          _ctx.scale(x, y || x);
        },
        rotate(radians) {
          DEV: assert(
            isNumber(radians),
            loggerPrefix + "rotate() 1st param must be a number"
          );
          _ctx.rotate(radians);
        },
        alpha(value) {
          DEV: assert(
            isNumber(value),
            loggerPrefix + "alpha() 1st param must be a number"
          );
          _ctx.globalAlpha = instance.clamp(value, 0, 1);
        },
        fill(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "fill() 1st param must be a positive number or zero"
          );
          _ctx.fillStyle = getColor(color);
          _ctx.fill();
        },
        stroke(color) {
          DEV: assert(
            null == color || isNumber(color) && color >= 0,
            loggerPrefix + "stroke() 1st param must be a positive number or zero"
          );
          _ctx.strokeStyle = getColor(color);
          _ctx.stroke();
        },
        clip(callback) {
          DEV: assert(
            "function" === typeof callback,
            loggerPrefix + "clip() 1st param must be a function"
          );
          beginPath(_ctx);
          callback(_ctx);
          _ctx.clip();
        },
        sfx(zzfxParams, pitchSlide = 0, volumeFactor = 1) {
          DEV: assert(
            null == zzfxParams || Array.isArray(zzfxParams),
            loggerPrefix + "sfx() 1st param must be an array"
          );
          DEV: assert(
            isNumber(pitchSlide),
            loggerPrefix + "sfx() 2nd param must be a number"
          );
          DEV: assert(
            isNumber(volumeFactor),
            loggerPrefix + "sfx() 3rd param must be a number"
          );
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
        volume(value) {
          DEV: assert(
            isNumber(value) && value >= 0,
            loggerPrefix + "volume() 1st param must be a positive number or zero"
          );
          root.zzfxV = value;
        },
        canvas: () => _canvas,
        use(callback, config = {}) {
          DEV: assert(
            "function" === typeof callback,
            loggerPrefix + "use() 1st param must be a function"
          );
          DEV: assert(
            "object" === typeof config,
            loggerPrefix + "use() 2nd param must be an object"
          );
          loadPlugin(callback, config);
        },
        listen: (eventName, callback) => {
          DEV: assert(
            "string" === typeof eventName,
            loggerPrefix + "listen() 1st param must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            loggerPrefix + "listen() 2nd param must be a function"
          );
          eventName = lowerCase(eventName);
          _eventListeners[eventName] = _eventListeners[eventName] || /* @__PURE__ */ new Set();
          _eventListeners[eventName].add(callback);
        },
        unlisten: (eventName, callback) => {
          DEV: assert(
            "string" === typeof eventName,
            loggerPrefix + "unlisten() 1st param must be a string"
          );
          DEV: assert(
            "function" === typeof callback,
            loggerPrefix + "unlisten() 2nd param must be a function"
          );
          eventName = lowerCase(eventName);
          if (_eventListeners[eventName]) {
            _eventListeners[eventName].delete(callback);
          }
        },
        emit(eventName, arg1, arg2, arg3, arg4) {
          DEV: assert(
            "string" === typeof eventName,
            loggerPrefix + "emit() 1st param must be a string"
          );
          if (_initialized) {
            eventName = lowerCase(eventName);
            triggerEvent("before:" + eventName, arg1, arg2, arg3, arg4);
            if (!settings.loop && "function" === typeof root[eventName]) {
              root[eventName](arg1, arg2, arg3, arg4);
            }
            triggerEvent(eventName, arg1, arg2, arg3, arg4);
            triggerEvent("after:" + eventName, arg1, arg2, arg3, arg4);
          }
        },
        pal(colors, textColor = 3) {
          DEV: assert(
            null == colors || Array.isArray(colors) && colors.length > 0,
            loggerPrefix + "pal() 1st param must be a array of color strings"
          );
          DEV: assert(
            isNumber(textColor) && textColor >= 0,
            loggerPrefix + "pal() 2nd param must be a positive number or zero"
          );
          _colorPalette = colors || defaultPalette;
          _colorPaletteState = [];
          _defaultTextColor = textColor;
        },
        palc(a, b) {
          DEV: assert(
            null == a || isNumber(a) && a >= 0,
            loggerPrefix + "palc() 1st param must be a positive number"
          );
          DEV: assert(
            isNumber(a) ? isNumber(b) && b >= 0 : null == b,
            loggerPrefix + "palc() 2nd param must be a positive number"
          );
          if (a == null) {
            _colorPaletteState = [];
          } else {
            _colorPaletteState[a] = b;
          }
        },
        def(key, value) {
          DEV: assert(
            "string" === typeof key,
            loggerPrefix + "def() 1st param must be a string"
          );
          DEV: if (null == value) {
            console.warn(
              loggerPrefix + `def() changed the key "${key}" to null (previous value was ${instance[key]})`
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
            loggerPrefix + "timescale() 1st param must be a positive number or zero"
          );
          _timeScale = value;
        },
        framerate(value) {
          DEV: assert(
            isNumber(value) && value >= 1,
            loggerPrefix + "framerate() 1st param must be a positive number"
          );
          _fpsInterval = 1e3 / ~~value;
        },
        stat(index) {
          DEV: assert(
            isNumber(index),
            loggerPrefix + "stat() 1st param must be a number"
          );
          const internals = [
            settings,
            _initialized,
            _fpsInterval / 1e3,
            _canvasScale,
            _eventListeners,
            _colorPalette,
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
            loggerPrefix + "stat() 1st param must be a number between 0 and " + (internals.length - 1)
          );
          return internals[index];
        },
        pause() {
          _paused = true;
          cancelAnimationFrame(_rafid);
        },
        resume() {
          DEV: assert(
            _initialized,
            loggerPrefix + 'resume() cannot be called before the "init" event and neither after the quit() function'
          );
          if (_initialized && _paused) {
            _paused = false;
            _accumulated = _fpsInterval;
            _lastFrameTime = perf.now();
            _rafid = raf(drawFrame);
          }
        },
        paused() {
          return _paused;
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
            loggerPrefix + "quit() terminated a Litecanvas instance."
          );
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
          on(_canvas, "mousedown", (ev) => {
            if (ev.button === 0) {
              preventDefault(ev);
              const [x, y] = _getXY(ev);
              instance.emit("tap", x, y, 0);
              _registerTap(0, x, y);
              _pressingMouse = true;
            }
          });
          on(_canvas, "mouseup", (ev) => {
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
          });
          on(root, "mousemove", (ev) => {
            preventDefault(ev);
            const [x, y] = _getXY(ev);
            instance.def("MX", x);
            instance.def("MY", y);
            if (!_pressingMouse) return;
            instance.emit("tapping", x, y, 0);
            _updateTap(0, x, y);
          });
          on(_canvas, "touchstart", (ev) => {
            preventDefault(ev);
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch);
              instance.emit("tap", x, y, touch.identifier + 1);
              _registerTap(touch.identifier + 1, x, y);
            }
          });
          on(_canvas, "touchmove", (ev) => {
            preventDefault(ev);
            const touches = ev.changedTouches;
            for (const touch of touches) {
              const [x, y] = _getXY(touch);
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
          instance.def("iskeydown", (key) => {
            DEV: assert(
              null == key || "string" === typeof key,
              loggerPrefix + "iskeydown() 1st param must be a string or undefined"
            );
            return keyCheck(_keysDown, key);
          });
          instance.def("iskeypressed", (key) => {
            DEV: assert(
              null == key || "string" === typeof key,
              loggerPrefix + "iskeypressed() 1st param must be a string or undefined"
            );
            return keyCheck(_keysPress, key);
          });
          instance.def("lastkey", () => _lastKey);
        }
        _initialized = true;
        instance.resume();
        instance.emit("init", instance);
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
            DEV: console.warn(
              loggerPrefix + "the last frame updated " + updated + " times. This can drop the FPS if it keeps happening."
            );
          }
        }
      }
      function setupCanvas() {
        if ("string" === typeof settings.canvas) {
          _canvas = document.querySelector(settings.canvas);
          DEV: assert(
            null != _canvas,
            loggerPrefix + 'litecanvas() option "canvas" is an invalid CSS selector'
          );
        } else {
          _canvas = settings.canvas;
        }
        _canvas = _canvas || document.createElement("canvas");
        DEV: assert(
          _canvas instanceof HTMLElement && "CANVAS" === _canvas.tagName,
          loggerPrefix + 'litecanvas() option "canvas" should be a canvas element or string (CSS selector of a canvas)'
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
          loggerPrefix + 'litecanvas() option "width" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || isNumber(settings.height) && settings.height > 0,
          loggerPrefix + 'litecanvas() option "height" should be a positive number when defined'
        );
        DEV: assert(
          null == settings.height || settings.width > 0 && settings.height > 0,
          loggerPrefix + 'litecanvas() option "width" is required when the option "height" is defined'
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
          _canvasScale = math.min(innerWidth / width, innerHeight / height);
          _canvasScale = maxScale > 1 && _canvasScale > maxScale ? maxScale : _canvasScale;
          _canvas.style.width = width * _canvasScale + "px";
          _canvas.style.height = height * _canvasScale + "px";
        }
        _ctx.imageSmoothingEnabled = false;
        instance.textalign("start", "top");
        instance.emit("resized", _canvasScale);
      }
      function triggerEvent(eventName, arg1, arg2, arg3, arg4) {
        if (_eventListeners[eventName]) {
          for (const callback of _eventListeners[eventName]) {
            callback(arg1, arg2, arg3, arg4);
          }
        }
      }
      function loadPlugin(callback, config) {
        const pluginData = callback(instance, config);
        DEV: assert(
          null == pluginData || "object" === typeof pluginData,
          loggerPrefix + "litecanvas() plugins should return an object or nothing"
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
      DEV: console.info(loggerPrefix + `version ${version} started`);
      DEV: console.debug(loggerPrefix + `litecanvas() options =`, settings);
      setupCanvas();
      if (settings.loop) {
        for (const eventName in settings.loop) {
          if (settings.loop[eventName])
            instance.listen(eventName, settings.loop[eventName]);
        }
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
    var Ct = Object.defineProperty;
    var Yt = (e, t) => {
      for (var s in t) Ct(e, s, { get: t[s], enumerable: true });
    };
    globalThis.utils = globalThis.utils || {};
    globalThis.utils.global = (e = true) => {
      for (let t in globalThis.utils) t !== "global" && (e || globalThis[t] === void 0) && (globalThis[t] = globalThis.utils[t]);
    };
    var X = {};
    Yt(X, { ANCHOR_BOT_LEFT: () => me, ANCHOR_BOT_RIGHT: () => pe, ANCHOR_CENTER: () => le, ANCHOR_TOP_LEFT: () => ot, ANCHOR_TOP_RIGHT: () => ce, Actor: () => Z, BACK_IN: () => be, BACK_IN_OUT: () => ge, BACK_OUT: () => ye, BOUNCE_IN: () => Nt, BOUNCE_IN_OUT: () => we, BOUNCE_OUT: () => V, Camera: () => g, DOWN: () => he, EASE_IN: () => xe, EASE_IN_OUT: () => _e, EASE_OUT: () => de, ELASTIC_IN: () => Ne, ELASTIC_IN_OUT: () => Ie, ELASTIC_OUT: () => Me, Grid: () => E, LEFT: () => ue, LINEAR: () => gt, Noise: () => W, ONE: () => ae, RIGHT: () => ne, TypedGrid: () => L, UP: () => oe, Vector: () => Ut, ZERO: () => at, advance: () => ht, almost: () => bt, assert: () => q, choose: () => Rt, clamp: () => p, colcirc: () => K, colrect: () => z, colrectcirc: () => w, dd: () => Bt, diff: () => F, dist: () => lt, flipImage: () => Mt, formatTime: () => St, fract: () => nt, head: () => At, intersection: () => I, is: () => R, last: () => vt, lerpAngle: () => ft, lpad: () => Ot, mag: () => ct, makeCircle: () => Et, makeRectangle: () => Tt, mean: () => mt, median: () => pt, mod: () => ut, move: () => _t, percent: () => xt, range: () => Pt, resolverect: () => j, rpad: () => kt, scaleImage: () => It, shuffle: () => Ft, smoothstep: () => yt, sum: () => A, tail: () => Lt, tintImage: () => wt, tween: () => fe, vec: () => h, vecAbs: () => Kt, vecAdd: () => tt, vecAngle: () => Dt, vecAngleBetween: () => jt, vecCeil: () => $t, vecClamp: () => Qt, vecCross: () => qt, vecDist: () => rt, vecDist2: () => Xt, vecDiv: () => O, vecDot: () => C, vecEq: () => Y, vecFloor: () => Gt, vecHeading: () => it, vecIsZero: () => se, vecLerp: () => zt, vecLimit: () => Wt, vecMag: () => T, vecMag2: () => st, vecMove: () => ee, vecMult: () => P, vecNorm: () => B, vecRand: () => ie, vecReflect: () => Ht, vecRem: () => te, vecRotate: () => Vt, vecRound: () => Jt, vecSet: () => S, vecSetMag: () => et, vecSub: () => k, vecToArray: () => re, wave: () => dt });
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
      constructor(t = null, s = 0, r = 0, i = null, a = null) {
        this._engine = t || globalThis, this.ox = s, this.oy = r, this.resize(i || this._engine.W - s, a || this._engine.H - r), this.x = this.width / 2, this.y = this.height / 2, this._shake = { x: 0, y: 0, removeListener: null };
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
        let i = Math.cos(-this.rotation), a = Math.sin(-this.rotation);
        return t = (t - this.width / 2 - this.ox) / this.scale, s = (s - this.height / 2 - this.oy) / this.scale, r.x = i * t - a * s + this.x, r.y = a * t + i * s + this.y, r;
      }
      getCameraPoint(t, s, r = {}) {
        let i = Math.cos(-this.rotation), a = Math.sin(-this.rotation);
        return t = t - this.x, s = s - this.y, t = i * t - a * s, s = a * t + i * s, r.x = t * this.scale + this.width / 2 + this.ox, r.y = s * this.scale + this.height / 2 + this.oy, r;
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
    var I = (e, t, s, r, i, a, o, n) => {
      let u = Math.max(e, i), d = Math.min(e + s, i + o) - u, c = Math.max(t, a), _ = Math.min(t + r, a + n) - c;
      return [u, c, d, _];
    };
    var j = (e, t, s, r, i, a, o, n) => {
      let [u, d, c, _] = I(e, t, s, r, i, a, o, n), x = "", y = e, l = t;
      return c < _ ? e < i ? (x = "right", y = i - s) : (x = "left", y = i + o) : t < a ? (x = "bottom", l = a - r) : (x = "top", l = a + n), { dir: x, x: y, y: l };
    };
    var q = (e, t = "Assertion failed") => {
      if (!e) throw new Error(t);
    };
    var z = (e, t, s, r, i, a, o, n) => e < i + o && e + s > i && t < a + n && t + r > a;
    var K = (e, t, s, r, i, a) => (r - e) * (r - e) + (i - t) * (i - t) <= (s + a) * (s + a);
    var w = (e, t, s, r, i, a, o) => {
      let n = i - Math.max(e, Math.min(i, e + s)), u = a - Math.max(t, Math.min(a, t + r));
      return n * n + u * u <= o * o;
    };
    var E = class e {
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
        let r = s ? this.length - 1 : 0, i = s ? -1 : this.length, a = s ? -1 : 1;
        for (; r !== i; ) {
          let o = this.indexToPointX(r), n = this.indexToPointY(r), u = this._c[r];
          if (t(o, n, u, this) === false) break;
          r += a;
        }
      }
      fill(t) {
        this.forEach((s, r) => {
          this.set(s, r, t);
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
      toString(t = " ", s = true) {
        if (!s) return this._c.join(t);
        let r = [];
        return this.forEach((i, a, o) => {
          r[a] = r[a] || "", r[a] += o + t;
        }), r.join(`
`);
      }
    }, L = class e extends E {
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
    function $(e, t, s) {
      return e < t ? t : e > s ? s : e;
    }
    var p = (e, t, s) => e < t ? t : e > s ? s : e;
    var J = Math.cos, Q = Math.sin, Zt = 2 * Math.PI, G = parseFloat, N = class {
      constructor(t = 0, s = t) {
        this.x = G(t) || 0, this.y = G(s) || 0;
      }
      toString() {
        return `Vector (${this.x}, ${this.y})`;
      }
    }, Ut = N, b = (e) => e instanceof N, h = (e = 0, t = e) => (b(e) && (t = e.y, e = e.x), new N(e, t)), S = (e, t, s = t) => (b(t) ? S(e, t.x, t.y) : (e.x = t, e.y = s), e), tt = (e, t, s = t) => b(t) ? tt(e, t.x, t.y) : (e.x += t, e.y += s, e), k = (e, t, s = t) => b(t) ? k(e, t.x, t.y) : (e.x -= t, e.y -= s, e), P = (e, t, s = t) => b(t) ? P(e, t.x, t.y) : (e.x *= t, e.y *= s, e), O = (e, t, s = t) => b(t) ? O(e, t.x, t.y) : (e.x /= t || 1, e.y /= s || 1, e), Vt = (e, t) => {
      let s = J(t), r = Q(t);
      return e.x = s * e.x - r * e.y, e.y = r * e.x + s * e.y, e;
    }, Ht = (e, t) => {
      let s = B(h(t));
      return k(e, P(s, 2 * C(e, s)));
    }, et = (e, t) => P(B(e), t), T = (e) => Math.hypot(e.x, e.y), st = (e) => e.x * e.x + e.y * e.y, B = (e) => {
      let t = T(e);
      return t > 0 && O(e, t), e;
    }, Wt = (e, t = 1) => (st(e) > t * t && et(e, t), e), rt = (e, t) => Math.hypot(t.x - e.x, t.y - e.y), Xt = (e, t) => {
      let s = e.x - t.x, r = e.y - t.y;
      return s * s + r * r;
    }, it = (e) => Math.atan2(e.y, e.x), Dt = (e) => it(e), C = (e, t) => e.x * t.x + e.y * t.y, jt = (e, t) => {
      let s = T(e), r = T(t);
      return r - s ? Math.acos(p(C(e, t) / (s * r), -1, 1)) : 0;
    }, qt = (e, t) => e.x * t.y - e.y * t.x, zt = (e, t, s) => (e.x += (t.x - e.x) * s || 0, e.y += (t.y - e.y) * s || 0, e), Kt = (e) => (e.x = Math.abs(e.x), e.y = Math.abs(e.y), e), $t = (e) => (e.x = Math.ceil(e.x), e.y = Math.ceil(e.y), e), Gt = (e) => (e.x = Math.floor(e.x), e.y = Math.floor(e.y), e), Jt = (e) => (e.x = Math.round(e.x), e.y = Math.round(e.y), e), Qt = (e, t, s) => S(e, p(e.x, t, s), p(e.y, t, s)), te = (e, t) => (e.x %= t, e.y %= t, e), ee = (e, t, s = 1) => {
      let r = t.x - e.x, i = t.y - e.y, a = Math.hypot(r, i);
      if (s = Math.abs(s), a <= s || a === 0) e.x = t.x, e.y = t.y;
      else {
        let o = s / a;
        e.x = e.x + r * o, e.y = e.y + i * o;
      }
      return e;
    }, Y = (e, t, s = t, r = 1e-5) => b(t) ? Y(e, t.x, t.y, r) : rt(e, t, s) <= r, se = (e) => Y(e, at), re = (e) => [e.x, e.y], ie = (e = 1, t = e, s = globalThis.rand || Math.random) => {
      let r = s() * Zt, i = s() * (t - e) + e;
      return h(J(r) * i, Q(r) * i);
    }, at = h(0, 0), ae = h(1, 1), oe = h(0, -1), ne = h(1, 0), he = h(0, 1), ue = h(-1, 0);
    var le = h(0.5, 0.5), ot = h(0, 0), ce = h(1, 0), me = h(0, 1), pe = h(1, 1), Z = class {
      sprite;
      pos;
      _o;
      _s;
      flipX = false;
      flipY = false;
      angle = 0;
      opacity = 1;
      hidden = false;
      constructor(t, s, r = ot) {
        this.sprite = t || { width: 0, height: 0 }, this.pos = s || h(0), this._o = h(r), this._s = h(1, 1);
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
        let s = this.sprite.width * (t ? this._s.x : 1), r = this.sprite.height * (t ? this._s.y : 1), i = this.pos.x - s * this.anchor.x, a = this.pos.y - r * this.anchor.y;
        return [i, a, s, r];
      }
      in(t, s, r = 1) {
        return w(...this.getBounds(), t, s, r);
      }
      col(t) {
        return colrect(...this.getBounds(), ...t.getBounds());
      }
      draw(t = globalThis, s = true) {
        s && t.push(), this.transform(t), this.sprite.width && this.sprite.height && !this.hidden && this.opacity > 0 && this.drawImage(t), s && t.pop();
      }
      transform(t = globalThis) {
        t.translate(this.pos.x, this.pos.y), t.rotate(t.deg2rad(this.angle)), t.scale((this.flipX ? -1 : 1) * this._s.x, (this.flipY ? -1 : 1) * this._s.y);
      }
      drawImage(t = globalThis, s = true) {
        let r = this.anchor, i = -this.sprite.width * (this.flipX ? 1 - r.x : r.x), a = -this.sprite.height * (this.flipY ? 1 - r.y : r.y);
        s && t.alpha(this.opacity), t.image(i, a, this.sprite);
      }
    };
    var F = (e, t) => Math.abs(t - e);
    var nt = (e) => e % 1;
    var R = (e, t) => typeof t == "function" ? e instanceof t : t === "array" ? Array.isArray(e) : t === "number" ? typeof e == "number" && !Number.isNaN(e) : t === "infinity" ? typeof e == "number" && Math.abs(e) === 1 / 0 : typeof e === t;
    var ht = (e, t, s, r = 1) => {
      s && (t.x += s.x * r, t.y += s.y * r), e.x += t.x * r, e.y += t.y * r;
    };
    var ut = (e, t) => (t + e % t) % t;
    var lt = (e, t, s, r) => Math.hypot(s - e, r - t) || 0;
    var ct = (e, t) => Math.hypot(e, t);
    var A = (e) => {
      let t = 0;
      for (let s = 0; s < e.length; s++) t += e[s];
      return t;
    };
    var mt = (e) => A(e) / e.length;
    var pt = (e) => {
      let t = e.sort((r, i) => r - i), s = Math.floor(t.length / 2);
      return t.length % 2 === 0 ? (t[s - 1] + t[s]) / 2 : t[s];
    };
    var ft = (e, t, s) => {
      let r = (t - e) % 360;
      return r > 180 ? r -= 360 : r < -180 && (r += 360), e + r * s;
    };
    var xt = (e, t, s) => p((e - t) / (s - t), 0, 1);
    var dt = (e, t, s, r = Math.sin) => e + (r(s) + 1) / 2 * (t - e);
    var _t = (e, t, s) => Math.abs(t - e) <= s ? t : e + Math.sign(t - e) * s;
    var bt = (e, t, s = 1e-5) => F(e, t) <= s;
    var yt = (e, t, s) => {
      let r = p((s - e) / (t - e), 0, 1);
      return r * r * (3 - 2 * r);
    };
    var v = Math.PI / 2, fe = (e, t, s, r = 1, i = gt) => new U(e, t, s, r, i), gt = (e) => e, xe = (e) => e * e, de = (e) => -e * (e - 2), _e = (e) => e < 0.5 ? 2 * e * e : -2 * e * e + 4 * e - 1, be = (e) => e * e * e - e * Math.sin(e * Math.PI), ye = (e) => {
      let t = 1 - e;
      return 1 - (t * t * t - t * Math.sin(t * Math.PI));
    }, ge = (e) => {
      if (e < 0.5) {
        let s = 2 * e;
        return 0.5 * (s * s * s - s * Math.sin(s * Math.PI));
      }
      let t = 1 - (2 * e - 1);
      return 0.5 * (1 - (t * t * t - t * Math.sin(e * Math.PI))) + 0.5;
    }, Ne = (e) => Math.sin(13 * v * e) * Math.pow(2, 10 * (e - 1)), Me = (e) => Math.sin(-13 * v * (e + 1)) * Math.pow(2, -10 * e) + 1, Ie = (e) => {
      if (e < 0.5) {
        let r = Math.sin(13 * v * (2 * e)), i = Math.pow(2, 10 * (2 * e - 1));
        return 0.5 * r * i;
      }
      let t = Math.sin(-13 * v * (2 * e - 1 + 1)), s = Math.pow(2, -10 * (2 * e - 1));
      return 0.5 * (t * s + 2);
    }, Nt = (e) => 1 - V(1 - e), V = (e) => e < 4 / 11 ? 121 * e * e / 16 : e < 8 / 11 ? 363 / 40 * e * e - 99 / 10 * e + 17 / 5 : e < 9 / 10 ? 4356 / 361 * e * e - 35442 / 1805 * e + 16061 / 1805 : 54 / 5 * e * e - 513 / 25 * e + 268 / 25, we = (e) => e < 0.5 ? 0.5 * Nt(e * 2) : 0.5 * V(e * 2 - 1) + 0.5, U = class {
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
      constructor(t, s, r, i, a) {
        this._o = t, this._p = s, this._x = r, this._d = i, this._e = a, this._w = 0;
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
          let a = this._t - this._w;
          this._o[this._p] = this._lc.lerp(s, r, this._e(a / this._d)), this._t += i, a >= this._d && (this._o[this._p] = r, this.stop());
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
    var H = (e) => 0.5 * (1 - Math.cos(e * Math.PI)), W = class {
      _p = [];
      _po = 4;
      _pf = 0.5;
      _e = null;
      constructor(t) {
        this._e = t || globalThis, this.noiseSeed();
      }
      noise(t, s = 0, r = 0) {
        t < 0 && (t = -t), s < 0 && (s = -s), r < 0 && (r = -r);
        let i = Math.floor(t), a = Math.floor(s), o = Math.floor(r), n = t - i, u = s - a, d = r - o, c, _, x = 0, y = 0.5, l, m, M;
        for (let D = 0; D < this._po; D++) {
          let f = i + (a << 4) + (o << 8);
          c = H(n), _ = H(u), l = this._p[f & 4095], l += c * (this._p[f + 1 & 4095] - l), m = this._p[f + 16 & 4095], m += c * (this._p[f + 16 + 1 & 4095] - m), l += _ * (m - l), f += 256, m = this._p[f & 4095], m += c * (this._p[f + 1 & 4095] - m), M = this._p[f + 16 & 4095], M += c * (this._p[f + 16 + 1 & 4095] - M), m += _ * (M - m), l += H(d) * (m - l), x += l * y, y *= this._pf, i <<= 1, n *= 2, a <<= 1, u *= 2, o <<= 1, d *= 2, n >= 1 && (i++, n--), u >= 1 && (a++, u--), d >= 1 && (o++, d--);
        }
        return x;
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
    var Mt = (e, t = true, s = false, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.scale(t ? -1 : 1, s ? -1 : 1), r.image(t ? -e.width : 0, s ? -e.height : 0, e), r.pop();
    });
    var It = (e, t, s = true, r = globalThis) => r.paint(e.width * t, e.height * t, (i) => {
      r.push(), i.imageSmoothingEnabled = !s, r.scale(t), r.image(0, 0, e), r.pop();
    });
    var wt = (e, t, s = 1, r = globalThis) => r.paint(e.width, e.height, (i) => {
      r.push(), r.alpha(s), r.rectfill(0, 0, e.width, e.height, t), i.globalCompositeOperation = "destination-atop", r.alpha(1), r.image(0, 0, e), r.pop();
    });
    var Et = (e, t, { borderWidth: s = 0, borderColor: r = 0, engine: i = globalThis } = {}) => {
      let a = e * 2 + s;
      return i.paint(a, a, () => {
        i.circfill(a / 2, a / 2, e, t), s > 0 && (i.linewidth(s), i.stroke(r));
      });
    };
    var Tt = (e, t, s, { borderWidth: r = 0, borderColor: i = 0, engine: a = globalThis } = {}) => {
      let o = e + r * 2, n = t + r * 2;
      return a.paint(o, n, () => {
        let u = r > 0;
        u && a.cls(i), a.rectfill(u ? r : 0, u ? r : 0, e, t, s);
      });
    };
    var Pt = (e, t = 0, s = 1) => [...Array(e | 0).keys()].map((r) => t + s * r);
    var Ft = (e, t = globalThis.rand || Math.random) => {
      e = [...e];
      for (let s = e.length - 1; s > 0; s--) {
        let r = Math.floor(t() * (s + 1)), i = e[s];
        e[s] = e[r], e[r] = i;
      }
      return e;
    };
    var Rt = (e, t = globalThis.rand || Math.random) => e[Math.floor(t() * e.length)];
    var At = (e) => e[0];
    var vt = (e) => e[e.length - 1];
    var Lt = (e) => e.slice(1);
    var St = (e) => ~~(e / 60) + ":" + (e % 60 < 10 ? "0" : "") + ~~(e % 60);
    var kt = (e, t, s = "0") => (e + "").padEnd(t, s);
    var Ot = (e, t, s = "0") => (e + "").padStart(t, s);
    var Bt = (e, t, s = globalThis) => {
      s.pal(["blue", "#fff"]), s.cls(0), s.ctx().resetTransform(), s.textfont("monospace"), s.textsize(16), s.textalign("start", "top"), s.text(16, 16, `${t ?? "dd() output"}: ` + (R(e, "object") ? JSON.stringify(e, null, 4) : e)), s.quit();
    };
    globalThis.utils = Object.assign(globalThis.utils || {}, X);
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
    var _ = (r, u, p, m, n, f, b, x) => r < n + b && r + p > n && u < f + x && u + m > f;
    var y = (r, u, p, m, n, f) => (m - r) * (m - r) + (n - u) * (n - u) <= (p + f) * (p + f);
    var Bt = 2 * Math.PI;
    var N = (r, u, p, m = Math.sin) => r + (m(p) + 1) / 2 * (u - r);
    var vr = Math.PI / 2;
    var tt = { warnings: true };
    function v(r, u = {}) {
      if (r.stat(1)) throw 'Plugin Migrate should be loaded before the "init" event';
      u = Object.assign({}, tt, u);
      let m = { def: c, seed: f, print: T, clear: R, setfps: z, setvar: Y, textstyle: x, textmetrics: I, cliprect: k, clipcirc: F, blendmode: S, transform: C, getcolor: w, mousepos: L, resize: O, path: H, fill: B, stroke: D, clip: V, paint: $, colrect: (...t) => (g("colrect()"), _(...t)), colcirc: (...t) => (g("colrect()"), y(...t)), wave: (...t) => (g("wave()"), N(...t)) }, n = r.stat(0);
      function f(t) {
        return a("seed()", "rseed()"), t && r.rseed(t), r.stat(9);
      }
      let b = "";
      function x(t) {
        a("textstyle()", "the 5th param of text()"), b = t;
      }
      function T(t, e, s, i) {
        a("print()", "text()"), r.text(t, e, s, i);
      }
      function I(t, e) {
        a("textmetrics()", "ctx().measureText()");
        let s = r.ctx(), i = r.stat(10), l = r.stat(11);
        s.font = `${b || ""} ${~~(e || i)}px ${l}`;
        let h = s.measureText(t);
        return h.height = h.actualBoundingBoxAscent + h.actualBoundingBoxDescent, h;
      }
      function k(t, e, s, i) {
        a("cliprect()", "clip()");
        let l = r.ctx();
        l.beginPath(), l.rect(t, e, s, i), l.clip();
      }
      function F(t, e, s) {
        a("clipcirc()", "clip()");
        let i = r.ctx();
        i.beginPath(), i.arc(t, e, s, 0, r.TWO_PI), i.clip();
      }
      function w(t) {
        a("getcolor()", "stat(5)");
        let e = stat(5);
        return e[~~t % e.length];
      }
      function S(t) {
        a("blendmode()", "ctx().globalCompositeOperation");
        let e = r.ctx();
        e.globalCompositeOperation = t;
      }
      function R(t) {
        a("clear()", "cls()"), r.cls(t);
      }
      function C(t, e, s, i, l, h, j = true) {
        return a("transform()", "ctx().setTransform() or ctx().transform()"), r.ctx()[j ? "setTransform" : "transform"](t, e, s, i, l, h);
      }
      function L() {
        return a("mousepos()", "MX and MY"), [MX, MY];
      }
      function z(t) {
        a("setfps()", "framerate()"), r.framerate(t);
      }
      let o = r.def;
      function c(t, e) {
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
      function Y(t, e) {
        a("setvar()", "def()"), c(t, e);
      }
      r.listen("resized", E);
      function E() {
        c("CX", r.W / 2), c("CY", r.H / 2);
      }
      E(), c("CANVAS", r.canvas());
      function O(t, e) {
        if (n.autoscale) throw "resize() don't works with autoscale enabled";
        a("resize()", null, "Avoid changing the canvas dimensions at runtime."), r.CANVAS.width = t, c("W", t), r.CANVAS.height = e, c("H", e), r.emit("resized", 1);
      }
      for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) r[t] != null && c(t, r[t]);
      a("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), o("FPS", ""), n.fps && r.framerate(n.fps), n.background != null && (a('"background" option', "You must update your canvas CSS"), r.listen("after:init", () => {
        r.canvas().style.background = w(~~n.background);
      }));
      function H(t) {
        return a("path()", "`new Path2D()`", "See https://developer.mozilla.org/en-US/docs/Web/API/Path2D"), new Path2D(t);
      }
      let X = r.fill;
      function B(t, e) {
        if (e instanceof Path2D) {
          a("fill(color, path)");
          let s = r.stat(5), i = r.ctx();
          i.fillStyle = s[~~t % s.length], r.ctx().fill(e);
        } else X(t);
      }
      let W = r.stroke;
      function D(t, e) {
        if (e instanceof Path2D) {
          a("stroke(color, path)");
          let s = r.stat(5), i = r.ctx();
          i.strokeStyle = s[~~t % s.length], r.ctx().stroke(e);
        } else W(t);
      }
      let U = r.clip;
      function V(t) {
        a("clip(path)", "clip(callback)", "E.g: `clip((ctx) => ctx.rect(0, 0, 200, 200))`"), t instanceof Path2D ? r.ctx().clip(t) : U(t);
      }
      n.antialias && a('"antialias" option', '"pixelart" option'), n.pixelart === false && a('"pixelart" option'), n.animate === false && a('"animate" option', "pause() in the of your draw()");
      let Z = r.paint;
      function $(t, e, s, i) {
        let l = s;
        return r.spr && Array.isArray(s) && (l = () => {
          r.spr(0, 0, s.join(`
`));
        }), Z(t, e, l, i);
      }
      let d = r.spr;
      d && d.length === 3 && (m.spr = function(t, e, s, i, l) {
        Number.isFinite(s) && s > 0 ? (a("spr() width and height", "spr(x, y, pixels)"), d(t, e, l)) : d(t, e, s);
      });
      let M = r.unlisten;
      if (M) {
        let t = r.listen;
        m.listen = (e, s) => (t(e, s), () => {
          A("listen() not returns a function anymore. Please use unlisten(event, callback) instead"), M(e, s);
        });
      }
      function A(t) {
        u.warnings && console.warn(`[litecanvas/migrate] ${t}.`);
      }
      function a(t, e, s = "") {
        A(`${t} is removed. ` + (e ? `Please use ${e} instead. ` : "") + s);
      }
      function g(t, e = "function") {
        a(t, `This ${e} was moved to @litecanvas/utils package.`);
      }
      return m;
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
/*! @litecanvas/utils by Luiz Bills | MIT Licensed */
/*! Asset Loader plugin for litecanvas by Luiz Bills | MIT Licensed */
/*! Migrate for litecanvas by Luiz Bills | MIT Licensed */
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
/*! Joystick plugin for Litecanvas by Luiz Bills | MIT Licensed */
