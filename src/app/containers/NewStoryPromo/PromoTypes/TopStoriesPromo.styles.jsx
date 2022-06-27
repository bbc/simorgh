import { getPica } from '#legacy/gel-foundations/src/typography';
import styled from '@emotion/styled';
import Promo from '../Promo';

export const StyledPromoHeading = styled(Promo.Heading)`
  ${({ script }) => script && getPica(script)}
`;

export const TopStoriesPromoWrapper = styled.div``;

export default StyledPromoHeading;
