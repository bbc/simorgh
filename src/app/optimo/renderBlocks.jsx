import React from 'react';

import headline from './Headline';
import text from './Text';
import BaseText from './BaseText';
import BlockString from './BlockString';

const Blocks = {
  headline,
  text,
  paragraph: BaseText,
};

const renderBlocks = blocks =>
  blocks.map(({ type, model, blockId }) => {
    const Block = Blocks[type] || BlockString;

    return <Block key={blockId} {...model} />;
  });

export default renderBlocks;
