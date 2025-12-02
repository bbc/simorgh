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
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      if (hasOfflinePageFunctionality) {
        try {
          const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin)
            .href;
          const response = await fetch(offlinePageUrl);
          if (!response || !response.ok) {
            throw new Error('Failed to fetch offline page');
          }
          await cache.put(offlinePageUrl, response.clone());

          // Parse HTML to extract and cache all script/link resources
          const html = await response.text();
          const scriptMatches = html.matchAll(
            /<script[^>]+src=["']([^"']+)["']/g,
          );
          const linkMatches = html.matchAll(/<link[^>]+href=["']([^"']+)["']/g);

          const resourcesToCache = [
            ...Array.from(scriptMatches, m => m[1]),
            ...Array.from(linkMatches, m => m[1]),
          ].filter(
            r => r.startsWith('/') || r.startsWith(self.location.origin),
          );

          // Cache all resources in parallel
          await Promise.allSettled(
            resourcesToCache.map(async resource => {
              try {
                const resourceUrl = new URL(resource, self.location.origin)
                  .href;
                const resourceResponse = await fetch(resourceUrl);
                if (resourceResponse && resourceResponse.ok) {
                  await cache.put(resourceUrl, resourceResponse);
                }
              } catch (err) {
                // Resource failed to cache, continue
              }
            }),
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to cache offline page:', error.message);
        }
      }
    })(),
  );
  self.skipWaiting();
});

const CACHEABLE_FILES = [
  // Reverb
  /^https:\/\/static(?:\.test)?\.files\.bbci\.co\.uk\/ws\/(?:simorgh-assets|simorgh1-preview-assets|simorgh2-preview-assets)\/public\/static\/js\/reverb\/reverb-3.10.2.js$/,
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
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(cacheName);
          const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin)
            .href;
          const cachedResponse = await cache.match(offlinePageUrl);
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response('You are offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
      })(),
    );
  }
  return;
};

onfetch = fetchEventHandler;
