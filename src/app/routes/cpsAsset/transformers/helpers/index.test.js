import insertBlockAfterHeadline from '.';

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
