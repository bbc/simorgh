import { use, useCallback, useRef, useState } from 'react';
import { Theme } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock } from '#app/components/MediaLoader/types';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { BylineLinkedData, Tag } from '#app/components/LinkedData/types';
import {
  Article,
  OptimoBlock,
  OptimoBylineBlock,
  OptimoBylineContributorBlock,
} from '#app/models/types/optimo';
import { MediaOverrides } from '#app/models/types/media';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import useToggle from '../../hooks/useToggle';
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
} from '../../lib/utilities/parseAssetData';
import filterForBlockType from '../../lib/utilities/blockHandlers';

import ArticleLinksBlock from '../../components/ArticleLinksBlock';

import headings from '../../legacy/containers/Headings';
import visuallyHiddenHeadline from '../../legacy/containers/VisuallyHiddenHeadline';
import gist from '../../legacy/containers/Gist';
import text from '../../legacy/containers/Text';
import ImageWithCaption from '../../components/ImageWithCaption';
import Blocks from '../../legacy/containers/Blocks';
import Timestamp from '../../legacy/containers/ArticleTimestamp';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import ComscoreAnalytics from '../../legacy/containers/ComscoreAnalytics';
import SocialEmbedContainer from '../../legacy/containers/SocialEmbed';
import fauxHeadline from '../../legacy/containers/FauxHeadline';
import RelatedTopics from '../../components/RelatedTopics';
import NielsenAnalytics from '../../legacy/containers/NielsenAnalytics';
import ArticleMetadata from '../../legacy/containers/ArticleMetadata';
import EmbedImages from '../../components/Embeds/EmbedImages';
import EmbedHtml from '../../components/Embeds/EmbedHtml';
import OEmbedLoader from '../../components/Embeds/OEmbed';

import LinkedData from '../../components/LinkedData';
import Byline from '../../components/Byline';

import {
  bylineExtractor,
  categoryName,
  getAuthorTwitterHandle,
} from '../../components/Byline/utilities';

import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import RelatedContentSection from '../../components/RelatedContentSection';

import SecondaryColumn from './SecondaryColumn';

import styles from './MediaArticlePage.styles';
import { ComponentToRenderProps, TimestampProps } from './types';
import checkIsLiveMedia from './utils/checkIsLiveMedia';

import { isPortraitVideo } from '../../components/MediaLoader/utils/isPortraitVideo';
import MediaArticleVideoModal from './MediaArticleVideoModal';

type VideoBlock = OptimoBlock & {
  model: {
    blocks?: MediaBlock[];
  };
};

const optimoArticleIdRegex = /(c[a-zA-Z0-9]{10,}o)/;

const getOptimoArticleId = (pageData: Article) =>
  pageData?.metadata?.locators?.canonicalUrl?.match(
    /\/articles\/(c[a-zA-Z0-9]{10,}o)/,
  )?.[1] ?? pageData?.metadata?.id?.match(optimoArticleIdRegex)?.[1];

const getFirstVideoBlock = (blocks: OptimoBlock[]) =>
  blocks.find(
    (block): block is VideoBlock =>
      block.type === 'video' &&
      Array.isArray((block.model as { blocks?: unknown[] })?.blocks),
  );

const getAudioVideoComponent =
  ({
    isCpsMap,
    watchUrl,
    watchVideoBlocks,
    watchText,
  }: {
    isCpsMap: boolean;
    watchUrl?: string | null;
    watchVideoBlocks?: MediaBlock[];
    watchText?: string;
  }) =>
  (props: ComponentToRenderProps) => {
    const { blocks } = props;
    const isPortrait = isPortraitVideo(blocks as MediaBlock[]);
    const className = isPortrait ? 'portrait-media-loader' : '';
    const showWatchLink = watchUrl && blocks === watchVideoBlocks;

    return (
      <>
        <div
          css={({ spacings }: Theme) => [
            `padding-top: ${spacings.TRIPLE}rem`,
            isCpsMap && styles.cafMediaPlayer,
            isPortrait && styles.portraitVideoPlayer,
          ]}
        >
          <MediaLoader blocks={blocks as MediaBlock[]} className={className} />
        </div>
        {showWatchLink && (
          <a css={styles.watchLink} href={watchUrl}>
            {watchText}
          </a>
        )}
      </>
    );
  };

