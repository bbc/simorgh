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
      padding: `${spacings.DOUBLE}rem 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0`,
      },
    }),
  playerMargins: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_3_MAX_WIDTH]: {
        marginLeft: `-${spacings.DOUBLE}rem`,
        marginRight: `-${spacings.DOUBLE}rem`,
      },
    }),
  title: ({ palette, spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.TRIPLE}rem`,
      display: 'block',
      color: palette.GHOST,
    }),
  description: ({ palette, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.QUINTUPLE}rem`,
      display: 'block',
      color: palette.GHOST,
    }),
  curationStyles: ({ palette }: Theme) =>
    css({
      '& h2, & a': {
        color: palette.GHOST,
      },
      '& a:visited': {
        color: palette.GREY_5,
      },
    }),
  reorderedLayout: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      '& > .media-player': {
        order: 0,
      },
      '& > .title': {
        order: 1,
      },
      '& > .description': {
        order: 2,
      },
      '& > .curations': {
        order: 3,
      },
    }),
};

export default styles;
