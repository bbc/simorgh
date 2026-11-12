/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const version = 'v0.3.9';
// Update cache name when changing caching logic / changes in offlinepage.tsx
const cacheName = 'simorghCache_v4';
const onwardJourneyCacheName = 'simorghOnwardJourneysCache_v1';
const onwardJourneyCacheMaxAge = 10 * 60 * 1000;
const onwardJourneyCacheTimestampHeader = 'X-Simorgh-Onward-Journey-Cache-Time';
const pwaClients = new Map();
let isPWADeviceOffline = false;

// --------------------
// Helper Functions
// --------------------

// Services with language script/orthography variants, and each service's default
// variant - mirrors src/app/lib/config/services/defaultServiceVariants.ts.
// Kept self-contained here as this file cannot import app code.
const defaultServiceVariants = {
  serbian: 'lat',
  ukchina: 'simp',
  uzbek: 'cyr',
  zhongwen: 'trad',
};
const VARIANTS = ['lat', 'cyr', 'trad', 'simp'];

const getServiceFromUrl = url => new URL(url).pathname.split('/')[1];
const getVariantFromUrl = url => {
  const pathSegments = new URL(url).pathname.split('/');
  return pathSegments.find(segment => VARIANTS.includes(segment)) || null;
};
const getOfflinePageUrl = (service, variant) => {
  const resolvedVariant = variant || defaultServiceVariants[service];
  return resolvedVariant
    ? `/${service}/${resolvedVariant}/offline`
    : `/${service}/offline`;
};

const cacheResource = async (cache, url) => {
  try {
    const response = await fetch(url);
    if (response.ok) await cache.put(url, response.clone());
    return response;
  } catch {
    return new Response('Resource fetch failed', { status: 503 });
  }
};

const cacheOfflinePageAndResources = async (service, variant) => {
  const cache = await caches.open(cacheName);
  const offlinePageUrl = new URL(
    getOfflinePageUrl(service, variant),
    self.location.origin,
  ).href;

  if (await cache.match(offlinePageUrl)) return;

  const resp = await cacheResource(cache, offlinePageUrl);
  if (!resp || !resp.ok) return;

  const html = await resp.text();
  const scriptSrcs = [
    ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
  ].map(m => m[1]);
  const linkHrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(
    m => m[1],
  );

  const resources = [...scriptSrcs, ...linkHrefs].filter(Boolean);
  await Promise.allSettled(resources.map(url => cacheResource(cache, url)));
};

const CACHEABLE_FILES = [
  // Reverb
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/reverb-3.14.0.js',
  // Smart Tag
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/smarttag-5.29.4.min.js',
  // Fonts
  /\.woff2$/,
  // Frosted Promo (test and live environments only)
  /^https:\/\/static(\.test)?\.files\.bbci\.co\.uk\/ws\/simorgh-assets\/public\/_next\/static\/chunks\/frosted_promo\..*?\.js$/,
  // PWA Icons
  /\/images\/icons\/icon-.*?\.png\??v?=?\d*$/,
];

const WEBP_IMAGE =
  /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+.webp$/;

const isOnwardJourneyRequest = request => {
  if (request.method !== 'GET' || !request.url.includes('/fd/simorgh-bff')) {
    return false;
  }

  const url = new URL(request.url);

  return (
    url.pathname === '/fd/simorgh-bff' && url.searchParams.has('onwardJourney')
  );
};

const cacheOnwardJourneyResponse = async ({ cache, request, response }) => {
  const headers = new Headers(response.headers);
  headers.set(onwardJourneyCacheTimestampHeader, Date.now().toString());

  await cache.put(
    request,
    new Response(response.clone().body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    }),
  );
};

const getCachedOnwardJourneyResponse = async ({ cache, request }) => {
  const response = await cache.match(request);
  const cachedAt = Number(
    response?.headers.get(onwardJourneyCacheTimestampHeader),
  );

  if (
    response &&
    cachedAt &&
    Date.now() - cachedAt < onwardJourneyCacheMaxAge
  ) {
    return response;
  }

  if (response) await cache.delete(request);

  return null;
};

