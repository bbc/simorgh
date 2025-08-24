import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../src/app/utilities/pixelsToRem';

export default {
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: '1rem 0',

      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: `${spacings.FULL}rem`,
      },
    }),
  primaryColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      paddingBottom: '2rem',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 12',
      },
    }),
  orderedList: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))',
      listStyleType: 'none',
      padding: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(33%, 1fr))',
      },
      h2: {
        display: 'block',
        width: '100%',
        gridColumnStart: 1,
        gridColumnEnd: 4,
      }
    }),
  cta: () =>
    css({
      div: {
        display: 'block',
      },
    }),
  title: ({ spacings, mq, fontVariants }) =>
    css({
      ...fontVariants.sansRegular,
    }),
  buttons: ({ spacings, mq, fontVariants }) =>
    css({
      ...fontVariants.sansRegular,
      "button.inactive": {
        backgroundColor: '#EAEAEA',
      },
      "button.active": {
        backgroundColor: '#99EAEA',
      },
    }),
  listItem: ({ mq, fontSizes, palette }: Theme) =>
    css({
      maxWidth: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: '308px',
      },
      marginBottom: '32px',
      marginRight: '0px',
      paddingRight: '5px',
      time: {
        ...fontSizes.greatPrimer,
        marginBottom: '8px',
      },
      span: {
        display: 'inline-block',
        textAlign: 'start',
      },
      svg: {
        marginRight: '8px',
      },
      img: {
        maxWidth: '100%',
      },
      a: {
        textAlign: 'start',
        color: palette.RHINO,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          color: palette.POSTBOX,
        },
        span: {
            textAlign: 'start',
        },
      },
    }),
  mainContent: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
};
