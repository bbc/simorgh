import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';
import { GridItem, GridItemFullWidth } from '../../components/MainContent';

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

    if (type === 'image') {
      return (
        <GridItemFullWidth>
          <Block
            key={nanoid()}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
        </GridItemFullWidth>
      );
    }
    return (
      <GridItem>
        <Block
          key={nanoid()}
          type={type}
          typeOfPreviousBlock={typeOfPreviousBlock}
          {...model}
        />
      </GridItem>
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
