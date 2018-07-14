// Asignar el nombre y version del cache

const CACHE_NAME = 'v1git_cache_David_Gonzalez';

//FICHEROS A CACHEAR EN LA APLICACION

var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];

// INSTALACION
// Instalacion del serviceWorker, guardar en cache los recursos estaticos de la aplicción
    self.addEventListener('install', e => {
        e.waitUntil(
            caches.open(CACHE_NAME)
                  .then(cache => {
                    return cache.addAll(urlsToCache)
                                .then(() =>{
                                    self.skipWaiting(); // espera a que se guarden todos los archivos en cache
                                });
                
                  })
                  .catch(err => { console.log('No se ha registrado el cache',err)}) 
        );
    });
// ACTIVACION
// que la app fuencione sin conexion
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhiteList.indexOf(cacheName) == -1){
                            // Borrar los elemento que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(()=>{
                  // Activar la chache en el dispositvo
                  self.clients.claim();
              })
    )
});
// FETCH EL QUE BAJA LA INFORMACION A LA PAGINA Y LO VUELVE A BAJAR 
// cuando recupera la informacion cuando existe actualizaciones
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res){
                      // devuelve datos del cache
                      return res;
                  }
                  return fetch(e.request);
              })
    );
});