const getLegacyMediaComponent =
  (isCpsMap: boolean, headline: string) => (props: ComponentToRenderProps) => {
    const mediaOverrides: MediaOverrides = {
      model: { pageTitleOverride: headline },
      type: 'mediaOverrides',
    };

    return (
      <div
        css={({ spacings }: Theme) => [
          `padding-top: ${spacings.TRIPLE}rem`,
          isCpsMap && styles.cafMediaPlayer,
        ]}
      >
        <MediaLoader blocks={[props, mediaOverrides] as MediaBlock[]} />
      </div>
    );
  };

const getBylineComponent =
  (
    hasByline: boolean,
    bylineContribBlocks: OptimoBylineContributorBlock[],
    firstPublished: string,
    lastPublished: string,
  ) =>
  () =>
    hasByline ? (
      <Byline blocks={bylineContribBlocks}>
        <Timestamp
          firstPublished={new Date(firstPublished).getTime()}
          lastPublished={new Date(lastPublished).getTime()}
          popOut={false}
        />
      </Byline>
    ) : null;

const Links = (props: ComponentToRenderProps) => (
  <ArticleLinksBlock {...props} />
);

const getImageComponent =
  (preloadLeadImageToggle: boolean) => (props: ComponentToRenderProps) => (
    <ImageWithCaption
      {...props}
      sizes="(min-width: 1008px) 760px, 100vw"
      shouldPreload={preloadLeadImageToggle}
    />
  );

const getTimestampComponent =
  (showTimestamp: boolean) => (props: TimestampProps) =>
    showTimestamp ? <Timestamp {...props} popOut={false} /> : null;

