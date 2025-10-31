import { Theme, css } from '@emotion/react';

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
  margins: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [(mq.GROUP_1_ONLY, mq.GROUP_2_ONLY)]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_3_ONLY]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0`,
      },
    }),
  description: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
    }),
  synopses: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
    }),
};

export default styles;
