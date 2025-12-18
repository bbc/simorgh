import { css, Theme } from '@emotion/react';

const styles = {
  main: ({ spacings, mq }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: ({ spacings }: Theme) =>
    css({
      maxWidth: '63rem',
      margin: `${spacings.TRIPLE}rem auto`,
    }),
  text: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.DOUBLE}rem`,
    }),
};

export default styles;
