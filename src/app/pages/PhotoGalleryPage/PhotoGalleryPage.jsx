import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { node } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { GelPageGrid, GridItemLarge } from '#app/components/Grid';
import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import disclaimer from '#containers/Disclaimer';
import text from '#containers/Text';
import Image from '#containers/Image';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import cpsAssetPagePropTypes from '#models/propTypes/cpsAssetPage';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  getAboutTags,
  getFirstPublished,
  getLastPublished,
} from '#lib/utilities/parseAssetData';
import RelatedTopics from '#containers/RelatedTopics';
import { ServiceContext } from '#contexts/ServiceContext';

const PhotoGalleryPageGrid = ({ children, ...props }) => (
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

PhotoGalleryPageGrid.propTypes = {
  children: node.isRequired,
};

const getImageSizes = ({ blocks }) => {
  if (!blocks) {
    return null;
  }
  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const height = rawImageBlock?.model?.height;
  const width = rawImageBlock?.model?.width;
  const isSquareImage = height === width;
  const isTallImage = height > width;

  if (isSquareImage) {
    return '(min-width: 600px) 80vw, (min-width: 1008px) 632px, 95vw';
  }
  if (isTallImage) {
    return '(min-width: 400px) 60vw, (min-width: 600px) 80vw, (min-width: 1008px) 502px, 95vw';
  }

  return '(min-width: 1008px) 760px, 100vw';
};

const PhotoGalleryPage = ({ pageData }) => {
  const { showRelatedTopics } = useContext(ServiceContext);
  const title = pageData?.promo?.headlines?.headline;
  const shortHeadline = pageData?.promo?.headlines?.shortHeadline;
  const summary = pageData?.promo?.summary;
  const metadata = pageData?.metadata;
  const allowDateStamp = metadata?.options?.allowDateStamp;
  const assetUri = metadata?.locators?.assetUri;
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const relatedContent = pathOr(
    [],
    ['relatedContent', 'groups', 0, 'promos'],
    pageData,
  );
  const indexImagePath = pageData?.promo?.indexImage?.path;
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = pageData?.promo?.indexImage?.altText;
  const topics = pageData?.metadata?.topics;
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image: props => {
      const sizes = getImageSizes(props);

      return <Image {...props} sizes={sizes} />;
    },
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    disclaimer,
  };

  const StyledPhotoGalleryPageGrid = styled(PhotoGalleryPageGrid)`
    padding-bottom: ${GEL_SPACING_TRPL};

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_QUAD};
    }
  `;

  const StyledTimestamp = styled(Timestamp)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  return (
    <>
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
      />
      <LinkedData
        type="Article"
        seoTitle={title}
        headline={title}
        description={summary}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={indexImageLocator}
      />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />

      <StyledPhotoGalleryPageGrid as="main" role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledPhotoGalleryPageGrid>

      {showRelatedTopics && topics && (
        <PhotoGalleryPageGrid>
          <GridItemLarge>
            <RelatedTopics topics={topics} />
          </GridItemLarge>
        </PhotoGalleryPageGrid>
      )}

      <CpsRelatedContent content={relatedContent} enableGridWrapper />
    </>
  );
};

PhotoGalleryPage.propTypes = cpsAssetPagePropTypes;

export default PhotoGalleryPage;
