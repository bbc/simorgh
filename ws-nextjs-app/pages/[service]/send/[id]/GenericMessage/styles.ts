import { Theme, css } from '@emotion/react';

export default {
  heading: ({ spacings }: Theme) =>
    css({
      marginTop: 0,
      marginBottom: `${spacings.FULL}rem`,
      '&:focus': {
        outline: 'none',
      },
    }),
};
