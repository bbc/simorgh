import styled from '@emotion/styled';
import { getLongPrimer } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_METAL } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  max-width: 30rem;
  color: ${C_METAL};
  margin-top: ${GEL_SPACING};
`;

export default CardDescription;
