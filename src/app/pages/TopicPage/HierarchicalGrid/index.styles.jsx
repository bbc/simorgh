import { css } from '@emotion/react';

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
  DesktopBigPromo,
  BigPromo,
  VerticalPromo,
  TallPromo,
  CompactPromo,
  HorizontalPromo,
};
