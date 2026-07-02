import { Fragment, ReactNode, use, useState } from 'react';
import { useTheme } from '@emotion/react';
import useToggle from '#hooks/useToggle';
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
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
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
import { ReverbParamsContext } from '../../contexts/ReverbParamsContext';
import RelatedContentSection from '../../components/RelatedContentSection';
import TopicDiscovery from '../../components/TopicDiscovery';
import Disclaimer from '../../components/Disclaimer';
import SecondaryColumn from './SecondaryColumn';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import useMobileReferrerOrder from './useMobileReferrerOrder';
import { OJComponentKey } from './mobileReferrerComponentOrder';
import styles from './ArticlePage.styles';
import { ComponentToRenderProps, TimeStampProps } from './types';
import ArticleHeadline from './ArticleHeadline';
import {
  isPortraitVideo,
  isPortraitVideoUnderHeadline,
} from '../../components/MediaLoader/utils/isPortraitVideo';
import LocationBasedTopicOJ from '../../components/LocationBasedTopicOJ';

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
        <SaveArticleButton articlePageData={articlePageData} />
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

const ArticlePage = ({
  pageData,
  showTopicDiscoveryComponent = false,
}: {
  pageData: Article;
  showTopicDiscoveryComponent?: boolean;
}) => {
  const [showAllContent, setShowAllContent] = useState(false);
  const { isApp, isAmp, isLite, pageType } = use(RequestContext);

  // EXPERIMENT: Topic Discovery
  const { experimentProps: topicDiscoveryExperimentProps } =
    use(ReverbParamsContext);
  const { experimentVariant: topicDiscoveryVariant } =
    topicDiscoveryExperimentProps ?? {};

  const {
    articleAuthor,
    isTrustProjectParticipant,
    showRelatedTopics,
    translations,
  } = use(ServiceContext);

  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const { enabled: continueReadingButtonToggle } = useToggle(
    'continueReadingButton',
  );
  const { enabled: isTopBarOJsEnabled } = useToggle('topBarOJs');

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
    wsoj: ({ data }: { data: Recommendation[] }) =>
      getWsojComponent({
        data,
        experimentProps: topicDiscoveryExperimentProps,
      }),
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

  const showTopicDiscovery =
    (showTopicDiscoveryComponent ||
      topicDiscoveryVariant === 'topic_discovery') &&
    !isAmp &&
    !isLite;

  const showRelatedTopicsComponent = Boolean(
    showRelatedTopics && topics.length > 0 && !showTopicDiscovery,
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
    !isLive() &&
    pageData?.countryCuration?.summaries?.length,
  );

  // EXPERIMENT: PWA Promotional Banner
  const shouldRenderPWAPromotionalBanner =
    !isTopBarOJsEnabled || !pageData?.secondaryColumn?.topStories?.length;

  const mobileOJOrder = useMobileReferrerOrder();

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
          experimentProps={topicDiscoveryExperimentProps || undefined}
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
          experimentProps={topicDiscoveryExperimentProps || undefined}
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
          experimentProps={topicDiscoveryExperimentProps || undefined}
        />
      ) : null,
    topicDiscovery: topicDiscoverySlot,
    relatedContent: (
      <RelatedContentSection
        content={blocks}
        experimentProps={topicDiscoveryExperimentProps || undefined}
      />
    ),
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
          <TopStoriesSection
            content={topStoriesContent}
            experimentProps={topicDiscoveryExperimentProps || undefined}
          />
        </div>
      ) : null,
    featuredArticles:
      !isApp && !isPGL && featuresContent ? (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
            experimentProps={topicDiscoveryExperimentProps || undefined}
          />
        </div>
      ) : null,
    locationBasedOJ: showCountryCuration ? (
      <LocationBasedTopicOJ pageData={pageData} />
    ) : null,
  };

  return (
    <div css={styles.pageWrapper}>
      {/* EXPERIMENT: PWA Promotional Banner */}
      {shouldRenderPWAPromotionalBanner && <PWAPromotionalBanner />}
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
        <div css={!isPGL ? styles.primaryColumn : styles.pglColumn}>
          <main css={styles.mainContent} role="main">
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
            <OptimizelyPageMetrics trackPageComplete />
          </main>
          <OptimizelyPageMetrics trackPageView trackPageDepth trackVisit />
          {/* EXPERIMENT: Topic Discovery */}
          {!mobileOJOrder && showTopicDiscovery && (
            <TopicDiscovery
              css={[
                ...(showContinueReadingButton
                  ? [!showAllContent && styles.hideTopicDiscovery]
                  : []),
              ]}
              topics={topics}
              experimentProps={topicDiscoveryExperimentProps || undefined}
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
              experimentProps={topicDiscoveryExperimentProps || undefined}
            />
          )}
          {!mobileOJOrder && showPortraitVideoCarousel && (
            <PortraitVideoCarousel
              {...portraitVideoCarouselProps}
              css={styles.portraitVideoCarousel}
            />
          )}
          {!mobileOJOrder && showCountryCuration && (
            <LocationBasedTopicOJ pageData={pageData} />
          )}
          {!mobileOJOrder && (
            <RelatedContentSection
              content={blocks}
              experimentProps={topicDiscoveryExperimentProps || undefined}
            />
          )}
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
          <SecondaryColumn
            pageData={pageData}
            experimentProps={topicDiscoveryExperimentProps || undefined}
          />
        )}
      </div>

      {mobileOJOrder && (
        <div
          css={styles.mobileOJContainer}
          style={{ display: mobileOJOrder ? 'block' : 'none' }}
        >
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
          experimentProps={topicDiscoveryExperimentProps || undefined}
        />
      )}
    </div>
  );
};

export default ArticlePage;
