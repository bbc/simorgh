const fixtureData = {
  type: 'group',
  id: 'a',
  model: {
    intentType: 'overview',
    relationshipType: 'optional',
    blocks: [
      {
        type: 'text',
        id: 'b',
        model: {
          blocks: [
            {
              type: 'unorderedList',
              id: 'c',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    id: 'd',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          id: 'e',
                          model: {
                            text: 'Level 1',
                            blocks: [
                              {
                                type: 'fragment',
                                id: 'f',
                                model: {
                                  text: 'Level 1',
                                  attributes: [],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'listItem',
                    id: 'g',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          id: 'h',
                          model: {
                            text:
                              'rich text bold italic bold-italic link bold-italic-link',
                            blocks: [
                              {
                                type: 'fragment',
                                id: 'h',
                                model: {
                                  text: 'rich text ',
                                  attributes: [],
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'i',
                                model: {
                                  text: 'bold',
                                  attributes: ['bold'],
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'j',
                                model: {
                                  text: ' ',
                                  attributes: [],
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'k',
                                model: {
                                  text: 'italic',
                                  attributes: ['italic'],
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'l',
                                model: {
                                  text: ' ',
                                  attributes: [],
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'm',
                                model: {
                                  text: 'bold-italic ',
                                  attributes: ['bold', 'italic'],
                                },
                              },
                              {
                                type: 'urlLink',
                                id: 'n',
                                model: {
                                  text: 'link',
                                  blocks: [
                                    {
                                      type: 'fragment',
                                      id: 'o',
                                      model: {
                                        text: 'link',
                                        attributes: [],
                                      },
                                    },
                                  ],
                                  locator: 'https://www.google.com',
                                  isExternal: true,
                                },
                              },
                              {
                                type: 'fragment',
                                id: 'p',
                                model: {
                                  text: ' ',
                                  attributes: [],
                                },
                              },
                              {
                                type: 'urlLink',
                                id: 'q',
                                model: {
                                  text: 'bold-italic-link',
                                  blocks: [
                                    {
                                      type: 'fragment',
                                      id: 'r',
                                      model: {
                                        text: 'bold-italic-link',
                                        attributes: ['bold', 'italic'],
                                      },
                                    },
                                  ],
                                  locator: 'https://www.google.com',
                                  isExternal: true,
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

export default fixtureData;
