import { getPica } from '#legacy/gel-foundations/src/typography';
import styled from '@emotion/styled';
import Promo from '../Promo';

const StyledPromoHeading = styled(Promo.Heading)`
  ${({ script }) => script && getPica(script)}
`;

export default StyledPromoHeading;
