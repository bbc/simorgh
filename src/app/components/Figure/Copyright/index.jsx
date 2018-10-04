import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_WHITE,
  GEL_SPACING,
  GEL_SPACING_HLF,
} from '../../../lib/constants/styles';
import { T_MINION } from '../../../lib/constants/typography';
import VisuallyHiddenText from '../../VisuallyHiddenText';

const StyledCopyright = styled.p.attrs({
  role: 'text',
})`
  ${T_MINION};
  background-color: rgba(34, 34, 34, 0.75);
  text-transform: uppercase;
  color: ${C_WHITE};
  padding: ${GEL_SPACING_HLF} ${GEL_SPACING};
  font-family: ${FF_NEWS_SANS_REG};
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
`;

const Copyright = ({ children }) => {
  const attributionText = `Image source, `;

  return (
    <StyledCopyright>
      <VisuallyHiddenText>{attributionText}</VisuallyHiddenText>
      {children}
    </StyledCopyright>
  );
};

Copyright.propTypes = {
  children: string.isRequired,
};

export default Copyright;
