import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsData = { data: articleDataNews, isAmp: false, service: 'news' };

  // temporary: will be removed with https://github.com/BBC-News/simorgh/issues/836
  const newsDataNoHeadline = JSON.parse(JSON.stringify(newsData));
  newsDataNoHeadline.data.content.model.blocks.shift();

  const persianData = {
    data: articleDataPersian,
    isAmp: false,
    service: 'persian',
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
