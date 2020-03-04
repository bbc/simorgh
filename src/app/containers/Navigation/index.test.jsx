import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { service as newsConfig } from '#lib/config/services/news';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Navigation from './index';

describe('Navigation Container', () => {
  shouldMatchSnapshot(
    'should correctly render amp navigation',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/news"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical navigation',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/news"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render amp navigation on non-home navigation page',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/uk"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical navigation on non-home navigation page',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/uk"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render amp navigation on non-navigation page',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/not-a-navigation-page"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical navigation on non-navigation page',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
        statusCode={200}
        pathname="/not-a-navigation-page"
      >
        <Navigation />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  it('should render navigation links in the correct format', () => {
    const { navigation } = newsConfig.default;

    const navigationComponent = (
      <ServiceContextProvider service="news">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          id="c0000000000o"
          isAmp={false}
          pageType="article"
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
