import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import CpsAssetPageMain from '.';
import pidgin from '#data/pidgin/cpsAssets/tori-49450859.json';
import punjabi from '#data/punjabi/cpsAssets/international-49567825.json';
import igbo from '#data/igbo/cpsAssets/media-42986440.json';
import yoruba from '#data/yoruba/cpsAssets/media-42985961.json';
import thai from '#data/thai/cpsAssets/international-49514085.json';

// Not all services have fixtures for article data yet
// the service selector will be constrained to services that have article fixtures:
const CpsAssetsPageFixtures = {
  pidgin,
  punjabi,
  igbo,
  yoruba,
  thai,
};

const validServices = Object.keys(CpsAssetsPageFixtures);

storiesOf('Main|CpsAsset Page', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => {
        return (
          <ToggleContextProvider>
            <ServiceContextProvider service={service}>
              <RequestContextProvider
                isAmp={false}
                pageType="media"
                origin="https://www.bbc.com"
                service={service}
              >
                <CpsAssetPageMain
                  pageData={CpsAssetsPageFixtures[service]}
                  service={service}
                />
              </RequestContextProvider>
            </ServiceContextProvider>
          </ToggleContextProvider>
        );
      },
      services: validServices,
      options: { defaultService: 'pidgin' },
    }),
  );
