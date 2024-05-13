import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
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
      padding: `${spacings.FULL + spacings.HALF}rem 0`,
      marginBottom: `${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
      '&:focus-visible': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        outline: ` ${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: ` 0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: ` ${focusIndicatorThickness}`,
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        marginBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.FULL}rem`,
        marginBottom: `${spacings.TRIPLE}rem`,
      },
    }),
};
