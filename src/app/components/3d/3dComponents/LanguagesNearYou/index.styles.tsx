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
};
