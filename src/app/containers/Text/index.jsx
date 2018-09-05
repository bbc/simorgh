import React from 'react';
import { textModelPropTypes } from '../../models/propTypes/text';
import Text from '../../components/Text';

const TextContainer = ({ type, blocks, typeOfPreviousBlock }) => {
  if (!blocks) return null;

  const HorizontalRule = typeOfPreviousBlock === type ? <hr /> : null;

  const textBlocks = blocks.map(({ blockId, model }) => (
    <Text key={blockId} {...model} />
  ));

  return (
    <React.Fragment>
      {HorizontalRule}
      {textBlocks}
    </React.Fragment>
  );
};

TextContainer.propTypes = textModelPropTypes;

export default TextContainer;
