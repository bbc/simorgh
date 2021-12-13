import getAssetOrigins from '.';

jest.mock('../serviceConfigs', () => ({
  news: {
    default: {
      fonts: ['sans-serif'],
    },
  },
  foobar: {
    default: {
      fonts: [],
    },
  },
}));

const testCookieOrigins = [
  'https://www.test.bbc.com/cookieoven',
  'https://www.test.bbc.co.uk/cookieoven',
];

const liveCookieOrigins = [
  'https://www.bbc.com/cookieoven',
  'https://www.bbc.co.uk/cookieoven',
];

const fontOrigins = [
  'https://gel.files.bbci.co.uk',
  'https://ws-downloads.files.bbci.co.uk',
];

describe('getAssetOrigins', () => {
  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'http://some.statichost.net';
    process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';
  });

  it('should return the asset origins as an array for Test environment', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    expect(getAssetOrigins('foobar')).toEqual([
      ...testCookieOrigins,
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
    ]);
  });

  it('should return the asset origins as an array for Live environment', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    expect(getAssetOrigins('foobar')).toEqual([
      ...liveCookieOrigins,
      'https://ichef.bbci.co.uk',
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
    ]);
  });

  it('asset origins should include fonts origins for Test environment', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    expect(getAssetOrigins('news')).toEqual([
      ...testCookieOrigins,
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
      ...fontOrigins,
    ]);
  });

  it('asset origins should include fonts origins for Live environment', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    expect(getAssetOrigins('news')).toEqual([
      ...liveCookieOrigins,
      'https://ichef.bbci.co.uk',
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
      ...fontOrigins,
    ]);
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
