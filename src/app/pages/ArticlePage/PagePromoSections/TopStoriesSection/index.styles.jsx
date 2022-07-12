import styled from '@emotion/styled';
import { getPica } from '#legacy/gel-foundations/src/typography';
import {
  GEL_SPACING,
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
import Promo from '#components/OptimoPromos';

export const StyledPromoHeading = styled(Promo.Heading)`
  display: inline;
  ${({ script }) => script && getPica(script)}
`;

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
    gap: ${GEL_SPACING};
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

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${GEL_SPACING};
`;
