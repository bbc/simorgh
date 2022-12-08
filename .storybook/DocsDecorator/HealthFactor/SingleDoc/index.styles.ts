import { css, Theme } from '@emotion/react';

const styles = {
  documentationContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  iconContainer: {
    display: 'inline-block',
    boxSizing: 'border-box',
  },

  linkIconContainer: (theme: Theme) =>
    css({
      width: `${theme.spacings.DOUBLE}rem`,
      height: `${theme.spacings.DOUBLE}rem`,
      marginLeft: `${theme.spacings.HALF}rem`,
    }),

  statusIconContainer: {
    borderRadius: '100%',
    width: '1.25rem',
    height: '1.25rem',
    padding: '0.25rem',
  },

  icon: (theme: Theme) => css({ height: '100%', width: `100%` }),

  positive: (theme: Theme) =>
    css({ background: '#0A7B0A', color: `${theme.palette.WHITE}` }),

  negative: (theme: Theme) =>
    css({ background: '#D60A3D', color: `${theme.palette.WHITE}` }),

  missing: (theme: Theme) =>
    css({
      padding: 0,
      borderRadius: 0,
      color: theme.palette.SHADOW,
    }),

  sidebarColumn: {
    margin: '0.375rem',
    marginLeft: '0',
  },

  documentationLink: {
    margin: '0.25rem',
  },

  documentationType: {
    flexGrow: 1,
  },

  link: (theme: Theme) =>
    css({
      textDecoration: 'underline',
      color: theme.palette.BLACK,
      '&:hover': {
        color: theme.palette.POSTBOX,
      },
      '&:focus': {
        color: theme.palette.WHITE,
        backgroundColor: 'rgb(0, 100, 230)',
        border: `0.125rem solid ${theme.palette.WHITE} !important`,
        outline: `0.125rem solid ${theme.palette.BLACK}`,
        outlineOffset: `0.125rem`,
        padding: `${theme.spacings.DOUBLE}rem`,
      },
    }),
};

export default styles;
