import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = () => {
  const { brandName, brandSVG, link, svgRatio } = useContext(ServiceContext);
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  return (
    <Brand
      brandName={brandName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={link}
    />
  );
};

export default BrandContainer;
