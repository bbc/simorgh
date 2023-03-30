import styled from '@emotion/styled';
import { getPica } from '#psammead/gel-foundations/src/typography';
import Promo from '#components/OptimoPromos';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { BORDER_SPACING } from '../../constants';

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${GEL_SPACING};
`;

export const StyledPromoContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
export const StyledPromoTitle = styled(Promo.Title)`
  width: 100%;
  ${({ script }: { script: object }) => script && getPica(script)}
`;

export const StyledPromoMediaIndicator = styled(Promo.MediaIndicator)`
  width: 100%;
`;

export const StyledPromoWrapper = styled.div`
  border: ${BORDER_SPACING} solid transparent;
  height: 100%;
`;
