import { css, Theme } from '@emotion/react';
import { grid } from '../../../../legacy/psammead/psammead-styles/src/detection';

const styles = {
  link: ({ spacings, palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifMedium,

      position: 'static',
      color: palette.EBON,
      textDecoration: 'none',
      marginBottom: `${spacings.FULL}rem`,

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      '&:before': {
        bottom: 0,
        content: `''`,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        whiteSpace: 'nowrap',
        zIndex: 1,
      },
    }),

  defaultLink: ({ mq, fontSizes }: Theme) =>
    css({
      [mq.GROUP_2_MIN_WIDTH]: {
        ...fontSizes.greatPrimer,
      },
    }),

  timestamp: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
    }),

  item: () =>
    css({
      display: 'flex',
      flexDirection: 'row',
      margin: 0,
      padding: 0,
    }),

  grid: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),

  smallPaddingTop: () =>
    css({
      paddingTop: '0.2rem',
    }),

  defaultPaddingTop: () =>
    css({
      paddingTop: '0.375rem',
    }),

  smallItemLtr: ({ spacings }: Theme) =>
    css({
      paddingLeft: `${spacings.HALF}rem`,
      paddingRight: `${spacings.FULL}rem`,
    }),

  smallItemRtl: ({ spacings }: Theme) =>
    css({
      paddingLeft: `${spacings.FULL}rem`,
      paddingRight: `${spacings.HALF}rem`,
    }),

  defaultItemPadding: ({ spacings }: Theme) =>
    css({
      paddingLeft: `${spacings.DOUBLE}rem`,
      paddingRight: `${spacings.DOUBLE}rem`,
    }),

  gridPaddingLtr: () =>
    css({
      [`@supports (${grid})`]: {
        paddingRight: 0,
      },
    }),

  gridPaddingRtl: () =>
    css({
      [`@supports (${grid})`]: {
        paddingLeft: 0,
      },
    }),
};

export default styles;
