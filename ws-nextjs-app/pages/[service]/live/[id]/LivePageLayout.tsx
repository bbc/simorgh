/** @jsx jsx */

import React, { use } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import { RequestContext } from '#app/contexts/RequestContext';
import MetadataContainer from '#app/components/Metadata';
import LinkedDataContainer from '#app/components/LinkedData';
import getLiveBlogPostingSchema from '#app/lib/seoUtils/getLiveBlogPostingSchema';
import { MediaCollection } from '#app/components/MediaLoader/types';
import { OptimoBlock } from '#models/types/optimo';
import Stream from './Stream';
import Header from './Header';
import KeyPoints from './KeyPoints';

import styles from './styles';
import { StreamResponse, Post } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';

interface LivePromoImage {
  url: string;
  urlTemplate?: string;
  altText?: string;
  width?: number;
  height?: number;
  copyright?: string;
}

export type ComponentProps = {
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    headerImage?: {
      url: string;
      urlTemplate: string;
      width: number;
    } | null;
    summaryPoints: { content: KeyPointsResponse | null };
    liveTextStream: {
      content: StreamResponse | null;
      contributors: string | null;
    };
    seo: Partial<{
      seoTitle: string;
      seoDescription: string;
      datePublished: string;
      dateModified: string;
    }>;
    promoImage: LivePromoImage | null;
    startDateTime?: string;
    endDateTime?: string;
    metadata: { atiAnalytics: ATIData };
    mediaCollections: MediaCollection[] | null;
  };
};

const getImageFromPost = (post: Post) => {
  const imageBlock = post?.content?.model?.blocks?.find(
    (block: OptimoBlock) => block.type === 'image',
  ) as OptimoBlock | undefined;

  if (
    !imageBlock ||
    !('model' in imageBlock) ||
    !Array.isArray((imageBlock.model as any).blocks)
  ) {
    return null;
  }

  const rawImageBlock = (
    imageBlock.model as { blocks: OptimoBlock[] }
  ).blocks.find((block: OptimoBlock) => block.type === 'rawImage') as
    | OptimoBlock
    | undefined;

  if (!rawImageBlock || !('model' in rawImageBlock)) {
    return null;
  }

  const { locator, width, height, copyrightHolder } = rawImageBlock.model as {
    locator?: string;
    width?: number;
    height?: number;
    copyrightHolder?: string;
  };

  const altTextBlock = (
    imageBlock.model as { blocks: OptimoBlock[] }
  ).blocks.find((block: OptimoBlock) => block.type === 'altText') as
    | OptimoBlock
    | undefined;

  let altText = '';
  if (
    altTextBlock &&
    'model' in altTextBlock &&
    Array.isArray((altTextBlock.model as any).blocks)
  ) {
    const textBlock = (altTextBlock.model as { blocks: OptimoBlock[] })
      .blocks[0];
    if (
      textBlock &&
      'model' in textBlock &&
      Array.isArray((textBlock.model as any).blocks)
    ) {
      const paragraphBlock = (textBlock.model as { blocks: OptimoBlock[] })
        .blocks[0];
      if (
        paragraphBlock &&
        'model' in paragraphBlock &&
        typeof (paragraphBlock.model as any).text === 'string'
      ) {
        altText = (paragraphBlock.model as { text: string }).text;
      }
    }
  }

  return locator
    ? {
        url: `https://ichef.bbci.co.uk/news/${width}/cpsprodpb/${locator.replace(/^.*\//, '')}`,
        altText,
        width,
        height,
        copyright: copyrightHolder,
      }
    : null;
};

const getHeadlineFromPost = (post: Post) => {
  const headlineBlock = post?.header?.model?.blocks?.find(
    block => block.type === 'headline',
  ) as OptimoBlock | undefined;

  if (!headlineBlock || !('model' in headlineBlock)) return '';

  const textBlock = (
    headlineBlock.model as { blocks?: OptimoBlock[] }
  ).blocks?.find(block => block.type === 'text') as OptimoBlock | undefined;

  if (!textBlock || !('model' in textBlock)) return '';

  const paragraphBlock = (
    textBlock.model as { blocks?: OptimoBlock[] }
  ).blocks?.find(block => block.type === 'paragraph') as
    | OptimoBlock
    | undefined;

  return paragraphBlock &&
    'model' in paragraphBlock &&
    typeof (paragraphBlock.model as any).text === 'string'
    ? (paragraphBlock.model as { text: string }).text
    : '';
};

