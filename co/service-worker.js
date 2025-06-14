
const CACHE_NAME = 'lupo-cache-v3';
const EXCLUDE_FROM_CACHE = ['main.js', 'manifest.json'];

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/icons/icono-192.png',
  '/icons/icono-512.png'
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
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Borrando caché vieja:', cache);
            return caches.delete(cache);
          }
        })
      )
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
    caches.match(event.request).then(cachedResponse => {
      return (
        cachedResponse ||
        fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => fetch(event.request))
  );
});
