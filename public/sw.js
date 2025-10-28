/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const version = 'v0.3.0';
const cacheName = 'simorghCache_v1';

const service = self.location.pathname.split('/')[1];
const hasOfflinePageFunctionality = false;
const OFFLINE_PAGE = `/${service}/offline`;

self.addEventListener('install', event => {
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    if (hasOfflinePageFunctionality) await cache.add(OFFLINE_PAGE);
  });
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

// Analytics offline tracking - NEW CODE
const ANALYTICS_QUEUE_KEY = 'analytics_queue';
const MAX_QUEUE_SIZE = 100;

const ANALYTICS_PATTERN =
  /^https:\/\/(.*\.)?ati-host|^https:\/\/(.*\.)?chartbeat\.net/;

const isAnalyticsRequest = url => ANALYTICS_PATTERN.test(url);

const getQueue = () => {
  try {
    const queue = JSON.parse(localStorage.getItem(ANALYTICS_QUEUE_KEY) || '[]');
    return Array.isArray(queue) ? queue : [];
  } catch {
    return [];
  }
};

const saveToQueue = url => {
  try {
    // eslint-disable-next-line no-console
    console.log('[SW] saveToQueue called for:', url.substring(0, 100));
    const queue = getQueue();
    queue.push({ url, timestamp: Date.now() });
    if (queue.length > MAX_QUEUE_SIZE) queue.shift();
    localStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(queue));
    // eslint-disable-next-line no-console
    console.log('[SW] Queue saved. Length:', queue.length);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Failed to save queue:', error);
  }
};

const replayQueue = async () => {
  const queue = getQueue();
  if (queue.length === 0) return;

  const results = await Promise.allSettled(
    queue.map(item => fetch(item.url, { credentials: 'include' })),
  );

  const failedItems = queue.filter(
    (_, index) => results[index].status === 'rejected',
  );
  try {
    localStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(failedItems));
  } catch {
    // noop
  }
};

const fetchEventHandler = async event => {
  const requestUrl = event.request.url;
    console.log('requestUrl>>>>>>>>', requestUrl)
    console.log('isAnalyticsRequest(requestUrl)<<<<<<<<<<<<<', isAnalyticsRequest(requestUrl))
  // Handle analytics requests - NEW CODE, ADDED BEFORE EXISTING LOGIC
  if (isAnalyticsRequest(requestUrl)) {
    // eslint-disable-next-line no-console
    console.log('[SW] Intercepting analytics:', requestUrl.substring(0, 100));
    event.respondWith(
      fetch(event.request.clone())
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('[SW] Analytics succeeded (online)');
          return response;
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('[SW] Analytics failed (offline) - queueing');
          saveToQueue(requestUrl);
          return new Response(null, { status: 200, statusText: 'Queued' });
        }),
    );
    return;
  }

  // ORIGINAL CODE BELOW - UNCHANGED
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