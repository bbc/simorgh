import deepGet from '../../helpers/json/deepGet';

const videoObject = 'VideoObject';

const videoMetadata = blocks => {
  const aresMediaBlocks = deepGet(['model', 'blocks'], blocks);
  const listContent = [];
  const metadata = {
    video: {
      '@list': listContent,
    },
  };

  if (!aresMediaBlocks || aresMediaBlocks.length < 1) {
    return undefined;
  }
  aresMediaBlocks.forEach(block => {
    if (block.type !== 'aresMediaMetadata') {
      return null;
    }
    return listContent.push({
      '@type': videoObject,
      name: deepGet(['model', 'title'], block),
      description: deepGet(['model', 'synopses', 'short'], block),
      duration: deepGet(['model', 'versions', [0], 'duration'], block),
      thumbnailUrl: `https://${deepGet(['model', 'imageUrl'], block)}`,
    });
  });
  return listContent.length > 0 ? metadata : undefined;
};

export default videoMetadata;
