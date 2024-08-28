import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { GelPageGrid, GridItemLarge } from '#components/Grid';
import { getImageParts } from '#routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/Text';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  getAboutTags,
  getFirstPublished,
  getLastPublished,
} from '#lib/utilities/parseAssetData';
import RelatedTopics from '#containers/RelatedTopics';
import ImageWithCaption from '../../components/ImageWithCaption';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import Disclaimer from '../../components/Disclaimer';

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

const StyledImageWrapper = styled.div`
  grid-column: 5 / span 12;
  @media (max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: 2 / span 6;
  }

  @media (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    grid-column: 1 / span 6;
  }
`;

const getImageSizes = ({ blocks }) => {
  if (!blocks) {
    return null;
  }
  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const height = path(['model', 'height'], rawImageBlock);
  const width = path(['model', 'width'], rawImageBlock);
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
  const { brandName, showRelatedTopics } = useContext(ServiceContext);
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
  const indexImagePath = path(['promo', 'indexImage', 'path'], pageData);
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
  const topics = path(['metadata', 'topics'], pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);

  // ATI
  const { atiAnalytics } = metadata;
  const atiData = {
    ...atiAnalytics,
    pageTitle: `${atiAnalytics.pageTitle} - ${brandName}`,
  };

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image: props => {
      const sizes = getImageSizes(props);

      return (
        <StyledImageWrapper>
          <ImageWithCaption {...props} sizes={sizes} />
        </StyledImageWrapper>
      );
    },
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    disclaimer: props => <Disclaimer {...props} />,
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
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={title} />
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

export default PhotoGalleryPage;
