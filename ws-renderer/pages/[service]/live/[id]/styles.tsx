import { css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: `${pixelsToRem(20)}rem auto`,
    }),
};
