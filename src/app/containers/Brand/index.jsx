import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool, node } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

const BrandContainer = ({ skipLink, scriptLink, ...props }) => {
  const {
    product,
    serviceLocalizedName,
    brandSVG,
    service,
    theming,
  } = useContext(ServiceContext);

  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  return (
    <Brand
      backgroundColour={brandBackgroundColour}
      logoColour={brandLogoColour}
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={`/${service}`}
      skipLink={skipLink}
      scriptLink={scriptLink}
      {...props}
    />
  );
};

BrandContainer.propTypes = {
  borderTop: bool,
  borderBottom: bool,
  skipLink: node,
  scriptLink: node,
};

BrandContainer.defaultProps = {
  borderTop: false,
  borderBottom: false,
  skipLink: null,
  scriptLink: null,
};

export default BrandContainer;
