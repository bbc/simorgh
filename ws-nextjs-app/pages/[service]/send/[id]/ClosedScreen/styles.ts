import { Theme, css } from '@emotion/react';

export default {
  timestamp: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.bodyCopy,
      ...fontVariants.sansBold,
      display: 'inline-block',
      color: palette.BLACK,
    }),
};
