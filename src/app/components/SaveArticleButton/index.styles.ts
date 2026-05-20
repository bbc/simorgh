import { css, type Theme } from '@emotion/react';

import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  buttonWrapper: ({ spacings, mq }: Theme) =>
    css({
      marginBlock: `${spacings.TRIPLE}rem`,
      marginInline: `${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(280)}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInline: 0,
      },
    }),
};

export default styles;
