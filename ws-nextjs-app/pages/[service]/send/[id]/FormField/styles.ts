import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import { Theme, css } from '@emotion/react';

export default {
  formField: ({ spacings }: Theme) =>
    css({
<<<<<<< HEAD
      'textarea, input': {
        display: 'block',
      },
      '&:nth-child(n+2)': {
        marginTop: `${spacings.QUADRUPLE}rem`,
=======
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
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
      },
    }),
  fieldLabel: () =>
    css({
      display: 'inline-block',
      marginBottom: `${pixelsToRem(6)}rem`,
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
      outline: 'solid 0.0625rem transparent',
      width: '100%',
      minHeight: `2.75rem`,
      padding: `${spacings.FULL}rem`,
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
    }),
<<<<<<< HEAD
=======
  checkboxContainer: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexWrap: 'nowrap',
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
  textArea: () =>
    css({
      resize: 'none',
    }),
<<<<<<< HEAD
=======
  checkboxLabel: ({ spacings }: Theme) =>
    css({
      flex: 'auto',
      marginInlineStart: `${spacings.DOUBLE}rem`,
      cursor: 'pointer',
    }),
  checkbox: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      flex: 'initial',
      flexShrink: 0,
      width: `${pixelsToRem(30)}rem`,
      height: `${pixelsToRem(30)}rem`,
      cursor: 'pointer',
      boxSizing: 'border-box',
      border: `solid 0.0625rem ${palette.GREY_10}`,
      marginBottom: `${spacings.FULL}rem`,
      appearance: 'none',
      '&:checked::after': {
        content: '""',
        maskImage: `url("${CHECK_IMG}")`,
        maskRepeat: 'no-repeat',
        maskPosition: '50%',
        maskSize: '0.889rem',
        backgroundColor: 'currentcolor',
        display: 'inline-block',
        width: '100%',
        height: '100%',
      },
    }),
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
};
