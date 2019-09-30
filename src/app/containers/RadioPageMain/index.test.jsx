import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import addIdsToBlocks from '../../routes/getInitialData/radioPage/addIdsToBlocks';

const pageData = addIdsToBlocks(amharicPageData);

describe('Radio Page Main', () => {
  shouldMatchSnapshot(
    'should match snapshot',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType="media"
        pathname="/pathname"
        service="news"
        statusCode={200}
      >
        <RadioPageMain service="amharic" pageData={pageData} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
