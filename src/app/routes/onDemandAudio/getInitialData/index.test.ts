import podcastJson from '#data/gahuza/bbc_gahuza_radio/p07yh8hb.json';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import { FetchMock } from 'jest-fetch-mock';
import * as fetchBFF from '#app/routes/utils/fetchDataFromBFF';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import isTest from '#app/lib/utilities/isTest';
import gahuzaExternalLinks from '../tempData/podcastExternalLinks/gahuza';
import getInitialData from '.';

const { env } = process;

const fetchMock = fetch as FetchMock;

jest.mock('#app/lib/utilities/isTest', () =>
  jest.fn().mockImplementation(() => false),
);

const fetchBFFSpy = jest.spyOn(fetchBFF, 'default');

describe('Get initial data for on demand radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it('should return essential data for an on demand page to render', async () => {
    fetchBFFSpy.mockResolvedValueOnce({
      json: gahuzaOnDemandAudio,
      status: 200,
    });

    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentAudioEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData?.headline).toEqual("Imvo  n'imvano");
    expect(pageData?.releaseDateTimeStamp).toEqual(1731715200000);
    expect(pageData?.summary).toEqual(
      'Ibitekerezo ku kiganiro cyavugaga ku matora yo muri Amerika',
    );
    expect(pageData?.language).toEqual('rw');
    expect(pageData?.metadata.type).toEqual('On Demand Radio');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p0gdh4dw.png',
    );
    expect(pageData?.promoBrandTitle).toEqual("Imvo  n'imvano");
    expect(pageData?.durationISO8601).toEqual('PT59M');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p0gdh4dw.png',
    );
  });

  it('should return essential data for a podcast page to render', async () => {
    fetchBFFSpy.mockResolvedValueOnce({ json: podcastJson, status: 200 });

    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.headline).toEqual('Baza Muganga');
    expect(pageData?.releaseDateTimeStamp).toEqual(1731628800000);
    expect(pageData?.summary).toEqual('Baza Muganga 15/11/2024');
    expect(pageData?.language).toEqual('rw');
    expect(pageData?.metadata.type).toEqual('Podcast');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p082wk67.jpg',
    );
    expect(pageData?.promoBrandTitle).toEqual('Baza Muganga');
    expect(pageData?.durationISO8601).toEqual('PT5M58S');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p082wk67.jpg',
    );
    expect(pageData?.externalLinks).toEqual([
      ...gahuzaExternalLinks.default.p07yh8hb,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p07yh8hb.rss',
        linkType: 'rss',
      },
      {
        linkText: 'Download',
        linkUrl:
          'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0k4x06p.mp3',
        linkType: 'download',
      },
    ]);
  });

  it('should use short synopsis as page summary for podcast pages when medium synopsis is absent', async () => {
    fetchBFFSpy.mockResolvedValueOnce({ json: podcastJson, status: 200 });

    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.summary).toEqual('Baza Muganga 15/11/2024');
  });

  it('should return essential data for a page to render when the episode toggle is null', async () => {
    fetchBFFSpy.mockResolvedValueOnce({
      json: gahuzaOnDemandAudio,
      status: 200,
    });

    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: AUDIO_PAGE,
      toggles: {
        // @ts-expect-error partial data required for testing purposes
        recentAudioEpisodes: null,
      },
    });

    expect(pageData?.headline).toEqual("Imvo  n'imvano");
    expect(pageData?.releaseDateTimeStamp).toEqual(1731715200000);
    expect(pageData?.summary).toEqual(
      'Ibitekerezo ku kiganiro cyavugaga ku matora yo muri Amerika',
    );
    expect(pageData?.language).toEqual('rw');
    expect(pageData?.metadata.type).toEqual('On Demand Radio');
    expect(pageData?.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p0gdh4dw.png',
    );
    expect(pageData?.promoBrandTitle).toEqual("Imvo  n'imvano");
    expect(pageData?.durationISO8601).toEqual('PT59M');
    expect(pageData?.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p0gdh4dw.png',
    );
  });

  it('should return the correct page identifier used for on demand radio analytics', async () => {
    fetchBFFSpy.mockResolvedValueOnce({
      json: gahuzaOnDemandAudio,
      status: 200,
    });

    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentAudioEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData?.metadata.atiAnalytics.pageIdentifier).toEqual(
      'gahuza.bbc_gahuza_radio.podcasts.programmes.p02pcb5c.page',
    );
  });

  it('should return the correct page identifier used for podcast analytics', async () => {
    fetchBFFSpy.mockResolvedValueOnce({ json: podcastJson, status: 200 });

    const { pageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentPodcastEpisodes: { enabled: false, value: 8 },
      },
    });

    expect(pageData?.metadata.atiAnalytics.pageIdentifier).toEqual(
      'gahuza.bbc_gahuza_radio.podcasts.programmes.p07yh8hb.page',
    );
  });

  it('should return on demand recent episode data when recentEpisode toggle is enabled', async () => {
    fetchBFFSpy.mockResolvedValueOnce({
      json: gahuzaOnDemandAudio,
      status: 200,
    });

    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentAudioEpisodes: { enabled: true, value: 4 },
      },
    });

    expect(pageData?.recentEpisodes.length).toEqual(4);
    expect(pageData?.recentEpisodes[0].id).toEqual('p0k39nk4');
  });

  it('should return podcast recent episode data when recentEpisode toggle is enabled', async () => {
    fetchBFFSpy.mockResolvedValueOnce({ json: podcastJson, status: 200 });
    const { pageData: podcastPageData } = await getInitialData({
      path: 'mock-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles: {
        recentPodcastEpisodes: { enabled: true, value: 4 },
      },
    });

    expect(podcastPageData?.recentEpisodes.length).toEqual(4);
    expect(podcastPageData?.recentEpisodes[0].id).toEqual('p0k396c8');
  });

  it.each`
    isTestEnvironment | expectedPathname
    ${true}           | ${'mock-podcast-path?renderer_env=live'}
    ${false}          | ${'mock-podcast-path'}
  `(
    'should fetch from $expectedPathname when test environment is $isTestEnvironment',
    async ({ isTestEnvironment, expectedPathname }) => {
      (isTest as jest.Mock).mockImplementationOnce(() => isTestEnvironment);

      await getInitialData({
        path: 'mock-podcast-path',
        pageType: AUDIO_PAGE,
        service: 'gahuza',
      });

      expect(fetchBFFSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: expectedPathname,
        }),
      );
    },
  );
});
