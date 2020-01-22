import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import SkipLink from '@bbc/psammead-brand/skip-link';
import { bool } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

const renderSkipLink = (service, script, dir, skipLinkText) => (
  <SkipLink service={service} script={script} dir={dir} href="#content">
    {skipLinkText}
  </SkipLink>
);

const BrandContainer = props => {
  const {
    product,
    serviceLocalizedName,
    brandSVG,
    service,
    theming,
    script,
    translations,
    dir,
  } = useContext(ServiceContext);
  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const { skipLinkText } = translations;

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
      skipLink={renderSkipLink(service, script, dir, skipLinkText)}
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
