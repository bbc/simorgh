import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetPageMain from '.';
import preprocessor from '#lib/utilities/preprocessor';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

const processedPidgin = async () => {
  const page = await preprocessor(pidginPageData, [convertToOptimoBlocks]);
  return page;
};

describe('CpsAssetPageMain', async () => {
  shouldMatchSnapshot(
    'should match snapshot',
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType="MAP"
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <CpsAssetPageMain service="pidgin" pageData={await processedPidgin} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
