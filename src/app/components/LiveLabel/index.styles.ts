import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelPulse: ({ mq, spacings }: Theme) =>
    css({
      width: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(15)}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
      },
    }),

  firstPromo: ({ mq }: Theme) =>
    css({
      width: `${pixelsToRem(20)}rem`,
      height: `${pixelsToRem(20)}rem`,
      [mq.GROUP_2_ONLY]: {
        width: `${pixelsToRem(22)}rem`,
        height: `${pixelsToRem(22)}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(28)}rem`,
        height: `${pixelsToRem(28)}rem`,
      },
    }),
};

export default styles;
