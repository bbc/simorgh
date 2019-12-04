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
import { Helmet } from 'react-helmet';

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

const ArticleMain = ({ articleData: data }) => {
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
        <Helmet>
          <script
            async
            custom-element="amp-script"
            src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
          ></script>
        </Helmet>

        <amp-script
          layout="container"
          data-ampdevmode="true" // bypasses amp checks such as is on https and js size
          sandbox="allow-forms" // allows form input like buttons
          src={`http://localhost:7080/amp-script/testingFetch.js`}
        >
          <button>user interact with me</button>

          {/* Root Div for react app to render into */}
          <div id="root"></div>
        </amp-script>
      </main>
    </>
  );
};
ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};
export default ArticleMain;
