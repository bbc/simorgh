import { clone, path } from 'ramda';
import transformer from './convertHeadingsToSubheadings';
import realExample from '#data/japanese/mediaAssetPage/video-23248670.json';

const fixture = {
  metadata: {},
  content: {
    blocks: [
      {
        text: 'Big heading',
        markupType: 'plain_text',
        type: 'heading',
      },
      {
        text: "Don't touch me",
        markupType: 'plain_text',
        type: 'paragraph',
      },
      {
        text: 'Heading!',
        markupType: 'plain_text',
        type: 'heading',
      },
    ],
  },
};

describe('convertHeadingsToSubheadings', () => {
  it('handles basic case', () => {
    const expectedResult = clone(fixture);
    expectedResult.content.blocks[0].type = 'subheading';
    expectedResult.content.blocks[2].type = 'subheading';

    expect(transformer(fixture)).toStrictEqual(expectedResult);
  });

  it('handles real example', () => {
    const countBlocks = (payload, type) => {
      const blocks = path(['content', 'blocks'], payload);
      if (!Array.isArray(blocks)) {
        return 0;
      }

      return blocks.filter(block => block.type === type).length;
    };

    const output = transformer(realExample);

    expect(countBlocks(output, 'heading')).toBe(0);
    expect(countBlocks(output, 'subheading')).toBe(
      countBlocks(realExample, 'heading'),
    );
  });
});
