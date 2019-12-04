import React from 'react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import preprocessor from '#lib/utilities/preprocessor';
import * as analyticsUtils from '#lib/analyticsUtils';
import { radioPagePreprocessorRules } from '#app/routes/getInitialData/utils/preprocessorRulesConfig';

analyticsUtils.getAtUserId = jest.fn();

describe('Radio Page Main', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL = 'https://embed-host.bbc.com';
  });

  it('should match snapshot for Canonical', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );

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
          <RadioPageMain service="amharic" pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );

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
          <RadioPageMain service="amharic" pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });
});
