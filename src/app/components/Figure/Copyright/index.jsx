import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_WHITE,
  C_EBON,
  GEL_SPACING,
} from '../../../lib/constants/styles';
import { T_MINION } from '../../../lib/constants/typography';

const copyrightSymbolPrefix = '\u00A9';

const StyledCopyright = styled.span`
  ${T_MINION};
  background-color: ${C_EBON};
  color: ${C_WHITE};
  padding: ${GEL_SPACING};
  font-family: ${FF_NEWS_SANS_REG};
  position: absolute;
  bottom: 0;
  right: 0;

  &::after {
    content: '.';
    color: ${C_EBON};
  }
`;

const copyrightRole = 'text';

const Copyright = ({ text }) => (
  <StyledCopyright role={copyrightRole}>
    {`${copyrightSymbolPrefix} ${text}`}
  </StyledCopyright>
);

Copyright.propTypes = {
  text: string.isRequired,
};

export default Copyright;
