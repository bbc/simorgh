import React from 'react';
import { string, node } from 'prop-types';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleMain from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '../Article/fixtureData';
import processArticleData from './processArticleData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

jest.mock('../ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const Context = ({ service, children }) => (
  <ToggleContextProvider>
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
  </ToggleContextProvider>
);

Context.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
};

describe('ArticleMain', () => {
  shouldMatchSnapshot(
    'should render a news article correctly',
    <Context service="news">
      <ArticleMain articleData={articleDataNews} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should render a persian article correctly',
    <Context service="persian">
      <ArticleMain articleData={articleDataPersian} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should render a pidgin article correctly (with navigation)',
    <Context service="pidgin">
      <ArticleMain articleData={articleDataPidgin} />
    </Context>,
  );
});

describe('processArticleData', () => {
  it('should process the article data and return the expected object', () => {
    const actual = processArticleData(articleDataNews);
    const expected = {
      firstPublished: '2018-01-01T12:01:00.000Z',
      lastPublished: '2018-01-01T13:00:00.000Z',
      articleSection: null,
      mentionsTags: articleDataNews.metadata.tags.mentions,
      aboutTags: articleDataNews.metadata.tags.about,
      articleSpecificLinkedData: {
        headline: 'Article Headline for SEO',
        datePublished: '2018-01-01T12:01:00.000Z',
        dateModified: '2018-01-01T13:00:00.000Z',
        about: [
          {
            '@type': 'Thing',
            name: 'Royal Wedding 2018',
            sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
          },
          { '@type': 'Person', name: 'Duchess of Sussex' },
        ],
        author: {
          '@type': 'NewsMediaOrganization',
          logo: { '@type': 'ImageObject', width: 1024, height: 576 },
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});
