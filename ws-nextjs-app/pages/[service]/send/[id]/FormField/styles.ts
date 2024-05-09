import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import { Theme, css } from '@emotion/react';

const CHECK_IMG = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 117.65 98.87'%3E%3Cpath d='M96.64 0L46.11 60.23 17.63 36.34 0 57.35l28.47 23.89 21.01 17.63 17.63-21.01 50.54-60.22L96.64 0z'/%3E%3C/svg%3E`;

export default {
  formField: ({ spacings }: Theme) =>
    css({
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
  checkboxContainer: () =>
    css({
      display: 'flex',
      flexWrap: 'nowrap',
    }),

  textArea: () =>
    css({
      resize: 'none',
    }),
  checkboxLabel: ({ spacings }: Theme) =>
    css({
      flex: 'auto',
      marginLeft: `${spacings.DOUBLE}rem`,
      cursor: 'pointer',
    }),
  checkbox: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      flex: 'initial',
      flexShrink: 0,
      width: '30px',
      height: '30px',
      cursor: 'pointer',
      boxSizing: 'border-box',
      border: `solid 0.0625rem ${palette.GREY_10}`,
      marginBottom: `${spacings.FULL}rem`,
      appearance: 'none',
      '&:checked::after': {
        content: '""',
        backgroundImage: `url("${CHECK_IMG}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundSize: '0.889rem',
        display: 'inline-block',
        width: '100%',
        height: '100%',
      },
    }),
};
