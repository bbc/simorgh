import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { UserContextProvider } from '#contexts/UserContext';
import IdxPage from '#pages/IdxPage';

// eslint-disable-next-line react/prop-types
const IdxPageWithContext = ({ service = 'persian', ...props }) => (
  <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
    <RequestContextProvider
      pageType="IDX"
      service={service}
      pathname="/pathname"
      data={{ status: 200 }}
      isAmp={false}
    >
      <ServiceContextProvider service={service}>
        <UserContextProvider>
          <IdxPage {...props} />
        </UserContextProvider>
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

export default IdxPageWithContext;
