const CACHE_NAME = 'sol-finance-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Adicione aqui outros arquivos que deseja armazenar em cache, como CSS ou JS externos
];

// Instalação do Service Worker e armazenamento no cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto e arquivos adicionados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Cache antigo removido:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições e busca no cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Se a resposta estiver no cache, retorna-a
        if (response) {
          return response;
        }
        // Caso contrário, realiza uma requisição normal à rede
        return fetch(event.request).catch(function() {
          // Opcional: adicione uma página de fallback offline
          console.log('Falha na conexão, sem cache disponível para:', event.request.url);
        });
      })
  );
});
