// version 1.7
const cacheName = "luizbills.litecanvas-editor-v1";

const precacheResources = [
  "/",
  "/index.html",
  "/about.html",
  "/app.css",
  "/app.js",
  "/litecanvas.js",
  "/prism/prism.css",
  "/prism/prism.js",
  "/prism/prism-typescript.js",
  "/prism/prism-autolinker.js",
  "/icons/favicon.ico",
  "/icons/icon.png",
  "/images/colors.png",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
