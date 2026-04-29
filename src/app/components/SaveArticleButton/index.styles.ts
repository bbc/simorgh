import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  buttonWrapper: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.TRIPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        width: '100%',
        marginLeft: `${spacings.FULL}rem`,
        marginRight: `${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${pixelsToRem(280)}rem`,
        marginLeft: `${spacings.DOUBLE}rem`,
        marginRight: '0',
      },
      [mq.GROUP_3_ONLY]: {
        width: `${pixelsToRem(280)}rem`,
        marginLeft: `${spacings.DOUBLE}rem`,
        marginRight: '0',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(280)}rem`,
        marginLeft: 0,
        marginRight: 0,
      },
    }),
};

export default styles;
