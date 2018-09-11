import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const articleData = {
    metadata: {
      id: 'urn:bbc:ares::article:c0000000001o',
      locators: {
        optimoUrn: 'urn:bbc:optimo:asset:c0000000001o',
      },
      type: 'article',
      createdBy: '',
      blockId: 'a-1',
      created: 1514808060000,
      firstPublished: 1514808060000,
      lastPublished: 1514811600000,
      lastUpdated: 1514811600000,
      passport: {
        language: 'en-gb',
        home: 'http://www.bbc.co.uk/ontologies/passport/home/News',
        category: 'news',
        genre: null,
      },
    },
    content: {
      model: {
        blocks: [
          {
            blockId: 'h-1',
            type: 'headline',
            model: {
              blocks: [
                {
                  blockId: 't-1',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        blockId: 'p-1',
                        model: {
                          text: 'Article Headline',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'text',
            blockId: 't-2',
            model: {
              blocks: [
                {
                  blockId: 'p-2',
                  type: 'paragraph',
                  model: {
                    text: 'A paragraph.',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    promo: {
      id: 'urn:bbc:ares::article:c0000000001o',
      headlines: {
        seoHeadline: 'Article Headline for SEO',
        promoHeadline: 'Article Headline for Promo',
      },
      locators: {
        optimoUrn: 'urn:bbc:optimo:asset:c0000000001o',
      },
      summary: 'Article summary.',
      timestamp: 1514811600000,
    },
  };

  const data = {
    data: articleData,
    amp: false,
  };

  describe('Component', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <ArticleContainer data={data} />,
    );

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});
