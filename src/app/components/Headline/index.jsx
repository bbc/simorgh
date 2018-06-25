import React from 'react';
import propTypes from 'prop-types';

const Headline = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  return (
    <h1>
      {text}
    </h1>
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
