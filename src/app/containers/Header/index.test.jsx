import React from 'react';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import HeaderContainer from './index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../../testHelpers';

const newsServiceContextStub = {
  brandName: 'BBC News',
  brandSVG,
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
