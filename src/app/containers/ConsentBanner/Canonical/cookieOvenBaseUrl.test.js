import getCookieOvenBaseUrl from './cookieOvenBaseUrl';

describe('getCookieOvenBaseUrl', () => {
  const logicMap = [
    ['https://cookie-oven.api.bbc.com', 'https://cookie-oven.api.bbc.com'],
    ['https://www.bbc.co.uk', 'https://cookie-oven.api.bbc.co.uk'],
    ['https://simorgh.api.bbci.co.uk', 'https://cookie-oven.api.bbc.co.uk'],
    [
      'https://my-routing-layer.cookieless-domain.co.uk/',
      'https://cookie-oven.api.bbc.co.uk',
    ],
    ['https://www.stage.bbc.com', 'https://cookie-oven.test.api.bbc.com'],
    ['https://www.stage.bbc.co.uk', 'https://cookie-oven.test.api.bbc.co.uk'],
    ['https://www.test.bbc.com', 'https://cookie-oven.test.api.bbc.com'],
    ['https://www.test.bbc.co.uk', 'https://cookie-oven.test.api.bbc.co.uk'],
    [
      'https://simorgh.test.api.bbci.co.uk',
      'https://cookie-oven.test.api.bbc.co.uk',
    ],
    [
      'https://my-routing-layer.test.cookieless-domain.co.uk/',
      'https://cookie-oven.test.api.bbc.co.uk',
    ],
    ['http://localhost:7080', 'http://localhost:7080'],
    ['https://foobar.org', 'https://cookie-oven.api.bbc.com'],
    ['http://foobar.org', 'https://cookie-oven.api.bbc.com'],
    ['foobar.org', 'https://cookie-oven.api.bbc.com'],
  ];

  logicMap.forEach(([location, expectedOutput]) => {
    it(`should should return correct basepath for ${location}`, () => {
      expect(getCookieOvenBaseUrl(location)).toEqual(expectedOutput);
    });
  });
});
