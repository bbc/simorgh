import deepClone from 'ramda/src/clone';
import addHeadlineBlock from '.';

const input = {
  promo: {
    headlines: {
      headline: 'i am a headline',
    },
  },
  content: {
    blocks: [
      {
        type: 'aresMedia',
      },
    ],
  },
};

describe('addHeadlineBlock', () => {
  it('should add an off screen headline block as the first block and a headline block after the aresMedia block', async () => {
    const expected = {
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
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
            type: 'offScreenHeadline',
          },
          {
            type: 'aresMedia',
          },
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
    };

    expect(addHeadlineBlock(input)).toEqual(expected);
  });

  it('should add headline block if no blocks are found', () => {
    const missingBlocks = deepClone(input);
    delete missingBlocks.content.blocks;

    const expected = {
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
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
            type: 'offScreenHeadline',
          },
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
    };

    expect(addHeadlineBlock(missingBlocks)).toEqual(expected);
  });
});
