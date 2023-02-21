import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import CpsMetadata from './index';

const getISOStringDate = date => new Date(date).toISOString();

const defaultToggles = {
  apple_itunes_app: {
    enabled: false,
  },
};

// eslint-disable-next-line react/prop-types
const Context = ({ service, children, toggles = defaultToggles }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider toggles={toggles}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType={ARTICLE_PAGE}
        pathname="/pathname"
        service={service}
        statusCode={200}
      >
        {children}
      </RequestContextProvider>
    </ToggleContextProvider>
  </ServiceContextProvider>
);

const mapProps = {
  title: articleDataNews.promo.headlines.seoHeadline,
  shortHeadline: articleDataNews.promo.headlines.seoHeadline,
  language: articleDataNews.metadata.passport.language,
  description: articleDataNews.promo.headlines.seoHeadline,
  firstPublished: getISOStringDate(articleDataNews.metadata.firstPublished),
  lastPublished: getISOStringDate(articleDataNews.metadata.lastPublished),
  imageLocator: '6FC4/test/_63721682_p01kx435.jpg',
  imageAltText: 'connectionAltText',
};

describe('CpsMetadata get branded image', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should render the expected metadata tags', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    render(
      <Context service="news">
        <CpsMetadata {...mapProps} />
      </Context>,
    );

    const expected = [
      {
        property: 'og:image',
        content:
          'https://ichef.test.bbci.co.uk/news/1024/branded_news/6FC4/test/_63721682_p01kx435.jpg',
      },
      { property: 'og:image:alt', content: 'connectionAltText' },
      { name: 'twitter:image:alt', content: 'connectionAltText' },
      {
        name: 'twitter:image:src',
        content:
          'https://ichef.test.bbci.co.uk/news/1024/branded_news/6FC4/test/_63721682_p01kx435.jpg',
      },
      { content: 'https://www.facebook.com/bbcnews', name: 'article:author' },
      { content: '2018-01-01T12:01:00.000Z', name: 'article:published_time' },
      { content: '2018-01-01T13:00:00.000Z', name: 'article:modified_time' },
    ];

    await waitFor(() => {
      const actual = Array.from(
        document.querySelectorAll(
          'head > meta[name^="article:"], head > meta[property*="image"], head > meta[name*="image"]',
        ),
      ).map(tag =>
        tag.hasAttribute('property')
          ? {
              property: tag.getAttribute('property'),
              content: tag.getAttribute('content'),
            }
          : {
              name: tag.getAttribute('name'),
              content: tag.getAttribute('content'),
            },
      );

      expect(actual).toEqual(expected);
    });
  });
});

describe('CPS metadata', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
  });

  afterEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  shouldMatchSnapshot(
    'should match snapshot for News & International',
    <Context service="news">
      <CpsMetadata {...mapProps} />
    </Context>,
  );

  describe('with apple_itunes_app enabled for service with iTunesAppId (mundo) and hasAppleItunesAppBanner is true', () => {
    const toggles = {
      apple_itunes_app: {
        enabled: true,
      },
    };

    shouldMatchSnapshot(
      'should match snapshot',
      <Context service="mundo" toggles={toggles}>
        <CpsMetadata {...mapProps} hasAppleItunesAppBanner />
      </Context>,
    );
  });
});
