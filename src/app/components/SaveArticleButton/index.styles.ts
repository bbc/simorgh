import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  buttonWrapper: ({ spacings, mq }: Theme) =>
    css({
      paddingBlock: `${spacings.TRIPLE}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        marginInline: `${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(280)}rem`,
      },
    }),
};

export default styles;
