import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map((block, index) => {
    const { type, model } = block;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const Block = componentsToRender[type];

    return Block ? (
      <Block
        key={nanoid()}
        type={type}
        typeOfPreviousBlock={typeOfPreviousBlock}
        {...model}
      />
    ) : null;
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
