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
          color: palette.NEWS_CORE,
          borderBottom: `${pixelsToRem(2)}rem solid ${palette.NEWS_CORE}`,
        },
      },
    }),

  button: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${
        isDarkUi ? palette.GREY_10 : palette.GREY_5
      }`,
      borderRadius: 0,
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: palette.NEWS_CORE,
        color: palette.WHITE,
        border: `${pixelsToRem(1)}rem solid ${palette.NEWS_CORE}`,
        textDecoration: 'underline',
      },

      // Applies focus indicator black outline.
      // Overrides dotted Mozilla focus ring applied by Normalize global styles.
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
      },
    }),
};
