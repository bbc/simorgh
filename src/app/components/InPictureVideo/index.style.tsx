import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  container: ({ spacings }: Theme) =>
    css({
      position: 'fixed',
      display: 'block',
      top: `${spacings.FULL}rem`,
      insetInlineEnd: `${spacings.FULL}rem`,
      zIndex: 10,
    }),
  videoContainer: () =>
    css({
      position: 'relative',
      width: '240px',
      height: '240px',
      borderRadius: '100%',
      overflow: 'hidden',
    }),
  clippedIFrame: () =>
    css({
      position: 'absolute',
      width: '500px',
      height: '500px',
      border: 'none',
      transform: 'scale(2)',
      top: '-150px',
      transformOrigin: 'center',
    }),
  video: () =>
    css({
      width: `${pixelsToRem(200)}rem`,
      height: `${pixelsToRem(200)}rem`,
      border: 'none',
      borderRadius: '100%',
    }),
};
