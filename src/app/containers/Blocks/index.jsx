import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map(block => {
    const { type, model } = block;
    const subblocks = block.model.blocks;

    if (Object.keys(componentsToRender).includes(type)) {
      const Block = componentsToRender[type] || BlockString;

      return <Block key={nanoid()} type={type} {...model} />;
    }

    if (subblocks === undefined) {
      return null;
    }

    return (
      <Blocks blocks={subblocks} componentsToRender={componentsToRender} /> // Not 100% sure this is tail recursive, so will be increasing memory usage
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
