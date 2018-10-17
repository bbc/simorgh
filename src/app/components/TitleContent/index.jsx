import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import ContentWrapper from '../ContentWrapper';
import { C_WHITE } from '../../lib/constants/styles';

const StyledTitleDiv = styled.div`
  background-color: ${C_WHITE};
`;

const TitleContent = ({ children }) => (
  <StyledTitleDiv>
    <ContentWrapper>{children}</ContentWrapper>
  </StyledTitleDiv>
);

TitleContent.propTypes = {
  children: node.isRequired,
};

export default TitleContent;
