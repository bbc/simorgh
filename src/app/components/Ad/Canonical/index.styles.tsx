import { css, Theme } from '@emotion/react';
import {
  MPU_HEIGHTS,
  MPU_MINIMUM_WIDTH,
  MPU_MINIMUM_WIDTH_PADDING,
  LEADERBOARD_HEIGHTS,
  LEADERBOARD_MINIMUM_WIDTH,
  LEADERBOARD_MINIMUM_WIDTH_PADDING,
  LEADERBOARD_LARGE_MINIMUM_WIDTH,
} from '../utilities/adSlot.styles';

const styles = {
  mpu: ({ palette, mq, spacings }: Theme) =>
    css({
      backgroundColor: palette.GREY_3,
      display: 'none',
      visibility: 'hidden',
      padding: 0,
      [MPU_MINIMUM_WIDTH]: {
        minHeight: MPU_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
      [MPU_MINIMUM_WIDTH_PADDING]: {
        padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minHeight: MPU_HEIGHTS.GROUP_3,
      },
    }),
  leaderboard: ({ mq, spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      [LEADERBOARD_MINIMUM_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
      [LEADERBOARD_MINIMUM_WIDTH_PADDING]: {
        padding: `${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_2,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_3,
        padding: `${spacings.QUADRUPLE}rem 0`,
      },
      [LEADERBOARD_LARGE_MINIMUM_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.LARGE,
        padding: `${spacings.TRIPLE}rem 0`,
      },
    }),
};

export default styles;
