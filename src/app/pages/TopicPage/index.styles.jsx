import { css } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const styles = {
  main: ({ spacings, mq }) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: ({ gridWidths }) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
    }),
  inline: ({ mq }) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        alignItems: 'center',
        display: 'flex',
      },
    }),
  title: ({ spacings, mq }) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE} 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.SEXTUPLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUINTUPLE}rem 0 ${spacings.SEXTUPLE}rem 0`,
      },
    }),
};

export default styles;
