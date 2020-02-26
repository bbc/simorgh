import deepClone from 'ramda/src/clone';
import addHeadlineBlock from '.';
import {
  getVisuallyHiddenHeadlineBlock,
  getFauxHeadlineBlock,
  getHeadlineBlock,
} from './models';

const input = {
  metadata: {
    type: 'MAP',
  },
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
  describe('when on MAP asset type', () => {
    it('should add an visuallyHiddenHeadline block as the first block and an fauxHeadline block after the video block', async () => {
      const expected = {
        metadata: { type: 'MAP' },
        promo: {
          headlines: {
            headline: 'i am a headline',
          },
        },
        content: {
          model: {
            blocks: [
              getVisuallyHiddenHeadlineBlock('i am a headline'),
              {
                type: 'video',
              },
              getFauxHeadlineBlock('i am a headline'),
              {
                type: 'foobar',
              },
            ],
          },
        },
      };

      expect(addHeadlineBlock(input)).toEqual(expected);
    });

    it('should add a headline block if no video block is present', () => {
      const inputMissingVideoBlock = deepClone(input);
      inputMissingVideoBlock.content.model.blocks.splice(0, 1);

      const expected = {
        metadata: { type: 'MAP' },
        promo: { headlines: { headline: 'i am a headline' } },
        content: {
          model: {
            blocks: [
              getHeadlineBlock('i am a headline'),
              {
                type: 'foobar',
              },
            ],
          },
        },
      };

      expect(addHeadlineBlock(inputMissingVideoBlock)).toEqual(expected);
    });
  });

  describe('when on STY asset type', () => {
    it('should add a headline block if the first blocks is a video', () => {
      const styInput = deepClone(input);
      styInput.metadata.type = 'STY';

      const expected = {
        metadata: { type: 'STY' },
        promo: { headlines: { headline: 'i am a headline' } },
        content: {
          model: {
            blocks: [
              getHeadlineBlock('i am a headline'),
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

      expect(addHeadlineBlock(styInput)).toEqual(expected);
    });
  });

  it('should return json if blocks is not defined', () => {
    const inputMissingBlocks = deepClone(input);
    delete inputMissingBlocks.content.model.blocks;

    const expected = {
      metadata: { type: 'MAP' },
      promo: { headlines: { headline: 'i am a headline' } },
      content: {
        model: {},
      },
    };

    expect(addHeadlineBlock(inputMissingBlocks)).toEqual(expected);
  });
});
