import React from 'react';
import { BulletedListItem } from '#psammead/psammead-bulleted-list/src';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import InlineLink from '../InlineLink';
import inline from '../InlineContainer';

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} onClick={clickHandler} />
);

const BulletedListItemContainer = ({ blocks, onClick }) => {
  const contentBlocks = blocks.map(block => block.model.blocks || block).flat();

  return (
    <BulletedListItem>
      <Blocks
        blocks={contentBlocks}
        componentsToRender={{
          fragment,
          inline,
          urlLink: onClick ? withClickHandler(InlineLink, onClick) : InlineLink,
        }}
      />
    </BulletedListItem>
  );
};

export default BulletedListItemContainer;
