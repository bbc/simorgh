import { Services, Variants } from '#app/models/types/global';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import gahuzaOnDemandAudioEpisode from '#data/gahuza/bbc_gahuza_radio/p0k1qjp9.json';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import gahuzaPodcastPage from '#data/gahuza/bbc_gahuza_radio/p07yh8hb.json';
import indonesianOnDemandAudio from '#data/indonesia/bbc_indonesian_radio/w172xybnvm6718v.json';
import koreanOnDemandAudio from '#data/korean/bbc_korean_radio/w3ct1vk5.json';
import pashtoOnDemandAudio from '#data/pashto/bbc_pashto_radio/w3ct26m6.json';
import swahiliExpiredOnDemandAudio from '#data/swahili/bbc_swahili_radio/w3ct1y1s.json';
import zhongwenOnDemandAudio from '#data/zhongwen/bbc_cantonese_radio/w172xwswq9t42v6.json';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import {
  act,
  render,
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

interface GetPageDataProps {
  data: OnDemandAudioProps['pageData'];
  isPodcast?: boolean;
  externalLinks?: string[];
}

const getPageData = ({
  data,
  isPodcast = false,
  externalLinks = [],
}: GetPageDataProps): OnDemandAudioProps['pageData'] => {
  const recentEpisodesConfig = isPodcast
    ? toggles.recentPodcastEpisodes
    : toggles.recentAudioEpisodes;

  const recentEpisodes = recentEpisodesConfig.enabled
    ? data.recentEpisodes?.slice(0, recentEpisodesConfig.value)
    : null;

  return {
    ...data,
    externalLinks,
    // @ts-expect-error - Mocked data doesn't have all the required fields
    recentEpisodes,
    ...(!toggles.onDemandRadioSchedule.enabled && { radioScheduleData: null }),
  };
};

const renderPage = async ({
  pageData,
  service,
  variant,
  lang = 'ko',
}: PageProps) => {
  let result;
  await act(async () => {
    result = render(<OnDemandAudioPage pageData={pageData} />, {
      service,
      ...(variant && { variant }),
      pageLang: lang,
      bbcOrigin: 'https://www.test.bbc.com',
      pageType: AUDIO_PAGE,
      derivedPageType: 'On Demand Radio',
      pathname: '/pathname',
      statusCode: 200,
      toggles,
    });
  });

  return result;
};

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#src/app/components/ATIAnalytics', () => () => (
  <div>ATI Analytics</div>
));

const { env } = process;

describe('OnDemand Radio Page ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...env };
  });

  it('should match snapshot', async () => {
    const pageData = getPageData({
      data: gahuzaOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });

    const { container } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(container).toMatchSnapshot();
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    const pageData = getPageData({
      data: gahuzaOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
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
    const pageData = getPageData({
      data: gahuzaOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
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
    const pageData = getPageData({
      data: gahuzaPodcastPage?.data as unknown as OnDemandAudioProps['pageData'],
      isPodcast: true,
      externalLinks: ['https://example.com/listen'],
    });
    const { getByText } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(getByText('Iyi podcast iraboneka kandi kuri')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
    const pageData = getPageData({
      data: pashtoOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
    const { getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(getByText('۱۷ می ۲۰۲۱')).toBeInTheDocument();
  });
  it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
    const pageData = getPageData({
      data: koreanOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
    const { getByText } = await renderPage({
      pageData,
      service: 'korean',
    });

    expect(getByText('2021년 6월 8일')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
    const pageDataWithoutVideo = getPageData({
      data: indonesianOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
    const { getByText } = await renderPage({
      pageData: pageDataWithoutVideo,
      service: 'indonesia',
    });

    expect(getByText('9 Juni 2021')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Zhongwen OnDemand Radio Pages', async () => {
    const pageData = getPageData({
      data: zhongwenOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });

    const { getByText } = await renderPage({
      pageData,
      variant: 'simp',
      service: 'zhongwen',
    });

    expect(getByText('2021年6月5日')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    const pageData = getPageData({
      data: gahuzaOnDemandAudioEpisode?.data as unknown as OnDemandAudioProps['pageData'],
    });

    const { getByTestId } = await renderPage({
      pageData,
      service: 'gahuza',
    });

    expect(getByTestId('summary')).toHaveTextContent(
      "Imvo n'Imvano yo kuwa gatandatu 02/11/2024",
    );
  });

  it('should show the audio player', async () => {
    const pageData = getPageData({
      data: koreanOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
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
    const pageData = getPageData({
      data: swahiliExpiredOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });
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
      ...getPageData({
        data: koreanOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      }),
      episodeAvailability: 'not-yet-available',
    };
    const pageData =
      koreanPageDataWithNotYetAvailableEpisode as unknown as OnDemandAudioProps['pageData'];

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
    const pageData = getPageData({
      data: koreanOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
    });

    const { getByTestId } = await renderPage({
      pageData,
      service: 'korean',
    });

    expect(getByTestId('radio-schedule')).toBeInTheDocument();
  });

  it('should not show the radio schedule for services without schedules', async () => {
    const pageData = getPageData({
      data: koreanOnDemandAudio?.data as unknown as OnDemandAudioProps['pageData'],
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
