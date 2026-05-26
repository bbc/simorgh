import { css } from '@emotion/react';

const styles = {
  main: ({ spacings, mq }) =>
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

  heading: css({
    padding: '2rem 0',
  }),
};

export default styles;
