import styled from '@emotion/styled';
import { getPica } from '#legacy/gel-foundations/src/typography';
import Promo from '#components/OptimoPromos';
import { GEL_SPACING } from '#app/legacy/gel-foundations/src/spacings';

export const StyledTimestamp = styled(Promo.Timestamp)`
  padding-top: ${GEL_SPACING};
`;

export const StyledTitle = styled(Promo.Title)`
  display: inline;
  ${({ script }) => script && getPica(script)}
`;

export const TitleWithContent = styled(StyledTitle)`
  padding-bottom: ${GEL_SPACING};
`;
