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
  // eslint-disable-next-line no-console
  console.log(`[SW v${version}] Installing...`);
  // Skip waiting to activate immediately
  self.skipWaiting();

  // Note: We don't pre-cache offline pages here because we don't know which
  // service the user will visit. Instead, offline pages are cached on-demand
  // when the user navigates to a service while online (see fetch handler).
});

self.addEventListener('activate', event => {
  // eslint-disable-next-line no-console
  console.log(`[SW v${version}] Activating...`);
  event.waitUntil(
    (async () => {
      // Clean up old caches from previous SW versions
      const cacheNames = await caches.keys();
      const currentCaches = [cacheName];

      await Promise.all(
        cacheNames.map(cache => {
          if (!currentCaches.includes(cache)) {
            // eslint-disable-next-line no-console
            console.log(`[SW v${version}] Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
          return null;
        }),
      );

      // Take control of all pages immediately
      await self.clients.claim();
    })(),
  );
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

          // Cache offline page for this service when online (for future offline use)
          if (event.request.mode === 'navigate' && networkResponse.ok) {
            const service = getServiceFromUrl(event.request.url);
            const offlinePageUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;

            // Only cache if not already cached
            const cachedOffline = await cache.match(offlinePageUrl);
            if (!cachedOffline) {
              // eslint-disable-next-line no-console
              console.log(`[SW] Caching offline page for ${service}...`);
              // Cache asynchronously, don't block navigation
              fetch(offlinePageUrl)
                .then(async offlineResponse => {
                  if (offlineResponse && offlineResponse.ok) {
                    await cache.put(offlinePageUrl, offlineResponse.clone());
                    // eslint-disable-next-line no-console
                    console.log(`[SW] Cached ${offlinePageUrl}`);

                    // Also cache JS/CSS resources
                    const html = await offlineResponse.text();
                    const scriptSrcs = [
                      ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
                    ].map(m => m[1]);
                    const linkHrefs = [
                      ...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g),
                    ].map(m => m[1]);

                    const resources = [...scriptSrcs, ...linkHrefs]
                      .filter(
                        url =>
                          url.startsWith('/') ||
                          url.startsWith(self.location.origin),
                      )
                      .map(url => new URL(url, self.location.origin).href);

                    await Promise.allSettled(
                      resources.map(async url => {
                        const res = await fetch(url);
                        if (res && res.ok) await cache.put(url, res);
                      }),
                    );
                  }
                })
                .catch(err => {
                  // eslint-disable-next-line no-console
                  console.error(
                    `[SW] Failed to cache offline page for ${service}:`,
                    err,
                  );
                });
            }
          }

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