const MediaArticlePage = ({
  pageData,
  openVideoModal = false,
  watchArticlePath = null,
}: {
  pageData: Article;
  openVideoModal?: boolean;
  watchArticlePath?: string | null;
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(openVideoModal);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const { isApp, isAmp, isLite, pageType, pathname } = use(RequestContext);

  const {
    articleAuthor,
    isTrustProjectParticipant,
    showRelatedTopics,
    brandName,
    translations,
    service,
  } = use(ServiceContext);
  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');

  const headline = getHeadline(pageData) ?? '';
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData) as Tag[];
  const topics = pageData?.metadata?.topics ?? [];
  const blocks = pageData?.content?.model?.blocks ?? [];
  const firstVideoBlock = getFirstVideoBlock(blocks);
  const firstVideoBlocks = firstVideoBlock?.model?.blocks ?? [];
  const optimoArticleId = getOptimoArticleId(pageData);
  const isWatchRoute = pathname?.includes('/watch/');
  const watchUrl =
    service === 'hindi' &&
    optimoArticleId &&
    firstVideoBlock &&
    !isWatchRoute &&
    !isAmp &&
    !isLite &&
    !isApp
      ? `/${service}/watch/${optimoArticleId}`
      : null;

  const bylineBlock = blocks.find(
    block => block.type === 'byline',
  ) as OptimoBylineBlock;

  const bylineContribBlocks = bylineBlock?.model?.blocks || [];

  const bylineLinkedData = bylineExtractor({
    blocks: bylineContribBlocks,
    pageType,
  }) as BylineLinkedData[];

  const hasByline = bylineLinkedData.length > 0;

  const articleAuthorTwitterHandle = hasByline
    ? getAuthorTwitterHandle(blocks)
    : null;

  const taggings = pageData?.metadata?.passport?.taggings ?? [];

  const formats = pageData?.metadata?.passport?.predicates?.formats ?? [];

  // ATI
  const {
    metadata: { atiAnalytics, type },
  } = pageData;

  const isCpsMap = type === MEDIA_ASSET_PAGE;
  const isTC2Asset = pageData?.metadata?.analyticsLabels?.contentId
    ?.split(':')
    ?.includes('topcat');

  const atiData = {
    ...atiAnalytics,
    ...(isCpsMap && { pageTitle: `${atiAnalytics.pageTitle} - ${brandName}` }),
  };

  const promoImageBlocks =
    pageData?.promo?.images?.defaultPromoImage?.blocks ?? [];

  const promoImageAltTextBlock = filterForBlockType(
    promoImageBlocks,
    'altText',
  );

  const promoImageRawBlock = filterForBlockType(promoImageBlocks, 'rawImage');

  const promoImageAltText =
    promoImageAltTextBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const promoImage = promoImageRawBlock?.model?.locator;

  const showTopics = Boolean(showRelatedTopics && topics.length > 0);

  const isLiveMedia = checkIsLiveMedia(blocks);

  const showTimestamp = Boolean(!hasByline && !isLiveMedia);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);

    if (watchArticlePath && typeof window !== 'undefined') {
      window.history.replaceState(window.history.state, '', watchArticlePath);
    }
  }, [watchArticlePath]);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: getAudioVideoComponent({ isCpsMap }),
    video: getAudioVideoComponent({
      isCpsMap,
      watchUrl,
      watchVideoBlocks: firstVideoBlocks,
      watchText: translations.media.watch,
    }),
    legacyMedia: getLegacyMediaComponent(isCpsMap, headline),
    text,
    byline: getBylineComponent(
      hasByline,
      bylineContribBlocks,
      firstPublished,
      lastPublished,
    ),
    image: getImageComponent(preloadLeadImageToggle),
    timestamp: getTimestampComponent(showTimestamp),
    social: SocialEmbedContainer,
    embedHtml: EmbedHtml,
    embedImages: EmbedImages,
    oEmbed: OEmbedLoader,
    group: gist,
    links: Links,
  };

  // metrics are gated by experimentsForPageMetrics; add map experiment names there when ready
  // flags mirror article page for page views per visit tracking
  return (
    <div ref={pageContentRef} css={styles.pageWrapper}>
      {isVideoModalOpen &&
        firstVideoBlocks.length > 0 &&
        !isAmp &&
        !isLite &&
        !isApp && (
          <MediaArticleVideoModal
            pageContentRef={pageContentRef}
            blocks={firstVideoBlocks}
            onClose={closeVideoModal}
          />
        )}
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics
        categoryName={pageData?.metadata?.passport?.category?.categoryName}
        title={headline}
        taggings={taggings}
        producer={pageData?.metadata?.analyticsLabels?.producer}
      />
      <ComscoreAnalytics />
      <NielsenAnalytics />
      <ArticleMetadata
        articleId={getArticleId(pageData)}
        title={headline}
        author={articleAuthor}
        twitterHandle={articleAuthorTwitterHandle}
        firstPublished={!isLiveMedia && firstPublished}
        lastPublished={!isLiveMedia && lastPublished}
        section={getArticleSection(pageData)}
        aboutTags={aboutTags}
        mentionsTags={getMentions(pageData)}
        lang={getLang(pageData)}
        description={description}
        imageLocator={promoImage}
        imageAltText={promoImageAltText}
        hasAmpPage={!isTC2Asset}
      />
      <LinkedData
        showAuthor
        bylineLinkedData={bylineLinkedData}
        type={
          isCpsMap
            ? 'Article'
            : categoryName(isTrustProjectParticipant, taggings, formats)
        }
        seoTitle={headline}
        headline={headline}
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={promoImage}
      />
      <div css={styles.grid}>
        <div css={isCpsMap ? styles.fullWidthContainer : styles.primaryColumn}>
          <main css={styles.mainContent} role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </main>
          <OptimizelyPageMetrics trackPageView trackPageDepth trackVisit />
          {showTopics && (
            <RelatedTopics css={styles.relatedTopics} topics={topics} />
          )}
          <RelatedContentSection content={blocks} />
        </div>
        {!isCpsMap && <SecondaryColumn pageData={pageData} />}
      </div>
    </div>
  );
};

export default MediaArticlePage;
