import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';
import { getInlineLinkStyles } from '#app/components/InlineLink/index.styles';

const CHECK_IMG = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='canvasText' viewBox='0 0 117.65 98.87'%3E%3Cpath d='M96.64 0L46.11 60.23 17.63 36.34 0 57.35l28.47 23.89 21.01 17.63 17.63-21.01 50.54-60.22L96.64 0z'/%3E%3C/svg%3E`;

export default {
  formField: ({ spacings, palette, mq }: Theme) =>
    css({
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
  fieldLabel: ({ palette, fontVariants }: Theme) =>
    css({
      display: 'inline-block',
      marginBottom: `${pixelsToRem(6)}rem`,
      color: palette.GREY_10,
      a: { ...getInlineLinkStyles(palette), ...fontVariants.sansBold },
    }),
  fieldLabelError: ({ palette }: Theme) =>
    css({
      color: palette.ERROR_CORE,
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
  textFieldError: ({ palette }: Theme) =>
    css({
      border: `solid 0.0625rem ${palette.ERROR_CORE}`,
    }),
  checkboxContainer: () =>
    css({
      display: 'flex',
      flexWrap: 'nowrap',
    }),
  maxWordLabel: ({ palette }: Theme) =>
    css({
      marginBottom: `${pixelsToRem(6)}rem`,
      color: palette.GREY_10,
    }),
  erroredMaxWordLabel: ({ palette }: Theme) =>
    css({
      color: palette.ERROR_CORE,
    }),
  textArea: () =>
    css({
      resize: 'none',
      display: 'block',
    }),
  checkboxLabel: ({ spacings }: Theme) =>
    css({
      flex: 'auto',
      marginInlineStart: `${spacings.DOUBLE}rem`,
      cursor: 'pointer',
    }),
  checkbox: ({ palette }: Theme) =>
    css({
      display: 'inline-block',
      flex: 'initial',
      flexShrink: 0,
      width: `${pixelsToRem(30)}rem`,
      height: `${pixelsToRem(30)}rem`,
      cursor: 'pointer',
      boxSizing: 'border-box',
      border: `solid 0.0625rem ${palette.GREY_10}`,
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
  checkboxError: ({ palette }: Theme) =>
    css({
      border: `solid 0.0625rem ${palette.ERROR_CORE}`,
    }),
  errorText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),
  errorSvg: ({ mq, palette }: Theme) =>
    css({
      fill: palette.WHITE,
      verticalAlign: 'middle',
      marginInlineEnd: '0.75rem',
      minWidth: '1.5rem',
      [mq.HIGH_CONTRAST]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  errorMessageBox:
    (hasArrowStyle: boolean) =>
      ({ palette, spacings }: Theme) =>
        css({
          backgroundColor: palette.ERROR_CORE,
          outline: 'solid 0.0625rem transparent',
          padding: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          ...(!hasArrowStyle && {
            marginTop: `${spacings.FULL}rem`,
            marginBottom: `${spacings.FULL}rem`,
          }),
        }),
  errorArrow: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.ERROR_CORE,
      clipPath: 'polygon(0px 100%, 50% 0px, 100% 100%)',
      width: `${spacings.DOUBLE}rem`,
      height: '0.75rem',
      marginInlineStart: `${spacings.DOUBLE}rem`,
      marginTop: `${spacings.FULL}rem`,
      '&::after': {
        content: '""',
        border: '0.5rem solid transparent',
      },
    }),
};
