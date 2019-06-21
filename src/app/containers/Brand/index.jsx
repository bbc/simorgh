import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandHomepage, brandSVG } = useContext(ServiceContext);

  return (
    <Brand
      product={brandName}
      svg={brandSVG}
      url={brandHomepage}
      svgHeight={24}
      minWidth={154}
      maxWidth={168}
    />
  );
};

export default BrandContainer;
