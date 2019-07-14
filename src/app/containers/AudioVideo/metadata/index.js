import deepGet from '../../../lib/utilities/deepGet';

const audioVideoMetadata = blocks => {
  const aresMediaBlocks = deepGet(['model', 'blocks'], blocks);
  const listContent = [];
  const metadata = {
    video: {
      '@list': listContent,
    },
  };

  if (!aresMediaBlocks || aresMediaBlocks.length < 1) {
    return null;
  }

  const aresMetaDataBlocks = aresMediaBlocks.filter(
    block => block.type === 'aresMediaMetadata',
  );

  aresMetaDataBlocks.forEach(block => {
    const format = deepGet(['model', 'format'], block);
    const type = format === 'audio' ? 'AudioObject' : 'VideoObject';

    listContent.push({
      '@type': type,
      name: deepGet(['model', 'title'], block),
      description: deepGet(['model', 'synopses', 'short'], block),
      duration: deepGet(['model', 'versions', [0], 'duration'], block),
      thumbnailUrl: `https://${deepGet(['model', 'imageUrl'], block)}`,
      uploadDate: deepGet(['model', 'versions', [0], 'availableFrom'], block),
    });
  });

  return listContent.length > 0 ? metadata : null;
};

export default audioVideoMetadata;
