import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  buttonWrapper: ({ spacings, mq }: Theme) =>
    css({
      marginBlock: `${spacings.DOUBLE}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(280)}rem`,
      },
    }),
};

export default styles;
