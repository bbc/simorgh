import { use } from 'react';
import fs from 'fs';
import styled from '@emotion/styled';
import Brand from '#psammead/psammead-brand/src';
import { servicesWithVariants } from '#lib/utilities/variantHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

const StyledBrand = styled(Brand)`
  position: relative;
  z-index: 1;
  svg {
    fill: currentColor;
    @media screen and (forced-colors: active) {
      fill: linkText;
    }
  }
`;

export const getBrandPath = (service, variant) => {
  if (service === 'ws') return '/news';
  if (variant && servicesWithVariants[service]?.includes(variant)) {
    return `/${service}/${variant}`;
  }
  return `/${service}`;
};

const BrandContainer = ({
  skipLink = null,
  scriptLink = null,
  brandRef = null,
  children,
  ...props
}) => {
  const { product, serviceLocalizedName, service } = use(ServiceContext);
  const { variant, isAmp } = use(RequestContext);
  const brandRatio = JSON.parse(fs.readFileSync('./brand-logo-ratios.json'))[service];

  const brandSVG = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}${service}/images/brandLogo.svg`;
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const ratio = brandRatio?.ratio;
  const svgRatio = ratio ? [brandRatio?.width, brandRatio?.height] : [0, 0];
  const minWidth = ratio ? ratio * svgMinHeight : 0;
  const maxWidth = ratio ? ratio * svgMaxHeight : 0;

  const brandPath = getBrandPath(service, variant);

  return (
    <StyledBrand
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      aspectRatio={svgRatio}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={brandPath}
      skipLink={skipLink}
      scriptLink={scriptLink}
      ref={brandRef}
      {...props}
    >
      {children}
    </StyledBrand>
  );
};

export default BrandContainer;
