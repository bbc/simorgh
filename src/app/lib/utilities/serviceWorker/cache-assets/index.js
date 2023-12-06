const cacheAssets = async (event, cacheName) => {
  if (
    /((\/cwr\.js$)|(\.woff2$)|(modern\.frosted_promo\.32caa641\.js$)|(\/moment-lib\.dfdb34b8\.js$))/.test(
      event.request.url,
    )
  ) {
    const cache = await caches.open(cacheName);
    let response = await cache.match(event.request);

    if (!response) {
      response = await fetch(event.request.url);
      cache.put(event.request, response.clone());
    }

    event.respondWith(response);
  }
};

export default cacheAssets;
