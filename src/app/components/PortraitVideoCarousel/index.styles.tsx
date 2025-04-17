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

  scrollWrapper: (theme: Theme) =>
    css({
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      gap: `${ITEM_GAP_REM}rem`,
      paddingBottom: `${theme.spacings.FULL}rem`,
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
    }),

  promoItem: (_theme: Theme) =>
    css({
      scrollSnapAlign: 'start',
      flex: `0 0 ${ITEM_WIDTH_REM}rem`,
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

  headline: (_theme: Theme) =>
    css({
      margin: 0,
    }),

  link: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
      textDecoration: 'none',
      fontWeight: 'bold',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
