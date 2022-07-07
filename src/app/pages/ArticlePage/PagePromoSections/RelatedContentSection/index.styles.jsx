import styled from '@emotion/styled';

import { StoryPromoLiBase } from '#containers/NewStoryPromoList';
import {
  GEL_SPACING,
  GEL_SPACING_BORDER,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';
import Image from '#legacy/psammead-image/src';
import RelatedContentGrid from './Grid';

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
`;

export const StyledImage = styled(Image)`
  aspect-ratio: 16 / 9;
  object-fit: cover;
  height: auto;
`;

export const StyledGrid = styled(RelatedContentGrid)`
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: calc(${GEL_SPACING} - ${GEL_SPACING_BORDER});
`;
