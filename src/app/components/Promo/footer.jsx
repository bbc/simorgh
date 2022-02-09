import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { C_RHINO } from '@bbc/psammead-styles/colours';

const Footer = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${C_RHINO}
`;

export default Footer;
