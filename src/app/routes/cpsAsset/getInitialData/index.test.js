// component to test

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';

import getInitialData from '.';

describe('getInitialData', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should return essential data for a page to render', async () => {
    process.env.SIMORGH_APP_ENV = 'local';
    fetch.mockResponse(JSON.stringify({ ...mapJson }));

    const { pageData } = await getInitialData({
      path: 'mock-map-path',
      service: 'pidgin',
      pageType: 'cpsAsset',
    });

    expect(pageData.metadata.id).toEqual(
      'urn:bbc:ares::asset:pidgin/media-23256549',
    );
    expect(pageData.promo.headlines.headline).toEqual(
      'News International Video Worldwide Expired',
    );
    expect(pageData.promo.summary).toEqual(
      'News International Video Worldwide Expired',
    );
    expect(pageData.metadata.locators.assetUri).toEqual(
      '/pidgin/media-23256549',
    );
    expect(pageData.content.blocks.length).toBeTruthy();
  });
});
