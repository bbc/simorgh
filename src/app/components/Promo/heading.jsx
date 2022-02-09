import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { C_EBON } from '@bbc/psammead-styles/colours';

const Heading = styled.h1`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBodyCopy(script)}
  color: ${C_EBON};
  margin-top: 0;
`;

export default Heading;
