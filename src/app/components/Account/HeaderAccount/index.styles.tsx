import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  icon: ({ palette }: Theme) =>
    css({
      height: `${pixelsToRem(24)}rem`,
      width: `${pixelsToRem(24)}rem`,
      color: palette.WHITE,
    }),

  linkWrapper: ({ palette }) =>
    css({
      display: 'flex',
      gap: `${pixelsToRem(8)}rem`,
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
        textDecorationColor: palette.WHITE,
      },
    }),

  linkText: ({ palette, mq }: Theme) =>
    css({
      color: palette.WHITE,

      [mq.GROUP_1_MAX_WIDTH]: {
        display: 'none',
      },
    }),
};
