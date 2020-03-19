/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandRadioPage from '.';
import pashtoPageData from '#data/pashto/bbc_pashto_radio/w172x8nvf4bchz5';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import getInitialData from '#app/routes/onDemandRadio/getInitialData';

const createAssetPage = (pageData, service) => (
  <StaticRouter>
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType="media"
          pathname="/pathname"
          service={service}
          statusCode={200}
        >
          <OnDemandRadioPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </StaticRouter>
);

fetch.mockResponse(JSON.stringify(pashtoPageData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('OnDemand Radio Page ', () => {
  it('should match snapshot for Canonical', async () => {
    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(
      <ToggleContextProvider>
        <ServiceContextProvider service="pashto">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            pageType="media"
            pathname="/pathname"
            service="pashto"
            statusCode={200}
          >
            <BrowserRouter>
              <OnDemandRadioPage service="pashto" pageData={pageData} />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(
      <ToggleContextProvider>
        <ServiceContextProvider service="pashto">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp
            pageType="media"
            pathname="/pathname"
            service="pashto"
            statusCode={200}
          >
            <BrowserRouter>
              <OnDemandRadioPage service="pashto" pageData={pageData} />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>,
    );
  });

  it('should show the content unavilable error for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));
    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = render(
      createAssetPage(pageDataWithWithoutVideo, 'pashto'),
    );

    expect(getByText('دغه فایل نور د لاسرسي وړ نه دی.')).toBeInTheDocument();
  });
});
