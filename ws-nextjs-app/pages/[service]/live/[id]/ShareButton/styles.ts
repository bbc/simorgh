import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
  css({
    color: palette.BLACK,
    ...fontSizes.pica,
    ...fontVariants.sansBold,
    padding: `${spacings.FULL + spacings.HALF}rem`,
    margin: `${spacings.DOUBLE}rem 0 ${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
    border: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      border: `${pixelsToRem(2)}rem solid ${palette.BRAND_BACKGROUND}`,
      backgroundColor: palette.BRAND_BACKGROUND,
      color: palette.WHITE,
      textDecoration: 'underline',
    },
    [mq.GROUP_4_MIN_WIDTH]: {
      margin: `${spacings.DOUBLE}rem 0 ${spacings.QUADRUPLE}rem ${spacings.DOUBLE}rem`,
    },
  });
