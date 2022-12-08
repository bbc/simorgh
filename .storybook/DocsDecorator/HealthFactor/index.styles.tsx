import { css, Theme } from '@emotion/react';

const styles = {
  componentHealthContainer: (theme: Theme) =>
    css({
      margin: `${theme.spacings.FULL}rem 0`,
      border: `1px solid ${theme.palette.SHADOW}`,
    }),

  titleContainer: {
    display: 'flex',
    flexGrow: 1,
  },

  headerContainer: (theme: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.GREY_2,
      padding: `1.25rem ${theme.spacings.DOUBLE}rem`,
    }),

  date: {
    alignSelf: 'flex-end',
  },

  icon: (theme: Theme) => css({ height: '100%', width: `100%` }),

  titleIcon: (theme: Theme) =>
    css({
      width: '1.5rem',
      height: '1.5rem',
      marginRight: `${theme.spacings.HALF}rem`,
      display: 'block',
    }),

  warningIcon: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
    }),

  recommendIcon: { color: '#0A7B0A' },

  documentationContainer: (theme: Theme) =>
    css({
      margin: 0,
      padding: `1.25rem ${theme.spacings.DOUBLE}rem`,
    }),

  documentationList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};

export default styles;
