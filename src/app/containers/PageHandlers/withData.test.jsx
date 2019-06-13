import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import {
  shouldShallowMatchSnapshot,
  shouldMatchSnapshot,
} from '../../../testHelpers';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import WithData from './withData';
import { ServiceContext } from '../../contexts/ServiceContext';

const newsServiceContextStub = {
  locale: 'en_GB',
  brandName: 'BBC News',
  brandSVG,
  translations: {
    error: {
      404: {
        title: 'Page cannot be found',
        solutions: [
          'Double checking the url',
          'Hitting the refresh button in your browser',
          'Searching for this page using the BBC search bar',
        ],
      },
      500: {
        title: 'Internal server error',
        solutions: [
          'Hitting the refresh button in your browser',
          'Coming back again later',
        ],
      },
    },
  },
};

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
  };

  const validPersianProps = {
    data: {
      pageData: articleDataPersian,
      status: 200,
    },
  };

  const WithDataHOCWithContext = (props, context = newsServiceContextStub) => (
    <ServiceContext.Provider value={context}>
      <WithDataHOC {...props} />
    </ServiceContext.Provider>
  );

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
    shouldMatchSnapshot(
      `should return the passed in component`,
      WithDataHOCWithContext(validNewsProps),
    );

    describe('but different home service other than locale service', () => {
      shouldMatchSnapshot(
        `should return the errorMain component`,
        WithDataHOCWithContext(validPersianProps),
      );
    });
  });

  describe('with non 200 status', () => {
    shouldMatchSnapshot(
      `should return the errorMain component`,
      WithDataHOCWithContext(non200StatusProps),
    );
  });
});
