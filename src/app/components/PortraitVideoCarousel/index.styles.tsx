import { css, Theme } from '@emotion/react';

const ITEM_WIDTH_REM = 10;
const ITEM_GAP_REM = 1;

const styles = {
  section: (theme: Theme) =>
    css({
      padding: `${theme.spacings.DOUBLE}rem ${theme.spacings.TRIPLE}rem`,
    }),

  heading: css({
    marginBottom: '1rem',
  }),

  ctaLink: (_theme: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontWeight: 700,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),

  chevron: css({
    marginInlineStart: '0.5rem',
    width: '1rem',
    height: '1rem',
    verticalAlign: 'middle',
    fill: 'currentcolor',
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

  promoItem: css({
    scrollSnapAlign: 'start',
    flex: `0 0 ${ITEM_WIDTH_REM}rem`,
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
  }),

  image: css({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
  }),

  promoHeading: css({
    margin: 0,
  }),

  promoLink: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
      textDecoration: 'none',
      fontWeight: 700,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
