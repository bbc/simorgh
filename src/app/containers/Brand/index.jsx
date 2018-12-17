import React from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

const BrandContainer = () => (
  <ServiceContextConsumer>
    {({ brandName }) => <Brand brandName={brandName} />}
  </ServiceContextConsumer>
);

export default BrandContainer;
