import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const {
    brandName,
    brandMinWidth,
    brandMaxWidth,
    brandSvgHeight,
    brandSVG,
    brandUrl,
  } = useContext(ServiceContext);

  return (
    <Brand
      brandName={brandName}
      minWidth={brandMinWidth}
      maxWidth={brandMaxWidth}
      svgHeight={brandSvgHeight}
      svg={brandSVG}
      url={brandUrl}
    />
  );
};

export default BrandContainer;
