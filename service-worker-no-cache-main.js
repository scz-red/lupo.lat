const CACHE_NAME = 'lupo-cache-v1';
const EXCLUDE_FROM_CACHE = ['main.js', 'manifest.json'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[ServiceWorker] Instalado');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(cache => {
        if (cache !== CACHE_NAME) {
          return caches.delete(cache);
        }
      }))
    )
  );
  console.log('[ServiceWorker] Activado');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Evitar caché de archivos críticos
  if (EXCLUDE_FROM_CACHE.some(path => requestUrl.pathname.endsWith(path))) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => fetch(event.request))
  );
});
