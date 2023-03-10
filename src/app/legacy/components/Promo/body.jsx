import styled from '@emotion/styled';

import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';

const P = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${props => props.theme.palette.EBON}
`;

export default P;
