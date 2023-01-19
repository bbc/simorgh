import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../src/app/utilities/pixelsToRem';

const styles = {
  documentationContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  iconContainer: {
    display: 'inline-block',
    boxSizing: 'border-box',
  },

  linkIconContainer: {
    width: `${pixelsToRem(14)}rem`,
    height: `${pixelsToRem(14)}rem`,
    marginLeft: '0.5em',
    verticalAlign: `-${pixelsToRem(2)}rem`,
  },

  statusIconContainer: {
    borderRadius: '100%',
    width: `${pixelsToRem(20)}rem`,
    height: `${pixelsToRem(20)}rem`,
    padding: `${pixelsToRem(4)}rem`,
  },

  icon: { height: '100%', width: `100%` },

  positive: (theme: Theme) =>
    css({ background: '#0A7B0A', color: `${theme.palette.WHITE}` }),

  negative: (theme: Theme) =>
    css({
      background: `${theme.palette.POSTBOX}`,
      color: `${theme.palette.WHITE}`,
    }),

  missing: (theme: Theme) =>
    css({
      padding: 0,
      borderRadius: 0,
      color: theme.palette.SHADOW,
    }),

  sidebarColumn: {
    margin: `${pixelsToRem(6)}rem`,
    marginLeft: '0',
  },

  sidebarText: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
    }),

  documentationLink: {
    margin: `${pixelsToRem(4)}rem`,
  },

  documentationType: {
    flexGrow: 1,
  },

  link: (theme: Theme) =>
    css({
      textDecoration: 'underline',
      color: theme.palette.SHADOW,
      '&:hover': {
        color: theme.palette.POSTBOX,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '&:focus': {
        color: theme.palette.POSTBOX,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
        outline: `${pixelsToRem(3)}rem solid ${theme.palette.BLACK}`,
        boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${theme.palette.WHITE}`,
        outlineOffset: `${pixelsToRem(3)}rem`,
      },
    }),
};

export default styles;
