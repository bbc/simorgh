import React, { Fragment, useContext } from 'react';
import { DialContext } from '../../contexts/DialContext';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const avEnabledComment = (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: '<!-- av-enabled -->' }} />
);

const ArticleMain = ({ articleData }) => {
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;

  const { audiovideo: audioVideoEnabled } = useContext(DialContext);

  return (
    <Fragment>
      <ATIAnalytics data={articleData} />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        {audioVideoEnabled && avEnabledComment}
        <GhostGrid>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostGrid>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
