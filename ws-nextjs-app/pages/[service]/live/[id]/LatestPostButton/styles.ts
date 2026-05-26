import { css, Theme } from '@emotion/react';

import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  button: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      color: palette.WHITE,
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${pixelsToRem(12)}rem ${pixelsToRem(20)}rem`,
      borderRadius: '500px',
      border: 'none',
      backgroundColor: palette.BRAND_BACKGROUND,
      [mq.FORCED_COLOURS]: {
        color: 'canvas',
        backgroundColor: 'CanvasText',
        span: {
          backgroundColor: 'CanvasText',
        },
      },
      cursor: 'pointer',
      '&:hover, &:focus': {
        color: palette.WHITE,
        [mq.FORCED_COLOURS]: {
          color: 'canvas',
        },
        textDecoration: 'underline',
        textUnderlineOffset: `${pixelsToRem(4)}rem`,
      },
      svg: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        marginInlineEnd: `${spacings.FULL}rem`,
        path: {
          fill: palette.WHITE,
          [mq.FORCED_COLOURS]: {
            fill: 'canvas',
          },
        },
      },
    }),
  container: ({ spacings }: Theme) =>
    css({
      position: 'fixed',
      top: `${spacings.TRIPLE}rem`,
      zIndex: 9999,
    }),
};
export default styles;
