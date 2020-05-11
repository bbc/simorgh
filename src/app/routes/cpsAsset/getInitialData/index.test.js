// test helpers
import fetchMock from 'fetch-mock';

// component to test
import getInitialData, { only } from '.';

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';

describe('getInitialData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    fetchMock.mock(
      'http://localhost/mock-map-path.json',
      JSON.stringify(mapJson),
    );

    const { pageData } = await getInitialData({
      path: 'mock-map-path',
      service: 'pidgin',
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
        type: 'MAP',
      },
    };
    const mockTransformer = jest.fn();
    only('MAP', mockTransformer)(pageData);
    expect(mockTransformer).toBeCalledTimes(1);
  });

  it('should not run transformer when page type does not match', async () => {
    const pageData = {
      metadata: {
        type: 'PGL',
      },
    };
    const mockTransformer = jest.fn();
    only('MAP', mockTransformer)(pageData);
    expect(mockTransformer).toBeCalledTimes(0);
  });
});
