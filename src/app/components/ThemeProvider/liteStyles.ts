import { css } from '@emotion/react';

const liteStyles = () => css`
  .promo-text {
    width: 100% !important;
    padding-inline-start: 0 !important;
  }
  [class*='ImageWrapper' i] {
    display: none;
  }
  [class*='textwrapper' i] {
    width: 100%;
  }
  [class*='StoryPromoWrapper' i] {
    display: block;
  }
`;

export default liteStyles;
