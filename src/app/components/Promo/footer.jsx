import styled from '@emotion/styled';

import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { getBrevier } from '#legacy/gel-foundations/typography';
import { C_RHINO } from '#legacy/psammead-styles/colours';

const Footer = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${C_RHINO}
`;

export default Footer;
