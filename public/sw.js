const cacheName = "luizbills.litecanvas-editor-v1";
const version = "2.26.1";

const precacheResources = [
  "/",
  "/index.html",
  "/preview.html",
  "/about.html",
  "/app.css",
  "/app.js",
  "/litecanvas.js",
  "/prism/prism.css",
  "/prism/prism.js",
  "/prism/prism-typescript.js",
  "/prism/prism-autolinker.js",
  "/icons/favicon.ico",
  "/icons/icon-128.png",
  "/icons/icon-256.png",
  "/icons/icon-512.png",
  "/images/colors.png",
  "/images/sprites.png",
  "/images/badges/discord.png",
  "/images/badges/itch.png",
  "/fonts/monogram.ttf",
  "/manifest.json",
  "/tools/pixel-art-editor.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener("message", (event) => {
  const type = event.data.type;
  if ("GET_VERSION" === type) {
    event.source.postMessage({ type, res: version });
  }
});
