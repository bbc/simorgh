import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

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

  heading: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.TRIPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.QUINTUPLE}rem`,
        marginBottom: `${spacings.SEXTUPLE}rem`,
      },
    }),

  subheading: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginBottom: `${pixelsToRem(20)}rem`,
      },
    }),

  spinnerWrapper: css({
    display: 'flex',
    justifyContent: 'center',
  }),

  spinner: css({
    height: `${pixelsToRem(32)}rem`,
    width: `${pixelsToRem(32)}rem`,
  }),
};

export default styles;
