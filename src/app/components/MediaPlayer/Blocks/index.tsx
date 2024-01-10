/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { FC, Fragment } from 'react';

const Clearer = () => (
  <div
    css={css({
      clear: 'both',
    })}
  />
);

export type Block = {
  type: string;
  id: string;
  position: string;
  blockGroupType: string;
  blockGroupIndex: string;
  simorghMetadata?: { clear?: string };
  model: {
    text?: string;
    blocks?: Block[];
  };
};

type Props = {
  blocks: Block[];
  componentsToRender: {
    [key: string]: FC<any>;
  };
};

const Blocks = ({ blocks, componentsToRender }: Props) => (
  <>
    {blocks.map((block, index) => {
      const { type, model, id, position, blockGroupType, blockGroupIndex } =
        block;

      if (!componentsToRender || !type) {
        return null;
      }

      const BlockComponent = componentsToRender[type];

      if (!BlockComponent) {
        return null;
      }

      const Wrapper = block.simorghMetadata?.clear ? Clearer : Fragment;

      const { type: typeOfPreviousBlock } = blocks[index - 1] || {};
      return (
        <Wrapper key={id}>
          <BlockComponent
            position={position}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            blockGroupType={blockGroupType}
            blockGroupIndex={blockGroupIndex}
            {...model}
          />
        </Wrapper>
      );
    })}
  </>
);

export default Blocks;
