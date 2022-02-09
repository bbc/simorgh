import React from 'react';
import styled from '@emotion/styled';

import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { C_RHINO } from '@bbc/psammead-styles/colours';

const StyledFooter = styled.footer`
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => getBrevier(script)}
  color: ${C_RHINO}
`;

const Footer = props => {
  return <StyledFooter {...props} />;
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
