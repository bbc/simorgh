import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import { string } from 'prop-types';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '#containers/ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '#containers/Headings';
import text from '#containers/Text';
import image from '#containers/Image';
import Blocks from '#containers/Blocks';
import timestamp from '#containers/ArticleTimestamp';
import { GhostGrid } from '#lib/styledGrid';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import articleMediaPlayer from '#containers/ArticleMediaPlayer';
import LinkedData from '#containers/LinkedData';
import MostReadContainer from '#containers/MostRead';
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
} from '#lib/utilities/parseAssetData';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: articleMediaPlayer,
  video: articleMediaPlayer,
  text,
  image,
  timestamp,
};

const StyledMain = styled.main`
  flex-grow: 1;
`;

const ArticlePage = ({ pageData, mostReadEndpointOverride }) => {
  const { articleAuthor } = useContext(ServiceContext);
  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ArticleMetadata
        articleId={getArticleId(pageData)}
        title={headline}
        author={articleAuthor}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        section={getArticleSection(pageData)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(pageData)}
        lang={getLang(pageData)}
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
      <StyledMain role="main">
        <GhostGrid>
          <Blocks
            blocks={path(['content', 'model', 'blocks'], pageData)}
            componentsToRender={componentsToRender}
          />
        </GhostGrid>
      </StyledMain>
      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        constrainMaxWidth
      />
    </>
  );
};
ArticlePage.propTypes = {
  pageData: articleDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

ArticlePage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default ArticlePage;
