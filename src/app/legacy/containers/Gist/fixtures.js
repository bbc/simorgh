const fixtureData = [
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
                        text: 'Here is a summary of the article',
                        blocks: [
                          {
                            type: 'fragment',
                            id: 'f',
                            model: {
                              text: 'Here is a summary of the article',
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
                        text: 'This component supports text bold, italic, bold-italic, links, and bold-italic-links',
                        blocks: [
                          {
                            type: 'fragment',
                            id: 'h',
                            model: {
                              text: 'This component supports ',
                              attributes: [],
                            },
                          },
                          {
                            type: 'fragment',
                            id: 'i',
                            model: {
                              text: 'bold,',
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
                              text: 'italic,',
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
                              text: 'bold-italic, ',
                              attributes: ['bold', 'italic'],
                            },
                          },
                          {
                            type: 'urlLink',
                            id: 'n',
                            model: {
                              text: 'links,',
                              blocks: [
                                {
                                  type: 'fragment',
                                  id: 'o',
                                  model: {
                                    text: 'links,',
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
                              text: 'and bold-italic-links,',
                              blocks: [
                                {
                                  type: 'fragment',
                                  id: 'r',
                                  model: {
                                    text: 'and bold-italic-links,',
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
              {
                type: 'listItem',
                id: 's',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      id: 't',
                      model: {
                        text: 'It can be as long as editorial desires',
                        blocks: [
                          {
                            type: 'fragment',
                            id: 'u',
                            model: {
                              text: 'It can be as long as editorial desires',
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
                id: 'v',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      id: 'w',
                      model: {
                        text: 'It does not support nested lists',
                        blocks: [
                          {
                            type: 'fragment',
                            id: 'x',
                            model: {
                              text: 'It does not support nested lists',
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
                id: 'y',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      id: 'z',
                      model: {
                        text: 'If a sentence is added that is really, really, really long, the text will wrap onto the next line, which is hopefully the behaviour of this sentence right now!',
                        blocks: [
                          {
                            type: 'fragment',
                            id: 'zz',
                            model: {
                              text: 'If a sentence is added that is really, really, really long, the text will wrap onto the next line, which is hopefully the behaviour of this sentence right now!',
                              attributes: [],
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
];

export const fixtureDataOneItem = [
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
            ],
          },
        },
      ],
    },
  },
];

export default fixtureData;
