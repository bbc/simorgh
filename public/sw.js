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

// -------------Install event -------
self.addEventListener('install', event => {
  console.log(`[SW v${version}] Installing...`);

  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      const clients = await self.clients.matchAll({ type: 'window' });

      // Get unique services from PWA clients only
      const pwaServices = [
        ...new Set(
          clients
            .filter(client => pwaClients.get(client.id))
            .map(client => getServiceFromUrl(client.url))
            .filter(Boolean),
        ),
      ];

      if (pwaServices.length > 0) {
        console.log(
          `[SW v${version}] Caching offline pages for PWA:`,
          pwaServices,
        );
      }

      // Cache offline pages for PWA services only
      await Promise.allSettled(
        pwaServices.map(async service => {
          return cacheOfflinePageAndResources(service);
        }),
      );
      self.skipWaiting();
    })(),
  );
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
  if (event.data?.type === 'PWA_STATUS') {
    const clientId = event.source.id;
    const isPWA = event.data.isPWA;
    pwaClients.set(clientId, isPWA);

    if (isPWA) {
      const service = getServiceFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service);
    }
  }
});

// -------Fetch Handler-------------
const fetchEventHandler = async event => {
  const request = event.request;
  const url = request.url;

  console.log(`[SW FETCH] ${url}`);

  // Clone accept header for WebP check
  const isWebpRequest = WEBP_IMAGE.test(url);

  if (isWebpRequest) {
    const fallbackResp = await handleWebPRequest(request);
    if (fallbackResp) return fallbackResp;
  }

  const cache = await openCache();

  // ---------------Cache-first static assets-----------
  if (isCacheableRequest(url)) {
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const networkResp = await fetch(request);
      if (networkResp && networkResp.ok) {
        cache.put(request, networkResp.clone());
      }
      return networkResp;
    } catch (err) {
      console.error('[SW] Cacheable request failed:', url, err);
      return new Response('Offline', { status: 503 });
    }
  }

  // ---------------Navigation requests-----------
  if (request.mode === 'navigate') {
    console.log(`[SW FETCH] Navigation: ${url}`);

    try {
      // Use preload if available
      const preloadResp = await event.preloadResponse;
      if (preloadResp) return preloadResp;

      const networkResp = await fetch(request);

      // Cache offline page if in PWA mode
      if (networkResp && networkResp.ok && event.clientId) {
        const client = await self.clients.get(event.clientId);
        const isPWA = client && pwaClients.get(client.id);

        if (isPWA) {
          const service = getServiceFromUrl(url);
          cacheOfflinePageAndResources(service).catch(err =>
            console.error('[SW] Cache offline fail:', err),
          );
        }
      }

      return networkResp;
    } catch (err) {
      console.error('[SW] Navigation failed:', url, err);

      // Attempt to serve offline page if PWA
      if (event.clientId) {
        const client = await self.clients.get(event.clientId);
        const isPWA = client && pwaClients.get(client.id);

        if (isPWA) {
          const service = getServiceFromUrl(url);
          const offlineUrl = new URL(
            getOfflinePageUrl(service),
            self.location.origin,
          ).href;

          const cachedOffline = await cache.match(offlineUrl);
          if (cachedOffline) return cachedOffline;
        }
      }

      return new Response('You are offline', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }

  // -----------Fall-through: Always network---------------
  try {
    return await fetch(request);
  } catch (err) {
    console.error('[SW] Fetch failed:', url, err);
    return new Response('Offline', { status: 503 });
  }
};

self.addEventListener('fetch', event => {
  event.respondWith(fetchEventHandler(event));
});
