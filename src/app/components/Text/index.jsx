import React from 'react';
import propTypes from 'prop-types';

const Text = ({ model }) => {
  const { blocks } = model;

  return blocks.map(({ blockId, model: paragraphModel }) => (
    <p key={blockId}>{paragraphModel.text}</p>
  ));
};

Text.propTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        model: propTypes.shape({
          text: propTypes.string,
        }),
      }),
    ),
  }),
};

Text.defaultProps = {
  model: {
    blocks: [],
  },
};

export default Text;
