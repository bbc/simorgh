import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  background-color: #404040;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 16px;
`;

const StyledContent = styled.span`
  color: #fff;
`;

const Footer = () => (
  <StyledFooter>
    <StyledContent>
      Copyright &copy; {new Date().getFullYear()} BBC. The BBC is not
      responsible for the content of external sites.
    </StyledContent>
  </StyledFooter>
);

export default Footer;
