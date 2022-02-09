import React from 'react';
import styled from '@emotion/styled';
import { C_EBON } from '@bbc/psammead-styles/colours';

const StyledA = styled.a`
  color: ${C_EBON};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:before {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    content: '';
  }
`;

const A = props => {
  return <StyledA {...props} />;
};

A.propTypes = {};

A.defaultProps = {};

export default A;
