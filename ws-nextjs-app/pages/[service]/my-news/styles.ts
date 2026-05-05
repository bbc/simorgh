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

  empty: ({ palette }) =>
    css({
      textAlign: 'center',
      padding: '3rem 0',

      '& p': {
        color: palette.GREY_10,
        marginTop: '1rem',
      },
    }),
};

export default styles;
