import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { bool } from 'prop-types';
import { latin } from '@bbc/gel-foundations/scripts';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { getOtherVariant } from '#lib/utilities/variantHandler';

const BrandContainer = props => {
  const {
    product,
    serviceLocalizedName,
    brandSVG,
    service,
    theming,
  } = useContext(ServiceContext);
  const { variant, pathname } = useContext(RequestContext);
  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;

  let scriptLink = null;
  const otherVariant = getOtherVariant(service, variant);
  if (otherVariant) {
    scriptLink = (
      <ScriptLink
        script={latin}
        service={service}
        href={pathname.replace(`/${variant}`, `/${otherVariant}`)}
      >
        <span aria-hidden>{otherVariant.toUpperCase()}</span>
        <VisuallyHiddenText>Use {otherVariant} variant</VisuallyHiddenText>
      </ScriptLink>
    );
  }

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
