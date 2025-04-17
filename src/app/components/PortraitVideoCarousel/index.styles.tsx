import { css, Theme } from '@emotion/react';

const ITEM_WIDTH_REM = 10;
const ITEM_GAP_REM = 1;

const styles = {
  section: (theme: Theme) =>
    css({
      padding: `${theme.spacings.DOUBLE}rem ${theme.spacings.TRIPLE}rem`,
    }),

  heading: (_theme: Theme) =>
    css({
      marginBottom: '1rem',
    }),

  navWrapper: css({
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

  promoItem: (_theme: Theme) =>
    css({
      scrollSnapAlign: 'start',
      flex: `0 0 ${ITEM_WIDTH_REM}rem`,
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
    }),

  image: (_theme: Theme) =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '0.25rem',
      marginBottom: '0.5rem',
    }),

  promoHeading: (_theme: Theme) =>
    css({
      margin: 0,
    }),

  promoLink: (theme: Theme) =>
    css({
      fontSize: '0.875rem',
      color: theme.palette.SHADOW,
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),

  navButton: (_theme: Theme) =>
    css({
      background: 'none',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      zIndex: 1,
    }),
};

export default styles;
