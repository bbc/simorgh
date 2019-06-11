import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const ATIAnalytics = require('./index').default;

xdescribe('Page View Analytics Container', () => {
  shouldMatchSnapshot(
    'should render amp page view analytics correctly',
    <RequestContextProvider
      isUK
      origin="https://www.bbc.com"
      platform="amp"
      statsDestination="NEWS_GNL"
    >
      <ServiceContextProvider service="news">
        <ATIAnalytics />
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
        <ATIAnalytics />
      </ServiceContextProvider>
    </RequestContextProvider>,
  );
});
