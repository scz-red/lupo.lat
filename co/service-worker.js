self.addEventListener("install", () => {
  console.log("Service Worker instalado por LUPO");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker activo");
});

self.addEventListener("fetch", (event) => {
  // Actualmente solo passthrough, sin cache
});
