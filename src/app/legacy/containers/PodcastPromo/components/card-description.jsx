import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  max-width: 30rem;
  color: ${props => props.theme.palette.METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;
