import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { C_EBON, FF_NEWS } from '../../../lib/constants/styles';

const StyledHeadline = styled.h1`
  color: ${C_EBON};
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

Headline.propTypes = {
  blocks: propTypes.arrayOf(
    propTypes.shape({
      model: propTypes.shape({
        blocks: propTypes.arrayOf(
          propTypes.shape({
            text: propTypes.string,
          }),
        ),
      }),
    }),
  ),
};

Headline.defaultProps = {
  blocks: [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
};

export default Headline;
