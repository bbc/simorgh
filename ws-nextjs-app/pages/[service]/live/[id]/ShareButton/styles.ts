import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  button: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      color: palette.BLACK,
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${pixelsToRem(10)}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      marginInlineStart: `${spacings.DOUBLE}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus-visible': {
        color: palette.WHITE,
        border: `${pixelsToRem(2)}rem solid ${palette.BRAND_BACKGROUND}`,
        backgroundColor: palette.BRAND_BACKGROUND,
        '.external-svg': {
          filter: 'invert(1) hue-rotate(180deg)',
        },
        [mq.FORCED_COLOURS]: {
          backgroundColor: 'canvas',
          color: 'canvasText',
          border: `${pixelsToRem(2)}rem solid canvasText`,
          textDecoration: 'underline',
        },
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },
      '.external-svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        marginInlineEnd: `${spacings.FULL}rem`,
      },
    }),
};
export default styles;
