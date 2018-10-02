import React from 'react';
import { string } from 'prop-types';
import { textModelPropTypes } from '../../models/propTypes/text';
import Text from '../../components/Text';

const shouldPrependHR = typeOfPreviousBlock => typeOfPreviousBlock === 'text';

const TextContainer = ({ blocks, typeOfPreviousBlock }) => {
  if (!blocks) return null;

  const HorizontalRule = shouldPrependHR(typeOfPreviousBlock) ? <hr /> : null;

  const textBlocks = blocks.map(({ model }, index) => (
    <Text key={index.toString()} {...model} />
  ));

  return (
    <React.Fragment>
      {HorizontalRule}
      {textBlocks}
    </React.Fragment>
  );
};

TextContainer.propTypes = {
  ...textModelPropTypes,
  typeOfPreviousBlock: string,
};

TextContainer.defaultProps = {
  typeOfPreviousBlock: null,
};

export default TextContainer;
