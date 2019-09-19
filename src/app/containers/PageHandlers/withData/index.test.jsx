import React from 'react';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { articleDataNews, articleDataPersian } from '../../Article/fixtureData';
import WithData from '.';
import frontPageDataPidgin from '#data/pidgin/frontpage';

jest.mock('../../ErrorMain', () => () => <h1>This is an error.</h1>);

describe('withData HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const WithDataHOC = WithData(Component);

  const noDataProps = {
    data: null,
  };

  const noAssetData = {
    data: {
      status: 200,
    },
  };

  const non200StatusProps = {
    data: {
      pageData: articleDataNews,
      status: 157,
    },
  };

  const validNewsProps = {
    data: {
      pageData: articleDataNews,
      status: 200,
    },
    service: 'news',
  };

  const validPersianProps = {
    data: {
      pageData: articleDataPersian,
      status: 200,
    },
    service: 'news',
  };

  const validFrontPagesProps = {
    data: {
      pageData: frontPageDataPidgin,
      status: 200,
    },
  };

  describe('with no data', () => {
    suppressPropWarnings(['data.dials', 'undefined']);
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
