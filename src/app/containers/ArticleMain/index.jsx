import React, { Fragment } from 'react';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import audioVideo from '../AudioVideo';
import AudioVideoHead from '../../components/AudioVideoHead';
import { RequestContext } from '../../contexts/RequestContext';
import generateAVSettings from '../../lib/utilities/audioVideo/generateAVSettings';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
  audio: audioVideo,
  video: audioVideo,
};

const ArticleMain = ({ articleData }) => {
  const {
    env,
    platform,
    statsDestination,
    statsPageIdentifier,
  } = React.useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      {platform === 'canonical' ? (
        <AudioVideoHead
          audioVideoAssets={generateAVSettings({
            blocks,
            env,
            platform,
            statsDestination,
            statsPageIdentifier,
          })}
        />
      ) : null}
      <main role="main">
        <GhostWrapper>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
