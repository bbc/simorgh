import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { service as newsConfig } from '../../../lib/config/services/news';
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
          <Navigation />
        </RequestContextProvider>
      </ServiceContextProvider>
    );

    const { getAllByRole } = render(navigationComponent);
    const listItems = getAllByRole('listitem');

    navigation.forEach((navItem, index) => {
      const link = listItems[index].querySelector('a');
      const href = link.getAttribute('href');
      expect(href).toEqual(navItem.url);
    });
  });
});
