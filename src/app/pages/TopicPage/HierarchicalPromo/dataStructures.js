import { css } from '@emotion/react';

const B = css`
  grid-column: span 2;
  grid-row: span 4;
`;

const MB = css`
  grid-column: span 2;
  grid-row: span 3;
  .promo-paragraph {
    display: none;
  }
`;

const V = css`
  grid-column: span 1;
  grid-row: span 2;
  .promo-paragraph {
    display: none;
  }
`;

const DVT = css`
  grid-column: span 1;
  grid-row: span 4;
  .promo-paragraph {
    display: none;
  }
`;

const C = css`
  grid-column: span 1;
  grid-row: span 1;
  .promo-image {
    display: none;
  }
  .promo-paragraph {
    display: none;
  }
`;

const H = css`
  @media (max-width: 599px) {
    grid-column: span 2;
    grid-row: span 1;
    .promo-paragraph {
      display: none;
    }
    .promo-image {
      width: 33%;
      display: inline-block;
      vertical-align: top;
    }
    .promo-text {
      width: 67%;
      display: inline-block;
      vertical-align: top;
      padding-inline-start: 16px;
      @media (max-width: 399px) {
        padding-inline-start: 8px;
      }
  }
`;

const DESKTOP = [
  [V],
  [V, V],
  [B, DVT, DVT],
  [B, DVT, V, V],
  [B, V, V, V, V],
  [B, V, V, V, C, C],
  [B, V, C, C, V, C, C],
  [B, V, C, C, C, C, C, C],
  [B, V, V, V, V, C, C, C, C],
  [B, V, V, V, C, C, C, C, C, C],
  [B, V, V, C, C, C, C, C, C, C, C],
  [B, V, V, V, V, V, C, C, C, C, C, C],
];

const TABLET = [
  [V],
  [V, V],
  [B, V, V],
  [B, C, C, C],
  [B, DVT, C, C, C],
  [B, V, V, V, V, V],
  [B, V, V, V, V, C, C],
  [B, V, V, V, C, C, C, C],
  [B, V, V, V, V, V, C, C, C],
  [B, V, V, V, V, C, C, C, C, C],
  [B, V, V, V, C, C, C, C, C, C, C],
  [B, V, V, C, C, C, C, C, C, C, C, C],
];

const MOBILE = [
  [V],
  [V, V],
  [MB, V, V],
  [MB, V, V, H],
  [MB, V, V, V, V],
  [MB, V, V, V, V, H],
  [MB, V, V, V, V, V, V],
  [MB, V, V, V, V, V, V, H],
  [MB, V, V, V, V, V, V, H, H],
  [MB, V, V, V, V, V, V, H, H, H],
  [MB, V, V, V, V, V, V, H, H, H, H],
  [MB, V, V, V, V, V, V, H, H, H, H, H],
];

const SMALL = [
  [V],
  [V, V],
  [MB, H, H],
  [MB, H, H, H],
  [MB, H, H, H, H],
  [MB, H, H, H, H, H],
  [MB, H, H, H, H, H, H],
  [MB, H, H, H, H, H, H, H],
  [MB, H, H, H, H, H, H, H, H],
  [MB, H, H, H, H, H, H, H, H, H],
  [MB, H, H, H, H, H, H, H, H, H, H],
  [MB, H, H, H, H, H, H, H, H, H, H, H],
];

export { DESKTOP, TABLET, MOBILE, SMALL };
