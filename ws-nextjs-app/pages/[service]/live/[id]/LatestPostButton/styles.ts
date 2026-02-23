import { Theme, css } from '@emotion/react';
// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

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
      cursor: 'pointer',
      '&:hover, &:focus': {
        color: palette.WHITE,
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
            fill: 'canvasText',
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
