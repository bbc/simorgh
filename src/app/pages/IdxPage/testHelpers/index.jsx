import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { service as ukrainianConfig } from '#lib/config/services/ukrainian';
import { service as persianConfig } from '#lib/config/services/persian';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContextProvider } from '#contexts/UserContext';
import IdxPage from '#pages/IdxPage';

const radioServiceOverride = 'dari';

const serviceContext = {
  ukrainian: ukrainianConfig['ru-UA'],
  persian: persianConfig.default,
};

/* eslint-disable react/prop-types */
const IdxPageWithContext = ({ service = 'persian', pageData }) => {
  return (
    <BrowserRouter>
      <ToggleContextProvider
        service={service}
        origin="https://www.test.bbc.com"
        remoteToggles={{
          service,
          ads: {
            enabled: false,
          },
        }}
      >
        <RequestContextProvider
          pageType="IDX"
          service={service}
          pathname="/pathname"
          data={{ status: 200 }}
          isAmp={false}
        >
          <ServiceContext.Provider value={serviceContext[service]}>
            <UserContextProvider>
              <IdxPage
                pageData={pageData}
                mostReadEndpointOverride={getLocalMostReadEndpoint({ service })}
                radioScheduleEndpointOverride={`./data/${service}/bbc_${radioServiceOverride}_radio/schedule.json`}
              />
            </UserContextProvider>
          </ServiceContext.Provider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </BrowserRouter>
  );
};
export default IdxPageWithContext;
