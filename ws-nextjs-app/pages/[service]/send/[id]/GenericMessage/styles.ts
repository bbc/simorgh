import { Theme, css } from '@emotion/react';

export default {
  heading: ({ spacings, fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.trafalgar,
      color: palette.GREY_10,
      marginTop: 0,
      marginBottom: `${spacings.FULL}rem`,
      '&:focus': {
        outline: 'none',
      },
    }),
};
