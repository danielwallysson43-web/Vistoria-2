const CACHE_NAME = 'vistoriapro-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Faz o cache da biblioteca do PDF para gerar sem internet!
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap'
];

// Instalando o Service Worker e guardando tudo no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache para uso offline');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Interceptando os acessos. Se estiver sem net, ele puxa da memória.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se achou no cache (offline), retorna. Senão, tenta buscar na rede.
        return response || fetch(event.request);
      })
  );
});
