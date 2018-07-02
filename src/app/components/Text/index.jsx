import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

const Text = ({ blocks }) =>
  blocks.map(({ blockId, model }) => (
    <p key={blockId}>
      {model.text}
    </p>
  ));

Text.propTypes = {
  blocks: arrayOf(
    shape({
      blockId: string,
      model: shape({
        text: string,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

Text.defaultProps = {
  blocks: [],
};

export default Text;
