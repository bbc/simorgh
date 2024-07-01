import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
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
    '&:hover, &:focus': {
      border: `${pixelsToRem(2)}rem solid ${palette.BRAND_BACKGROUND}`,
      backgroundColor: palette.BRAND_BACKGROUND,
      color: palette.WHITE,
      span: {
        textDecoration: 'underline',
      },
      path: {
        fill: palette.WHITE,
      },
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      marginBottom: `${spacings.QUADRUPLE}rem`,
    },
    span: {
      verticalAlign: 'middle',
    },
    svg: {
      verticalAlign: 'middle',
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
      marginInlineEnd: `${spacings.FULL}rem`,
      path: {
        fill: palette.BLACK,
      },
    },
  });
