import { css, Theme } from '@emotion/react';

/** Ad Slot Widths (for custom breakpoints)
 *
 * These have an extra 16px (1rem) variant added in order to account for the padding on both the left and
 * right sides of 8px (0.5rem) due to the requirement of having 0.5rem around the container at the smallest
 * breakpoint for both MPUs and Leaderboards. This requirement is ignored between 320px - 336px
 * for Leaderboards and 300px - 316px for MPUs as the padding makes the Ad overflow in these breakpoints.
 * Further details can be found here: https://github.com/bbc/simorgh/pull/7480#discussion_r471376726
 */
const MPU_WIDTH_MIN = '18.75rem'; // 300px

const MPU_WIDTH_MIN_PADDING = '19.75rem'; // 316px

const LEADERBOARD_WIDTH_MIN = '20rem'; // 320px

const LEADERBOARD_WIDTH_MIN_PADDING = '21rem'; // 336px

const LARGE_LEADERBOARD_WIDTH_MIN = '58.75rem'; // 940px

/** Ad Slot Heights
 *
 * The height of the Ad Slot Label is taken into account for the total max height
 * of the Ad Slot. As of 13/08/2020, there are shared values between the MPU and Leaderboard heights,
 * however this may be subject to change in the future, hence the duplication.
 */

// This value is the total height of the Ad Label (25px) whilst accounting for the bottom margin (8px)
const AD_UNIT_MARGIN = 2.0625; // 33px

const MPU_HEIGHTS = {
  GROUP_1: `${3.125 + AD_UNIT_MARGIN}rem`,
  // 50px + AD_UNIT_MARGIN = 75px
  GROUP_3: `${15.625 + AD_UNIT_MARGIN}rem`,
  // 250px + AD_UNIT_MARGIN = 275px
};

const LEADERBOARD_HEIGHTS = {
  GROUP_1: `${3.125 + AD_UNIT_MARGIN}rem`,
  // 50px + AD_UNIT_MARGIN = 75px
  GROUP_2: `${3.75 + AD_UNIT_MARGIN}rem`,
  // 60px + AD_UNIT_MARGIN = 85px
  GROUP_3: `${5.625 + AD_UNIT_MARGIN}rem`,
  // 90px + AD_UNIT_MARGIN = 115px
  LARGE: `${16.625 + AD_UNIT_MARGIN}rem`,
  // 266px + AD_UNIT_MARGIN = 291px
};

/**
 * The Ad Unit (dotcom-ad-inner) already has margin-bottom of 0.5rem and
 * the 'ADVERTISEMENT' Label (dotcom-ad-text) already has margin-top of 0.5rem,
 * hence the padding is set such that this is accounted for.
 */

const styles = {
  leaderboard: ({ mq, spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      [`@media (min-width: ${LEADERBOARD_WIDTH_MIN})`]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
      [`@media (min-width: ${LEADERBOARD_WIDTH_MIN_PADDING})`]: {
        padding: `${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_2,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_3,
        padding: `${spacings.QUADRUPLE}rem 0`,
      },
      [`@media (min-width: ${LARGE_LEADERBOARD_WIDTH_MIN})`]: {
        minHeight: LEADERBOARD_HEIGHTS.LARGE,
        padding: `${spacings.TRIPLE}rem 0`,
      },
    }),
  ampLeaderboard: ({ mq, spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      [`@media (min-width: ${LEADERBOARD_WIDTH_MIN})`]: {
        minHeight: LEADERBOARD_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
        padding: `${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: LEADERBOARD_HEIGHTS.LARGE,
        padding: `${spacings.TRIPLE}rem 0`,
      },
    }),
  mpu: ({ mq, spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      padding: 0,
      [`@media (min-width: ${MPU_WIDTH_MIN})`]: {
        minHeight: MPU_HEIGHTS.GROUP_1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
      [`@media (min-width: ${MPU_WIDTH_MIN_PADDING})`]: {
        padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minHeight: MPU_HEIGHTS.GROUP_3,
      },
    }),
  ampMpu: ({ spacings }: Theme) =>
    css({
      display: 'none',
      visibility: 'hidden',
      padding: 0,
      [`@media (min-width: ${MPU_WIDTH_MIN})`]: {
        minHeight: MPU_HEIGHTS.GROUP_3,
        padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        visibility: 'visible',
      },
    }),
};

export default styles;
