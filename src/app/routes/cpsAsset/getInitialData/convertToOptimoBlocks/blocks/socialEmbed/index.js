import path from 'ramda/src/path';

const convertSocialEmbed = (block, pageData) => {
  const blocks = path(['content', 'blocks'], pageData);
  const socialEmbedMap = blocks.reduce((map, _block) => {
    const { type, source } = _block;
    if (type === 'social_embed') {
      const hasSource = !!map[source];
      map[source] = hasSource ? [...map[source], _block] : [_block]; // eslint-disable-line no-param-reassign
    }
    return map;
  }, {});

  const { type, source, ...rest } = block;
  const indexOfType = socialEmbedMap[source].indexOf(block);

  return {
    type,
    model: {
      blocks: [
        {
          type: source,
          indexOfType,
          model: {
            ...rest,
          },
        },
      ],
    },
  };
};

export default convertSocialEmbed;
