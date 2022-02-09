import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { C_EBON } from '@bbc/psammead-styles/colours';

const P = styled.p`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON}
`;

export default P;
