import { css, Theme } from '@emotion/react';

export default {
  link: ({ palette, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      color: palette.WHITE,
      padding: `0.75rem 0 0.75rem`,
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};
