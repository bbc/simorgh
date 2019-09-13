import React, { useContext } from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';

import HeadingBlock from './blocks/heading';
import SubHeadingBlock from './blocks/subheading';
import LiveRadioBlock from './blocks/liveradio';
import ParagraphBlock from './blocks/paragraph';
import ImageBlock from './blocks/image';
import TimestampBlock from './blocks/timestamp';
import ListBlock from './blocks/list';

const blockMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  liveradio: LiveRadioBlock,
  image: ImageBlock,
  timestamp: TimestampBlock,
  crosshead: SubHeadingBlock,
  list: ListBlock,
};

const LIVE_RADIO_BLOCK = 'liveradio';
const SKIP_LINK_ANCHOR_ID = 'content';

const MediaPageMain = ({ pageData, service }) => {
  const { script } = useContext(ServiceContext);
  const blocks = path(['content', 'blocks'], pageData);
  const promo = path(['promo'], pageData);
  const metadata = path(['metadata'], pageData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <Grid>
          <GridItemConstrainedMedium>
            {blocks.map((props, index) => {
              const { uuid, id, type } = props;
              const isFirstBlock = index === 0;
              const idAttr = isFirstBlock ? SKIP_LINK_ANCHOR_ID : null;
              const blockType =
                id === LIVE_RADIO_BLOCK ? LIVE_RADIO_BLOCK : type;

              const Block = blockMap[blockType];

              if (!Block) {
                // eslint-disable-next-line jsx-a11y/accessible-emoji
                return <p>⁉️ What is a {blockType} ⁉️</p>;
              }

              return (
                <Block
                  {...{
                    ...props,
                    idAttr,
                    key: uuid,
                    script,
                    service,
                  }}
                />
              );
            })}
          </GridItemConstrainedMedium>
        </Grid>
      </main>
    </>
  );
};

MediaPageMain.propTypes = {
  service: string.isRequired,
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
    }),
    promo: shape({
      subtype: string,
      name: string,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          uuid: string,
          id: string,
          externalId: string,
          text: string,
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default MediaPageMain;
