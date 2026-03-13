import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  container: ({ palette, mq, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: `${palette.GREY_10}`,
      backgroundColor: `${palette.GREY_2}`,
      margin: `${spacings.DOUBLE}rem 0`,
      padding: `${spacings.FULL}rem`,
      minHeight: `${pixelsToRem(260)}rem`,
      flexDirection: 'column',
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0 ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: `${pixelsToRem(350)}rem`,
      },
    }),
  message: () =>
    css({
      textAlign: 'center',
    }),
  icon: ({ mq }: Theme) =>
    css({
      display: 'none',
      [mq.GROUP_1_MIN_WIDTH]: {
        display: 'block',
      },
      width: `${pixelsToRem(24)}rem`,
      height: `${pixelsToRem(24)}rem`,
      fill: 'currentcolor',
    }),
};

export default styles;
