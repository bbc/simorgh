import React from 'react';
import compose from 'ramda/src/compose';
import styled from 'styled-components';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { GhostGrid } from '#lib/styledGrid';
import { getImageParts } from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/CpsText';
import image from '#containers/Image';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import ATIAnalytics from '#containers/ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import {
  getFirstPublished,
  getLastPublished,
} from '#lib/utilities/parseAssetData';

// Page Handlers
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';

const CpsStyContainer = ({ pageData }) => {
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
  const indexImagePath = path(['promo', 'indexImage', 'path'], pageData);
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
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
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
  };

  const StyledGhostGrid = styled(GhostGrid)`
    flex-grow: 1;
  `;

  return (
    <>
      <CpsMetadata
        title={title}
        language={metadata.language}
        description={summary}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        imageLocator={indexImageLocator}
        imageAltText={indexImageAltText}
      />
      <LinkedData
        type="Article"
        seoTitle={title}
        headline={title}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
      />
      <ATIAnalytics data={pageData} />
      <StyledGhostGrid as="main" role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledGhostGrid>
      <CpsRelatedContent content={relatedContent} />
    </>
  );
};

const StyledTimestamp = styled(Timestamp)`
  padding-bottom: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

CpsStyContainer.propTypes = cpsAssetPagePropTypes;

const EnhancedCpsStyContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(CpsStyContainer);

export default EnhancedCpsStyContainer;
