import getInitialData from '.';
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import nonMapJson from '#data/pidgin/cpsAssets/tori-49221071.json';
import * as processUnavailableMedia from './processUnavailableMedia';

describe('getInitialData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    jest.spyOn(global, 'fetch').mockResponse(JSON.stringify(mapJson));
    const mockProcess = jest.spyOn(processUnavailableMedia, 'default');
    const { pageData } = await getInitialData('mock-map-path');

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
    expect(mockProcess).toBeCalledTimes(1);
  });

  it('should not run processUnavailableMedia for a non-MAP page', async () => {
    jest.spyOn(global, 'fetch').mockResponse(JSON.stringify(nonMapJson));
    const mockProcess = jest.spyOn(processUnavailableMedia, 'default');
    await getInitialData('mock-map-path');
    expect(mockProcess).toBeCalledTimes(0);
  });
});
