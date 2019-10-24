import deepClone from 'ramda/src/clone';
import addHeadlineBlock from '.';

const input = {
  promo: {
    headlines: {
      headline: 'i am a headline',
    },
  },
  content: {
    model: {
      blocks: [{ foo: 'bar' }],
    },
  },
};

describe('addHeadlineBlock', () => {
  it('should add a headline block to the start if one is availible', async () => {
    const expected = {
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            blocks: [
                              {
                                model: {
                                  attributes: [],
                                  text: 'i am a headline',
                                },
                                type: 'fragment',
                              },
                            ],
                            text: 'i am a headline',
                          },
                          type: 'paragraph',
                        },
                      ],
                    },
                    type: 'text',
                  },
                ],
              },
              type: 'headline',
            },
            { foo: 'bar' },
          ],
        },
      },
    };

    expect(addHeadlineBlock(input)).toEqual(expected);
  });

  it('should add headline block if no blocks are found', () => {
    const missingBlocks = deepClone(input);
    delete missingBlocks.content.model.blocks;

    const expected = {
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
        model: {
          blocks: [
            {
              model: {
                blocks: [
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            blocks: [
                              {
                                model: {
                                  attributes: [],
                                  text: 'i am a headline',
                                },
                                type: 'fragment',
                              },
                            ],
                            text: 'i am a headline',
                          },
                          type: 'paragraph',
                        },
                      ],
                    },
                    type: 'text',
                  },
                ],
              },
              type: 'headline',
            },
          ],
        },
      },
    };

    expect(addHeadlineBlock(missingBlocks)).toEqual(expected);
  });

  it('should do nothing if no headline is availible', () => {
    const missingHeadline = deepClone(input);
    delete missingHeadline.promo.headlines.headline;

    expect(addHeadlineBlock(missingHeadline)).toEqual(missingHeadline);
  });
});
