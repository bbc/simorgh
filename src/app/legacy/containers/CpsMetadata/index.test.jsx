import React from 'react';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';
import {
  render,
  waitFor,
} from '#components/react-testing-library-with-providers';
import CpsMetadata from './index';

const getISOStringDate = date => new Date(date).toISOString();

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

    render(<CpsMetadata {...mapProps} />, { service: 'news' });

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

  it('should match snapshot for News & International', () => {
    const { container } = render(<CpsMetadata {...mapProps} />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  describe('with apple_itunes_app enabled for service with iTunesAppId (mundo) and hasAppleItunesAppBanner is true', () => {
    const toggles = {
      apple_itunes_app: {
        enabled: true,
      },
    };

    it('should match snapshot', () => {
      const { container } = render(
        <CpsMetadata {...mapProps} hasAppleItunesAppBanner />,
        {
          service: 'mundo',
          toggles: { toggles },
        },
      );
      expect(container).toMatchSnapshot();
    });
  });
});
