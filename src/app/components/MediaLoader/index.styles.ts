import pixelsToRem from '#app/utilities/pixelsToRem';
import PLAYER_FULLSCREEN_CLASS from '#lib/mediaPlayerFullscreen.const';
import { css, Theme } from '@emotion/react';

export { PLAYER_FULLSCREEN_CLASS };
export const FAKE_FULLSCREEN_LAYER_CLASS = 'simorgh-fake-fullscreen-layer';
export const FAKE_FULLSCREEN_ACTIVE_CLASS = 'simorgh-player-fullscreen-active';
export const ACTIVE_FULLSCREEN_LOADER_STATE = 'active-fake-fullscreen';

export const fakeFullscreenStyles = `
  html.${PLAYER_FULLSCREEN_CLASS} {
    overflow: hidden;
  }

  body.${PLAYER_FULLSCREEN_CLASS} {
    overflow: auto;
  }

  .${FAKE_FULLSCREEN_LAYER_CLASS} {
    display: none;
    background: #000;
    position: fixed;
    inset: 0;
    pointer-events: none;
    height: 100lvh;
    width: 100vw;
    outline: 1000px solid #000;
    z-index: 2147483646;
  }

  .${FAKE_FULLSCREEN_LAYER_CLASS}.${FAKE_FULLSCREEN_ACTIVE_CLASS} {
    display: block;
  }

  [data-simorgh-media-loader="${ACTIVE_FULLSCREEN_LOADER_STATE}"] {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    max-width: none !important;
    height: 100lvh !important;
    margin: 0 !important;
    aspect-ratio: auto !important;
    background: #000 !important;
    z-index: 2147483647 !important;
  }

  [data-simorgh-media-loader="${ACTIVE_FULLSCREEN_LOADER_STATE}"] .media-player {
    height: 100% !important;
  }
`;

const commonMarginSpacing = ({ mq, spacings }: Theme) =>
  css({
    marginInline: 0,
    [mq.GROUP_3_MIN_WIDTH]: {
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
        display: 'flex',
        flexDirection: 'column',
        ...(!isEmbedded && {
          [mq.GROUP_2_MAX_WIDTH]: {
            maxWidth: '100%',
          },
          [mq.GROUP_3_ONLY]: {
            maxWidth: `${pixelsToRem(382)}rem`,
          },
          [mq.GROUP_4_MIN_WIDTH]: {
            maxWidth: `${pixelsToRem(315)}rem`,
          },
          [mq.GROUP_5_MIN_WIDTH]: {
            maxWidth: `${pixelsToRem(382)}rem`,
          },
        }),
      }),
      !isEmbedded && commonMarginSpacing,
    ],

  mediaPlayerWrapper: ({
    isPortrait,
    isFakeFullscreenActive,
  }: {
    isPortrait: boolean;
    isFakeFullscreenActive: boolean;
  }) =>
    css({
      flex: 1,
      minHeight: 0,
      height: '100%',
      // Portrait figures are flex columns; drop this wrapper's box so the player
      // sizes as a direct flex child, but keep it while fake fullscreen is active.
      ...(isPortrait && !isFakeFullscreenActive && { display: 'contents' }),
    }),

  audioMediaContainer: () =>
    css({
      height: '165px',
    }),

  standardMediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      height: '100%',
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

  captionPortrait: ({ mq, spacings }: Theme) =>
    css({
      marginInline: `${spacings.FULL}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginInline: '0',
      },
    }),

  captionAudio: ({ mq, spacings }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem ${spacings.FULL}rem ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem ${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0 0`,
      },
    }),
};
