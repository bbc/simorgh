import { Theme, css } from '@emotion/react';
import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';

export default {
  submit: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      color: palette.WHITE,
      width: '100%',
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
      border: 'none',
      padding: `${spacings.FULL + spacings.HALF}rem 0`,
      marginBottom: `${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        marginBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.FULL}rem`,
        marginBottom: `${spacings.TRIPLE}rem`,
      },
    }),
  focusIndicator: ({ palette }: Theme) =>
    css({
      '&:focus': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
        textDecoration: 'underline',
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
      },
    }),
};
