/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';

// Track PWA clients
const pwaClients = new Map();

// Track pending navigation fetches until we know PWA status
const pendingNavigations = new Map();

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
  if (await cache.match(offlinePageUrl)) return;

  const resp = await cacheResource(cache, offlinePageUrl);
  if (!resp || !resp.ok) return;

  console.log(`[SW v${version}] Cached offline page for ${service}`);

  const html = await resp.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const scriptSrcs = Array.from(doc.querySelectorAll('script[src]')).map(el =>
    el.getAttribute('src'),
  );
  const linkHrefs = Array.from(doc.querySelectorAll('link[href]')).map(el =>
    el.getAttribute('href'),
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
self.addEventListener('install', () => {
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

      // Cache offline page/resources for this client
      const service = getServiceFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service);
    } else {
      pwaClients.delete(clientId);
    }

    // Process any pending navigations for this client
    if (pendingNavigations.has(clientId)) {
      const pendingList = pendingNavigations.get(clientId);
      pendingNavigations.delete(clientId);

      pendingList.forEach(respondFn => {
        respondFn(); // respondFn internally uses clientId to check PWA status now
      });
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
  } else if (event.request.mode === 'navigate') {
    const { clientId } = event;

    const respondWithNavigation = async () => {
      const isPWA = clientId && pwaClients.get(clientId);

      try {
        // Use preload if available
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;

        const networkResp = await fetch(event.request);

        // Cache offline page if in PWA mode
        if (networkResp && networkResp.ok && isPWA) {
          const service = getServiceFromUrl(event.request.url);
          cacheOfflinePageAndResources(service).catch(err =>
            console.error('[SW] Cache offline fail:', err),
          );
        }

        return networkResp;
      } catch (err) {
        console.log('[SW] Navigation failed:', event.request.url, err);

        if (isPWA) {
          const service = getServiceFromUrl(event.request.url);
          const cache = await caches.open(cacheName);
          const offlineUrl = new URL(
            getOfflinePageUrl(service),
            self.location.origin,
          ).href;

          const cachedOffline = await cache.match(offlineUrl);
          if (cachedOffline) {
            return cachedOffline;
          }
        }

        // Fallback to browser default
        throw err;
      }
    };

    // If PWA status is unknown yet, queue this navigation
    if (!clientId || pwaClients.has(clientId)) {
      event.respondWith(respondWithNavigation());
    } else {
      if (!pendingNavigations.has(clientId)) {
        pendingNavigations.set(clientId, []);
      }
      pendingNavigations
        .get(clientId)
        .push(() => event.respondWith(respondWithNavigation()));
    }
  }

  return;
};

onfetch = fetchEventHandler;
