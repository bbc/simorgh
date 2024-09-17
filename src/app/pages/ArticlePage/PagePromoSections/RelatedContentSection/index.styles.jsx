import styled from '@emotion/styled';

import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import PromoList from '#legacy/components/OptimoPromos/PromoList';
import PromoItem from '#legacy/components/OptimoPromos/PromoItem/index.styles';
import { BORDER_SPACING } from '../constants';

export const StyledRelatedContentSection = styled.section`
  padding: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0;
  }
`;

export const StyledPromoItem = styled(PromoItem)`
  display: flex;
  margin: 0;
  width: 100%;
  height: inherit;
  padding: calc(${GEL_SPACING} - ${BORDER_SPACING});

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 50%;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 33.33%;
  }
`;

export const RelatedContentGrid = styled(PromoList)`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-${GEL_SPACING} + ${BORDER_SPACING});
`;

export const SingleItemWrapper = styled.div`
  width: 100%;
  margin: 0 -${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 50%;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 33.33%;
  }
`;
