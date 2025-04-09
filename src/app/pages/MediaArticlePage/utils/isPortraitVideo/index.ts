import {
  AresMediaBlock,
  AresMediaMetadataBlock,
  Orientations,
} from '#app/components/MediaLoader/types';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { OptimoBlock } from '#app/models/types/optimo';

const ORIENTATION_MAPPING: Record<string, Orientations> = {
  Portrait: 'portrait',
  Original: 'landscape',
};

const isPortraitVideo = (blocks: OptimoBlock[]) => {
  const { model: aresMedia }: AresMediaBlock =
    filterForBlockType(blocks, 'aresMedia') ?? {};

  const { model: aresMediaMetadata }: AresMediaMetadataBlock =
    filterForBlockType(aresMedia?.blocks, 'aresMediaMetadata') ?? {};

  const { webcastVersions = [] } = aresMediaMetadata ?? {};

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';

  const versionsBlock = aresMediaMetadata?.[versionParameter]?.[0];

  const orientationType =
    versionsBlock?.types?.find(type =>
      Object.keys(ORIENTATION_MAPPING).includes(type),
    ) ?? 'Original';

  return orientationType === 'Portrait';
};

export default isPortraitVideo;
