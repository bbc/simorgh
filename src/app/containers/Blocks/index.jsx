import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';

import {
  objectOf,
  arrayOf,
  func,
  shape,
  string,
  oneOfType,
  object,
} from 'prop-types';

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

Blocks.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: shape({
        blocks: arrayOf(oneOfType([string, object])),
      }).isRequired,
    }),
  ).isRequired,
  componentsToRender: objectOf(func).isRequired,
};

export default Blocks;
