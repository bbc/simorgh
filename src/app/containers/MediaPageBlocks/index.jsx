import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { string, shape, arrayOf } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

import HeadingBlock from './blocks/heading';
import LiveRadioBlock from './blocks/liveradio';
import ParagraphBlock from './blocks/paragraph';
import UnknownBlock from './blocks/unknown';

const blockMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  liveradio: LiveRadioBlock,
};

const SKIP_LINK_ANCHOR_ID = 'content';

const MediaPageMain = ({ blocks }) => {
  const { script, service } = useContext(ServiceContext);

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
          script,
          service,
          blockType,
        }}
      />
    );
  });
};

MediaPageMain.propTypes = {
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

export default MediaPageMain;
