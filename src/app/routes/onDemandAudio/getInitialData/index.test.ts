import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import dissocPath from 'ramda/src/dissocPath';
import loggerMock from '#testHelpers/loggerMock';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1.json';
import podcastJson from '#data/arabic/podcasts/p02pc9qc/p08wtg4d.json';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { FetchMock } from 'jest-fetch-mock';
import arabicExternalLinks from '../tempData/podcastExternalLinks/arabic';
import * as fetchPageData from '../../utils/fetchPageData';
import getInitialData from '.';

const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

const fetchMock = fetch as FetchMock;

describe('Get initial data for on demand radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it('should return essential data for an on demand page to render', async () => {
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentAudioEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData?.headline).toEqual('ماښامنۍ خپرونه');
    expect(pageData?.releaseDateTimeStamp).toEqual(1588291200000);
    expect(pageData?.summary).toEqual('د بي بي سي ورلډ سروس څخه پروګرام کول');
    expect(pageData?.language).toEqual('ps');
    expect(pageData?.metadata.type).toEqual('On Demand Radio');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p08b23c8.png',
    );
    expect(pageData?.promoBrandTitle).toEqual('ماښامنۍ خپرونه');
    expect(pageData?.durationISO8601).toEqual('PT29M30S');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p08b23c8.png',
    );
    expect(pageData?.externalLinks).toEqual([]);
  });

  it('should return essential data for a podcast page to render', async () => {
    fetchMock.mockResponse(JSON.stringify(podcastJson));
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      service: 'arabic',
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.headline).toEqual('BBC Xtra');
    expect(pageData?.releaseDateTimeStamp).toEqual(1603929600000);
    expect(pageData?.summary).toEqual(
      'التصويت الانتخابي عبر البريد خيار يلجأ إليه البعض\nمتى وكيف بدأ توتر العلاقات بين الدولة العثمانية وفرنسا؟\nونتابع احتفالات المغاربة بالمولد النبوي\nبي بي سي إكسترا بصحبة محمد مطر',
    );
    expect(pageData?.language).toEqual('ar');
    expect(pageData?.metadata.type).toEqual('Podcast');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p02rt7vj.jpg',
    );
    expect(pageData?.promoBrandTitle).toEqual('BBC Xtra');
    expect(pageData?.durationISO8601).toEqual('PT6M50S');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p02rt7vj.jpg',
    );
    expect(pageData?.externalLinks).toEqual([
      ...arabicExternalLinks.default.p02pc9qc,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p02pc9qc.rss',
        linkType: 'rss',
      },
      {
        linkText: 'Download',
        linkUrl:
          'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p08wsxz2.mp3',
        linkType: 'download',
      },
    ]);
  });

  it('should use short synopsis as page summary for podcast pages when medium synopsis is absent', async () => {
    const podcastJsonNoMediumSynopsis = dissocPath(
      ['content', 'blocks', 0, 'synopses', 'medium'],
      podcastJson,
    );
    fetchMock.mockResponse(JSON.stringify(podcastJsonNoMediumSynopsis));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.summary).toEqual(
      'التصويت عبر البريد في الانتخابات الرئاسية الأميركية',
    );
  });

  it('should return essential data for a page to render when the episode toggle is null', async () => {
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: MEDIA_PAGE,
      toggles: {
        // @ts-expect-error partial data required for testing purposes
        recentAudioEpisodes: null,
      },
    });

    expect(pageData?.headline).toEqual('ماښامنۍ خپرونه');
    expect(pageData?.releaseDateTimeStamp).toEqual(1588291200000);
    expect(pageData?.summary).toEqual('د بي بي سي ورلډ سروس څخه پروګرام کول');
    expect(pageData?.language).toEqual('ps');
    expect(pageData?.metadata.type).toEqual('On Demand Radio');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p08b23c8.png',
    );
    expect(pageData?.promoBrandTitle).toEqual('ماښامنۍ خپرونه');
    expect(pageData?.durationISO8601).toEqual('PT29M30S');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p08b23c8.png',
    );
  });

  it('should return the correct page identifier used for on demand radio analytics', async () => {
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentAudioEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData?.pageIdentifier).toEqual(
      'pashto.bbc_pashto_radio.w3ct0lz1.page',
    );
  });

  it('should return the correct page identifier used for podcast analytics', async () => {
    fetchMock.mockResponse(JSON.stringify(podcastJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.pageIdentifier).toEqual(
      'arabic.bbc_arabic_radio.podcasts.p08wtg4d.page',
    );
  });

  it('should return on demand recent episode data when recentEpisode toggle is enabled', async () => {
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentAudioEpisodes: { enabled: true, value: 4 },
      },
    });

    expect(pageData?.recentEpisodes.length).toEqual(4);
    expect(pageData?.recentEpisodes[0].id).toEqual('w3ct155x');
  });

  it('should return podcast recent episode data when recentEpisode toggle is enabled', async () => {
    fetchMock.mockResponse(JSON.stringify(podcastJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData: podcastPageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentPodcastEpisodes: { enabled: true, value: 8 },
      },
    });

    expect(podcastPageData?.recentEpisodes.length).toEqual(8);
    expect(podcastPageData?.recentEpisodes[0].id).toEqual('p08wkzvd');
  });

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    await getInitialData({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path?renderer_env=live',
      pageType: MEDIA_PAGE,
    });
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    await getInitialData({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path',
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
      onDemandRadioJson,
    );
    fetchMock.mockResponse(JSON.stringify(pageDataWithMissingFields));

    // @ts-expect-error partial data required for testing purposes
    await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: MEDIA_PAGE,
      toggles: {
        recentAudioEpisodes: { enabled: false, value: 4 },
      },
    });

    const countMissingFieldCalls = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockedFunction: jest.Mock<any, any, any>,
    ) => {
      return mockedFunction.mock.calls.filter(([logCategory]) => {
        return logCategory === RADIO_MISSING_FIELD;
      }).length;
    };

    expect(countMissingFieldCalls(loggerMock.info)).toBe(7);
    expect(countMissingFieldCalls(loggerMock.warn)).toBe(2);
    expect(countMissingFieldCalls(loggerMock.error)).toBe(2);
  });

  it('should return media blocks in preparation for adding the media loader component', async () => {
    fetchMock.mockResponse(JSON.stringify(onDemandRadioJson));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });

    expect(pageData).toHaveProperty('mediaBlocks');
    expect(pageData?.mediaBlocks).toStrictEqual(
      expect.arrayContaining(
        onDemandRadioJson.content.blocks.map(block => {
          return { type: 'audio', model: block };
        }),
      ),
    );
  });
});
