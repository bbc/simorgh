import React, { useContext } from 'react';
import { bool } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

const BrandContainer = props => {
  const { product, serviceLocalizedName, brandSVG, service } = useContext(
    ServiceContext,
  );
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  return <p>Brand</p>;
};

BrandContainer.propTypes = {
  borderTop: bool,
  borderBottom: bool,
};

BrandContainer.defaultProps = {
  borderTop: false,
  borderBottom: false,
};

export default BrandContainer;
