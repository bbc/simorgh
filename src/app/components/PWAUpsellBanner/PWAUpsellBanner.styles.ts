import { css, Theme } from '@emotion/react';
// import {
//   SPACING_2,
//   SPACING_4,
//   SPACING_6,
//   fontStandard,
//   fontScaleDescription,
//   fontScaleIndexHeadlineLarge,
//   fontHeadline,
// } from '@bbc/web-gel-foundations';

const styles = {
  Wrap: () =>
    css({
      width: '100%',
    }),

  ColoredContainer: ({ palette }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: palette.POSTBOX,
    }),

  StyledContent: () =>
    css({
      // ...fontStandard,
      display: 'grid',
      position: 'relative',
      width: '100%',
      // rowGap: SPACING_6,
      // padding: `${SPACING_6} 0 ${SPACING_4} 0`,
    }),

  StyledTitle: () =>
    css({
      // ...fontScaleIndexHeadlineLarge,
      // ...fontHeadline,
    }),

  StyledDescription: () =>
    css({
      // ...fontScaleDescription,
    }),

  TextWrapper: () =>
    // TextWrapper: ({ palette }: Theme) =>
    css({
      // color: palette.primary,
      display: 'grid',
      // rowGap: SPACING_2,
    }),

  CTAWrapper: () =>
    css({
      display: 'flex',
    }),

  CloseButtonWrapper: () =>
    css({
      position: 'absolute',
      top: 0,
      // right: `-${SPACING_2}`,
    }),
};

export default styles;
