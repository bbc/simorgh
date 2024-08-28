/** @jsx jsx */

import { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import { jsx, useTheme } from '@emotion/react';
import useToggle from '#hooks/useToggle';
import { singleTextBlock } from '#app/models/blocks';
import ArticleMetadata from '#containers/ArticleMetadata';
import { RequestContext } from '#contexts/RequestContext';
import headings from '#containers/Headings';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Blocks from '#containers/Blocks';
import Timestamp from '#containers/ArticleTimestamp';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import articleMediaPlayer from '#containers/ArticleMediaPlayer';
import SocialEmbedContainer from '#containers/SocialEmbed';

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
import InlinePodcastPromo from '#containers/PodcastPromo/Inline';
import { PHOTO_GALLERY_PAGE, STORY_PAGE } from '#routes/utils/pageTypes';
import ImageWithCaption from '../../components/ImageWithCaption';
import AdContainer from '../../components/Ad';
import EmbedImages from '../../components/Embeds/EmbedImages';
import EmbedHtml from '../../components/Embeds/EmbedHtml';
import MostRead from '../../components/MostRead';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import Byline from '../../components/Byline';
import OEmbedLoader from '../../components/Embeds/OEmbed';
import UnsupportedEmbed from '../../components/Embeds/UnsupportedEmbed';
import Uploader from '../../components/Embeds/Uploader';
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

const ArticlePage = ({ pageData }) => {
  const { isApp } = useContext(RequestContext);
  const {
    articleAuthor,
    isTrustProjectParticipant,
    showRelatedTopics,
    brandName,
  } = useContext(ServiceContext);
  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');

  const {
    palette: { GREY_2, WHITE },
  } = useTheme();

  const allowAdvertising = path(['metadata', 'allowAdvertising'], pageData);
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
  const isPGL = pageData?.metadata?.type === PHOTO_GALLERY_PAGE;
  const isSTY = pageData?.metadata?.type === STORY_PAGE;
  const isCPS = isPGL || isSTY;

  const {
    metadata: { atiAnalytics },
    mostRead: mostReadInitialData,
  } = pageData;

  const atiData = {
    ...atiAnalytics,
    ...(isCPS && { pageTitle: `${atiAnalytics.pageTitle} - ${brandName}` }),
  };

  const componentsToRender = {
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: articleMediaPlayer,
    video: articleMediaPlayer,
    text,
    image: props => (
      <ImageWithCaption
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        shouldPreload={preloadLeadImageToggle}
      />
    ),
    timestamp: props =>
      hasByline ? (
        <Byline blocks={bylineContribBlocks}>
          <Timestamp
            firstPublished={new Date(firstPublished).getTime()}
            lastPublished={new Date(lastPublished).getTime()}
            popOut={false}
          />
        </Byline>
      ) : (
        <Timestamp {...props} popOut={false} />
      ),
    social: SocialEmbedContainer,
    embed: UnsupportedEmbed,
    embedHtml: EmbedHtml,
    oEmbed: OEmbedLoader,
    embedImages: EmbedImages,
    embedUploader: Uploader,
    group: gist,
    links: props => <ScrollablePromo {...props} />,
    mpu: props =>
      allowAdvertising ? <AdContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations {...props} items={recommendationsData} />
    ),
    disclaimer: props => (
      <Disclaimer {...props} increasePaddingOnDesktop={false} />
    ),
    podcastPromo: () => (podcastPromoEnabled ? <InlinePodcastPromo /> : null),
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

  return (
    <div css={styles.pageWrapper}>
      <ATIAnalytics atiData={atiData} />
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
        type={
          !isPGL
            ? categoryName(isTrustProjectParticipant, taggings, formats)
            : 'Article'
        }
        seoTitle={headline}
        headline={headline}
        description={description}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={promoImage}
      />
      {allowAdvertising && (
        <AdContainer slotType="leaderboard" adcampaign={adcampaign} />
      )}
      <div css={styles.grid}>
        <div css={!isPGL ? styles.primaryColumn : styles.pglColumn}>
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
        {!isApp && !isPGL && <SecondaryColumn pageData={pageData} />}
      </div>
      {!isApp && !isPGL && (
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

export default ArticlePage;
