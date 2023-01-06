import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  parent: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${pixelsToRem(16)}rem`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      border: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
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

  button: ({ spacings, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${palette.PHILIPPINE_GREY}`,
      borderRadius: 0,
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        color: palette.WHITE,
        border: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
        textDecoration: 'underline',
      },
    }),
};
