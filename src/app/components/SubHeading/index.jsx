import React from 'react';
import styled from 'styled-components';
import { extractText } from '../../helpers/blockHandlers';
import { textBlockPropTypes } from '../../models/propTypes/text';
import { textDefaultPropTypes } from '../../models/propTypes';
import mediaQuery from '../../helpers/mediaQueries';

const StyledSubHeading = styled.h2`
  font-size: 1.25em;
  line-height: 1.5em;
  ${mediaQuery.smartPhone} {
    font-size: 1.25em;
    line-height: 1.5em;
  }
  ${mediaQuery.tablet} {
    font-size: 1.625em;
    line-height: 1.875em;
  }
  ${mediaQuery.desktop} {
    font-size: 1.5em;
    line-height: 1.75em;
  }
`;

const SubHeading = ({ blocks }) => {
  const { text } = extractText(blocks);

  if (!text) {
    return null;
  }

  return <StyledSubHeading>{text}</StyledSubHeading>;
};

SubHeading.propTypes = textBlockPropTypes;

SubHeading.defaultProps = textDefaultPropTypes;

export default SubHeading;
