import { use, useCallback, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import useToggle from '#hooks/useToggle';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { singleTextBlock } from '#app/models/blocks';
import { BylineLinkedData } from '#app/components/LinkedData/types';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import ArticleMetadata from '#containers/ArticleMetadata';
import { RequestContext } from '#contexts/RequestContext';
import Headings from '#containers/Headings';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import gist from '#containers/Gist';
import text from '#containers/Text';
import Blocks from '#containers/Blocks';
import Timestamp from '#containers/ArticleTimestamp';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import SocialEmbedContainer from '#containers/SocialEmbed';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock } from '#app/components/MediaLoader/types';
import { PHOTO_GALLERY_PAGE, STORY_PAGE } from '#app/routes/utils/pageTypes';
import PortraitVideoCarousel from '#app/components/PortraitVideoCarousel';
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
import extractPromoImage from '#lib/utilities/extractPromoImage';
import RelatedTopics from '#app/components/RelatedTopics';
import NielsenAnalytics from '#containers/NielsenAnalytics';
import InlinePodcastPromo from '#containers/PodcastPromo/Inline';
import {
  Article,
  OptimoBlock,
  OptimoBylineBlock,
  OptimoBylineContributorBlock,
} from '#app/models/types/optimo';
import { ComponentExperimentProps } from '#app/models/types/global';
import {
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import { Translations } from '#app/models/types/translations';
import { Recommendation } from '#app/models/types/onwardJourney';

import ArticleLinksBlock from '#app/components/ArticleLinksBlock';
import Curation from '#app/components/Curation';
import Recommendations from '#app/components/Recommendations';
import ReadTimeArticle from '#app/components/ReadTime';
import PWAPromotionalBanner from '#app/components/PWAPromotionalBanner';
import ContinueReadingButton, {
  ContinueReadingButtonProps,
} from '#app/components/ContinueReadingButton';
import SaveArticleButton from '#app/components/SaveArticleButton';
import isLive from '#lib/utilities/isLive';
import ElectionBanner from './ElectionBanner';
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
import TopicDiscovery from '../../components/TopicDiscovery';
import Disclaimer from '../../components/Disclaimer';
import SecondaryColumn from './SecondaryColumn';
import styles from './ArticlePage.styles';
import { ComponentToRenderProps, TimeStampProps } from './types';
import ArticleHeadline from './ArticleHeadline';
import {
  isPortraitVideo,
  isPortraitVideoUnderHeadline,
} from '../../components/MediaLoader/utils/isPortraitVideo';
import ArticleVideoModal from './ArticleVideoModal';

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

const getImageComponent =
  (preloadLeadImageToggle: boolean) => (props: ComponentToRenderProps) => (
    <ImageWithCaption
      {...props}
      sizes="(min-width: 1008px) 760px, 100vw"
      shouldPreload={preloadLeadImageToggle}
    />
  );

const getTimestampComponent =
  (
    hasByline: boolean,
    bylineContribBlocks: OptimoBylineContributorBlock[],
    firstPublished: string,
    lastPublished: string,
    readTimeValue: number | undefined,
    readTimeTranslations: Translations['readTime'],
    articleTitle: string,
    articlePageData?: Article,
  ) =>
  (props: ComponentToRenderProps & TimeStampProps) => {
    const shouldDisplayReadTime = !!(readTimeTranslations && readTimeValue);

    return (
      <>
        {hasByline ? (
          <Byline blocks={bylineContribBlocks}>
            <Timestamp
              firstPublished={new Date(firstPublished).getTime()}
              lastPublished={new Date(lastPublished).getTime()}
              popOut={false}
              hasReadTime={shouldDisplayReadTime}
            />
            {shouldDisplayReadTime && (
              <ReadTimeArticle readTimeValue={readTimeValue} />
            )}
          </Byline>
        ) : (
          <>
            <Timestamp
              {...props}
              popOut={false}
              hasReadTime={shouldDisplayReadTime}
            />
            {shouldDisplayReadTime && (
              <ReadTimeArticle readTimeValue={readTimeValue} />
            )}
          </>
        )}
        <SaveArticleButton
          articleTitle={articleTitle}
          articlePageData={articlePageData}
        />
      </>
    );
  };

const getMpuComponent =
  (allowAdvertising: boolean) => (props: ComponentToRenderProps) =>
    allowAdvertising ? <AdContainer {...props} slotType="mpu" /> : null;

const getWsojComponent = ({
  data,
  experimentProps,
}: {
  data: Recommendation[];
  experimentProps?: ComponentExperimentProps | null;
}) => (
  <Recommendations data={data} {...(experimentProps && { experimentProps })} />
);
const DisclaimerWithPaddingOverride = (props: ComponentToRenderProps) => (
  <Disclaimer {...props} increasePaddingOnDesktop={false} />
);

const getPodcastPromoComponent = (podcastPromoEnabled: boolean) => () =>
  podcastPromoEnabled ? <InlinePodcastPromo /> : null;

const getHeadlineComponent = (props: ComponentToRenderProps) => (
  <ArticleHeadline {...props} />
);

const getVideoComponent =
  (
    translations: Translations,
    pageBlocks: OptimoBlock[],
    watchUrl?: string | null,
    watchVideoBlocks?: MediaBlock[],
  ) =>
  (props: ComponentToRenderProps) => {
    const { blocks } = props;

    const title = translations.media.watchMoments;

    const showTitle =
      isPortraitVideo(blocks as MediaBlock[]) &&
      title &&
      !isPortraitVideoUnderHeadline(pageBlocks, blocks as MediaBlock[]);
    const showWatchLink = watchUrl && blocks === watchVideoBlocks;

    return (
      <>
        {showTitle && <strong css={styles.portraitVideoTitle}>{title}</strong>}
        <MediaLoader blocks={blocks as MediaBlock[]} />
        {showWatchLink && (
          <a css={styles.watchLink} href={watchUrl}>
            {translations.media.watch}
          </a>
        )}
      </>
    );
  };

const getContinueReadingButton =
  ({
    showAllContent,
    setShowAllContent,
    experimentProps,
  }: ContinueReadingButtonProps) =>
  () => (
    <ContinueReadingButton
      showAllContent={showAllContent}
      setShowAllContent={setShowAllContent}
      experimentProps={experimentProps}
    />
  );

const ArticlePage = ({
  pageData,
  showTopicDiscoveryComponent = false,
  openVideoModal = false,
  watchArticlePath = null,
}: {
  pageData: Article;
  showTopicDiscoveryComponent?: boolean;
  openVideoModal?: boolean;
  watchArticlePath?: string | null;
}) => {
  const [showAllContent, setShowAllContent] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(openVideoModal);
  const articleContentRef = useRef<HTMLDivElement>(null);
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
  const { enabled: continueReadingButtonToggle } = useToggle(
    'continueReadingButton',
  );
  const { enabled: isTopBarOJsEnabled } = useToggle('topBarOJs');

  const {
    palette: { GREY_2 },
  } = useTheme();

  // test experiment to verify if page views are being tracked correctly
  const testPageViewsExperimentName = 'test_page_views_aa_2';
  const testPageViewsVariant = useOptimizelyVariation({
    experimentName: testPageViewsExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const getActiveExperimentProps = (
    experimentName: string,
    experimentVariant: string | null,
  ): ComponentExperimentProps | null =>
    experimentVariant && experimentVariant !== 'off'
      ? {
          sendOptimizelyEvents: true,
          experimentName,
          experimentVariant,
        }
      : null;

  const testPageViewsExperimentProps = getActiveExperimentProps(
    testPageViewsExperimentName,
    testPageViewsVariant,
  );

  const allowAdvertising = pageData?.metadata?.allowAdvertising ?? false;
  const adcampaign = pageData?.metadata?.adCampaignKeyword;

  const {
    metadata: { atiAnalytics },
    mostRead: mostReadInitialData,
  } = pageData;

  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const { enabled: articlePortraitVideoEnabled } = useToggle(
    'articlePortraitVideo',
  );
  const { enabled: articleVideoCurationEnabled } = useToggle(
    'articleVideoCuration',
  );

  const headline = getHeadline(pageData) ?? '';
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
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
  const mediaCurationContent = pageData?.secondaryColumn?.mediaCuration;
  const startsWithHeading = blocks?.[0]?.type === 'headline' || false;

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);

    if (watchArticlePath && typeof window !== 'undefined') {
      window.history.replaceState(window.history.state, '', watchArticlePath);
    }
  }, [watchArticlePath]);

  const bylineBlock = blocks.find(
    (block): block is OptimoBylineBlock =>
      block.type === 'byline' || block.type === 'subByline',
  );

  const bylineContribBlocks = bylineBlock?.model?.blocks || [];

  const bylineLinkedData = bylineExtractor({
    blocks: bylineContribBlocks,
    pageType,
  }) as BylineLinkedData[];

  const hasByline = bylineLinkedData.length > 0;

  const articleAuthorTwitterHandle = hasByline
    ? getAuthorTwitterHandle(blocks)
    : null;

  const readTimeValue = pageData?.metadata?.stats?.readTime;

  const taggings = pageData?.metadata?.passport?.taggings ?? [];
  const formats = pageData?.metadata?.passport?.predicates?.formats ?? [];

  const isPGL = pageData?.metadata?.type === PHOTO_GALLERY_PAGE;
  const isSTY = pageData?.metadata?.type === STORY_PAGE;
  const isCPS = isPGL || isSTY;
  const isTC2Asset = pageData?.metadata?.analyticsLabels?.contentId
    ?.split(':')
    ?.includes('topcat');

  const atiData = {
    ...atiAnalytics,
    ...(isCPS && { pageTitle: `${atiAnalytics.pageTitle} - ${brandName}` }),
    ...(testPageViewsExperimentProps && {
      experimentName: testPageViewsExperimentProps.experimentName,
      experimentVariant: testPageViewsExperimentProps.experimentVariant,
    }),
  };

  const showPortraitVideoCarousel = Boolean(
    pageData?.portraitVideoItems?.portraitVideo?.blocks?.length &&
    articlePortraitVideoEnabled,
  );

  const portraitVideoCarouselTitle =
    pageData?.portraitVideoItems?.title ?? translations.media.watch;

  const portraitVideoCarouselProps = {
    title: portraitVideoCarouselTitle,
    blocks: pageData?.portraitVideoItems?.portraitVideo?.blocks ?? [],
    eventTrackingData: {
      componentName: 'portrait-video-carousel-article',
      groupTracker: { name: portraitVideoCarouselTitle },
    },
    backgroundColor: 'rgba(246, 246, 246, 0.75)',
  };

  const hasContinueReadingBlock = blocks.some(
    block => block.type === 'continueReading',
  );

  const showContinueReadingButton = Boolean(
    !isAmp &&
    !isLite &&
    !isApp &&
    hasContinueReadingBlock &&
    continueReadingButtonToggle,
  );

  const promoImageBlocks =
    pageData?.promo?.images?.defaultPromoImage?.blocks ?? [];

  const { altText: promoImageAltText, rawBlock: promoImageRawBlock } =
    extractPromoImage(promoImageBlocks);

  const promoImage = (
    promoImageRawBlock?.model as { locator?: string } | undefined
  )?.locator;

  const componentsToRender = {
    visuallyHiddenHeadline,
    headline: getHeadlineComponent,
    subheadline: Headings,
    audio: MediaLoader,
    video: getVideoComponent(translations, blocks, watchUrl, firstVideoBlocks),
    text,
    image: getImageComponent(preloadLeadImageToggle),
    timestamp: getTimestampComponent(
      hasByline,
      bylineContribBlocks,
      firstPublished,
      lastPublished,
      readTimeValue,
      translations.readTime,
      headline,
      pageData,
    ),
    social: SocialEmbedContainer,
    embed: UnsupportedEmbed,
    embedHtml: EmbedHtml,
    oEmbed: OEmbedLoader,
    embedImages: EmbedImages,
    embedUploader: Uploader,
    group: gist,
    links: ArticleLinksBlock,
    mpu: getMpuComponent(allowAdvertising),
    wsoj: ({ data }: { data: Recommendation[] }) => getWsojComponent({ data }),
    disclaimer: DisclaimerWithPaddingOverride,
    podcastPromo: getPodcastPromoComponent(podcastPromoEnabled),
    ...(showContinueReadingButton && {
      continueReading: getContinueReadingButton({
        showAllContent,
        setShowAllContent,
      }),
    }),
  };

  const visuallyHiddenBlock = {
    id: null,
    model: { blocks: [singleTextBlock(headline)] },
    type: 'visuallyHiddenHeadline',
  };

  const articleBlocks = startsWithHeading
    ? blocks
    : [visuallyHiddenBlock, ...blocks];

  const authors = bylineLinkedData?.map(data => data?.authorName).join(',');

  const showRelatedTopicsComponent = Boolean(
    showRelatedTopics && topics.length > 0 && !showTopicDiscoveryComponent,
  );

  // EXPERIMENT: Topic Discovery
  const showTopicDiscovery =
    showTopicDiscoveryComponent && !isAmp && !isLite && !isLive();

  const showMediaCuration = Boolean(
    !isAmp &&
    !isLite &&
    !isApp &&
    !isPGL &&
    mediaCurationContent?.summaries?.length &&
    articleVideoCurationEnabled,
  );

  // EXPERIMENT: PWA Promotional Banner
  const shouldRenderPWAPromotionalBanner =
    !isTopBarOJsEnabled || !pageData?.secondaryColumn?.topStories?.length;

  return (
    <div ref={articleContentRef} css={styles.pageWrapper}>
      {isVideoModalOpen &&
        firstVideoBlocks.length > 0 &&
        !isAmp &&
        !isLite &&
        !isApp && (
          <ArticleVideoModal
            articleContentRef={articleContentRef}
            blocks={firstVideoBlocks}
            onClose={closeVideoModal}
          />
        )}
      {/* EXPERIMENT: PWA Promotional Banner */}
      {shouldRenderPWAPromotionalBanner && <PWAPromotionalBanner />}
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics
        sectionName={pageData?.relatedContent?.section?.name}
        title={headline}
        authors={authors}
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
        hasAmpPage={!isTC2Asset}
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
      <ElectionBanner aboutTags={aboutTags} taggings={taggings} />
      <div css={styles.grid}>
        <div css={!isPGL ? styles.primaryColumn : styles.pglColumn}>
          <main css={styles.mainContent} role="main">
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
            <OptimizelyPageMetrics trackPageComplete />
          </main>
          <OptimizelyPageMetrics trackPageView trackPageDepth trackVisit />
          {showTopicDiscovery && (
            <TopicDiscovery
              css={[
                ...(showContinueReadingButton
                  ? [!showAllContent && styles.hideTopicDiscovery]
                  : []),
              ]}
              topics={topics}
            />
          )}
          {showRelatedTopicsComponent && (
            <RelatedTopics
              css={[
                styles.relatedTopics,
                ...(showContinueReadingButton
                  ? [!showAllContent && styles.hideRelatedTopics]
                  : []),
              ]}
              topics={topics}
              mobileDivider={false}
            />
          )}
          {showPortraitVideoCarousel && (
            <PortraitVideoCarousel
              {...portraitVideoCarouselProps}
              css={styles.portraitVideoCarousel}
            />
          )}
          <RelatedContentSection content={blocks} />
          {showMediaCuration && (
            <div css={styles.mediaCurationRow}>
              <div data-testid="media-curation">
                <Curation
                  visualStyle={VISUAL_STYLE.FEED}
                  visualProminence={VISUAL_PROMINENCE.NORMAL}
                  summaries={mediaCurationContent?.summaries}
                  title={mediaCurationContent?.title}
                  position={mediaCurationContent?.position || 0}
                  curationId={mediaCurationContent?.curationId}
                  curationLength={1}
                  link={mediaCurationContent?.link}
                  curationContentType="video"
                  pageType={pageType}
                />
              </div>
            </div>
          )}
        </div>

        {!isApp && !isPGL && <SecondaryColumn pageData={pageData} />}
      </div>

      {!isApp && !isPGL && (
        <MostRead
          css={styles.mostReadSection}
          data={mostReadInitialData}
          columnLayout="twoColumn"
          size="default"
          headingBackgroundColour={GREY_2}
          mobileDivider={showRelatedTopicsComponent}
        />
      )}
    </div>
  );
};

export default ArticlePage;
