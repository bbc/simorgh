// import { css } from '@bbc/web-styled';
import { css } from '@emotion/react';

// import { GROUP_3, createSize } from '@bbc/web-gel-foundations';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../src/app/utilities/pixelsToRem';

export const fixedHeightConciseView = css`
  min-height: '${pixelsToRem(24)}rem';
  @media (min-width: '${pixelsToRem(600)}rem') {
    min-height: '${pixelsToRem(32)}rem';
  }
`;
