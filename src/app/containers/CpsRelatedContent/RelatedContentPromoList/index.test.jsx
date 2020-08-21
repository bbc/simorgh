import React from 'react';
import path from 'ramda/src/path';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import RelatedContentPromoList from './index';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const promoItems = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData,
);

describe('RelatedContentPromoList', () => {
  shouldMatchSnapshot(
    'it renders a list of Story Promos for STY pages',
    <ServiceContextProvider service="pidgin">
      <RelatedContentPromoList promoItems={promoItems} dir="ltr" />,
    </ServiceContextProvider>,
  );
});

describe('RelatedContentPromoList', () => {
  shouldMatchSnapshot(
    'it renders a list of Story Promos for MAP pages',
    <ServiceContextProvider service="pidgin">
      <RelatedContentPromoList promoItems={promoItems} dir="ltr" isMapContent />
      ,
    </ServiceContextProvider>,
  );
});
