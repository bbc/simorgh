import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import BrandContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';

const newsServiceContextStub = {
  product: 'BBC News',
  service: 'news',
  brandSVG,
  svgHeight: 24,
  maxWidth: 280,
  minWidth: 180,
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
