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

export default {
  figure:
    (isEmbedded = false) =>
    ({ spacings }: Theme) =>
      css({
        position: 'relative',
        width: '100%',
        ...(isEmbedded && { margin: '0' }),
        ...(!isEmbedded && { margin: `0 0 ${spacings.TRIPLE}rem 0` }),
      }),

  landscapeFigure: () => css({ aspectRatio: '16 / 9' }),
  portraitFigure:
    (isEmbedded = false) =>
    ({ mq }: Theme) => [
      css({
        aspectRatio: '9 / 16',
        ...(!isEmbedded && {
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
      }),
      !isEmbedded && commonMarginSpacing,
    ],

  audioMediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      height: '165px',
    }),

  standardMediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      height: '100%',
    }),

  onDemandAudioMediaContainer: () =>
    css({
      height: '165px',
    }),

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

  captionPortrait: ({ mq }: Theme) =>
    css({
      marginInline: '0',
      [mq.GROUP_2_ONLY]: {
        marginInline: '0',
      },
    }),
};
