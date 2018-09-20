import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_WHITE,
  GEL_SPACING,
  GEL_SPACING_HLF,
} from '../../../lib/constants/styles';
import { T_MINION } from '../../../lib/constants/typography';
import VisuallyHiddenText from '../../VisuallyHiddenText';

const StyledCopyright = styled.span.attrs({
  role: 'text',
})`
  ${T_MINION};
  background-color: rgba(34, 34, 34, 0.75);
  text-transform: uppercase;
  color: ${C_WHITE};
  padding-top: ${GEL_SPACING_HLF};
  padding-bottom: ${GEL_SPACING_HLF};
  padding-left: ${GEL_SPACING};
  padding-right: ${GEL_SPACING};
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
    color: rgba(34, 34, 34, 0); /* This needs to be completely transparent */
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
