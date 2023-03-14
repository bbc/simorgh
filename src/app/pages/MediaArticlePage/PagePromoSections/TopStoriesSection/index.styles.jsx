import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import SectionLabel from '#psammead/psammead-section-label/src';
import PromoItem from '#components/OptimoPromos/PromoItem/index.styles';
import PromoList from '#components/OptimoPromos/PromoList';
import { BORDER_SPACING_DBL } from '../constants';

export const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
`;

export const StyledTopStoriesSection = styled.section`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

export const StyledPromoList = styled(PromoList)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: flex;
    flex-wrap: wrap;
    gap: calc(${GEL_SPACING_DBL} - ${BORDER_SPACING_DBL});
  }
`;

export const StyledPromoItem = styled(PromoItem)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    height: inherit;
    flex-grow: 1;
    flex-basis: 0;
    margin: 0;
  }
`;
