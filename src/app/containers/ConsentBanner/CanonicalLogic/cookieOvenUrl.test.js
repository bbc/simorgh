import cookieOvenUrl from './cookieOvenUrl';

describe('cookieOvenUrl', () => {
  const logicMap = [
    ['https://www.bbc.com', 'https://cookie-oven.api.bbc.co.uk'],
    ['https://www.bbc.co.uk', 'https://cookie-oven.api.bbc.com'],
    ['https://simorgh.api.bbci.co.uk', 'https://cookie-oven.api.bbc.com'],
    [
      'https://my-routing-layer.cookieless-domain.co.uk/',
      'https://cookie-oven.api.bbc.com',
    ],
    ['https://www.stage.bbc.com', 'https://cookie-oven.test.api.bbc.co.uk'],
    ['https://www.stage.bbc.co.uk', 'https://cookie-oven.test.api.bbc.com'],
    ['https://www.test.bbc.com', 'https://cookie-oven.test.api.bbc.co.uk'],
    ['https://www.test.bbc.co.uk', 'https://cookie-oven.test.api.bbc.com'],
    [
      'https://simorgh.test.api.bbci.co.uk',
      'https://cookie-oven.test.api.bbc.com',
    ],
    [
      'https://my-routing-layer.test.cookieless-domain.co.uk/',
      'https://cookie-oven.test.api.bbc.com',
    ],
    ['http://localhost.bbc.com:7080', 'http://localhost.bbc.com:7080'],
    ['https://foobar.org', 'https://cookie-oven.api.bbc.com'],
    ['http://foobar.org', 'https://cookie-oven.api.bbc.com'],
    ['foobar.org', 'https://cookie-oven.api.bbc.com'],
  ];

  logicMap.forEach(([location, expectedOutput]) => {
    it(`should return correct basepath for ${location}`, () => {
      expect(cookieOvenUrl(location)).toEqual(expectedOutput);
    });
  });
});
