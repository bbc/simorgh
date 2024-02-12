/* eslint-disable import/no-unresolved */
/* eslint-disable import/first */
import fs from 'fs';
import { join, resolve } from 'path';

const serviceWorker = fs.readFileSync(join(__dirname, '..', 'public/sw.js'));

const serviceWorkerCode = `${serviceWorker.toString()}
export { fetchEventHandler };
`;

fs.writeFileSync(
  resolve(__dirname, 'service-worker-test.js'),
  serviceWorkerCode,
);

describe('Service Worker', () => {
  const originalFetch = global.fetch;
  const fetchSpy = jest.spyOn(global, 'fetch');
  let fetchEventHandler;

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  describe('webp', () => {
    const BASE_IMAGE_URL = 'https://ichef.bbci.co.uk';

    describe('image requested', () => {
      it.each`
        image                                           | expectedUrl
        ${`${BASE_IMAGE_URL}/news/puppies.jpg`}         | ${`${BASE_IMAGE_URL}/news/puppies.jpg.webp`}
        ${`${BASE_IMAGE_URL}/news/puppies.png`}         | ${`${BASE_IMAGE_URL}/news/puppies.png.webp`}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg`} | ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg.webp`}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.png`} | ${`${BASE_IMAGE_URL}/ace/standard/puppies.png.webp`}
      `(`for $image is $expectedUrl`, async ({ image, expectedUrl }) => {
        ({ fetchEventHandler } = await import('./service-worker-test'));

        const event = {
          request: new Request(image, { headers: { accept: 'webp' } }),
        };

        event.respondWith = jest.fn();

        await fetchEventHandler(event);

        expect(event.respondWith).toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, { mode: 'no-cors' });
      });
    });

    describe('image is not requested', () => {
      it.each`
        image                                                 | headers               | reason
        ${`${BASE_IMAGE_URL}/sport/puppies.jpg`}              | ${{ accept: 'webp' }} | ${'image url must include news or ace/standard'}
        ${`${BASE_IMAGE_URL}/ace/stndard/puppies.jpg`}        | ${{ accept: 'webp' }} | ${'image url must include news or ace/standard'}
        ${`${BASE_IMAGE_URL}/news/puppies.jpeg`}              | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${BASE_IMAGE_URL}/news/amz/puppies.jpeg`}          | ${{ accept: 'webp' }} | ${'image url must not include amz'}
        ${`${BASE_IMAGE_URL}/news/worldservice/puppies.jpeg`} | ${{ accept: 'webp' }} | ${'image url must not include worldservice'}
        ${`${BASE_IMAGE_URL}/news/puppies.jpg`}               | ${{}}                 | ${`webp not supported in request headers`}
      `(`for $image because $reason`, async ({ image, headers }) => {
        ({ fetchEventHandler } = await import('./service-worker-test'));

        const event = {
          request: new Request(image, headers),
        };

        event.respondWith = jest.fn();

        await fetchEventHandler(event);

        expect(event.respondWith).not.toHaveBeenCalled();
        expect(fetchSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('asset caching', () => {
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

    beforeEach(() => {
      // set up global cache
      global.caches = {
        open: () => Promise.resolve(serviceWorkerCache),
      };
    });

    describe('when url is not cacheable', () => {
      it.each`
        assetUrl        | reason
        ${'cwr.js'}     | ${'url is missing leading /'}
        ${'woff2'}      | ${'url is missing leading .'}
        ${'not-cached'} | ${'url is not in the allow list of cacheable urls'}
      `(
        `should not fetch or return a cached response for $assetUrl because $reason`,
        async ({ assetUrl }) => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(assetUrl),
            respondWith: jest.fn(),
          };

          await fetchEventHandler(event);

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
        ${'modern.frosted_promo.js'}
        ${'http://localhost:7080/modern.frosted_promo.js'}
        ${'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.frosted_promo.32caa641.js'}
        ${'/moment-lib.dfdb34b8.js'}
        ${'/moment-lib.js'}
        ${'http://localhost:7080/moment-lib.js'}
        ${'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.../moment-lib.dfdb34b8.js'}
      `(
        `should return a cached response for $assetUrl`,
        async ({ assetUrl }) => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(assetUrl),
            respondWith: jest.fn(),
          };

          await fetchEventHandler(event);

          expect(event.respondWith).toHaveBeenCalled();

          const [response] = event.respondWith.mock.calls[0];
          const responseBody = response.body.toString();

          expect(responseBody).toBe(`${assetUrl}-cached`);
        },
      );
    });

    describe('when cache does not contain asset', () => {
      beforeEach(() => {
        // set up global cache
        global.caches = {
          open: () => Promise.resolve(emptyServiceWorkerCache),
        };

        fetchedCache = {};
      });

      it.each`
        assetUrl
        ${'/cwr.js'}
        ${'reith.woff2'}
        ${'modern.frosted_promo.32caa641.js'}
        ${'/moment-lib.dfdb34b8.js'}
      `(`should fetch $assetUrl and cache it`, async ({ assetUrl }) => {
        ({ fetchEventHandler } = await import('./service-worker-test'));

        const event = {
          request: new Request(assetUrl),
          respondWith: jest.fn(),
        };

        const response = new Response(assetUrl);
        global.fetch.mockImplementationOnce(() => response);

        await fetchEventHandler(event);

        expect(fetchSpy).toHaveBeenCalledWith(assetUrl);
        expect(fetchedCache[event.request]).toStrictEqual(response.clone());
      });
    });
  });
});
