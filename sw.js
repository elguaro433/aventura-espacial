// Service Worker - Permite que el juego funcione sin internet (offline)
// Estrategia: network-first con timeout para HTML, cache-first para assets locales,
// nada de cachear cross-origin (Wikipedia, etc.) para evitar que la cache crezca infinito.
// 20260503-093124 se reemplaza automáticamente en cada push con el timestamp UTC actual.
// Si el script de push no se ejecuta, fallback al timestamp de instalación del SW.
const RAW_BUILD_TIME = '20260503-093124';
const BUILD_TIME = RAW_BUILD_TIME.indexOf('BUILD_TIME') !== -1 ? String(Date.now()) : RAW_BUILD_TIME;
const CACHE_NAME = 'aventura-espacial-' + BUILD_TIME;
const NETWORK_TIMEOUT_MS = 3000; // si tarda más, va a cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './avatar-emmanuel.jpg',
  './avatar-emiliano.jpg',
  './foto-hermanos.jpg',
  './escudo-diaz.svg',
  './escudo-gonzalez.svg',
  './data/dictionary-extra.json',
  './data/encyclopedia.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Pre-cachea por archivo (allSettled) para que un asset faltante no rompa toda la instalación
        return Promise.allSettled(urlsToCache.map(url => cache.add(url)));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Permite que la página fuerce la activación inmediata del nuevo SW
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function fetchWithTimeout(request, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(request).then(r => { clearTimeout(timer); resolve(r); }, e => { clearTimeout(timer); reject(e); });
  });
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  // No interferir con peticiones cross-origin (Wikipedia, fonts CDN, etc.).
  // El navegador las hace directamente; así la cache del SW no crece infinito.
  if (!sameOrigin) return;

  const isHTML = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first con timeout: siempre intentamos la última versión, pero si tarda >3s vamos a cache.
    event.respondWith(
      fetchWithTimeout(event.request, NETWORK_TIMEOUT_MS).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first para assets locales
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        // Para assets fallidos NO devolver index.html (rompería <img>); devolver respuesta de error.
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
