import React from 'react';
import styled from 'styled-components';
import { textPropTypes, textDefaultPropTypes } from '../../helpers/proptypes';
import { C_EBON, FF_NEWS_SANS_REG } from '../../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
  font-family: ${FF_NEWS_SANS_REG};
  font-size: 2em;
`;

const Headline = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  if(!text){
    return null;
  }

  return (
    <StyledHeadline>
      {text}
    </StyledHeadline>
  );
};

Headline.propTypes = textPropTypes;

Headline.defaultProps = textDefaultPropTypes;

export default Headline;
