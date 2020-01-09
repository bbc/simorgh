import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { GhostGrid } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import headings from '../Headings';
import Timestamp from '../ArticleTimestamp';
import text from '../CpsText';
import image from '../Image';
import MediaPlayer from '../CpsAssetMediaPlayer';
import Blocks from '../Blocks';
import CpsRelatedContent from '../CpsRelatedContent';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import fauxHeadline from '../FauxHeadline';
import visuallyHiddenHeadline from '../VisuallyHiddenHeadline';
import { getFirstPublished, getLastPublished } from '../ArticleMain/utils';

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const relatedContent = pathOr(
    [],
    ['relatedContent', 'groups', 0, 'promos'],
    pageData,
  );
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image,
    timestamp: props =>
      allowDateStamp ? <Timestamp {...props} popOut={false} /> : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
  };

  return (
    <>
      <MetadataContainer
        title={title}
        lang={metadata.language}
        description={summary}
        openGraphType="website"
      >
        <meta name="article:published_time" content={firstPublished} />
        <meta name="article:modified_time" content={lastPublished} />
      </MetadataContainer>
      <LinkedData
        type="Article"
        seoTitle={title}
        headline={title}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
      />
      <ATIAnalytics data={pageData} />
      <GhostGrid as="main" role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </GhostGrid>
      <CpsRelatedContent content={relatedContent} />
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
