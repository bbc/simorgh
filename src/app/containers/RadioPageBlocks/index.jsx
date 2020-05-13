import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { string, shape, arrayOf } from 'prop-types';

import HeadingBlock from './Blocks/Heading';
import AudioPlayer from './Blocks/AudioPlayer';
import ParagraphBlock from './Blocks/Paragraph';

const blockMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  liveradio: AudioPlayer,
};

const SKIP_LINK_ANCHOR_ID = 'content';

const UnknownBlock = () => <></>;

const RadioPageBlocks = ({ blocks }) => {
  if (!blocks || !blocks.length) return null;

  return blocks.map((props, index) => {
    const { uuid, id, type } = props;
    const isFirstBlock = index === 0;
    const idAttr = isFirstBlock ? SKIP_LINK_ANCHOR_ID : null;
    const blockType = id || type;
    const Block = pathOr(UnknownBlock, [blockType], blockMap);

    return (
      <Block
        {...{
          ...props,
          idAttr,
          key: uuid,
          blockType,
        }}
      />
    );
  });
};

RadioPageBlocks.propTypes = {
  blocks: arrayOf(
    shape({
      uuid: string,
      id: string,
      externalId: string,
      text: string,
      type: string,
    }),
  ).isRequired,
};

export default RadioPageBlocks;
