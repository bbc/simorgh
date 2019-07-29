import pathOr from 'ramda/src/pathOr';

const mediaPlayerMetadata = blocks => {
  const aresMediaBlocks = pathOr(null, ['model', 'blocks'], blocks);
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
    const format = pathOr(null, ['model', 'format'], block);
    const type = format === 'audio' ? 'AudioObject' : 'VideoObject';

    listContent.push({
      '@type': type,
      name: pathOr(null, ['model', 'title'], block),
      description: pathOr(null, ['model', 'synopses', 'short'], block),
      duration: pathOr(null, ['model', 'versions', [0], 'duration'], block),
      thumbnailUrl: `https://${pathOr(null, ['model', 'imageUrl'], block)}`,
      uploadDate: pathOr(
        null,
        ['model', 'versions', [0], 'availableFrom'],
        block,
      ),
    });
  });

  return listContent.length > 0 ? metadata : null;
};

export default mediaPlayerMetadata;
