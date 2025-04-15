import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const commonMarginSpacing = ({ mq, spacings }: Theme) =>
  css({
    marginInline: `${spacings.FULL}rem`,
    [mq.GROUP_2_MIN_WIDTH]: {
      [mq.GROUP_3_MAX_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      marginInline: 0,
    },
  });

export default {
  pageWrapper: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
    }),
  grid: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
        columnGap: '1rem',
      },
    }),
  primaryColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      paddingBottom: '2rem',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
      },
    }),
  secondaryColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '9 / span 4',
        marginTop: '2rem',
      },
    }),
  pglColumn: () =>
    css({
      gridColumn: '1 / span 12',
      paddingBottom: '2rem',
    }),
  mainContent: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
  adContainer: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  mostReadSection: ({ spacings, mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `0 ${spacings.FULL}rem`,
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        [mq.GROUP_3_MAX_WIDTH]: {
          margin: `0 ${spacings.DOUBLE}rem`,
          paddingBottom: `${spacings.QUADRUPLE}rem`,
        },
      },
      [mq.GROUP_4_ONLY]: {
        margin: `0 ${spacings.DOUBLE}rem`,
        paddingBottom: `${spacings.QUINTUPLE}rem`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        margin: '0 auto',
        padding: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      },
    }),
  relatedTopics: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem`,
      paddingBottom: `${spacings.FULL}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),
  featuresSection: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.FULL}rem`,
        padding: `${spacings.DOUBLE}rem`,
      },
    }),
  topStoriesSection: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.FULL}rem`,
        padding: `${spacings.DOUBLE}rem`,
      },
    }),
  portraitVideoTitle: ({
    mq,
    fontSizes,
    fontVariants,
    spacings,
    palette,
  }: Theme) => [
    css({
      display: 'block',
      ...fontSizes.doublePica,
      ...fontVariants.sansBold,
      paddingBottom: `${spacings.DOUBLE}rem`,
      color: palette.BLACK,
      [mq.GROUP_2_ONLY]: {
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${spacings.DOUBLE}rem`,
      },
    }),
    commonMarginSpacing,
  ],
};
