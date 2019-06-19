import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import BrandContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../../testHelpers';

const newsServiceContextStub = {
  brandName: 'BBC News',
  brandSVG,
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
