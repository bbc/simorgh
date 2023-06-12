import { css, Theme } from '@emotion/react';

const styles = {
  main: ({ spacings, mq }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: css({
    maxWidth: '63rem',
    margin: '0 auto',
  }),
  curations: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE} 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0 ${spacings.SEXTUPLE}rem 0`,
      },
    }),
};

export default styles;
