import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import { articleDataNews } from '../Article/fixtureData';
import WithData from './withData';

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

  const validProps = {
    data: {
      pageData: articleDataNews,
      status: 200,
    },
  };

  describe('with no data', () => {
    shouldShallowMatchSnapshot(
      `should return the errorMain component and 500 status`,
      <WithDataHOC {...noDataProps} />,
    );
  });

  describe('with missing articleData', () => {
    shouldShallowMatchSnapshot(
      `should return the errorMain component`,
      <WithDataHOC {...noAssetData} />,
    );
  });

  describe('with valid props', () => {
    shouldShallowMatchSnapshot(
      `should return the passed in component`,
      <WithDataHOC {...validProps} />,
    );
  });

  describe('with non 200 status', () => {
    shouldShallowMatchSnapshot(
      `should return the errorMain component`,
      <WithDataHOC {...non200StatusProps} />,
    );
  });
});
