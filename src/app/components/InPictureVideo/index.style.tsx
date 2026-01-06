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
  video: () =>
    css({
      width: '240px',
      height: '240px',
      borderRadius: '10%',
    }),
};
