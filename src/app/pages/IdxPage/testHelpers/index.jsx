import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import IdxPage from '..';

const radioServiceOverride = 'dari';

jest.mock('#lib/config/toggles', () => ({
  local: {
    enableFetchingToggles: { enabled: false },
    chartbeatAnalytics: {
      enabled: true,
    },
    radioSchedule: {
      enabled: true,
    },
    mostRead: {
      enabled: true,
    },
  },
}));

/* eslint-disable react/prop-types */
const IdxPageWithContext = ({
  service = 'persian',
  variant = 'default',
  pageData,
}) => {
  return (
    <BrowserRouter>
      <IdxPage
        pageData={pageData}
        mostReadEndpointOverride={getLocalMostReadEndpoint({ service })}
        radioScheduleEndpointOverride={`./data/${service}/bbc_${radioServiceOverride}_radio/schedule.json`}
        pageType="IDX"
        service={service}
        variant={variant}
        pathname="/pathname"
        data={{ status: 200 }}
        isAmp={false}
        origin="https://www.test.bbc.com"
        bbcOrigin="https://www.test.bbc.com"
        status={200}
      />
    </BrowserRouter>
  );
};
export default IdxPageWithContext;
