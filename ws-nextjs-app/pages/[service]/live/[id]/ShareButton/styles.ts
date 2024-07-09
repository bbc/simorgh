import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

const styles = {
  button: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      color: palette.BLACK,
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${pixelsToRem(10)}rem`,
      marginTop: `${spacings.FULL}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      marginInlineStart: `${spacings.DOUBLE}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus-visible': {
        color: palette.WHITE,
        border: `${pixelsToRem(2)}rem solid ${palette.BRAND_BACKGROUND}`,
        backgroundColor: palette.BRAND_BACKGROUND,
        path: {
          fill: palette.WHITE,
          [mq.HIGH_CONTRAST]: {
            fill: 'canvasText',
          },
        },
        [mq.HIGH_CONTRAST]: {
          backgroundColor: 'canvas',
          color: 'canvasText',
          border: `${pixelsToRem(2)}rem solid canvasText`,
          textDecoration: 'underline',
        },
      },
      [mq.HIGH_CONTRAST]: {
        color: 'canvasText',
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },
      svg: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        marginInlineEnd: `${spacings.FULL}rem`,
        path: {
          fill: palette.BLACK,
          [mq.HIGH_CONTRAST]: {
            fill: 'canvasText',
          },
        },
      },
    }),
};
export default styles;
