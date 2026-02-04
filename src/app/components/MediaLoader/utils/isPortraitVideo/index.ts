import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { OptimoBlock } from '#app/models/types/optimo';
import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  ClipMediaBlock,
  MediaBlock,
} from '../../types';
import getMediaOrientation from '../getMediaOrientation';

const getAresMedia = (optimoBlock: OptimoBlock[]) => {
  const aresMedia: AresMediaBlock =
    filterForBlockType(optimoBlock ?? [], 'aresMedia') ?? {};

  return aresMedia;
};

const getAresMediaMetadata = (mediaBlock: AresMediaBlock) => {
  const { model: aresMedia }: AresMediaBlock = mediaBlock || {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks ?? [], 'aresMediaMetadata') ?? {};

  return aresMediaMetadata;
};

const getAresMediaOrientation = (mediaBlock: AresMediaBlock) => {
  const aresMediaMetadata = getAresMediaMetadata(mediaBlock);

  const { webcastVersions = [] } = aresMediaMetadata ?? {};

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const versionsBlock = aresMediaMetadata?.[versionParameter]?.[0];

  return getMediaOrientation(versionsBlock?.types);
};

const getClipMediaOrientation = (mediaBlock: ClipMediaBlock) => {
  const { video } = mediaBlock?.model || {};

  const clipOrientation = [video?.version?.orientation || ''];

  return getMediaOrientation(clipOrientation);
};

export const isPortraitVideo = (mediaBlock: OptimoBlock[]) => {
  const inferredMediaBlock: MediaBlock[] = [];

  const mediaOrientationExtractor = {
    aresMedia: getAresMediaOrientation,
    clipMedia: getClipMediaOrientation,
  };

  const mediaBlockType =
    Object.keys(mediaOrientationExtractor).find(key => {
      const filteredBlockType = filterForBlockType(mediaBlock, key);

      if (filteredBlockType) {
        inferredMediaBlock.push(filteredBlockType);
      }

      return !!filteredBlockType;
    }) || '';

  const orientationType = mediaOrientationExtractor[mediaBlockType](
    inferredMediaBlock?.[0],
  );

  return orientationType === 'portrait';
};

export const isPortraitVideoUnderHeadline = (
  articlePageBlocks: OptimoBlock[],
  mediaBlock: OptimoBlock[],
) => {
  const blockUnderHeadline = articlePageBlocks[1];
  if (blockUnderHeadline.type !== 'video' || !isPortraitVideo(mediaBlock)) {
    return false;
  }

  const targetAresMediaBlocks = getAresMedia(
    (blockUnderHeadline?.model as { blocks?: OptimoBlock[] })?.blocks ?? [],
  );
  const targetAresMediaMetadataBlock = getAresMediaMetadata(
    targetAresMediaBlocks,
  );

  const currentAresMediaBlocks = getAresMedia(mediaBlock);
  const currentAresMediaMetadata = getAresMediaMetadata(currentAresMediaBlocks);

  if (targetAresMediaMetadataBlock?.id === currentAresMediaMetadata?.id) {
    return true;
  }
  return false;
};
