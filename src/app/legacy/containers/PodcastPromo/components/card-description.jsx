import styled from '@emotion/styled';
import { getLongPrimer } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { C_METAL } from '#psammead/psammead-styles/src/colours';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  max-width: 30rem;
  color: ${C_METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;
