import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

export const PROMO_ITEM_WIDTH = 180; // fixed width for one promo item

const styles = {
  heading: ({ fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
    }),

  scrollContainer: () =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }),

  scrollWrapper: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      gap: `${spacings.DOUBLE}rem`,
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      flex: 1,
      padding: `${spacings.FULL}rem 0`,
    }),

  promoItem: ({ mq }: Theme) =>
    css({
      scrollSnapAlign: 'start',
      flex: '0 0 35%',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',

      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH)}rem`,
      },
    }),

  promoItemButton: ({ mq }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      flex: '0 0 35%',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',

      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH)}rem`,
      },
    }),

  endBlankItem: ({ mq }: Theme) =>
    css({
      display: 'none',

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'block',
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH / 1.5)}rem`,
      },
    }),

  image: () =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      aspectRatio: '9/16',
      display: 'block',
    }),

  gradientOverlay: () =>
    css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '3rem 0.5rem 0.5rem',
      background:
        'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0) 100%)',
      zIndex: 1,
    }),

  promoHeading: ({ fontVariants, palette }: Theme) =>
    css({
      position: 'relative',
      color: palette.WHITE,
      fontFamily: fontVariants?.sansBold?.fontFamily,
      fontSize: '0.875rem',
      zIndex: 2,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),

  buttonGroupOverlay: ({ mq }: Theme) =>
    css({
      display: 'none',

      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        width: '7rem',
        height: '100%',
        backgroundColor: 'rgba(253, 253, 253, 0.6)',
        zIndex: 1,
      },
    }),

  buttonGroup: ({ mq }: Theme) =>
    css({
      display: 'none',

      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
      },
    }),

  navButton: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      border: 'none',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:disabled': {
        opacity: 0.2,
        cursor: 'not-allowed',
      },
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: palette.GREY_2,
      },
    }),
};

export default styles;
