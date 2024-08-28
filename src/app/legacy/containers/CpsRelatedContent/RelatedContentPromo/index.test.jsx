import React from 'react';
import path from 'ramda/src/path';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ThemeProvider from '#components/ThemeProvider';
import RelatedContentPromo from '.';

jest.mock('#components/ThemeProvider');

const promos = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData.data.article,
);

describe('RelatedContentPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <ThemeProvider service="pidgin" variant="default">
      <ServiceContextProvider service="pidgin">
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: true },
          }}
        >
          <RelatedContentPromo promo={promos[0]} dir="ltr" />,
        </ToggleContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>,
  );
});
