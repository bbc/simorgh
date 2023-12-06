import webPImages from '.';

const fetchSpy = jest.spyOn(global, 'fetch');

const BASE_IMAGE_URL = 'https://ichef.bbci.co.uk';

describe('Service Worker webp', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('image requested', () => {
    it.each`
      image                                           | expectedUrl
      ${`${BASE_IMAGE_URL}/news/puppies.jpg`}         | ${`${BASE_IMAGE_URL}/news/puppies.jpg.webp`}
      ${`${BASE_IMAGE_URL}/news/puppies.png`}         | ${`${BASE_IMAGE_URL}/news/puppies.png.webp`}
      ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg`} | ${`${BASE_IMAGE_URL}/ace/standard/puppies.jpg.webp`}
      ${`${BASE_IMAGE_URL}/ace/standard/puppies.png`} | ${`${BASE_IMAGE_URL}/ace/standard/puppies.png.webp`}
    `(`for $image is $expectedUrl`, ({ image, expectedUrl }) => {
      const event = {
        request: new Request(image, { headers: { accept: 'webp' } }),
      };

      event.respondWith = jest.fn();

      webPImages(event);

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
    `(`for $image because $reason`, ({ image, headers }) => {
      const event = {
        request: new Request(image, headers),
      };

      event.respondWith = jest.fn();

      webPImages(event);

      expect(event.respondWith).not.toHaveBeenCalled();
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });
});
