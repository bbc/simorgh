import deepGet from '../../helpers/json/deepGet';

const videoObject = 'VideoObject';

const videoMetadata = blocks => {
  const data = deepGet(['model', 'blocks'], blocks);
  const listContent = [];

  data.forEach(element => {
    if (element.type === 'aresMediaMetadata') {
      listContent.push({
        '@type': videoObject,
        name: deepGet(['model', 'title'], element),
        description: deepGet(['model', 'synopses', 'short'], element),
        duration: deepGet(['model', 'versions', [0], 'duration'], element),
        thumbnailUrl: `https://${deepGet(['model', 'imageUrl'], element)}`,
        uploadDate: 'TBD',
      });
    }
  });

  return {
    video: {
      '@list': listContent,
    },
  };
};

export default videoMetadata;
