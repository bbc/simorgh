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

// const copyrightSymbolPrefix = '&#169; ';
const copyrightSymbolPrefix = '© ';

const StyledCopyright = styled.span`
  ${T_MINION};
  background-color: ${C_EBON};
  color: ${C_WHITE};
  padding: ${GEL_SPACING};
  font-family: ${FF_NEWS_SANS_REG};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Copyright = ({ children }) => (
  <StyledCopyright>
    {copyrightSymbolPrefix}
    {children}
  </StyledCopyright>
);

Copyright.propTypes = {
  children: node.isRequired,
};

export default Copyright;
