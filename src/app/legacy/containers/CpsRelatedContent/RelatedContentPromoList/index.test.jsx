import React from 'react';
import path from 'ramda/src/path';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RelatedContentPromoList from './index';

const promoItems = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData,
);

describe('RelatedContentPromoList', () => {
  shouldMatchSnapshot(
    'it renders a list of Story Promos for STY pages',
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: true },
        }}
      >
        <RelatedContentPromoList promoItems={promoItems} dir="ltr" />
      </ToggleContextProvider>
    </ServiceContextProvider>,
  );
});

describe('RelatedContentPromoList', () => {
  shouldMatchSnapshot(
    'it renders a list of Story Promos for MAP pages',
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: true },
        }}
      >
        <RelatedContentPromoList
          promoItems={promoItems}
          dir="ltr"
          isMediaContent
        />
      </ToggleContextProvider>
    </ServiceContextProvider>,
  );
});
