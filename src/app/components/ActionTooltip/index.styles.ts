import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: css({
    position: 'relative',
  }),

  container: ({ spacings, palette }: Theme) =>
    css({
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      maxWidth: '21rem',
      width: '100%',
      padding: '0.75rem',
      border: `1px solid ${palette.GREY_4}`,
      margin: `0 ${spacings.HALF}rem`,
      background: palette.WHITE,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: `-${pixelsToRem(13)}rem`,
        left: '1rem',
        width: 0,
        height: 0,
        borderLeft: '0.5rem solid transparent',
        borderRight: '0.5rem solid transparent',
        borderBottom: `${pixelsToRem(13)}rem solid ${palette.GREY_4}`,
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-0.75rem',
        left: `${pixelsToRem(17)}rem`,
        width: 0,
        height: 0,
        borderLeft: `${pixelsToRem(7)}rem solid transparent`,
        borderRight: `${pixelsToRem(7)}rem solid transparent`,
        borderBottom: `0.75rem solid ${palette.WHITE}`,
      },
    }),

  content: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',

      a: {
        color: 'inherit',
        textDecoration: 'underline',

        '&:hover, &:active': {
          color: palette.POSTBOX,
        },

        '&:focus-visible': {
          color: palette.POSTBOX,
          outline: '1px solid black',
          outlineOffset: '2px',
        },
      },
    }),

  header: css({
    display: 'flex',
    alignItems: 'flex-start',
  }),

  icon: css({
    flexShrink: 0,
    width: '1.375rem',
    height: '1.375rem',
    marginInlineEnd: '0.5rem',
  }),

  title: css({
    flex: 1,
    margin: 0,
  }),

  body: ({ mq }: Theme) =>
    css({
      margin: '1rem 0 0',

      [mq.GROUP_0_MAX_WIDTH]: {
        display: 'none',
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      flexShrink: 0,
      marginInlineStart: '1.5rem',
      marginBlockStart: '-0.75rem',
      marginInlineEnd: '-0.75rem',
      width: '2.75rem',
      height: '2.75rem',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: palette.WHITE,
      border: 'none',
      cursor: 'pointer',

      svg: {
        display: 'block',
        fill: palette.GREY_10,
      },

      '&:hover': {
        background: palette.POSTBOX,

        svg: {
          fill: palette.WHITE,
        },
      },

      '&:focus-visible': {
        background: palette.POSTBOX,
        outline: `2px solid ${palette.WHITE}`,
        boxShadow: `0 0 0 0.25rem ${palette.GREY_10}`,

        svg: {
          fill: palette.WHITE,
        },
      },
    }),
};

export default styles;
