import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { articleDataPropTypes } from '#models/propTypes/article';
import MetadataContainer from '../Metadata';
import ArticleMetadata from '../../components/ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '#lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import mediaPlayer from '../MediaPlayer';
import processArticleData from './processArticleData';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: mediaPlayer,
  video: mediaPlayer,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData }) => {
  const {
    brandName,
    noBylinesPolicy,
    defaultImage,
    articleAuthor,
  } = useContext(ServiceContext);

  const processedData = processArticleData({
    ...articleData,
    brandName,
    noBylinesPolicy,
    defaultImage,
  });

  return (
    <>
      <ATIAnalytics data={articleData} />

      <ChartbeatAnalytics data={articleData} />

      <MetadataContainer
        metadata={path(['metadata'], articleData)}
        promo={path(['promo'], articleData)}
        pageSpecificLinkedData={path(
          ['articleSpecificLinkedData'],
          processedData,
        )}
      />

      <ArticleMetadata
        author={articleAuthor}
        firstPublished={path(['firstPublished'], processedData)}
        lastPublished={path(['lastPublished'], processedData)}
        section={path(['articleSection'], processedData)}
        aboutTags={path(['aboutTags'], processedData)}
        mentionsTags={path(['mentionsTags'], processedData)}
      />

      <main role="main">
        <GhostGrid>
          <Blocks
            blocks={path(['content', 'model', 'blocks'], articleData)}
            componentsToRender={componentsToRender}
          />
        </GhostGrid>
      </main>
    </>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
