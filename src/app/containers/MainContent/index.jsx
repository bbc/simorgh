import React from 'react';
import { shape, func } from 'prop-types';
import mainContentModelPropTypes from '../../models/propTypes/mainContent';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = ({ blocks, whitelistedBlocks }) =>
  blocks.map((block, index) => {
    const { type, blockId, model } = block;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const Block = whitelistedBlocks[type] || BlockString;

    return (
      <Block
        key={blockId}
        type={type}
        typeOfPreviousBlock={typeOfPreviousBlock}
        {...model}
      />
    );
  });

Blocks.propTypes = {
  ...mainContentModelPropTypes,
  whitelistedBlocks: shape({
    headline: func,
    subheading: func,
    text: func,
    image: func,
  }).isRequired,
};

export default Blocks;
