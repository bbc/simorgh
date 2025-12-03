import React from 'react';
import paragraph from '../Paragraph';
import unorderedList from '../BulletedList';
import Blocks from '../Blocks';

const TextContainer = ({
  blocks,
  componentsToRender = {
    paragraph,
    unorderedList,
    orderedList: unorderedList,
  },
}) => {
  if (!blocks) return null;

  return <Blocks blocks={blocks} componentsToRender={componentsToRender} />;
};

export default TextContainer;
