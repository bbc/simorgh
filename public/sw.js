/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.0.6';
const cacheName = 'simorghCache_v1';

importScripts('./service-worker/webp-images/index.js');
importScripts('./service-worker/cache-assets/index.js');

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', event => {
  webPImages(event);
  cacheAssets(event, cacheName);
});
