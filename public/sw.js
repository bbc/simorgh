/* eslint-disable */
const version = 'v0.0.6';
const cacheName = 'simorghCache_v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

self.addEventListener('fetch', function(event) {
  if (/^https:\/\/ichef\.bbci\.co\.uk\/(news|ace\/standard)\/.+(\.jpg|\.png)$/.test(event.request.url)) {

    const req = event.request.clone();

    // Inspect the accept header for WebP support
    let supportsWebp = false;
    if (req.headers.has('accept')){
      supportsWebp = req.headers.get('accept').includes('webp');
    }
    // If we support WebP
    if (supportsWebp && !/\/amz\/worldservice\/.*/.test(event.request.url)) {
      event.respondWith(
        fetch(`${req.url}.webp`, {
          mode: 'no-cors'
        })
      );
    }
    
  }
  else if (/((\/cwr\.js$)|(\.woff2$)|(modern\.frosted_promo\.32caa641\.js$)|(\/moment\-lib\.dfdb34b8\.js$))/.test(event.request.url)) {
    event.respondWith(caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
          cache.put(event.request, fetchedResponse.clone());
          return fetchedResponse;
        });
      });
    }));
  }
  else {
    return;
  }
});