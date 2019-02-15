import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const goodData = {
    data: articleDataNews,
    isAmp: false,
    service: 'news',
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
        'should render correctly',
        <ArticleContainer data={goodData} />,
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
