import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { string, shape, arrayOf, bool } from 'prop-types';

import HeadingBlock from './Blocks/Heading';
import LiveRadioBlock from './Blocks/LiveRadio';
import ParagraphBlock from './Blocks/Paragraph';
import OnDemandRadioBlock from './Blocks/OnDemandRadio';

const blockMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  liveradio: LiveRadioBlock,
  episode: OnDemandRadioBlock,
};

const SKIP_LINK_ANCHOR_ID = 'content';

const UnknownBlock = () => <></>;

const RadioPageBlocks = ({ blocks, onDemand }) => {
  if (!blocks || !blocks.length) return null;

  return blocks.map((props, index) => {
    const { uuid, id, type } = props;
    const isFirstBlock = index === 0;
    const idAttr = isFirstBlock ? SKIP_LINK_ANCHOR_ID : null;
    let blockType = id || type;
    if (onDemand) blockType = 'episode';
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
  onDemand: bool,
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

RadioPageBlocks.defaultProps = {
  onDemand: false,
};

export default RadioPageBlocks;
