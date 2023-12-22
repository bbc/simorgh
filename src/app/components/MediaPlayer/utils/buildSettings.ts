import { MediaBlock } from '../types.d';

const isTestURL = () => {
  return process.env.NODE_ENV === 'development';
};

const liveSettings = (blocks: MediaBlock[]) => {
  const aresMedia = blocks.filter(
    (block: MediaBlock) => block.type === 'aresMedia',
  )[0];
  const aresMediaMetaData = aresMedia?.model.blocks?.filter(
    (block: MediaBlock) => block.type === 'aresMediaMetadata',
  )[0];
  const imageData = aresMedia?.model.blocks?.filter(
    (block: MediaBlock) => block.type === 'image',
  )[0];

  const holdingImageURL = imageData?.model.blocks?.filter(
    (block: MediaBlock) => block.type === 'rawImage',
  )[0]?.model.locator;

  // const holdingImageAltText = imageData?.model.blocks?.filter(
  //   (block: MediaBlock) => block.type === 'altText',
  // )[0]?.model.blocks?.[0].model.blocks?.[0].model.text;

  const title = aresMediaMetaData?.model.title;
  const kind = aresMediaMetaData?.model.smpKind;
  const versionData = aresMediaMetaData?.model.versions?.[0];

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

export default liveSettings;
