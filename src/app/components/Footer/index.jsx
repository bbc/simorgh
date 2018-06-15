import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #404040;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 16px;
`;

const SpanContent = styled.span`
  color: #fff;
`;

const Footer = () => (
  <StyledFooter>
    <SpanContent>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </SpanContent>
  </StyledFooter>
);

export default Footer;
