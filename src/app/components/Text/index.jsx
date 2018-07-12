import React from 'react';
import Markdown from 'markdown-to-jsx';
import {
  textModelPropTypes,
  textModelDefaultProps,
} from '../../models/propTypes/text';

const Text = ({ blocks }) =>
  blocks.map(({ blockId, model }) => (
    <Markdown key={blockId} options={{ forceBlock: true }}>
      {model.text}
    </Markdown>
  ));

Text.propTypes = textModelPropTypes;

Text.defaultProps = textModelDefaultProps;

export default Text;
