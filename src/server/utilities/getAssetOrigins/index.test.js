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

const fontOrigins = [
  'https://gel.files.bbci.co.uk',
  'https://ws-downloads.files.bbci.co.uk',
];

const defaultOrigins = [
  'https://cookie-oven.api.bbc.co.uk',
  'https://ichef.bbci.co.uk',
];

describe('getAssetOrigins', () => {
  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'http://some.statichost.net';
    process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';
  });

  it('should return the asset origins as an array', async () => {
    expect(getAssetOrigins('foobar')).toEqual([
      ...defaultOrigins,
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
    ]);
  });

  it('asset origins should include fonts origins', async () => {
    expect(getAssetOrigins('news')).toEqual([
      ...defaultOrigins,
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
      ...fontOrigins,
    ]);
  });
});
