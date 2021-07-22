import cookieOvenUrl from './cookieOvenUrl';
import { localBaseUrl } from '#testHelpers/config';

describe('cookieOvenUrl', () => {
  const logicMap = [
    ['https://www.bbc.com', 'https://www.bbc.co.uk'],
    ['https://www.bbc.co.uk', 'https://www.bbc.com'],
    ['https://simorgh.api.bbci.co.uk', 'https://www.bbc.com'],
    [
      'https://my-routing-layer.cookieless-domain.co.uk/',
      'https://www.bbc.com',
    ],
    ['https://www.stage.bbc.com', 'https://www.test.bbc.co.uk'],
    ['https://www.stage.bbc.co.uk', 'https://www.test.bbc.com'],
    ['https://www.test.bbc.com', 'https://www.test.bbc.co.uk'],
    ['https://www.test.bbc.co.uk', 'https://www.test.bbc.com'],
    ['https://simorgh.test.api.bbci.co.uk', 'https://www.test.bbc.com'],
    [
      'https://my-routing-layer.test.cookieless-domain.co.uk/',
      'https://www.test.bbc.com',
    ],
    [localBaseUrl, localBaseUrl],
    ['https://foobar.org', 'https://www.bbc.com'],
    ['http://foobar.org', 'https://www.bbc.com'],
    ['foobar.org', 'https://www.bbc.com'],
  ];

  logicMap.forEach(([location, expectedOutput]) => {
    it(`should return correct basepath for ${location}`, () => {
      expect(cookieOvenUrl(location, true)).toEqual(expectedOutput);
    });
  });
});
