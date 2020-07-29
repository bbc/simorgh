import React, { useContext } from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import Grid from '#app/components/Grid';
import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/CpsText';
import image from '#containers/Image';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import TopStories from '#containers/CpsTopStories';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import MostReadContainer from '#containers/MostRead';
import ATIAnalytics from '#containers/ATIAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import Byline from '#containers/Byline';
import SocialEmbed from '#containers/SocialEmbed';
import CpsRecommendations from '#containers/CpsRecommendations';
import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import categoryType from './categoryMap/index';
import Include from '#containers/Include';
import { ServiceContext } from '#contexts/ServiceContext';

const StoryPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    dir,
    mostRead: { header },
    script,
    service,
    lang,
  } = useContext(ServiceContext);
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const shortHeadline = path(['promo', 'headlines', 'shortHeadline'], pageData);
  const category = path(
    ['promo', 'passport', 'category', 'categoryName'],
    pageData,
  );
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
  const aboutTags = getAboutTags(pageData);
  const mostReadInitialData = path(['mostRead'], pageData);
  const topStoriesInitialData = path(
    ['secondaryColumn', 'topStories'],
    pageData,
  );
  const featuresInitialData = path(['secondaryColumn', 'features'], pageData);
  const recommendationsInitialData = path(['recommendations'], pageData);

  const gridColumns = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 12,
    group5: 12,
  };

  const gridMargins = {
    group0: false,
    group1: false,
    group2: false,
    group3: false,
    group4: true,
    group5: true,
  };

  const gridOffset = {
    group0: 1,
    group1: 1,
    group2: 1,
    group3: 1,
    group4: 1,
    group5: 1,
  };

  const gridColsMain = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 8,
    group5: 8,
  };

  const gridColsSecondary = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 4,
    group5: 4,
  };

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
    byline: props => <StyledByline {...props} />,
    include: props => <Include {...props} />,
    social_embed: props => <SocialEmbed {...props} />,
    wsoj: props => (
      <CpsRecommendations
        {...props}
        parentColumns={gridColsMain}
        items={recommendationsInitialData}
      />
    ),
  };

  const StyledTimestamp = styled(Timestamp)`
    padding-bottom: ${GEL_SPACING_DBL};

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const StyledByline = styled(Byline)`
    padding-bottom: ${GEL_SPACING_DBL};

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const StoryPageGrid = styled(Grid)`
    flex-grow: 1;
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    }
  `;

  // Firefox specific styling to prevent content from overflowing on smaller resolutions
  const GridPrimaryColumn = styled(Grid)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      width: 100%;
    }
    padding-bottom: ${GEL_SPACING_QUAD};
  `;

  const GridSecondaryColumn = styled(Grid)`
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      margin-top: ${GEL_SPACING_QUAD};
    }
  `;

  const ComponentWrapper = styled.div`
    margin-bottom: ${GEL_SPACING_TRPL};
    padding: ${GEL_SPACING_DBL};
  `;

  /**
   * this should be the defacto wrapper for OJs
   * as it displays a conditional padding, which
   * works well for mobile view.
   */
  const ResponsiveComponentWrapper = styled.div`
    margin-bottom: ${GEL_SPACING_TRPL};
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding: ${GEL_SPACING_DBL};
    }
  `;

  const MostReadSection = styled.section.attrs(() => ({
    role: 'region',
    'aria-labelledby': 'Most-Read',
    'data-e2e': 'most-read',
  }))``;

  const MostReadWrapper = ({ children }) => (
    <MostReadSection>
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      {children}
    </MostReadSection>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
      <CpsMetadata
        title={title}
        shortHeadline={shortHeadline}
        language={lang}
        description={summary}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        imageLocator={indexImageLocator}
        imageAltText={indexImageAltText}
        aboutTags={aboutTags}
      />
      <LinkedData
        type={categoryType(category)}
        seoTitle={title}
        headline={title}
        description={summary}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
      />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <StoryPageGrid
        dir={dir}
        columns={gridColumns}
        enableGelGutters
        margins={gridMargins}
      >
        <GridPrimaryColumn
          item
          dir={dir}
          columns={gridColsMain}
          startOffset={gridOffset}
          parentColumns={gridColumns}
        >
          <main role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </main>
          <CpsRelatedContent
            content={relatedContent}
            parentColumns={gridColsMain}
          />
        </GridPrimaryColumn>
        <GridSecondaryColumn
          item
          dir={dir}
          columns={gridColsSecondary}
          parentColumns={gridColumns}
        >
          {topStoriesInitialData && (
            <ResponsiveComponentWrapper>
              <TopStories
                content={topStoriesInitialData}
                parentColumns={gridColsSecondary}
              />
            </ResponsiveComponentWrapper>
          )}
          {featuresInitialData && (
            <ResponsiveComponentWrapper>
              <FeaturesAnalysis
                content={featuresInitialData}
                parentColumns={gridColsSecondary}
              />
            </ResponsiveComponentWrapper>
          )}
          <ComponentWrapper>
            <MostReadContainer
              mostReadEndpointOverride={mostReadEndpointOverride}
              columnLayout="oneColumn"
              size="small"
              wrapper={MostReadWrapper}
              initialData={mostReadInitialData}
            />
          </ComponentWrapper>
        </GridSecondaryColumn>
      </StoryPageGrid>
    </>
  );
};

StoryPage.propTypes = cpsAssetPagePropTypes;

export default StoryPage;
