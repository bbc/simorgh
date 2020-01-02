import articleJson from '#data/news/articles/c0g992jmmkko.json';
import injectAds from './injectAds';

describe('injectAds rule', () => {
  it('should inject ads', () => {
    const expected = {
      ...articleJson,
      content: {
        ...articleJson.content,
        model: {
          ...articleJson.content.model,
          blocks: [
            articleJson.content.model.blocks[0],
            articleJson.content.model.blocks[1],
            {
              model: {
                blocks: [
                  ...articleJson.content.model.blocks[2].model.blocks.slice(
                    0,
                    5,
                  ),
                  {
                    model: {
                      attributes: [],
                      text: '',
                    },
                    type: 'ad',
                  },
                  articleJson.content.model.blocks[2].model.blocks[5],
                ],
              },
              type: 'text',
            },
            articleJson.content.model.blocks[3],
            articleJson.content.model.blocks[4],
            articleJson.content.model.blocks[5],
            articleJson.content.model.blocks[6],
            {
              model: {
                blocks: [
                  ...articleJson.content.model.blocks[7].model.blocks.slice(
                    0,
                    3,
                  ),
                  {
                    model: {
                      attributes: [],
                      text: '',
                    },
                    type: 'ad',
                  },
                ],
              },
              type: 'text',
            },
            articleJson.content.model.blocks[8],
            articleJson.content.model.blocks[9],
          ],
        },
      },
      metadata: {
        ...articleJson.metadata,
        blockTypes: [...articleJson.metadata.blockTypes, 'ad'],
      },
    };

    const actual = injectAds(articleJson);
    expect(actual).toStrictEqual(expected);
  });
});
