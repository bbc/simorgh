import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Brand from '#psammead/psammead-brand/src';
import { useTheme } from '@emotion/react';
import { ServiceContext } from '../../../contexts/ServiceContext';

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

const BrandContainer = ({
  skipLink = null,
  scriptLink = null,
  brandRef = null,
  ...props
}) => {
  const { product, serviceLocalizedName, service } = useContext(ServiceContext);
  const { brandSVG } = useTheme();
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  return (
    <StyledBrand
      product={product}
      serviceLocalisedName={serviceLocalizedName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={`/${service}`}
      skipLink={skipLink}
      scriptLink={scriptLink}
      longBrandWithVariant={service === 'serbian'}
      ref={brandRef}
      {...props}
    />
  );
};

export default BrandContainer;
