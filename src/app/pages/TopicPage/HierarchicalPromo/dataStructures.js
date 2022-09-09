import { css } from '@emotion/react';

const B = css`
  grid-column: span 2;
  grid-row: span 4;
  @media (max-width: 1007px) {
    grid-row: span 3;
    .promo-paragraph {
      display: none;
    }
  }
`;

const V = css`
  grid-column: span 1;
  grid-row: span 2;
  .promo-paragraph {
    display: none;
  }
`;

const MV = css`
  @media (min-width: 400px) and (max-width: 599px) {
    grid-column: span 1;
    grid-row: span 2;
    .promo-paragraph {
      display: none;
    }
  }
`;

const DVT = css`
  @media (min-width: 1008px) {
    grid-column: span 1;
    grid-row: span 4;
    .promo-paragraph {
      display: none;
    }
  }
`;

const C = `
  grid-column: span 1;
  grid-row: span 1;
  .promo-paragraph {
    display: none;
  }
`;

const DC = css`
  @media (min-width: 1008px) {
    ${C}
    .promo-image {
      display: none;
    }
    .promo-paragraph {
      display: none;
    }
  }
`;

const TC = css`
  @media (min-width: 600px) and (max-width: 1007px) {
    ${C}
    .promo-image {
      display: none;
    }
    .promo-paragraph {
      display: none;
    }
  }
`;

const horizontal = `
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

const H = css`
  @media (max-width: 599px) {
    grid-column: span 2;
    grid-row: span 1;
    .promo-paragraph {
      display: none;
    }
    ${horizontal}
  }
`;

const SH = css`
  @media (max-width: 399px) {
    grid-column: span 2;
    grid-row: span 1;
    .promo-paragraph {
      display: none;
    }
    ${horizontal}
  }
`;

const DESKTOP = [
  [V],
  [V, V],
  [B, DVT, DVT],
  [B, DVT, V, V],
  [B, V, V, V, V],
  [B, V, V, V, DC, DC],
  [B, V, DC, DC, V, DC, DC],
  [B, V, DC, DC, DC, DC, DC, DC],
  [B, V, V, V, V, DC, DC, DC, DC],
  [B, V, V, V, DC, DC, DC, DC, DC, DC],
  [B, V, V, DC, DC, DC, DC, DC, DC, DC, DC],
  [B, V, V, V, V, V, DC, DC, DC, DC, DC, DC],
];

const TABLET = [
  [V],
  [V, V],
  [B, V, V],
  [B, TC, TC, TC],
  [B, DVT, TC, TC, TC],
  [B, V, V, V, V, V],
  [B, V, V, V, V, TC, TC],
  [B, V, V, V, TC, TC, TC, TC],
  [B, V, V, V, V, V, TC, TC, TC],
  [B, V, V, V, V, TC, TC, TC, TC, TC],
  [B, V, V, V, TC, TC, TC, TC, TC, TC, TC],
  [B, V, V, TC, TC, TC, TC, TC, TC, TC, TC, TC],
];

const MOBILE = [
  [V],
  [V, V],
  [B, MV, MV],
  [B, MV, MV, H],
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
  [B, SH, SH],
  [B, SH, SH, SH],
  [B, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH],
  [B, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH],
];

export { DESKTOP, TABLET, MOBILE, SMALL };
