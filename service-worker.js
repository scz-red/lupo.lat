self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activated');
});

self.addEventListener('fetch', function(event) {
  // Puedes personalizar esto para usar caché
  return fetch(event.request);
});
