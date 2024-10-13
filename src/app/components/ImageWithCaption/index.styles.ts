import { css, Theme } from '@emotion/react';

const styles = {
  figure: (theme: Theme) =>
    css({
      margin: 0,
      paddingBottom: `${theme.spacings.TRIPLE}rem`,
      width: '100%',
      height: '100%',
    }),
  liteImageOverlay: ({ palette }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: palette.GREY_2,
      zIndex: 1,
      height: 200,
      border: `1px solid ${palette.GREY_4}`,
      marginBottom: '1rem',
    }),
  liteImageOverlayButton: ({ palette, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '1rem',
      backgroundColor: palette.GREY_2,
      color: palette.BLACK,
      border: `1px solid ${palette.BLACK}`,
      borderRadius: '4px',
      cursor: 'pointer',
    }),
};

export default styles;
