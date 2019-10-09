import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import addIdsToBlocks from '../../routes/getInitialData/radioPage/addIdsToBlocks';

const pageData = addIdsToBlocks(amharicPageData);

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'https://foo.com';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/static/';

describe('Radio Page Main', () => {
  shouldMatchSnapshot(
    'should match snapshot for Canonical',
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

  shouldMatchSnapshot(
    'should match snapshot for AMP',
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
