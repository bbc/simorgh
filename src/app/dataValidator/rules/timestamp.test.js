import applyTimestampRules from './timestamp';
import deepClone from '../../helpers/json/deepClone';

const paragraphBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
};

const headlineBlock = {
  type: 'headline',
  model: {
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                      attributes: [],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

describe('Timestamp rules', () => {
  it('should put Timestamp block first if no headline', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastUpdated: 1514811600000,
        blockTypes: ['text', 'paragraph', 'fragment'],
      },
      content: {
        model: {
          blocks: [paragraphBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [
            {
              type: 'timestamp',
              model: {
                published: 1514808060000,
                updated: 1514811600000,
              },
            },
            paragraphBlock,
          ],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });

  it('should put Timestamp block after Headline if it exists', () => {
    const fixtureData = {
      metadata: {
        firstPublished: 1514808060000,
        lastUpdated: 1514811600000,
        blockTypes: ['headline', 'text', 'paragraph', 'fragment'],
      },
      content: {
        model: {
          blocks: [paragraphBlock, headlineBlock],
        },
      },
    };
    const expectedTransform = Object.assign(deepClone(fixtureData), {
      content: {
        model: {
          blocks: [
            paragraphBlock,
            headlineBlock,
            {
              type: 'timestamp',
              model: {
                published: 1514808060000,
                updated: 1514811600000,
              },
            },
          ],
        },
      },
    });
    expect(applyTimestampRules(fixtureData)).toEqual(expectedTransform);
  });
});
