import React, { useContext } from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import styled from 'styled-components';
import path from 'ramda/src/path';
import { Headline } from '@bbc/psammead-headings';
import Paragraph from '@bbc/psammead-paragraph';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import ATIAnalytics from '../ATIAnalytics';
import MetadataContainer from '../Metadata';
import { Grid, GridItemConstrainedMedium } from '../../lib/styledGrid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';

const HEADING_BLOCK = 'heading';
const PARAGRAPH_BLOCK = 'paragraph';
const LIVE_RADIO_BLOCK = 'liveradio';
const SKIP_LINK_ANCHOR_ID = 'content';

const MediaPageMain = ({ pageData, service }) => {
  const { script } = useContext(ServiceContext);
  const { platform } = useContext(RequestContext);
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
            {blocks.map(({ uuid, id, text, type, externalId }, index) => {
              const isFirstBlock = index === 0;
              const idAttr = isFirstBlock ? SKIP_LINK_ANCHOR_ID : null;
              const blockType =
                id === LIVE_RADIO_BLOCK ? LIVE_RADIO_BLOCK : type;

              switch (blockType) {
                case HEADING_BLOCK:
                case PARAGRAPH_BLOCK: {
                  const TextBlock = {
                    [HEADING_BLOCK]: Headline,
                    [PARAGRAPH_BLOCK]: Paragraph,
                  }[blockType];

                  return (
                    <TextBlock
                      key={uuid}
                      script={script}
                      service={service}
                      id={idAttr}
                    >
                      {text}
                    </TextBlock>
                  );
                }

                case LIVE_RADIO_BLOCK: {
                  const MediaPlayerOuterWrapper = styled.div`
                    @media (min-width: 63rem) {
                      display: flex;
                      justify-content: center;
                    }
                  `;

                  const MediaPlayerInnerWrapper = styled.div`
                    @media (min-width: 49.9375rem) {
                      flex-shrink: 0;
                      width: 800px;
                      max-width: calc(100vw - 2rem);
                    }
                  `;
                  const MediaPlayer = {
                    canonical: CanonicalMediaPlayer,
                    amp: AmpMediaPlayer,
                  }[platform];

                  return (
                    <MediaPlayerOuterWrapper>
                      <MediaPlayerInnerWrapper>
                        <MediaPlayer
                          key={uuid}
                          showPlaceholder={false}
                          src={`/ws/av-embeds/media/${externalId}/${id}`}
                          id={idAttr}
                        />
                      </MediaPlayerInnerWrapper>
                    </MediaPlayerOuterWrapper>
                  );
                }
                default:
                  return null;
              }
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
