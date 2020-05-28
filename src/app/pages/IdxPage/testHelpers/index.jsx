import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import IdxPage from '#pages/IdxPage';

const IDXPageWithContext = props => (
  <ToggleContextProvider service="pidgin" origin="https://www.test.bbc.com">
    <RequestContextProvider
      pageType="IDX"
      service="persian"
      pathname="/pathname"
      data={{ status: 200 }}
      isAmp={false}
    >
      <ServiceContextProvider service="persian">
        <IdxPage {...props} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

export default IDXPageWithContext;
