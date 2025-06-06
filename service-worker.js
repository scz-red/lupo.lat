const CACHE_NAME = 'lupo-cache-v1';
const EXCLUDE_FROM_CACHE = ['main.js', 'manifest.json'];
const PRECACHE_ASSETS = [
  '/',
  '/índice.html',
  '/css/styles.css',
  '/js/main.js',
  '/iconos/icono-192.png',
  '/iconos/icono-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[ServiceWorker] Instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
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
