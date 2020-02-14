import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import * as analyticsUtils from '#lib/analyticsUtils';
import getInitialData from '#app/routes/radio/getInitialData';

fetch.mockResponse(JSON.stringify(amharicPageData));

analyticsUtils.getAtUserId = jest.fn();

describe('Radio Page Main', () => {
  it('should match snapshot for Canonical', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');

    await matchSnapshotAsync(
      <ServiceContextProvider service="amharic">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType="media"
          pathname="/pathname"
          service="amharic"
          statusCode={200}
        >
          <BrowserRouter>
            <RadioPageMain service="amharic" pageData={pageData} />
          </BrowserRouter>
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData('some-live-radio-path');

    await matchSnapshotAsync(
      <ServiceContextProvider service="amharic">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp
          pageType="media"
          pathname="/pathname"
          service="amharic"
          statusCode={200}
        >
          <BrowserRouter>
            <RadioPageMain service="amharic" pageData={pageData} />
          </BrowserRouter>
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });
});
