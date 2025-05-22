import React from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_1_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { BrandSVG } from '#app/models/types/theming';
import { ResponsiveLogoProps } from './types';

const DefaultLogo = styled.g`
  display: block;
  // @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
  //   display: none;
  // }
`;

// const MobileLogo = styled.g`
//   display: none;
//   @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
//     display: block;
//   }
// `;

export const ResponsiveLogo = ({
  defaultLogo,
  // mobileLogo,
}: ResponsiveLogoProps): BrandSVG => {
  return {
    group: (
      <>
        <DefaultLogo>{defaultLogo?.group}</DefaultLogo>
        {/* <MobileLogo>{mobileLogo?.group}</MobileLogo> */}
      </>
    ),
    viewbox: {
      minX: defaultLogo?.viewbox?.minX ?? 0,
      minY: defaultLogo?.viewbox?.minY ?? 0,
      width: defaultLogo?.viewbox?.width ?? 0,
      height: defaultLogo?.viewbox?.height ?? 0,
    },
    // mobileViewbox: {
    //   minX: mobileLogo?.viewbox?.minX ?? 0,
    //   minY: mobileLogo?.viewbox?.minY ?? 0,
    //   width: mobileLogo?.viewbox?.width ?? 0,
    //   height: mobileLogo?.viewbox?.height ?? 0,
    // },
  };
};

export default ResponsiveLogo;
