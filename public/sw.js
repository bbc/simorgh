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
  // eslint-disable-next-line no-console
  console.log('[SW] Installing...');
  self.skipWaiting();
  event.waitUntil(async () => {
    const cache = await caches.open(cacheName);
    if (hasOfflinePageFunctionality) await cache.add(OFFLINE_PAGE);
  });
});

self.addEventListener('activate', event => {
  // eslint-disable-next-line no-console
  console.log('[SW] Activating...');
  event.waitUntil(self.clients.claim());
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

// Analytics offline tracking
const ANALYTICS_QUEUE_CACHE = 'analytics-queue-v1';
const MAX_QUEUE_SIZE = 100;

const ANALYTICS_PATTERN =
  /^https:\/\/(.*\.)?ati-host|^https:\/\/(.*\.)?chartbeat\.net/;

const isAnalyticsRequest = url => ANALYTICS_PATTERN.test(url);

const queueRequest = async request => {
  try {
    // eslint-disable-next-line no-console
    console.log('[SW] Queueing request:', request.url.substring(0, 100));
    const cache = await caches.open(ANALYTICS_QUEUE_CACHE);
    const keys = await cache.keys();

    // Enforce queue size limit
    if (keys.length >= MAX_QUEUE_SIZE) {
      // eslint-disable-next-line no-console
      console.log('[SW] Queue full, removing oldest');
      await cache.delete(keys[0]);
    }

    const queuedData = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      timestamp: Date.now(),
    };

    const cacheKey = `${ANALYTICS_QUEUE_CACHE}-${Date.now()}-${Math.random()}`;
    await cache.put(cacheKey, new Response(JSON.stringify(queuedData)));

    // eslint-disable-next-line no-console
    console.log('[SW] Queue saved. Length:', keys.length + 1);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Failed to queue request:', error);
  }
};

let queueProcessTimeout;

const processQueue = async () => {
  try {
    const cache = await caches.open(ANALYTICS_QUEUE_CACHE);
    const requests = await cache.keys();

    if (requests.length === 0) return;

    // eslint-disable-next-line no-console
    console.log('[SW] Processing queue. Length:', requests.length);

    let successCount = 0;

    for (const cacheKey of requests) {
      try {
        const response = await cache.match(cacheKey);
        const queuedData = await response.json();

        const originalRequest = new Request(queuedData.url, {
          method: queuedData.method,
          headers: queuedData.headers,
        });

        const result = await fetch(originalRequest);

        if (result.ok) {
          await cache.delete(cacheKey);
          successCount += 1;
        }
      } catch {
        // Leave in queue to retry later
      }
    }

    // eslint-disable-next-line no-console
    console.log(`[SW] Processed ${successCount}/${requests.length} items successfully`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[SW] Failed to process queue:', error);
  }
};

const debouncedProcessQueue = () => {
  clearTimeout(queueProcessTimeout);
  queueProcessTimeout = setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log('[SW] Debounced queue processing triggered');
    processQueue();
  }, 1000);
};

const handleAnalyticsRequest = async request => {
  try {
    const response = await fetch(request.clone());

    if (response.ok) {
      // Debounce queue processing to avoid rapid-fire requests
      debouncedProcessQueue();
    }

    return response;
  } catch {
    // eslint-disable-next-line no-console
    console.log('[SW] Analytics failed (offline) - queueing');
    await queueRequest(request);

    return new Response(JSON.stringify({ queued: true }), {
      status: 202,
      statusText: 'Accepted (Queued)',
      headers: { 'Content-Type': 'image/gif' },
    });
  }
};

const fetchEventHandler = async event => {
  const requestUrl = event.request.url;

  // Handle analytics requests
  if (isAnalyticsRequest(requestUrl)) {
    // eslint-disable-next-line no-console
    console.log('[SW] Intercepting analytics:', requestUrl.substring(0, 100));
    event.respondWith(handleAnalyticsRequest(event.request));
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

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data === 'PROCESS_ANALYTICS_QUEUE') {
    // eslint-disable-next-line no-console
    console.log('[SW] Received message to process queue');
    // Use direct processQueue() for manual triggers (no debounce)
    processQueue();
  }
});