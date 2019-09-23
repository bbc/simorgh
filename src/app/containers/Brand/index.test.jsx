import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import BrandContainer from '.';
import { ServiceContext } from '#contexts/ServiceContext';

const newsServiceContextStub = {
  product: 'BBC News',
  service: 'news',
  brandSVG,
  svgHeight: 24,
  maxWidth: 280,
  minWidth: 180,
  theming: {
    brandBackgroundColour: `${C_POSTBOX}`,
    brandLogoColour: `${C_WHITE}`,
  },
};

const BrandContainerWithContext = context => (
  <ServiceContext.Provider value={context}>
    <BrandContainer />
  </ServiceContext.Provider>
);

describe(`BrandContainer`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    BrandContainerWithContext(newsServiceContextStub),
  );
});
