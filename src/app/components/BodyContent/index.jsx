import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import ContentWrapper from '../ContentWrapper';
import { C_OAT } from '../../lib/constants/styles';

const StyledBodyDiv = styled.div`
  background-color: ${C_OAT};
`;

const BodyContent = ({ children }) => (
  <StyledBodyDiv>
    <ContentWrapper>{children}</ContentWrapper>
  </StyledBodyDiv>
);

BodyContent.propTypes = {
  children: node.isRequired,
};

export default BodyContent;
