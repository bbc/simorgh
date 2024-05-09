import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  formField: ({ spacings, palette, mq }: Theme) =>
    css({
      'textarea, input': {
        display: 'block',
      },

      marginTop: `${spacings.DOUBLE}rem`,

      '&:nth-child(5)': {
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
        paddingBottom: `${spacings.DOUBLE}rem`,
        marginBottom: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        '&:nth-child(5)': {
          paddingBottom: `${spacings.TRIPLE}rem`,
          marginBottom: `${spacings.TRIPLE}rem`,
        },
      },
    }),
  fieldLabel: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginBottom: `${spacings.FULL}rem`,
    }),
  focusIndicator: ({ palette }: Theme) =>
    css({
      '&:focus': {
        outline: `${focusIndicatorThickness} solid ${palette.WHITE}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.BLACK}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
    }),
  textField: ({ spacings, fontVariants, fontSizes, palette }: Theme) =>
    css({
      border: `solid 0.0625rem ${palette.GREY_10}`,
      width: '100%',
      minHeight: `2.75rem`,
      padding: `${spacings.FULL}rem`,
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
    }),
  textArea: () =>
    css({
      resize: 'none',
    }),
};
