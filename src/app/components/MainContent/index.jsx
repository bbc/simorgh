import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { layoutGridWrapper } from '../../lib/layoutGrid';
import { C_OAT } from '../../lib/constants/styles';

export const StyledMainContent = styled.main`
  ${layoutGridWrapper};
  background-color: ${C_OAT};
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">{children}</StyledMainContent>
);

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
