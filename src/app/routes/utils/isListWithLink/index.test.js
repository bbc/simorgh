import isListWithLink from '.';

const listItemWithLink = {
  type: 'listItem',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          blocks: [
            {
              type: 'urlLink',
            },
          ],
        },
      },
    ],
  },
};

const listItemWithNoLink = {
  type: 'listItem',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          blocks: [
            {
              type: 'text',
            },
          ],
        },
      },
    ],
  },
};

const listItemWithEdOjLinks = {
  model: {
    blocks: [
      {
        type: 'title',
      },
      {
        type: 'link',
        model: {
          blocks: [
            {
              locator: 'myLink',
            },
          ],
        },
      },
    ],
  },
};

const listItemWithNoEdOjLinks = {
  model: {
    blocks: [
      {
        type: 'title',
      },
    ],
  },
};

describe('isListWithLink', () => {
  it('should return true if the block group structure is an unordered list with any list item containing a link', () => {
    const blockGroup = {
      model: {
        blocks: [
          {
            model: {
              blocks: [listItemWithLink, listItemWithNoLink],
            },
            type: 'unorderedList',
          },
        ],
      },
      type: 'text',
    };
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(true);
  });

  it('should return true if the block group structure is an ordered list with any list item containing a link', () => {
    const blockGroup = {
      model: {
        blocks: [
          {
            model: {
              blocks: [listItemWithLink, listItemWithNoLink],
            },
            type: 'orderedList',
          },
        ],
      },
      type: 'text',
    };
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(true);
  });

  it('should return true if the block group structure is an editorial onward journey links with any list item containing a link', () => {
    const blockGroup = {
      ...listItemWithEdOjLinks,
      type: 'links',
    };
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(true);
  });

  it('should return false if the block group structure does not contain any editorial onward journey links', () => {
    const blockGroup = {
      ...listItemWithNoEdOjLinks,
      type: 'links',
    };
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is a list with all list items containing no link', () => {
    const blockGroup = {
      model: {
        blocks: [
          {
            model: {
              blocks: [listItemWithNoLink],
            },
            type: 'unorderedList',
          },
        ],
      },
      type: 'text',
    };
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is an empty object', () => {
    const blockGroup = {};
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is undefined', () => {
    const blockGroup = undefined;
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is null', () => {
    const blockGroup = null;
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is an array', () => {
    const blockGroup = [];
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });

  it('should return false if the block group structure is a string', () => {
    const blockGroup = '{}';
    const actual = isListWithLink(blockGroup);

    expect(actual).toEqual(false);
  });
});
