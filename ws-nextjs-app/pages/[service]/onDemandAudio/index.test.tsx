import gahuzaOnDemandAudioEpisode from '#data/gahuza/bbc_gahuza_radio/p0k1qjp9.json';
import gahuzaPodcastPage from '#data/gahuza/bbc_gahuza_radio/p07yh8hb.json';
import pashtoOnDemandAudio from '#data/pashto/bbc_pashto_radio/w3ct26m6.json';
import indonesianOnDemandAudio from '#data/indonesia/bbc_indonesian_radio/w172xybnvm6718v.json';
import swahiliExpiredOnDemandAudio from '#data/swahili/bbc_swahili_radio/w3ct1y1s.json';
import koreanOnDemandAudio from '#data/korean/bbc_korean_radio/w3ct1vk5.json';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import { Services, Variants } from '#app/models/types/global';
import {
  render,
  act,
  fireEvent,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import { GetServerSidePropsContext } from 'next';
import { Helmet } from 'react-helmet';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import _OnDemandAudioPage from './OnDemandAudioLayout';
import { OnDemandAudioProps } from './types';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandAudioRoute from './handleOnDemandAudioRoute';
import getPodcastExternalLinks from './podcastExternalLinks';

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

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

jest.mock('#app/components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>Chartbeat</div>;

  return ChartbeatAnalytics;
});

jest.mock('#app/components/ATIAnalytics', () => () => (
  <div>ATI Analytics</div>
));

jest.mock(
  '#nextjs/pages/[service]/onDemandAudio/podcastExternalLinks',
  () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue([
      {
        linkText: 'Apple Podcasts',
        linkUrl: 'https://apple.test',
        linkType: 'platform',
      },
    ]),
  }),
);

const getLinkedData = () => {
  const linkedDataScript = Helmet.peek().scriptTags.find(
    ({ type }) => type === 'application/ld+json',
  );

  return JSON.parse(linkedDataScript?.innerHTML ?? '{}') as {
    '@graph'?: Array<Record<string, unknown>>;
  };
};

interface PageProps {
  pageData: OnDemandAudioProps['pageData'];
  service: Services;
  variant?: Variants;
  lang?: string;
  pathname?: string;
  toggles?: typeof mockToggles;
  isLite?: boolean;
}

const renderPage = async ({
  pageData,
  service,
  variant,
  lang = 'ko',
  pathname = '/some-podcast',
  toggles = mockToggles,
  isLite = false,
}: PageProps) => {
  let result;

  await act(async () => {
    result = render(
      <ToggleContextProvider toggles={toggles}>
        <OnDemandAudioPage
          service={service}
          pageData={pageData}
        />
      </ToggleContextProvider>,
      {
        service,
        ...(variant && { variant }),
        pageLang: lang,
        bbcOrigin: 'https://www.test.bbc.com',
        pageType: AUDIO_PAGE,
        derivedPageType: 'On Demand Radio',
        pathname,
        isLite,
        statusCode: 200,
        toggles,
      },
    );
  });

  return result;
};

/**
 * Makes the fixture used by each test explicit.
 *
 * Call this with podcast data for podcast tests and radio data
 * for on-demand radio tests.
 */
const mockPageData = (
  pageData: OnDemandAudioProps['pageData'],
) => {
  jest
    .spyOn(getPageDataModule, 'default')
    .mockResolvedValue({
      data: {
        pageData,
        status: 200,
      },
    });
};

const { env } = process;

