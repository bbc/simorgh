import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import IdxPage from '#pages/IdxPage';

const radioServiceOverride = 'dari';

// eslint-disable-next-line react/prop-types
const IdxPageWithContext = ({ service = 'persian', pageData }) => (
  <BrowserRouter>
    <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
      <RequestContextProvider
        pageType="IDX"
        service={service}
        pathname="/pathname"
        data={{ status: 200 }}
        isAmp={false}
      >
        <ServiceContextProvider service={service}>
          <IdxPage
            pageData={pageData}
            radioScheduleEndpointOverride={`./data/${service}/bbc_${radioServiceOverride}_radio/schedule.json`}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

export default IdxPageWithContext;
