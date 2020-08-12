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
  of the Ad Slot.
*/
const ADSLOT_LABEL_HEIGHT = 1.5625; // 25px

const ADSLOT_HEIGHTS = {
  GROUP_1: `${3.125 + ADSLOT_LABEL_HEIGHT}rem`,
  // 50px + ADSLOT_LABEL_HEIGHT = 75px
  GROUP_2_LEADERBOARD: `${3.75 + ADSLOT_LABEL_HEIGHT}rem`,
  // 60px + ADSLOT_LABEL_HEIGHT = 85px
  GROUP_3_LEADERBOARD: `${5.625 + ADSLOT_LABEL_HEIGHT}rem`,
  // 90px + ADSLOT_LABEL_HEIGHT = 115px
  GROUP_4: `${15.625 + ADSLOT_LABEL_HEIGHT}rem`,
  // 250px + ADSLOT_LABEL_HEIGHT = 275px
};

/*
  The Ad Unit (dotcom-ad-inner) already has margin-bottom of 0.5rem and
  the 'ADVERTISEMENT' Label (dotcom-ad-text) already has margin-top of 0.5rem,
  hence the padding is set such that this is accounted for.
*/
const ADSLOT_PADDING = '0.5rem'; // 8px

export const leaderboardStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${LEADERBOARD_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_1};
    padding: 0rem ${ADSLOT_PADDING};
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: visible;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_2_LEADERBOARD};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_3_LEADERBOARD};
  }
  @media (min-width: ${LARGE_LEADERBOARD_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_4};
    padding: 0 ${ADSLOT_PADDING} ${ADSLOT_PADDING} ${ADSLOT_PADDING};
  }
`;

export const mpuStyles = css`
  display: none;
  visibility: hidden;
  @media (min-width: ${MPU_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_1};
    padding: 0rem ${ADSLOT_PADDING};
    display: block;
    visibility: visible;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${ADSLOT_HEIGHTS.GROUP_4};
  }
`;
