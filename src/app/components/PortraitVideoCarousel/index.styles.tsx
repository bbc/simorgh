import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

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

  // Adjust fade on carousel to suit UX designs at diff breakpoints
  promoFadeOverlay: ({ mq }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      width: '7rem',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      zIndex: 1,
      pointerEvents: 'none',

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
      },
    }),

  buttonGroup: ({ mq }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: '50%',
      insetInlineEnd: '1%',
      transform: 'translateY(-50%)',
      flexDirection: 'row',
      zIndex: 2,
      gap: '0.25rem',

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
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
