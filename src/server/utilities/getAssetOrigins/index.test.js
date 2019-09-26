import getAssetOrigins from '.';

describe('getAssetOrigins', () => {
  it('should return the asset origins as an array', async () => {
    const defaultOrigins = [
      'https://gel.files.bbci.co.uk',
      'https://ws-downloads.files.bbci.co.uk',
      'https://ichef.bbci.co.uk',
    ];

    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'http://some.statichost.net';
    process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';

    expect(getAssetOrigins()).toEqual([
      ...defaultOrigins,
      'http://some.statichost.net',
      'http://some.ati.static.host.net',
    ]);
  });
});
