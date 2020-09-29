import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import mostWatchedJson from '#data/pidgin/mostWatched';

fetch.mockResponse(JSON.stringify(mostWatchedJson));
const spy = jest.spyOn(fetchPageData, 'default');

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: '/pidgin/media/video',
    service: 'pidgin',
    pageType: 'mostWatched',
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

it('should override renderer on test', async () => {
  process.env.SIMORGH_APP_ENV = 'test';
  await getInitialData({
    path: '/pidgin/media/video',
    service: 'pidgin',
    pageType: 'mostWatched',
    toggles: {
      mostPopularMediaPage: { enabled: true, value: '5' },
    },
  });
  expect(spy).toHaveBeenCalledWith({
    path: '/pidgin/mostwatched?renderer_env=live',
    pageType: 'mostWatched',
  });
});

it('should not override renderer on live', async () => {
  process.env.SIMORGH_APP_ENV = 'live';
  await getInitialData({
    path: '/pidgin/media/video',
    service: 'pidgin',
    pageType: 'mostWatched',
    toggles: {
      mostPopularMediaPage: { enabled: true, value: '5' },
    },
  });
  expect(spy).toHaveBeenCalledWith({
    path: '/pidgin/mostwatched',
    pageType: 'mostWatched',
  });
});
