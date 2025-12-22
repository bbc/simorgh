/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v0.3.1';
const cacheName = 'simorghCache_v3';

// Track PWA clients
const pwaClients = new Map();

console.log(`[SW v${version}] Service Worker loaded.`);

// --------------------
// Helper Functions
// --------------------
const getServiceFromUrl = url => new URL(url).pathname.split('/')[1];
const getOfflinePageUrl = service => `/${service}/offline`;

const cacheResource = async (cache, url) => {
  try {
    const response = await fetch(url);
    if (response.ok) await cache.put(url, response.clone());
    return response;
  } catch (err) {
    console.error(`[SW v${version}] Failed to cache ${url}:`, err);
    return null;
  }
};

const cacheOfflinePageAndResources = async service => {
  const cache = await caches.open(cacheName);
  const offlinePageUrl = new URL(
    getOfflinePageUrl(service),
    self.location.origin,
  ).href;

  // Commenting out to force re-cache during testing
  // if (await cache.match(offlinePageUrl)) return;

  const resp = await cacheResource(cache, offlinePageUrl);
  if (!resp || !resp.ok) return;

  console.log(`[SW v${version}] Cached offline page for ${service}`);

  const html = await resp.text();
  const scriptSrcs = [
    ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
  ].map(m => m[1]);
  const linkHrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(
    m => m[1],
  );

  const resources = [...scriptSrcs, ...linkHrefs]
    .filter(Boolean)
    .filter(url => url.startsWith('/') || url.startsWith(self.location.origin))
    .map(url => new URL(url, self.location.origin).href);

  await Promise.allSettled(resources.map(url => cacheResource(cache, url)));
};

// Cache patterns
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

// -------------Install event -------
self.addEventListener('install', event => {
  console.log(`[SW v${version}] Installing...`);
  self.skipWaiting();
});

// -------Activate Handler-------------
self.addEventListener('activate', event => {
  console.log(`[SW v${version}] Activating...`);
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(key => key !== cacheName && caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// -------Message Event-------------
self.addEventListener('message', async event => {
  console.log(`[SW v${version}] Message received:`, event.data);

  if (event.data?.type === 'PWA_STATUS') {
    const clientId = event.source.id;
    const { isPWA } = event.data;

    if (isPWA) {
      pwaClients.set(clientId, true);
      const service = getServiceFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service);
    }
  }
});

// -------Fetch Handler-------------
const fetchEventHandler = async event => {
  console.log(`[SW FETCH] Request: ${event.request.url}`);
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
  } else if (event.request.url.includes('/_next/static/')) {
    // Cache Next.js static files - cache-first strategy
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(event.request);
        if (cached) return cached;

        const networkResp = await fetch(event.request);
        cache.put(event.request, networkResp.clone());
        return networkResp;
      })(),
    );
  } else if (event.request.mode === 'navigate') {
    const { url } = event.request;

    event.respondWith(
      (async () => {
        const client = await self.clients.get(event.clientId);
        const isPWA = client && pwaClients.get(client.id);
        const cache = await caches.open(cacheName);

        console.log('[SW FETCH] Navigation', {
          url: event.request.url,
          clientId: event.clientId,
          isPWA,
          client,
          event,
          pwaClients,
        });
        try {
          // Use preload if available
          const preloadResp = await event.preloadResponse;
          if (preloadResp) return preloadResp;

          const networkResp = await fetch(event.request);

          // Cache offline page if in PWA mode
          if (networkResp && networkResp.ok && event.clientId) {
            console.log('[SW] Caching offline page if PWA if network is ok');
            if (isPWA) {
              const service = getServiceFromUrl(url);
              cacheOfflinePageAndResources(service).catch(err =>
                console.error('[SW] Cache offline fail:', err),
              );
            }
          }

          return networkResp;
        } catch (err) {
          console.log('[SW] Navigation failed:', url, err);

          // Only show offline page for installed PWA
          if (isPWA) {
            const service = getServiceFromUrl(url);
            const offlineUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;

            const cachedOffline = await cache.match(offlineUrl);
            if (cachedOffline) {
              console.log('[SW] Serving cached offline page');
              return cachedOffline;
            }
          }
          // fallback to browser default behavior
          throw err;
        }
      })(),
    );
  }

  return;
};

onfetch = fetchEventHandler;
