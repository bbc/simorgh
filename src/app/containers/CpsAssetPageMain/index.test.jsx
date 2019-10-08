import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetPageMain from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

describe('CpsAssetPageMain', () => {
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
        <CpsAssetPageMain service="pidgin" pageData={pidginPageData} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
