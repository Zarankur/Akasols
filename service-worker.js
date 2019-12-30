console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.setConfig({ debug: true });

workbox.precaching.precacheAndRoute([
  './',
  './js/app.js',
  './js/ui.js',
  './js/ui_aframe.js',
  './js/materialize.min.js',
  './css/styles.css',
  './css/materialize.min.css',
  './img/dish.png',
    { url: './index.html', revision: '383676' },
]);

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'my-image-cache',
    })
  );

workbox.routing.registerRoute(
    new RegExp('.+/firestore\\.googleapis\\.com/.+'),
    new workbox.strategies.NetworkOnly()
  );

workbox.routing.registerRoute(
  'https:esp8266.local',
    new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
    new RegExp('.+\\.html$'),
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    new RegExp('\\.js$'),
    new workbox.strategies.StaleWhileRevalidate()
  );