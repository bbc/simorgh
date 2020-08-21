import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import path from 'ramda/src/path';
import RelatedContentPromo from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

describe('RelatedContentPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <ServiceContextProvider service="pidgin">
      <RelatedContentPromo promo={promos[0]} dir="ltr" />,
    </ServiceContextProvider>,
  );
});
