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
import articleMediaPlayer from '../ArticleMediaPlayer';
import LinkedData from '../LinkedData';
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
} from './utils';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: articleMediaPlayer,
  video: articleMediaPlayer,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ pageData: data }) => {
  const { articleAuthor } = useContext(ServiceContext);
  const headline = getHeadline(data);
  const description = getSummary(data) || getHeadline(data);
  const firstPublished = getFirstPublished(data);
  const lastPublished = getLastPublished(data);
  const aboutTags = getAboutTags(data);

  return (
    <>
      <ATIAnalytics data={data} />
      <ChartbeatAnalytics data={data} />
      <ArticleMetadata
        articleId={getArticleId(data)}
        title={headline}
        author={articleAuthor}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        section={getArticleSection(data)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(data)}
        lang={getLang(data)}
        description={description}
      />
      <LinkedData
        showAuthor
        type="Article"
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
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
  pageData: articleDataPropTypes.isRequired,
};
export default ArticleMain;
