const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';
const hasOfflinePageFunctionality = true;

// Track PWA clients
const pwaClients = new Map();

console.log(`[SW v${version}] Service Worker loaded.`);

// --------------------
// Helper Functions
// --------------------
const getServiceFromUrl = url => new URL(url).pathname.split('/')[1];
const getOfflinePageUrl = service => `/${service}/offline`;

const openCache = async () => caches.open(cacheName);

const cacheResource = async (cache, url) => {
  try {
    const response = await fetch(url);
    if (response.ok) await cache.put(url, response.clone());
    return response;
  } catch (err) {
    console.error(`[SW v${version}] Failed to cache ${url}:`, err);
  }
};

const cacheOfflinePageAndResources = async service => {
  if (!hasOfflinePageFunctionality) return;
  const cache = await openCache();
  const offlinePageUrl = new URL(
    getOfflinePageUrl(service),
    self.location.origin,
  ).href;

  if (await cache.match(offlinePageUrl)) return;

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
    .filter(url => url.startsWith('/') || url.startsWith(self.location.origin))
    .map(url => new URL(url, self.location.origin).href);

  await Promise.allSettled(resources.map(url => cacheResource(cache, url)));
};

// Cache patterns
const CACHEABLE_FILES = [
  /\.js$/,
  /\.css$/,
  /\.woff2$/,
  /reverb-3\.10\.2\.js$/,
  /smarttag-.*\.min\.js$/,
  /modern\.frosted_promo.*\.js$/,
  /moment-lib.*\.js$/,
  /\/images\/icons\/icon-.*\.png\??v?=?\d*$/,
];

const WEBP_IMAGE =
  /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+\.webp$/;

const isCacheableRequest = url =>
  CACHEABLE_FILES.some(pattern => pattern.test(url));

const handleWebPRequest = async request => {
  if (!WEBP_IMAGE.test(request.url)) return null;
  const accepts = request.headers.get('accept') || '';
  if (accepts.includes('webp')) return null;
  const fallbackUrl = request.url.replace('.webp', '');
  try {
    return await fetch(fallbackUrl, { mode: 'no-cors' });
  } catch {
    return null;
  }
};

// --------------------
// Service Worker Events
// --------------------
self.addEventListener('install', event => {
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

self.addEventListener('message', async event => {
  if (event.data?.type === 'PWA_STATUS') {
    const clientId = event.source.id;
    const isPWA = event.data.isPWA;
    pwaClients.set(clientId, isPWA);

    console.log(`[SW v${version}] Client ${clientId} PWA status: ${isPWA}`);

    if (isPWA) {
      const service = getServiceFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service);
    }
  }
});

// --------------------
// Fetch Handler
// --------------------
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cache = await openCache();
      const request = event.request;

      // WebP fallback
      const webpFallback = await handleWebPRequest(request);
      if (webpFallback) return webpFallback;

      // Cache-first static assets
      if (isCacheableRequest(request.url)) {
        const cached = await cache.match(request);
        if (cached) return cached;
        const resp = await fetch(request);
        cache.put(request, resp.clone());
        return resp;
      }

      // Navigation requests
      if (request.mode === 'navigate') {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResp = await fetch(request);

          // Ensure clientId exists
          const client = event.clientId
            ? await self.clients.get(event.clientId)
            : null;

          if (client && pwaClients.get(client.id)) {
            const service = getServiceFromUrl(request.url);
            await cacheOfflinePageAndResources(service);
          }

          return networkResp;
        } catch (err) {
          console.warn(
            `[SW v${version}] Navigation failed, serving offline fallback...`,
          );

          const client = event.clientId
            ? await self.clients.get(event.clientId)
            : null;

          if (client && pwaClients.get(client.id)) {
            const service = getServiceFromUrl(request.url);
            const offlinePageUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;
            const cachedOffline = await cache.match(offlinePageUrl);
            if (cachedOffline) return cachedOffline;
          }

          return new Response('You are offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
      }

      return fetch(request);
    })(),
  );
});
