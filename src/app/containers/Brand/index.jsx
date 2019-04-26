import React from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

const BrandContainer = () => (
  <ServiceContextConsumer>
    {({ brandName, brandSVG }) => (
      <Brand brandName={brandName} svg={brandSVG} />
    )}
  </ServiceContextConsumer>
);

export default BrandContainer;
