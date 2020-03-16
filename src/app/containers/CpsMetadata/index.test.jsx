import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import CpsMetadata from './index';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';

const getISOStringDate = date => new Date(date).toISOString();

// eslint-disable-next-line react/prop-types
const Context = ({ service, children }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      pathname="/pathname"
      service={service}
      statusCode={200}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

const mapProps = {
  title: articleDataNews.promo.headlines.seoHeadline,
  language: articleDataNews.metadata.passport.language,
  description: articleDataNews.promo.headlines.seoHeadline,
  firstPublished: getISOStringDate(articleDataNews.metadata.firstPublished),
  lastPublished: getISOStringDate(articleDataNews.metadata.lastPublished),
  imageLocator: '6FC4/test/_63721682_p01kx435.jpg',
  imageAltText: 'connectionAltText',
};

const renderMetadataToDocument = async Component => {
  render(Component);

  await waitForDomChange({
    container: document.querySelector('head'),
  });
};

describe('CpsMetadata get branded image', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should render the expected metadata tags', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    await renderMetadataToDocument(
      <Context service="news">
        <CpsMetadata {...mapProps} />
      </Context>,
    );

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

    const expected = [
      {
        property: 'og:image',
        content:
          'http://ichef.test.bbci.co.uk/news/1024/branded_news/6FC4/test/_63721682_p01kx435.jpg',
      },
      { property: 'og:image:alt', content: 'connectionAltText' },
      { name: 'twitter:image:alt', content: 'connectionAltText' },
      {
        name: 'twitter:image:src',
        content:
          'http://ichef.test.bbci.co.uk/news/1024/branded_news/6FC4/test/_63721682_p01kx435.jpg',
      },
      { content: 'https://www.facebook.com/bbcnews', name: 'article:author' },
      { content: '2018-01-01T12:01:00.000Z', name: 'article:published_time' },
      { content: '2018-01-01T13:00:00.000Z', name: 'article:modified_time' },
    ];

    expect(actual).toEqual(expected);
  });
});

shouldMatchSnapshot(
  'should match snapshot for News & International',
  <Context service="news">
    <CpsMetadata {...mapProps} />
  </Context>,
);
