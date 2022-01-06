import mostWatchedJson from '#data/pidgin/mostWatched';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

fetch.mockResponse(JSON.stringify(mostWatchedJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: '/pidgin/media/video',
    service: 'pidgin',
    pageType: MOST_WATCHED_PAGE,
    toggles: {
      mostPopularMediaPage: { enabled: true, value: '5' },
    },
  });

  expect(pageData.metadata.type).toEqual('mostWatched');
  expect(pageData.mostWatched[0].timestamp).toEqual(1596019170000);
  expect(pageData.mostWatched[0].headlines.shortHeadline).toEqual(
    "'I no know say I different for society until pipo begin look me one kain'",
  );
  expect(pageData.mostWatched[0].locators.assetUri).toEqual(
    '/pidgin/media-53580248',
  );
});
