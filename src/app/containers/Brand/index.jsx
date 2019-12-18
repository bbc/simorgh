import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import SkipLink from '@bbc/psammead-brand/skip-link';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { bool } from 'prop-types';
import { setPreferredVariantCookie } from '#contexts/UserContext/cookies';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  getOtherVariant,
  useCurrentVariant,
  variantSanitiser,
} from '#lib/utilities/variantHandler';

const renderScriptLink = (
  script,
  service,
  scriptLinkVariants,
  currentVariant,
) => {
  const requiredVariant = getOtherVariant(service, currentVariant);
  const { scriptLinkText, scriptLinkOffscreenText } = scriptLinkVariants[
    requiredVariant
  ];

  return (
    <ScriptLink
      script={script}
      service={service}
      href={`/${service}/${requiredVariant}`}
      variant={requiredVariant}
      onClick={() => setPreferredVariantCookie(service, requiredVariant)}
    >
      <span aria-hidden="true">{scriptLinkText}</span>
      <VisuallyHiddenText> {scriptLinkOffscreenText} </VisuallyHiddenText>
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
    scriptLinkVariants = null,
  } = useContext(ServiceContext);
  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const { skipLinkText } = translations;
  const currentVariant = variantSanitiser(useCurrentVariant());
  const scriptLink =
    scriptLinkVariants &&
    renderScriptLink(script, service, scriptLinkVariants, currentVariant);

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
