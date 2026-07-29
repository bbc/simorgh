import { Fragment, ReactNode, useState, useCallback, use } from 'react';
import { useTheme } from '@emotion/react';
import useToggle from '#hooks/useToggle';
import useMediaQuery from '#hooks/useMediaQuery';
import useScrollDepthTracker from '#hooks/useScrollDepthTracker';
import { GROUP_4_MIN_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
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
import { PHOTO_GALLERY_PAGE } from '#app/routes/utils/pageTypes';
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
import extractSaveArticleProps from '#app/lib/utilities/extractSaveArticleProps';
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
import ContinueReadingButton, {
  ContinueReadingButtonProps,
} from '#app/components/ContinueReadingButton';
import SaveArticleButton from '#app/components/SaveArticleButton';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import AccountPromotionalBannerExperiment from '#app/components/Account/AccountPromotionalBannerExperiment';
import ElectionBanner from './ElectionBanner';
import ArticleMessageBanner from './ArticleMessageBanner';
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
import useMobileOJComponentOrder, {
  useDebugVariant,
} from './useMobileOJComponentOrder';
import styles from './ArticlePage.styles';
import { ComponentToRenderProps, TimeStampProps } from './types';
import ArticleHeadline from './ArticleHeadline';
import {
  isPortraitVideo,
  isPortraitVideoUnderHeadline,
} from '../../components/MediaLoader/utils/isPortraitVideo';
import LocationBasedTopicOJ from '../../components/LocationBasedTopicOJ';
import { OJComponentKey, SearchVariant } from './searchReferrerComponentOrder';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';

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
    articlePageData: Article,
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
          saveArticlePageData={extractSaveArticleProps(articlePageData)}
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
  (translations: Translations, pageBlocks: OptimoBlock[]) =>
  (props: ComponentToRenderProps) => {
    const { blocks } = props;

    const title = translations.media.watchMoments;

    const showTitle =
      isPortraitVideo(blocks as MediaBlock[]) &&
      title &&
      !isPortraitVideoUnderHeadline(pageBlocks, blocks as MediaBlock[]);

    return (
      <>
        {showTitle && <strong css={styles.portraitVideoTitle}>{title}</strong>}
        <MediaLoader blocks={blocks as MediaBlock[]} />
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

const ArticlePage = ({ pageData }: { pageData: Article }) => {
  const [showAllContent, setShowAllContent] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const { isApp, isAmp, isLite, pageType } = use(RequestContext);

  const {
    articleAuthor,
    isTrustProjectParticipant,
    showRelatedTopics,
    translations,
  } = use(ServiceContext);

  // Track when viewport enters GROUP_4_MIN_WIDTH (1008px+) where button is hidden
  const handleDesktopMediaQueryChange = useCallback(mediaQueryList => {
    setIsDesktopViewport(mediaQueryList.matches);
  }, []);

  useMediaQuery(
    `(min-width: ${GROUP_4_MIN_WIDTH_BP}rem)`,
    handleDesktopMediaQueryChange,
  );

  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const { enabled: continueReadingButtonToggle } = useToggle(
    'continueReadingButton',
  );
  const { enabled: topicDiscoveryEnabled } = useToggle('topicDiscovery');

  const {
    palette: { GREY_2 },
  } = useTheme();

  const allowAdvertising = pageData?.metadata?.allowAdvertising ?? false;
  const adcampaign = pageData?.metadata?.adCampaignKeyword;

  const { mostRead: mostReadInitialData } = pageData;

  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const { enabled: articlePortraitVideoEnabled } = useToggle(
    'articlePortraitVideo',
  );
  const { enabled: articleVideoCurationEnabled } = useToggle(
    'articleVideoCuration',
  );
  const { enabled: countryCurationEnabled } = useToggle(
    'locationTopicCuration',
  );

  const headline = getHeadline(pageData) ?? '';
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = pageData?.metadata?.topics ?? [];
  const blocks = pageData?.content?.model?.blocks ?? [];
  const mediaCurationContent = pageData?.secondaryColumn?.mediaCuration;
  const startsWithHeading = blocks?.[0]?.type === 'headline' || false;

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
  const isTC2Asset = pageData?.metadata?.analyticsLabels?.contentId
    ?.split(':')
    ?.includes('topcat');

  const getSearchMidArticleOJ = ({
    data,
    experimentProps,
    searchVariant,
  }: {
    data: Recommendation[];
    experimentProps?: ComponentExperimentProps | null;
    searchVariant: SearchVariant | null;
  }) => {
    switch (searchVariant) {
      case 'variant_1_related':
      case 'variant_2_recommended':
      case 'variant_3_hybrid':
        return <Recommendations data={data} />;

      case 'variant_4_related_mid':
        return <RelatedContentSection content={blocks} />;

      case 'variant_5_recommended_mid':
        return <TopicDiscovery topics={topics} css={styles.midArticleOJ} />;

      case 'variant_6_hybrid_mid':
        return (
          <div css={styles.midArticleOJ}>
            <LocationBasedTopicOJ pageData={pageData} />
          </div>
        );

      default:
        return getWsojComponent({ data, experimentProps });
    }
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

  // Extract block types
  // Check if block types include embeds
  const articleEmbedTypes = ['embedHtml', 'oEmbed'];

  const hasEmbeds = blocks.some(block =>
    articleEmbedTypes.includes(block.type),
  );

  // On desktop (GROUP_4+), all content is visible, so enable scroll tracking immediately
  // On mobile/tablet, only enable tracking when button is clicked and content is expanded
  const scrollDepthEnabled =
    !hasEmbeds &&
    (isDesktopViewport || !showContinueReadingButton || showAllContent);
  const scrollDepthRef = useScrollDepthTracker(
    'article-scroll-depth',
    scrollDepthEnabled,
  );

  const promoImageBlocks =
    pageData?.promo?.images?.defaultPromoImage?.blocks ?? [];

  const { altText: promoImageAltText, rawBlock: promoImageRawBlock } =
    extractPromoImage(promoImageBlocks);

  const promoImage = (
    promoImageRawBlock?.model as { locator?: string } | undefined
  )?.locator;

  const searchVariant = useDebugVariant();
  const mobileOJOrder = useMobileOJComponentOrder(searchVariant);

  const componentsToRender = {
    visuallyHiddenHeadline,
    headline: getHeadlineComponent,
    subheadline: Headings,
    audio: MediaLoader,
    video: getVideoComponent(translations, blocks),
    text,
    image: getImageComponent(preloadLeadImageToggle),
    timestamp: getTimestampComponent(
      hasByline,
      bylineContribBlocks,
      firstPublished,
      lastPublished,
      readTimeValue,
      translations.readTime,
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
    // renders wsoj if user is on desktop, otherwise renders a chosen OJ based on search referrer experiment on mobile
    wsoj: ({ data }: { data: Recommendation[] }) => {
      if (!isDesktopViewport) {
        return getSearchMidArticleOJ({ data, searchVariant });
      }
      return getWsojComponent({ data });
    },
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

  const showTopicDiscovery = true;

  // Topic Discovery shows in the midarticle position for one variant
  // We want to hide RelatedTopics when this happens
  const topicDiscoveryInMidArticlePosition =
    !isDesktopViewport && searchVariant === 'variant_5_recommended_mid';

  const showRelatedTopicsComponent = Boolean(
    showRelatedTopics &&
    topics.length > 0 &&
    !showTopicDiscovery &&
    !topicDiscoveryInMidArticlePosition,
  );

  const showMediaCuration = Boolean(
    !isAmp &&
    !isLite &&
    !isApp &&
    !isPGL &&
    mediaCurationContent?.summaries?.length &&
    articleVideoCurationEnabled,
  );

  const showCountryCuration = Boolean(
    !isAmp &&
    !isLite &&
    !isApp &&
    countryCurationEnabled &&
    pageData?.countryCuration?.summaries?.length,
  );

  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;

  const getTopicDiscoverySlot = () => {
    if (showTopicDiscovery) {
      return (
        <TopicDiscovery
          css={[
            ...(showContinueReadingButton
              ? [!showAllContent && styles.hideTopicDiscovery]
              : []),
          ]}
          topics={topics}
        />
      );
    }
    if (showRelatedTopicsComponent) {
      return (
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
      );
    }
    return null;
  };

  const topicDiscoverySlot = getTopicDiscoverySlot();

  const mobileOJComponents: Record<OJComponentKey, ReactNode> = {
    mostRead:
      !isApp && !isPGL ? (
        <MostRead
          css={styles.mostReadSection}
          data={mostReadInitialData}
          columnLayout="twoColumn"
          size="default"
          headingBackgroundColour={GREY_2}
          mobileDivider={showRelatedTopicsComponent}
        />
      ) : null,
    topicDiscovery: topicDiscoverySlot,
    relatedContent: <RelatedContentSection content={blocks} />,
    pvCarousel: showPortraitVideoCarousel ? (
      <PortraitVideoCarousel
        {...portraitVideoCarouselProps}
        css={styles.portraitVideoCarousel}
      />
    ) : null,
    topStories:
      !isApp && !isPGL && topStoriesContent ? (
        <div
          css={styles.topStoriesSection}
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
          <TopStoriesSection content={topStoriesContent} />
        </div>
      ) : null,
    featuredArticles:
      !isApp && !isPGL && featuresContent ? (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
          />
        </div>
      ) : null,
    locationBasedOJ: showCountryCuration ? (
      <LocationBasedTopicOJ pageData={pageData} />
    ) : null,
  };

  const shouldApplyCollapsedArticleSpacing =
    showContinueReadingButton && !showAllContent;

  return (
    <div css={styles.pageWrapper}>
      {/* EXPERIMENT: newswb_ws_article_account_promo_banner */}
      <AccountPromotionalBannerExperiment />

      <ATIAnalytics />
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
      <ArticleMessageBanner aboutTags={aboutTags} taggings={taggings} />
      <div css={styles.grid}>
        <div
          css={[
            !isPGL ? styles.primaryColumn : styles.pglColumn,
            shouldApplyCollapsedArticleSpacing && styles.collapsedArticleColumn,
          ]}
        >
          <main
            css={[
              styles.mainContent,
              shouldApplyCollapsedArticleSpacing && styles.collapsedMainContent,
            ]}
            role="main"
            ref={scrollDepthRef}
          >
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
            <OptimizelyPageMetrics trackPageComplete />
          </main>
          <OptimizelyPageMetrics trackPageDepth />
          {!mobileOJOrder && showTopicDiscovery && (
            <TopicDiscovery
              css={[
                ...(showContinueReadingButton
                  ? [!showAllContent && styles.hideTopicDiscovery]
                  : []),
              ]}
              topics={topics}
            />
          )}
          {!mobileOJOrder && showRelatedTopicsComponent && (
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
          {!mobileOJOrder && showCountryCuration && (
            <LocationBasedTopicOJ pageData={pageData} />
          )}
          {!mobileOJOrder && showPortraitVideoCarousel && (
            <PortraitVideoCarousel
              {...portraitVideoCarouselProps}
              css={styles.portraitVideoCarousel}
            />
          )}
          {!mobileOJOrder && <RelatedContentSection content={blocks} />}
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

        {!isApp && !isPGL && !mobileOJOrder && (
          <SecondaryColumn pageData={pageData} />
        )}
      </div>

      {mobileOJOrder && (
        <div css={styles.mobileOJContainer}>
          {mobileOJOrder.map(key => (
            <Fragment key={key}>{mobileOJComponents[key]}</Fragment>
          ))}
        </div>
      )}

      {!isApp && !isPGL && !mobileOJOrder && (
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
