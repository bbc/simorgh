import React, { Fragment, useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData }) => {
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  const { audiovideo: audioVideoEnabled } = useContext(DialContext);

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        {audioVideoEnabled && <h2>AV IS ENABLED K THX</h2>}
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
