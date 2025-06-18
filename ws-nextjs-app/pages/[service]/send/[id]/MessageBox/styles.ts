import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  focusIndicatorErrorSummary: ({ palette }: Theme) =>
    css({
      '&:focus': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
    }),
  linkHoverAndFocus: ({ palette, mq }: Theme) =>
    css({
      '&:focus, &:hover': {
        color: palette.ERROR_CORE,
        backgroundColor: palette.WHITE,
        backgroundClip: 'content-box',
        [mq.FORCED_COLOURS]: {
          textDecoration: 'underline', // changes textDecoration for A11y
        },
      },
      '&:focus-visible': {
        backgroundClip: 'padding-box',
      },
    }),
  plainLabel: ({ palette, fontSizes, mq }: Theme) =>
    css({
      ...fontSizes.minion,
      color: palette.WHITE,
      display: 'inline-block',
      padding: `${pixelsToRem(6)}rem 0`,
      [mq.FORCED_COLOURS]: {
        textDecoration: 'none',
      },
    }),
  list: ({ spacings }: Theme) =>
    css({
      marginBottom: 0,
      paddingInlineStart: 0, // reset
      marginTop: `${spacings.HALF}rem`,
    }),
  singleItem: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginTop: `${spacings.HALF}rem`,
    }),
  listItem: () =>
    css({
      marginBottom: 0, // reset
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
      [mq.FORCED_COLOURS]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  errorMessageBox: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.ERROR_CORE,
      outline: 'solid 0.0625rem transparent',
      padding: '0.75rem',
    }),
  strongWrapper: () =>
    css({
      display: 'flex',
      alignItems: 'center',
    }),
  hasArrowStyle: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.FULL}rem`,
      marginBottom: `${spacings.FULL}rem`,
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
