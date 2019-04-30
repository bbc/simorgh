import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandSVG } = useContext(ServiceContext);

  return <Brand brandName={brandName} svg={brandSVG} />;
};

export default BrandContainer;
