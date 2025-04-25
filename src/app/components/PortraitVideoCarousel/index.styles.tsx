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

  promoItem: () =>
    css({
      scrollSnapAlign: 'start',
      flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH)}rem`,
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
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

  promoHeading: ({ fontVariants, palette }: Theme) =>
    css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '0.5rem',
      background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))',
      color: palette.WHITE,
      fontFamily: fontVariants?.sansBold?.fontFamily,
      fontSize: '0.875rem',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),

  buttonGroup: () =>
    css({
      position: 'absolute',
      top: '35%',
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
