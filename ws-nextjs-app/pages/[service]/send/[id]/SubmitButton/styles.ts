import { Theme, css } from '@emotion/react';

export default {
  submit: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      color: palette.WHITE,
      width: '100%',
      ...fontVariants.sansBold,
      ...fontSizes.bodyCopy,
      border: 'none',
      outline: 'solid 0.0625rem transparent',
      padding: `${spacings.FULL + spacings.HALF}rem 0`,
      cursor: 'pointer',
      '&:hover,&:focus': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.FULL}rem`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        marginTop: `0`,
      },
    }),
};
