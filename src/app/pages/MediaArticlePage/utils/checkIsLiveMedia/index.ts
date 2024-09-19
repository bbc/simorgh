import { OptimoBlock } from '#app/models/types/optimo';

const checkIsLiveMedia = (blocks: OptimoBlock[]) => {
  const mediaBlocks = blocks.filter(
    block => block.type === 'video' || block.type === 'audio',
  );

  if (!mediaBlocks || mediaBlocks?.length !== 1) return false;

  const aresMediaMetadata = // @ts-expect-error - nested block structure
    mediaBlocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.find(
      (block: OptimoBlock) => block.type === 'aresMediaMetadata',
    );

  return Boolean(aresMediaMetadata?.model?.live);
};

export default checkIsLiveMedia;
