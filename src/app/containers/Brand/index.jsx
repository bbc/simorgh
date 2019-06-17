import React, { useContext } from 'react';
import Brand from '@bbc/psammead-brand';
import { ServiceContext } from '../../contexts/ServiceContext';
import onClient from '../../lib/utilities/onClient';
import getBaseUrl from '../../routes/getInitialData/utils/getBaseUrl';

const BrandContainer = () => {
  const { brandName, brandSVG, frontpageUrl } = useContext(ServiceContext);
  const svgMaxHeight = 24;
  const svgMinHeight = 16;
  const svgRatio = brandSVG && brandSVG.ratio;
  const minWidth = svgRatio * svgMinHeight;
  const maxWidth = svgRatio * svgMaxHeight;
  const originUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : 'http://www.bbc.com';

  return (
    <Brand
      brandName={brandName}
      svgHeight={svgMaxHeight}
      minWidth={minWidth}
      maxWidth={maxWidth}
      svg={brandSVG}
      url={`${originUrl}${frontpageUrl}`}
    />
  );
};

export default BrandContainer;
