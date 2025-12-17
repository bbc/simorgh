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

console.log(`[SW v${version}] Service Worker loaded.`);

// --------------------
// Helper Functions
// --------------------
const getServiceFromUrl = url => {
  try {
    return new URL(url).pathname.split('/')[1];
  } catch {
    return null;
  }
};

const getOfflinePagePath = service => `/${service}/offline`;

const getOfflinePageUrl = service =>
  new URL(getOfflinePagePath(service), self.location.origin).href;

const cacheResource = async (cache, url) => {
  try {
    const response = await fetch(url);
    if (response.ok) await cache.put(url, response.clone());
    return response;
  } catch {
    return null;
  }
};

const cacheOfflinePageAndResources = async service => {
  if (!service) return;

  const cache = await caches.open(cacheName);
  const offlineUrl = getOfflinePageUrl(service);

  if (await cache.match(offlineUrl)) return;

  const resp = await cacheResource(cache, offlineUrl);
  if (!resp?.ok) return;

  const html = await resp.text();

  const resources = [
    ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
    ...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g),
  ]
    .map(m => m[1])
    .filter(url => url.startsWith('/') || url.startsWith(self.location.origin))
    .map(url => new URL(url, self.location.origin).href);

  await Promise.allSettled(resources.map(url => cacheResource(cache, url)));

  console.log(`[SW v${version}] Cached offline page for ${service}`);
};

// --------------------
// Cacheable file patterns
// --------------------
const CACHEABLE_FILES = [
  // Reverb
  /^https:\/\/static(?:\.test)?\.files\.bbci\.co\.uk\/ws\/(?:simorgh-assets|simorgh1-preview-assets|simorgh2-preview-assets)\/public\/static\/js\/reverb\/reverb-3.10.2.js$/,
  // Smart Tag
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/smarttag-5.29.4.min.js',
  // Fonts
  /\.woff2$/,
  // Frosted Promo
  /^https:\/\/static(\.test)?\.files\.bbci\.co\.uk\/ws\/simorgh-assets\/public\/static\/js\/modern\.frosted_promo+.*?\.js$/,
  // Moment
  /\/moment-lib+.*?\.js$/,
  // PWA Icons
  /\/images\/icons\/icon-.*?\.png\??v?=?\d*$/,
];

const WEBP_IMAGE =
  /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+\.webp$/;

// --------------------
// Install / Activate
// --------------------
self.addEventListener('install', () => {
  console.log(`[SW v${version}] Installing...`);
  self.skipWaiting();
});

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

// --------------------
// Message Handler
// --------------------
self.addEventListener('message', event => {
  if (event.data?.type !== 'PWA_STATUS') return;

  const clientId = event.source?.id;
  if (!clientId) return;

  if (event.data.isPWA) {
    pwaClients.set(clientId, true);

    const service = getServiceFromUrl(event.source.url);
    event.waitUntil(cacheOfflinePageAndResources(service));
  } else {
    pwaClients.delete(clientId);
  }
});

// --------------------
// Fetch Handler
// --------------------
self.addEventListener('fetch', event => {
  const { request } = event;

  // -------- WebP handling --------
  if (WEBP_IMAGE.test(request.url)) {
    const acceptsWebp = request.headers.get('accept')?.includes('webp');

    if (!acceptsWebp) {
      const fallbackUrl = request.url.replace('.webp', '');
      event.respondWith(fetch(fallbackUrl, { mode: 'no-cors' }));
      return;
    }
  }

  // -------- Cacheable static files --------
  const isCacheable = CACHEABLE_FILES.some(pattern =>
    new RegExp(pattern).test(request.url),
  );

  if (isCacheable) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(request);
        if (cached) return cached;

        const response = await fetch(request);
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })(),
    );
    return;
  }

  // -------- Navigation (PWA vs Website) --------
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        let isPWA = false;

        if (event.clientId) {
          const client = await self.clients.get(event.clientId);
          isPWA =
            pwaClients.has(event.clientId) ||
            client?.displayMode === 'standalone';
        }

        // Website → browser handles offline
        if (!isPWA) {
          return fetch(request);
        }

        // PWA navigation
        try {
          const preload = await event.preloadResponse;
          if (preload) return preload;

          return await fetch(request);
        } catch {
          const cache = await caches.open(cacheName);
          const service = getServiceFromUrl(request.url);
          const offlineUrl = getOfflinePageUrl(service);

          return (
            (await cache.match(offlineUrl)) ||
            new Response('You are offline. Please reconnect.', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' },
            })
          );
        }
      })(),
    );
  }
});
