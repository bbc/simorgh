import { css, Theme } from '@emotion/react';

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
      border: '0.1875rem solid transparent',
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
        borderBottom: `0.0625rem solid ${palette.GREY_10}`,

        '&:hover, &:focus': {
          color: palette.POSTBOX,
          borderBottom: `0.125rem solid ${palette.POSTBOX}`,
        },

        '&:visited': {
          color: palette.GREY_6,
          borderBottom: `0.0625rem solid ${palette.GREY_6}`,
        },
      },
    }),

  button: ({ spacings, palette }: Theme) =>
    css({
      color: palette.GREY_10,
      backgroundColor: palette.WHITE,
      border: `0.0625rem solid ${palette.PHILIPPINE_GREY}`,
      borderRadius: 0,
      fontWeight: 'bold',
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        color: palette.WHITE,
        border: `0.0625rem solid ${palette.POSTBOX}`,
      },
    }),
};
