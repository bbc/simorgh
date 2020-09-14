import getInitialData from '.';
import mostWatchedJson from '#data/pidgin/mostWatched';

fetch.mockResponse(JSON.stringify(mostWatchedJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: '/pidgin/media/video',
    service: 'pidgin',
    pageType: 'mostWatched',
  });

  expect(pageData.lastRecordTimeStamp).toEqual('2030-01-01T17:00:00Z');
  expect(pageData.metadata.type).toEqual('mostWatched');
  expect(pageData.records[0].promo.timestamp).toEqual(1596019170000);
  expect(pageData.records[0].promo.headlines.shortHeadline).toEqual(
    "'I no know say I different for society until pipo begin look me one kain'",
  );
  expect(pageData.records[0].promo.locators.assetUri).toEqual(
    '/pidgin/media-53580248',
  );
});
