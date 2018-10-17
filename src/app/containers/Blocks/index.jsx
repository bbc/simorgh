import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import { layoutGridItem } from '../../lib/layoutGrid';

const StyleGridFullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

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

    // make all images full bleed
    if (type === 'image') {
      return (
        <StyleGridFullWidthWrapper>
          <Block
            key={nanoid()}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
        </StyleGridFullWidthWrapper>
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
