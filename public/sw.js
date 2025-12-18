/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';

// Track PWA clients per clientId
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
  /^https:\/\/static(?:\.test)?\.files\.bbci\.co\.uk\/ws\/(?:simorgh-assets|simorgh1-preview-assets|simorgh2-preview-assets)\/public\/static\/js\/reverb\/reverb-3.10.2.js$/,
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/smarttag-5.29.4.min.js',
  /\.woff2$/,
  /^https:\/\/static(\.test)?\.files\.bbci\.co\.uk\/ws\/simorgh-assets\/public\/static\/js\/modern\.frosted_promo+.*?\.js$/,
  /\/moment-lib+.*?\.js$/,
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
      const service = getServiceFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service);
    } else {
      pwaClients.delete(clientId);
    }
  }
});

// -------Fetch Handler-------------
const fetchEventHandler = async event => {
  const { request } = event;
  console.log(`[SW FETCH] Request: ${request.url}`);

  const isRequestForCacheableFile = CACHEABLE_FILES.some(cacheableFile =>
    new RegExp(cacheableFile).test(request.url),
  );

  const isRequestForWebpImage = WEBP_IMAGE.test(request.url);

  if (isRequestForWebpImage) {
    const req = request.clone();
    const supportsWebp =
      req.headers.has('accept') && req.headers.get('accept').includes('webp');

    if (!supportsWebp) {
      const imageUrlWithoutWebp = req.url.replace('.webp', '');
      event.respondWith(fetch(imageUrlWithoutWebp, { mode: 'no-cors' }));
    }
  } else if (isRequestForCacheableFile) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        let response = await cache.match(request);
        if (!response) {
          response = await fetch(request.url);
          cache.put(request, response.clone());
        }
        return response;
      })(),
    );
  } else if (request.mode === 'navigate') {
    const { clientId } = event;

    event.respondWith(
      (async () => {
        // Wait briefly if PWA status is not known yet
        let isPWA = clientId && pwaClients.get(clientId);
        if (clientId && isPWA === undefined) {
          await new Promise(resolve => {
            setTimeout(resolve, 50);
          });
          isPWA = pwaClients.get(clientId);
        }

        try {
          const preloadResp = await event.preloadResponse;
          if (preloadResp) return preloadResp;

          const networkResp = await fetch(request);

          if (networkResp.ok && isPWA) {
            const service = getServiceFromUrl(request.url);
            cacheOfflinePageAndResources(service).catch(console.error);
          }

          return networkResp;
        } catch (err) {
          console.log('[SW] Navigation failed:', request.url, err);

          if (isPWA) {
            const service = getServiceFromUrl(request.url);
            const cache = await caches.open(cacheName);
            const offlineUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;

            const cachedOffline = await cache.match(offlineUrl);
            if (cachedOffline) return cachedOffline;
          }

          // fallback to browser default behavior
          return Response.error();
        }
      })(),
    );
  }
};

onfetch = fetchEventHandler;
