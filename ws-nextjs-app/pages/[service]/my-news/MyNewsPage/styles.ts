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
  innerContent: css({
    '.no-js &': {
      display: 'none',
    },
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

  section: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      '&:first-of-type': {
        marginTop: 0,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.SEXTUPLE}rem`,
      },
    }),

  spinnerWrapper: css({
    display: 'flex',
    justifyContent: 'center',
  }),

  spinner: ({ mq }) =>
    css({
      height: `${pixelsToRem(32)}rem`,
      width: `${pixelsToRem(32)}rem`,
      [mq.FORCED_COLOURS]: {
        fill: 'canvasText',
      },
    }),
};

export default styles;
