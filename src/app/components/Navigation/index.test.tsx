import { fireEvent } from '@testing-library/dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import LanguageNavigation from '#app/legacy/containers/Navigation/LanguageNavigation';
import { render, act } from '../react-testing-library-with-providers';
import {
  ServiceContextProvider,
  ServiceContext,
} from '../../contexts/ServiceContext';
import { service as newsConfig } from '../../lib/config/services/news';
import { service as indonesiaConfig } from '../../lib/config/services/indonesia';
import Navigation from './index';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

describe('Navigation', () => {
  beforeEach(() => {
    jest.spyOn(clickTracking, 'default').mockReturnValue({
      onClick: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const navItems = [
    { title: 'Home', url: '/home' },
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

  it('should correctly render canonical navigation on non-home navigation page', () => {
    const { container } = render(<Navigation navItems={navItems} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/uk',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render canonical navigation on non-navigation page', () => {
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

  it('should render navigation links in the correct format', () => {
    const { navigation } = newsConfig.default;

    const navigationComponent = (
      <ServiceContextProvider service="news">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          id="c0000000000o"
          isAmp={false}
          pageType={ARTICLE_PAGE}
          service="news"
          statusCode={200}
          pathname="/news"
        >
          <Navigation navItems={navigation ?? []} />
        </RequestContextProvider>
      </ServiceContextProvider>
    );

    const { getAllByRole } = render(navigationComponent);
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

  it('should fall back to service config when navItems is null', () => {
    const { navigation } = indonesiaConfig.default;

    const { getAllByText } = render(
      <Navigation {...({ navItems: undefined } as any)} />,
      {
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: false,
        pageType: ARTICLE_PAGE,
        service: 'indonesia',
        statusCode: 200,
        pathname: '/indonesia',
      },
    );

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
    const { navigation, ...rest } = newsConfig.default;
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
    const { navigation, ...rest } = newsConfig.default;
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
    const { navigation, ...rest } = newsConfig.default;
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
    const mockNavigation = [
      { title: 'Home', url: '/home' },
      { title: 'News', url: '/news' },
      { title: 'Sport', url: '/sport' },
    ];

    const scrollEventTrackingData = {
      componentName: 'scrollable-navigation',
    };

    const dropdownEventTrackingData = {
      componentName: 'dropdown-navigation',
    };

    it('should call the view tracking hook when on scrollable navigation', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<Navigation navItems={mockNavigation} />, {
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: true,
        pageType: ARTICLE_PAGE,
        service: 'news',
        statusCode: 200,
        pathname: '/news',
      });
      expect(viewTrackerSpy).toHaveBeenCalledWith(scrollEventTrackingData);
    });

    it('should call the view tracking hook when on dropdown navigation', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<Navigation navItems={mockNavigation} />, {
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: true,
        pageType: ARTICLE_PAGE,
        service: 'news',
        statusCode: 200,
        pathname: '/news',
      });
      expect(viewTrackerSpy).toHaveBeenCalledWith(dropdownEventTrackingData);
    });

    it('should call the click tracking hook when scrollable navigation is clicked', () => {
      const { container } = render(<Navigation navItems={mockNavigation} />, {
        bbcOrigin: 'https://www.test.bbc.co.uk',
        id: 'c0000000000o',
        isAmp: true,
        pageType: ARTICLE_PAGE,
        service: 'news',
        statusCode: 200,
        pathname: '/news',
      });

      fireEvent.click(container);

      expect(container.onclick).toBeTruthy();
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
