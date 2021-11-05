import React, { useContext } from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import Grid, { GelPageGrid, GridItemLarge } from '#app/components/Grid';
import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Disclaimer from '#containers/Disclaimer';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/Text';
import Image from '#containers/Image';
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
import CpsTable from '#containers/CpsTable';
import Byline from '#containers/Byline';
import CpsSocialEmbedContainer from '#containers/SocialEmbed/Cps';
import CpsRecommendations from '#containers/CpsRecommendations';
import {
  InlinePodcastPromo,
  SecondaryColumnPodcastPromo,
} from '#containers/PodcastPromo';
import isLive from '#lib/utilities/isLive';

import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import categoryType from './categoryMap/index';
import Include from '#containers/Include';
import { ServiceContext } from '#contexts/ServiceContext';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import RelatedTopics from '#containers/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';

const MpuContainer = styled(AdContainer)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const StoryPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    dir,
    mostRead: { header },
    script,
    service,
    serviceLang,
    lang,
    showRelatedTopics,
  } = useContext(ServiceContext);
  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const title = pageData?.promo?.headlines?.headline;
  const shortHeadline = pageData?.promo?.headlines?.shortHeadline;
  const category = pageData?.promo?.passport?.category?.categoryName;
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
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const mostReadInitialData = pageData?.mostRead;
  const topStoriesInitialData = pageData?.secondaryColumn?.topStories;
  const featuresInitialData = pageData?.secondaryColumn?.features;
  const recommendationsInitialData = pageData?.recommendations;
  const topics = pageData?.metadata?.topics;

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
  const { enabled: adsEnabled } = useToggle('ads');
  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);
  const adcampaign = pageData?.metadata?.adCampaignKeyword;

  /**
   * Should we display ads? We check:
   * 1. The CPS `allowAdvertising` field value.
   * 2. A value local to the STY page type.
   * - iSite toggles are handled by the Ad container.
   */
  const isAdsEnabled = [
    pageData?.metadata?.options?.allowAdvertising,
    adsEnabled,
    showAdsBasedOnLocation,
  ].every(Boolean);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image: props => (
      <Image
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
      isAdsEnabled ? <MpuContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations
        {...props}
        parentColumns={gridColsMain}
        items={recommendationsInitialData}
      />
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

  const MostReadWrapper = ({ children }) => (
    <section role="region" aria-labelledby="Most-Read" data-e2e="most-read">
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      {children}
    </section>
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
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <NielsenAnalytics />
      {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
      {isAdsEnabled && !isAmp && (
        <CanonicalAdBootstrapJs adcampaign={adcampaign} />
      )}
      {isAdsEnabled && <AdContainer slotType="leaderboard" />}
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
          {isLive() && podcastPromoEnabled && <SecondaryColumnPodcastPromo />}
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
