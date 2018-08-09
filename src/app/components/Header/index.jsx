import React from 'react';
import Brand from '../Brand';
import styled from 'styled-components';
import {
  C_POSTBOX,
  C_WHITE,
  GEL_SPACING_DBL,
  GEL_SPACING_HLF,
} from '../../lib/constants/styles';

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 80px;
  width: 100%;
  padding: ${GEL_SPACING_DBL}px;
`;
const StyledLink = styled.a`
  :hover,
  :focus {
    text-decoration: none;
    border-bottom: ${GEL_SPACING_HLF}px solid ${C_WHITE};
    padding: ${GEL_SPACING_DBL}px 0;
  }
`;

const Header = () => (
  <header role="banner">
    <Brand />
  </header>
);

export default Header;
