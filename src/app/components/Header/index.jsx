import React from 'react';
import styled from 'styled-components';
import { C_POSTBOX, GEL_SPACING_DBL } from '../../lib/constants/styles';
import Brand from '../Brand';

const StyledHeader = styled.header`
  background-color: ${C_POSTBOX};
  height: 80px;
  width: 100%;
  padding: ${GEL_SPACING_DBL}px;
`;

const Header = () => (
  <StyledHeader role="banner">
    <Brand />
  </StyledHeader>
);

export default Header;
