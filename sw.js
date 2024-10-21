const CACHE_NAME = 'sol-finance-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Inclua aqui todos os outros arquivos do seu aplicativo
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Se encontrar no cache, retorna a resposta
        if (response) {
          return response;
        }
        // Caso contrário, faz uma requisição normal
        return fetch(event.request);
      })
  );
});
