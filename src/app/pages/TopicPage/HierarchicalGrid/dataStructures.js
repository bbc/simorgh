import { css } from '@emotion/react';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';

const DB = css`
  grid-column: span 2;
  grid-row: span 4;
`;

const B = css`
  grid-row: span 3;
  grid-column: span 2;
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

const T = css`
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
    padding-inline-start: ${GEL_SPACING_DBL};
  }
`;

const DESKTOP = [
  [V],
  [V, V],
  [DB, T, T],
  [DB, T, V, V],
  [DB, V, V, V, V],
  [DB, V, V, V, C, C],
  [DB, V, C, C, V, C, C],
  [DB, T, V, V, C, C, C, C],
  [DB, V, V, V, V, C, C, C, C],
  [DB, V, V, V, C, C, C, C, C, C],
  [DB, V, V, C, C, C, C, C, C, C, C],
  [DB, V, V, V, V, V, C, C, C, C, C, C],
];

const TABLET = [
  [V],
  [V, V],
  [DB, V, V],
  [DB, C, C, C],
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
