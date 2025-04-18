import { css, Theme } from '@emotion/react';

const ITEM_WIDTH_REM = 10;
const ITEM_GAP_REM = 1;

const styles = {
  section: (_theme: Theme) =>
    css({
      width: '100%',
    }),

  heading: (theme: Theme) =>
    css({
      marginBottom: '1rem',
    }),

  scrollContainer: (theme: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }),

  scrollWrapper: (theme: Theme) =>
    css({
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      gap: `${ITEM_GAP_REM}rem`,
      paddingBottom: theme.spacings.FULL + 'rem',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      flex: 1,
    }),

  promoItem: (theme: Theme) =>
    css({
      scrollSnapAlign: 'start',
      flex: `0 0 ${ITEM_WIDTH_REM}rem`,
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
    }),

  image: (theme: Theme) =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '0.25rem',
      marginBottom: '0.5rem',
    }),

  promoHeading: (theme: Theme) =>
    css({
      fontFamily: theme.fontVariants?.sansBold?.fontFamily,
      fontSize: '0.875rem',
      color: theme.palette.SHADOW,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),

  buttonGroup: (theme: Theme) =>
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

  navButton: (theme: Theme) =>
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
