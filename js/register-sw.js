
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    }).finally(() => {
      navigator.serviceWorker.register('/service-worker.js?v=' + Date.now())
        .then(reg => console.log('[SW] Registrado:', reg.scope))
        .catch(err => console.error('[SW] Error:', err));
    });
  });
}
