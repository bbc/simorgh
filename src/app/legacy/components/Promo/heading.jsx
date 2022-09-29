import styled from '@emotion/styled';

import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { C_EBON } from '#psammead/psammead-styles/src/colours';

const Heading = styled.h2`
  ${({ service }) => getSerifMedium(service)}
  ${({ typography, script }) => typography?.(script) || getBodyCopy(script)}
  color: ${C_EBON};
  margin-top: 0;
  margin-bottom: ${GEL_SPACING};
`;

export default Heading;
