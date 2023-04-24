/** @jsxRuntime classic */
/** @jsx jsx */

import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import { jsx, useTheme } from '@emotion/react';
import { string, node } from 'prop-types';
import useToggle from '#hooks/useToggle';

import { singleTextBlock } from '#app/models/blocks';
import { articleDataPropTypes } from '#models/propTypes/article';
import ArticleMetadata from '#containers/ArticleMetadata';
import { RequestContext } from '#contexts/RequestContext';
import headings from '#containers/Headings';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Image from '#containers/Image';
import Blocks from '#containers/Blocks';
import Timestamp from '#containers/ArticleTimestamp';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import articleMediaPlayer from '#containers/ArticleMediaPlayer';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import SocialEmbedContainer from '#containers/SocialEmbed';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';

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
import filterForBlockType from '#lib/utilities/blockHandlers';
import RelatedTopics from '#containers/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';
import ScrollablePromo from '#components/ScrollablePromo';
import CpsRecommendations from '#containers/CpsRecommendations';
import LinkedData from '../../components/LinkedData';
import Byline from '../../components/Byline';
import {
  bylineExtractor,
  categoryName,
  getAuthorTwitterHandle,
} from '../../components/Byline/utilities';
import { ServiceContext } from '../../contexts/ServiceContext';
import RelatedContentSection from './PagePromoSections/RelatedContentSection';

import SecondaryColumn from './SecondaryColumn';

import styles from './ArticlePage.styles';

const ArticlePage = ({ pageData, mostReadEndpointOverride }) => {
  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);
  const { articleAuthor, isTrustProjectParticipant, showRelatedTopics } =
    useContext(ServiceContext);
  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const { enabled: adsEnabled } = useToggle('ads');

  const {
    palette: { GREY_2, WHITE },
  } = useTheme();

  const isAdsEnabled = [
    path(['metadata', 'allowAdvertising'], pageData),
    adsEnabled,
    showAdsBasedOnLocation,
  ].every(Boolean);

  const adcampaign = path(['metadata', 'adCampaignKeyword'], pageData);

  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = path(['metadata', 'topics'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const startsWithHeading = propEq('type', 'headline')(blocks[0] || {});

  const bylineBlock = blocks.find(block => block.type === 'byline');
  const bylineContribBlocks = pathOr([], ['model', 'blocks'], bylineBlock);

  const bylineLinkedData = bylineExtractor(bylineContribBlocks);

  const hasByline = !!bylineLinkedData;

  const articleAuthorTwitterHandle = hasByline
    ? getAuthorTwitterHandle(blocks)
    : null;

  const taggings = path(['metadata', 'passport', 'taggings'], pageData);
  const formats = path(
    ['metadata', 'passport', 'predicates', 'formats'],
    pageData,
  );
  const recommendationsData = pathOr([], ['recommendations'], pageData);

  const componentsToRender = {
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: articleMediaPlayer,
    video: articleMediaPlayer,
    text,
    byline: props =>
      hasByline ? (
        <Byline {...props}>
          <Timestamp
            firstPublished={new Date(firstPublished).getTime()}
            lastPublished={new Date(lastPublished).getTime()}
            popOut={false}
          />
        </Byline>
      ) : null,
    image: props => (
      <Image
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        shouldPreload={preloadLeadImageToggle}
      />
    ),
    timestamp: props =>
      hasByline ? null : <Timestamp {...props} popOut={false} />,
    social: SocialEmbedContainer,
    group: gist,
    links: props => <ScrollablePromo {...props} />,
    mpu: props =>
      isAdsEnabled ? <AdContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations {...props} items={recommendationsData} />
    ),
  };

  const visuallyHiddenBlock = {
    id: null,
    model: { blocks: [singleTextBlock(headline)] },
    type: 'visuallyHiddenHeadline',
  };

  const articleBlocks = startsWithHeading
    ? blocks
    : [visuallyHiddenBlock, ...blocks];

  const promoImageBlocks = pathOr(
    [],
    ['promo', 'images', 'defaultPromoImage', 'blocks'],
    pageData,
  );

  const promoImageAltText = path(
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    filterForBlockType(promoImageBlocks, 'altText'),
  );

  const promoImage = path(
    ['model', 'locator'],
    filterForBlockType(promoImageBlocks, 'rawImage'),
  );

  const MostReadWrapper = ({ children }) => (
    <MostReadSection css={styles.mostReadSection}>
      <MostReadSectionLabel mobileDivider={showRelatedTopics && topics} />
      {children}
    </MostReadSection>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <div css={styles.pageWrapper}>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <NielsenAnalytics />
      <ArticleMetadata
        articleId={getArticleId(pageData)}
        title={headline}
        author={articleAuthor}
        twitterHandle={articleAuthorTwitterHandle}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        section={getArticleSection(pageData)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(pageData)}
        lang={getLang(pageData)}
        description={description}
        imageLocator={promoImage}
        imageAltText={promoImageAltText}
      />
      <LinkedData
        showAuthor
        bylineLinkedData={bylineLinkedData}
        type={categoryName(taggings, formats, isTrustProjectParticipant)}
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={promoImage}
      />
      {isAdsEnabled && !isAmp && (
        <CanonicalAdBootstrapJs adcampaign={adcampaign} />
      )}
      {isAdsEnabled && <AdContainer slotType="leaderboard" />}
      <div css={styles.grid}>
        <div css={styles.primaryColumn}>
          <main css={styles.mainContent} role="main">
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
          </main>
          {showRelatedTopics && topics && (
            <RelatedTopics
              css={styles.relatedTopics}
              topics={topics}
              mobileDivider={false}
              backgroundColour={GREY_2}
              tagBackgroundColour={WHITE}
            />
          )}
          <RelatedContentSection content={blocks} />
        </div>
        <SecondaryColumn pageData={pageData} />
      </div>
      <MostReadContainer
        mostReadEndpointOverride={mostReadEndpointOverride}
        wrapper={MostReadWrapper}
      />
    </div>
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
