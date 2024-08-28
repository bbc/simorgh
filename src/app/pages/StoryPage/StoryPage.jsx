import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import Grid, { GelPageGrid, GridItemLarge } from '#components/Grid';
import { getImageParts } from '#routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/Text';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import TopStories from '#containers/CpsTopStories';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import CpsTable from '#containers/CpsTable';
import Byline from '#containers/Byline';
import CpsSocialEmbedContainer from '#containers/SocialEmbed/Cps';
import InlinePodcastPromo from '#containers/PodcastPromo/Inline';
import CpsRecommendations from '#containers/CpsRecommendations';

import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import Include from '#containers/Include';
import useToggle from '#hooks/useToggle';
import RelatedTopics from '#containers/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';
import AdContainer from '../../components/Ad';
import { GHOST } from '../../components/ThemeProvider/palette';
import MostRead from '../../components/MostRead';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import { ServiceContext } from '#contexts/ServiceContext';
import categoryType from './categoryMap/index';
import Disclaimer from '../../components/Disclaimer';
import ImageWithCaption from '../../components/ImageWithCaption';

import styles from './StoryPage.styles';

const MpuContainer = styled(AdContainer)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const StoryPage = ({ pageData }) => {
  const { brandName, serviceLang, lang, showRelatedTopics } =
    useContext(ServiceContext);

  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
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
  const topics = path(['metadata', 'topics'], pageData);
  const recommendationsData = pathOr([], ['recommendations'], pageData);

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

  // ads
  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const adcampaign = path(['metadata', 'adCampaignKeyword'], pageData);

  /**
   * Should we display ads?:
   * If CPS `allowAdvertising` field is true
   *
   * Within the ads container:
   *  - if the value of the 'ads' toggle is true
   *  - if showAdsBasedOnLocation is true
   */
  const allowAdvertising = path(
    ['metadata', 'options', 'allowAdvertising'],
    pageData,
  );

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
    image: props => (
      <ImageWithCaption
        {...props}
        sizes="(min-width: 1008px) 645px, 100vw"
        shouldPreload={preloadLeadImageToggle}
      />
    ),
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    byline: props => <StyledByline {...props} />,
    include: props => <Include {...props} />,
    social_embed: props => <CpsSocialEmbedContainer {...props} />,
    table: props => <CpsTable {...props} />,
    mpu: props =>
      allowAdvertising ? <MpuContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations {...props} items={recommendationsData} />
    ),
    disclaimer: props => (
      <Disclaimer {...props} increasePaddingOnDesktop={false} />
    ),
    podcastPromo: podcastPromoEnabled && InlinePodcastPromo,
  };

  const StyledTimestamp = styled(Timestamp)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const StyledByline = styled(Byline)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const StoryPageGrid = styled(GelPageGrid)`
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
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
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
      margin-bottom: ${GEL_SPACING};
      padding: ${GEL_SPACING_DBL};
    }
  `;

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
        hasAppleItunesAppBanner
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
        imageLocator={indexImageLocator}
      />
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics
        sectionName={pageData?.relatedContent?.section?.name}
        categoryName={pageData?.metadata?.passport?.category?.categoryName}
        title={title}
        producer={pageData?.metadata?.analyticsLabels?.producer}
        chapter={pageData?.metadata?.atiAnalytics?.chapter}
      />
      <ComscoreAnalytics />
      <NielsenAnalytics />
      {allowAdvertising && (
        <AdContainer slotType="leaderboard" adcampaign={adcampaign} />
      )}
      <StoryPageGrid
        columns={gridColumns}
        enableGelGutters
        margins={gridMargins}
      >
        <GridPrimaryColumn
          item
          columns={gridColsMain}
          startOffset={gridOffset}
          parentColumns={gridColumns}
        >
          <main role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </main>

          {showRelatedTopics && topics && (
            <GridItemLarge>
              <RelatedTopics topics={topics} />
            </GridItemLarge>
          )}

          <CpsRelatedContent
            content={relatedContent}
            parentColumns={gridColsMain}
          />
        </GridPrimaryColumn>
        <GridSecondaryColumn
          item
          columns={gridColsSecondary}
          parentColumns={gridColumns}
          // `serviceLang` is defined when the language the page is written in is different to the
          // language of the service. `serviceLang` is used to override the page language.
          lang={serviceLang}
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
            <MostRead
              css={styles.mostReadSection}
              data={mostReadInitialData}
              columnLayout="oneColumn"
              size="small"
              headingBackgroundColour={GHOST}
              mobileDivider={showRelatedTopics && topics}
            />
          </ComponentWrapper>
        </GridSecondaryColumn>
      </StoryPageGrid>
    </>
  );
};

export default StoryPage;
