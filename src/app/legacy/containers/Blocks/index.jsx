import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';

const Clearer = styled.div`
  clear: both;
`;

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map((block, index) => {
    const { type, model, id, position, blockGroupType, blockGroupIndex } =
      block;

    if (!componentsToRender || !type) {
      return null;
    }
    const Block = componentsToRender[type];

    if (!Block) {
      return null;
    }

    const Wrapper = path(['simorghMetadata', 'clear'], block)
      ? Clearer
      : Fragment;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};
    return (
      <Wrapper key={id}>
        <Block
          position={position}
          type={type}
          typeOfPreviousBlock={typeOfPreviousBlock}
          blockGroupType={blockGroupType}
          blockGroupIndex={blockGroupIndex}
          {...model}
        />
      </Wrapper>
    );
  });

export default Blocks;
