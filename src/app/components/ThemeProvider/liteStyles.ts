import { css } from '@emotion/react';

const liteStyles = () => css`
  [class*='imagewrapper' i],
  [class*='placeholder' i] {
    display: none !important;
  }
  .promo-text {
    width: 100% !important;
    padding-inline-start: 0 !important;
  }
  [class*='textwrapper' i] {
    width: 100%;
  }
`;

export default liteStyles;