const getOnwardJourneyResponse = async request => {
  const cache = await caches.open(onwardJourneyCacheName);
  const cachedResponse = await getCachedOnwardJourneyResponse({
    cache,
    request,
  });

  if (cachedResponse) return cachedResponse;

  const response = await fetch(request);

  if (response.ok) {
    await cacheOnwardJourneyResponse({ cache, request, response });
  }

  return response;
};

// -------------Install event -------
self.addEventListener('install', () => {
  self.skipWaiting();
});

// -------Activate Handler-------------
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(
          key =>
            key !== cacheName &&
            key !== onwardJourneyCacheName &&
            caches.delete(key),
        ),
      );
      await self.clients.claim();
    })(),
  );
});

// -------Message Event-------------
self.addEventListener('message', async event => {
  if (event.data?.type === 'PWA_STATUS') {
    const clientId = event.source.id;
    const { isPWA } = event.data;

    if (isPWA) {
      pwaClients.set(clientId, true);
      const service = getServiceFromUrl(event.source.url);
      const variant = getVariantFromUrl(event.source.url);
      await cacheOfflinePageAndResources(service, variant);
    }
  }
});

// -------Fetch Handler-------------
const fetchEventHandler = async event => {
  const isRequestForCacheableFile = CACHEABLE_FILES.some(cacheableFile =>
    new RegExp(cacheableFile).test(event.request.url),
  );
  const isRequestForWebpImage = WEBP_IMAGE.test(event.request.url);
  const isNavigationMode = event.request.mode === 'navigate';

  if (isOnwardJourneyRequest(event.request)) {
    event.respondWith(getOnwardJourneyResponse(event.request));
  } else if (isRequestForWebpImage) {
    const req = event.request.clone();

    // Inspect the accept header for WebP support
    const supportsWebp =
      req.headers.has('accept') && req.headers.get('accept').includes('webp');

    // if supports webp is false in request header then don't use it
    // if accept header doesn't indicate support for webp remove .webp extension
    if (!supportsWebp) {
      const imageUrlWithoutWebp = req.url.replace('.webp', '');
      event.respondWith(
        (async () => {
          try {
            return await fetch(imageUrlWithoutWebp, { mode: 'no-cors' });
          } catch {
            return new Response('WebP fetch failed', { status: 503 });
          }
        })(),
      );
    }
  } else if (isRequestForCacheableFile) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);

        let response = await cache.match(event.request);

        if (!response) {
          response = await cacheResource(cache, event.request.url);
        }
        return response;
      })(),
    );
  } else if (isNavigationMode) {
    const { url } = event.request;
    event.respondWith(
      (async () => {
        const client = await self.clients.get(event.clientId);
        const isPWA = client && pwaClients.get(client.id);
        const cache = await caches.open(cacheName);

        const getOfflineFallback = async () => {
          if (isPWA) {
            const service = getServiceFromUrl(url);
            const variant = getVariantFromUrl(url);
            const offlineUrl = new URL(
              getOfflinePageUrl(service, variant),
              self.location.origin,
            ).href;

            const cachedOffline = await cache.match(offlineUrl);

            if (cachedOffline) {
              isPWADeviceOffline = true;
              return cachedOffline;
            }
          }

          // Fallback to browser default behavior
          return Response.error();
        };

        try {
          // Use preload if available
          const preloadResp = await event.preloadResponse;
          if (preloadResp) return preloadResp;
          const networkResp = await fetch(event.request);

          if (networkResp.status >= 500) {
            // Must await to return cached offline page or throw error
            return await getOfflineFallback();
          }

          isPWADeviceOffline = false;
          return networkResp;
        } catch {
          return getOfflineFallback();
        }
      })(),
    );
  } else if (isPWADeviceOffline) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          return await fetch(event.request);
        } catch {
          return new Response('PWA offline fetch failed', { status: 503 });
        }
      })(),
    );
  }
};

self.addEventListener('fetch', fetchEventHandler);
