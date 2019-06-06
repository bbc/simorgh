import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';

const Blocks = ({ blocks, id, componentsToRender }) =>
  blocks.map((block, index) => {
    const { type, model } = block;
    const key = `${id}-${index}`;

    if (!componentsToRender || !type) {
      return null;
    }

    const Block = componentsToRender[type];

    if (!Block) {
      return null;
    }

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    return (
      <Block
        key={key}
        type={type}
        typeOfPreviousBlock={typeOfPreviousBlock}
        {...model}
      />
    );
  });

Blocks.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: objectOf(any).isRequired,
    }),
  ).isRequired,
  componentsToRender: objectOf(func).isRequired,
};

export default Blocks;
