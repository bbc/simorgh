import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';
import { focusIndicatorThickness } from '../ThemeProvider/focusIndicator';

export default {
  parent: ({ palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
      padding: `${pixelsToRem(16)}rem`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      border: `${pixelsToRem(1)}rem solid ${
        isDarkUi ? palette.GREY_2 : palette.GREY_5
      }`,
    }),

  tranparentBorder: () =>
    css({
      border: `${pixelsToRem(1)}rem solid transparent`,
    }),

  textBody: ({ spacings, palette }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0`,

      a: {
        color: 'inherit',
        textDecoration: 'none',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,

        '&:visited': {
          color: palette.GREY_6,
          borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_6}`,
        },

        '&:hover, &:focus': {
          color: palette.POSTBOX,
          borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        },
      },
    }),

  button: ({ spacings, palette, isDarkUi, mq }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${
        isDarkUi ? palette.GREY_10 : palette.PHILIPPINE_GREY
      }`,
      borderRadius: 0,
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',
      color: palette.BLACK,

      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        color: palette.WHITE,
        border: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
        textDecoration: 'underline',
      },

      [mq.FORCED_COLOURS]: {
        backgroundColor: 'canvas',
        color: 'canvasText',
        border: `${pixelsToRem(1)}rem solid canvasText`,
        '&:hover, &:focus': {
          backgroundColor: 'canvas',
          color: 'canvasText',
          border: `${pixelsToRem(1)}rem solid canvasText`,
        },
      },

      // Applies focus indicator black outline.
      // Overrides dotted Mozilla focus ring applied by Normalize global styles.
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
      },
    }),
};
