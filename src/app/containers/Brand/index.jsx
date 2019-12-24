import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import SkipLink from '@bbc/psammead-brand/skip-link';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { bool } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';

const renderScriptLink = (
  script,
  service,
  scriptLink,
  setPreferredVariantCookie,
) => {
  const { variant, text, offscreenText } = scriptLink;

  return (
    <ScriptLink
      script={script}
      service={service}
      href={`/${service}/${variant}`}
      variant={variant}
      onClick={() => setPreferredVariantCookie(service, variant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText> {offscreenText} </VisuallyHiddenText>
    </ScriptLink>
  );
};

const renderSkipLink = (service, script, skipLinkText) => (
  <SkipLink service={service} script={script} href="#content">
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
    scriptLink = null,
  } = useContext(ServiceContext);
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const { skipLinkText } = translations;
  const addScriptLink =
    scriptLink &&
    renderScriptLink(script, service, scriptLink, setPreferredVariantCookie);

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
      scriptLink={addScriptLink}
      skipLink={renderSkipLink(service, script, skipLinkText)}
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
