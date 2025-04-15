/** @jsx jsx */

import { useContext } from 'react';
import { jsx, useTheme, Theme } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock } from '#app/components/MediaLoader/types';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { Tag } from '#app/components/LinkedData/types';
import {
  Article,
  OptimoBylineBlock,
  OptimoBylineContributorBlock,
} from '#app/models/types/optimo';
import { MediaOverrides } from '#app/models/types/media';
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

import ScrollablePromo from '../../legacy/components/ScrollablePromo';

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
import RelatedTopics from '../../legacy/containers/RelatedTopics';
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
import RelatedContentSection from '../../components/RelatedContentSection';

import SecondaryColumn from './SecondaryColumn';

import styles from './MediaArticlePage.styles';
import { ComponentToRenderProps, TimestampProps } from './types';
import checkIsLiveMedia from './utils/checkIsLiveMedia';

const getAudioVideoComponent =
  (isCpsMap: boolean) => (props: ComponentToRenderProps) => {
    const { blocks } = props;
    return (
      <div
        css={({ spacings }: Theme) => [
          `padding-top: ${spacings.TRIPLE}rem`,
          isCpsMap && styles.cafMediaPlayer,
        ]}
      >
        <MediaLoader blocks={blocks as MediaBlock[]} />
      </div>
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

const Links = (props: ComponentToRenderProps) => <ScrollablePromo {...props} />;

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

const MediaArticlePage = ({ pageData }: { pageData: Article }) => {
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

  const headline = getHeadline(pageData) ?? '';
  const description = getSummary(pageData) || getHeadline(pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData) as Tag[];
  const topics = pageData?.metadata?.topics ?? [];
  const blocks = pageData?.content?.model?.blocks ?? [];

  const bylineBlock = blocks.find(
    block => block.type === 'byline',
  ) as OptimoBylineBlock;

  const bylineContribBlocks = bylineBlock?.model?.blocks || [];

  const bylineLinkedData = bylineExtractor(bylineContribBlocks);

  const hasByline = !!bylineLinkedData;

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

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: getAudioVideoComponent(isCpsMap),
    video: getAudioVideoComponent(isCpsMap),
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

  return (
    <div css={styles.pageWrapper}>
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
          {showTopics && (
            <RelatedTopics
              css={styles.relatedTopics}
              topics={topics}
              backgroundColour={GREY_2}
              tagBackgroundColour={WHITE}
            />
          )}
          <RelatedContentSection content={blocks} />
        </div>
        {!isCpsMap && <SecondaryColumn pageData={pageData} />}
      </div>
    </div>
  );
};

export default MediaArticlePage;
