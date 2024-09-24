import { Theme, css } from '@emotion/react';

export default {
  submit: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.bodyCopy,
      marginTop: `${spacings.DOUBLE}rem`,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      color: palette.WHITE,
      width: '100%',
      border: 'none',
      outline: 'solid 0.0625rem transparent',
      padding: `${spacings.FULL + spacings.HALF}rem 0`,
      cursor: 'pointer',
      '&:hover,&:focus': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
    }),
};
