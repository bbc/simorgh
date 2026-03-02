// TEMP
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

const version = 'v0.3.4';
// Update cache name when changing caching logic / changes in offlinepage.tsx
const cacheName = 'simorghCache_v4';
const pwaClients = new Map();
let isPWADeviceOffline = false;

// --- IndexedDB helpers ---
const DB_NAME = 'simorghOfflineDB';
const STORE_NAME = 'cachedArticles';
const MAX_ARTICLE_AGE_MS = 72 * 60 * 60 * 1000; // 72 hours
const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

const openDB = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });

const dbGet = async (store, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
};

const dbPut = async (store, value) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(value);
    req.onsuccess = () => resolve();
    req.onerror = e => reject(e.target.error);
  });
};

const dbGetAll = async store => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
};

const dbDelete = async (store, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = e => reject(e.target.error);
  });
};

// --------------------
// Helper Functions
// --------------------

const loggerEnabled = true;
const generatedTimestamp = new Date().toISOString();

const logger = (...args) => {
  if (!loggerEnabled) return;
  // eslint-disable-next-line no-console
  console.log(`[SW ${version}]`, ...args);
};

const getServiceFromUrl = url => new URL(url).pathname.split('/')[1];
const getOfflinePageUrl = service => `/${service}/offline`;

const cacheResource = async (cache, url) => {
  logger('cacheResource', { url });
  try {
    // TODO: temp CORS
    const response = await fetch(url);
    if (response.ok) await cache.put(url, response.clone());
    return response;
  } catch {
    return new Response('Resource fetch failed', { status: 503 });
  }
};

const cachePageAndResources = async (cache, url) => {
  if (await cache.match(url)) return;

  const resp = await cacheResource(cache, url);
  if (!resp || !resp.ok) return;

  const html = await resp.text();
  const scriptSrcs = [
    ...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g),
  ].map(m => m[1]);
  const linkHrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(
    m => m[1],
  );

  const resources = [...scriptSrcs, ...linkHrefs].filter(Boolean);
  await Promise.allSettled(resources.map(r => cacheResource(cache, r)));
};

const cacheOfflinePageAndResources = async service => {
  const cache = await caches.open(cacheName);
  const offlinePageUrl = new URL(
    getOfflinePageUrl(service),
    self.location.origin,
  ).href;

  await cachePageAndResources(cache, offlinePageUrl);
};

const getMostReadDataFromOfflinePage = async service => {
  const offlinePageUrl = new URL(
    getOfflinePageUrl(service),
    self.location.origin,
  ).href;

  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(offlinePageUrl);
  if (!cachedResponse) return null;

  const html = await cachedResponse.text();

  const match = html.match(
    /<script[^>]*id="most-read-data"[^>]*>(.+?)<\/script>/s,
  );
  if (!match) return null;

  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
};

const cacheArticles = async service => {
  const lastSync = await dbGet('meta', 'lastArticleSync');
  const now = Date.now();
  logger('📌 cacheArticles called', { lastSync });

  // TODO: Temporarily commenting it out
  // if (lastSync && now - lastSync.value < REFRESH_INTERVAL_MS) return;

  const mostRead = await getMostReadDataFromOfflinePage(service);

  logger(`👀 fetched:`, { mostRead });

  const mostReadArticles = mostRead?.items;
  if (!mostReadArticles?.length) return;

  const cache = await caches.open(cacheName);
  const mostReadUrls = new Set(mostReadArticles.map(a => a.href));

  // Delete stale articles not in most-read and older than 72h
  const cachedArticleMeta = await dbGetAll(STORE_NAME);
  const staleEntries = cachedArticleMeta.filter(entry => {
    const isTooOld = now - entry.cachedAt > MAX_ARTICLE_AGE_MS;
    const isNotMostRead = !mostReadUrls.has(entry.href);
    return isTooOld && isNotMostRead;
  });

  await Promise.allSettled(
    staleEntries.flatMap(entry => [
      cache.delete(entry.href),
      dbDelete(STORE_NAME, entry.href),
    ]),
  );

  // Cache new or updated articles including their scripts and stylesheets
  const existingMeta = await Promise.all(
    mostReadArticles.map(article => dbGet(STORE_NAME, article.href)),
  );

  await Promise.allSettled(
    mostReadArticles.map(async (article, i) => {
      const existing = existingMeta[i];
      const needsUpdate =
        !existing ||
        (article.timestamp && existing.timestamp !== article.timestamp);

      if (!needsUpdate) return;

      // We need absolute path for cache.match
      const articleUrl = new URL(article.href, self.location.origin).href;
      await cachePageAndResources(cache, articleUrl);
      await dbPut(STORE_NAME, {
        url: article.href,
        timestamp: article.timestamp,
        cachedAt: now,
      });
    }),
  );

  await dbPut('meta', { key: 'lastArticleSync', value: now });
};

const CACHEABLE_FILES = [
  // Reverb
  'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/reverb-3.11.0.js',
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
        keys.map(key => key !== cacheName && caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// -------Message Event-------------
self.addEventListener('message', async event => {
  if (event.data?.type === 'PWA_STATUS') {
    const { isPWA, offlineArticle } = event.data;
    const { isEnabled: isOfflineArticleEnabled, service } =
      offlineArticle ?? {};

    logger('📌 Message', { isOfflineArticleEnabled, service });

    if (isPWA) {
      pwaClients.set(event.source.id, true);

      await dbPut('meta', {
        key: `offlineArticleEnabled_${service}`,
        value: !!isOfflineArticleEnabled,
      });

      await cacheOfflinePageAndResources(service);

      if (isOfflineArticleEnabled) {
        await cacheArticles(service);
      }
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
    logger('isNavigationMode', { url });
    event.respondWith(
      (async () => {
        const client = await self.clients.get(event.clientId);
        const isPWA = client && pwaClients.get(client.id);
        const cache = await caches.open(cacheName);

        const getOfflineFallback = async () => {
          if (isPWA) {
            const service = getServiceFromUrl(url);

            const offlineArticleMeta = await dbGet(
              'meta',
              `offlineArticleEnabled_${service}`,
            );
            const isOfflineArticleEnabled = offlineArticleMeta?.value ?? false;

            if (isOfflineArticleEnabled) {
              const cachedArticle = await cache.match(url);

              if (cachedArticle) {
                // Check article is not outdated before serving
                const articleMeta = await dbGet(STORE_NAME, url);
                const isOutdated =
                  !articleMeta ||
                  Date.now() - articleMeta.cachedAt > MAX_ARTICLE_AGE_MS;

                if (!isOutdated) {
                  logger('🎉 cachedArticle', { url });
                  isPWADeviceOffline = true;
                  return cachedArticle;
                }

                logger('⚠️ cachedArticle is outdated, skipping', { url });
              }
            }

            // Offline page fallback is always available regardless of toggle
            const offlineUrl = new URL(
              getOfflinePageUrl(service),
              self.location.origin,
            ).href;
            const cachedOffline = await cache.match(offlineUrl);
            if (cachedOffline) {
              isPWADeviceOffline = true;
              return cachedOffline;
            }
          }
          // If offline page/article not available, return error response
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
