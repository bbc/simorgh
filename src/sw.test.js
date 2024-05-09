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
    const TEST_IMAGE_URL = 'https://ichef.test.bbci.co.uk';
    const BASE_IMAGE_URL = 'https://ichef.bbci.co.uk';

    describe('image extension (.webp) is stripped and the fallback image is requested when webp not supported', () => {
      it.each`
        image                                                                                              | expectedUrl
        ${`${TEST_IMAGE_URL}/news/puppies.jpg.webp`}                                                       | ${`${TEST_IMAGE_URL}/news/puppies.jpg`}
        ${`${TEST_IMAGE_URL}/news/puppies.png.webp`}                                                       | ${`${TEST_IMAGE_URL}/news/puppies.png`}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.jpg.webp`}                                               | ${`${TEST_IMAGE_URL}/ace/standard/puppies.jpg`}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.png.webp`}                                               | ${`${TEST_IMAGE_URL}/ace/standard/puppies.png`}
        ${`${TEST_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.jpg.webp`}         | ${`${TEST_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.jpg`}
        ${`${TEST_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.png.webp`}         | ${`${TEST_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.png`}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.jpg.webp`}                                                     | ${`${TEST_IMAGE_URL}/ace/ws/puppies.jpg`}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.png.webp`}                                                     | ${`${TEST_IMAGE_URL}/ace/ws/puppies.png`}
        ${`${TEST_IMAGE_URL}/ace/ws/160/cpsdevpb/c6b6/test/0363c8d0-08a2-11ef-a801-47fbecfec49f.png.webp`} | ${`${TEST_IMAGE_URL}/ace/ws/160/cpsdevpb/c6b6/test/0363c8d0-08a2-11ef-a801-47fbecfec49f.png`}
        ${`${TEST_IMAGE_URL}/images/ic/256x256/p08b22y1.png.webp`}                                         | ${`${TEST_IMAGE_URL}/images/ic/256x256/p08b22y1.png`}
        ${`${TEST_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.jpg.webp`}                 | ${`${TEST_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.jpg`}
        ${`${TEST_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.png.webp`}                 | ${`${TEST_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.png`}
        ${`${BASE_IMAGE_URL}/news/puppies.jpg.webp`}                                                       | ${`${BASE_IMAGE_URL}/news/puppies.jpg`}
        ${`${BASE_IMAGE_URL}/news/puppies.png.webp`}                                                       | ${`${BASE_IMAGE_URL}/news/puppies.png`}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg.webp`}                                               | ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg`}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.png.webp`}                                               | ${`${BASE_IMAGE_URL}/ace/standard/puppies.png`}
        ${`${BASE_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.jpg.webp`}         | ${`${BASE_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.jpg`}
        ${`${BASE_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.png.webp`}         | ${`${BASE_IMAGE_URL}/ace/standard/assets/images/2015/01/08/150108141819_puppies.png`}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.jpg.webp`}                                                     | ${`${BASE_IMAGE_URL}/ace/ws/puppies.jpg`}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.png.webp`}                                                     | ${`${BASE_IMAGE_URL}/ace/ws/puppies.png`}
        ${`${BASE_IMAGE_URL}/ace/ws/160/cpsdevpb/c6b6/test/0363c8d0-08a2-11ef-a801-47fbecfec49f.png.webp`} | ${`${BASE_IMAGE_URL}/ace/ws/160/cpsdevpb/c6b6/test/0363c8d0-08a2-11ef-a801-47fbecfec49f.png`}
        ${`${BASE_IMAGE_URL}/images/ic/256x256/p08b22y1.png.webp`}                                         | ${`${BASE_IMAGE_URL}/images/ic/256x256/p08b22y1.png`}
        ${`${BASE_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.jpg.webp`}                 | ${`${BASE_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.jpg`}
        ${`${BASE_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.png.webp`}                 | ${`${BASE_IMAGE_URL}/news/assets/images/2015/01/08/150108141819_puppies.png`}
      `(
        `for $image the expected fallback is $expectedUrl`,
        async ({ image, expectedUrl }) => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(image),
          };

          event.respondWith = jest.fn();

          await fetchEventHandler(event);

          expect(event.respondWith).toHaveBeenCalled();
          expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
            mode: 'no-cors',
          });
        },
      );
    });

    describe('image is not requested in sw', () => {
      it.each`
        image                                                 | headers               | reason
        ${`${TEST_IMAGE_URL}/sport/puppies.jpg.webp`}         | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${TEST_IMAGE_URL}/ace/stndard/puppies.jpg.webp`}   | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${TEST_IMAGE_URL}/ace/sw/puppies.jpg.webp`}        | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${TEST_IMAGE_URL}/news/puppies.jpeg.webp`}         | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.jpeg.webp`} | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.jpeg.webp`}       | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${TEST_IMAGE_URL}/news/puppies.jpg`}               | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/news/puppies.png`}               | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.jpg`}       | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.png`}       | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.jpg`}             | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.png`}             | ${{}}                 | ${'image url must end with webp'}
        ${`${TEST_IMAGE_URL}/news/puppies.jpg.webp`}          | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${TEST_IMAGE_URL}/news/puppies.png.webp`}          | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.jpg.webp`}  | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${TEST_IMAGE_URL}/ace/standard/puppies.png.webp`}  | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.jpg.webp`}        | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${TEST_IMAGE_URL}/ace/ws/puppies.png.webp`}        | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/sport/puppies.jpg.webp`}         | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${BASE_IMAGE_URL}/ace/stndard/puppies.jpg.webp`}   | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${BASE_IMAGE_URL}/ace/sw/puppies.jpg.webp`}        | ${{ accept: 'webp' }} | ${'image url must include news, ace/standard or ace/ws'}
        ${`${BASE_IMAGE_URL}/news/puppies.jpeg.webp`}         | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpeg.webp`} | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.jpeg.webp`}       | ${{ accept: 'webp' }} | ${'image extension must be jpg or png'}
        ${`${BASE_IMAGE_URL}/news/puppies.jpg`}               | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/news/puppies.png`}               | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg`}       | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.png`}       | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.jpg`}             | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.png`}             | ${{}}                 | ${'image url must end with webp'}
        ${`${BASE_IMAGE_URL}/news/puppies.jpg.webp`}          | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/news/puppies.png.webp`}          | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg.webp`}  | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/ace/standard/puppies.png.webp`}  | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.jpg.webp`}        | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
        ${`${BASE_IMAGE_URL}/ace/ws/puppies.png.webp`}        | ${{ accept: 'webp' }} | ${'webp supported in request headers'}
      `(`for $image because $reason`, async ({ image, headers }) => {
        ({ fetchEventHandler } = await import('./service-worker-test'));

        const event = {
          request: new Request(image, { headers }),
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
