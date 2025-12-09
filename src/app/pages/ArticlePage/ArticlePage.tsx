import { use, useState } from 'react';
import { useTheme } from '@emotion/react';
import useToggle from '#hooks/useToggle';
import { singleTextBlock } from '#app/models/blocks';
import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
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
import InlinePodcastPromo from '#containers/PodcastPromo/Inline';
import {
  Article,
  OptimoBlock,
  OptimoBylineBlock,
  OptimoBylineContributorBlock,
} from '#app/models/types/optimo';
import { Translations } from '#app/models/types/translations';
import { Recommendation } from '#app/models/types/onwardJourney';

import ScrollablePromo from '#components/ScrollablePromo';
import Recommendations from '#app/components/Recommendations';
import { ReadTimeArticleExperiment as ReadTime } from '#app/components/ReadTime';
import PWAPromotionalBanner from '#app/components/PWAPromotionalBanner';
import PersonalisedContent from '../../components/PersonalisedContent';
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
import Disclaimer from '../../components/Disclaimer';
import SecondaryColumn from './SecondaryColumn';
import styles from './ArticlePage.styles';
import { ComponentToRenderProps, TimeStampProps } from './types';
import ContinueReadingButton, {
  ContinueReadingButtonProps,
} from './ContinueReadingButton';
import ArticleHeadline from './ArticleHeadline';
import {
  isPortraitVideo,
  isPortraitVideoUnderHeadline,
} from '../utils/portraitVideo';

// EXPERIMENT: Article Read Time 2
interface ReadTimeData {
  readTimeValue: number | undefined;
  readTimeVariant: string;
}

const getImageComponent =
  (preloadLeadImageToggle: boolean) => (props: ComponentToRenderProps) => (
    <ImageWithCaption
      {...props}
      sizes="(min-width: 1008px) 760px, 100vw"
      shouldPreload={preloadLeadImageToggle}
    />
  );

// EXPERIMENT: Article Read Time 2
const Placeholder = ({ className }: { className?: string }) => {
  const { service } = use(ServiceContext);
  const servicesInExperiment = ['']; // adding services will show placeholder regardless of whether experiment is running
  return servicesInExperiment.includes(service) ? (
    <div className={className} />
  ) : null;
};

// EXPERIMENT: Article Read Time 2
const getTimestampComponent =
  (
    hasByline: boolean,
    bylineContribBlocks: OptimoBylineContributorBlock[],
    firstPublished: string,
    lastPublished: string,
    readTimeData: ReadTimeData,
  ) =>
  (props: ComponentToRenderProps & TimeStampProps) => {
    // EXPERIMENT: Article Read Time 2
    const { readTimeValue, readTimeVariant } = readTimeData;
    const isReadTimeVariantValid = readTimeVariant !== 'off' && readTimeVariant;
    const showReadTimeBelowTimestamp =
      !!readTimeValue && readTimeValue !== 0 && !!isReadTimeVariantValid;

    return hasByline ? (
      <>
        <Byline blocks={bylineContribBlocks}>
          <Timestamp
            firstPublished={new Date(firstPublished).getTime()}
            lastPublished={new Date(lastPublished).getTime()}
            popOut={false}
            showReadTimeBelowTimestamp={showReadTimeBelowTimestamp}
          />
          {showReadTimeBelowTimestamp && (
            <ReadTime
              readTimeValue={readTimeValue}
              readTimeVariant={readTimeVariant}
            />
          )}
        </Byline>
        {!showReadTimeBelowTimestamp && (
          <Placeholder css={styles.readTimePlaceholderBelowTimestamp} />
        )}
      </>
    ) : (
      <>
        <Timestamp
          {...props}
          popOut={false}
          showReadTimeBelowTimestamp={showReadTimeBelowTimestamp}
        />
        {/* EXPERIMENT: Article Read Time 2 */}
        {showReadTimeBelowTimestamp ? (
          <ReadTime
            readTimeValue={readTimeValue}
            readTimeVariant={readTimeVariant}
          />
        ) : (
          <Placeholder css={styles.readTimePlaceholderBelowTimestamp} />
        )}
      </>
    );
  };

const getMpuComponent =
  (allowAdvertising: boolean) => (props: ComponentToRenderProps) =>
    allowAdvertising ? <AdContainer {...props} slotType="mpu" /> : null;

