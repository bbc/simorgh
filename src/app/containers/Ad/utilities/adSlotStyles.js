import { css } from 'styled-components';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

// Ad Slot Widths for custom breakpoints
const MPU_WIDTH_MIN = '18.75rem'; // 300px

const LEADERBOARD_WIDTH_MIN = '20rem'; // 320px

const LARGE_LEADERBOARD_WIDTH_MIN = '58.75rem'; // 940px

// Ad Slot Heights
/*
  The height of the Ad Slot Label is taken into account for the total max height
  of the Ad Slot. As of 13/08/2020, there are shared values between the MPU and Leaderboard heights,
  however this may be subject to change in the future, hence the duplication.
*/
const AD_SLOT_LABEL_HEIGHT = 1.5625; // 25px

const MPU_HEIGHTS = {
  GROUP_1: `${3.125 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 50px + AD_SLOT_LABEL_HEIGHT = 75px
  GROUP_2: `${3.125 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 50px + AD_SLOT_LABEL_HEIGHT = 75px
  GROUP_3: `${15.625 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 250px + AD_SLOT_LABEL_HEIGHT = 275px
  GROUP_4: `${15.625 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 250px + AD_SLOT_LABEL_HEIGHT = 275px
};

const LEADERBOARD_HEIGHTS = {
  GROUP_1: `${3.125 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 50px + AD_SLOT_LABEL_HEIGHT = 75px
  GROUP_2: `${3.75 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 60px + AD_SLOT_LABEL_HEIGHT = 85px
  GROUP_3: `${5.625 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 90px + AD_SLOT_LABEL_HEIGHT = 115px
  GROUP_4: `${15.625 + AD_SLOT_LABEL_HEIGHT}rem`,
  // 250px + AD_SLOT_LABEL_HEIGHT = 275px
};

/*
  The Ad Unit (dotcom-ad-inner) already has margin-bottom of 0.5rem and
  the 'ADVERTISEMENT' Label (dotcom-ad-text) already has margin-top of 0.5rem,
  hence the padding is set such that this is accounted for.
*/
const AD_SLOT_PADDING = '0.5rem'; // 8px

export const leaderboardStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${LEADERBOARD_WIDTH_MIN}) {
    min-height: ${LEADERBOARD_HEIGHTS.GROUP_1};
    padding: 0rem ${AD_SLOT_PADDING};
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
    min-height: ${LEADERBOARD_HEIGHTS.GROUP_4};
    padding: 0 ${AD_SLOT_PADDING} ${AD_SLOT_PADDING} ${AD_SLOT_PADDING};
  }
`;

export const mpuStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${MPU_WIDTH_MIN}) {
    min-height: ${MPU_HEIGHTS.GROUP_1};
    padding: 0rem ${AD_SLOT_PADDING};
    display: block;
    visibility: visible;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${MPU_HEIGHTS.GROUP_3};
  }
`;
