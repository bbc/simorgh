import styled from '@emotion/styled';

import { StoryPromoUlBase } from '#containers/NewStoryPromoList';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';

export const StoryPromoUlGrid = styled(StoryPromoUlBase)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GEL_SPACING};
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
