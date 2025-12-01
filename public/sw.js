/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v1.0.0';
const cacheName = 'simorghCache_v3';

const service = self.location.pathname.split('/')[1];
const hasOfflinePageFunctionality = true;
const OFFLINE_PAGE = `/${service}/offline`;

self.addEventListener('install', event => {
  console.log(
    '[SW] Installing service worker, caching offline page:',
    OFFLINE_PAGE,
  );
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      if (hasOfflinePageFunctionality) {
        const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin).href;
        console.log('[SW] Fetching offline page for cache:', offlinePageUrl);
        try {
          const response = await fetch(offlinePageUrl);
          if (!response || !response.ok) {
            throw new Error(
              `Failed to fetch offline page: ${response.status} ${response.statusText}`,
            );
          }
          // Cache the offline page HTML
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
          ].filter(r => r.startsWith('/') || r.startsWith('http://localhost'));

          console.log(
            '[SW] Caching',
            resourcesToCache.length,
            'offline page resources',
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
                console.log('[SW] Failed to cache:', resource);
              }
            }),
          );

          console.log(
            '[SW] ✅ Offline page cached successfully:',
            offlinePageUrl,
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `[SW] ❌ Failed to cache offline page: ${error.message}`,
          );
        }
      }
    })(),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating new service worker, cleaning old caches');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('[SW] Deleting old cache:', cache);
              return caches.delete(cache);
            }
            return null;
          }),
        );
      })
      .then(() => self.clients.claim()),
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
    event.request.mode === 'navigate' ||
    event.request.destination === 'script' ||
    event.request.destination === 'style'
  ) {
    // Handle navigation requests and resource requests (JS, CSS)
    console.log(
      '[SW v0.5.0] Request intercepted:',
      event.request.mode,
      event.request.url,
    );
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        console.log('[SW v0.5.0] Using cache:', cacheName);

        // Check cache first
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log(
            '[SW v0.5.0] ✅ Found in cache, returning:',
            event.request.url,
          );
          return cachedResponse;
        }

        console.log(
          '[SW v0.5.0] Not in cache, trying network:',
          event.request.url,
        );

        try {
          // Try network
          const networkResponse = await fetch(event.request);
          console.log(
            '[SW v0.5.0] Network fetch successful, caching:',
            event.request.url,
          );
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          console.error(
            `[SW v0.5.0] ❌ Network failed: ${error.message} for:`,
            event.request.url,
          );

          const offlinePageUrl = new URL(OFFLINE_PAGE, self.location.origin)
            .href;

          // For navigation requests, serve offline page
          if (event.request.mode === 'navigate') {
            console.log(
              '[SW v0.5.0] Looking for offline page:',
              offlinePageUrl,
            );
            const offlineResponse = await cache.match(offlinePageUrl);
            if (offlineResponse) {
              console.log('[SW v0.5.0] ✅ Serving offline page');
              return offlineResponse;
            }
            console.log('[SW v0.5.0] ⚠️ No offline page in cache!');
          }

          console.log(
            '[SW v0.5.0] ⚠️ No cache available for:',
            event.request.url,
          );
          try {
            const freshOfflineResponse = await fetch(offlinePageUrl);
            if (freshOfflineResponse && freshOfflineResponse.ok) {
              const clonedResponse = freshOfflineResponse.clone();
              cache.put(offlinePageUrl, freshOfflineResponse);
              return clonedResponse;
            }
            // eslint-disable-next-line no-console
            console.error(
              `Failed to fetch offline page, status: ${freshOfflineResponse ? freshOfflineResponse.status : 'unknown'}`,
            );
            return new Response(
              'You are offline and the offline page could not be retrieved.',
              {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
              },
            );
          } catch (offlineError) {
            // eslint-disable-next-line no-console
            console.error(
              `Error fetching offline page: ${offlineError.message}`,
            );
            return new Response(
              'You are offline and the offline page could not be retrieved.',
              {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
              },
            );
          }
        }
      })(),
    );
  }
  return;
};

onfetch = fetchEventHandler;
