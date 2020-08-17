import { css } from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

// Ad Slot widths for custom breakpoints
/*
  These have an extra 16px (1rem) added in order to account for the padding on both the left and
  right sides of 8px (0.5rem) in order to account for the padding requirement of having 0.5rem
  around the container at the smallest breakpoint for both MPUs and Leaderboards.
  Further details can be found here: https://github.com/bbc/simorgh/pull/7480#discussion_r471376726

*/

const MPU_WIDTH_MIN = '19.75rem'; // 316px

const LEADERBOARD_WIDTH_MIN = '21rem'; // 336px

const LARGE_LEADERBOARD_WIDTH_MIN = '58.75rem'; // 940px

// Ad Slot Heights
/*
  The height of the Ad Slot Label is taken into account for the total max height
  of the Ad Slot. As of 13/08/2020, there are shared values between the MPU and Leaderboard heights,
  however this may be subject to change in the future, hence the duplication.
*/

// This value is the total height of the Ad Label (25px) whilst accounting for the bottom margin (8px)
const AD_UNIT_MARGIN = 2.0625; // 33px

const MPU_HEIGHTS = {
  GROUP_1: `${3.125 + AD_UNIT_MARGIN}rem`,
  // 50px + AD_UNIT_MARGIN = 75px
  GROUP_2: `${3.125 + AD_UNIT_MARGIN}rem`,
  // 50px + AD_UNIT_MARGIN = 75px
  GROUP_3: `${15.625 + AD_UNIT_MARGIN}rem`,
  // 250px + AD_UNIT_MARGIN = 275px
  GROUP_4: `${15.625 + AD_UNIT_MARGIN}rem`,
  // 250px + AD_UNIT_MARGIN = 275px
};

const LEADERBOARD_HEIGHTS = {
  GROUP_1: `${3.125 + AD_UNIT_MARGIN}rem`,
  // 50px + AD_UNIT_MARGIN = 75px
  GROUP_2: `${3.75 + AD_UNIT_MARGIN}rem`,
  // 60px + AD_UNIT_MARGIN = 85px
  GROUP_3: `${5.625 + AD_UNIT_MARGIN}rem`,
  // 90px + AD_UNIT_MARGIN = 115px
  LARGE: `${15.625 + AD_UNIT_MARGIN}rem`,
  // 250px + AD_UNIT_MARGIN = 275px
};

/*
  The Ad Unit (dotcom-ad-inner) already has margin-bottom of 0.5rem and
  the 'ADVERTISEMENT' Label (dotcom-ad-text) already has margin-top of 0.5rem,
  hence the padding is set such that this is accounted for.
*/

export const leaderboardStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${LEADERBOARD_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHTS.GROUP_1};
    padding: 0rem ${GEL_SPACING};
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: visible;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHTS.GROUP_2};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHTS.GROUP_3};
  }
  @media (min-width: ${LARGE_LEADERBOARD_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHTS.LARGE};
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
`;

export const mpuStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${MPU_WIDTH_MIN}) {
    min-height: ${MPU_HEIGHTS.GROUP_1};
    padding: 0rem ${GEL_SPACING};
    display: block;
    visibility: visible;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${MPU_HEIGHTS.GROUP_3};
  }
`;
