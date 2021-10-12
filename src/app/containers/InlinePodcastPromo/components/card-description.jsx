import styled from '@emotion/styled';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_METAL } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const CardDescription = styled.p`
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  width: 235px;
  height: 54px;
  margin: 5px 0 6px;
  line-height: 1.2;
  color: #6e6e73;
`;

export default CardDescription;
