import { css, Theme } from '@emotion/react';

const styles = {
  copyright: (theme: Theme) =>
    css({
      backgroundColor: 'rgba(34, 34, 34, 0.75)',
      textTransform: 'uppercase',
      color: theme.palette.WHITE,
      padding: `${theme.spacings.HALF}rem ${theme.spacings.FULL}rem`,
      position: 'absolute',
      bottom: 0,
      insetInlineStart: 0,
      margin: 0,
      fontFamily: 'ReithSans, Helvetica, Arial, sans-serif',
      overflow: 'hidden',
      span: {
        fontSize: '0.75rem',
      },
    }),
};

export default styles;
