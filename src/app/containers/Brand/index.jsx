import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import SkipLink from '@bbc/psammead-brand/skip-link';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { bool } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
import { RequestContext } from '#contexts/RequestContext';
import { getOtherVariant } from '#lib/utilities/variantHandler';

const renderScriptLink = (
  script,
  service,
  scriptLink,
  setPreferredVariantCookie,
  variant,
) => {
  const { text, offscreenText } = scriptLink;
  const otherVariant = getOtherVariant(service, variant);

  return (
    <ScriptLink
      script={script}
      service={service}
      href={`/${service}/${otherVariant}`}
      variant={otherVariant}
      onClick={() => setPreferredVariantCookie(service, otherVariant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText> {offscreenText} </VisuallyHiddenText>
    </ScriptLink>
  );
};

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
    scriptLink = null,
  } = useContext(ServiceContext);
  const { variant } = useContext(RequestContext);
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
    renderScriptLink(
      script,
      service,
      scriptLink,
      setPreferredVariantCookie,
      variant,
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
      scriptLink={addScriptLink}
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
