import styled from '@emotion/styled';

import { getBrevier } from '#psammead/gel-foundations/src/typography';

const Footer = styled.footer`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  ${({ script }) => getBrevier(script)}
  color: ${props => props.theme.palette.RHINO}
`;

export default Footer;
