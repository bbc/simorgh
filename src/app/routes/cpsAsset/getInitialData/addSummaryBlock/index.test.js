import deepClone from 'ramda/src/clone';
import addSummaryBlock from '.';

const pglInput = {
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

const mapInput = {
  metadata: {
    type: 'MAP',
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
          type: 'video',
        },
        {
          type: 'foobar',
        },
      ],
    },
  },
};

describe('addSummaryBlock', () => {
  describe('when on PGL type', () => {
    it('should add a summary block if the first block is a headline', () => {
      const input = deepClone(pglInput);

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

      expect(addSummaryBlock(input)).toEqual(expected);
    });
  });

  it('should return json if blocks is not defined', () => {
    const inputMissingBlocks = deepClone(pglInput);
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

  it('should return unchanged json for a non-PGL asset', () => {
    const input = deepClone(mapInput);

    expect(addSummaryBlock(input)).toEqual(mapInput);
  });
});
