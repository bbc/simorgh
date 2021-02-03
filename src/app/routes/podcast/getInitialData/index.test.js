import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import loggerMock from '#testHelpers/loggerMock';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import podcastJson from '#data/arabic/podcasts/p02pc9qc/p08wtg4d';
import { PODCAST_MISSING_FIELD } from '#lib/logger.const';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';

fetch.mockResponse(JSON.stringify(podcastJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

describe('Get initial data for podcasts', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData.headline).toEqual('BBC Xtra');
    expect(pageData.releaseDateTimeStamp).toEqual(1603929600000);
    expect(pageData.summary).toEqual(
      'التصويت عبر البريد في الانتخابات الرئاسية الأميركية',
    );
    expect(pageData.language).toEqual('ar');
    expect(pageData.metadata.type).toEqual('Podcast');
    expect(pageData.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p02rt7vj.jpg',
    );
    expect(pageData.promoBrandTitle).toEqual('BBC Xtra');
    expect(pageData.durationISO8601).toEqual('PT6M50S');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p02rt7vj.jpg',
    );
  });

  it('should return essential data for a page to render when the episode toggle is null', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: null,
      },
    });

    expect(pageData.headline).toEqual('BBC Xtra');
    expect(pageData.releaseDateTimeStamp).toEqual(1603929600000);
    expect(pageData.summary).toEqual(
      'التصويت عبر البريد في الانتخابات الرئاسية الأميركية',
    );
    expect(pageData.language).toEqual('ar');
    expect(pageData.metadata.type).toEqual('Podcast');
    expect(pageData.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p02rt7vj.jpg',
    );
    expect(pageData.promoBrandTitle).toEqual('BBC Xtra');
    expect(pageData.durationISO8601).toEqual('PT6M50S');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p02rt7vj.jpg',
    );
  });

  it('should return the correct page identifier used for analytics', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData.pageIdentifier).toEqual(
      'arabic.bbc_arabic_radio.podcasts.p08wtg4d.page',
    );
  });

  it('should return recent episode data when recentEpisode toggle is enabled', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: true, value: 4 },
      },
    });

    expect(pageData.recentEpisodes.length).toEqual(4);
    expect(pageData.recentEpisodes[0].id).toEqual('p08wkzvd');
  });

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-podcast-path?renderer_env=live',
      pageType: MEDIA_PAGE,
    });
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
    });
  });

  it('invokes logging when expected data is missing in ARES response', async () => {
    const pageDataWithMissingFields = mergeDeepLeft(
      {
        metadata: {
          title: null, // info
          language: null, // info
          createdBy: null, // error
          releaseDateTimeStamp: null, // warn
          analyticsLabels: {
            contentType: null, // info
          },
        },
        promo: {
          headlines: {
            headline: null, // warn
          },
          media: {
            imageUrl: null, // info
            versions: [
              {
                durationISO8601: null, // info
              },
            ],
          },
        },
        content: {
          blocks: [
            {
              id: null, // error
              imageUrl: null, // info
              synopses: {
                short: null, // info
              },
            },
          ],
        },
      },
      podcastJson,
    );
    fetch.mockResponse(JSON.stringify(pageDataWithMissingFields));

    await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 4 },
      },
    });

    const countMissingFieldCalls = mockedFunction => {
      return mockedFunction.mock.calls.filter(([logCategory]) => {
        return logCategory === PODCAST_MISSING_FIELD;
      }).length;
    };

    expect(countMissingFieldCalls(loggerMock.info)).toBe(7);
    expect(countMissingFieldCalls(loggerMock.warn)).toBe(2);
    expect(countMissingFieldCalls(loggerMock.error)).toBe(2);
  });
});
