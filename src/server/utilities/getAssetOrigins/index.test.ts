import getAssetOrigins from '.';

const analyticsOrigins = ['https://ping.chartbeat.net'];

describe('getAssetOrigins', () => {
  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'http://some.statichost.net';
    process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';
  });

  it('should return the asset origins as an array for Test environment', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    expect(getAssetOrigins()).toEqual([
      'https://ichef.bbci.co.uk',
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
      ...analyticsOrigins,
    ]);
  });

  it('should return the asset origins as an array for Live environment', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    expect(getAssetOrigins()).toEqual([
      'https://ichef.bbci.co.uk',
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
      ...analyticsOrigins,
    ]);
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
