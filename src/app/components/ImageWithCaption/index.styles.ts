import { css, Theme } from '@emotion/react';

const styles = {
  figure: (theme: Theme) =>
    css({
      margin: 0,
      paddingBottom: `${theme.spacings.TRIPLE}rem`,
      width: '100%',
      height: '100%',
    }),
  liteImageOverlayButton: ({ palette }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: palette.WHITE,
      zIndex: 1,
      width: '100%',
      height: 200,
      border: 'none',
      cursor: 'pointer',

      '&:hover, &:focus-visible': {
        outline: 'none',
        boxShadow: 'none',

        span: {
          backgroundColor: palette.BLACK,
          color: palette.WHITE,
        },
      },
    }),
  liteImageButtonText: ({ palette }: Theme) =>
    css({
      padding: '1rem',
      color: palette.BLACK,
      border: `2px solid ${palette.BLACK}`,
    }),
};

export default styles;
