import styled from '@emotion/styled';

import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { getBodyCopy } from '#legacy/gel-foundations/src/typography';
import { C_EBON } from '#legacy/psammead-styles/src/colours';

const P = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON}
`;

export default P;
