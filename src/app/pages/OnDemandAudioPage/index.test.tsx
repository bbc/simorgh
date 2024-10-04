import React from 'react';
import assocPath from 'ramda/src/assocPath';
import pashtoPageData from '#data/pashto/bbc_pashto_radio/w3ct0lz1.json';
import koreanPageData from '#data/korean/bbc_korean_radio/w3ct0kn5.json';
import zhongwenPageData from '#data/zhongwen/bbc_cantonese_radio/w172xf3r5x8hw4v.json';
import indonesiaPageData from '#data/indonesia/bbc_indonesian_radio/w172xh267fpn19l.json';
import afaanoromooPageData from '#data/afaanoromoo/bbc_afaanoromoo_radio/w13xttnw.json';
import arabicPodcastPageData from '#data/arabic/podcasts/p02pc9qc/p08wtg4d.json';
import persianPodcastBrandPageData from '#data/persian/bbc_persian_radio/p02pc9wf.json';
import indonesianBrandPageData from '#data/indonesia/bbc_indonesian_radio/w13xtt0s.json';
import persianDariEpisodePageData from '#data/persian/bbc_dari_radio/p0340v11.json';
import persianEpisodePageData from '#data/persian/bbc_persian_radio/p0340vyx.json';
import * as analyticsUtils from '#lib/analyticsUtils';
import getInitialData from '#app/routes/onDemandAudio/getInitialData';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { Services, Variants } from '#app/models/types/global';
import { FetchMock } from 'jest-fetch-mock';
import * as MediaLoader from '#app/components/MediaLoader';
import {
  render,
  act,
  waitFor,
} from '../../components/react-testing-library-with-providers';
import koreanPageWithScheduleData from './fixtureData/korean.json';
import _OnDemandAudioPage, { OnDemandAudioProps } from './OnDemandAudioPage';

const OnDemandAudioPage = withMediaError(_OnDemandAudioPage);

const toggles = {
  recentAudioEpisodes: {
    enabled: false,
    value: 4,
  },
  recentPodcastEpisodes: {
    enabled: false,
    value: 8,
  },
  radioSchedule: {
    enabled: true,
  },
};

const fetchMock = fetch as FetchMock;

interface PageProps {
  pageData: OnDemandAudioProps['pageData'];
  service: Services;
  variant: Variants;
  lang: string;
}

const renderPage = async ({
  pageData,
  service,
  variant,
  lang = 'ko',
}: PageProps) => {
  let result;
  await act(async () => {
    result = render(
      <OnDemandAudioPage service={service} pageData={pageData} />,
      {
        service,
        variant,
        pageLang: lang,
        bbcOrigin: 'https://www.test.bbc.com',
        pageType: MEDIA_PAGE,
        derivedPageType: 'On Demand Radio',
        pathname: '/pathname',
        statusCode: 200,
        toggles,
      },
    );
  });

  return result;
};

(analyticsUtils.getAtUserId as jest.Mock) = jest.fn();

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const { env } = process;

const getAvailableEpisode = assocPath(
  ['content', 'blocks', 0, 'availability'],
  'available',
);

