import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../src/app/utilities/pixelsToRem';

const styles = {
  componentHealthContainer: (theme: Theme) =>
    css({
      margin: `${theme.spacings.TRIPLE}rem 0`,
      border: `0.0625rem solid ${theme.palette.SHADOW}`,
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
      padding: `${pixelsToRem(20)}rem ${theme.spacings.DOUBLE}rem`,
      borderBottom: `0.0625rem solid transparent`,
    }),

  date: (theme: Theme) =>
    css({
      alignSelf: 'flex-end',
      color: theme.palette.SHADOW,
    }),

  icon: { height: '100%', width: `100%` },

  titleIcon: {
    width: `${pixelsToRem(24)}rem`,
    height: `${pixelsToRem(24)}rem`,
    marginRight: '0.5em',
    display: 'block',
  },

  title: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
    }),

  actionIcon: (theme: Theme) =>
    css({
      color: theme.palette.SHADOW,
    }),

  warningIcon: {
    color: '#C64F00',
  },

  recommendIcon: { color: '#0A7B0A' },

  documentationContainer: (theme: Theme) =>
    css({
      margin: 0,
      padding: `${pixelsToRem(20)}rem ${theme.spacings.DOUBLE}rem`,
    }),

  documentationList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};

export default styles;
