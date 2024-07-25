import { css, Theme } from '@emotion/react';

const styles = {
  nav: () =>
    css({
      display: 'block',
      margin: '0 auto 2.5rem auto',
      textAlign: 'center',
    }),
  liveNavMargin: () =>
    css({
      margin: '0 auto 2rem auto',
    }),
  unorderedList: ({ mq }: Theme) =>
    css({
      display: 'inline-block',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      position: 'relative',
      top: '0.1rem',
      textAlign: 'center',
      [mq.GROUP_1_MAX_WIDTH]: { display: 'none' },
    }),
  activeA: ({ palette }: Theme) =>
    css({
      display: 'block',
      color: palette.GREY_10,
      textDecoration: 'none',
      height: '100%',
      width: '100%',
      padding: '0.0625rem 0.625rem 0 0.625rem',
      borderBottom: `0.25rem ${palette.POSTBOX} solid`,
      '&:focus, &:hover': {
        padding: 0,
        border: `0.0625rem ${palette.POSTBOX} solid`,
        borderBottomWidth: '0.25rem',
      },
    }),

  inactiveA: ({ palette }: Theme) =>
    css({
      display: 'block',
      color: palette.GREY_10,
      textDecoration: 'none',
      height: '100%',
      width: '100%',
      padding: '0.0625rem',
      '&:focus, &:hover': {
        padding: 0,
        border: `0.0625rem ${palette.POSTBOX} solid`,
      },
    }),

  textSummary: ({ fontVariants, mq, palette }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      color: palette.GREY_6,
      display: 'inline-block',
      margin: '0 1.375rem',
      b: {
        ...fontVariants.sansBold,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'none',
      },
    }),
  block: ({ fontVariants, mq }: Theme) =>
    css({
      ...fontVariants.sansBold,
      width: '2.75rem',
      height: '2.75rem',
      lineHeight: '2.75rem',
      textAlign: 'center',
      margin: '0 0.125rem',
      svg: {
        [mq.FORCED_COLOURS]: {
          fill: 'linkText',
        },
        fill: 'currentColor',
        width: '1rem',
        height: '1rem',
        position: 'relative',
        top: '0.2rem',
      },
    }),
  elipsisBlock: ({ fontVariants, mq, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      width: '2.75rem',
      height: '2.75rem',
      lineHeight: '2.75rem',
      textAlign: 'center',
      margin: '0 0.125rem',
      color: palette.GREY_5,
      svg: {
        [mq.FORCED_COLOURS]: {
          fill: 'canvasText',
        },
        fill: 'currentColor',
        width: '1rem',
        height: '1rem',
        position: 'relative',
        top: '0.2rem',
      },
    }),
};

export default styles;
