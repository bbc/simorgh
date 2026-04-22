import gahuzaOnDemandAudioEpisode from '#data/gahuza/bbc_gahuza_radio/p0k1qjp9.json';
import gahuzaPodcastPage from '#data/gahuza/bbc_gahuza_radio/p07yh8hb.json';
import pashtoOnDemandAudio from '#data/pashto/bbc_pashto_radio/w3ct26m6.json';
import indonesianOnDemandAudio from '#data/indonesia/bbc_indonesian_radio/w172xybnvm6718v.json';
import swahiliExpiredOnDemandAudio from '#data/swahili/bbc_swahili_radio/w3ct1y1s.json';
import koreanOnDemandAudio from '#data/korean/bbc_korean_radio/w3ct1vk5.json';
import zhongwenOnDemandAudio from '#data/zhongwen/bbc_cantonese_radio/w172xwswq9t42v6.json';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import { Services, Variants } from '#app/models/types/global';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import {
  render,
  act,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { GetServerSidePropsContext } from 'next';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import _OnDemandAudioPage from './OnDemandAudioLayout';
import { OnDemandAudioProps } from './types';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandAudioRoute from './handleOnDemandAudioRoute';

const OnDemandAudioPage = withMediaError(_OnDemandAudioPage);

const mockToggles = {
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

jest.mock('../../../utilities/pageRequests/getPageData');

jest.mock('react-helmet', () => {
  return {
    Helmet: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

interface PageProps {
  pageData: OnDemandAudioProps['pageData'];
  service: Services;
  variant?: Variants;
  lang?: string;
  pathname?: string;
  toggles?: typeof mockToggles;
}

const renderPage = async ({
  pageData,
  service,
  variant,
  lang = 'ko',
  pathname = '/some-podcast',
  toggles = mockToggles,
}: PageProps) => {
  let result;
  await act(async () => {
    result = render(
      <ToggleContextProvider toggles={toggles}>
        <OnDemandAudioPage service={service} pageData={pageData} />
      </ToggleContextProvider>,
      {
        service,
        ...(variant && { variant }),
        pageLang: lang,
        bbcOrigin: 'https://www.test.bbc.com',
        pageType: AUDIO_PAGE,
        derivedPageType: 'On Demand Radio',
        pathname,
        statusCode: 200,
        toggles,
      },
    );
  });

  return result;
};

jest.mock('#app/components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#app/components/ATIAnalytics', () => () => <div>ATI Analytics</div>);
jest.mock('#app/routes/onDemandAudio/podcastExternalLinks', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue([
    {
      linkText: 'Apple Podcasts',
      linkUrl: 'https://apple.test',
      linkType: 'platform',
    },
  ]),
}));

const { env } = process;

describe('OnDemand Radio Page ', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c',
    query: { service: 'gahuza' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaOnDemandAudio.data,
        status: 200,
      },
    });
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);
    process.env = { ...env };
  });

  it('should display OnDemand Radio page correctly', async () => {
    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );
    const { container } = await renderPage({
      pageData: result.props.pageData,
      service: 'gahuza',
    });

    const linkedDataScript = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(linkedDataScript).toBeInTheDocument();

    const linkedData = JSON.parse(linkedDataScript?.textContent ?? '{}') as {
      '@graph'?: Array<Record<string, unknown>>;
    };
    const graph = linkedData['@graph'] ?? [];

    const audioObject = graph.find(
      graphEntry => graphEntry['@type'] === 'AudioObject',
    );
    const podcastEpisode = graph.find(
      graphEntry => graphEntry['@type'] === 'PodcastEpisode',
    );

    expect(audioObject).toBeDefined();
    expect(podcastEpisode).toBeUndefined();
  });

  it('should display podcast episode page with PodcastEpisode schema', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/gahuza/bbc_gahuza_radio/podcasts/p07yh8hb/p0k4x0jm',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaPodcastPage.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { container } = await renderPage({
      pageData: result.props.pageData,
      service: 'gahuza',
      pathname: '/gahuza/bbc_gahuza_radio/podcasts/p07yh8hb/p0k4x0jm',
    });

    const linkedDataScript = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(linkedDataScript).toBeInTheDocument();

    const linkedData = JSON.parse(linkedDataScript?.textContent ?? '{}') as {
      '@graph'?: Array<Record<string, unknown>>;
    };
    const graph = linkedData['@graph'] ?? [];

    const podcastEpisode = graph.find(
      graphEntry => graphEntry['@type'] === 'PodcastEpisode',
    );
    const podcastSeries = graph.find(
      graphEntry => graphEntry['@type'] === 'PodcastSeries',
    );
    const webPageSchema = graph.find(
      graphEntry => graphEntry['@type'] === 'WebPage',
    );

    expect(podcastEpisode).toBeDefined();
    expect(podcastSeries).toBeDefined();
    expect(webPageSchema).toBeDefined();
    expect(webPageSchema?.mainEntity).toEqual({
      '@id': podcastEpisode?.['@id'],
    });
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );
    const { queryByText, getByTestId } = await renderPage({
      pageData: result.props.pageData,
      service: 'gahuza',
    });

    expect(getByTestId('brand-title')).toHaveTextContent("Imvo n'imvano");
    expect(
      queryByText('This podcast is also available on'),
    ).not.toBeInTheDocument();
  });

  it('should show the episode title when it is available', async () => {
    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );

    const { getByText } = await renderPage({
      pageData: result.props.pageData,
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
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/gahuza/bbc_gahuza_radio/podcasts/programmes/p07yh8hb',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaPodcastPage.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'gahuza',
    });

    expect(getByText('Iyi podcast iraboneka kandi kuri')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/pashto/bbc_pashto_radio/w3ct26m6',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pashtoOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);
    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'pashto',
    });

    expect(getByText('۱۷ می ۲۰۲۱')).toBeInTheDocument();
  });
  it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/korean/bbc_korean_radio/w3ct1vk5',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: koreanOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);
    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'korean',
    });

    expect(getByText('2021년 6월 8일')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/indonesia/bbc_indonesian_radio/w172xybnvm6718v',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: indonesianOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);
    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'indonesia',
    });

    expect(getByText('9 Juni 2021')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Zhongwen OnDemand Radio Pages', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/simp/zhongwen/bbc_cantonese_radio/w172xwswq9t42v6',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: zhongwenOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      variant: 'simp',
      service: 'zhongwen',
    });

    expect(getByText('2021年6月5日')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/gahuza/bbc_gahuza_radio/podcasts/p0k1qjp9',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaOnDemandAudioEpisode.data,
        status: 200,
      },
    });
    const result = await handleOnDemandAudioRoute(mockCtx);
    const { getByTestId } = await renderPage({
      pageData: result.props.pageData,
      service: 'gahuza',
    });

    expect(getByTestId('summary')).toHaveTextContent(
      "Imvo n'Imvano yo kuwa gatandatu 02/11/2024",
    );
  });

  it('should show the audio player', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/korean/bbc_korean_radio/w3ct1vk5',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: koreanOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { container } = await renderPage({
      pageData: result.props.pageData,
      service: 'korean',
    });
    const audioPlayer = container.querySelector(
      '[data-e2e="media-loader__container"]',
    );

    expect(audioPlayer).toBeInTheDocument();
  });

  it('should show the expired content message if episode is expired', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/swahili/bbc_swahili_radio/w3ct1y1s',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: swahiliExpiredOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'swahili',
    });
    const expiredMessageEl = getByText('Taarifa hii haipatikani tena.');

    expect(expiredMessageEl).toBeInTheDocument();
  });

  it("should show the 'content not yet available' message if episode is not yet available", async () => {
    const koreanPageDataWithNotYetAvailableEpisode = {
      data: {
        ...koreanOnDemandAudio.data,
        episodeAvailability: 'not-yet-available',
      },
    };

    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/korean/bbc_korean_radio/w3ct1vk5',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: koreanPageDataWithNotYetAvailableEpisode.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { getByText } = await renderPage({
      pageData: result.props.pageData,
      service: 'korean',
    });

    const notYetAvailableMessageEl = getByText(
      '아직 재생할 수 없는 프로그램입니다.',
    );

    expect(notYetAvailableMessageEl).toBeInTheDocument();
  });

  it('should show the radio schedule for the On Demand radio page', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/korean/bbc_korean_radio/w3ct1vk5',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: koreanOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    const { getByTestId } = await renderPage({
      pageData: result.props.pageData,
      service: 'korean',
    });

    expect(getByTestId('radio-schedule')).toBeInTheDocument();
  });

  it('should not show the radio schedule for services without schedules', async () => {
    const mockCtx = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/korean/bbc_korean_radio/w3ct1vk5',
    } satisfies GetServerSidePropsContext;
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: koreanOnDemandAudio.data,
        status: 200,
      },
    });

    const result = await handleOnDemandAudioRoute(mockCtx);

    renderPage({
      pageData: { ...result.props.pageData, radioScheduleData: undefined },
      service: 'korean',
      lang: 'ko',
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });
});
