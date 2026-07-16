import {
  ARTICLE_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
  LIVE_TV_PAGE,
  AUDIO_PAGE,
  LIVE_RADIO_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import LanguageNavigation from '#app/legacy/containers/Navigation/LanguageNavigation';
import {
  render,
  act,
  fireEvent,
} from '../react-testing-library-with-providers';
import { ServiceContext } from '../../contexts/ServiceContext';
import { service as newsConfig } from '../../lib/config/services/news';
import { service as indonesiaConfig } from '../../lib/config/services/indonesia';
import Navigation from './index';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

describe('Navigation', () => {
  const navItems = [
    { title: 'Home', url: '/news' },
    { title: 'About', url: '/about' },
  ];

  it('should correctly render canonical navigation', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render amp navigation', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: true,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render canonical navigation on non-home navigation page', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/about',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render amp navigation on non-home navigation page', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: true,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/about',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render canonical navigation on a URL not associated with navigation items', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/not-a-navigation-page',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render amp navigation on a URL not associated with navigation items', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: true,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/not-a-navigation-page',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render navigation links in the correct format', () => {
    const { navigation } = newsConfig.default;

    const { getAllByRole } = render(<Navigation navItems={navigation} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
    });
    const listItems = getAllByRole('listitem');

    (navigation ?? []).forEach((navItem, index) => {
      const link = listItems[index].querySelector('a');
      const href = link?.getAttribute('href');
      expect(href).toEqual(navItem.url);
    });
  });

  it('should prefer navItems prop over service config', () => {
    const { getAllByText, queryAllByText } = render(
      <Navigation navItems={navItems} />,
      {
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: false,
        pageType: ARTICLE_PAGE,
        service: 'news',
        statusCode: 200,
        pathname: '/news',
      },
    );

    expect(getAllByText('Home').length).toBeGreaterThan(0);
    expect(getAllByText('About').length).toBeGreaterThan(0);
    expect(queryAllByText('World')).toHaveLength(0);
  });

  it('should fall back to service config when navItems are not provided', () => {
    const { navigation } = indonesiaConfig.default;

    const { getAllByText } = render(<Navigation />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'indonesia',
      statusCode: 200,
      pathname: '/indonesia',
    });

    const fallbackConfig = navigation?.[0]?.title ?? 'Home';
    const elements = getAllByText(fallbackConfig);

    expect(elements[0]).toBeInTheDocument();
  });

  it('should fall back to service config when navItems are not provided on amp', () => {
    const { navigation } = indonesiaConfig.default;

    const { getAllByText } = render(<Navigation />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: true,
      pageType: ARTICLE_PAGE,
      service: 'indonesia',
      statusCode: 200,
      pathname: '/indonesia',
    });

    const fallbackConfig = navigation?.[0]?.title ?? 'Home';
    const elements = getAllByText(fallbackConfig);

    expect(elements[0]).toBeInTheDocument();
  });

  it('should render nothing when navItems is an empty array', () => {
    const { container } = render(<Navigation navItems={[]} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
    });

    expect(container.firstChild).toBeNull();
  });

  it('should not render listItem in scrollable list when hideOnLiteSite is true and isLite is true', () => {
    const { ...rest } = newsConfig.default;
    const mockNavigation = [
      { title: 'Home', url: '/home', hideOnLiteSite: true, subItems: [] },
      { title: 'News', url: '/news', subItems: [] },
      { title: 'Sport', url: '/sport', subItems: [] },
    ];

    const navigationComponent = (
      <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
        <Navigation navItems={mockNavigation} />
      </ServiceContext.Provider>
    );

    const { queryByText } = render(navigationComponent, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
      isLite: true,
    });

    expect(queryByText(mockNavigation[0].title)).not.toBeInTheDocument();
  });

  it('should render listItem in scrollable list when hideOnLiteSite is true and isLite is false', () => {
    const { ...rest } = newsConfig.default;
    const mockNavigation = [
      { title: 'Home', url: '/home', hideOnLiteSite: true },
      { title: 'News', url: '/news' },
      { title: 'Sport', url: '/sport' },
    ];

    const navigationComponent = (
      <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
        <Navigation navItems={mockNavigation} />
      </ServiceContext.Provider>
    );

    const { queryAllByText } = render(navigationComponent, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
      isLite: false,
    });

    expect(queryAllByText(mockNavigation[0].title)[0]).toBeVisible();
  });

  it('should render listItem in scrollable list when hideOnLiteSite is false/not set', () => {
    const { ...rest } = newsConfig.default;
    const mockNavigation = [
      { title: 'Home', url: '/home', subItems: [] },
      { title: 'News', url: '/news', subItems: [] },
      { title: 'Sport', url: '/sport', subItems: [] },
    ];

    const navigationComponent = (
      <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
        <Navigation navItems={mockNavigation} />
      </ServiceContext.Provider>
    );

    const { queryAllByText } = render(navigationComponent, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/news',
      isLite: false,
    });

    expect(queryAllByText(mockNavigation[0].title)[0]).toBeVisible();
  });

  describe('View and click tracking', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockNavigation = [
      { title: 'Home', url: '/home' },
      { title: 'News', url: '/news' },
      { title: 'Sport', url: '/sport' },
    ];

    it('should call the view tracking hook for both scrollable navigation and dropdown navigation', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<Navigation navItems={mockNavigation} />);

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'scrollable-navigation',
      });
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'dropdown-navigation',
      });
    });

    it('should call the click tracking hook when scrollable navigation is clicked', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      const { getByRole } = render(<Navigation navItems={mockNavigation} />);

      fireEvent.click(getByRole('link', { name: 'Home' }));

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'scrollable-navigation',
      });
    });
  });

  describe('Page-type navigation attribution', () => {
    const commonProps = {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      statusCode: 200,
      service: 'news' as const,
    };

    const navItemsWithWatch = [
      { title: 'Home', url: '/hausa' },
      { title: 'Watch', url: '/hausa/bbc_hausa_tv' },
      { title: 'Listen', url: '/hausa/bbc_hausa_radio/liveradio' },
    ];

    const navItemsWithSubItemWatch = [
      { title: 'Home', url: '/hausa' },
      {
        title: 'Watch',
        url: '/hausa/watch',
        subItems: [{ title: 'Live TV', url: '/hausa/watch/bbc_hausa_tv/live' }],
      },
      { title: 'Listen', url: '/hausa/bbc_hausa_radio/liveradio' },
    ];

    const navItemsWithoutWatchOrListen = [{ title: 'Home', url: '/news' }];

    it('highlights nothing for an article page with no URL match', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithoutWatchOrListen} />,
        {
          ...commonProps,
          pageType: ARTICLE_PAGE,
          pathname: '/news/articles/c0000000000o',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights nothing for an article page with no primaryMediaType, even with Watch/Listen nav items', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} />,
        {
          ...commonProps,
          pageType: ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights Listen nav item for an article page with audio primaryMediaType', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} primaryMediaType="audio" />,
        {
          ...commonProps,
          pageType: ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute(
        'href',
        '/hausa/bbc_hausa_radio/liveradio',
      );
    });

    it('highlights Watch nav item for an article page with video primaryMediaType', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} primaryMediaType="video" />,
        {
          ...commonProps,
          pageType: ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute('href', '/hausa/bbc_hausa_tv');
    });

    it('highlights nothing for an article page with audio primaryMediaType when no Listen nav item exists', () => {
      const { container } = render(
        <Navigation
          navItems={navItemsWithoutWatchOrListen}
          primaryMediaType="audio"
        />,
        {
          ...commonProps,
          pageType: ARTICLE_PAGE,
          pathname: '/news/articles/c0000000000o',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights nothing for a topic page with no URL match', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithoutWatchOrListen} />,
        {
          ...commonProps,
          pageType: TOPIC_PAGE,
          pathname: '/news/topics/c0000000000t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights Watch nav item for a tv page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} />,
        {
          ...commonProps,
          pageType: TV_PAGE,
          pathname: '/hausa/bbc_hausa_tv/tv/w172yjj83ptptnj',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute('href', '/hausa/bbc_hausa_tv');
    });

    it('highlights Watch nav item for a liveTV page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithSubItemWatch} />,
        {
          ...commonProps,
          pageType: LIVE_TV_PAGE,
          pathname: '/hausa/watch/bbc_hausa_tv/live',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute('href', '/hausa/watch');
    });

    it('highlights Watch nav item for a mediaArticle page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} primaryMediaType="video" />,
        {
          ...commonProps,
          pageType: MEDIA_ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute('href', '/hausa/bbc_hausa_tv');
    });

    it('highlights nothing for a video mediaArticle page type when no Watch nav item exists', () => {
      const { container } = render(
        <Navigation
          navItems={navItemsWithoutWatchOrListen}
          primaryMediaType="video"
        />,
        {
          ...commonProps,
          pageType: MEDIA_ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights Listen nav item for an audio mediaArticle page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} primaryMediaType="audio" />,
        {
          ...commonProps,
          pageType: MEDIA_ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute(
        'href',
        '/hausa/bbc_hausa_radio/liveradio',
      );
    });

    it('highlights nothing for an audio mediaArticle page type when no Listen nav item exists', () => {
      const { container } = render(
        <Navigation
          navItems={navItemsWithoutWatchOrListen}
          primaryMediaType="audio"
        />,
        {
          ...commonProps,
          pageType: MEDIA_ARTICLE_PAGE,
          pathname: '/hausa/articles/c1234567890t',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights Listen nav item for an audio page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} />,
        {
          ...commonProps,
          pageType: AUDIO_PAGE,
          pathname: '/hausa/bbc_hausa_radio/audio/w3ct5yzk',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute(
        'href',
        '/hausa/bbc_hausa_radio/liveradio',
      );
    });

    it('highlights Listen nav item for a liveRadio page type', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithWatch} />,
        {
          ...commonProps,
          pageType: LIVE_RADIO_PAGE,
          pathname: '/hausa/bbc_hausa_radio/liveradio',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toHaveAttribute(
        'href',
        '/hausa/bbc_hausa_radio/liveradio',
      );
    });

    it('highlights nothing when on a tv page but no Watch nav item exists', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithoutWatchOrListen} />,
        {
          ...commonProps,
          pageType: TV_PAGE,
          pathname: '/news/bbc_news_tv/tv/w172xyz',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });

    it('highlights nothing when on an audio page but no Listen nav item exists', () => {
      const { container } = render(
        <Navigation navItems={navItemsWithoutWatchOrListen} />,
        {
          ...commonProps,
          pageType: LIVE_RADIO_PAGE,
          pathname: '/news/bbc_news_radio/liveradio',
        },
      );
      const activeLink = container.querySelector('[data-active="true"]');
      expect(activeLink).toBeNull();
    });
  });

  describe('Language Navigation', () => {
    it('should render LanguageNavigation for WS service in all environment', async () => {
      const { getByTestId } = await act(async () =>
        render(<LanguageNavigation />, {
          bbcOrigin: 'https://www.test.bbc.co.uk',
          id: 'c0000000000o',
          isAmp: false,
          pageType: HOME_PAGE,
          service: 'ws',
          statusCode: 200,
          pathname: '/ws/languages',
        }),
      );

      expect(getByTestId('collapsible-nav')).toBeInTheDocument();
    });
  });
});
