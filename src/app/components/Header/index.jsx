import React from 'react';
import styled from 'styled-components';
import { C_POSTBOX, GEL_SPACING_DBL } from '../../lib/constants/styles';

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  padding: ${GEL_SPACING_DBL}px;
`;

const Header = () => (
  <StyledHeader role="banner">
    <a href="https://www.bbc.co.uk/news">BBC News</a>
  </StyledHeader>
);

export default Header;
