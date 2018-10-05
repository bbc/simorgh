import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_STORM,
  GEL_SPACING,
  GEL_SPACING_DBL,
  C_STONE,
} from '../../../lib/constants/styles';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import mediaQuery from '../../../helpers/mediaQueries';
import { T_LONG_PRIMER } from '../../../lib/constants/typography';
import { ServiceContext } from '../../ServiceContext';

const StyledCaption = styled.figcaption`
  ${T_LONG_PRIMER};
  background-color: ${C_STONE};
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING};
  width: 100%;
  ${mediaQuery.laptopAndLarger} {
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
`;

const Caption = ({ children }) => (
  <StyledCaption>
    <ServiceContext.Consumer>
      {({ imageCaptionOffscreenText }) => (
        <VisuallyHiddenText>{imageCaptionOffscreenText}</VisuallyHiddenText>
      )}
    </ServiceContext.Consumer>
    {children}
  </StyledCaption>
);

Caption.propTypes = {
  // children will be "element.isRequired" in the future to support embedded <lang> and markdown
  children: node.isRequired,
};

export default Caption;
