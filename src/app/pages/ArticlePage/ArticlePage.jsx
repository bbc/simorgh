/** @jsxRuntime classic */
/** @jsx jsx */

import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import { jsx, useTheme } from '@emotion/react';
import { string } from 'prop-types';
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
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import articleMediaPlayer from '#containers/ArticleMediaPlayer';
import SocialEmbedContainer from '#containers/SocialEmbed';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import { InlinePodcastPromo } from '#containers/PodcastPromo';
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
import EmbedImages from '../../components/Embeds/EmbedImages';
import EmbedHtml from '../../components/Embeds/EmbedHtml';
import MostRead from '../../components/MostRead';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import Uploader from '../../components/Uploader';
import Byline from '../../components/Byline';
import OEmbedLoader from '../../components/Embeds/OEmbed';
import {
  bylineExtractor,
  categoryName,
  getAuthorTwitterHandle,
} from '../../components/Byline/utilities';
import { ServiceContext } from '../../contexts/ServiceContext';
import RelatedContentSection from '../../components/RelatedContentSection';
import Disclaimer from '../../components/Disclaimer';

import SecondaryColumn from './SecondaryColumn';

import styles from './ArticlePage.styles';
import { getPromoHeadline } from '../../lib/analyticsUtils/article';
import { head } from 'ramda';

const ArticlePage = ({ pageData }) => {
  const { isAmp, isApp, showAdsBasedOnLocation, headersTEST } =
    useContext(RequestContext);
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
  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const headline = getHeadline(pageData);
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = path(['metadata', 'topics'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const startsWithHeading = propEq('headline', 'type')(blocks[0] || {});

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

  const embedBlock = blocks.find(block => block.type === 'embed');
  const embedProviderName = path(['model', 'provider'], embedBlock);
  const isUgcUploader = embedProviderName === 'ugc-uploader';

  const {
    metadata: { atiAnalytics },
    mostRead: mostReadInitialData,
  } = pageData;

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
    embed: props => (isUgcUploader ? <Uploader {...props} /> : null),
    embedHtml: props => <EmbedHtml {...props} />,
    oEmbed: props => <OEmbedLoader {...props} />,
    embedImages: props => <EmbedImages {...props} />,
    group: gist,
    links: props => <ScrollablePromo {...props} />,
    mpu: props =>
      isAdsEnabled ? <AdContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations {...props} items={recommendationsData} />
    ),
    disclaimer: props => (
      <Disclaimer {...props} increasePaddingOnDesktop={false} />
    ),
    podcastPromo: podcastPromoEnabled && (() => <InlinePodcastPromo />),
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

  const list = [];
  const entries = Object.entries(headersTEST);
  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];
    list.push(
      <div>
        <span style={{ color: 'blue' }}>{key}</span> TO{' '}
        <span style={{ color: 'red' }}>{value}</span>
      </div>,
    );
  }

  return (
    <div css={styles.pageWrapper}>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics
        sectionName={pageData?.relatedContent?.section?.name}
        title={getPromoHeadline(pageData)}
      />
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
        type={categoryName(isTrustProjectParticipant, taggings, formats)}
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
            <div>{list}</div>
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
        {!isApp && <SecondaryColumn pageData={pageData} />}
      </div>
      {!isApp && (
        <MostRead
          css={styles.mostReadSection}
          data={mostReadInitialData}
          columnLayout="multiColumn"
          size="default"
          headingBackgroundColour={GREY_2}
          mobileDivider={showRelatedTopics && topics}
        />
      )}
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
