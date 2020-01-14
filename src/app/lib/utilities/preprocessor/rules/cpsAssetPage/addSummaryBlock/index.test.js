import deepClone from 'ramda/src/clone';
import addSummaryBlock from '.';

const input = {
  metadata: {
    type: 'PGL',
  },
  promo: {
    headlines: {
      headline: 'i am a headline',
    },
    summary: 'i am a summary',
  },
  content: {
    model: {
      blocks: [
        {
          type: 'headline',
        },
        {
          type: 'foobar',
        },
      ],
    },
  },
};

describe('addHeadlineBlock', () => {
  describe('when on PGL type', () => {
    it('should add a summary block if the first block is a headline', () => {
      const pglInput = deepClone(input);

      const expected = {
        metadata: { type: 'PGL' },
        promo: {
          headlines: { headline: 'i am a headline' },
          summary: 'i am a summary',
        },
        content: {
          model: {
            blocks: [
              {
                type: 'headline',
              },
              {
                type: 'text',
                model: expect.anything(),
              },
              {
                type: 'foobar',
              },
            ],
          },
        },
      };

      expect(addSummaryBlock(pglInput)).toEqual(expected);
    });
  });

  it('should return json if blocks is not defined', () => {
    const inputMissingBlocks = deepClone(input);
    delete inputMissingBlocks.content.model.blocks;

    const expected = {
      metadata: { type: 'PGL' },
      promo: {
        headlines: {
          headline: 'i am a headline',
        },
        summary: 'i am a summary',
      },
      content: {
        model: {},
      },
    };

    expect(addSummaryBlock(inputMissingBlocks)).toEqual(expected);
  });
});
