const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
  './',
  './index.html',
  './js/app.js',
  './js/ui.js',
  './js/ui_aframe.js',
  './js/materialize.min.js',
  './css/styles.css',
  './css/materialize.min.css',
  './img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  './pages/fallback.html',
  './components/intersection-spawn.js',
  './pages/environment.html',
  './ar.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  //removing firebase entries from fetch
  if(event.request.url.indexOf('firestore.googleapis.com') === -1){
    console.log('Handling fetch event for', event.request.url);
    console.log(event.request);

    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);

          return response;
        }
        console.log('No response found in cache. About to fetch from network & store in dynamic cache...');

        return fetch(event.request).then(function(response) {
          console.log('Response from network is:', response);
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return response;
          })

          // return response;
        }).catch(function(error) {
          console.error('Fetching failed:', error);

          throw error;
        });
      })
    );
  }
});


// fetch events; do not respond to firestore api requests  && evt.request.url.indexOf('esp8266') === -1
// self.addEventListener('fetch', evt => {
//   if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
//     evt.respondWith(
//       caches.match(evt.request).then(cacheRes => {
//         return cacheRes || fetch(evt.request).then(fetchRes => {
//           console.log(fetchRes);
//           return caches.open(dynamicCacheName).then(cache => {
//             cache.put(evt.request.url, fetchRes.clone());
//             // check cached items size
//             limitCacheSize(dynamicCacheName, 15);
//             return fetchRes;
//           })
//         }).catch((err) => console.log(err));
//       }).catch(() => {
//         if(evt.request.url.indexOf('.html') > -1){
//           return caches.match('/pages/fallback.html');
//         } 
//       })
//     );
//   }
// });