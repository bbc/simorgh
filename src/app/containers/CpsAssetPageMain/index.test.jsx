import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import CpsAssetPageMain from '.';
import preprocessor from '#lib/utilities/preprocessor';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { preprocessorRules } from '#app/routes/getInitialData/cpsAsset';

describe('CpsAssetPageMain', () => {
  it('should match snapshot', async () => {
    const pageData = await preprocessor(pidginPageData, preprocessorRules);
    await matchSnapshotAsync(
      /*
        for the value it would bring, it is much simpler to wrap a react-router Link in a Router, rather than mock a Router or pass some mocked context.
      */
      <StaticRouter>
        <ToggleContextProvider>
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
        </ToggleContextProvider>
      </StaticRouter>,
    );
  });
});
