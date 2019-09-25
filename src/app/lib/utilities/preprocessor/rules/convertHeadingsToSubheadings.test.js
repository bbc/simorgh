import R from 'ramda';
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
    const expectedResult = R.clone(fixture);
    expectedResult.content.blocks[0].type = 'subheading';
    expectedResult.content.blocks[2].type = 'subheading';

    expect(transformer(fixture)).toStrictEqual(expectedResult);
  });
  it('handles real example', () => {
    const countBlocks = (payload, type) => {
      if (
        !payload ||
        !payload.content ||
        !payload.content.blocks ||
        !payload.content.blocks.filter
      ) {
        return 0;
      }

      return payload.content.blocks.filter(block => block.type === type).length;
    };

    const output = transformer(realExample);

    expect(countBlocks(output, 'heading')).toBe(0);
    expect(countBlocks(output, 'subheading')).toBe(
      countBlocks(realExample, 'heading'),
    );
  });
});
