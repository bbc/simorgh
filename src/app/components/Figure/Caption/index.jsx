import React, { Fragment } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  FF_NEWS_SANS_REG,
  C_STORM,
  GEL_SPACING,
} from '../../../lib/constants/styles';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import mediaQuery from '../../../helpers/mediaQueries';

const StyledCaption = styled.figcaption`
  background-color: #d5d0cd;
  color: ${C_STORM};
  font-family: ${FF_NEWS_SANS_REG};
  padding: ${GEL_SPACING};

  // Font styling below is a subset of BBC GEL Typography "Long Primer"
  font-size: 0.9375em;
  line-height: 1.125rem;
  ${mediaQuery.laptopAndLarger} {
    font-size: 0.875em;
  }
`;

const Caption = ({ text }) => (
  <Fragment>
    <VisuallyHiddenText>Image caption, </VisuallyHiddenText>
    <StyledCaption>{text}</StyledCaption>
  </Fragment>
);

Caption.propTypes = {
  text: string.isRequired,
};

export default Caption;
