import { css } from '@bbc/web-styled';
import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

export const fixedHeightConciseView = css`
  min-height: ${createSize(24)};
  @media (min-width: ${GROUP_3}) {
    min-height: ${createSize(32)};
  }
`;
