import getInitialData from './getInitialData';
import mapJson from '../../../../data/pidgin/cpsAssets/media-23256549.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  status: 200,
  json: mapJson,
}));

it('should fetch page data, process the data and return it', async () => {
  const { json } = getInitialData('mock-map-path');
  const isProcessedPageData = json !== mapJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { json } = getInitialData('mock-map-path');

  expect(json.metadata.id).toEqual('urn:bbc:ares::asset:pidgin/media-23256549');
  expect(json.promo.headlines.headline).toEqual(
    'News International Video Worldwide Expired',
  );
  expect(json.promo.summary).toEqual(
    'News International Video Worldwide Expired',
  );
  expect(json.metadata.locators.assetUri).toEqual('/pidgin/media-23256549');
  expect(json.content.model.blocks.length).toBeTruthy();
});
