import { css, Theme } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  infoBanner: () => css({ padding: 0 }),

  inner: ({ palette, spacings, mq }: Theme) =>
    css({
      background: palette.GREY_3,
      color: palette.GREY_10,
      marginBottom: `${spacings.TRIPLE}rem`,
      marginTop: `${spacings.FULL}rem`,
      padding: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MAX_WIDTH]: { lineHeight: 1.4 },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.QUADRUPLE}rem`,
        marginTop: `${spacings.DOUBLE}rem`,
      },
    }),

  increasePaddingOnDesktop: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem ${spacings.QUINTUPLE}rem`,
      },
    }),

  inlineLink: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,
      textDecoration: 'none',
      '&:visited': {
        color: palette.GREY_6,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_6}`,
      },
      '&:focus, &:hover': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};
