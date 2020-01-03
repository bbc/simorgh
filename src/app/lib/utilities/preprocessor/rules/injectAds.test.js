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
            ...articleJson.content.model.blocks.slice(0, 3),
            {
              model: {
                attributes: [],
                text: '',
              },
              type: 'ad',
            },
            ...articleJson.content.model.blocks.slice(3, 8),
            {
              model: {
                attributes: [],
                text: '',
              },
              type: 'ad',
            },
            ...articleJson.content.model.blocks.slice(8),
          ],
        },
      },
    };

    const actual = injectAds(articleJson);
    expect(actual).toStrictEqual(expected);
  });
});
