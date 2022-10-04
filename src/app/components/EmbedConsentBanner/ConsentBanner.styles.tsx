import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  parent: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${pixelsToRem(16)}rem`,
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      border: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
    }),

  heading: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.greatPrimer,
      color: palette.GREY_10,
    }),

  textBody: ({ spacings, fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
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

  button: ({ spacings, fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
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
