import getAssetOrigins from '.';

const analyticsOrigins = ['https://ping.chartbeat.net'];

describe('getAssetOrigins', () => {
  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'http://some.statichost.net';
    process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';
    process.env.SIMORGH_REVERB_SOURCE =
      'https://mybbc-analytics.files.bbci.co.uk/reverb-version.js';
  });

  it.each([
    {
      environment: 'test',
      pagePath: [
        '/gahuza.lite',
        '/nepali/topics/cx2qn9pqx4yt.amp',
        '/persian/topics/cx2qn9pqx4yt.lite',
        '/gahuza/articles/c0000000001o.lite',
        '/japanese/articles/c0000000001o.amp',
      ],
    },
    {
      environment: 'live',
      pagePath: [
        '/marathi.lite',
        '/igbo/topics/cx2qn9pqx4yt.amp',
        '/serbian/lat/topics/cx2qn9pqx4yt.lite',
        '/mundo/articles/c0000000001o.lite',
        '/russian/articles/c0000000001o.amp',
      ],
    },
  ])(
    'should return the asset origins as an array for $environment environment for AMP and LITE pages',
    ({ environment, pagePath }) => {
      process.env.SIMORGH_APP_ENV = environment;

      pagePath.forEach(path => {
        expect(getAssetOrigins(path)).toEqual({
          dnsPrefetchOrigins: [
            'http://some.ati.static.host.net',
            ...analyticsOrigins,
          ],
          preconnectOrigins: [
            'https://ichef.bbci.co.uk',
            'http://some.statichost.net',
          ],
        });
      });
    },
  );

  it.each([
    {
      environment: 'test',
      pagePath: [
        '/gahuza',
        '/nepali/topics/cx2qn9pqx4yt',
        '/persian/topics/cx2qn9pqx4yt',
        '/gahuza/articles/c0000000001o',
        '/japanese/articles/c0000000001o',
      ],
    },
    {
      environment: 'live',
      pagePath: [
        '/marathi',
        '/igbo/topics/cx2qn9pqx4yt',
        '/serbian/lat/topics/cx2qn9pqx4yt',
        '/mundo/articles/c0000000001o',
        '/russian/articles/c0000000001o',
      ],
    },
  ])(
    'should return the asset origins as an array for $environment environment for CANONICAL pages',
    ({ environment, pagePath }) => {
      process.env.SIMORGH_APP_ENV = environment;

      pagePath.forEach(path => {
        expect(getAssetOrigins(path)).toEqual({
          dnsPrefetchOrigins: [
            'http://some.ati.static.host.net',
            ...analyticsOrigins,
            'https://mybbc-analytics.files.bbci.co.uk',
          ],
          preconnectOrigins: [
            'https://ichef.bbci.co.uk',
            'http://some.statichost.net',
          ],
        });
      });
    },
  );

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
