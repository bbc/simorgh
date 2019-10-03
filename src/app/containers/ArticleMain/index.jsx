import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '../ArticleMetadata';
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
import {
  getArticleId,
  getHeadline,
  getSummary,
  getFirstPublished,
  getLastPublished,
  getAboutTags,
  getArticleSection,
  getMentions,
  getLang,
  buildLinkedData,
} from '../ArticleMetadata/utils';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: mediaPlayer,
  video: mediaPlayer,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData: data }) => {
  const {
    brandName,
    noBylinesPolicy,
    defaultImage,
    articleAuthor,
  } = useContext(ServiceContext);

  const headline = getHeadline(data);
  const description = getSummary(data) || getHeadline(data);
  const linkedData = buildLinkedData({
    ...data,
    brandName,
    noBylinesPolicy,
    defaultImage,
  });

  return (
    <>
      <ATIAnalytics data={data} />
      <ChartbeatAnalytics data={data} />
      <ArticleMetadata
        articleId={getArticleId(data)}
        title={headline}
        seoHeadline={headline}
        description={description}
        author={articleAuthor}
        linkedData={linkedData}
        lang={getLang(data)}
        aboutTags={getAboutTags(data)}
        firstPublished={getFirstPublished(data)}
        lastPublished={getLastPublished(data)}
        section={getArticleSection(data)}
        mentionsTags={getMentions(data)}
      />
      <main role="main">
        <GhostGrid>
          <Blocks
            blocks={path(['content', 'model', 'blocks'], data)}
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
