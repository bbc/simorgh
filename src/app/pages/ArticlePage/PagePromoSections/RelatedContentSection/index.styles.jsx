import styled from '@emotion/styled';

import { StoryPromoLiBase } from '#components/OptimoPromos/Lists';
import {
  GEL_SPACING,
  GEL_SPACING_BORDER_HLF,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
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
  padding: calc(${GEL_SPACING} - ${GEL_SPACING_BORDER_HLF});

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 50%;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 33.33%;
  }
`;

export const RelatedContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-${GEL_SPACING} - ${GEL_SPACING_BORDER_HLF});
`;

export const SingleItemWrapper = styled.div`
  width: 100%;
  margin: 0 -${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 50%;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 33.33%;
  }
`;
