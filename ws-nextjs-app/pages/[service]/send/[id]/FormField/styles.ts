import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import { Theme, css } from '@emotion/react';

export default {
  formField: ({ spacings }: Theme) =>
    css({
      'textarea, input': {
        display: 'block',
      },
      '&:nth-child(n+2)': {
        marginTop: `${spacings.QUADRUPLE}rem`,
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
