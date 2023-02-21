import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import paths from 'ramda/src/paths';

const DEFAULT_IMAGE_RES = '1024x576';

export const getThumbnailUri = aresMetadataBlock => {
  let imageUrl = pathOr('', ['model', 'imageUrl'], aresMetadataBlock);

  if (imageUrl.startsWith('http')) {
    imageUrl = imageUrl.split('/').slice(2).join('/');
  }

  return `https://${imageUrl.replace('$recipe', DEFAULT_IMAGE_RES)}`;
};
export const getUploadDate = aresMetadataBlock => {
  const [availableFrom, firstPublished] = paths(
    [
      ['model', 'versions', [0], 'availableFrom'],
      ['model', 'firstPublished'],
    ],
    aresMetadataBlock,
  );

  const uploadDate = availableFrom || firstPublished || null;

  return new Date(uploadDate).toISOString();
};

export const getType = aresMetadataBlock => {
  const format = path(['model', 'format'], aresMetadataBlock);
  return format === 'audio' ? 'AudioObject' : 'VideoObject';
};

export const getMetadata = aresMetadataBlock => {
  return {
    '@context': 'http://schema.org',
    '@type': getType(aresMetadataBlock),
    name: path(['model', 'title'], aresMetadataBlock),
    description: path(['model', 'synopses', 'short'], aresMetadataBlock),
    duration: pathOr(
      null,
      ['model', 'versions', [0], 'durationISO8601'],
      aresMetadataBlock,
    ),
    thumbnailUrl: getThumbnailUri(aresMetadataBlock),
    uploadDate: getUploadDate(aresMetadataBlock),
    embedURL: pathOr(null, ['embedSource'], aresMetadataBlock),
  };
};

export const getMetadataBlock = aresMediaBlocks => {
  const aresMetadataBlock = aresMediaBlocks.filter(
    block => block.type === 'aresMediaMetadata',
  );

  return aresMetadataBlock[0];
};

export const mediaPlayerMetadata = (aresMediaBlock, embedSource) =>
  getMetadata({ ...getMetadataBlock(aresMediaBlock), embedSource });
