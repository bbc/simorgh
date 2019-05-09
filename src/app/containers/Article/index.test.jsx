import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
import { articleDataNews, articleDataPersian } from './fixtureData';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

describe('ArticleContainer', () => {
  const newsProps = {
    data: {
      pageData: articleDataNews,
      status: 200,
    },
    isAmp: false,
    service: 'news',
  };

  const persianProps = {
    data: {
      pageData: articleDataPersian,
      status: 200,
    },
    isAmp: false,
    service: 'persian',
  };

  const badData = {
    data: {
      pageData: undefined,
      status: 451,
    },
    isAmp: false,
    service: 'news',
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
        <ArticleContainer {...persianProps} bbcOrigin={bbcOrigin} />,
      );
    });

    describe('non-200 status code', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer {...badData} bbcOrigin={bbcOrigin} />,
      );
    });

    describe('no data or bbcOrigin', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});
