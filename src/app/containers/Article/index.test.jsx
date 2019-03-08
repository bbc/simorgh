import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsProps = {
    data: articleDataNews,
    isAmp: false,
    service: 'news',
    status: 200,
  };

  const persianProps = {
    data: articleDataPersian,
    isAmp: false,
    service: 'persian',
    status: 200,
  };

  const badData = {
    data: undefined,
    isAmp: false,
    service: 'news',
    status: 451,
  };

  describe('Component', () => {
    describe('200 status code', () => {
      shouldShallowMatchSnapshot(
        'should render correctly for news',
        <ArticleContainer data={newsProps} />,
      );
      shouldShallowMatchSnapshot(
        'should render correctly for persian',
        <ArticleContainer data={persianProps} />,
      );
    });

    describe('non-200 status code', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={badData} />,
      );
    });

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});
