import getInitialData from './getInitialData';
import rawMapData from '../../../../data/pidgin/cpsAssets/media-23256549.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  pageData: rawMapData,
}));

it('should fetch page data, process the data and return it', async () => {
  const { pageData } = await getInitialData('mock-map-path');
  const isProcessedPageData = pageData !== rawMapData;

  expect(isProcessedPageData).toBeTruthy();
});

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
