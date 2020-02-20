import getInitialData from '.';
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';

fetch.mockResponse(JSON.stringify(mapJson));

it('should return essential data for a page to render', async () => {
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
  expect(pageData.metadata.locators.assetUri).toEqual('/pidgin/media-23256549');
  expect(pageData.content.model.blocks.length).toBeTruthy();
});
