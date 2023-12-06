import cacheAssets from '.';

const cacheName = 'test-service-worker-cache';

const serviceWorkerCache = {
  match: async ({ url }) => Promise.resolve(new Response(`${url}-cached`)),
  put: () => {},
};

let fetchedCache = {};

const emptyServiceWorkerCache = {
  match: () => null,
  put: (request, response) => {
    fetchedCache[request] = response;
  },
};

describe('Service Worker asset caching', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    // set up global cache
    global.caches = {
      open: () => Promise.resolve(serviceWorkerCache),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  describe('when url is not cacheable', () => {
    it.each`
      assetUrl                     | reason
      ${'cwr.js'}                  | ${'url is missing leading /'}
      ${'woff2'}                   | ${'url is missing leading .'}
      ${'modern.frosted_promo.js'} | ${'url is missing unique hashcode e.g. modern.frosted_promo.32caa641.js'}
      ${'not-cached'}              | ${'url is not in the allow list of cacheable urls'}
    `(
      `should not fetch or return a cached response for $assetUrl because $reason`,
      async ({ assetUrl }) => {
        const event = {
          request: new Request(assetUrl),
          respondWith: jest.fn(),
        };

        await cacheAssets(event, cacheName);

        expect(global.fetch).not.toHaveBeenCalled();
        expect(event.respondWith).not.toHaveBeenCalled();
      },
    );
  });

  describe('when cache contains asset', () => {
    it.each`
      assetUrl
      ${'/cwr.js'}
      ${'reith.woff2'}
      ${'modern.frosted_promo.32caa641.js'}
      ${'/moment-lib.dfdb34b8.js'}
    `(`should return a cached response for $assetUrl`, async ({ assetUrl }) => {
      const event = {
        request: new Request(assetUrl),
        respondWith: jest.fn(),
      };

      await cacheAssets(event, cacheName);

      expect(event.respondWith).toHaveBeenCalled();

      const [response] = event.respondWith.mock.calls[0];
      const responseBody = response.body.toString();

      expect(responseBody).toBe(`${assetUrl}-cached`);
    });
  });

  describe('when cache does not contain asset', () => {
    beforeEach(() => {
      // set up global cache
      global.caches = {
        open: () => Promise.resolve(emptyServiceWorkerCache),
      };

      global.fetch = jest.fn();
      fetchedCache = {};
    });

    it.each`
      assetUrl
      ${'/cwr.js'}
      ${'reith.woff2'}
      ${'modern.frosted_promo.32caa641.js'}
      ${'/moment-lib.dfdb34b8.js'}
    `(`should fetch $assetUrl and cache it`, async ({ assetUrl }) => {
      const event = {
        request: new Request(assetUrl),
        respondWith: jest.fn(),
      };

      const response = new Response(assetUrl);
      global.fetch.mockImplementationOnce(() => response);

      await cacheAssets(event, cacheName);

      expect(global.fetch).toHaveBeenCalledWith(assetUrl);
      expect(fetchedCache[event.request]).toStrictEqual(response.clone());
    });
  });
});
