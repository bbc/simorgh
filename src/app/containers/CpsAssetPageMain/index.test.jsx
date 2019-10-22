import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetPageMain from '.';
import preprocessor from '#lib/utilities/preprocessor';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

describe('CpsAssetPageMain', () => {
  it('should match snapshot', async () => {
    const pageData = await preprocessor(pidginPageData, [
      convertToOptimoBlocks,
    ]);
    await matchSnapshotAsync(
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
      */
      <StaticRouter>
        <ServiceContextProvider service="pidgin">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            pageType="MAP"
            pathname="/pidgin/tori-49450859"
            service="pidgin"
            statusCode={200}
          >
            <CpsAssetPageMain service="pidgin" pageData={pageData} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </StaticRouter>,
    );
  });
});
