import React from 'react';
import gahuzaOnDemandAudioEpisode from '#data/gahuza/bbc_gahuza_radio/p0k1qjp9.json';
import gahuzaPodcastPage from '#data/gahuza/bbc_gahuza_radio/p07yh8hb.json';
import pashtoOnDemandAudio from '#data/pashto/bbc_pashto_radio/w3ct26m6.json';
import indonesianOnDemandAudio from '#data/indonesia/bbc_indonesian_radio/w172xybnvm6718v.json';
import swahiliExpiredOnDemandAudio from '#data/swahili/bbc_swahili_radio/w3ct1y1s.json';
import koreanOnDemandAudio from '#data/korean/bbc_korean_radio/w3ct1vk5.json';
import zhongwenOnDemandAudio from '#data/zhongwen/bbc_cantonese_radio/w172xwswq9t42v6.json';
import * as analyticsUtils from '#lib/analyticsUtils';
import getInitialData from '#app/routes/onDemandAudio/getInitialData';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import { Services, Variants } from '#app/models/types/global';

import * as fetchBFF from '#app/routes/utils/fetchDataFromBFF';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import {
  render,
  act,
  waitFor,
} from '../../components/react-testing-library-with-providers';
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
  onDemandRadioSchedule: {
    enabled: true,
  },
};

interface PageProps {
  pageData: OnDemandAudioProps['pageData'];
  service: Services;
  variant?: Variants;
  lang?: string;
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
        ...(variant && { variant }),
        pageLang: lang,
        bbcOrigin: 'https://www.test.bbc.com',
        pageType: AUDIO_PAGE,
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

describe('OnDemand Radio Page ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...env };
  });

  it('should match snapshot', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: gahuzaOnDemandAudio, status: 200 });

    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(container).toMatchSnapshot();
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: gahuzaOnDemandAudio, status: 200 });

    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { queryByText, getByTestId } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(getByTestId('brand-title')).toHaveTextContent("Imvo n'imvano");
    expect(
      queryByText('This podcast is also available on'),
    ).not.toBeInTheDocument();
  });

  it('should show the episode title when it is available', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: gahuzaOnDemandAudio, status: 200 });

    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData,
      service: 'gahuza',
    });
    const element = getByText("Imvo n'Imvano 16/11/2024");

    expect(element.tagName).toEqual('SPAN');

    await waitFor(() => {
      const actual = document.querySelector('head > title')?.innerHTML;

      expect(actual).toEqual(
        "Imvo n'Imvano 16/11/2024 - Imvo  n'imvano - Gahuza - BBC News Gahuza",
      );
    });
  });

  it('should show the external links for podcast pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: gahuzaPodcastPage, status: 200 });

    const { pageData } = await getInitialData({
      path: 'some-podcast-path',
      pageType: AUDIO_PAGE,
      service: 'gahuza',
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(getByText('Iyi podcast iraboneka kandi kuri')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: pashtoOnDemandAudio, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(getByText('۱۷ می ۲۰۲۱')).toBeInTheDocument();
  });
  it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: koreanOnDemandAudio, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData,
      service: 'korean',
    });

    expect(getByText('2021년 6월 8일')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: indonesianOnDemandAudio, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData: pageDataWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData: pageDataWithoutVideo,
      service: 'indonesia',
    });

    expect(getByText('9 Juni 2021')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Zhongwen OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: zhongwenOnDemandAudio, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });

    // @ts-expect-error react testing library returns the required query
    const { getByText } = await renderPage({
      pageData,
      variant: 'simp',
      service: 'zhongwen',
    });

    expect(getByText('2021年6月5日')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: gahuzaOnDemandAudioEpisode, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });

    // @ts-expect-error react testing library returns the required query
    const { getByTestId } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(getByTestId('summary')).toHaveTextContent(
      "Imvo n'Imvano yo kuwa gatandatu 02/11/2024",
    );
  });

  it('should show the audio player', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: koreanOnDemandAudio, status: 200 });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container } = await renderPage({
      pageData,
      service: 'korean',
    });
    const audioPlayer = container.querySelector(
      '[data-e2e="media-loader__container"]',
    );

    expect(audioPlayer).toBeInTheDocument();
  });

  it('should show the expired content message if episode is expired', async () => {
    jest.spyOn(fetchBFF, 'default').mockResolvedValueOnce({
      json: swahiliExpiredOnDemandAudio,
      status: 200,
    });

    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container, getByText } = await renderPage({
      pageData,
      service: 'swahili',
    });
    const expiredMessageEl = getByText('Taarifa hii haipatikani tena.');

    expect(expiredMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should show the 'content not yet available' message if episode is not yet available", async () => {
    const koreanPageDataWithNotYetAvailableEpisode = {
      data: {
        ...koreanOnDemandAudio.data,
        episodeAvailability: 'not-yet-available',
      },
    };
    jest.spyOn(fetchBFF, 'default').mockResolvedValueOnce({
      json: koreanPageDataWithNotYetAvailableEpisode,
      status: 200,
    });
    // @ts-expect-error partial data required for testing purposesx

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });
    // @ts-expect-error react testing library returns the required query
    const { container, getByText } = await renderPage({
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
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: koreanOnDemandAudio, status: 200 });
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });

    // @ts-expect-error react testing library returns the required query
    const { getByTestId } = await renderPage({
      pageData,
      service: 'korean',
    });

    expect(getByTestId('radio-schedule')).toBeInTheDocument();
  });

  it('should not show the radio schedule for services without schedules', async () => {
    jest
      .spyOn(fetchBFF, 'default')
      .mockResolvedValueOnce({ json: koreanOnDemandAudio, status: 200 });
    // @ts-expect-error partial data required for testing purposes
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType: AUDIO_PAGE,
      toggles,
    });

    renderPage({
      pageData: { ...pageData, radioScheduleData: undefined },
      service: 'korean',
      lang: 'ko',
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });
});
