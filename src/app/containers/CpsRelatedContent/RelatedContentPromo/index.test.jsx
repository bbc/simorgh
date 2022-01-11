import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import path from 'ramda/src/path';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import RelatedContentPromo from '.';

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

describe('RelatedContentPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: true },
        }}
      >
        <RelatedContentPromo promo={promos[0]} dir="ltr" />,
      </ToggleContextProvider>
    </ServiceContextProvider>,
  );
});
