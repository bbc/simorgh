import { Theme, css } from '@emotion/react';

export default {
  submit: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      color: palette.WHITE,
      width: '100%',
      ...fontVariants.sansBold,
      ...fontSizes.bodyCopy,
      border: 'none',
      outline: 'solid 0.0625rem transparent',
      padding: `${spacings.FULL + spacings.HALF}rem 0`,
      marginTop: `${spacings.FULL}rem`,
      cursor: 'pointer',
      '&:hover,&:focus': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
    }),
};
