import styled from '@emotion/styled';

import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { C_RHINO } from '#psammead/psammead-styles/src/colours';

const Footer = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${C_RHINO}
`;

export default Footer;
