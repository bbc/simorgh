/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.3.0';
const cacheName = 'simorghCache_v1';
 
const service = self.location.pathname.split('/')[1];
const hasOfflinePageFunctionality = true;
const OFFLINE_PAGE = `/${service}/offline`;
 
self.addEventListener('install', event => {
  console.log(`Service worker installing with version ${version}`);
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      if (hasOfflinePageFunctionality) {
        const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin).href;
        console.log(`Attempting to cache offline page at: ${offlinePageUrl}`);
        try {
          const response = await fetch(offlinePageUrl);
          if (!response || !response.ok) {
            throw new Error(`Failed to fetch offline page: ${response.status} ${response.statusText}`);
          }
          await cache.put(offlinePageUrl, response);
          console.log(`Offline page ${offlinePageUrl} cached successfully with status: ${response.status}`);
        } catch (error) {
          console.error(`Failed to cache offline page: ${error.message}`);
        }
      }
    })()
  );
  self.skipWaiting();
});
 
const CACHEABLE_FILES = [
  // Reverb
  /^https:\/\/static(?:\.test)?\.files\.bbci\.co\.uk\/ws\/(?:simorgh-assets|simorgh1-preview-assets|simorgh2-preview-assets)\/public\/static\/js\/reverb\/reverb-3.10.1.js$/,
  // Smart Tag
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/smarttag-5.29.4.min.js',
  // Fonts
  /\.woff2$/,
  // Frosted Promo (test and live environments only)
  /^https:\/\/static(\.test)?\.files\.bbci\.co\.uk\/ws\/simorgh-assets\/public\/static\/js\/modern\.frosted_promo+.*?\.js$/,
  // Moment
  /\/moment-lib+.*?\.js$/,
  // PWA Icons
  /\/images\/icons\/icon-.*?\.png\??v?=?\d*$/,
];
 
const WEBP_IMAGE =
  /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+.webp$/;
 
const fetchEventHandler = async event => {
  const isRequestForCacheableFile = CACHEABLE_FILES.some(cacheableFile =>
    new RegExp(cacheableFile).test(event.request.url),
  );
 
  const isRequestForWebpImage = WEBP_IMAGE.test(event.request.url);
 
  if (isRequestForWebpImage) {
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
  } else if (isRequestForCacheableFile) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        let response = await cache.match(event.request);
        if (!response) {
          response = await fetch(event.request.url);
          cache.put(event.request, response.clone());
        }
        return response;
      })(),
    );
  } else if (hasOfflinePageFunctionality && event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          console.log(`Attempting navigation to: ${event.request.url}`);
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            console.log('Using preloaded response');
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          console.log(`Network response status: ${networkResponse.status}`);
          return networkResponse;
        } catch (error) {
          console.log(`Network request failed: ${error.message}, serving offline page`);
          const cache = await caches.open(cacheName);
          const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin).href;
          console.log(`Looking for offline page in cache: ${offlinePageUrl}`);
          
          const cachedResponse = await cache.match(offlinePageUrl);
          if (cachedResponse) {
            console.log(`Found cached offline page with status: ${cachedResponse.status}`);
            return cachedResponse;
          } else {
            console.log('Offline page not found in cache, attempting to fetch it now');
            try {
              const freshOfflineResponse = await fetch(offlinePageUrl);
              if (freshOfflineResponse && freshOfflineResponse.ok) {
                console.log(`Successfully fetched offline page with status: ${freshOfflineResponse.status}`);
                const clonedResponse = freshOfflineResponse.clone();
                cache.put(offlinePageUrl, freshOfflineResponse);
                return clonedResponse;
              } else {
                console.error(`Failed to fetch offline page, status: ${freshOfflineResponse ? freshOfflineResponse.status : 'unknown'}`);
                return new Response('You are offline and the offline page could not be retrieved.', {
                  status: 503,
                  headers: { 'Content-Type': 'text/plain' }
                });
              }
            } catch (offlineError) {
              console.error(`Error fetching offline page: ${offlineError.message}`);
              return new Response('You are offline and the offline page could not be retrieved.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }
        }
      })()
    );
  }
  return;
};
 
onfetch = fetchEventHandler;