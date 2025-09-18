/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
import fs from 'fs';
import { join, resolve } from 'path';
import fetchMock from 'jest-fetch-mock';
import { createHash } from 'crypto';

const serviceWorker = fs.readFileSync(join(__dirname, '..', 'public/sw.js'));

const serviceWorkerCode = `${serviceWorker.toString()}
export { fetchEventHandler, version };
`;

fs.writeFileSync(
  resolve(__dirname, 'service-worker-test.js'),
  serviceWorkerCode,
);

describe('Service Worker', () => {
  let fetchEventHandler;

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
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
          expect(fetchMock).toHaveBeenCalledWith(expectedUrl, {
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
        expect(fetchMock).not.toHaveBeenCalled();
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
        assetUrl                  | reason
        ${'woff2'}                | ${'url is missing leading .'}
        ${'modern.frosted_promo'} | ${'full static files path is missing'}
        ${'not-cached'}           | ${'url is not in the allow list of cacheable urls'}
      `(
        `should not fetch or return a cached response for $assetUrl because $reason`,
        async ({ assetUrl }) => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(assetUrl, {
              mode: 'same-origin',
            }),
            respondWith: jest.fn(),
          };

          await fetchEventHandler(event);

          expect(fetchMock).not.toHaveBeenCalled();
          expect(event.respondWith).not.toHaveBeenCalled();
        },
      );
    });

    const cacheableAssets = [
      // Fonts
      'https://static.files.bbci.co.uk/fonts/reith-qalam/1.310/BBCReithQalam_W_Rg.woff2',
      'https://static.files.bbci.co.uk/fonts/reith-qalam/1.310/BBCReithQalam_W_Bd.woff2',
      'https://static.files.bbci.co.uk/fonts/reith/2.512/BBCReithSans_W_Bd.woff2',
      // Moment-lib - local, test & live
      'http://localhost:7080/static/js/modern.../moment-lib.abcd1234.js',
      'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.../moment-lib.abcd1234.js',
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.../moment-lib.abcd1234.js',
      // Frosted_promo - test & live
      'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.frosted_promo.abcd1234.js',
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/modern.frosted_promo.abcd1234.js',
      // PWA Icons - test & live
      'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/igbo/images/icons/icon-72x72.png?v=1',
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/igbo/images/icons/icon-72x72.png?v=1',
      'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/igbo/images/icons/icon-144x144.png?v=2',
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/igbo/images/icons/icon-144x144.png?v=2',
      // Reverb - preview1, preview2, test & live
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/static/js/reverb/reverb-3.10.2.js',
      'https://static.test.files.bbci.co.uk/ws/simorgh-assets/public/static/js/reverb/reverb-3.10.2.js',
      'https://static.test.files.bbci.co.uk/ws/simorgh1-preview-assets/public/static/js/reverb/reverb-3.10.2.js',
      'https://static.test.files.bbci.co.uk/ws/simorgh2-preview-assets/public/static/js/reverb/reverb-3.10.2.js',
      // Smart Tag
      'https://mybbc-analytics.files.bbci.co.uk/reverb-client-js/smarttag-5.29.4.min.js',
    ];

    describe('when cache contains asset', () => {
      it.each(cacheableAssets)(
        `should return a cached response for %s`,
        async assetUrl => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(assetUrl),
            respondWith: jest.fn(),
          };

          await fetchEventHandler(event);

          expect(event.respondWith).toHaveBeenCalled();

          const [eventResponse] = event.respondWith.mock.calls[0];

          const response = await Promise.resolve(eventResponse);

          const responseBody = response.body?.toString();

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

      it.each(cacheableAssets)(
        `should fetch %s and cache it`,
        async assetUrl => {
          ({ fetchEventHandler } = await import('./service-worker-test'));

          const event = {
            request: new Request(assetUrl, {
              mode: 'same-origin',
            }),
            respondWith: jest.fn(),
          };

          const mockResponse = new Response(assetUrl);
          fetchMock.mockImplementationOnce(() => mockResponse);

          await fetchEventHandler(event);

          expect(event.respondWith).toHaveBeenCalled();

          const [eventResponse] = event.respondWith.mock.calls[0];
          await Promise.resolve(eventResponse);

          expect(fetchMock).toHaveBeenCalledWith(assetUrl);
          expect(fetchedCache[event.request]).toStrictEqual(
            mockResponse.clone(),
          );
        },
      );
    });
  });

  describe('version', () => {
    const CURRENT_VERSION = {
      number: 'v0.3.0',
      fileContentHash: '6150d6daf3d64a226a47e17b39dfc084',
    };

    it(`version number should be ${CURRENT_VERSION.number}`, async () => {
      const { version } = await import('./service-worker-test');

      expect(CURRENT_VERSION.number).toBe(version);
    });

    it(`version number should match file content`, async () => {
      const hash = createHash('md5')
        .update(serviceWorker.toString())
        .digest('hex');

      // On failure: increment the version number in ../public/sw.js & update values in CURRENT_VERSION
      expect(CURRENT_VERSION.fileContentHash).toBe(hash);
    });
  });
});
