import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  parent: ({ spacings, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.QUADRUPLE}rem ${spacings.DOUBLE}rem`,
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      border: `${pixelsToRem(3)}rem solid transparent`,
    }),

  heading: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
    }),

  textBody: ({ spacings, palette }: Theme) =>
    css({
      color: palette.GREY_10,
      margin: `${spacings.DOUBLE}rem 0`,

      a: {
        color: 'inherit',
        textDecoration: 'none',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,

        '&:hover, &:focus': {
          color: palette.POSTBOX,
          borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        },

        '&:visited': {
          color: palette.GREY_6,
          borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_6}`,
        },
      },
    }),

  button: ({ spacings, palette }: Theme) =>
    css({
      color: palette.GREY_10,
      backgroundColor: palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${palette.PHILIPPINE_GREY}`,
      borderRadius: 0,
      fontWeight: 'bold',
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
