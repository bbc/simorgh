/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use, useState } from 'react';
import { jsx, useTheme } from '@emotion/react';
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
  Props as ContinueReadingProps,
} from './ContinueReadingButton';
import ArticleHeadline from './ArticleHeadline';
import {
  isPortraitVideo,
  isPortraitVideoUnderHeadline,
} from '../utils/portraitVideo';

// EXPERIMENT: Read Time
interface ReadTimeData {
  readTimeValue: number | undefined;
  readTimeLocation: string;
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

// EXPERIMENT: Read Time
const Placeholder = ({ className }: { className?: string }) => {
  const { service } = use(ServiceContext);
  const servicesInExperiment = ['turkce', 'mundo'];
  return servicesInExperiment.includes(service) ? (
    <div className={className} />
  ) : null;
};

// EXPERIMENT: Read Time
const getTimestampComponent =
  (
    hasByline: boolean,
    bylineContribBlocks: OptimoBylineContributorBlock[],
    firstPublished: string,
    lastPublished: string,
    readTimeData: ReadTimeData,
  ) =>
  (props: ComponentToRenderProps & TimeStampProps) => {
    const { readTimeValue, readTimeLocation, readTimeVariant } = readTimeData;
    // EXPERIMENT: Read Time
    const showReadTimeBelowTimestamp =
      !!readTimeValue &&
      readTimeValue !== 0 &&
      readTimeLocation === 'timestamp';

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
        {/* EXPERIMENT: Read Time */}
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

// EXPERIMENT: Read Time
const getHeadlineComponent =
  (readTimeData: ReadTimeData) => (props: ComponentToRenderProps) => {
    const { readTimeValue, readTimeLocation, readTimeVariant } = readTimeData;
    // Ensures we send view event for control variant
    const showReadTimeBelowHeadline =
      !!readTimeValue && ['headline', 'control'].includes(readTimeLocation);

    return (
      <>
        <ArticleHeadline
          {...props}
          {...(showReadTimeBelowHeadline && { applyReadTimeSpacing: true })}
        />
        {showReadTimeBelowHeadline ? (
          <ReadTime
            readTimeValue={readTimeValue}
            readTimeVariant={readTimeVariant}
          />
        ) : (
          <Placeholder css={styles.readTimePlaceholderBelowHeadline} />
        )}
      </>
    );
  };

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

  const {
    palette: { GREY_2, WHITE },
  } = useTheme();

  const continueReadingExperimentName = 'newswb_ws_read_more_b';
  const continueReadingVariant = useOptimizelyVariation({
    experimentName: continueReadingExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const isInServerSideExperiment =
    continueReadingVariant && continueReadingVariant !== 'off';

  // EXPERIMENT: Read Time
  const readTimeExperimentName = 'newswb_ws_article_read_time';
  const readTimeExperimentVariant = useOptimizelyVariation({
    experimentName: readTimeExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const readTimeLocation = (() => {
    if (!readTimeExperimentVariant) return 'off';

    if (readTimeExperimentVariant.includes('headline')) {
      return 'headline';
    }
    if (readTimeExperimentVariant.includes('timestamp')) {
      return 'timestamp';
    }
    if (readTimeExperimentVariant.includes('control')) {
      return 'control';
    }
    return 'off';
  })();

  const allowAdvertising = pageData?.metadata?.allowAdvertising ?? false;
  const adcampaign = pageData?.metadata?.adCampaignKeyword;

  const {
    metadata: { atiAnalytics },
    mostRead: mostReadInitialData,
  } = pageData;

  const { enabled: podcastPromoEnabled } = useToggle('podcastPromo');
  const { enabled: liteCTAShows } = useToggle('liteSiteCTA');

  // EXPERIMENT: Read Time
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
    block => block.type === 'byline',
  ) as OptimoBylineBlock;

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
    ...(isInServerSideExperiment && {
      continueReadingExperimentName,
      continueReadingVariant,
    }),
  };

  // EXPERIMENT: Read Time
  const readTimeData = {
    readTimeValue,
    readTimeLocation,
    readTimeVariant: readTimeExperimentVariant || 'off',
  };

  const componentsToRender = {
    visuallyHiddenHeadline,
    // EXPERIMENT: Read Time
    headline: getHeadlineComponent(readTimeData),
    subheadline: Headings,
    audio: MediaLoader,
    video: getVideoComponent(translations, blocks),
    text,
    image: getImageComponent(preloadLeadImageToggle),
    // EXPERIMENT: Read Time
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

  const showContinueReadingButton = Boolean(
    !isAmp &&
      !isLite &&
      !isApp &&
      continueReadingVariant &&
      ['read-more-a', 'read-more-b', 'read-more-a-and-top-stories'].includes(
        continueReadingVariant,
      ),
  );

  return (
    <div css={styles.pageWrapper}>
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
          <main
            css={[
              styles.mainContent,
              ...(showContinueReadingButton
                ? [!showAllContent && styles.contentHidden(liteCTAShows)]
                : []),
            ]}
            role="main"
          >
            <Blocks
              blocks={articleBlocks}
              componentsToRender={componentsToRender}
            />
            {showContinueReadingButton && (
              <ContinueReadingButton
                showAllContent={showAllContent}
                setShowAllContent={() => setShowAllContent(true)}
                variation={
                  continueReadingVariant as ContinueReadingProps['variation']
                }
                liteCTAShows={liteCTAShows}
              />
            )}
            {/* EXPERIMENT: Read Time */}
            {readTimeValue ||
              (continueReadingVariant && (
                <OptimizelyPageMetrics trackPageComplete />
              ))}
          </main>
          {/* EXPERIMENT: Read Time */}
          {readTimeValue ||
            (continueReadingVariant && (
              <OptimizelyPageMetrics trackPageView trackPageDepth />
            ))}
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
          <RelatedContentSection
            content={blocks}
            sendOptimizelyEvents={false}
          />
        </div>
        {!isApp && !isPGL && (
          <SecondaryColumn pageData={pageData} sendOptimizelyEvents={false} />
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
          sendOptimizelyEvents={false}
        />
      )}
    </div>
  );
};

export default ArticlePage;
