import { css, Theme } from '@emotion/react';
import { GROUP_1_MAX_WIDTH } from '#app/components/ThemeProvider/mediaQueries';

const styles = {
  body: ({ spacings, palette, fontSizes }: Theme) =>
    css({
      marginTop: 0,
      marginBottom: `${spacings.DOUBLE}rem`,
      color: palette.GREY_10,
      ...fontSizes.longPrimer,
    }),
  item: ({ mq, spacings }: Theme) =>
    css({
      position: 'relative',
      display: 'inline',
      '.promo-image': {
        'div div:nth-child(2) div': {
          padding: `${spacings.FULL}rem`,
          [mq.GROUP_4_MIN_WIDTH]: {
            padding: '0.75rem',
          },
          svg: {
            margin: 0,
            [mq.GROUP_4_MIN_WIDTH]: {
              width: `${spacings.TRIPLE}rem`,
              height: `${spacings.TRIPLE}rem`,
            },
          },
          time: {
            marginLeft: `${spacings.FULL}rem`,
            padding: '0',
          },
        },
      },
    }),
  list: ({ mq, spacings, isLite }: Theme) =>
    css({
      padding: 0,
      margin: `0 0 ${spacings.QUINTUPLE}rem`,
      display: 'grid',
      gridGap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: 'repeat(2, 1fr)',
      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },

      ...(isLite && {
        gridTemplateColumns: 'unset',

        [mq.GROUP_3_MIN_WIDTH]: {
          gridTemplateColumns: 'unset',
        },
        [mq.GROUP_4_MIN_WIDTH]: {
          gridTemplateColumns: 'unset',
        },

        li: {
          gridColumn: 'unset',
          gridRow: 'unset',
          paddingTop: 0,

          '&::before': {
            display: 'none',
          },
          '.promo-image': {
            display: 'none',
          },
          '.promo-text': {
            width: '100%',
            paddingInlineStart: 0,
          },
        },
      }),
    }),
};

const DesktopBigPromo = css({
  gridColumn: 'span 2',
  gridRow: 'span 4',
  marginTop: '0.5rem',
});

const BigPromo = css({
  gridRow: 'span 3',
  gridColumn: 'span 2',
  marginTop: '0.5rem',
  '.promo-paragraph': {
    display: 'none',
  },
});

const VerticalPromo = css({
  marginTop: '0.5rem',
  gridColumn: 'span 1',
  gridRow: 'span 2',
  '.promo-image': {
    'div div:nth-child(2)': {
      [GROUP_1_MAX_WIDTH]: {
        position: 'relative',
      },
    },
  },
  '.promo-paragraph': {
    display: 'none',
  },
});

const TallPromo = css({
  gridColumn: 'span 1',
  gridRow: 'span 4',
  marginTop: '0.5rem',
  ' .promo-paragraph': {
    display: 'none',
  },
});

const CompactPromo = css({
  gridColumn: 'span 1',
  gridRow: 'span 1',
  paddingTop: '0.5rem',
  marginTop: '0.5rem',
  '.promo-image': {
    display: 'none',
  },
  '.promo-paragraph': {
    display: 'none',
  },
  '::before': {
    top: 0,
    content: '""',
    background: '#e6e8ea',
    width: '100%',
    height: `${1 / 16}rem`,
    position: 'absolute',
    left: 0,
  },
});

const HorizontalPromo = css({
  gridColumn: 'span 2',
  gridRow: 'span 1',
  paddingTop: '0.5rem',
  '.promo-paragraph': {
    display: 'none',
  },
  '.promo-image': {
    width: '33%',
    display: 'inline-block',
    verticalAlign: 'top',
    'div div:nth-child(2)': {
      [GROUP_1_MAX_WIDTH]: {
        position: 'relative',
      },
    },
  },
  '.promo-text': {
    width: '67%',
    display: 'inline-block',
    verticalAlign: 'top',
    paddingInlineStart: '0.5rem',
  },
  '::before': {
    top: 0,
    content: '""',
    background: '#e6e8ea',
    width: '100%',
    height: `${1 / 16}rem`,
    position: 'absolute',
    left: 0,
  },
});

export {
  styles,
  DesktopBigPromo,
  BigPromo,
  VerticalPromo,
  TallPromo,
  CompactPromo,
  HorizontalPromo,
};