describe('OnDemand Radio Page ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...env };
  });

  it('should match snapshot', async () => {
    const pashtoPageDataWithAvailableEpisode =
      getAvailableEpisode(pashtoPageData);
    fetchMock.mockResponse(JSON.stringify(pashtoPageDataWithAvailableEpisode));

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });

    // @ts-expect-error partial data required for testing purposes
    const { container } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'pashto',
    });

    expect(container).toMatchSnapshot();
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(pashtoPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData: pageDataWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required queries
    const { getByText, queryByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: pageDataWithoutVideo,
      service: 'pashto',
    });

    expect(getByText('ماښامنۍ خپرونه')).toBeInTheDocument();
    expect(
      queryByText('This podcast is also available on'),
    ).not.toBeInTheDocument();
  });

  it('should show the episode title when it is available', async () => {
    fetchMock.mockResponse(JSON.stringify(arabicPodcastPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'arabic',
    });
    const element = getByText(
      'التصويت عبر البريد في الانتخابات الرئاسية الأميركية',
    );

    expect(element.tagName).toEqual('SPAN');

    await waitFor(() => {
      const actual = document.querySelector('head > title')?.innerHTML;

      expect(actual).toEqual(
        'التصويت عبر البريد في الانتخابات الرئاسية الأميركية - BBC Xtra - Arabic - BBC News عربي',
      );
    });
  });

  it('should show the external links for podcast pages', async () => {
    fetchMock.mockResponse(JSON.stringify(arabicPodcastPageData));

    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      service: 'arabic',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'arabic',
    });

    expect(getByText('هذا البودكاست متاح عبر')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(pashtoPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'pashto',
    });

    expect(getByText('۱ می ۲۰۲۰')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(koreanPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: pageDataWithWithoutVideo,
      service: 'korean',
    });

    expect(getByText('2020년 5월 4일')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(indonesiaPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData: pageDataWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: pageDataWithoutVideo,
      service: 'indonesia',
    });

    expect(getByText('27 April 2020')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Zhongwen OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(zhongwenPageData));

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });

    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      variant: 'trad',
      service: 'zhongwen',
    });

    expect(getByText('2020年6月6日')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    fetchMock.mockResponse(JSON.stringify(indonesiaPageData));

    // @ts-expect-error partial data required for testing purposes

    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: pageDataWithWithoutVideo,
      service: 'indonesia',
    });

    expect(
      getByText(
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
      ),
    ).toBeInTheDocument();
  });

  it('should show the audio player', async () => {
    const koreanPageDataWithAvailableEpisode =
      getAvailableEpisode(koreanPageData);
    fetchMock.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'korean',
    });
    const audioPlayer = container.querySelector(
      '[data-e2e="media-loader__container"]',
    );

    expect(audioPlayer).toBeInTheDocument();
  });

  it('should show the expired content message if episode is expired', async () => {
    fetchMock.mockResponse(JSON.stringify(koreanPageData));
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container, getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'korean',
    });
    const expiredMessageEl = getByText('더 이상 이용할 수 없는 콘텐츠입니다.');

    expect(expiredMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should show the 'content not yet available' message if episode is not yet available", async () => {
    const koreanPageDataWithNotYetAvailableEpisode = assocPath(
      ['content', 'blocks', 0, 'availability'],
      'future',
      koreanPageData,
    );

    fetchMock.mockResponse(
      JSON.stringify(koreanPageDataWithNotYetAvailableEpisode),
    );
    // @ts-expect-error partial data required for testing purposes

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: MEDIA_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container, getByText } = await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData,
      service: 'korean',
    });

    const notYetAvailableMessageEl = getByText(
      '아직 재생할 수 없는 프로그램입니다.',
    );

    expect(notYetAvailableMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show the radio schedule for the On Demand radio page', async () => {
    await renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: koreanPageWithScheduleData,
      service: 'korean',
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).toBeInTheDocument();
  });

  it('should not show the radio schedule for services without schedules', async () => {
    renderPage({
      // @ts-expect-error partial data required for testing purposes
      pageData: { ...koreanPageWithScheduleData, radioScheduleData: undefined },
      service: 'korean',
      lang: 'ko',
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });

  describe('Page Identifier Overrides ', () => {
    const afaanPageDataWithAvailableEpisode =
      getAvailableEpisode(afaanoromooPageData);

    it.each`
      path                          | data                                 | language | pageIdentifierOverride                                   | pageTitleOverride          | service          | description
      ${'some-podcast-radio-path'}  | ${persianPodcastBrandPageData}       | ${'fa'}  | ${'persian.bbc_persian_radio.podcasts.p0jrz542.page'}    | ${'پرگار'}                 | ${'persian'}     | ${'Persian Podcast'}
      ${'some-ondemand-radio-path'} | ${indonesianBrandPageData}           | ${'id'}  | ${'indonesia.bbc_indonesian_radio.w172ywztppckjfb.page'} | ${'Dunia Pagi Ini'}        | ${'indonesia'}   | ${'Indonesian Brand'}
      ${'some-ondemand-radio-path'} | ${persianDariEpisodePageData}        | ${'fa'}  | ${'persian.bbc_dari_radio.w3ct6lbh.page'}                | ${'مجله شامگاهی'}          | ${'persian'}     | ${'Persian Dari Episode'}
      ${'some-ondemand-radio-path'} | ${persianEpisodePageData}            | ${'fa'}  | ${'persian.bbc_persian_radio.w3ct2czp.page'}             | ${'چشم انداز بامدادی'}     | ${'persian'}     | ${'Persian Episode'}
      ${'some-ondemand-radio-path'} | ${afaanPageDataWithAvailableEpisode} | ${'om'}  | ${'afaanoromoo.bbc_afaanoromoo_radio.w3ct0l8r.page'}     | ${'Oduu BBC Afaan Oromoo'} | ${'afaanoromoo'} | ${'Afaan Oromoo Episode'}
      ${'some-ondemand-radio-path'} | ${pashtoPageData}                    | ${'ps'}  | ${'pashto.bbc_pashto_radio.w3ct0lz1.page'}               | ${'ماښامنۍ خپرونه'}        | ${'pashto'}      | ${'Pashto Brand'}
    `(
      'should use the derived page identifier to render the audio player for $description',
      async ({
        path,
        data,
        language,
        pageIdentifierOverride,
        pageTitleOverride,
        service,
      }) => {
        const mediaLoaderSpy = jest.spyOn(MediaLoader, 'default');

        fetchMock.mockResponse(JSON.stringify(data));
        // @ts-expect-error partial data required for testing purposes
        const { pageData } = await getInitialData({
          path,
          pageType: MEDIA_PAGE,
          toggles,
        });
        const expectedMediaOverrides = {
          model: {
            language,
            pageIdentifierOverride,
            pageTitleOverride,
          },
          type: 'mediaOverrides',
        };

        await renderPage({
          // @ts-expect-error partial data required for testing purposes
          pageData,
          service,
        });

        const mediaLoaderProps = mediaLoaderSpy.mock.calls[0][0];
        const { blocks } = mediaLoaderProps;

        expect(mediaLoaderSpy).toHaveBeenCalled();
        expect(blocks).toEqual(
          expect.arrayContaining([expectedMediaOverrides]),
        );
      },
    );
  });
});
