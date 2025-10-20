/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';

const service = self.location.pathname.split('/')[1];
const hasOfflinePageFunctionality = true;
const OFFLINE_PAGE = `/${service}.lite`;
const isLocalEnv = self.location.hostname === 'localhost';
let appEnv;
if (isLocalEnv) {
  appEnv = 'local';
} else if (self.location.hostname.includes('test')) {
  appEnv = 'test';
} else {
  appEnv = 'live';
}

function logToClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    });
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      if (hasOfflinePageFunctionality) {
        await cache.add(OFFLINE_PAGE);
        await cacheMostReadStories(cache);
      }
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
  } else if (isRequestForMostRead) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        let response = await cache.match(event.request);
        if (!response) {
          response = await fetch(event.request);
          cache.put(event.request, response.clone());
        }
        return response;
      })(),
    );
  } else if (hasOfflinePageFunctionality && event.request.mode === 'navigate') {
    event.respondWith(async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(OFFLINE_PAGE);
        return cachedResponse;
      }
    });
  }
  return;
};

onfetch = fetchEventHandler;

self.addEventListener('message', async event => {
  logToClients(`[SW] Received message: ${event.data?.type}`);
  if (event.data && event.data.type === 'CACHE_HOME_PAGE_AND_MOST_READ') {
    if (!navigator.serviceWorker.controller) {
      logToClients(
        '[SW] Service worker is not active. Skipping caching logic.',
      );
      return;
    }
    const { homePageUrl, mostReadUrls } = event.data;

    try {
      const cache = await caches.open('simorghCache_v1');
      // Most read URLs by default are canonical--> Append ".lite" to each URL and cache all
      if (homePageUrl && mostReadUrls && Array.isArray(mostReadUrls)) {
        const liteUrls = mostReadUrls.map(url => `${url}.lite`);
        await Promise.all(
          liteUrls.map(async url => {
            try {
              await cache.add(url);
              // eslint-disable-next-line no-console
              console.log(`[SW] Cached most read URL: ${url}`);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('[SW] Failed to cache most read URL: %s', url, err);
            }
          }),
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[SW] Failed to cache URLs:', err);
    }
  }
});
