import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

const styles = {
  button: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      color: palette.BLACK,
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${spacings.FULL + spacings.HALF}rem`,
      marginTop: `${spacings.FULL}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      marginInlineStart: `${spacings.DOUBLE}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      textUnderlineOffset: '2px',
      '&:hover, &:focus-visible': {
        color: palette.WHITE,
        textDecoration: 'underline',
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
        },
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.QUADRUPLE}rem`,
      },
      [mq.HIGH_CONTRAST]: {
        color: 'canvasText',
      },
      svg: {
        verticalAlign: 'middle',
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
  buttonText: () =>
    css({
      verticalAlign: 'middle',
    }),
};
export default styles;
