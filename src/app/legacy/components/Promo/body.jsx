import styled from '@emotion/styled';

import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { C_EBON } from '#psammead/psammead-styles/src/colours';

const P = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON}
`;

export default P;
