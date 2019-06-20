import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandSVG } = useContext(ServiceContext);

  return (
    <Brand
      product={brandName}
      svg={brandSVG}
      svgHeight={24}
      minWidth={112}
      maxWidth={168}
    />
  );
};

export default BrandContainer;
