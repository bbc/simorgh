import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetPageMain from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

describe('CpsAssetPageMain', () => {
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
        <CpsAssetPageMain service="pidgin" pageData={pidginPageData} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
