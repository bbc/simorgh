import pixelsToRem from '#app/utilities/pixelsToRem';
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
  playerOutline: ({ mq }: Theme) =>
    css({
      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
      },
    }),
  title: ({ mq, palette, spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      display: 'block',
      color: palette.GHOST,
      [mq.FORCED_COLOURS]: {
        paddingTop: `${spacings.FULL}rem`,
      },
    }),
  description: ({ palette, spacings }: Theme) =>
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
