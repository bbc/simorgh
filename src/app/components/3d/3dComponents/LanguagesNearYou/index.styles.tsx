import { css, Theme } from '@emotion/react';

export default {
  textHeading: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.HALF}rem`,
      paddingBottom: `${spacings.HALF}rem`,
    }),
  scene3dContainer: () =>
    css({
      width: '100%',
      height: '700px',
      minHeight: '300px',
      maxHeight: '600px',
      maxWidth: '600px',
      position: 'relative',
      outline: '1px grey solid',
    }),
  canvasContainer: () =>
    css({
      width: '100%',
      height: '100%',
    }),
  infoBox: ({ palette }: Theme) =>
    css({
      backgroundColor: `${palette.GREY_5} !important`,
      width: '220px',
      height: '100px',
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'absolute',
      bottom: '16px',
      right: '16px',
      zIndex: 10,
      boxSizing: 'border-box',
    }),
  infoIcon: ({ palette }: Theme) =>
    css({
      color: `${palette.WHITE} !important`,
      '& svg': {
        width: '20px',
        height: '20px',
        color: `${palette.WHITE} !important`,
        fill: `${palette.WHITE} !important`,
      },
    }),
};
