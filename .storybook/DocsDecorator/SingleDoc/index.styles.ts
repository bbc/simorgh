import { css, Theme } from '@emotion/react';

const styles = {
  // icons styles
  icon: (theme: Theme) =>
    css({
      fill: 'currentcolor',
      height: '100%',
      width: '100%',
    }),

  iconContainer: {
    display: 'inline-block',
    boxSizing: 'border-box',
  },

  linkIconContainer: {
    width: '1rem',
    height: '1rem',
    color: 'black',
    marginLeft: '0.5em',
  },

  statusIconContainer: (theme: Theme) =>
    css({
      color: theme.palette.WHITE,
      borderRadius: '100%',
      width: '1.25rem',
      height: '1.25rem',
      padding: '0.25rem',
    }),

  positiveStatusIcon: { background: 'rgb(36, 179, 0)' },

  negativeStatusIcon: { background: 'rgb(245, 26, 90)' },

  //Container style
  documentationContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  sidebarColumn: {
    margin: '0.375rem',
  },

  documentationLink: {
    margin: '0.25rem',
    flexBasis: '16rem',
  },

  documentationType: {
    flexGrow: 1,
  },

  link: (theme: Theme) =>
    css({
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
        color: theme.palette.POSTBOX,
      },
    }),
};

export default styles;
