/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.2.0';
const cacheName = 'simorghCache_v1';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName));
});

const fetchEventHandler = async event => {
  if (
    /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+.webp$/.test(
      event.request.url,
    )
  ) {
    const req = event.request.clone();

    // Inspect the accept header for WebP support

    const supportsWebp =
      req.headers.has('accept') && req.headers.get('accept').includes('webp');

    // if supports webp is false in request header then don't use it
    // if accept header doesn't indicate support for webp remove .webp extension

    if (!supportsWebp) {
      const imageUrlWithoutWebp = req.url.replace('.webp', '');
      event.respondWith(
        fetch(imageUrlWithoutWebp, {
          mode: 'no-cors',
        }),
      );
    }
  } else if (
    /((\/cwr\.js$)|(\.woff2$)|(modern\.frosted_promo+.*?\.js$)|(\/moment-lib+.*?\.js$))/.test(
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
  return;
};

onfetch = fetchEventHandler;
