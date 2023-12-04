import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const styles = {
  main: ({ spacings, mq }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: ({ gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
    }),
  margins: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_0_MAX_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0`,
      },
      [mq.GROUP_1_ONLY]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_2_ONLY]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
      [mq.GROUP_3_ONLY]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0`,
      },
    }),
};

export default styles;
