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
            {
              type: 'headline',
              model: {
                ...articleJson.content.model.blocks[0].model,
              },
            },
            {
              type: 'image',
              model: {
                ...articleJson.content.model.blocks[1].model,
              },
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[0]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[1]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[2]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[3]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[4]
                        .model,
                    },
                  },
                  {
                    type: 'ad',
                    model: {
                      text: '',
                      attributes: [],
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[2].model.blocks[5]
                        .model,
                    },
                  },
                ],
              },
            },
            {
              type: 'image',
              model: {
                ...articleJson.content.model.blocks[3].model,
              },
            },
            {
              type: 'image',
              model: {
                ...articleJson.content.model.blocks[4].model,
              },
            },
            {
              type: 'text',
              model: {
                ...articleJson.content.model.blocks[5].model,
              },
            },
            {
              type: 'image',
              model: {
                ...articleJson.content.model.blocks[6].model,
              },
            },
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[7].model.blocks[0]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[7].model.blocks[1]
                        .model,
                    },
                  },
                  {
                    type: 'paragraph',
                    model: {
                      ...articleJson.content.model.blocks[7].model.blocks[2]
                        .model,
                    },
                  },
                  {
                    type: 'ad',
                    model: {
                      text: '',
                      attributes: [],
                    },
                  },
                ],
              },
            },
            {
              type: 'image',
              model: {
                ...articleJson.content.model.blocks[8].model,
              },
            },
            {
              type: 'text',
              model: {
                ...articleJson.content.model.blocks[9].model,
              },
            },
          ],
        },
      },
    };

    const actual = injectAds(articleJson);
    expect(actual).toStrictEqual(expected);
  });
});
