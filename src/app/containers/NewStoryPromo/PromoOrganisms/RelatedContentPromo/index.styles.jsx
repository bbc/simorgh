import styled from '@emotion/styled';

import {
  StoryPromoUlBase,
  StoryPromoLiBase,
} from '#containers/NewStoryPromoList';
import {
  GEL_SPACING,
  GEL_SPACING_BORDER,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';
import { C_GREY_2, C_WHITE } from '#app/legacy/psammead-styles/src/colours';

export const StoryPromoUlGrid = styled(StoryPromoUlBase)`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StyledWrapper = styled.section`
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0;
  }
`;

export const StyledStoryPromoLi = styled(StoryPromoLiBase)`
  height: 100%;
  background-color: ${C_WHITE};
  border: ${GEL_SPACING_BORDER} solid ${C_GREY_2};
`;

export const SingleItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const SingleItemWrapper = styled.div`
  background-color: ${C_WHITE};
  border: ${GEL_SPACING_BORDER} solid ${C_GREY_2};
`;
