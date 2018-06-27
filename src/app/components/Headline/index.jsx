import React from 'react';
import styled from 'styled-components';
import { textPropTypes, textDefaultPropTypes } from '../../proptypes';
import { C_EBON, FF_NEWS } from '../../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-display: optional;
  font-family: ${FF_NEWS};
  font-size: 2em;
`;

const Headline = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  return (
    <StyledHeadline>
      {text}
    </StyledHeadline>
  );
};

Headline.propTypes = textPropTypes;

Headline.defaultProps = textDefaultPropTypes;

export default Headline;
