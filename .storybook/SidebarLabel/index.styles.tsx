import { css, Theme } from '@emotion/react';

const styles = {
  componentHealthContainer: (theme: Theme) =>
    css({
      margin: `${theme.spacing.FULL}rem 0`,
      border: `0.0625rem solid ${theme.palette.SHADOW}`,
    }),

  IconWrapper: (theme: Theme) =>
    css({
      marginLeft: `${theme.spacing.HALF}`,
      userSelect: 'none',
      width: '0.75rem',
    }),

  SidebarLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default styles;
