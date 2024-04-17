import { css } from '@emotion/react';

const liteStyles = () => css`
  [class*='ImageWrapper' i] {
    display: none;
  }
  [class*='TextWrapper' i] {
    width: 100%;
  }
  [class*='StoryPromoWrapper' i] {
    display: block;

    [class*='ImageGridItem' i] {
      display: none;
    }
  }
  [class*='ChildWrapper' i] {
    position: relative;
  }
`;

export default liteStyles;
