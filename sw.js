// Service Worker Básico para PWA
const CACHE_NAME = 'vistoria-pro-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Para este app, não vamos forçar cache agressivo para garantir
    // que o envio das fotos e GPS sempre use a rede real.
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
