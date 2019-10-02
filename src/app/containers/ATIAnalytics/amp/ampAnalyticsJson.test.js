import ampAnalyticsJson from './ampAnalyticsJson';

describe('AMP ATI Analytics', () => {
  it('should match this JSON structure', () => {
    expect(
      ampAnalyticsJson({
        baseUrl: 'https://exampleBaseAtiUrl.com?',
        pageviewParams: 'param1=value1&param2=value2',
      }),
    ).toEqual({
      transport: {
        beacon: false,
        xhrpost: false,
        image: true,
      },
      requests: {
        base: 'https://exampleBaseAtiUrl.com?',
        pageview: '${base}param1=value1&param2=value2', // eslint-disable-line no-template-curly-in-string
      },
      triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
    });
  });
});
