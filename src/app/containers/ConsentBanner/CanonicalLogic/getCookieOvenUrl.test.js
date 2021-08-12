import getCookieOvenUrl from './getCookieOvenUrl';
import { localBaseUrl } from '#testHelpers/config';

describe('getCookieOvenUrl', () => {
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
      expect(getCookieOvenUrl(location, { switchDomain: true })).toEqual(
        expectedOutput,
      );
    });
  });
});
