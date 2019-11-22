import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool } from 'prop-types';
import { latin } from '@bbc/gel-foundations/scripts';
import ScriptLink from '@bbc/psammead-script-link';
import { ServiceContext } from '#contexts/ServiceContext';

const BrandContainer = props => {
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
  const scriptLink = (
    <ScriptLink
      script={latin}
      service={service}
      href="https://www.bbc.com/serbian/cyr"
      variant="cyr"
    >
      Cyr
    </ScriptLink>
  );

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
      scriptLink={scriptLink}
      {...props}
    />
  );
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
