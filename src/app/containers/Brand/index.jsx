import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import SkipLink from '@bbc/psammead-brand/skip-link';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { bool } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

const renderScriptLink = (
  script,
  service,
  variant,
  url,
  scriptLinkText,
  offscreenText,
) => (
  <ScriptLink script={script} service={service} href={url} variant={variant}>
    <span aria-hidden>{scriptLinkText}</span>
    <VisuallyHiddenText> {offscreenText} </VisuallyHiddenText>
  </ScriptLink>
);

const renderSkipLink = (service, script) => (
  <SkipLink service={service} script={script} href="#content">
    Skip to content
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
    scriptLinkText,
    scriptLinkOffscreenText,
    scriptLinkVariant = null,
  } = useContext(ServiceContext);
  const { brandBackgroundColour, brandLogoColour } = theming;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const scriptLink =
    scriptLinkVariant &&
    renderScriptLink(
      script,
      service,
      scriptLinkVariant,
      `/${service}/${scriptLinkVariant}`,
      scriptLinkText,
      scriptLinkOffscreenText,
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
      skipLink={renderSkipLink(service, script)}
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
