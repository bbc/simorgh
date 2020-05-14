import { insertBlockAfterHeadline, getNthCpsParagraphIndex } from '.';

describe('insertBlockAfterHeadline', () => {
  it('should add a target block after the headline block', () => {
    const targetBlock = {
      type: 'summary',
    };

    const blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'paragraph',
      },
    ];

    const expected = [
      {
        type: 'headline',
      },
      {
        type: 'summary',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'paragraph',
      },
    ];

    expect(insertBlockAfterHeadline(targetBlock, blocks)).toEqual(expected);
  });
});
describe('getNthCpsParagraphIndex', () => {
  it('should return the correct index for the 4th paragraph block', () => {
    const blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'image',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'unorderedList',
            },
          ],
        },
      },
      {
        type: 'image',
      },
      {
        type: 'audio',
      },
      {
        type: 'video',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'subheadline',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
    ];

    expect(getNthCpsParagraphIndex(blocks, 4)).toEqual(10);
  });
  it('should return null when there are not up to 3 paragraph block', () => {
    const blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'image',
      },
      {
        type: 'image',
      },
      {
        type: 'audio',
      },
      {
        type: 'video',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'subheadline',
      },
    ];

    expect(getNthCpsParagraphIndex(blocks, 3)).toEqual(null);
  });
  it('should return null when count or blocks is null, undefined or 0', () => {
    const blocks = [
      {
        type: 'headline',
      },
      {
        type: 'timestamp',
      },
      {
        type: 'image',
      },
      {
        type: 'image',
      },
      {
        type: 'audio',
      },
      {
        type: 'video',
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
            },
          ],
        },
      },
      {
        type: 'subheadline',
      },
    ];

    expect(getNthCpsParagraphIndex(blocks, null)).toEqual(null);
    expect(getNthCpsParagraphIndex(blocks, undefined)).toEqual(null);
    expect(getNthCpsParagraphIndex([], 8)).toEqual(null);
    expect(getNthCpsParagraphIndex(blocks, 0)).toEqual(null);
  });
});
