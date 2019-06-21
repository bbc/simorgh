import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import HeaderContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../../testHelpers';

const newsServiceContextStub = {
  product: 'BBC News',
  service: 'news',
  brandSVG,
  svgHeight: 24,
  maxWidth: 280,
  minWidth: 180,
};

const HeaderContainerWithContext = context => (
  <ServiceContext.Provider value={context}>
    <HeaderContainer />
  </ServiceContext.Provider>
);

describe(`Header`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    HeaderContainerWithContext(newsServiceContextStub),
  );
});
