import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map((block, index) => {
    const { type, model } = block;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const Block = componentsToRender[type] || BlockString;

    return (
      <Block
        key={nanoid()}
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
