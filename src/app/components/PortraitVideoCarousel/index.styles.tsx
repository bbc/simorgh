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
      display: 'flex',
      flexDirection: 'column',
    }),

  image: () =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '0.25rem',
      marginBottom: '0.5rem',
      aspectRatio: '9/16',
    }),

  promoHeading: ({ fontVariants, palette }: Theme) =>
    css({
      fontFamily: fontVariants?.sansBold?.fontFamily,
      fontSize: '0.875rem',
      color: palette.SHADOW,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),

  buttonGroup: () =>
    css({
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'row',
      zIndex: 2,
      gap: '0.25rem',
    }),

  navButton: () =>
    css({
      backgroundColor: '#E0E0E0',
      color: '#000',
      border: 'none',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }),
};

export default styles;
