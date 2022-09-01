import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import { node } from 'prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';
import last from 'ramda/src/last';
import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import LinkedData from '#containers/LinkedData';
import disclaimer from '#containers/Disclaimer';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/Text';
import Image from '#containers/Image';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import CpsAssetMediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import MostWatchedContainer from '#containers/MostWatched';
import ATIAnalytics from '#containers/ATIAnalytics';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import { RequestContext } from '#contexts/RequestContext';
import { GelPageGrid, GridItemLarge } from '#components/Grid';
import RelatedTopics from '#containers/RelatedTopics';
import { ServiceContext } from '../../contexts/ServiceContext';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import MediaMessage from './MediaMessage';

const StyledTimestamp = styled(Timestamp)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const MediaAssetPageGrid = ({ children, ...props }) => (
  <GelPageGrid
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
    {...props}
  >
    {children}
  </GelPageGrid>
);

MediaAssetPageGrid.propTypes = {
  children: node.isRequired,
};

const MediaAssetPage = ({ pageData }) => {
  const { showRelatedTopics } = useContext(ServiceContext);
  const { canonicalLink, isAmp } = useContext(RequestContext);
  const isLegacyMediaAssetPage = () => canonicalLink.split('/').length > 7;

  const title = path(['promo', 'headlines', 'headline'], pageData);
  const shortHeadline = path(['promo', 'headlines', 'shortHeadline'], pageData);
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
  const topics = path(['metadata', 'topics'], pageData);

  const getIndexImageLocator = () => {
    const indexImagePath = pathOr(
      '',
      ['promo', 'indexImage', 'path'],
      pageData,
    );
    return last(getImageParts(indexImagePath));
  };

  const indexImageLocator = isLegacyMediaAssetPage()
    ? null
    : getIndexImageLocator();
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const mostWatchedData = path(['mostWatched'], pageData);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image: props => (
      <Image {...props} sizes="(min-width: 1008px) 760px, 100vw" />
    ),
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,

    // There are niche scenarios where we receive legacy MAPs that contain modern video blocks
    // This is not something we currently support, so we return an error message
    video: isLegacyMediaAssetPage()
      ? MediaMessage
      : props => (
          // eslint-disable-next-line react/jsx-indent
          <CpsAssetMediaPlayer
            {...props}
            assetUri={assetUri}
            showLoadingImage
            hasBottomPadding={false}
            showCaption={false}
          />
        ),

    legacyMedia: props => (
      <CpsAssetMediaPlayer
        {...props}
        assetUri={assetUri}
        isLegacyMedia
        showLoadingImage
        hasBottomPadding={false}
        showCaption={false}
      />
    ),

    // "Versions" are live streams
    version: props => (
      <CpsAssetMediaPlayer
        {...props}
        assetUri={assetUri}
        showLoadingImage
        hasBottomPadding={false}
        showCaption={false}
      />
    ),
    unavailableMedia: MediaMessage,
    disclaimer,
  };

  const StyledMediaAssetPageGrid = styled(MediaAssetPageGrid)`
    padding-bottom: ${GEL_SPACING_TRPL};
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      width: 100%;
      padding-bottom: ${GEL_SPACING_QUAD};
    }
  `;

  const MostWatchedWrapper = styled.div`
    padding-bottom: ${GEL_SPACING_QUAD};
  `;

  return (
    <>
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <CpsMetadata
        title={title}
        shortHeadline={shortHeadline}
        language={metadata.language}
        description={summary}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        imageLocator={indexImageLocator}
        imageAltText={indexImageAltText}
        aboutTags={aboutTags}
        hasAppleItunesAppBanner
        hasAmpPage={false}
      />
      <LinkedData
        type="Article"
        seoTitle={title}
        headline={title}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={indexImageLocator}
      />
      <ATIAnalytics data={pageData} />
      <StyledMediaAssetPageGrid as="main" role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledMediaAssetPageGrid>

      {showRelatedTopics && topics && (
        <MediaAssetPageGrid>
          <GridItemLarge>
            <RelatedTopics topics={topics} />
          </GridItemLarge>
        </MediaAssetPageGrid>
      )}

      <CpsRelatedContent content={relatedContent} isMediaContent />
      {!isAmp && (
        <MostWatchedWrapper>
          <MostWatchedContainer data={mostWatchedData} />
        </MostWatchedWrapper>
      )}
    </>
  );
};

MediaAssetPage.propTypes = cpsAssetPagePropTypes;

export default MediaAssetPage;
