(() => {
  // public/js/litecanvas.dev.js
  (() => {
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
      var assert2 = (condition, message = "Assertion failed") => {
        if (!condition) throw new Error("[Litecanvas] " + message);
      };
      var version = "0.404.0";
      var mulberry32 = (seed) => {
        return () => {
          let t = seed += 1831565813;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
      };
      function litecanvas(settings = {}) {
        const root = window, math = Math, perf = performance, TAU = math.PI * 2, raf = requestAnimationFrame, isNumber2 = Number.isFinite, _browserEventListeners = [], on = (elem, evt, callback) => {
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
        settings = Object.assign(defaults, settings);
        let _loop = settings.loop, _initialized, _paused, _canvas, _canvasScale = 1, _ctx, _outline_fix = 0.5, _timeScale = 1, _lastFrameTime, _fpsInterval = 1e3 / 60, _accumulated, _rafid = 0, _defaultTextColor = 3, _fontFamily = "sans-serif", _fontSize = 20, _fontLineHeight = 1.2, _rngSeed = Date.now(), _rngNext = mulberry32(_rngSeed >>> 0), _currentPalette = defaultPalette, _lastPalette = defaultPalette, _colorPaletteState = [], _defaultSound = [0.5, 0, 1750, , , 0.3, 1, , , , 600, 0.1], _eventListeners = {};
        const instance = {
          W: 0,
          H: 0,
          T: 0,
          MX: -1,
          MY: -1,
          rand: (min = 0, max = 1) => {
            return min + _rngNext() * (max - min);
          },
          randi: (min = 0, max = 1) => {
            return ~~instance.rand(min, max + 1);
          },
          rseed(value) {
            _rngSeed = value;
            _rngNext = mulberry32(_rngSeed >>> 0);
          },
          TAU,
          lerp: (start, end, t) => {
            return start + t * (end - start);
          },
          deg2rad: (degs) => {
            return math.PI / 180 * degs;
          },
          rad2deg: (rads) => {
            return 180 / math.PI * rads;
          },
          mod(a, b) {
            return (a % b + b) % b || 0;
          },
          round: (n, precision = 0) => {
            if (!precision) {
              return math.round(n);
            }
            const multiplier = 10 ** precision;
            return math.round(n * multiplier) / multiplier;
          },
          clamp: (value, min, max) => {
            if (value < min) return min;
            if (value > max) return max;
            return value;
          },
          dist: (x1, y1, x2, y2) => {
            return math.hypot(x2 - x1, y2 - y1);
          },
          wrap: (value, min, max) => {
            return value - (max - min) * math.floor((value - min) / (max - min));
          },
          map(value, start1, stop1, start2, stop2, withinBounds) {
            const result = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
            return withinBounds ? instance.clamp(result, start2, stop2) : result;
          },
          norm: (value, start, stop) => {
            return instance.map(value, start, stop, 0, 1);
          },
          cls(color) {
            if (null == color) {
              _ctx.clearRect(0, 0, instance.W, instance.H);
            } else {
              instance.rectfill(0, 0, instance.W, instance.H, color);
            }
          },
          rect(x, y, width, height, color, radii) {
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
            beginPath(_ctx);
            _ctx[radii ? "roundRect" : "rect"](~~x, ~~y, ~~width, ~~height, radii);
            instance.fill(color);
          },
          oval(x, y, radiusX, radiusY, color) {
            beginPath(_ctx);
            _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TAU);
            instance.stroke(color);
          },
          ovalfill(x, y, radiusX, radiusY, color) {
            beginPath(_ctx);
            _ctx.ellipse(~~x, ~~y, ~~radiusX, ~~radiusY, 0, 0, TAU);
            instance.fill(color);
          },
          circ(x, y, radius, color) {
            instance.oval(x, y, radius, radius, color);
          },
          circfill(x, y, radius, color) {
            instance.ovalfill(x, y, radius, radius, color);
          },
          shape(points) {
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
            beginPath(_ctx);
            let xfix = _outline_fix && ~~x1 === ~~x2 ? 0.5 : 0;
            let yfix = _outline_fix && ~~y1 === ~~y2 ? 0.5 : 0;
            _ctx.moveTo(~~x1 + xfix, ~~y1 + yfix);
            _ctx.lineTo(~~x2 + xfix, ~~y2 + yfix);
            instance.stroke(color);
          },
          linewidth(value) {
            _ctx.lineWidth = ~~value;
            _outline_fix = ~~value % 2 ? 0.5 : 0;
          },
          linedash(segments, offset = 0) {
            _ctx.setLineDash(segments);
            _ctx.lineDashOffset = offset;
          },
          text(x, y, message, color = _defaultTextColor, fontStyle = "normal") {
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
            _fontFamily = family;
          },
          textsize(size) {
            _fontSize = size;
          },
          textalign(align, baseline) {
            if (align) _ctx.textAlign = align;
            if (baseline) _ctx.textBaseline = baseline;
          },
          image(x, y, source) {
            _ctx.drawImage(source, ~~x, ~~y);
          },
          spr(x, y, pixels) {
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
          push(translateX = 0, translateY = translateX, rotation = 0, scaleX = 1, scaleY = scaleX) {
            _ctx.save();
            instance.translate(translateX, translateY);
            instance.rotate(rotation);
            instance.scale(scaleX, scaleY);
          },
          pop() {
            _ctx.restore();
          },
          translate(x, y) {
            _ctx.translate(~~x, ~~y);
          },
          scale(x, y = x) {
            _ctx.scale(x, y);
          },
          rotate(radians) {
            _ctx.rotate(radians);
          },
          alpha(value) {
            _ctx.globalAlpha = instance.clamp(value, 0, 1);
          },
          fill(color) {
            _ctx.fillStyle = getColor(color);
            _ctx.fill();
          },
          stroke(color) {
            _ctx.strokeStyle = getColor(color);
            _ctx.stroke();
          },
          clip(callback) {
            beginPath(_ctx);
            callback(_ctx);
            _ctx.clip();
          },
          sfx(zzfxParams, pitchSlide, volumeFactor) {
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
            root.zzfxV = value;
          },
          canvas: () => _canvas,
          use(callback, config = {}) {
            loadPlugin(callback, config);
          },
          resize(width, height = width, autoscale) {
            settings.width = width;
            settings.height = height;
            settings.autoscale = null == autoscale ? settings.autoscale : autoscale;
            resizeCanvas();
          },
          listen: (eventName, callback) => {
            eventName = lowerCase(eventName);
            _eventListeners[eventName] = _eventListeners[eventName] || /* @__PURE__ */ new Set();
            _eventListeners[eventName].add(callback);
            return () => _eventListeners[eventName].delete(callback);
          },
          unlisten: (eventName, callback) => {
            eventName = lowerCase(eventName);
            if (_eventListeners[eventName]) {
              _eventListeners[eventName].delete(callback);
            }
          },
          emit(eventName, data1, data2, data3, data4) {
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
            if (null == a) {
              _colorPaletteState = [];
            } else {
              _colorPaletteState[a] = b;
            }
          },
          def(key, value) {
            instance[key] = value;
            if (settings.global) {
              root[key] = value;
            }
          },
          timescale(value) {
            _timeScale = value;
          },
          framerate(value) {
            _fpsInterval = 1e3 / ~~value;
          },
          stat(index) {
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
            return null == index ? internals : internals[index];
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
              return keyCheck(_keysDown, key);
            });
            instance.def("iskeypressed", (key) => {
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
          _accumulated += frameTime < 250 ? frameTime : _fpsInterval;
          while (_accumulated >= _fpsInterval) {
            updated++;
            _accumulated -= _fpsInterval;
            let dt = _fpsInterval / 1e3 * _timeScale;
            instance.emit("update", dt, updated);
            instance.def("T", instance.T + dt);
          }
          if (updated) {
            instance.emit("draw", _ctx);
            if (updated > 1) _accumulated = 0;
          }
        }
        function setupCanvas() {
          const d = document;
          if ("string" === typeof settings.canvas) {
            _canvas = d.querySelector(settings.canvas);
          } else {
            _canvas = settings.canvas;
          }
          _canvas = _canvas || d.createElement("canvas");
          _ctx = _canvas.getContext("2d");
          on(_canvas, "click", () => focus());
          if (!_canvas.parentNode) {
            d.body.appendChild(_canvas);
          }
          _canvas.oncontextmenu = () => false;
        }
        function resizeCanvas() {
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
      var __defProp = Object.defineProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      };
      window.utils = window.utils || {};
      window.utils.global = (overrides = true) => {
        for (const key in window.utils) {
          if ("global" === key) continue;
          if (overrides || globalThis[key] === void 0) {
            globalThis[key] = window.utils[key];
          }
        }
      };
      var index_exports = {};
      __export(index_exports, {
        ANCHOR_BOT_LEFT: () => ANCHOR_BOT_LEFT,
        ANCHOR_BOT_RIGHT: () => ANCHOR_BOT_RIGHT,
        ANCHOR_CENTER: () => ANCHOR_CENTER,
        ANCHOR_TOP_LEFT: () => ANCHOR_TOP_LEFT,
        ANCHOR_TOP_RIGHT: () => ANCHOR_TOP_RIGHT,
        Actor: () => Actor,
        BACK_IN: () => BACK_IN,
        BACK_IN_OUT: () => BACK_IN_OUT,
        BACK_OUT: () => BACK_OUT,
        BOUNCE_IN: () => BOUNCE_IN,
        BOUNCE_IN_OUT: () => BOUNCE_IN_OUT,
        BOUNCE_OUT: () => BOUNCE_OUT,
        Camera: () => Camera,
        DOWN: () => DOWN,
        EASE_IN: () => EASE_IN,
        EASE_IN_OUT: () => EASE_IN_OUT,
        EASE_OUT: () => EASE_OUT,
        ELASTIC_IN: () => ELASTIC_IN,
        ELASTIC_IN_OUT: () => ELASTIC_IN_OUT,
        ELASTIC_OUT: () => ELASTIC_OUT,
        Grid: () => Grid,
        LEFT: () => LEFT,
        LINEAR: () => LINEAR,
        Noise: () => Noise,
        ONE: () => ONE,
        RIGHT: () => RIGHT,
        TypedGrid: () => TypedGrid,
        UP: () => UP,
        Vector: () => Vector,
        ZERO: () => ZERO,
        advance: () => advance_default,
        almost: () => almost_default,
        assert: () => assert_default,
        choose: () => choose_default,
        clamp: () => clamp_default,
        colcirc: () => colcirc_default,
        colrect: () => colrect_default,
        colrectcirc: () => colrectcirc_default,
        copysign: () => copysign_default,
        dd: () => dd_default,
        diff: () => diff_default,
        dist: () => dist_default,
        dot: () => dot_default,
        flipImage: () => flip_default,
        formatTime: () => format_time_default,
        fract: () => fract_default,
        head: () => head_default,
        includes: () => includes_default,
        intersection: () => intersection_default,
        is: () => is_default,
        last: () => last_default,
        length: () => length_default,
        lerpAngle: () => lerp_angle_default,
        lower: () => lower_default,
        lpad: () => lpad_default,
        mag: () => mag_default,
        makeCircle: () => make_circle_default,
        makeRectangle: () => make_rectangle_default,
        mean: () => mean_default,
        median: () => median_default,
        mod: () => mod_default,
        move: () => move_default,
        percent: () => percent_default,
        pingpong: () => pingpong_default,
        range: () => range_default,
        resolverect: () => resolverect_default,
        rpad: () => rpad_default,
        scaleImage: () => scale_default,
        score: () => score_default,
        shuffle: () => shuffle_default,
        smoothstep: () => smoothstep_default,
        sum: () => sum_default,
        tail: () => tail_default,
        tintImage: () => tint_default,
        tween: () => tween,
        upper: () => upper_default,
        vec: () => vec,
        vecAbs: () => vecAbs,
        vecAdd: () => vecAdd,
        vecAngle: () => vecAngle,
        vecAngleBetween: () => vecAngleBetween,
        vecCeil: () => vecCeil,
        vecClamp: () => vecClamp,
        vecCross: () => vecCross,
        vecDist: () => vecDist,
        vecDist2: () => vecDist2,
        vecDiv: () => vecDiv,
        vecDot: () => vecDot,
        vecEq: () => vecEq,
        vecFloor: () => vecFloor,
        vecHeading: () => vecHeading,
        vecIsZero: () => vecIsZero,
        vecLerp: () => vecLerp,
        vecLimit: () => vecLimit,
        vecMag: () => vecMag,
        vecMag2: () => vecMag2,
        vecMove: () => vecMove,
        vecMult: () => vecMult,
        vecNorm: () => vecNorm,
        vecRand: () => vecRand,
        vecReflect: () => vecReflect,
        vecRem: () => vecRem,
        vecRotate: () => vecRotate,
        vecRound: () => vecRound,
        vecSet: () => vecSet,
        vecSetMag: () => vecSetMag,
        vecSub: () => vecSub,
        vecToArray: () => vecToArray,
        wave: () => wave_default
      });
      var Camera = class {
        /** @type {LitecanvasInstance} */
        _engine = null;
        /** @type {number} camera center X */
        x = 0;
        /** @type {number} camera center Y */
        y = 0;
        /** @type {number} offset X */
        ox = 0;
        /** @type {number} offset Y*/
        oy = 0;
        /** @type {number} */
        width = 0;
        /** @type {number} */
        height = 0;
        /** @type {number} */
        rotation = 0;
        /** @type {number} */
        scale = 1;
        /**
         * @param {LitecanvasInstance} engine
         */
        constructor(engine = null, ox = 0, oy = 0, width = null, height = null) {
          this._engine = engine || globalThis;
          this.ox = ox;
          this.oy = oy;
          this.resize(width || this._engine.W - ox, height || this._engine.H - oy);
          this.x = this.width / 2;
          this.y = this.height / 2;
          this._shake = {
            x: 0,
            y: 0,
            removeListener: null
          };
        }
        resize(width, height) {
          this.width = width;
          this.height = height;
          this._engine.emit("camera-resized", this);
        }
        /**
         * @param {boolean} [clip] default: `false`
         */
        start(clip = false) {
          this._engine.push();
          if (clip) {
            this._engine.clip((ctx) => {
              ctx.rect(this.ox, this.oy, this.width, this.height);
            });
          }
          const centerX = this.ox + this.width / 2, centerY = this.oy + this.height / 2;
          this._engine.translate(centerX, centerY);
          this._engine.scale(this.scale);
          this._engine.rotate(this.rotation);
          this._engine.translate(-this.x + this._shake.x, -this.y + this._shake.y);
        }
        end() {
          this._engine.pop();
        }
        /**
         * @param {number} x
         * @param {number} y
         */
        lookAt(x, y) {
          this.x = x;
          this.y = y;
        }
        /**
         * @param {number} dx
         * @param {number} dy
         */
        move(dx, dy) {
          this.x += dx;
          this.y += dy;
        }
        /**
         * @param {number} value
         */
        zoom(value) {
          this.scale *= value;
        }
        /**
         * @param {number} value
         */
        zoomTo(value) {
          this.scale = value;
        }
        /**
         * @param {number} radians
         */
        rotate(radians) {
          this.rotation += radians;
        }
        /**
         * @param {number} radians
         */
        rotateTo(radians) {
          this.rotation = radians;
        }
        /**
         * @param {number} x
         * @param {number} y
         * @param {{x: number, y: number}} [output]
         * @returns {{x: number, y: number}}
         */
        getWorldPoint(x, y, output = {}) {
          const c = Math.cos(-this.rotation), s = Math.sin(-this.rotation);
          x = (x - this.width / 2 - this.ox) / this.scale;
          y = (y - this.height / 2 - this.oy) / this.scale;
          output.x = c * x - s * y + this.x;
          output.y = s * x + c * y + this.y;
          return output;
        }
        /**
         * @param {number} x
         * @param {number} y
         * @param {{x: number, y: number}} [output]
         * @returns {{x: number, y: number}}
         */
        getCameraPoint(x, y, output = {}) {
          const c = Math.cos(-this.rotation), s = Math.sin(-this.rotation);
          x = x - this.x;
          y = y - this.y;
          x = c * x - s * y;
          y = s * x + c * y;
          output.x = x * this.scale + this.width / 2 + this.ox;
          output.y = y * this.scale + this.height / 2 + this.oy;
          return output;
        }
        /**
         * @returns {number[]}
         */
        getBounds() {
          return [this.ox, this.oy, this.width, this.height];
        }
        /**
         * Shake the camera
         *
         * @param {number} amplitude
         * @param {number} duration in seconds
         */
        shake(amplitude = 1, duration = 0.3) {
          if (this.shaking) return;
          this._shake.removeListener = this._engine.listen("update", (dt) => {
            this._shake.x = this._engine.randi(-amplitude, amplitude);
            this._shake.y = this._engine.randi(-amplitude, amplitude);
            duration -= dt;
            if (duration <= 0) {
              this.unshake();
            }
          });
        }
        unshake() {
          if (this.shaking) {
            this._shake.removeListener();
            this._shake.removeListener = null;
            this._shake.x = this._shake.y = 0;
          }
        }
        /**
         * @returns {boolean}
         */
        get shaking() {
          return this._shake.removeListener !== null;
        }
      };
      var intersection_default = (x1, y1, w1, h1, x2, y2, w2, h2) => {
        const left = Math.max(x1, x2);
        const width = Math.min(x1 + w1, x2 + w2) - left;
        const top = Math.max(y1, y2);
        const height = Math.min(y1 + h1, y2 + h2) - top;
        return [left, top, width, height];
      };
      var resolverect_default = (x1, y1, w1, h1, x2, y2, w2, h2) => {
        const [left, top, width, height] = intersection_default(
          x1,
          y1,
          w1,
          h1,
          x2,
          y2,
          w2,
          h2
        );
        let direction = "";
        let resolveX = x1;
        let resolveY = y1;
        if (width < height) {
          if (x1 < x2) {
            direction = "right";
            resolveX = x2 - w1;
          } else {
            direction = "left";
            resolveX = x2 + w2;
          }
        } else {
          if (y1 < y2) {
            direction = "bottom";
            resolveY = y2 - h1;
          } else {
            direction = "top";
            resolveY = y2 + h2;
          }
        }
        return { dir: direction, x: resolveX, y: resolveY };
      };
      var assert_default = (condition, message = "Assertion failed") => {
        if (!condition) throw new Error(message);
      };
      var colrect_default = (x1, y1, w1, h1, x2, y2, w2, h2) => {
        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
      };
      var colcirc_default = (x1, y1, r1, x2, y2, r2) => {
        return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) <= (r1 + r2) * (r1 + r2);
      };
      var colrectcirc_default = (x1, y1, w1, h1, x2, y2, r2) => {
        let xx = x2 - Math.max(x1, Math.min(x2, x1 + w1));
        let yy = y2 - Math.max(y1, Math.min(y2, y1 + h1));
        return xx * xx + yy * yy <= r2 * r2;
      };
      var Grid = class _Grid {
        /** @type {number} The grid width */
        _w;
        /** @type {number} The grid height */
        _h;
        /** @type {any[]} The grid cells */
        _c;
        /**
         * @param {number} width The grid width
         * @param {number} height The grid height
         */
        constructor(width, height, values = []) {
          this._w = Math.max(1, ~~width);
          this._h = Math.max(1, ~~height);
          this._c = values;
        }
        [Symbol.iterator]() {
          let i = 0;
          return {
            next: () => {
              return {
                value: [this.indexToPointX(i), this.indexToPointY(i), this._c[i++]],
                done: i > this._c.length
              };
            }
          };
        }
        /**
         * @returns {Grid} the cloned grid
         */
        clone() {
          return new _Grid(this._w, this._h, this._c);
        }
        /**
         * Delete all cell values.
         */
        clear() {
          this.forEach((x, y) => this.set(x, y, void 0));
        }
        /**
         * @returns {number}
         * @readonly
         */
        get width() {
          return this._w;
        }
        /**
         * @returns {number}
         * @readonly
         */
        get height() {
          return this._h;
        }
        /**
         * The the value of a grid's cell.
         *
         * @param {number} x
         * @param {number} y
         * @param {any} value
         */
        set(x, y, value) {
          this._c[this.pointToIndex(x, y)] = value;
        }
        /**
         * Returns the value of a grid's cell.
         *
         * @param {number} x
         * @param {number} y
         * @returns {any}
         */
        get(x, y) {
          return this._c[this.pointToIndex(x, y)];
        }
        /**
         * Returns true if the which cell has any value not equal to `null` or `undefined`.
         *
         * @param {number} x
         * @param {number} y
         * @returns {boolean}
         */
        has(x, y) {
          return this.get(x, y) != null;
        }
        /**
         * Checks if a which point (x, y) is within the grid.
         *
         * @param {number} x
         * @param {number} y
         * @returns {boolean}
         */
        check(x, y) {
          return x >= 0 && x < this._w && y >= 0 && y < this._h;
        }
        /**
         * Returns the total of cells.
         *
         * @returns {number}
         */
        get length() {
          return this._w * this._h;
        }
        /**
         * Convert a grid point (X, Y) to a index.
         *
         * @param {number} x
         * @param {number} y
         * @returns {number} The index
         */
        pointToIndex(x, y) {
          return this.clampX(~~x) + this.clampY(~~y) * this._w;
        }
        /**
         * Convert index to a grid point X.
         *
         * @param {number} index
         * @returns {number}
         */
        indexToPointX(index) {
          return index % this._w;
        }
        /**
         * Convert index to a grid point Y.
         *
         * @param {number} index
         * @returns {number}
         */
        indexToPointY(index) {
          return Math.floor(index / this._w);
        }
        /**
         * Loops over all grid cells.
         *
         * @callback GridForEachCallback
         * @param {number} x
         * @param {number} y
         * @param {any} value
         * @param {Grid} grid
         * @returns {false|void} returns `false` to stop/break the loop
         *
         * @param {GridForEachCallback} callback
         * @param {boolean} [reverse=false]
         */
        forEach(callback, reverse = false) {
          let i = reverse ? this.length - 1 : 0, limit = reverse ? -1 : this.length, step = reverse ? -1 : 1;
          while (i !== limit) {
            const x = this.indexToPointX(i), y = this.indexToPointY(i), cellValue = this._c[i];
            if (false === callback(x, y, cellValue, this)) break;
            i += step;
          }
        }
        /**
         * @param {*} value
         */
        fill(value) {
          this.forEach((x, y) => {
            this.set(x, y, value);
          });
        }
        /**
         * @param {number} y
         * @returns {number}
         */
        clampX(x) {
          return _clamp(x, 0, this._w - 1);
        }
        /**
         * @param {number} y
         * @returns {number}
         */
        clampY(y) {
          return _clamp(y, 0, this._h - 1);
        }
        /**
         * Returns the cell values in a single array.
         *
         * @returns {any[]}
         */
        toArray() {
          return this._c.slice();
        }
        /**
         * @param {string} separator
         * @param {boolean} format
         * @returns {string}
         */
        toString(separator = " ", format = true) {
          if (!format) return this._c.join(separator);
          const rows = [];
          this.forEach((x, y, value) => {
            rows[y] = rows[y] || "";
            rows[y] += value + separator;
          });
          return rows.join("\n");
        }
      };
      var TypedGrid = class _TypedGrid extends Grid {
        /**
         * @param {number} width The grid width
         * @param {number} height The grid height
         */
        constructor(width, height, TypedArray = Uint8Array) {
          super(width, height, null);
          this._c = new TypedArray(this._w * this._h);
        }
        /**
         * @param {number} x
         * @param {number} y
         * @returns {boolean}
         */
        has(x, y) {
          return this.get(x, y) !== 0;
        }
        /**
         * @returns {TypedGrid}
         */
        clone() {
          const copy = new _TypedGrid(this._w, this._h, this._c.constructor);
          this.forEach((x, y, value) => {
            copy.set(x, y, value);
          });
          return copy;
        }
      };
      function _clamp(value, min, max) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
      }
      var clamp_default = (value, min, max) => {
        if (value < min) return min;
        if (value > max) return max;
        return value;
      };
      var cos = Math.cos;
      var sin = Math.sin;
      var PI2 = 2 * Math.PI;
      var float = parseFloat;
      var V = class {
        /**
         * @param {number} [x=0]
         * @param {number} [y]
         */
        constructor(x = 0, y = x) {
          this.x = float(x) || 0;
          this.y = float(y) || 0;
        }
        /**
         * @returns {string}
         */
        toString() {
          return `Vector (${this.x}, ${this.y})`;
        }
      };
      var Vector = V;
      var isVector = (v) => v instanceof V;
      var vec = (x = 0, y = x) => {
        if (isVector(x)) {
          y = x.y;
          x = x.x;
        }
        return new V(x, y);
      };
      var vecSet = (v, x, y = x) => {
        if (isVector(x)) {
          vecSet(v, x.x, x.y);
        } else {
          v.x = x;
          v.y = y;
        }
        return v;
      };
      var vecAdd = (v, x, y = x) => {
        if (isVector(x)) {
          return vecAdd(v, x.x, x.y);
        }
        v.x += x;
        v.y += y;
        return v;
      };
      var vecSub = (v, x, y = x) => {
        if (isVector(x)) {
          return vecSub(v, x.x, x.y);
        }
        v.x -= x;
        v.y -= y;
        return v;
      };
      var vecMult = (v, x, y = x) => {
        if (isVector(x)) {
          return vecMult(v, x.x, x.y);
        }
        v.x *= x;
        v.y *= y;
        return v;
      };
      var vecDiv = (v, x, y = x) => {
        if (isVector(x)) {
          return vecDiv(v, x.x, x.y);
        }
        v.x /= x || 1;
        v.y /= y || 1;
        return v;
      };
      var vecRotate = (v, radians) => {
        const c = cos(radians), s = sin(radians);
        v.x = c * v.x - s * v.y;
        v.y = s * v.x + c * v.y;
        return v;
      };
      var vecReflect = (v, normal) => {
        const normalCopy = vecNorm(vec(normal));
        return vecSub(v, vecMult(normalCopy, 2 * vecDot(v, normalCopy)));
      };
      var vecSetMag = (v, value) => vecMult(vecNorm(v), value);
      var vecMag = (v) => Math.hypot(v.x, v.y);
      var vecMag2 = (v) => v.x * v.x + v.y * v.y;
      var vecNorm = (v) => {
        const length = vecMag(v);
        if (length > 0) {
          vecDiv(v, length);
        }
        return v;
      };
      var vecLimit = (v, max = 1) => {
        const sq = vecMag2(v);
        if (sq > max * max) {
          vecSetMag(v, max);
        }
        return v;
      };
      var vecDist = (a, b) => {
        return Math.hypot(b.x - a.x, b.y - a.y);
      };
      var vecDist2 = (a, b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return dx * dx + dy * dy;
      };
      var vecHeading = (v) => Math.atan2(v.y, v.x);
      var vecAngle = (v) => vecHeading(v);
      var vecDot = (a, b) => a.x * b.x + a.y * b.y;
      var vecAngleBetween = (v1, v2) => {
        const mag1 = vecMag(v1);
        const mag2 = vecMag(v2);
        return mag2 - mag1 ? Math.acos(clamp_default(vecDot(v1, v2) / (mag1 * mag2), -1, 1)) : 0;
      };
      var vecCross = (a, b) => a.x * b.y - a.y * b.x;
      var vecLerp = (a, b, t) => {
        a.x += (b.x - a.x) * t || 0;
        a.y += (b.y - a.y) * t || 0;
        return a;
      };
      var vecAbs = (v) => {
        v.x = Math.abs(v.x);
        v.y = Math.abs(v.y);
        return v;
      };
      var vecCeil = (v) => {
        v.x = Math.ceil(v.x);
        v.y = Math.ceil(v.y);
        return v;
      };
      var vecFloor = (v) => {
        v.x = Math.floor(v.x);
        v.y = Math.floor(v.y);
        return v;
      };
      var vecRound = (v) => {
        v.x = Math.round(v.x);
        v.y = Math.round(v.y);
        return v;
      };
      var vecClamp = (v, min, max) => {
        return vecSet(v, clamp_default(v.x, min, max), clamp_default(v.y, min, max));
      };
      var vecRem = (v, value) => {
        v.x %= value;
        v.y %= value;
        return v;
      };
      var vecMove = (from, to, step = 1) => {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.hypot(dx, dy);
        step = Math.abs(step);
        if (distance <= step || distance === 0) {
          from.x = to.x;
          from.y = to.y;
        } else {
          const ratio = step / distance;
          from.x = from.x + dx * ratio;
          from.y = from.y + dy * ratio;
        }
        return from;
      };
      var vecEq = (v, x, y = x, epsilon = 1e-5) => {
        if (isVector(x)) {
          return vecEq(v, x.x, x.y, epsilon);
        }
        return vecDist(v, x, y) <= epsilon;
      };
      var vecIsZero = (v) => vecEq(v, ZERO);
      var vecToArray = (v) => [v.x, v.y];
      var vecRand = (minlength = 1, maxlength = minlength, rng = window.rand || Math.random) => {
        const angle = rng() * PI2;
        const radius = rng() * (maxlength - minlength) + minlength;
        return vec(cos(angle) * radius, sin(angle) * radius);
      };
      var ZERO = /* @__PURE__ */ vec(0, 0);
      var ONE = /* @__PURE__ */ vec(1, 1);
      var UP = /* @__PURE__ */ vec(0, -1);
      var RIGHT = /* @__PURE__ */ vec(1, 0);
      var DOWN = /* @__PURE__ */ vec(0, 1);
      var LEFT = /* @__PURE__ */ vec(-1, 0);
      var ANCHOR_CENTER = /* @__PURE__ */ vec(0.5, 0.5);
      var ANCHOR_TOP_LEFT = /* @__PURE__ */ vec(0, 0);
      var ANCHOR_TOP_RIGHT = /* @__PURE__ */ vec(1, 0);
      var ANCHOR_BOT_LEFT = /* @__PURE__ */ vec(0, 1);
      var ANCHOR_BOT_RIGHT = /* @__PURE__ */ vec(1, 1);
      var Actor = class {
        /** @type {CanvasImageSource} */
        sprite;
        /** @type {Vector} The actor position */
        pos;
        /** @type {Vector} The actor speed/velocity */
        spd;
        /** @type {Vector} The actor acceleration */
        acc;
        /** @type {Vector} The actor anchor (origin) */
        _o;
        /** @type {Vector} The actor scale */
        _s;
        /** @type {boolean} */
        flipX = false;
        /** @type {boolean} */
        flipY = false;
        /** @type {number} The actor angle (in degrees) */
        angle = 0;
        /** @type {number} The actor opacity */
        opacity = 1;
        /** @type {boolean} If `true` the actor will not be drawn. */
        hidden = false;
        /**
         * @param {Image|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} sprite
         * @param {Vector} position
         * @param {Vector} anchor
         */
        constructor(sprite, position, anchor = ANCHOR_TOP_LEFT) {
          this.sprite = sprite || { width: 0, height: 0 };
          this.pos = position || vec(0);
          this.spd = vec(0);
          this.acc = vec(0);
          this._o = vec(anchor);
          this._s = vec(1, 1);
        }
        /**
         * @param {number}
         */
        set x(value) {
          this.pos.x = value;
        }
        /**
         * @returns {number}
         */
        get x() {
          return this.pos.x;
        }
        /**
         * @param {number}
         */
        set y(value) {
          this.pos.y = value;
        }
        /**
         * @returns {number}
         */
        get y() {
          return this.pos.y;
        }
        /**
         * @param {number}
         */
        set dx(value) {
          this.spd.x = value;
        }
        /**
         * @returns {number}
         */
        get dx() {
          return this.spd.x;
        }
        /**
         * @param {number}
         */
        set dy(value) {
          this.spd.y = value;
        }
        /**
         * @returns {number}
         */
        get dy() {
          return this.spd.y;
        }
        /**
         * @param {number}
         */
        set ddx(value) {
          this.acc.x = value;
        }
        /**
         * @returns {number}
         */
        get ddx() {
          return this.acc.x;
        }
        /**
         * @param {number}
         */
        set ddy(value) {
          this.acc.y = value;
        }
        /**
         * @returns {number}
         */
        get ddy() {
          return this.acc.y;
        }
        /**
         * @param {Vector}
         */
        set anchor(vec2) {
          this._o.x = vec2.x;
          this._o.y = vec2.y;
        }
        /**
         * @returns {Vector}
         */
        get anchor() {
          return this._o;
        }
        /**
         * @returns {number}
         */
        get width() {
          return this.sprite.width * this._s.x;
        }
        /**
         * @returns {number}
         */
        get height() {
          return this.sprite.height * this._s.y;
        }
        /**
         * @retuns {Vector}
         */
        get scale() {
          return this._s;
        }
        /**
         * Sets the actor scale
         *
         * @param {number} x
         * @param {number} [y]
         */
        scaleTo(x, y = x) {
          this._s.x = x;
          this._s.y = y;
        }
        /**
         * Multiplies the actor scale
         *
         * @param {number} x
         * @param {number} [y]
         */
        scaleBy(x, y = x) {
          this._s.x *= x;
          this._s.y *= y;
        }
        /**
         * @param {boolean} scaled
         * @returns {number[]}
         */
        getBounds(scaled = true) {
          const w = this.sprite.width * (scaled ? this._s.x : 1);
          const h = this.sprite.height * (scaled ? this._s.y : 1);
          const x = this.pos.x - w * this.anchor.x;
          const y = this.pos.y - h * this.anchor.y;
          return [x, y, w, h];
        }
        /**
         * Checks if the actor is colliding with a point (with optional radius).
         * Useful to check clicks or touchs.
         *
         * @param {number} x
         * @param {number} y
         * @param {number} [radius=1]
         * @returns {boolean}
         */
        in(x, y, radius = 1) {
          return colrectcirc_default(...this.getBounds(), x, y, radius);
        }
        /**
         * Checks if the actor is colliding with another actor.
         *
         * @param {Actor} other
         * @returns {boolean}
         */
        col(other) {
          return colrect(...this.getBounds(), ...other.getBounds());
        }
        /**
         * Update the actor
         *
         * @param {number} [deltaTime]
         */
        update(deltaTime = 1) {
          this.spd.x += this.acc.x * deltaTime;
          this.spd.y += this.acc.y * deltaTime;
          this.pos.x += this.spd.x * deltaTime;
          this.pos.y += this.spd.y * deltaTime;
        }
        /**
         * Draw the actor
         *
         * @param {LitecanvasInstance} [engine]
         */
        draw(engine = globalThis, saveContext = true) {
          if (saveContext) engine.push();
          this.transform(engine);
          if (this.sprite.width && this.sprite.height && !this.hidden && this.opacity > 0) {
            this.drawImage(engine);
          }
          if (saveContext) engine.pop();
        }
        /**
         * @param {LitecanvasInstance} engine
         */
        transform(engine = globalThis) {
          engine.translate(this.pos.x, this.pos.y);
          engine.rotate(engine.deg2rad(this.angle));
          engine.scale(
            (this.flipX ? -1 : 1) * this._s.x,
            (this.flipY ? -1 : 1) * this._s.y
          );
        }
        /**
         * @param {LitecanvasInstance} engine
         * @param {boolean} alpha
         */
        drawImage(engine = globalThis, alpha = true) {
          const anchor = this.anchor;
          const x = -this.sprite.width * (this.flipX ? 1 - anchor.x : anchor.x);
          const y = -this.sprite.height * (this.flipY ? 1 - anchor.y : anchor.y);
          if (alpha) engine.alpha(this.opacity);
          engine.image(x, y, this.sprite);
        }
      };
      var diff_default = (a, b) => {
        return Math.abs(b - a);
      };
      var fract_default = (value) => {
        return value % 1;
      };
      var is_default = (value, type, extra) => {
        switch (type) {
          case "function":
            return "function" === typeof value;
          case "array":
            return Array.isArray(value);
          case "int":
            return Number.isInteger(value);
          case "number":
            return "number" === typeof value && !Number.isNaN(value);
          case "infinity":
            return "number" === typeof value && Infinity === Math.abs(value);
          default:
            return typeof value === type;
        }
      };
      var advance_default = (position, velocity, acceleration, deltaTime = 1) => {
        if (acceleration) {
          velocity.x += acceleration.x * deltaTime;
          velocity.y += acceleration.y * deltaTime;
        }
        position.x += velocity.x * deltaTime;
        position.y += velocity.y * deltaTime;
      };
      var mod_default = (a, b) => {
        return (a % b + b) % b || 0;
      };
      var dist_default = (x1, y1, x2, y2) => {
        return Math.hypot(x2 - x1, y2 - y1) || 0;
      };
      var mag_default = (x, y) => {
        return Math.hypot(x, y);
      };
      var sum_default = (values) => {
        let result = 0;
        for (let i = 0; i < values.length; i++) {
          result += values[i];
        }
        return result;
      };
      var mean_default = (values) => {
        return sum_default(values) / values.length;
      };
      var median_default = (values) => {
        const sorted = values.sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
          return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
      };
      var lerp_angle_default = (start, end, amount) => {
        let dif = (end - start) % 360;
        if (dif > 180) {
          dif -= 360;
        } else if (dif < -180) {
          dif += 360;
        }
        return start + dif * amount;
      };
      var percent_default = (value, min, max) => {
        return clamp_default((value - min) / (max - min), 0, 1);
      };
      var wave_default = (from, to, t, fn = Math.sin) => {
        return from + (fn(t) + 1) / 2 * (to - from);
      };
      var move_default = (from, to, delta) => {
        return Math.abs(to - from) <= delta ? to : from + Math.sign(to - from) * delta;
      };
      var almost_default = (a, b, epsilon = 1e-5) => diff_default(a, b) <= epsilon;
      var smoothstep_default = (min, max, value) => {
        const t = clamp_default((value - min) / (max - min), 0, 1);
        return t * t * (3 - 2 * t);
      };
      var copysign_default = (x, y) => {
        return Math.sign(y) * Math.abs(x);
      };
      var pingpong_default = (time, length = 1) => {
        return length - Math.abs(time % (length * 2) - length);
      };
      var dot_default = (x1, y1, x2, y2) => {
        return x1 * x2 + y1 * y2;
      };
      var HALF_PI = Math.PI / 2;
      var tween = (object, prop, toValue, duration = 1, easing = LINEAR) => {
        return new TweenController(object, prop, toValue, duration, easing);
      };
      var LINEAR = (n) => n;
      var EASE_IN = (n) => n * n;
      var EASE_OUT = (n) => -n * (n - 2);
      var EASE_IN_OUT = (n) => {
        if (n < 0.5) {
          return 2 * n * n;
        }
        return -2 * n * n + 4 * n - 1;
      };
      var BACK_IN = (n) => n * n * n - n * Math.sin(n * Math.PI);
      var BACK_OUT = (n) => {
        let a = 1 - n;
        return 1 - (a * a * a - a * Math.sin(a * Math.PI));
      };
      var BACK_IN_OUT = (n) => {
        if (n < 0.5) {
          let a2 = 2 * n;
          return 0.5 * (a2 * a2 * a2 - a2 * Math.sin(a2 * Math.PI));
        }
        let a = 1 - (2 * n - 1);
        return 0.5 * (1 - (a * a * a - a * Math.sin(n * Math.PI))) + 0.5;
      };
      var ELASTIC_IN = (n) => {
        return Math.sin(13 * HALF_PI * n) * Math.pow(2, 10 * (n - 1));
      };
      var ELASTIC_OUT = (n) => {
        return Math.sin(-13 * HALF_PI * (n + 1)) * Math.pow(2, -10 * n) + 1;
      };
      var ELASTIC_IN_OUT = (n) => {
        if (n < 0.5) {
          let a2 = Math.sin(13 * HALF_PI * (2 * n));
          let b2 = Math.pow(2, 10 * (2 * n - 1));
          return 0.5 * a2 * b2;
        }
        let a = Math.sin(-13 * HALF_PI * (2 * n - 1 + 1));
        let b = Math.pow(2, -10 * (2 * n - 1));
        return 0.5 * (a * b + 2);
      };
      var BOUNCE_IN = (n) => 1 - BOUNCE_OUT(1 - n);
      var BOUNCE_OUT = (n) => {
        if (n < 4 / 11) {
          return 121 * n * n / 16;
        } else if (n < 8 / 11) {
          return 363 / 40 * n * n - 99 / 10 * n + 17 / 5;
        } else if (n < 9 / 10) {
          return 4356 / 361 * n * n - 35442 / 1805 * n + 16061 / 1805;
        }
        return 54 / 5 * n * n - 513 / 25 * n + 268 / 25;
      };
      var BOUNCE_IN_OUT = (n) => {
        if (n < 0.5) {
          return 0.5 * BOUNCE_IN(n * 2);
        }
        return 0.5 * BOUNCE_OUT(n * 2 - 1) + 0.5;
      };
      var TweenController = class {
        /** @type {boolean} */
        running = false;
        /** @type {*} */
        _o;
        /** @type {string} */
        _p;
        /** @type {number|number} */
        _x;
        /** @type {number} */
        _d;
        /** @type {number} */
        _w;
        /** @type {(x: number) => number} */
        _e;
        /** @type {boolean} */
        _rel;
        /** @type {Function[]} */
        _cb = [];
        /** @type {number} */
        _t = 0;
        /** @type {Function} */
        _u = 0;
        /** @type {TweenController} */
        _ch = this;
        /** @type {TweenController} */
        _cu = this;
        /** @type {LitecanvasInstance} */
        _lc;
        /**
         * @param {*} object
         * @param {string} prop
         * @param {number|number} toValue
         * @param {number} duration
         * @param {(x: number) => number} easing
         */
        constructor(object, prop, toValue, duration, easing) {
          this._o = object;
          this._p = prop;
          this._x = toValue;
          this._d = duration;
          this._e = easing;
          this._w = 0;
        }
        /**
         * @param {LitecanvasInstance} [engine]
         * @returns {this}
         */
        start(engine) {
          if (this.running) {
            return this;
          }
          this._cu.stop(false);
          this._ch = this._cu = this;
          this.running = true;
          const fromValue = this._o[this._p] || 0;
          const toValue = this._rel ? fromValue + this._x : this._x;
          this._lc = this._lc || engine || globalThis;
          this._u = this._lc.listen("update", (dt) => {
            if (this._t <= this._w) {
              this._t += dt;
              return;
            }
            const t = this._t - this._w;
            this._o[this._p] = this._lc.lerp(fromValue, toValue, this._e(t / this._d));
            this._t += dt;
            if (t >= this._d) {
              this._o[this._p] = toValue;
              this.stop();
            }
          });
          return this;
        }
        /**
         * @param {boolean} completed if `false` don't call the `onEnd()` registered callbacks.
         * @returns {this}
         */
        stop(completed = true) {
          if (!this._u) return this;
          this.running = false;
          this._u();
          this._t = 0;
          if (completed) {
            for (const callback of this._cb) {
              callback(this._o);
            }
          }
          return this;
        }
        /**
         * @param {LitecanvasInstance} [engine]
         * @returns {this}
         */
        restart(engine = null, completed = false) {
          return this.stop(completed).restart(engine);
        }
        /**
         * @param {Function} callback
         * @returns {this}
         */
        onEnd(callback) {
          this._cb.push(callback);
          return this;
        }
        /**
         * @param {TweenController} another
         * @returns {this}
         */
        chain(another) {
          this._ch.onEnd(() => {
            this._cu = another.start(this._lc);
          });
          this._ch = another;
          return this;
        }
        /**
         * @param {boolean} [flag=true]
         * @returns {this}
         */
        reset() {
          this._cb.length = 0;
          return this.stop();
        }
        /**
         * @param {boolean} [flag=true]
         * @returns {this}
         */
        relative(flag = true) {
          this._rel = flag;
          return this;
        }
        /**
         * @param {number} value
         * @returns {this}
         */
        delay(value) {
          this._w = value;
          return this;
        }
        /**
         * Returns the current tween of the chain.
         *
         * @returns {this}
         */
        get current() {
          return this._cu;
        }
        /**
         * @returns {number} the current progress (0..1)
         */
        get progress() {
          if (this.running && this._t > this._w) {
            return (this._t - this._w) / this._d;
          }
          return 0;
        }
      };
      var PERLIN_YWRAPB = 4;
      var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
      var PERLIN_ZWRAPB = 8;
      var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
      var PERLIN_SIZE = 4095;
      var scaled_cosine = (i) => 0.5 * (1 - Math.cos(i * Math.PI));
      var Noise = class {
        /**
         * Array to store Perlin noise values.
         * @type {number[]}
         * @private
         */
        _p = [];
        /**
         * Number of octaves for the Perlin noise. Higher values create more detail.
         * @type {number}
         * @private
         */
        _po = 4;
        /**
         * Amplitude falloff factor for Perlin noise. Determines the reduction of amplitude per octave.
         * @type {number}
         * @private
         */
        _pf = 0.5;
        /**
         * @type {LitecanvasInstance}
         * @private
         */
        _e = null;
        /**
         * @param {LitecanvasInstance} engine
         */
        constructor(engine) {
          this._e = engine || globalThis;
          this.noiseSeed();
        }
        /**
         * Generates Perlin noise for the given coordinates.
         * @param {number} x - X-coordinate.
         * @param {number} [y=0] - Y-coordinate (default is 0).
         * @param {number} [z=0] - Z-coordinate (default is 0).
         * @returns {number} A noise value in the range [0, 1).
         */
        noise(x, y = 0, z = 0) {
          if (x < 0) {
            x = -x;
          }
          if (y < 0) {
            y = -y;
          }
          if (z < 0) {
            z = -z;
          }
          let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
          let xf = x - xi;
          let yf = y - yi;
          let zf = z - zi;
          let rxf, ryf;
          let r = 0;
          let ampl = 0.5;
          let n1, n2, n3;
          for (let o = 0; o < this._po; o++) {
            let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
            rxf = scaled_cosine(xf);
            ryf = scaled_cosine(yf);
            n1 = this._p[of & PERLIN_SIZE];
            n1 += rxf * (this._p[of + 1 & PERLIN_SIZE] - n1);
            n2 = this._p[of + PERLIN_YWRAP & PERLIN_SIZE];
            n2 += rxf * (this._p[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += PERLIN_ZWRAP;
            n2 = this._p[of & PERLIN_SIZE];
            n2 += rxf * (this._p[of + 1 & PERLIN_SIZE] - n2);
            n3 = this._p[of + PERLIN_YWRAP & PERLIN_SIZE];
            n3 += rxf * (this._p[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += scaled_cosine(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= this._pf;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1) {
              xi++;
              xf--;
            }
            if (yf >= 1) {
              yi++;
              yf--;
            }
            if (zf >= 1) {
              zi++;
              zf--;
            }
          }
          return r;
        }
        /**
         * Adjusts the detail level of the noise by setting the number of octaves and amplitude falloff.
         * @param {number} lod - Level of detail (number of octaves).
         * @param {number} falloff - Amplitude falloff per octave.
         */
        noiseDetail(lod, falloff) {
          if (lod > 0) {
            this._po = lod;
          }
          if (falloff > 0) {
            this._pf = falloff;
          }
        }
        /**
         * Sets a seed for the Perlin noise generator, ensuring deterministic results.
         *
         * @param {number} value - Seed value.
         */
        noiseSeed(value = null) {
          if (value != null) {
            this._e.rseed(value);
          }
          const random = this._e.rand || Math.random;
          for (let i = 0; i < PERLIN_SIZE + 1; i++) {
            this._p[i] = random();
          }
        }
      };
      var flip_default = (img, horizontal = true, vertically = false, engine = globalThis) => {
        return engine.paint(img.width, img.height, (ctx) => {
          engine.push();
          engine.scale(horizontal ? -1 : 1, vertically ? -1 : 1);
          engine.image(horizontal ? -img.width : 0, vertically ? -img.height : 0, img);
          engine.pop();
        });
      };
      var scale_default = (img, factor, pixelart = true, engine = globalThis) => {
        return engine.paint(img.width * factor, img.height * factor, (ctx) => {
          engine.push();
          ctx.imageSmoothingEnabled = !pixelart;
          engine.scale(factor);
          engine.image(0, 0, img);
          engine.pop();
        });
      };
      var tint_default = (img, color, opacity = 1, engine = globalThis) => {
        return engine.paint(img.width, img.height, (ctx) => {
          engine.push();
          engine.alpha(opacity);
          engine.rectfill(0, 0, img.width, img.height, color);
          ctx.globalCompositeOperation = "destination-atop";
          engine.alpha(1);
          engine.image(0, 0, img);
          engine.pop();
        });
      };
      var make_circle_default = (radius, color, { borderWidth = 0, borderColor = 0, engine = globalThis } = {}) => {
        const imageSize = radius * 2 + borderWidth;
        return engine.paint(imageSize, imageSize, () => {
          engine.circfill(imageSize / 2, imageSize / 2, radius, color);
          if (borderWidth > 0) {
            engine.linewidth(borderWidth);
            engine.stroke(borderColor);
          }
        });
      };
      var make_rectangle_default = (width, height, color, { borderWidth = 0, borderColor = 0, engine = globalThis } = {}) => {
        const imageWidth = width + borderWidth * 2;
        const imageHeight = height + borderWidth * 2;
        return engine.paint(imageWidth, imageHeight, () => {
          const hasBorder = borderWidth > 0;
          if (hasBorder) {
            engine.cls(borderColor);
          }
          engine.rectfill(
            hasBorder ? borderWidth : 0,
            hasBorder ? borderWidth : 0,
            width,
            height,
            color
          );
        });
      };
      var range_default = (size, from = 0, step = 1) => [...Array(size | 0).keys()].map((i) => {
        return from + step * i;
      });
      var shuffle_default = (values, rng = window.rand || Math.random) => {
        values = [...values];
        for (let i = values.length - 1; i > 0; i--) {
          let j = Math.floor(rng() * (i + 1));
          let temp = values[i];
          values[i] = values[j];
          values[j] = temp;
        }
        return values;
      };
      var choose_default = (values, rng = window.rand || Math.random) => {
        return values[Math.floor(rng() * values.length)];
      };
      var head_default = (values) => values[0];
      var last_default = (values) => values[values.length - 1];
      var tail_default = (values) => values.slice(1);
      var length_default = (xs) => {
        return ~~xs?.length;
      };
      var includes_default = (xs, search, position = 0) => {
        return xs?.includes(search, position);
      };
      var format_time_default = (t) => ~~(t / 60) + ":" + (t % 60 < 10 ? "0" : "") + ~~(t % 60);
      var rpad_default = (str, targetLength, padString = "0") => (str + "").padEnd(targetLength, padString);
      var lpad_default = (str, targetLength, padString = "0") => (str + "").padStart(targetLength, padString);
      var upper_default = (str) => (str + "").toUpperCase();
      var lower_default = (str) => (str + "").toLowerCase();
      var score_default = (value, zeros = 6) => {
        return (value + "").padStart(zeros, "0");
      };
      var dd_default = (data, context, engine = globalThis) => {
        engine.pal(["blue", "#fff"]);
        engine.cls(0);
        engine.ctx().resetTransform();
        engine.textfont("monospace");
        engine.textsize(16);
        engine.textalign("start", "top");
        engine.text(
          16,
          16,
          `${context ?? "dd() output"}: ` + (is_default(data, "object") ? JSON.stringify(data, null, 4) : data)
        );
        engine.quit();
      };
      window.utils = Object.assign(window.utils || {}, index_exports);
    })();
    (() => {
      function basename(path) {
        return path.split("\\").pop().split("/").pop().split(".")[0];
      }
      function prepareURL(url, baseURL) {
        if (baseURL && !hasProtocol(url)) {
          url = baseURL + url;
        }
        return url;
      }
      function hasProtocol(url) {
        try {
          const u = new URL(url);
          return !!u.protocol;
        } catch (e) {
        }
        return false;
      }
      var defaults = {
        /** @type {string?} */
        crossOrigin: "anonymous",
        /** @type {string?} */
        baseURL: null,
        /** @type {boolean?} */
        allowSoundInterruptions: true,
        /** @type {boolean?} */
        ignoreErrors: false
      };
      var modLoading = (engine, value) => {
        const key = "LOADING";
        engine.def(key, ~~engine[key] + ~~value);
      };
      function plugin2(engine, config = {}) {
        config = Object.assign({}, defaults, config);
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        engine.ASSETS["font"] = {};
        const loadFont = async (fontName, src, callback) => {
          const { baseURL, ignoreErrors } = config;
          const id = basename(src);
          src = prepareURL(src, baseURL);
          const fontFace = new FontFace(fontName, `url(${src})`);
          const eventData = {
            asset: fontFace,
            type: "font",
            fontName,
            src,
            id
          };
          engine.emit("filter-asset", fontFace, eventData);
          document.fonts.add(fontFace);
          modLoading(engine, 1);
          const loader = fontFace.load();
          loader.then((fontFace2) => {
            engine.ASSETS["font"][id] = fontFace2;
            if (callback) callback(fontFace2);
            engine.emit("asset-load", eventData);
            modLoading(engine, -1);
          }).catch((reason) => {
            if (!ignoreErrors) {
              throw new Error("Failed to load font from " + src);
            }
            if (callback) callback();
            engine.emit("asset-error", eventData);
          });
          return loader;
        };
        return {
          loadFont
        };
      }
      function plugin22(engine, config = {}) {
        config = Object.assign({}, defaults, config);
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        engine.ASSETS["image"] = {};
        const loadImage = async (src, callback) => {
          const { baseURL, ignoreErrors, crossOrigin } = config;
          const helpers = {
            splitFrames
          };
          const id = basename(src);
          src = prepareURL(src, baseURL);
          const image = new Image();
          const eventData = {
            asset: image,
            type: "image",
            src,
            id
          };
          return new Promise((resolve) => {
            modLoading(engine, 1);
            image.crossOrigin = crossOrigin;
            image.onerror = (reason) => {
              const error = "Failed to load image from " + src;
              if (!ignoreErrors) {
                throw new Error(error);
              }
              if (callback) callback();
              engine.emit("asset-error", eventData);
            };
            image.onload = () => {
              engine.ASSETS["image"][id] = image;
              if (callback) callback(image, helpers);
              engine.emit("asset-load", eventData);
              modLoading(engine, -1);
              resolve(image);
            };
            engine.emit("filter-asset", image, eventData);
            image.src = src;
          });
        };
        return {
          loadImage
        };
      }
      function splitFrames(image, frameWidth, frameHeight, margin = 0, spacing = 0) {
        const frames = [];
        const cols = Math.floor((image.width + spacing) / (frameWidth + spacing));
        const rows = Math.floor((image.height + spacing) / (frameHeight + spacing));
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const canvas = new OffscreenCanvas(frameWidth, frameHeight);
            canvas.getContext("2d").drawImage(
              image,
              margin + j * frameWidth + j * spacing,
              margin + i * frameHeight + i * spacing,
              frameWidth,
              frameHeight,
              0,
              0,
              frameWidth,
              frameHeight
            );
            frames.push(canvas);
          }
        }
        return frames;
      }
      function plugin3(engine, config = {}) {
        config = Object.assign({}, defaults, config);
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        engine.ASSETS["script"] = {};
        const loadScript = async (src, callback) => {
          const { baseURL, ignoreErrors, crossOrigin } = config;
          const id = basename(src);
          src = prepareURL(src, baseURL);
          const script = document.createElement("script");
          const eventData = {
            asset: script,
            type: "script",
            src,
            id
          };
          return new Promise((resolve) => {
            modLoading(engine, 1);
            script.crossOrigin = crossOrigin;
            script.onerror = (reason) => {
              if (!ignoreErrors) {
                throw new Error("Failed to load " + src);
              }
              if (callback) callback();
              engine.emit("asset-error", eventData);
            };
            script.onload = () => {
              engine.ASSETS["script"][id] = script;
              if (callback) callback(script);
              engine.emit("asset-load", eventData);
              modLoading(engine, -1);
              resolve(script);
            };
            engine.emit("filter-asset", script, eventData);
            script.src = src;
            document.head.appendChild(script);
          });
        };
        return {
          loadScript
        };
      }
      function plugin4(engine, config = {}) {
        config = Object.assign({}, defaults, config);
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        engine.ASSETS["sound"] = {};
        const loadSound = async (src, callback) => {
          const { crossOrigin, ignoreErrors, allowSoundInterruptions, baseURL } = config;
          const id = basename(src);
          src = prepareURL(src, baseURL);
          const sound = new Audio();
          const eventData = {
            asset: sound,
            type: "sound",
            src,
            id
          };
          return new Promise((resolve) => {
            modLoading(engine, 1);
            sound.crossOrigin = crossOrigin;
            sound.onerror = (reason) => {
              if (!ignoreErrors) {
                throw new Error("Failed to load " + src);
              }
              if (callback) callback(null);
              engine.emit("asset-error", eventData);
            };
            sound[allowSoundInterruptions ? "oncanplay" : "oncanplaythrough"] = () => {
              engine.ASSETS["sound"][id] = sound;
              if (callback) callback(sound);
              engine.emit("asset-load", eventData);
              modLoading(engine, -1);
              resolve(sound);
            };
            engine.emit("filter-asset", sound, eventData);
            sound.src = src;
          });
        };
        return {
          loadSound
        };
      }
      Object.assign(HTMLAudioElement.prototype, {
        stop() {
          this.pause();
          this.currentTime = 0;
          this.src = this.src;
        },
        restart() {
          this.pause();
          this.currentTime = 0;
          this.play();
        }
      });
      function plugin5(engine, config = {}) {
        config = Object.assign({}, defaults, config);
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        engine.ASSETS["json"] = {};
        const loadJSON = async (src, callback, fetchOptions) => {
          const { baseURL, ignoreErrors } = config;
          const id = basename(src);
          src = prepareURL(src, baseURL);
          const eventData = {
            type: "json",
            src,
            id
          };
          engine.emit("filter-asset", null, eventData);
          modLoading(engine, 1);
          engine.ASSETS["json"] = {};
          const request = fetch(src, fetchOptions);
          request.then((res) => res.json()).then((data) => {
            ASSETS["json"][id] = data;
            eventData.json = data;
            if (callback) callback(data);
            engine.emit("asset-load", eventData);
            modLoading(engine, -1);
          }).catch((reason) => {
            if (!ignoreErrors) {
              throw new Error("Failed to load JSON from " + src);
            }
            if (callback) callback();
            engine.emit("asset-error", eventData);
          });
          return request;
        };
        return {
          loadJSON
        };
      }
      function plugin6(engine) {
        modLoading(engine, 0);
        engine.def("ASSETS", engine.ASSETS || {});
        const load = (callback) => {
          return new Promise((resolve, reject) => {
            modLoading(engine, 1);
            const _resolve = (value) => {
              modLoading(engine, -1);
              return resolve(value);
            };
            callback(_resolve, reject);
          });
        };
        return { load };
      }
      function plugin7(engine, config = {}) {
        engine.use(plugin2, config);
        engine.use(plugin22, config);
        engine.use(plugin3, config);
        engine.use(plugin4, config);
        engine.use(plugin5, config);
        engine.use(plugin6);
      }
      window.pluginAssetLoader = plugin7;
    })();
    (() => {
      var _ = (e, m, c, l, o, h, b, g) => e < o + b && e + c > o && m < h + g && m + l > h;
      var y = (e, m, c, l, o, h) => (l - e) * (l - e) + (o - m) * (o - m) <= (c + h) * (c + h);
      var Zt = 2 * Math.PI;
      var v = (e, m, c, l = Math.sin) => e + (l(c) + 1) / 2 * (m - e);
      var Ws = Math.PI / 2;
      var et = { warnings: true };
      function w(e, m = {}) {
        if (e.stat(1)) throw 'Plugin Migrate should be loaded before the "init" event';
        m = Object.assign({}, et, m);
        let l = { def: p, seed: h, print: T, clear: R, setfps: O, setvar: X, textstyle: g, textmetrics: k, cliprect: F, clipcirc: C, blendmode: S, transform: L, getcolor: M, mousepos: Y, path: H, fill: D, stroke: z, clip: Z, paint: $, colrect: (...t) => (x("colrect()"), _(...t)), colcirc: (...t) => (x("colrect()"), y(...t)), wave: (...t) => (x("wave()"), v(...t)) };
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
        window.printPage = window.print;
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
        function C(t, s, r) {
          a("clipcirc()", "clip()");
          let n = e.ctx();
          n.beginPath(), n.arc(t, s, r, 0, e.TWO_PI), n.clip();
        }
        function M(t) {
          a("getcolor()", "stat(5)");
          let s = stat(5);
          return s[~~t % s.length];
        }
        function S(t) {
          a("blendmode()", "ctx().globalCompositeOperation");
          let s = e.ctx();
          s.globalCompositeOperation = t;
        }
        function R(t) {
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
        e.listen("resized", E);
        function E() {
          p("CX", e.W / 2), p("CY", e.H / 2);
        }
        E(), p("CANVAS", e.canvas());
        for (let t of ["W", "H", "T", "CX", "CY", "MX", "MY"]) e[t] != null && p(t, e[t]);
        a("FPS", "", "but you can use our plugin to measure the fps: https://github.com/litecanvas/plugin-frame-rate-meter"), i("FPS", ""), o.fps && e.framerate(o.fps), o.background != null && (a('"background" option', "You must update your canvas CSS"), e.listen("after:init", () => {
          e.canvas().style.background = M(~~o.background);
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
        d && d.length === 3 && (l.spr = function(t, s, r, n, u) {
          Number.isFinite(r) && r > 0 ? (a("spr() width and height", "spr(x, y, pixels)"), d(t, s, u)) : d(t, s, r);
        });
        let j = e.listen, I = e.unlisten;
        I && (l.listen = (t, s) => (j(t, s), () => {
          A("listen() not returns a function anymore. Please use unlisten(event, callback) instead."), I(t, s);
        }));
        let P = e.ispaused;
        P && (l.paused = () => (a("paused()", "ispaused()"), P()));
        function A(t) {
          m.warnings && void 0;
        }
        function a(t, s, r = "") {
          A(`${t} is removed. ` + (s ? `Please use ${s} instead. ` : "") + r);
        }
        function x(t, s = "function") {
          a(t, `This ${s} was moved to @litecanvas/utils package.`);
        }
        return l;
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
      var H = [[24, 60, 60, 24, 24, , 24], [54, 54, , , , , ,], [54, 54, 127, 54, 127, 54, 54], [12, 62, 3, 30, 48, 31, 12], [, 99, 51, 24, 12, 102, 99], [28, 54, 28, 110, 59, 51, 110], [6, 6, 3, , , , ,], [24, 12, 6, 6, 6, 12, 24], [6, 12, 24, 24, 24, 12, 6], [, 102, 60, 255, 60, 102, ,], [, 12, 12, 63, 12, 12, ,], [, , , , , 12, 12, 6], [, , , 63, , , ,], [, , , , , 12, 12], [96, 48, 24, 12, 6, 3, 1], [62, 99, 115, 123, 111, 103, 62], [12, 14, 12, 12, 12, 12, 63], [30, 51, 48, 28, 6, 51, 63], [30, 51, 48, 28, 48, 51, 30], [56, 60, 54, 51, 127, 48, 120], [63, 3, 31, 48, 48, 51, 30], [28, 6, 3, 31, 51, 51, 30], [63, 51, 48, 24, 12, 12, 12], [30, 51, 51, 30, 51, 51, 30], [30, 51, 51, 62, 48, 24, 14], [, 12, 12, , , 12, 12], [, 12, 12, , , 12, 12, 6], [24, 12, 6, 3, 6, 12, 24], [, , 63, , , 63, ,], [6, 12, 24, 48, 24, 12, 6], [30, 51, 48, 24, 12, , 12], [62, 99, 123, 123, 123, 3, 30], [12, 30, 51, 51, 63, 51, 51], [63, 102, 102, 62, 102, 102, 63], [60, 102, 3, 3, 3, 102, 60], [31, 54, 102, 102, 102, 54, 31], [127, 70, 22, 30, 22, 70, 127], [127, 70, 22, 30, 22, 6, 15], [60, 102, 3, 3, 115, 102, 124], [51, 51, 51, 63, 51, 51, 51], [30, 12, 12, 12, 12, 12, 30], [120, 48, 48, 48, 51, 51, 30], [103, 102, 54, 30, 54, 102, 103], [15, 6, 6, 6, 70, 102, 127], [99, 119, 127, 127, 107, 99, 99], [99, 103, 111, 123, 115, 99, 99], [28, 54, 99, 99, 99, 54, 28], [63, 102, 102, 62, 6, 6, 15], [30, 51, 51, 51, 59, 30, 56], [31, 51, 51, 31, 15, 27, 51], [30, 51, 7, 14, 56, 51, 30], [63, 45, 12, 12, 12, 12, 30], [51, 51, 51, 51, 51, 51, 63], [51, 51, 51, 51, 51, 30, 12], [99, 99, 99, 107, 127, 119, 99], [99, 99, 54, 28, 28, 54, 99], [51, 51, 51, 30, 12, 12, 30], [127, 99, 49, 24, 76, 102, 127], [30, 6, 6, 6, 6, 6, 30], [3, 6, 12, 24, 48, 96, 64], [30, 24, 24, 24, 24, 24, 30], [8, 28, 54, 99, , , ,], [, , , , , , , 255], [12, 12, 24, , , , ,], [, , 30, 48, 62, 51, 110], [7, 6, 6, 62, 102, 102, 59], [, , 30, 51, 3, 51, 30], [56, 48, 48, 62, 51, 51, 110], [, , 30, 51, 63, 3, 30], [28, 54, 6, 15, 6, 6, 15], [, , 110, 51, 51, 62, 48, 31], [7, 6, 54, 110, 102, 102, 103], [12, , 14, 12, 12, 12, 30], [48, , 48, 48, 48, 51, 51, 30], [7, 6, 102, 54, 30, 54, 103], [14, 12, 12, 12, 12, 12, 30], [, , 51, 127, 127, 107, 99], [, , 31, 51, 51, 51, 51], [, , 30, 51, 51, 51, 30], [, , 59, 102, 102, 62, 6, 15], [, , 110, 51, 51, 62, 48, 120], [, , 59, 110, 102, 6, 15], [, , 62, 3, 30, 48, 31], [8, 12, 62, 12, 12, 44, 24], [, , 51, 51, 51, 51, 110], [, , 51, 51, 51, 30, 12], [, , 99, 107, 127, 127, 54], [, , 99, 54, 28, 54, 99], [, , 51, 51, 51, 62, 48, 31], [, , 63, 25, 12, 38, 63], [56, 12, 12, 7, 12, 12, 56], [24, 24, 24, , 24, 24, 24], [7, 12, 12, 56, 12, 12, 7], [110, 59, , , , , ,]], W = (e, s, n) => {
        for (let t = 0; t < 8; t++) for (let r = 0; r < 8; r++) (s[t] | 0) & 1 << r && e.rectfill(r, t, 1, 1, n);
      }, k = { id: "basic", chars: H, first: 33, w: 8, h: 8, render: W };
      var B = [[34, 32, 32], [85, 0, 0], [87, 87, 80], [99, 103, 32], [84, 33, 80], [99, 101, 96], [34, 0, 0], [33, 17, 32], [36, 68, 32], [82, 80, 0], [2, 114, 0], [0, 0, 33], [0, 112, 0], [0, 0, 16], [68, 33, 16], [117, 85, 112], [50, 34, 112], [116, 113, 112], [116, 116, 112], [85, 116, 64], [113, 116, 112], [113, 117, 112], [116, 68, 64], [117, 117, 112], [117, 116, 112], [0, 32, 32], [0, 32, 33], [66, 18, 64], [7, 7, 0], [18, 66, 16], [116, 96, 32], [37, 81, 96], [37, 117, 80], [53, 53, 48], [97, 17, 96], [53, 85, 48], [113, 49, 112], [113, 49, 16], [97, 85, 96], [85, 117, 80], [114, 34, 112], [68, 69, 32], [85, 53, 80], [17, 17, 112], [87, 117, 80], [117, 85, 80], [37, 85, 32], [117, 113, 16], [101, 83, 96], [53, 53, 80], [97, 116, 48], [114, 34, 32], [85, 85, 112], [85, 82, 32], [85, 119, 80], [85, 37, 80], [85, 34, 32], [116, 33, 112], [98, 34, 96], [17, 36, 64], [50, 34, 48], [37, 0, 0], [0, 0, 112], [18, 0, 0], [6, 85, 96], [19, 85, 48], [6, 17, 96], [70, 85, 96], [2, 83, 96], [66, 114, 32], [2, 86, 66], [17, 53, 80], [2, 2, 32], [2, 2, 33], [21, 53, 80], [34, 34, 64], [5, 117, 80], [3, 85, 80], [2, 85, 32], [3, 85, 49], [6, 85, 100], [2, 81, 16], [6, 20, 48], [39, 34, 64], [5, 85, 96], [5, 82, 32], [5, 87, 80], [5, 34, 80], [5, 86, 66], [7, 65, 112], [98, 18, 96], [34, 34, 32], [50, 66, 48], [3, 96, 0]], $ = (e, s, n) => {
        for (let t = 0; t < 6; t++) for (let r = 0; r < 4; r++) {
          let g = ~~(t / 2);
          (t % 2 ? s[g] & 15 : s[g] >> 4) & 1 << r && e.rectfill(r, t, 1, 1, n);
        }
      }, A = { id: "mini", chars: B, first: 33, w: 4, h: 6, render: $ };
      var V = [[4, 4, 4, 4, 4, , 4, ,], [10, 10, 10, , , , , ,], [, 10, 31, 10, 10, 31, 10, ,], [4, 30, 5, 14, 20, 15, 4, ,], [17, 17, 8, 4, 2, 17, 17, ,], [6, 9, 9, 30, 9, 9, 22, ,], [4, 4, 4, , , , , ,], [8, 4, 4, 4, 4, 4, 8, ,], [2, 4, 4, 4, 4, 4, 2, ,], [, 4, 21, 14, 21, 4, , ,], [, 4, 4, 31, 4, 4, , ,], [, , , , , 4, 4, 2], [, , , 31, , , , ,], [, , , , , 4, 4, ,], [16, 16, 8, 4, 2, 1, 1, ,], [14, 17, 25, 21, 19, 17, 14, ,], [4, 6, 4, 4, 4, 4, 31, ,], [14, 17, 16, 8, 4, 2, 31, ,], [14, 17, 16, 12, 16, 17, 14, ,], [18, 18, 17, 31, 16, 16, 16, ,], [31, 1, 15, 16, 16, 17, 14, ,], [14, 1, 1, 15, 17, 17, 14, ,], [31, 16, 16, 8, 4, 4, 4, ,], [14, 17, 17, 14, 17, 17, 14, ,], [14, 17, 17, 30, 16, 17, 14, ,], [, 4, 4, , , 4, 4, ,], [, 4, 4, , , 4, 4, 2], [, 24, 6, 1, 6, 24, , ,], [, , 31, , 31, , , ,], [, 3, 12, 16, 12, 3, , ,], [14, 17, 16, 8, 4, , 4, ,], [14, 25, 21, 21, 25, 1, 14, ,], [14, 17, 17, 17, 31, 17, 17, ,], [15, 17, 17, 15, 17, 17, 15, ,], [14, 17, 1, 1, 1, 17, 14, ,], [15, 17, 17, 17, 17, 17, 15, ,], [31, 1, 1, 15, 1, 1, 31, ,], [31, 1, 1, 15, 1, 1, 1, ,], [14, 17, 1, 29, 17, 17, 14, ,], [17, 17, 17, 31, 17, 17, 17, ,], [31, 4, 4, 4, 4, 4, 31, ,], [16, 16, 16, 16, 17, 17, 14, ,], [17, 9, 5, 3, 5, 9, 17, ,], [1, 1, 1, 1, 1, 1, 31, ,], [17, 27, 21, 17, 17, 17, 17, ,], [17, 17, 19, 21, 25, 17, 17, ,], [14, 17, 17, 17, 17, 17, 14, ,], [15, 17, 17, 15, 1, 1, 1, ,], [14, 17, 17, 17, 17, 17, 14, 24], [15, 17, 17, 15, 17, 17, 17, ,], [14, 17, 1, 14, 16, 17, 14, ,], [31, 4, 4, 4, 4, 4, 4, ,], [17, 17, 17, 17, 17, 17, 14, ,], [17, 17, 17, 17, 10, 10, 4, ,], [17, 17, 17, 17, 21, 27, 17, ,], [17, 17, 10, 4, 10, 17, 17, ,], [17, 17, 10, 4, 4, 4, 4, ,], [31, 16, 8, 4, 2, 1, 31, ,], [12, 4, 4, 4, 4, 4, 12, ,], [1, 1, 2, 4, 8, 16, 16, ,], [6, 4, 4, 4, 4, 4, 6, ,], [4, 10, 17, , , , , ,], [, , , , , , 31, ,], [2, 4, , , , , , ,], [, , 30, 17, 17, 17, 30, ,], [1, 1, 15, 17, 17, 17, 15, ,], [, , 14, 17, 1, 17, 14, ,], [16, 16, 30, 17, 17, 17, 30, ,], [, , 14, 17, 31, 1, 14, ,], [12, 18, 2, 15, 2, 2, 2, ,], [, , 30, 17, 17, 17, 30, 16, 14], [1, 1, 15, 17, 17, 17, 17, ,], [4, , 6, 4, 4, 4, 31, ,], [16, , 24, 16, 16, 16, 16, 17, 14], [1, 1, 17, 9, 7, 9, 17, ,], [3, 2, 2, 2, 2, 2, 28, ,], [, , 15, 21, 21, 21, 21, ,], [, , 15, 17, 17, 17, 17, ,], [, , 14, 17, 17, 17, 14, ,], [, , 15, 17, 17, 17, 15, 1, 1], [, , 30, 17, 17, 17, 30, 16, 16], [, , 13, 19, 1, 1, 1, ,], [, , 30, 1, 14, 16, 15, ,], [2, 2, 15, 2, 2, 2, 28, ,], [, , 17, 17, 17, 17, 30, ,], [, , 17, 17, 17, 10, 4, ,], [, , 17, 17, 21, 21, 10, ,], [, , 17, 10, 4, 10, 17, ,], [, , 17, 17, 17, 17, 30, 16, 14], [, , 31, 8, 4, 2, 31, ,], [8, 4, 4, 2, 4, 4, 8, ,], [4, 4, 4, 4, 4, 4, 4, ,], [2, 4, 4, 8, 4, 4, 2, ,], [, , 18, 13, , , , ,]], T = { id: "monogram", chars: V, first: 33, w: 6, h: 9, render: (e, s, n) => {
        for (let t = 0; t < 9; t++) for (let r = 0; r < 6; r++) (s[t] | 0) & 1 << r && e.rectfill(r, t, 1, 1, n);
      } };
      var z = plugin = (e, { cache: s = true } = {}) => {
        let n = Math.round, t = e.text, r = e.textsize, g = e.textfont, X = e.textgap, o = s ? /* @__PURE__ */ new Map() : null, i = 1, I = 1, h = null, a = null, E = 3;
        e.listen("pal", (x, u) => {
          E = u;
        });
        let Y = (x) => {
          h = x;
        }, S = (x) => {
          i = ~~n(x);
        }, j = (x) => {
          I = ~~n(x);
        }, O = (x, u, c, b) => {
          e.push(), e.translate(x, u), e.scale(i), a.render(e, c, b), e.pop();
        }, D = (x, u, c, b = E) => {
          if (c += "", !i || !c.length) return;
          let P = e.ctx(), v = P.textAlign, F = P.textBaseline, m = i * a.w, f = i * (a.h || a.w), L = c.split(`
`), R = I * i, N = u;
          F === "middle" ? N = n(u - f / 2) : F === "bottom" && (N = u - f);
          for (let d = 0; d < L.length; d++) {
            let p = L[d], y = N + d * (R + f), l = x;
            v === "center" ? l = n(x - p.length * m / 2) : (v === "right" || v === "end") && (l = x - p.length * m);
            for (let w = 0; w < p.length; w++) {
              let M = p[w], G = M.charCodeAt(0);
              h != null && e.rectfill(l, y, m, f, h);
              let _ = a.chars[G - a.first];
              if (_) if (s) {
                let C = [a.id, M, b, m].join(":");
                o.has(C) || o.set(C, e.paint(m, f, () => {
                  O(0, 0, _, b);
                }));
                let q = o.get(C);
                e.image(l, y, q);
              } else O(l, y, _, b);
              l += m;
            }
          }
        };
        if (s) {
          let u = setInterval(() => {
            o.clear();
          }, 6e4);
          e.listen("quit", () => {
            clearInterval(u), o.clear();
          }), e.listen("pal", () => {
            o.clear();
          });
        }
        return { textfont: (x) => {
          x !== a && (typeof x == "object" ? (e.def("text", D), e.def("textsize", S), e.def("textgap", j), a = x, S(i || 1)) : (e.def("text", t), e.def("textsize", r), e.def("textgap", X), g(x)));
        }, textbg: Y };
      };
      window.pluginPixelFont = z;
      window.PIXEL_FONT_MINI = A;
      window.PIXEL_FONT_BASIC = k;
      window.PIXEL_FONT_MONOGRAM = T;
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
/*! Bundled license information:

litecanvas/src/mulberry32.js:
  (**
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
   *)
*/
/*! pluginFrameRateMeter for litecanvas by Luiz Bills | MIT Licensed */
/*! Plugin Pixel Font for litecanvas by Luiz Bills | MIT Licensed */
/*! Joystick plugin for Litecanvas by Luiz Bills | MIT Licensed */
