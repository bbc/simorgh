/* eslint-disable no-useless-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v0.3.1';
const cacheName = 'simorghCache_v1';

const hasOfflinePageFunctionality = true;

const getServiceFromUrl = url => new URL(url).pathname.split('/')[1];
const getOfflinePagePath = serviceName => `/${serviceName}/offline`;
const getOfflinePageUrl = serviceName =>
  new URL(getOfflinePagePath(serviceName), self.location.origin).href;

const cacheOfflinePageAndResources = async serviceName => {
  if (!serviceName) return;

  const cache = await caches.open(cacheName);
  const offlinePageUrl = getOfflinePageUrl(serviceName);

  const response = await fetch(offlinePageUrl);
  if (!response?.ok) return;

  await cache.put(offlinePageUrl, response.clone());

  const html = await response.text();
  const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
  const linkMatches = html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*>/gi);

  const scriptUrls = Array.from(scriptMatches)
    .map(match => match[1])
    .filter(src => src && !src.startsWith('http'))
    .map(src => new URL(src, self.location.origin).href);

  const linkUrls = Array.from(linkMatches)
    .map(match => match[1])
    .filter(
      href =>
        href &&
        !href.startsWith('http') &&
        (href.endsWith('.css') || href.includes('stylesheet')),
    )
    .map(href => new URL(href, self.location.origin).href);

  const resourcesToCache = [...scriptUrls, ...linkUrls];

  await Promise.all(
    resourcesToCache.map(async url => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          await cache.put(url, res);
        }
      } catch (error) {
        // Ignore failed resource
      }
    }),
  );
};

// Track which clients are in PWA mode
const pwaClients = new Set();

// Listen for messages from clients about their display mode
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PWA_STATUS') {
    const clientId = event.source?.id;
    if (!clientId) return;

    if (event.data.isPWA) {
      pwaClients.add(clientId);

      const serviceName = getServiceFromUrl(event.source?.url);
      cacheOfflinePageAndResources(serviceName).catch(() => null);
    } else {
      pwaClients.delete(clientId);
    }
  }
});

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      if (hasOfflinePageFunctionality) {
        try {
          // Offline page caching is done on-demand when the client reports PWA_STATUS.
        } catch (error) {
          // Silently fail - offline page will be fetched on-demand if needed
        }
      }
    })(),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== cacheName)
          .map(name => caches.delete(name)),
      );
      await self.clients.claim();
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
  // Next.js static assets (JS chunks, CSS, fonts)
  /\/_next\/static\/.+\.js$/,
  /\/_next\/static\/.+\.css$/,
  // Local static assets
  /\/static\/.+\.(js|css|woff2|png|jpg|svg)$/,
  // Public fonts
  /\/fonts\/.+\.woff2$/,
];

const WEBP_IMAGE =
  /^https:\/\/ichef(\.test)?\.bbci\.co\.uk\/(news|images|ace\/(standard|ws))\/.+.webp$/;

const fetchEventHandler = async event => {
  // Skip HMR/webpack requests to avoid breaking Next.js Fast Refresh
  const isHMRRequest =
    event.request.url.includes('.hot-update.') ||
    event.request.url.includes('/_next/static/webpack/') ||
    event.request.url.includes('/.well-known/');

  if (isHMRRequest) return;
  const isRequestForCacheableFile = CACHEABLE_FILES.some(cacheableFile => {
    if (cacheableFile instanceof RegExp) {
      return cacheableFile.test(event.request.url);
    }

    return event.request.url === cacheableFile;
  });

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
          try {
            response = await fetch(event.request.url);
            cache.put(event.request, response.clone());
          } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('error', error);
            // File not in cache and network unavailable
            return new Response('', { status: 408, statusText: 'Offline' });
          }
        }
        return response;
      })(),
    );
  } else if (hasOfflinePageFunctionality && event.request.mode === 'navigate') {
    const clientId = event.clientId || event.resultingClientId;
    const isInPWAMode = clientId && pwaClients.has(clientId);

    // Only intercept navigation for PWA clients to avoid loop in browser mode when offline
    if (isInPWAMode) {
      event.respondWith(
        (async () => {
          try {
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) return preloadResponse;
            return await fetch(event.request);
          } catch (error) {
            const cache = await caches.open(cacheName);
            const serviceName = getServiceFromUrl(event.request.url);
            const offlinePageUrl = getOfflinePageUrl(serviceName);
            const cachedResponse = await cache.match(offlinePageUrl);

            return (
              cachedResponse ||
              new Response('You are offline', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
              })
            );
          }
        })(),
      );
    }
  }
  // For all other requests, let the browser handle it normally
  return;
};

self.addEventListener('fetch', fetchEventHandler);