describe('OnDemand Audio Page', () => {
  const mockSetHeader = jest.fn();

  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl:
      '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c',
    query: {
      service: 'gahuza',
    },
  } satisfies GetServerSidePropsContext;

  const getRouteResult = ({
    pathname,
    pageData,
  }: {
    pathname: string;
    pageData: OnDemandAudioProps['pageData'];
  }) => {
    mockPageData(pageData);

    return handleOnDemandAudioRoute({
      ...mockGetServerSidePropsContext,
      resolvedUrl: pathname,
    });
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1234567890000);

    mockMatchMedia();

    process.env = { ...env };

    // Helmet appends the BUMP loader's inline script to
    // <head>, which jsdom executes.
    // @ts-expect-error requirejs global is not typed on window
    window.require = jest.fn();
  });
    describe('Podcast pages', () => {
    const podcastEpisodePathname =
      '/gahuza/bbc_gahuza_radio/podcasts/p07yh8hb/p0k4x0jm';

    const podcastSeriesPathname =
      '/gahuza/bbc_gahuza_radio/podcasts/p07yh8hb';

    it('should display podcast episode page with PodcastEpisode schema', async () => {
      const result = await getRouteResult({
        pathname: podcastEpisodePathname,
        pageData: gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData'],
      });

      await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastEpisodePathname,
      });

      const graph = getLinkedData()['@graph'] ?? [];

      expect(graph.length).toBeGreaterThan(0);

      const podcastEpisode = graph.find(
        graphEntry =>
          graphEntry['@type'] === 'PodcastEpisode',
      );

      const podcastSeries = graph.find(
        graphEntry =>
          graphEntry['@type'] === 'PodcastSeries',
      );

      const webPageSchema = graph.find(
        graphEntry => graphEntry['@type'] === 'WebPage',
      );

      expect(podcastEpisode).toBeDefined();
      expect(podcastSeries).toBeDefined();
      expect(webPageSchema).toBeDefined();

      const podcastEpisodeId = podcastEpisode?.['@id'];

      expect(podcastEpisodeId).toEqual(
        expect.any(String),
      );

      expect(webPageSchema?.mainEntity).toEqual({
        '@id': podcastEpisodeId,
      });
    });

    it('should include contentUrl and encodingFormat in associatedMedia when download link is present', async () => {
      const downloadUrl =
        'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0k4x06p.mp3';

      jest.mocked(getPodcastExternalLinks).mockResolvedValueOnce([
        {
          linkText: 'Apple Podcasts',
          linkUrl: 'https://apple.test',
          linkType: 'platform',
        },
        {
          linkText: 'Download',
          linkUrl: downloadUrl,
          linkType: 'download',
        },
      ] as never);

      const result = await getRouteResult({
        pathname: podcastEpisodePathname,
        pageData: gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData'],
      });

      await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastEpisodePathname,
      });

      const graph = getLinkedData()['@graph'] ?? [];

      const podcastEpisode = graph.find(
        graphEntry =>
          graphEntry['@type'] === 'PodcastEpisode',
      ) as Record<string, unknown> | undefined;

      const associatedMedia =
        podcastEpisode?.associatedMedia as
          | Record<string, unknown>
          | undefined;

      expect(associatedMedia?.contentUrl).toMatch(
        /^https:\/\/open\.live\.bbc\.co\.uk\/mediaselector\//,
      );

      expect(
        associatedMedia?.encodingFormat,
      ).toBe('audio/mpeg');
    });

    it('should not include contentUrl in associatedMedia when no download link is present', async () => {
      jest.mocked(getPodcastExternalLinks).mockResolvedValueOnce([
        {
          linkText: 'Apple Podcasts',
          linkUrl: 'https://apple.test',
          linkType: 'platform',
        },
      ] as never);

      const result = await getRouteResult({
        pathname: podcastEpisodePathname,
        pageData: gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData'],
      });

      await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastEpisodePathname,
      });

      const graph = getLinkedData()['@graph'] ?? [];

      const podcastEpisode = graph.find(
        graphEntry =>
          graphEntry['@type'] === 'PodcastEpisode',
      ) as Record<string, unknown> | undefined;

      const associatedMedia =
        podcastEpisode?.associatedMedia as
          | Record<string, unknown>
          | undefined;

      expect(
        associatedMedia?.contentUrl,
      ).toBeUndefined();

      expect(
        associatedMedia?.encodingFormat,
      ).toBeUndefined();
    });

    it('should show the external links for podcast pages', async () => {
      const result = await getRouteResult({
        pathname: podcastSeriesPathname,
        pageData: gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastSeriesPathname,
      });

      expect(
        getByText('Iyi podcast iraboneka kandi kuri'),
      ).toBeInTheDocument();
    });

    it('expands a long podcast synopsis when continue reading is clicked', async () => {
      const pageData = {
        ...(gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData']),
        summary: 'This is a podcast episode about interesting topics.',
        longSynopsis:
          'This is a podcast episode about interesting topics. We dive deep into the subject matter with expert guests and detailed analysis. You will learn new perspectives and gain valuable insights. The episode covers multiple angles and provides comprehensive coverage of the topic.',
      };

      const result = await getRouteResult({
        pathname: podcastEpisodePathname,
        pageData: pageData as unknown as OnDemandAudioProps['pageData'],
      });

      const {
        getByTestId,
        queryByTestId,
      } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastEpisodePathname,
      });

      expect(
        getByTestId('continue-reading-button'),
      ).toBeInTheDocument();

      expect(
        getByTestId('synopsis'),
      ).toHaveTextContent('This is a podcast episode');

      fireEvent.click(
        getByTestId('continue-reading-button'),
      );

      expect(
        queryByTestId('continue-reading-button'),
      ).not.toBeInTheDocument();

      expect(
        getByTestId('synopsis'),
      ).toHaveTextContent(
        'This is a podcast episode about interesting topics. We dive deep into the subject matter with expert guests and detailed analysis.',
      );
    });

    it('does not show continue reading on Lite podcast pages', async () => {
      const pageData = {
        ...(gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData']),
        longSynopsis:
          'A longer podcast synopsis to read in full.',
      };

      const result = await getRouteResult({
        pathname: podcastEpisodePathname,
        pageData: pageData as unknown as OnDemandAudioProps['pageData'],
      });

      const {
        getByTestId,
        queryByTestId,
      } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastEpisodePathname,
        isLite: true,
      });

      expect(
        queryByTestId('continue-reading-button'),
      ).not.toBeInTheDocument();

      expect(
        getByTestId('synopsis'),
      ).toHaveTextContent('A longer podcast synopsis');
    });

    it('renders recent episodes when the recent episodes toggle is enabled', async () => {
      const pageData = {
        ...(gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData']),
        recentEpisodes:
          gahuzaPodcastPage.data.recentEpisodes?.slice(
            0,
            1,
          ),
      };

      const result = await getRouteResult({
        pathname: podcastSeriesPathname,
        pageData: pageData as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText, getAllByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastSeriesPathname,
        toggles: {
          ...mockToggles,
          recentPodcastEpisodes: {
            enabled: true,
            value: 1,
          },
        },
      });

      // Check for brand title in header
      expect(
        getAllByText('Baza Muganga')[0],
      ).toBeInTheDocument();

      expect(
        getByText(
          'Ikiganiro cyo kuwa 08/11/2024',
        ),
      ).toBeInTheDocument();
    });

    it('shows multiple external links with different types on podcast pages', async () => {
      const customExternalLinks = [
        {
          linkText: 'Apple Podcasts',
          linkUrl: 'https://podcasts.apple.com/test',
          linkType: 'platform' as const,
        },
        {
          linkText: 'Spotify',
          linkUrl: 'https://spotify.com/test',
          linkType: 'platform' as const,
        },
        {
          linkText: 'Download Episode',
          linkUrl: 'https://download.test/episode.mp3',
          linkType: 'download' as const,
        },
      ];

      jest
        .mocked(getPodcastExternalLinks)
        .mockResolvedValueOnce(customExternalLinks as never);

      const pageDataWithMultipleLinks = {
        ...(gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData']),
        externalLinks: customExternalLinks,
      };

      const result = await getRouteResult({
        pathname: podcastSeriesPathname,
        pageData: pageDataWithMultipleLinks as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText, getAllByRole } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastSeriesPathname,
      });

      expect(getByText('Apple Podcasts')).toBeInTheDocument();
      expect(getByText('Spotify')).toBeInTheDocument();
      expect(getByText('Download')).toBeInTheDocument();

      const links = getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(3);
    });

    it('does not show external links section when links array is empty', async () => {
      const pageDataWithoutLinks = {
        ...(gahuzaPodcastPage.data as unknown as OnDemandAudioProps['pageData']),
        externalLinks: [],
      };

      const result = await getRouteResult({
        pathname: podcastSeriesPathname,
        pageData: pageDataWithoutLinks as unknown as OnDemandAudioProps['pageData'],
      });

      const { queryByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname: podcastSeriesPathname,
      });

      expect(
        queryByText(
          'This podcast is also available on',
        ),
      ).not.toBeInTheDocument();
    });
  });
    describe('On-demand radio pages', () => {
    it('should show the brand title for OnDemand Radio Pages', async () => {
      const pathname =
        '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c';

      const result = await getRouteResult({
        pathname,
        pageData: gahuzaOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const {
        queryByText,
        getByTestId,
      } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname,
      });

      expect(
        getByTestId('brand-title'),
      ).toHaveTextContent("Imvo n'imvano");

      expect(
        queryByText(
          'This podcast is also available on',
        ),
      ).not.toBeInTheDocument();
    });

    it('should show the episode title when it is available', async () => {
      const pathname =
        '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c';

      const result = await getRouteResult({
        pathname,
        pageData: gahuzaOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname,
      });

      const element = getByText(
        "Imvo n'Imvano 16/11/2024",
      );

      expect(element.tagName).toEqual('SPAN');

      await waitFor(() => {
        const actual = document.querySelector(
          'head > title',
        )?.innerHTML;

        expect(actual).toEqual(
          "Imvo n'Imvano 16/11/2024 - Imvo  n'imvano - Gahuza - BBC News Gahuza",
        );
      });
    });

    it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
      const pathname =
        '/pashto/bbc_pashto_radio/w3ct26m6';

      const result = await getRouteResult({
        pathname,
        pageData: pashtoOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'pashto',
        pathname,
      });

      expect(
        getByText('۱۷ می ۲۰۲۱'),
      ).toBeInTheDocument();
    });

    it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
      const pathname =
        '/korean/bbc_korean_radio/w3ct1vk5';

      const result = await getRouteResult({
        pathname,
        pageData: koreanOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'korean',
        pathname,
      });

      expect(
        getByText('2021년 6월 8일'),
      ).toBeInTheDocument();
    });

    it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
      const pathname =
        '/indonesia/bbc_indonesian_radio/w172xybnvm6718v';

      const result = await getRouteResult({
        pathname,
        pageData: indonesianOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'indonesia',
        pathname,
      });

      expect(
        getByText('9 Juni 2021'),
      ).toBeInTheDocument();
    });

    it('should show the summary for OnDemand Radio Pages', async () => {
      const pathname =
        '/gahuza/bbc_gahuza_radio/podcasts/p0k1qjp9';

      const result = await getRouteResult({
        pathname,
        pageData: gahuzaOnDemandAudioEpisode.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByTestId } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname,
      });

      expect(
        getByTestId('summary'),
      ).toHaveTextContent(
        "Imvo n'Imvano yo kuwa gatandatu 02/11/2024",
      );
    });

    it('should show the audio player', async () => {
      const pathname =
        '/korean/bbc_korean_radio/w3ct1vk5';

      const result = await getRouteResult({
        pathname,
        pageData: koreanOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { container } = await renderPage({
        pageData: result.props.pageData,
        service: 'korean',
        pathname,
      });

      const audioPlayer = container.querySelector(
        '[data-e2e="media-loader__container"]',
      );

      expect(audioPlayer).toBeInTheDocument();
    });

    it('should show the expired content message if episode is expired', async () => {
      const pathname =
        '/swahili/bbc_swahili_radio/w3ct1y1s';

      const result = await getRouteResult({
        pathname,
        pageData: swahiliExpiredOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'swahili',
        pathname,
      });

      expect(
        getByText('Taarifa hii haipatikani tena.'),
      ).toBeInTheDocument();
    });

    it("should show the 'content not yet available' message if episode is not yet available", async () => {
      const pathname =
        '/korean/bbc_korean_radio/w3ct1vk5';

      const result = await getRouteResult({
        pathname,
        pageData: {
          ...koreanOnDemandAudio.data,
          episodeAvailability: 'not-yet-available',
        } as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'korean',
        pathname,
      });

      expect(
        getByText(
          '아직 재생할 수 없는 프로그램입니다.',
        ),
      ).toBeInTheDocument();
    });

    it('should show the radio schedule for the On Demand radio page', async () => {
      const pathname =
        '/korean/bbc_korean_radio/w3ct1vk5';

      const result = await getRouteResult({
        pathname,
        pageData: koreanOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByTestId } = await renderPage({
        pageData: result.props.pageData,
        service: 'korean',
        pathname,
      });

      expect(
        getByTestId('radio-schedule'),
      ).toBeInTheDocument();
    });

    it('renders with variant parameter passed through correctly', async () => {
      const pathname =
        '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c';

      const result = await getRouteResult({
        pathname,
        pageData: gahuzaOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByTestId } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        variant: 'default',
        pathname,
      });

      expect(getByTestId('brand-title')).toBeInTheDocument();
    });

    it('renders populated recent episodes when toggle is enabled', async () => {
      const pathname =
        '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c';

      const recentEpisodesData = [
        {
          id: 'p0k39nk4',
          brandTitle: "Imvo n'imvano",
          episodeTitle: 'Imvo n\'Imvano 9/11/2024',
          timestamp: '2024-11-09T00:00:00.000Z',
          duration: 'PT59M',
          image: '//ichef.bbci.co.uk/images/ic/768x432/p0gdh4dw.png',
          altText: "Imvo  n'imvano",
        },
        {
          id: 'p0k1qjp9',
          brandTitle: "Imvo n'imvano",
          episodeTitle: 'Imvo n\'Imvano 2/11/2024',
          timestamp: '2024-11-02T00:00:00.000Z',
          duration: 'PT59M',
          image: '//ichef.bbci.co.uk/images/ic/768x432/p0gdh4dw.png',
          altText: "Imvo  n'imvano",
        },
      ];

      const pageDataWithRecentEpisodes = {
        ...(gahuzaOnDemandAudio.data as unknown as OnDemandAudioProps['pageData']),
        recentEpisodes: recentEpisodesData,
      };

      const result = await getRouteResult({
        pathname,
        pageData: pageDataWithRecentEpisodes as unknown as OnDemandAudioProps['pageData'],
      });

      const { getByText } = await renderPage({
        pageData: result.props.pageData,
        service: 'gahuza',
        pathname,
      });

      expect(
        getByText("Imvo n'Imvano 9/11/2024"),
      ).toBeInTheDocument();
      expect(
        getByText("Imvo n'Imvano 2/11/2024"),
      ).toBeInTheDocument();
    });

    it('should not show the radio schedule for services without schedules', async () => {
      const pathname =
        '/korean/bbc_korean_radio/w3ct1vk5';

      const result = await getRouteResult({
        pathname,
        pageData: koreanOnDemandAudio.data as unknown as OnDemandAudioProps['pageData'],
      });

      const { queryByTestId } = await renderPage({
        pageData: {
          ...result.props.pageData,
          radioScheduleData: undefined,
        },
        service: 'korean',
        lang: 'ko',
        pathname,
      });

      expect(
        queryByTestId('radio-schedule'),
      ).not.toBeInTheDocument();
    });
  });
});