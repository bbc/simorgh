// component to test

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';

import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData, { only } from '.';

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
    expect(pageData.content.model.blocks.length).toBeTruthy();
  });

  it('should run transformer when page type matches', async () => {
    const pageData = {
      metadata: {
        type: MEDIA_ASSET_PAGE,
      },
    };
    const mockTransformer = jest.fn();
    only([MEDIA_ASSET_PAGE], mockTransformer)(pageData);
    expect(mockTransformer).toBeCalledTimes(1);
  });

  it('should not run transformer when page type does not match', async () => {
    const pageData = {
      metadata: {
        type: 'PGL',
      },
    };
    const mockTransformer = jest.fn();
    only([MEDIA_ASSET_PAGE], mockTransformer)(pageData);
    expect(mockTransformer).toBeCalledTimes(0);
  });
});
