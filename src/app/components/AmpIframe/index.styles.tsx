import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  overflow: ({ palette }: Theme) =>
    css({
      background:
        'linear-gradient(0deg, #fff 0%, rgba(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0) 100%)',
      display: 'flex',
      justifyContent: 'center',

      '&::after': {
        backgroundColor: palette.WHITE,
        borderTop: `${pixelsToRem(2)}rem solid ${palette.EBON}`,
        content: '""',
        display: 'block',
        height: '50%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        zIndex: '-10',
      },
    }),
  button: ({ palette, spacings, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      backgroundColor: palette.EBON,
      border: `${pixelsToRem(1)}rem solid transparent`,
      color: palette.WHITE,
      cursor: 'pointer',
      display: 'block',
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      '&:focus, &:hover': {
        textDecoration: 'underline',
      },
    }),
};
