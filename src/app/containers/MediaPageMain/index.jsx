import React, { useContext } from 'react';
import { string, shape, object, bool } from 'prop-types';
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
            {blocks.map(({ id, text, type, live, externalId }) => {
              const blockType = live ? LIVE_RADIO_BLOCK : type;

              switch (blockType) {
                case HEADING_BLOCK:
                  return (
                    <Headline
                      key={id}
                      script={script}
                      service={service}
                      id="content"
                    >
                      {text}
                    </Headline>
                  );

                case PARAGRAPH_BLOCK:
                  return (
                    <Paragraph key={id} script={script} service={service}>
                      {text}
                    </Paragraph>
                  );

                case LIVE_RADIO_BLOCK: {
                  const MediaPlayer = {
                    canonical: CanonicalMediaPlayer,
                    amp: AmpMediaPlayer,
                  }[platform];

                  return (
                    <MediaPlayer
                      key={id}
                      showPlaceholder={false}
                      src={`/ws/av-embeds/media/${externalId}/${id}`}
                    />
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
      id: string,
      externalId: string,
      text: string,
      type: string,
      live: bool,
    }).isRequired,
  }).isRequired,
};

export default MediaPageMain;
