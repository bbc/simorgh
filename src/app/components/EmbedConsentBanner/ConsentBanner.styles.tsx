import { css, Theme } from '@emotion/react';

export default {
  self: ({ spacings, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.QUADRUPLE}rem ${spacings.DOUBLE}rem`,
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
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

        '&:hover, &:focus': {
          color: palette.POSTBOX,
        },
      },
    }),

  button: ({ spacings, palette }: Theme) =>
    css({
      color: palette.GREY_10,
      backgroundColor: palette.WHITE,
      border: `1px solid ${palette.PHILIPPINE_GREY}`,
      borderRadius: 0,
      fontWeight: 'bold',
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        color: palette.WHITE,
        border: `1px solid ${palette.POSTBOX}`,
      },
    }),
};
