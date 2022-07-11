import styled from '@emotion/styled';

import { StoryPromoLiBase } from '#containers/NewStoryPromoList';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';

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
  display: flex;
  margin: 0;
  width: 100%;
  height: inherit;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(50% - ${GEL_SPACING});
  }
`;

export const RelatedContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${GEL_SPACING_DBL};
`;
