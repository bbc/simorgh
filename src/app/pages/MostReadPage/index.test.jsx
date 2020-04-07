import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import MostReadPage from '.';
import pidginMostReadData from '#data/pidgin/mostRead';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';

fetch.mockResponse(JSON.stringify(pidginMostReadData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('Most Read Page Main', () => {
  it('should match snapshot for Canonical', async () => {
    await matchSnapshotAsync(
      <ToggleContextProvider service="pidgin" origin="https://www.test.bbc.com">
        <ServiceContextProvider service="amharic">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.com"
            isAmp={false}
            pageType="mostRead"
            pathname="/pathname"
            service="pidgin"
            statusCode={200}
          >
            <BrowserRouter>
              <MostReadPage pageData={pidginMostReadData} />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>,
    );
  });
});
