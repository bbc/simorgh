import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import LiveRadioPage from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import * as analyticsUtils from '#lib/analyticsUtils';
import getInitialData from '#app/routes/liveRadio/getInitialData';

fetch.mockResponse(JSON.stringify(amharicPageData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('Live radio page', () => {
  it('should match snapshot for Canonical', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');

    await matchSnapshotAsync(
      <BrowserRouter>
        <LiveRadioPage
          bbcOrigin="https://www.test.bbc.com"
          isAmp={false}
          pageType="media"
          pathname="/pathname"
          service="amharic"
          status={200}
          pageData={pageData}
        />
      </BrowserRouter>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');

    await matchSnapshotAsync(
      <BrowserRouter>
        <LiveRadioPage
          isAmp
          bbcOrigin="https://www.test.bbc.com"
          pageType="media"
          pathname="/pathname"
          service="amharic"
          status={200}
          pageData={pageData}
        />
      </BrowserRouter>,
    );
  });
});
