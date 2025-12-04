/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';

const hasOfflinePageFunctionality = true;

// Helper to get service from URL
const getServiceFromUrl = url => {
  const { pathname } = new URL(url);
  return pathname.split('/')[1];
};

// Helper to get offline page URL for a service
const getOfflinePageUrl = service => `/${service}/offline`;

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      if (hasOfflinePageFunctionality) {
        try {
          // Get service from any client URL or default to 'ws'
          const clients = await self.clients.matchAll();
          const service =
            clients.length > 0 ? getServiceFromUrl(clients[0].url) : 'ws';

          // Fetch and cache the offline page HTML
          const offlinePageUrl = new URL(
            getOfflinePageUrl(service),
            self.location.origin,
          ).href;
          const response = await fetch(offlinePageUrl);
          if (response && response.ok) {
            await cache.put(offlinePageUrl, response.clone());

            // Extract and cache JS/CSS resources so page works offline
            const html = await response.text();
            const scriptSrcs = [
              ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
            ].map(m => m[1]);
            const linkHrefs = [
              ...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g),
            ].map(m => m[1]);

            const resources = [...scriptSrcs, ...linkHrefs]
              .filter(
                url =>
                  url.startsWith('/') || url.startsWith(self.location.origin),
              )
              .map(url => new URL(url, self.location.origin).href);

            // Cache resources in parallel (ignore individual failures)
            await Promise.allSettled(
              resources.map(async url => {
                const res = await fetch(url);
                if (res && res.ok) await cache.put(url, res);
              }),
            );
          }
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
  } else if (
    hasOfflinePageFunctionality &&
    (event.request.mode === 'navigate' ||
      event.request.destination === 'script' ||
      event.request.destination === 'style')
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);

        // Try cache first for scripts/styles
        if (
          event.request.destination === 'script' ||
          event.request.destination === 'style'
        ) {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
        }

        // For navigation or if not in cache, try network
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // Network failed - serve offline page for navigation
          if (event.request.mode === 'navigate') {
            // Extract service from the request URL
            const service = getServiceFromUrl(event.request.url);
            const offlinePageUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;
            const cachedResponse = await cache.match(offlinePageUrl);
            if (cachedResponse) {
              return cachedResponse;
            }
            return new Response('You are offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            });
          }
          // For scripts/styles, return error response
          return new Response('Offline', { status: 503 });
        }
      })(),
    );
  }
  return;
};

self.addEventListener('fetch', fetchEventHandler);
