import styled from '@emotion/styled';
import { getLongPrimer } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { C_METAL } from '#legacy/psammead-styles/src/colours';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  max-width: 30rem;
  color: ${C_METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;
