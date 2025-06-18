import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../src/app/utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: `${pixelsToRem(20)}rem auto`,
    }),
  outerGrid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: `${spacings.FULL}rem ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
        paddingTop: `${spacings.FULL}rem`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
        columnGap: `${spacings.DOUBLE}rem`,
      },
    }),
  firstSection: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / 13',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / 5',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '1 / 4',
      },
    }),
  secondSection: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / 13',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '5 / 13',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '4 / 10',
      },
    }),
  h1: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.SEXTUPLE}rem`,
      svg: {
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
      },
    }),
  h2: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,
      svg: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
      },
    }),
  ul: ({ spacings }: Theme) =>
    css({
      marginTop: `-${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.DOUBLE}rem`,
      listStyleType: 'none',
      svg: {
        width: `${spacings.FULL}rem`,
        height: `${spacings.FULL}rem`,
      },
    }),
  wideSection: ({ mq, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,

      gridColumn: '2 / 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '2 / 12',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '2 / 12',
      },
    }),
};
