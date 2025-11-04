import { Theme, css } from '@emotion/react';

const styles = {
  pageWrapper: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
    }),
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
  padding: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem 0`,
      [(mq.GROUP_1_ONLY, mq.GROUP_2_ONLY)]: {
        padding: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_3_ONLY]: {
        padding: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.QUINTUPLE}rem 0`,
      },
    }),
  title: ({ palette, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
      color: palette.GHOST,
    }),
  description: ({ palette, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
      color: palette.GHOST,
    }),
  synopses: ({ palette, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
      color: palette.GHOST,
    }),
  curationStyles: ({ palette }: Theme) =>
    css({
      '& h2, & a': {
        color: palette.GHOST,
      },
    }),
};

export default styles;
