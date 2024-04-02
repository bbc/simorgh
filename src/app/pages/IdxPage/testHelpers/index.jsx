import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import IdxPage from '#pages/IdxPage/IdxPage';
import { INDEX_PAGE } from '#app/routes/utils/pageTypes';
import { service as ukrainianConfig } from '../../../lib/config/services/ukrainian';
import { service as persianConfig } from '../../../lib/config/services/persian';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { ThemeProvider } from '../../../components/ThemeProvider';

const radioServiceOverride = 'dari';

const serviceContext = {
  ukrainian: ukrainianConfig['ru-UA'],
  persian: persianConfig.default,
};

/* eslint-disable react/prop-types */
const IdxPageWithContext = ({ service = 'persian', pageData }) => {
  return (
    <BrowserRouter>
      <ToggleContextProvider>
        <RequestContextProvider
          pageType={INDEX_PAGE}
          service={service}
          pathname="/pathname"
          data={{ status: 200 }}
          isAmp={false}
        >
          <ServiceContext.Provider value={serviceContext[service]}>
            <UserContextProvider>
              <ThemeProvider service={service}>
                <IdxPage
                  pageData={pageData}
                  radioScheduleEndpointOverride={`./data/${service}/bbc_${radioServiceOverride}_radio/schedule.json`}
                />
              </ThemeProvider>
            </UserContextProvider>
          </ServiceContext.Provider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </BrowserRouter>
  );
};
export default IdxPageWithContext;
