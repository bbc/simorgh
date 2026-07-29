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
      maxWidth: `${pixelsToRem(336)}rem`,
      width: '100%',
      display: 'flex',
      gap: '0.5rem',
      padding: '0.75rem',
      border: '1px solid #C8C8C8',
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
        borderBottom: `${pixelsToRem(13)}rem solid #C8C8C8`,
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
        borderBottom: `${pixelsToRem(12)}rem solid ${palette.WHITE}`,
      },
    }),

  icon: css({
    flexShrink: 0,
    width: `${pixelsToRem(22)}rem`,
    height: `${pixelsToRem(22)}rem`,
  }),

  content: ({ spacings, palette }: Theme) =>
    css({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacings.DOUBLE}rem`,

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

  title: ({ fontSizes }: Theme) =>
    css({
      margin: 0,
      fontWeight: 700,
      ...fontSizes.brevier,
    }),

  body: ({ fontSizes, mq }: Theme) =>
    css({
      margin: 0,
      ...fontSizes.brevier,

      [mq.GROUP_0_MAX_WIDTH]: {
        display: 'none',
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      flexShrink: 0,
      alignSelf: 'flex-start',
      marginInlineStart: '1.5rem',
      marginBlockStart: '-0.75rem',
      marginInlineEnd: '-0.75rem',
      padding: 0,
      width: '2.75rem',
      height: '2.75rem',
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
        boxShadow: `0 0 0 ${pixelsToRem(4)}rem ${palette.GREY_10}`,

        svg: {
          fill: palette.WHITE,
        },
      },
    }),
};

export default styles;
