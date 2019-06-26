import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = ({ isHeader, isFooter }) => {
  const { product, serviceLocalizedName, brandSVG, service } = useContext(
    ServiceContext,
  );
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  return (
    <Brand
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={`/${service}`}
      borderTop={isFooter}
      borderBottom={isHeader}
    />
  );
};

BrandContainer.propTypes = {
  isHeader: bool,
  isFooter: bool,
};

BrandContainer.defaultProps = {
  isHeader: false,
  isFooter: false,
};

export default BrandContainer;
