import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

jest.mock('./Canonical', () => () => <div>Canonical page view analytics</div>);

const PageViewAnalytics = require('./index').default;

describe('Page View Analytics Container', () => {
  shouldMatchSnapshot(
    'should render amp page view analytics correctly',
    <RequestContextProvider
      isUK
      origin="https://www.bbc.com"
      platform="amp"
      statsDestination="NEWS_GNL"
    >
      <ServiceContextProvider service="news">
        <PageViewAnalytics />
      </ServiceContextProvider>
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should render canonical page view analytics correctly',
    <RequestContextProvider
      isUK
      origin="https://www.bbc.com"
      platform="canonical"
      statsDestination="NEWS_GNL"
    >
      <ServiceContextProvider service="news">
        <PageViewAnalytics />
      </ServiceContextProvider>
    </RequestContextProvider>,
  );
});
