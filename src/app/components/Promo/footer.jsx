import styled from '@emotion/styled';

import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { getBrevier } from '#legacy/gel-foundations/src/typography';
import { C_RHINO } from '#legacy/psammead-styles/src/colours';

const Footer = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${C_RHINO}
`;

export default Footer;
