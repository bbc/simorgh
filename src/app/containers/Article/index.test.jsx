import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsData = { data: articleDataNews, amp: false, service: 'news' };

  const persianData = {
    data: articleDataPersian,
    amp: false,
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

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});
