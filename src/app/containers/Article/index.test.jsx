import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsProps = {
    data: articleDataNews,
    loading: false,
    error: null,
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

  const loadingProps = {
    loading: true,
    error: null,
    isAmp: false,
    service: 'news',
    status: 200,
  };

  const bbcOrigin = 'https://www.bbc.co.uk';

  jest.mock('../PageHandlers/withPageWrapper', () => ({
    WithPageWrapper: () => Component => props => <Component {...props} />,
  }));

  jest.mock('../PageHandlers/withLoading', () => ({
    WithLoading: () => Component => props => <Component {...props} />,
  }));

  jest.mock('../PageHandlers/withError', () => ({
    WithError: () => Component => props => <Component {...props} />,
  }));

  jest.mock('../PageHandlers/withData', () => ({
    WithData: () => Component => props => <Component {...props} />,
  }));

  describe('Component', () => {
    describe('200 status code', () => {
      shouldShallowMatchSnapshot(
        'should render correctly for news',
        <ArticleContainer {...newsProps} bbcOrigin={bbcOrigin} />,
      );
      shouldShallowMatchSnapshot(
        'should render correctly for persian',
        <ArticleContainer data={persianProps} bbcOrigin={bbcOrigin} />,
      );
    });

    describe('non-200 status code', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={badData} bbcOrigin={bbcOrigin} />,
      );
    });

    describe('no data or bbcOrigin', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer error />,
      );
    });

    describe('loading state', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer {...loadingProps} />,
      );
    });

    describe('error state', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer error />,
      );
    });
  });
});
