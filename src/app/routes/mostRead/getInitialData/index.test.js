import mostReadJson from '#data/pidgin/mostRead';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

fetch.mockResponse(JSON.stringify(mostReadJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: 'mock-frontpage-path',
    service: 'pidgin',
    pageType: MOST_READ_PAGE,
  });

  expect(pageData.lastRecordTimeStamp).toEqual('2030-01-01T17:00:00Z');
  expect(pageData.metadata.type).toEqual('mostRead');
  expect(pageData.records[0].promo.timestamp).toEqual(1558434642016);
  expect(pageData.records[0].promo.headlines.shortHeadline).toEqual(
    'Public Holidays wey go happun for 2019',
  );
  expect(pageData.records[0].promo.locators.assetUri).toEqual(
    '/pidgin/tori-46729879',
  );
});
