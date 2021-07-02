import path from 'ramda/src/path';

const isSocialEmbed = ({ type }) => type === 'social_embed';
const matchesSource = source => block => block.source === source;

const convertSocialEmbed = (block, pageData) => {
  const blocks = path(['content', 'blocks'], pageData);
  const { type, source, ...rest } = block;
  // source is e.g. "twitter"
  const allSocialEmbedBlocks = blocks.filter(isSocialEmbed);
  const allSocialEmbedsBySource = allSocialEmbedBlocks.filter(
    matchesSource(source),
  );
  const indexOfType = allSocialEmbedsBySource.indexOf(block);

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
