/** @jsx jsx */

import { useContext } from 'react';
import { jsx, useTheme, Theme } from '@emotion/react';
import { OEmbedProps } from '#app/components/Embeds/types';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { Tag } from '#app/components/LinkedData/types';
import { ArticlePageProps, OptimoBylineBlock } from '#app/models/types/optimo';
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
import ArticleMediaPlayer from '../../legacy/containers/ArticleMediaPlayer';
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
import {
  ComponentToRenderProps,
  EmbedHtmlProps,
  TimestampProps,
} from './types';

const MediaArticlePage = ({ pageData }: { pageData: ArticlePageProps }) => {
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

  const headline = getHeadline(pageData) as string;
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

  const isMap = type === MEDIA_ASSET_PAGE;

  const atiData = {
    ...atiAnalytics,
    ...(isMap && { pageTitle: `${atiAnalytics.pageTitle} - ${brandName}` }),
  };

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    audio: (props: ComponentToRenderProps) => (
      <div
        css={({ spacings }: Theme) => [
          `padding-top: ${spacings.TRIPLE}rem`,
          isMap && styles.cafMediaPlayer,
        ]}
      >
        <ArticleMediaPlayer {...props} />
      </div>
    ),
    video: (props: ComponentToRenderProps) => (
      <div
        css={({ spacings }: Theme) => [
          `padding-top: ${spacings.TRIPLE}rem`,
          isMap && styles.cafMediaPlayer,
        ]}
      >
        <ArticleMediaPlayer {...props} />
      </div>
    ),
    text,
    byline: (props: ComponentToRenderProps) =>
      hasByline ? (
        <Byline {...props}>
          <Timestamp
            firstPublished={new Date(firstPublished).getTime()}
            lastPublished={new Date(lastPublished).getTime()}
            popOut={false}
          />
        </Byline>
      ) : null,
    image: (props: ComponentToRenderProps) => (
      <ImageWithCaption
        {...props}
        sizes="(min-width: 1008px) 760px, 100vw"
        shouldPreload={preloadLeadImageToggle}
      />
    ),
    timestamp: (props: TimestampProps) =>
      hasByline ? null : <Timestamp {...props} popOut={false} />,
    social: SocialEmbedContainer,
    embedHtml: (props: EmbedHtmlProps) => <EmbedHtml {...props} />,
    embedImages: (props: ComponentToRenderProps) => <EmbedImages {...props} />,
    oEmbed: (props: OEmbedProps) => <OEmbedLoader {...props} />,
    group: gist,
    links: (props: ComponentToRenderProps) => <ScrollablePromo {...props} />,
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
          isMap
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
        <div css={isMap ? styles.fullWidthContainer : styles.primaryColumn}>
          <main css={styles.mainContent} role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </main>
          {showRelatedTopics && topics && (
            <RelatedTopics
              css={styles.relatedTopics}
              topics={topics}
              backgroundColour={GREY_2}
              tagBackgroundColour={WHITE}
            />
          )}
          <RelatedContentSection content={blocks} />
        </div>
        {!isMap && <SecondaryColumn pageData={pageData} />}
      </div>
    </div>
  );
};

export default MediaArticlePage;
