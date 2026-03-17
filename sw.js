const CACHE_NAME = "lupo-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/css/carousel.css",
  "/js/calculadora.js",
  "/js/carousel.js",
  "/offline.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});
