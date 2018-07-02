import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import Markdown from 'markdown-to-jsx';

const Text = ({ blocks }) =>
  blocks.map(({ blockId, model }) => (
    <Markdown key={blockId} options={{ forceBlock: true }}>
      {model.text}
    </Markdown>
  ));

Text.propTypes = {
  blocks: arrayOf(
    shape({
      blockId: string,
      model: shape({
        text: string,
      }),
    }),
  ),
};

Text.defaultProps = {
  blocks: [],
};

export default Text;
