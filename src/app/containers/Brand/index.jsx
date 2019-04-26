import React from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

const BrandContainer = () => (
  <ServiceContextConsumer>
    {({ brandName, svg }) => <Brand brandName={brandName} svg={svg} />}
  </ServiceContextConsumer>
);

export default BrandContainer;
