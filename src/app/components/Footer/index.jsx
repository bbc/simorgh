import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #404040;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 16px;
`;

const StyledSpan = styled.span`
  color: #fff;
`;

const Footer = () => (
  <StyledFooter>
    <StyledSpan>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </StyledSpan>
  </StyledFooter>
);

export default Footer;
