import React from 'react';
import {
  shouldShallowMatchSnapshot,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';
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

  const bbcOrigin = 'https://www.bbc.co.uk';

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
      shouldMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={badData} bbcOrigin={bbcOrigin} />,
      );
    });

    describe('no data or bbcOrigin', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={newsProps} error="error" />,
      );
    });

    describe('loading state', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={newsProps} loading />,
      );
    });

    describe('error state', () => {
      shouldMatchSnapshot(
        'should render correctly',
        <ArticleContainer data={newsProps} error />,
      );
    });
  });
});
