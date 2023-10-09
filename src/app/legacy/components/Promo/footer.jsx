import styled from '@emotion/styled';

import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';

const Footer = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${props => props.theme.palette.RHINO}
`;

export default Footer;
