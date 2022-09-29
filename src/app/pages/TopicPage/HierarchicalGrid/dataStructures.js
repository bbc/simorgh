import { css } from '@emotion/react';

const DB = css({
  gridColumn: 'span 2',
  gridRow: 'span 4',
});

const B = css({
  gridRow: 'span 3',
  gridColumn: 'span 2',
  '.promo-paragraph': {
    display: 'none',
  },
});

const V = css({
  gridColumn: 'span 1',
  gridRow: 'span 2',
  '.promo-paragraph': {
    display: 'none',
  },
});

const T = css({
  gridColumn: 'span 1',
  gridRow: 'span 4',
  ' .promo-paragraph': {
    display: 'none',
  },
});

const C = css({
  gridColumn: 'span 1',
  gridRow: 'span 1',
  '.promo-image': {
    display: 'none',
  },
  '.promo-paragraph': {
    display: 'none',
  },
});

const H = css({
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

const DESKTOP = [
  [V],
  [V, V],
  [DB, T, T],
  [DB, V, V, V],
  [DB, V, V, V, V],
  [DB, V, V, V, C, C],
  [DB, V, C, C, V, C, C],
  [DB, V, C, C, C, C, C, C],
  [DB, V, V, V, V, C, C, C, C],
  [DB, V, V, V, C, C, C, C, C, C],
  [DB, V, V, C, C, C, C, C, C, C, C],
  [DB, V, V, V, V, V, C, C, C, C, C, C],
];

const TABLET = [
  [V],
  [V, V],
  [DB, V, V],
  [DB, V, C, C],
  [DB, T, V, V, V],
  [DB, V, V, V, V, V],
  [DB, V, V, V, V, C, C],
  [DB, V, V, V, C, C, C, C],
  [DB, V, V, V, V, V, C, C, C],
  [DB, V, V, V, V, C, C, C, C, C],
  [DB, V, V, V, C, C, C, C, C, C, C],
  [DB, V, V, C, C, C, C, C, C, C, C, C],
];

const MOBILE = [
  [V],
  [V, V],
  [B, V, V],
  [B, V, V, H],
  [B, V, V, V, V],
  [B, V, V, V, V, H],
  [B, V, V, V, V, V, V],
  [B, V, V, V, V, V, V, H],
  [B, V, V, V, V, V, V, H, H],
  [B, V, V, V, V, V, V, H, H, H],
  [B, V, V, V, V, V, V, H, H, H, H],
  [B, V, V, V, V, V, V, H, H, H, H, H],
];

const SMALL = [
  [V],
  [V, V],
  [B, H, H],
  [B, H, H, H],
  [B, H, H, H, H],
  [B, H, H, H, H, H],
  [B, H, H, H, H, H, H],
  [B, H, H, H, H, H, H, H],
  [B, H, H, H, H, H, H, H, H],
  [B, H, H, H, H, H, H, H, H, H],
  [B, H, H, H, H, H, H, H, H, H, H],
  [B, H, H, H, H, H, H, H, H, H, H, H],
];

export { DESKTOP, TABLET, MOBILE, SMALL };
