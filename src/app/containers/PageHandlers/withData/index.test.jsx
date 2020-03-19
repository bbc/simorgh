import React from 'react';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import {
  articleDataNews,
  articleDataPersian,
} from '#pages/ArticlePage/fixtureData';
import WithData from '.';
import frontPageDataPidgin from '#data/pidgin/frontpage';

// eslint-disable-next-line react/prop-types
jest.mock('#pages/ErrorPage', () => ({ errorCode }) => (
  <h1>This is a {errorCode} error.</h1>
));

describe('withData HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>Hola</h1>;
  const WithDataHOC = WithData(Component);

  const noDataProps = {
    status: 500,
  };

  const noAssetData = {
    status: 200,
  };

  const non200StatusProps = {
    pageData: articleDataNews,
    status: 157,
  };

  const validNewsProps = {
    pageData: articleDataNews,
    status: 200,
    service: 'news',
  };

  const validPersianProps = {
    pageData: articleDataPersian,
    status: 200,
    service: 'news',
  };

  const validFrontPagesProps = {
    pageData: frontPageDataPidgin,
    status: 200,
  };

  describe('with no data', () => {
    shouldMatchSnapshot(
      'should return the errorMain component and 500 status',
      <WithDataHOC {...noDataProps} />,
    );
  });

  describe('with missing pageData', () => {
    suppressPropWarnings(['data.pageData', 'undefined']);
    shouldMatchSnapshot(
      'should return the errorMain component',
      <WithDataHOC {...noAssetData} />,
    );
  });

  describe('with valid articles data', () => {
    shouldMatchSnapshot(
      'should return the passed in component',
      <WithDataHOC {...validNewsProps} />,
    );

    describe('but different home service other than locale service', () => {
      shouldMatchSnapshot(
        'should return the errorMain component',
        <WithDataHOC {...validPersianProps} />,
      );
    });
  });

  describe('with valid front-pages data', () => {
    shouldMatchSnapshot(
      'should return the passed in component',
      <WithDataHOC {...validFrontPagesProps} />,
    );
  });

  describe('with non 200 status', () => {
    shouldMatchSnapshot(
      'should return the errorMain component',
      <WithDataHOC {...non200StatusProps} />,
    );
  });
});