const getWsojComponent = (
  props: ComponentToRenderProps & { data: Recommendation[] },
) => <Recommendations data={props.data} />;

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
      isPortraitVideo(blocks) &&
      title &&
      !isPortraitVideoUnderHeadline(pageBlocks, blocks);

    return (
      <>
        {showTitle && <strong css={styles.portraitVideoTitle}>{title}</strong>}
        <MediaLoader blocks={blocks as MediaBlock[]} />
      </>
    );
  };

const getContinueReadingButton =
  ({ showAllContent, setShowAllContent }: ContinueReadingButtonProps) =>
  () => {
    return (
      <ContinueReadingButton
        showAllContent={showAllContent}
        setShowAllContent={setShowAllContent}
      />
    );
  };

const ArticlePage = ({ pageData }: { pageData: Article }) => {
  const [showAllContent, setShowAllContent] = useState(false);
  const { isApp, isAmp, isLite } = use(RequestContext);
  const {
    articleAuthor,
    isTrustProjectParticipant,
    showRelatedTopics,
    brandName,
    translations,
  } = use(ServiceContext);

  const { enabled: preloadLeadImageToggle } = useToggle('preloadLeadImage');
  const { enabled: continueReadingButtonToggle } = useToggle(
    'continueReadingButton',
  );

  const {
    palette: { GREY_2, WHITE },
  } = useTheme();

  // EXPERIMENT: Article Read Time 2
  const readTimeExperimentName = 'newswb_ws_article_read_time_2';
  const readTimeExperimentVariant = useOptimizelyVariation({
    experimentName: readTimeExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // EXPERIMENT: Time of Day Experiment
  const timeOfDayExperimentName = 'newswb_ws_tod_article';
  const timeOfDayExperimentVariant = useOptimizelyVariation({
    experimentName: timeOfDayExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  // EXPERIMENT: Location based Topics Experiment
  const personalisedContentExperimentName = 'newswb_ws_location_based_topics';
  const personalisedContentExperimentVariant = useOptimizelyVariation({
    experimentName: personalisedContentExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const allowAdvertising = pageData?.metadata?.allowAdvertising ?? false;
  const adcampaign = pageData?.metadata?.adCampaignKeyword;

  const {
    metadata: { atiAnalytics },
    mostRead: mostReadInitialData,
  } = pageData;

  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');

  // EXPERIMENT: Article Read Time 2
  const readTimeValue = pageData?.metadata?.stats?.readTime;

  const headline = getHeadline(pageData) ?? '';
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const topics = pageData?.metadata?.topics ?? [];
  const blocks = pageData?.content?.model?.blocks ?? [];
  const startsWithHeading = blocks?.[0]?.type === 'headline' || false;

  const bylineBlock = blocks.find(
    (block): block is OptimoBylineBlock =>
      block.type === 'byline' || block.type === 'subByline',
  );

  const bylineContribBlocks = bylineBlock?.model?.blocks || [];

  const bylineLinkedData = bylineExtractor(bylineContribBlocks);

  const hasByline = bylineLinkedData.length > 0;

  const articleAuthorTwitterHandle = hasByline
    ? getAuthorTwitterHandle(blocks)
    : null;

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
    // EXPERIMENT: Article Read Time 2
    // Better way to handle this?
    ...(readTimeExperimentVariant &&
      readTimeExperimentVariant !== 'off' && {
        experimentName: readTimeExperimentName,
        experimentVariant: readTimeExperimentVariant,
      }),
    ...(timeOfDayExperimentVariant &&
      timeOfDayExperimentVariant !== 'off' && {
        experimentName: timeOfDayExperimentName,
        experimentVariant: timeOfDayExperimentVariant,
      }),
  };

  // EXPERIMENT: Article Read Time 2
  const readTimeData = {
    readTimeValue,
    readTimeVariant: readTimeExperimentVariant || 'off',
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

  const componentsToRender = {
    visuallyHiddenHeadline,
    headline: getHeadlineComponent,
    subheadline: Headings,
    audio: MediaLoader,
    video: getVideoComponent(translations, blocks),
    text,
    image: getImageComponent(preloadLeadImageToggle),
    // EXPERIMENT: Article Read Time 2
    timestamp: getTimestampComponent(
      hasByline,
      bylineContribBlocks,
      firstPublished,
      lastPublished,
      readTimeData,
    ),
    social: SocialEmbedContainer,
    embed: UnsupportedEmbed,
    embedHtml: EmbedHtml,
    oEmbed: OEmbedLoader,
    embedImages: EmbedImages,
    embedUploader: Uploader,
    group: gist,
    links: ScrollablePromo,
    mpu: getMpuComponent(allowAdvertising),
    wsoj: getWsojComponent,
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
  const authors = bylineLinkedData?.map(data => data?.authorName).join(',');

  // EXPERIMENT: Location based Topics Experiment
  const showPersonalisedContent = Boolean(
    !isAmp &&
      !isLite &&
      !isApp &&
      personalisedContentExperimentVariant &&
      personalisedContentExperimentVariant !== 'off',
  );

  // EXPERIMENT: Location based Topics Experiment
  const personalisedContentBlock = showPersonalisedContent ? (
    <PersonalisedContent
      pageData={pageData}
      personalisedTopicCurationExperimentVariant={
        personalisedContentExperimentVariant ?? ''
      }
    />
  ) : null;

  // EXPERIMENT: PWA Promotional Banner
  const hasSecondaryColumnTopStories =
    pageData?.secondaryColumn?.topStories?.length;

  return (
    <div css={styles.pageWrapper}>
      {/* EXPERIMENT: PWA Promotional Banner */}
      {!hasSecondaryColumnTopStories ? <PWAPromotionalBanner /> : null}
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
          <OptimizelyPageMetrics trackPageView trackPageDepth />
          {showTopics && (
            <RelatedTopics
              css={[
                styles.relatedTopics,
                ...(showContinueReadingButton
                  ? [!showAllContent && styles.hideRelatedTopics]
                  : []),
              ]}
              topics={topics}
              mobileDivider={false}
              backgroundColour={GREY_2}
              tagBackgroundColour={WHITE}
            />
          )}
          {/* EXPERIMENT: Location based Topics Experiment */}
          {personalisedContentExperimentVariant === 'variation_2' &&
            personalisedContentBlock}
          <RelatedContentSection
            content={blocks}
            // EXPERIMENT: Time of Day Experiment
            {...(timeOfDayExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: timeOfDayExperimentName,
                experimentVariant: timeOfDayExperimentVariant,
              },
            })}
            // EXPERIMENT: Location based Topics Experiment
            {...(personalisedContentExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: personalisedContentExperimentName,
                experimentVariant: personalisedContentExperimentVariant,
              },
            })}
          />
          {/* EXPERIMENT: Location based Topics Experiment */}
          {personalisedContentExperimentVariant === 'variation_1' &&
            personalisedContentBlock}
        </div>
        {!isApp && !isPGL && (
          <SecondaryColumn
            pageData={pageData}
            // EXPERIMENT: Location based Topics Experiment
            personalisedContentExperimentVariant={
              personalisedContentExperimentVariant
            }
            personalisedContentExperimentName={
              personalisedContentExperimentName
            }
            // EXPERIMENT: Time of Day Experiment
            timeOfDayExperimentVariant={timeOfDayExperimentVariant}
            timeOfDayExperimentName={timeOfDayExperimentName}
          />
        )}
      </div>
      {!isApp && !isPGL && (
        <MostRead
          css={styles.mostReadSection}
          data={mostReadInitialData}
          columnLayout="multiColumn"
          size="default"
          headingBackgroundColour={GREY_2}
          mobileDivider={showTopics}
          eventTrackingData={{
            componentName: 'most-read',
            // EXPERIMENT: Time of Day Experiment
            ...(timeOfDayExperimentVariant && {
              sendOptimizelyEvents: true,
              experimentName: timeOfDayExperimentName,
              experimentVariant: timeOfDayExperimentVariant,
            }),
            // EXPERIMENT: Location based Topics Experiment
            ...(personalisedContentExperimentVariant && {
              sendOptimizelyEvents: true,
              experimentName: personalisedContentExperimentName,
              experimentVariant: personalisedContentExperimentVariant,
            }),
          }}
        />
      )}
    </div>
  );
};

export default ArticlePage;
