import React from 'react';
import { Helmet } from 'react-helmet';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { AresMediaBlock, AresMediaMetadataBlock, MediaBlock } from '../types';

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
  const aresMediaBlock: AresMediaBlock = filterForBlockType(
    blocks,
    'aresMedia',
  );

  if (!aresMediaBlock) return null;

  const { model: metadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMediaBlock?.model?.blocks, 'aresMediaMetadata') ??
    {};

  const metadataJson = {
    '@context': 'http://schema.org',
    '@type': metadata?.format === 'audio' ? 'AudioObject' : 'VideoObject',
    name: metadata?.title,
    description: metadata?.synopses?.short,
    duration: metadata?.versions?.[0]?.durationISO8601 ?? null,
    thumbnailUrl: getThumbnailUri(metadata?.imageUrl),
    uploadDate: getUploadDate(
      metadata?.versions?.[0]?.availableFrom,
      metadata?.firstPublished,
    ),
    embedURL,
  };

  return (
    <Helmet>
      {metadata && (
        <script type="application/ld+json">
          {JSON.stringify(metadataJson)}
        </script>
      )}
    </Helmet>
  );
};

export default Metadata;
