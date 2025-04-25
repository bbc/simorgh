import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export const PROMO_ITEM_WIDTH = 160; // fixed width for one promo item

const styles = {
  section: () =>
    css({
      width: '100%',
    }),

  heading: () =>
    css({
      marginBottom: '1rem',
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
      paddingBottom: `${spacings.FULL}rem`,
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      flex: 1,
    }),

  image: () =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '0.25rem',
      aspectRatio: '9/16',
      display: 'block',
    }),

  promoItem: () =>
    css({
      scrollSnapAlign: 'start',
      flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH)}rem`,
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      borderRadius: '0.25rem',
      overflow: 'hidden',
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

  buttonGroup: () =>
    css({
      position: 'absolute',
      top: '50%',
      right: '1%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'row',
      zIndex: 2,
      gap: '0.25rem',
    }),

  navButton: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      border: 'none',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '& svg path': {
        fill: palette.GREY_2,
      },
    }),

  disabledButton: () =>
    css({
      opacity: 0.2,
    }),
};

export default styles;
