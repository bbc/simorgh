import React from 'react';
import { textModelPropTypes } from '../../models/propTypes/text';
import Text from '../../components/Text';

const TextContainer = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map(({ blockId, model }) => <Text key={blockId} {...model} />);
};

TextContainer.propTypes = textModelPropTypes;

export default TextContainer;
