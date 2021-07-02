import path from 'ramda/src/path';
import addIndexesToSocialEmbeds from '.';

const textBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Comes estas? ',
          blocks: [
            {
              type: 'fragment',
              model: { text: 'Comes estas? ', attributes: [] },
            },
          ],
        },
      },
    ],
  },
};

const buildSocialEmbedBlock = ({ provider, url }) => ({
  type: 'social',
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              type: 'aresOEmbed',
              model: {
                oembed: {
                  provider_name: provider,
                  url,
                },
              },
            },
          ],
        },
      },
    ],
  },
});

const getOembed = path([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'oembed',
]);

it('should return enriched blocks with the first social block with "indexOfType" equal to 1', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/0516510',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToSocialEmbeds(fixture);

  expect(getOembed(enrichedArticleBlocks.content.model.blocks[0])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/0516510',
  });
});

it('should return enriched blocks with a new property "indexOfType" equal to n + 1 added to all social blocks', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          textBlock,
          textBlock,
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/151510212',
          }),
          textBlock,
          textBlock,
          textBlock,
          textBlock,
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/0215154',
          }),
          textBlock,
          textBlock,
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/020541541',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToSocialEmbeds(fixture);

  expect(getOembed(enrichedArticleBlocks.content.model.blocks[2])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/151510212',
  });
  expect(getOembed(enrichedArticleBlocks.content.model.blocks[7])).toEqual({
    indexOfType: 2,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/0215154',
  });
  expect(getOembed(enrichedArticleBlocks.content.model.blocks[10])).toEqual({
    indexOfType: 3,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/020541541',
  });
});

it('should return enriched blocks with a new property "indexOfType" equal to n + 1 added to all social blocks of any provider', () => {
  const fixture = {
    content: {
      model: {
        blocks: [
          buildSocialEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/215151531',
          }),
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/3543545',
          }),
          buildSocialEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/545561451',
          }),
          buildSocialEmbedBlock({
            provider: 'Instagram',
            url: 'https://instagram.com/bbcnews/55135135',
          }),
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/2516546541351',
          }),
          buildSocialEmbedBlock({
            provider: 'Twitter',
            url: 'https://twitter.com/bbcnews/status/354354545',
          }),
          buildSocialEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/3202151240',
          }),
          buildSocialEmbedBlock({
            provider: 'YouTube',
            url: 'https://youtube.com/watch/0021251521',
          }),
          buildSocialEmbedBlock({
            provider: 'Instagram',
            url: 'https://instagram.com/bbcnews/status/02105151',
          }),
        ],
      },
    },
  };
  const enrichedArticleBlocks = addIndexesToSocialEmbeds(fixture);
  const { blocks } = enrichedArticleBlocks.content.model;

  expect(getOembed(blocks[0])).toEqual({
    indexOfType: 1,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/215151531',
  });
  expect(getOembed(blocks[1])).toEqual({
    indexOfType: 1,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/3543545',
  });
  expect(getOembed(blocks[2])).toEqual({
    indexOfType: 2,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/545561451',
  });
  expect(getOembed(blocks[3])).toEqual({
    indexOfType: 1,
    provider_name: 'Instagram',
    url: 'https://instagram.com/bbcnews/55135135',
  });
  expect(getOembed(blocks[4])).toEqual({
    indexOfType: 2,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/2516546541351',
  });
  expect(getOembed(blocks[5])).toEqual({
    indexOfType: 3,
    provider_name: 'Twitter',
    url: 'https://twitter.com/bbcnews/status/354354545',
  });
  expect(getOembed(blocks[6])).toEqual({
    indexOfType: 3,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/3202151240',
  });
  expect(getOembed(blocks[7])).toEqual({
    indexOfType: 4,
    provider_name: 'YouTube',
    url: 'https://youtube.com/watch/0021251521',
  });
  expect(getOembed(blocks[8])).toEqual({
    indexOfType: 2,
    provider_name: 'Instagram',
    url: 'https://instagram.com/bbcnews/status/02105151',
  });
});
