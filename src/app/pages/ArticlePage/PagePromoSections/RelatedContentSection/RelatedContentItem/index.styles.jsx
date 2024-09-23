import styled from '@emotion/styled';
import Promo from '#legacy/components/OptimoPromos';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { BORDER_SPACING } from '../../constants';

export const TitleWithContent = styled(Promo.Title)`
  padding-bottom: ${GEL_SPACING};
`;

export const StyledRelatedContentWrapper = styled.div`
  border: ${BORDER_SPACING} solid transparent;
  height: 100%;
`;