interface LivePageProps extends ComponentProps {
  assetId?: string | null;
}

const LivePage = ({ pageData, assetId }: LivePageProps) => {
  const { lang, translations, defaultImage, brandName } = use(ServiceContext);
  const { canonicalNonUkLink } = use(RequestContext);
  const {
    title,
    description,
    seo: { seoTitle, seoDescription, datePublished, dateModified },
    startDateTime,
    endDateTime,
    isLive,
    summaryPoints: { content: keyPoints },
    liveTextStream,
    metadata: { atiAnalytics = undefined } = {},
    headerImage,
    promoImage,
    mediaCollections,
  } = pageData;

  const {
    url: imageUrl,
    urlTemplate: imageUrlTemplate,
    width: imageWidth,
  } = headerImage || {};

  const { index: activePage, total: pageCount } =
    liveTextStream?.content?.data?.page || {};

  const { pageXOfY, previousPage, nextPage, page } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations.pagination,
  };

  const showPaginatedTitle = pageCount && activePage && activePage >= 2;
  const pageSeoTitle = seoTitle || title;
  const pageTitle = showPaginatedTitle
    ? `${pageSeoTitle}, ${pageXOfY
        .replace('{x}', activePage.toString())
        .replace('{y}', pageCount.toString())}`
    : pageSeoTitle;
  const pageDescription = seoDescription || description || pageSeoTitle;

  const liveBlogPostingSchema = getLiveBlogPostingSchema({
    posts: liveTextStream?.content?.data.results,
    brandName,
    defaultImage,
    url: canonicalNonUkLink,
    startDateTime,
    endDateTime,
  });

  const postWithMatchingAssetId =
    assetId && liveTextStream?.content?.data?.results
      ? liveTextStream.content.data.results.find(post => post.urn === assetId)
      : null;

  const metaImage =
    postWithMatchingAssetId && getImageFromPost(postWithMatchingAssetId)
      ? getImageFromPost(postWithMatchingAssetId)
      : promoImage;

  const metaTitle =
    postWithMatchingAssetId && getHeadlineFromPost(postWithMatchingAssetId)
      ? getHeadlineFromPost(postWithMatchingAssetId)
      : pageTitle;

  console.log('metaImage', metaImage);
  console.log('metaTitle', metaTitle);
  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={metaTitle ?? pageTitle} />
      <MetadataContainer
        title={metaTitle ?? pageTitle}
        lang={lang}
        image={metaImage?.url}
        imageAltText={metaImage?.altText}
        imageWidth={metaImage?.width}
        imageHeight={metaImage?.height}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer
        type="NewsArticle"
        seoTitle={metaTitle ?? pageTitle}
        headline={metaTitle ?? pageTitle}
        showAuthor
        promoImage={metaImage?.url}
        {...(datePublished && { datePublished })}
        {...(dateModified && { dateModified })}
        {...(liveBlogPostingSchema && { entities: [liveBlogPostingSchema] })}
      />
      <main>
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
          imageUrl={imageUrl}
          imageUrlTemplate={imageUrlTemplate}
          imageWidth={imageWidth}
          mediaCollections={mediaCollections}
        />
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            {keyPoints && (
              <KeyPoints keyPointsContent={keyPoints.model.blocks} />
            )}
          </div>
          <div css={styles.secondSection}>
            <Stream
              streamContent={liveTextStream.content}
              contributors={liveTextStream.contributors}
            />
          </div>
        </div>
        <Pagination
          activePage={activePage}
          pageCount={pageCount}
          pageXOfY={pageXOfY}
          previousPage={previousPage}
          nextPage={nextPage}
          page={page}
        />
      </main>
    </>
  );
};

export default LivePage;
