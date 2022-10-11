import { css, Theme } from '@emotion/react';

const styles = {
  body: ({ spacings }: Theme) =>
    css({
      marginTop: 0,
      marginBottom: `${spacings.DOUBLE}rem`,
    }),
  item: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      display: 'inline',
      paddingBottom: `${spacings.FULL}rem`,
    }),
  list: ({ mq, spacings }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      display: 'grid',
      gridGap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: 'repeat(2, 1fr)',
      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    }),
};

const DesktopBigPromo = css({
  gridColumn: 'span 2',
  gridRow: 'span 4',
});

const BigPromo = css({
  gridRow: 'span 3',
  gridColumn: 'span 2',
  '.promo-paragraph': {
    display: 'none',
  },
});

const VerticalPromo = css({
  gridColumn: 'span 1',
  gridRow: 'span 2',
  '.promo-paragraph': {
    display: 'none',
  },
});

const TallPromo = css({
  gridColumn: 'span 1',
  gridRow: 'span 4',
  ' .promo-paragraph': {
    display: 'none',
  },
});

const CompactPromo = css({
  gridColumn: 'span 1',
  gridRow: 'span 1',
  '.promo-image': {
    display: 'none',
  },
  '.promo-paragraph': {
    display: 'none',
  },
});

const HorizontalPromo = css({
  gridColumn: 'span 2',
  gridRow: 'span 1',
  '.promo-paragraph': {
    display: 'none',
  },
  '.promo-image': {
    width: '33%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  '.promo-text': {
    width: '67%',
    display: 'inline-block',
    verticalAlign: 'top',
    paddingInlineStart: '1rem',
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
