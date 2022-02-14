export const edOjB = {
  id: 'mock-id-1',
  type: 'links',
  model: {
    blocks: [
      {
        id: 'mock-id-a',
        type: 'title',
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
      {
        type: 'link',
        model: {
          locator: 'mock-url-list-1',
          blocks: [
            {
              id: 'mock-id-2',
              type: 'text',
              text: 'mock-text',
            },
          ],
        },
      },
      {
        type: 'link',
        model: {
          locator: 'mock-url-list-2',
          blocks: [
            {
              id: 'mock-id-2',
              type: 'text',
              text: 'mock-text',
            },
          ],
        },
      },
    ],
  },
};

export const edOjA = {
  id: 'mock-id-1',
  type: 'links',
  model: {
    blocks: [
      {
        id: 'mock-id-a',
        type: 'title',
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
      {
        type: 'link',
        model: {
          locator: 'mock-url-list-1',
          blocks: [
            {
              id: 'mock-id-2',
              type: 'text',
              text: 'mock-text',
            },
          ],
        },
      },
    ],
  },
};
