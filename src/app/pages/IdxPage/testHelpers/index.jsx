import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import IdxPage from '#pages/IdxPage';

// eslint-disable-next-line react/prop-types
const IdxPageWithContext = ({ props, service = 'persian' }) => (
  <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
    <RequestContextProvider
      pageType="IDX"
      service={service}
      pathname="/pathname"
      data={{ status: 200 }}
      isAmp={false}
    >
      <ServiceContextProvider service={service}>
        <IdxPage {...props} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

export default IdxPageWithContext;
