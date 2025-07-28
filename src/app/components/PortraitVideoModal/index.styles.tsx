import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

// as copied from the skip link styles
const END_OF_CONTENT_CLOSE_MODAL_BUTTON_COLOR = '#333';
const END_OF_CONTENT_CLOSE_MODAL_BUTTON_BORDER = '0.1875rem'; // 3px
const TOP_BOTTOM_SPACING = '0.75rem'; // 12px

const styles = {
  bodyOverflowHidden: () =>
    css({
      body: {
        overflow: 'hidden',
      },
    }),
  modal: () =>
    css({
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2147483647,

      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        backdropFilter: 'blur(0.2rem)',
        zIndex: 0,
      },
    }),

  closeButton: ({ mq, spacings, palette }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: `${spacings.DOUBLE}rem`,
      insetInlineEnd: `${spacings.DOUBLE}rem`,
      background: 'transparent',
      border: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      cursor: 'pointer',
      padding: 0,
      zIndex: 1,

      '&:hover, &:focus-visible': {
        backgroundColor: palette.POSTBOX,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
      },

      [mq.FORCED_COLOURS]: {
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },

      svg: {
        color: palette.WHITE,

        [mq.FORCED_COLOURS]: {
          fill: 'canvasText',
        },
      },
    }),

  mediaWrapper: ({ mq }: Theme) =>
    css({
      '&.media-container': {
        width: 'auto',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 0,
        marginInline: 0,
        zIndex: 1,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        '&.media-container': {
          maxHeight: '90%',
        },
      },
    }),

  visuallyHiddenCloseButton:
    (dir: 'ltr' | 'rtl' = 'ltr') =>
    (theme: Theme) =>
      css({
        position: 'absolute',
        clipPath: 'inset(100%)',
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: '1px',
        width: '1px',
        overflow: 'hidden',
        padding: `${TOP_BOTTOM_SPACING} ${GEL_SPACING}`,
        backgroundColor: theme.palette.WHITE,
        border: `${END_OF_CONTENT_CLOSE_MODAL_BUTTON_BORDER} solid #000`,
        color: END_OF_CONTENT_CLOSE_MODAL_BUTTON_COLOR,
        textDecoration: 'none',
        ...theme.fontSizes.doublePica,
        ...theme.fontVariants.sansBold,

        ':focus': {
          clipPath: 'none',
          clip: 'auto',
          height: 'auto',
          width: 'auto',
          top: 0,
          left: dir === 'ltr' ? 0 : undefined,
          right: dir === 'rtl' ? 0 : undefined,
          backgroundColor: theme.palette.WHITE,
          color: END_OF_CONTENT_CLOSE_MODAL_BUTTON_COLOR,
          border: `${END_OF_CONTENT_CLOSE_MODAL_BUTTON_BORDER} solid #000`,
          textDecoration: 'none',
          zIndex: 2,
          ...theme.fontSizes.doublePica,
          ...theme.fontVariants.sansBold,
          [`@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN})`]: {
            top: GEL_SPACING,
          },
        },

        [`@media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX})`]: {
          padding: GEL_SPACING,
        },
      }),
};

export default styles;
