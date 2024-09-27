import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

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

export const mediaPortraitStyles = ({ mq }: Theme) => [
  css({
    aspectRatio: '9 / 16',
    maxWidth: `${pixelsToRem(185)}rem`,
    [mq.GROUP_1_ONLY]: {
      maxWidth: `${pixelsToRem(256)}rem`,
    },
    [mq.GROUP_2_ONLY]: {
      maxWidth: `${pixelsToRem(274)}rem`,
    },
    [mq.GROUP_3_ONLY]: {
      maxWidth: `${pixelsToRem(200)}rem`,
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      maxWidth: `${pixelsToRem(190)}rem`,
    },
  }),
  commonMarginSpacing,
];

export default {
  figure: ({ spacings }: Theme) =>
    css({
      margin: 0,
      paddingBottom: `${spacings.TRIPLE}rem`,
      width: '100%',
    }),

  audioMediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      height: '165px',
    }),

  mediaContainerLandscape: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      aspectRatio: '16 / 9',
    }),

  mediaContainerPortrait: ({ palette }: Theme) => [
    css({
      backgroundColor: palette.BLACK,
    }),
    mediaPortraitStyles,
  ],

  titlePortrait: ({
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

  captionPortrait: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        marginInline: `${spacings.DOUBLE}rem 0`,
      },
    }),
};
