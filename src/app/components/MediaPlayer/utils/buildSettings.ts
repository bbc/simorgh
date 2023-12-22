import { MediaBlock } from '../types.d';

const isTestURL = () => {
  return process.env.NODE_ENV === 'development';
};

const formatHoldingImage = (imageURL: string) =>
  `https://${imageURL.replace('$recipe', '{recipe}')}`;

const PLACEHOLDER_IMG = '';
const DEFAULT_KIND = 'programme';

const liveConfig = (blocks: MediaBlock[]) => {
  const aresMedia = blocks.filter(
    (block: MediaBlock) => block.type === 'aresMedia',
  )[0];
  const aresMediaMetaData = aresMedia?.model.blocks?.filter(
    (block: MediaBlock) => block.type === 'aresMediaMetadata',
  )[0];

  const title = aresMediaMetaData?.model.title ?? PLACEHOLDER_IMG;
  const kind = aresMediaMetaData?.model.smpKind ?? DEFAULT_KIND;
  const versionData = aresMediaMetaData?.model.versions?.[0];
  const aresImageURL = aresMediaMetaData?.model.imageUrl;
  const holdingImageURL = aresImageURL
    ? formatHoldingImage(aresImageURL)
    : PLACEHOLDER_IMG;

  const isTest = isTestURL();

  if (versionData == null) {
    return null;
  }

  const { versionId, duration, warnings } = versionData;
  const playlistItem = { versionID: versionId, kind, duration };

  return {
    product: 'news',
    superResponsive: true as const,
    counterName: 'smp.demopage.player.page',
    ...(isTest && { mediator: { host: 'open.test.bbc.co.uk' } }),
    playlistObject: {
      title,
      holdingImageURL,
      items: [playlistItem],
      ...(warnings && { guidance: warnings?.short || warnings.long }),
    },
  };
};

export default liveConfig;
