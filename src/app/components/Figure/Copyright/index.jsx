import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_WHITE,
  C_EBON,
  GEL_SPACING,
} from '../../../lib/constants/styles';
import { T_MINION } from '../../../lib/constants/typography';
import VisuallyHiddenText from '../../VisuallyHiddenText';

const StyledCopyright = styled.span.attrs({
  role: 'text',
})`
  ${T_MINION};
  background-color: ${C_EBON};
  text-transform: uppercase;
  color: ${C_WHITE};
  padding: ${GEL_SPACING};
  font-family: ${FF_NEWS_SANS_REG};
  position: absolute;
  bottom: 0;
  right: 0;

  /*
    The hidden '.' is required for accessibility reasons
    https://github.com/bbc/simorgh/issues/456#issuecomment-419405600
  */
  &::after {
    content: '.';
    color: ${C_EBON}; /* This needs to match the background-color */
  }
`;

const Copyright = ({ children }) => (
  <StyledCopyright>
    <VisuallyHiddenText>Image source,</VisuallyHiddenText>
    {children}
  </StyledCopyright>
);

Copyright.propTypes = {
  children: node.isRequired,
};

export default Copyright;
