import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

const DEFAULT_IMAGE_RES = '1024x576';

export const getThumbnailUri = aresMetadataBlock => {
  const imageUrl = pathOr('', ['model', 'imageUrl'], aresMetadataBlock);
  return `https://${imageUrl.replace('$recipe', DEFAULT_IMAGE_RES)}`;
};
export const getUploadDate = aresMetadataBlock => {
  const uploadDate = pathOr(
    null,
    ['model', 'versions', [0], 'availableFrom'],
    aresMetadataBlock,
  );
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
