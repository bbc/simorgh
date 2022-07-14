import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_BORDER,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#app/legacy/gel-foundations/src/breakpoints';
import {
  StoryPromoUlBase,
  StoryPromoLiBase,
} from '#components/OptimoPromos/Lists';

export const StyledWrapper = styled.section`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

export const FlexPromoList = styled(StoryPromoUlBase)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: flex;
    flex-wrap: wrap;
    gap: calc(${GEL_SPACING_DBL} - ${GEL_SPACING_BORDER});
  }
`;

export const FlexPromoListItem = styled(StoryPromoLiBase)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    height: inherit;
    flex-grow: 1;
    flex-basis: 0;
    margin: 0;
  }
`;
