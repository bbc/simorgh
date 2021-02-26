import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool, node, oneOfType, func, shape, any } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

const BrandContainer = ({ skipLink, scriptLink, focusRef, ...props }) => {
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
      focusRef={focusRef}
      {...props}
    />
  );
};

BrandContainer.propTypes = {
  borderTop: bool,
  borderBottom: bool,
  skipLink: node,
  scriptLink: node,
  // eslint-disable-next-line react/forbid-prop-types
  focusRef: oneOfType([func, shape({ current: any })]),
};

BrandContainer.defaultProps = {
  borderTop: false,
  borderBottom: false,
  skipLink: null,
  scriptLink: null,
  focusRef: null,
};

export default BrandContainer;
