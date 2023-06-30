import { css, Theme } from '@emotion/react';

export default {
  infoBanner: () => css({ padding: 0 }),

  inner: ({ palette, spacings, mq, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      ...fontVariants.sansLight,
      background: palette.GREY_2,
      color: palette.GREY_6,
      marginBottom: spacings.TRIPLE,
      padding: spacings.DOUBLE,
      [mq.GROUP_3_MIN_WIDTH]: { lineHeight: 1.4 },
      // increase padding on desktop?
    }),
};

// const InfoBanner = styled.p`
//   padding: 0;
// `;

// const Inner = styled.section`
//   ${({ script }) => script && getLongPrimer(script)}
//   ${({ service }) => service && getSansLight(service)}
//   background: ${props => props.theme.palette.GREY_2};
//   color: ${props => props.theme.palette.GREY_6};
//   margin-bottom: ${GEL_SPACING_TRPL};
//   padding: ${GEL_SPACING_DBL};
//   @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
//     line-height: 1.4;
//   }
//   ${({ increasePaddingOnDesktop }) =>
//     increasePaddingOnDesktop &&
//     `
//       @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
//         padding: ${GEL_SPACING_DBL} ${GEL_SPACING_QUIN};
//       }
//     `}
// `;
