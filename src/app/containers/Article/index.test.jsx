import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsData = {
    articleData: { data: articleDataNews, isAmp: false, service: 'news' },
    status: 200,
  };

  // temporary: will be removed with https://github.com/bbc/simorgh/issues/836
  const newsDataNoHeadline = JSON.parse(JSON.stringify(newsData));
  newsDataNoHeadline.articleData.data.content.model.blocks.shift();

  const persianData = {
    articleData: {
      data: articleDataPersian,
      isAmp: false,
      service: 'persian',
    },
    status: 200,
  };

  describe('Component', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <ArticleContainer data={newsData} />,
    );

    shouldShallowMatchSnapshot(
      'should render Persian article correctly',
      <ArticleContainer data={persianData} />,
    );

    shouldShallowMatchSnapshot(
      'should render null if no headline block',
      <ArticleContainer data={newsDataNoHeadline} />,
    );

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});
