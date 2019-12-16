import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import Ad from '.';

shouldMatchSnapshot(
  'should render Ad',
  <ToggleContextProvider>
    <ServiceContextProvider service="news">
      <RequestContextProvider
        isAmp
        id="123"
        pageType="article"
        service="news"
        platform="amp"
        pathname="/news"
      >
        <Ad />
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>,
);
