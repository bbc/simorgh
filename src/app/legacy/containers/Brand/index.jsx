import React, { use } from 'react';
import styled from '@emotion/styled';
import Brand from '#psammead/psammead-brand/src';
import { useTheme } from '@emotion/react';
import { servicesWithVariants } from '#lib/utilities/variantHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';

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
  ...props
}) => {
  const { product, serviceLocalizedName, service } = use(ServiceContext);
  const { variant } = use(RequestContext);

  const { brandSVG } = useTheme();
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const longBrands = [
    'afaanoromoo',
    'azeri',
    'kyrgyz',
    'russian',
    'serbian',
    'ws',
  ];

  const brandPath = getBrandPath(service, variant);

  return (
    <StyledBrand
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={brandPath}
      skipLink={skipLink}
      scriptLink={scriptLink}
      isLongBrand={longBrands.includes(service)}
      ref={brandRef}
      {...props}
    />
  );
};

export default BrandContainer;
