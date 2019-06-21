import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandHomepage, brandSVG, brandDimensions } = useContext(
    ServiceContext,
  );

  console.log(useContext(ServiceContext));

  return (
    <Brand
      product={brandName}
      svg={brandSVG}
      url={brandHomepage}
      svgHeight={brandDimensions.height}
      minWidth={brandDimensions.minWidth}
      maxWidth={brandDimensions.maxWidth}
    />
  );
};

export default BrandContainer;
