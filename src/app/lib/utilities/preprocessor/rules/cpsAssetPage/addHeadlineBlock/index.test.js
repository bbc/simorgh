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
      blocks: [
        {
          type: 'video',
        },
        {
          type: 'foobar',
        },
      ],
    },
  },
};

describe('addHeadlineBlock', () => {
  it('should add an offScreenHeadline block as the first block and an onScreenHeadline block after the video block', async () => {
    const expected = {
      promo: {
        headlines: {
          headline: 'i am a headline',
        },
      },
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
              type: 'offScreenHeadline',
            },
            {
              type: 'video',
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
              type: 'onScreenHeadline',
            },
            {
              type: 'foobar',
            },
          ],
        },
      },
    };

    expect(addHeadlineBlock(input)).toEqual(expected);
  });

  it('should add an offScreenHeadline block followed by an onScreenHeadline block if no video block is present', () => {
    const inputMissingVideoBlock = deepClone(input);
    inputMissingVideoBlock.content.model.blocks.splice(0, 1);

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
              type: 'onScreenHeadline',
            },
            {
              type: 'foobar',
            },
          ],
        },
      },
    };

    expect(addHeadlineBlock(inputMissingVideoBlock)).toEqual(expected);
  });

  it('should return json if blocks is not defined', () => {
    const inputMissingBlocks = deepClone(input);
    delete inputMissingBlocks.content.model.blocks;

    const expected = {
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
        model: {},
      },
    };

    expect(addHeadlineBlock(inputMissingBlocks)).toEqual(expected);
  });
});
