import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { RequestContext } from '#app/contexts/RequestContext';
import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes } from '#app/models/types/global';
import { AresMediaBlock, AresMediaMetadataBlock, MediaBlock } from '../types';

const SUPPORTED_PAGE_TYPES = [
  AV_EMBEDS,
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  MEDIA_ASSET_PAGE,
  MEDIA_ARTICLE_PAGE,
] as PageTypes[];

const getThumbnailUri = (url?: string) => {
  if (!url) return null;

  let imageUrl = url;

  if (imageUrl.startsWith('http')) {
    imageUrl = imageUrl.split('/')?.slice(2)?.join('/');
  }

  return `https://${imageUrl.replace('$recipe', '1024x576')}`;
};

const getUploadDate = (availableFrom?: string, firstPublished?: string) => {
  const uploadDate = availableFrom || firstPublished;

  if (!uploadDate) return null;

  return new Date(uploadDate).toISOString();
};

type Props = {
  blocks: MediaBlock[];
  embedURL?: string;
};

const Metadata = ({ blocks, embedURL }: Props) => {
  const { pageType } = useContext(RequestContext);

  if (!SUPPORTED_PAGE_TYPES.includes(pageType)) return null;

  const aresMediaBlock: AresMediaBlock = filterForBlockType(
    blocks,
    'aresMedia',
  );

  if (!aresMediaBlock) return null;

  const { model: metadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMediaBlock?.model?.blocks, 'aresMediaMetadata') ??
    {};

  if (!metadata) return null;

  const schema = {
    '@context': 'http://schema.org',
    '@type': metadata?.format === 'audio' ? 'AudioObject' : 'VideoObject',
    name: metadata?.title ?? null,
    description: metadata?.synopses?.short ?? null,
    duration: metadata?.versions?.[0]?.durationISO8601 ?? null,
    thumbnailUrl: getThumbnailUri(metadata?.imageUrl),
    uploadDate: getUploadDate(
      metadata?.versions?.[0]?.availableFrom,
      metadata?.firstPublished,
    ),
    embedURL: embedURL ?? null,
  };

  const metadataJson = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(schema).filter(([_, v]) => v != null),
  ) as typeof schema;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(metadataJson)}</script>
    </Helmet>
  );
};

export default Metadata;
