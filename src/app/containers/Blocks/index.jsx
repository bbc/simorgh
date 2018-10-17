import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import { layoutGridItem, layoutGridWrapper } from '../../lib/layoutGrid';
import {
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from '../../lib/constants/styles';

const GridItem = styled.div`
  ${layoutGridItem};
`;

const StyleGridWrapper = styled.div`
  ${layoutGridWrapper};
  grid-column: mainCol;
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    max-width: 1008px;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    max-width: 1280px;
  }
`;

const StyleGridFullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const blockShouldHaveGridWrapper = (
  Block,
  type,
  model,
  typeOfPreviousBlock,
) => {
  /* 
    if the previous block is undefined it's top level and needs a wrapper
    if the previous block is 'pragraph' then the next item needs a wrapper
    if the block is a heading it needs a wrapper (not sure why it isn't undefined?!)
  */
  if (
    (typeOfPreviousBlock === undefined && type !== 'fragment') ||
    typeOfPreviousBlock === 'paragraph' ||
    type === 'subheadline'
  ) {
    return (
      <StyleGridWrapper>
        <GridItem>
          <Block
            key={nanoid()}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
        </GridItem>
      </StyleGridWrapper>
    );
  }
  return (
    <Block
      key={nanoid()}
      type={type}
      typeOfPreviousBlock={typeOfPreviousBlock}
      {...model}
    />
  );
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

    return blockShouldHaveGridWrapper(Block, type, model, typeOfPreviousBlock);
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
