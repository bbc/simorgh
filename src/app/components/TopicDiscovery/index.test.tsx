import {
  render,
  screen,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { matchers } from '@emotion/jest';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import { service as portugueseConfig } from '#app/lib/config/services/portuguese';
import { service as turkceConfig } from '#app/lib/config/services/turkce';
import { service as arabicConfig } from '#app/lib/config/services/arabic';
import {
  BLACK,
  GREY_2,
  GREY_4,
  GREY_6,
  GREY_10,
  WHITE,
} from '#app/components/ThemeProvider/palette';
import {
  ARTICLE_PAGE,
  LIVE_TV_PAGE,
  MEDIA_ARTICLE_PAGE,
  TV_PAGE,
} from '../../routes/utils/pageTypes';
import {
  topicTagsFixture,
  multipleTopicsFixture,
  arabicTopicTagsFixture,
  arabicMultipleTopicsFixture,
} from './fixtures';
import useFetchTopicPromos from './useFetchTopicPromos';
import TopicDiscovery from '.';

jest.mock('./useFetchTopicPromos');

expect.extend(matchers);

describe('TopicDiscovery', () => {
  const mockUseFetchTopicPromos = useFetchTopicPromos as jest.MockedFunction<
    typeof useFetchTopicPromos
  >;

  beforeEach(() => {
    mockUseFetchTopicPromos.mockReturnValue({
      topicPromos:
        multipleTopicsFixture[topicTagsFixture[0].topicId].data.items,
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the heading', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('heading', { name: 'Descubra mais' }),
    ).toBeInTheDocument();
  });

  it('should render a section with the topic-discovery test id', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(screen.getByTestId('topic-discovery')).toBeInTheDocument();
  });

  it('should render tabs for each valid topic', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[0].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: topicTagsFixture[2].topicName }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: topicTagsFixture[3].topicName }),
    ).toBeInTheDocument();
  });

  it('should render the first topic as the active tab by default', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[0].topicName }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should render a tabpanel', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('should render promos for the active topic', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    const firstTopicTitle = topicTagsFixture[0].topicName;
    expect(screen.getByText(firstTopicTitle)).toBeInTheDocument();
  });

  it('should switch active topic when a different tab is clicked', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    );

    expect(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    ).toHaveAttribute('aria-selected', 'true');

    const secondTopicTitle = topicTagsFixture[1].topicName;
    expect(screen.getByText(secondTopicTitle)).toBeInTheDocument();
  });

  it('renders the "more about" section with topic title last if {topic} is last in the config', async () => {
    const config: ServiceConfig = { ...portugueseConfig.default };
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topicTagsFixture} />
      </ServiceContext.Provider>,
    );
    // Wait for loading to finish and the link to appear
    const moreAbout = await screen.findByTestId('topic-discovery-more-about');
    expect(moreAbout).toHaveTextContent(
      `Mais sobre ${topicTagsFixture[0].topicName}`,
    );
  });

  it('renders the "more about" section with topic title first if {topic} is first in the config', async () => {
    const config: ServiceConfig = { ...turkceConfig.default };
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topicTagsFixture} />
      </ServiceContext.Provider>,
    );
    // Wait for loading to finish and the link to appear
    const moreAbout = await screen.findByTestId('topic-discovery-more-about');
    expect(moreAbout).toHaveTextContent(
      `${topicTagsFixture[0].topicName} hakkında daha fazla`,
    );
  });

  it('renders the "more about" section with fallback if moreAbout is missing', async () => {
    const portugueseTranslations = {
      ...portugueseConfig.default.translations,
      topicDiscovery: { heading: 'Discover more' },
    };
    const config = {
      ...portugueseConfig.default,
      translations: portugueseTranslations,
    } as ServiceConfig;
    render(
      <ServiceContext.Provider value={config}>
        <TopicDiscovery topics={topicTagsFixture} />
      </ServiceContext.Provider>,
    );
    await screen.findByText(`More about ${topicTagsFixture[0].topicName}`);
  });

  it('renders the "more about" link href using topicUrl when present', async () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    const moreAbout = await screen.findByTestId('topic-discovery-more-about');
    expect(moreAbout).toHaveAttribute('href', topicTagsFixture[0].topicUrl);
  });

  it('falls back to a constructed href when topicUrl is empty', async () => {
    const topicsWithMissingUrl = [
      { ...topicTagsFixture[0], topicUrl: '' },
      ...topicTagsFixture.slice(1),
    ];

    render(<TopicDiscovery topics={topicsWithMissingUrl} />, {
      service: 'portuguese',
    });

    const moreAbout = await screen.findByTestId('topic-discovery-more-about');
    expect(moreAbout).toHaveAttribute(
      'href',
      `/portuguese/topics/${topicTagsFixture[0].topicId}`,
    );
  });

  it('updates the "more about" href with a fallback when switching to a tab with a missing topicUrl', async () => {
    const topicsWithMissingUrl = [
      topicTagsFixture[0],
      { ...topicTagsFixture[1], topicUrl: '' },
      ...topicTagsFixture.slice(2),
    ];

    render(<TopicDiscovery topics={topicsWithMissingUrl} />, {
      service: 'portuguese',
    });

    await screen.findByTestId('topic-discovery-more-about');

    fireEvent.click(
      screen.getByRole('tab', { name: topicTagsFixture[1].topicName }),
    );

    const moreAbout = await screen.findByTestId('topic-discovery-more-about');
    expect(moreAbout).toHaveAttribute(
      'href',
      `/portuguese/topics/${topicTagsFixture[1].topicId}`,
    );
  });

  it('should not render when there are no valid topics', () => {
    const { container } = render(<TopicDiscovery topics={[]} />, {
      service: 'portuguese',
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('renders fetch error message when promos request fails', async () => {
    mockUseFetchTopicPromos.mockReturnValue({
      topicPromos: [],
      isLoading: false,
      isError: true,
    });

    render(<TopicDiscovery topics={topicTagsFixture} />, {
      service: 'portuguese',
    });

    expect(
      await screen.findByText('Falha ao carregar. Tente novamente'),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId('topic-discovery-more-about'),
    ).not.toBeInTheDocument();
  });

  it.each([MEDIA_ARTICLE_PAGE, TV_PAGE, LIVE_TV_PAGE])(
    'should render promo links in dark ui colours for %s pages',
    pageType => {
      render(<TopicDiscovery topics={topicTagsFixture} />, {
        pageType,
        service: 'portuguese',
      });

      const promoLink = screen.getByRole('link', {
        name: /Derrota em dose dupla/,
      });

      const tabPanel = screen.getByRole('tabpanel');

      expect(promoLink).toHaveStyle({ color: GREY_2 });

      expect(tabPanel).toHaveStyleRule('color', GREY_4, {
        target: 'li .promo-text a:visited',
      });
    },
  );

  it('should render media icons in dark ui colours', () => {
    const { container } = render(<TopicDiscovery topics={topicTagsFixture} />, {
      pageType: MEDIA_ARTICLE_PAGE,
      service: 'portuguese',
    });

    expect(
      container.querySelector('[data-e2e="media-icon"]'),
    ).toBeInTheDocument();

    const tabPanel = screen.getByRole('tabpanel');

    expect(tabPanel).toHaveStyleRule('background-color', BLACK, {
      target: 'li .promo-image [data-e2e="media-icon"]',
    });
    expect(tabPanel).toHaveStyleRule('color', WHITE, {
      target: 'li .promo-image [data-e2e="media-icon"]',
    });
    expect(tabPanel).toHaveStyleRule('color', WHITE, {
      target: 'li .promo-image [data-e2e="media-icon"] svg',
    });
  });

  it('should render promo links in light ui colours for article pages', () => {
    render(<TopicDiscovery topics={topicTagsFixture} />, {
      pageType: ARTICLE_PAGE,
      service: 'portuguese',
    });

    const promoLink = screen.getByRole('link', {
      name: /Derrota em dose dupla/,
    });

    const tabPanel = screen.getByRole('tabpanel');

    expect(promoLink).toHaveStyle({ color: GREY_10 });

    expect(tabPanel).toHaveStyleRule('color', GREY_6, {
      target: 'li .promo-text a:visited',
    });
  });

  describe('analytics', () => {
    const groupTracker = {
      itemCount: 4,
      name: 'Descubra mais',
      type: 'topic-discovery',
    };

    it('should call useViewTracker with topic-discovery component name', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'topic-discovery',
        groupTracker,
      });

      viewTrackerSpy.mockRestore();
    });

    it('should call useViewTracker with topic-discovery-fetch-error-message component name when there is a fetch error', async () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      mockUseFetchTopicPromos.mockReturnValue({
        topicPromos: [],
        isLoading: false,
        isError: true,
      });

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'topic-discovery-fetch-error-message',
      });

      viewTrackerSpy.mockRestore();
    });

    it('should call useClickTrackerHandler with topic-discovery-tab-<id> component name and preventNavigation', () => {
      const clickTrackerSpy = jest
        .spyOn(clickTracking, 'default')
        .mockImplementation(() => ({ onClick: jest.fn() }));

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      const expectedCalls = topicTagsFixture.map(topic => ({
        componentName: 'topic-discovery-tab',
        groupTracker,
        itemTracker: {
          type: 'topic-discovery-tab',
          text: topic.topicName,
          position: topicTagsFixture.indexOf(topic) + 1,
          resourceId: topic.topicId,
        },
        preventNavigation: true,
      }));

      expectedCalls.forEach(expectedCall => {
        expect(clickTrackerSpy).toHaveBeenCalledWith(expectedCall);
      });

      clickTrackerSpy.mockRestore();
    });

    it('should call useClickTrackerHandler when "more about" link is clicked', async () => {
      const mockClickHandler = jest.fn();
      jest
        .spyOn(clickTracking, 'default')
        .mockReturnValue({ onClick: mockClickHandler });

      render(<TopicDiscovery topics={topicTagsFixture} />, {
        service: 'portuguese',
      });

      const moreAboutLink = await screen.findByTestId(
        'topic-discovery-more-about',
      );

      fireEvent.click(moreAboutLink);

      expect(mockClickHandler).toHaveBeenCalledTimes(1);

      expect(clickTracking.default).toHaveBeenCalledWith({
        componentName: 'topic-discovery-more-about-link',
        groupTracker,
        itemTracker: {
          type: 'topic-discovery-more-about-link',
          text: `Mais sobre ${topicTagsFixture[0].topicName}`,
          resourceId: topicTagsFixture[0].topicId,
        },
      });
    });
  });

  describe('RTL rendering for Arabic', () => {
    beforeEach(() => {
      mockUseFetchTopicPromos.mockReturnValue({
        topicPromos:
          arabicMultipleTopicsFixture[arabicTopicTagsFixture[0].topicId].data
            .items,
        isLoading: false,
        isError: false,
      });
    });

    it('should set dir attribute to rtl on section element when service is arabic', () => {
      const config: ServiceConfig = { ...arabicConfig.default };
      render(
        <ServiceContext.Provider value={config}>
          <TopicDiscovery topics={arabicTopicTagsFixture} />
        </ServiceContext.Provider>,
      );

      const section = screen.getByTestId('topic-discovery');
      expect(section).toHaveAttribute('dir', 'rtl');
    });

    it('should switch active arabic topic when a different tab is clicked', () => {
      const config: ServiceConfig = { ...arabicConfig.default };
      render(
        <ServiceContext.Provider value={config}>
          <TopicDiscovery topics={arabicTopicTagsFixture} />
        </ServiceContext.Provider>,
      );

      fireEvent.click(
        screen.getByRole('tab', { name: arabicTopicTagsFixture[1].topicName }),
      );

      expect(
        screen.getByRole('tab', { name: arabicTopicTagsFixture[1].topicName }),
      ).toHaveAttribute('aria-selected', 'true');
    });
  });
});
