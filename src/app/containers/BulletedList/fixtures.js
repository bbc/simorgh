export const listItemA = {
  id: 'mock-id-1',
  type: 'listItem',
  model: {
    blocks: [
      {
        id: 'mock-id-a',
        type: 'paragraph',
        model: {
          text: 'Here is a list',
          blocks: [
            {
              id: 'mock-id-i',
              type: 'fragment',
              model: {
                text: 'Here is a list',
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
};

export const listItemB = {
  id: 'mock-id-2',
  type: 'listItem',
  model: {
    blocks: [
      {
        id: 'mock-id-b',
        type: 'paragraph',
        model: {
          text: 'It is unordered',
          blocks: [
            {
              id: 'mock-id-i',
              type: 'fragment',
              model: {
                text: 'It is unordered',
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
};

export const listItemC = {
  id: 'mock-id-3',
  type: 'listItem',
  model: {
    blocks: [
      {
        id: 'mock-id-c',
        type: 'paragraph',
        model: {
          text: 'It has three list items',
          blocks: [
            {
              id: 'mock-id-i',
              type: 'fragment',
              model: {
                text: 'It has three list items',
                attributes: [],
              },
            },
          ],
        },
      },
    ],
  },
};

export const unorderedList = {
  id: 'mock-id-one',
  type: 'unorderedList',
  model: {
    blocks: [listItemA, listItemB, listItemC],
  },
};

export const orderedList = {
  id: 'mock-id-one',
  type: 'orderedList',
  model: {
    blocks: [listItemB, listItemC],
  },
};
