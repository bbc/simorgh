import preprocess, { checkPropertiesExist } from './preprocessor';

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

describe('Preprocessor', () => {
  it('should pass data unchanged if none of the business rules apply', () => {
    const fixtureData = { foo: 'bar' };
    expect(preprocess(fixtureData)).toEqual(fixtureData);
  });

  it('should have a `checkPropertiesExist` function that works', () => {
    const fixtureData = {
      foo: 'bar',
      nestedFoo: {
        meta: 'true',
        anotherNested: {
          blocks: [],
        },
      },
    };
    // convenience function to reduce repetition
    const propsExist = properties =>
      checkPropertiesExist({
        input: fixtureData,
        properties,
      });
    expect(propsExist(['foo'])).toBe(true);
    expect(propsExist(['propertyNoExist'])).toBe(false);
    expect(propsExist(['foo', 'propertyNoExist'])).toBe(false);
    expect(propsExist(['nestedFoo.meta'])).toBe(true);
    expect(propsExist(['nestedFoo.sandwich'])).toBe(false);
    expect(propsExist(['foo', 'nestedFoo.meta'])).toBe(true);
    expect(propsExist(['nestedFoo.meta', 'nestedFoo.sandwich'])).toBe(false);
    expect(propsExist(['nestedFoo.sandwich', 'nestedFoo.meta'])).toBe(false);
    expect(propsExist(['nestedFoo.anotherNested.blocks'])).toBe(true);
    expect(propsExist(['nestedFoo.anotherNested.sandwich'])).toBe(false);
  });

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
    const expectedTransform = {
      ...fixtureData,
      ...{
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
      },
    };
    expect(preprocess(fixtureData)).toEqual(expectedTransform);
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
    const expectedTransform = {
      ...fixtureData,
      ...{
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
      },
    };
    expect(preprocess(fixtureData)).toEqual(expectedTransform);
  });
});
