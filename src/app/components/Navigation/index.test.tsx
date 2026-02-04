import { fireEvent } from '@testing-library/dom';
// import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  //  ServiceContextProvider,
  ServiceContext,
} from '#contexts/ServiceContext';
import * as viewTracking from '#app/hooks/useViewTracker';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { service as newsConfig } from '#lib/config/services/news';
import { service as indonesiaConfig } from '#lib/config/services/indonesia';
// import { within } from '@testing-library/react';
import { render, act } from '../react-testing-library-with-providers';
import Navigation from './index';

describe('Navigation Container', () => {
  it('should correctly render amp navigation', () => {
    const { container } = render(<Navigation />, {
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

  it('should correctly render canonical navigation', () => {
    const { container } = render(<Navigation />, {
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

  it('should correctly render amp navigation on non-home navigation page', () => {
    const { container } = render(<Navigation />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: true,
      pageType: ARTICLE_PAGE,
      service: 'news',
      statusCode: 200,
      pathname: '/uk',
    });
    expect(container).toMatchSnapshot();
  });

  it('should correctly render canonical navigation on non-home navigation page', () => {
    const { container } = render(<Navigation />, {
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

  it('should correctly render amp navigation on non-navigation page', () => {
    const { container } = render(<Navigation />, {
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

  it('should correctly render canonical navigation on non-navigation page', () => {
    const { container } = render(<Navigation />, {
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

  // it.skip('should not render listItem in scrollable list when hideOnLiteSite is true and isLite is true', () => {
  //   const { ...rest } = newsConfig.default;
  //   const mockNavigation = [
  //     { title: 'Home', url: '/home', hideOnLiteSite: true },
  //     { title: 'News', url: '/news' },
  //     { title: 'Sport', url: '/sport' },
  //   ];

  //   const navigationComponent = (
  //     <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
  //       <Navigation />
  //     </ServiceContext.Provider>
  //   );

  //   const { getAllByText, container } = render(navigationComponent, {
  //     bbcOrigin: 'https://www.test.bbc.co.uk',
  //     id: 'c0000000000o',
  //     isAmp: false,
  //     pageType: ARTICLE_PAGE,
  //     service: 'news',
  //     statusCode: 200,
  //     pathname: '/news',
  //     isLite: true,
  //   });

  //   const scrollableList = container.querySelector('[role="list"]');
  //   expect(scrollableList).toBeInTheDocument();

  //   if (scrollableList) {
  //     // Only "News" and "Sport" should be inside the scrollable list
  //     const newsInList = within(scrollableList as HTMLElement).queryByText(
  //       'News',
  //     );
  //     const sportInList = within(scrollableList as HTMLElement).queryByText(
  //       'Sport',
  //     );
  //     const homeInList = within(scrollableList as HTMLElement).queryByText(
  //       'Home',
  //     );

  //     expect(newsInList).toBeVisible();
  //     expect(sportInList).toBeVisible();
  //     expect(homeInList).toBeNull();
  //   }

  //   // "Home" should be rendered somewhere outside the scrollable list
  //   const homeElements = getAllByText('Home');
  //   expect(homeElements.length).toBeGreaterThan(0);
  //   homeElements.forEach(element => {
  //     expect(element.closest('[role="list"]') as HTMLElement | null).toBeNull();
  //   });
  // });

  it('should prefer navItems prop over service config', () => {
    const navItems = [
      { title: 'Home', url: '/home' },
      { title: 'About', url: '/about' },
    ];

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
    const { navigation = [] } = indonesiaConfig.default;

    const { getAllByText } = render(<Navigation navItems={null} />, {
      bbcOrigin: 'https://www.test.bbc.co.uk',
      id: 'c0000000000o',
      isAmp: false,
      pageType: ARTICLE_PAGE,
      service: 'indonesia',
      statusCode: 200,
      pathname: '/indonesian',
    });

    navigation.forEach(({ title }) => {
      const elements = getAllByText(title);
      elements.forEach(element => {
        expect(element).toHaveTextContent(title);
      });
    });
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

  it.skip('should not render listItem in scrollable list when hideOnLiteSite is true and isLite is true', () => {
    const { ...rest } = newsConfig.default;
    const mockNavigation = [
      { title: 'Home', url: '/home', hideOnLiteSite: true },
      { title: 'News', url: '/news' },
      { title: 'Sport', url: '/sport' },
    ];

    const navigationComponent = (
      <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
        <Navigation />
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
        <Navigation />
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
      { title: 'Home', url: '/home' },
      { title: 'News', url: '/news' },
      { title: 'Sport', url: '/sport' },
    ];

    const navigationComponent = (
      <ServiceContext.Provider value={{ navigation: mockNavigation, ...rest }}>
        <Navigation />
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
    const scrollEventTrackingData = {
      componentName: 'scrollable-navigation',
    };

    const dropdownEventTrackingData = {
      componentName: 'dropdown-navigation',
    };

    const clickTrackerSpy = jest
      .spyOn(clickTracking, 'default')
      .mockImplementation();

    beforeEach(() => {
      clickTrackerSpy.mockRestore();
    });

    it('should call the view tracking hook when on scrollable navigation', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<Navigation />, {
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
      render(<Navigation />, {
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
      const { container } = render(<Navigation />, {
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
        render(<Navigation />, {
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
