export const emptyKeyPoints = {
  model: {
    blocks: [
      {
        id: 'b329001a',
        type: 'text',
        model: {
          blocks: [
            {
              id: '5ebffdca',
              type: 'unorderedList',
              model: {
                blocks: [],
              },
            },
          ],
        },
      },
    ],
  },
};

export const singleKeyPoint = {
  model: {
    blocks: [
      {
        id: 'b329001a',
        type: 'text',
        model: {
          blocks: [
            {
              id: '5ebffdca',
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    id: '3c096af1',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: 'a4b2ec0b',
                          type: 'paragraph',
                          model: {
                            text: 'I am the summary box single key point',
                            blocks: [
                              {
                                id: '5f43c969',
                                type: 'fragment',
                                model: {
                                  text: 'I am the summary box single key point',
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
    ],
  },
};

export const multipleKeyPoints = {
  model: {
    blocks: [
      {
        id: 'b329001a',
        type: 'text',
        model: {
          blocks: [
            {
              id: '5ebffdca',
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    id: '3c096af1',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: 'a4b2ec0b',
                          type: 'paragraph',
                          model: {
                            text: 'I am the summary box',
                            blocks: [
                              {
                                id: '5f43c969',
                                type: 'fragment',
                                model: {
                                  text: 'I am the summary box',
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
                    id: '0822012f',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '7b1cd1c0',
                          type: 'paragraph',
                          model: {
                            text: 'I need to include bulletpoints',
                            blocks: [
                              {
                                id: '60633e01',
                                type: 'fragment',
                                model: {
                                  text: 'I need to include bulletpoints',
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
                    id: '5ffdc35a',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '110c3e12',
                          type: 'paragraph',
                          model: {
                            text: 'I want to link to somebody',
                            blocks: [
                              {
                                id: '1371aa79',
                                type: 'fragment',
                                model: {
                                  text: 'I want to ',
                                  attributes: [],
                                },
                              },
                              {
                                id: 'b0c705da',
                                type: 'urlLink',
                                model: {
                                  text: 'link to somebody',
                                  blocks: [
                                    {
                                      id: '2aae7757',
                                      type: 'fragment',
                                      model: {
                                        text: 'link to somebody',
                                        attributes: [],
                                      },
                                    },
                                  ],
                                  locator: 'https://www.bbc.com/pidgin',
                                  isExternal: false,
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

export const multipleKeyPointsWithEmptyParagraph = {
  model: {
    blocks: [
      {
        id: 'b329001a',
        type: 'text',
        model: {
          blocks: [
            {
              id: '9322ebbf',
              type: 'paragraph',
              model: {
                text: '',
                blocks: [
                  {
                    id: '4083fc93',
                    type: 'fragment',
                    model: {
                      text: '',
                      attributes: [],
                    },
                  },
                ],
              },
            },
            {
              id: '5ebffdca',
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    id: '3c096af1',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: 'a4b2ec0b',
                          type: 'paragraph',
                          model: {
                            text: 'I am the summary box',
                            blocks: [
                              {
                                id: '5f43c969',
                                type: 'fragment',
                                model: {
                                  text: 'I am the summary box',
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
                    id: '0822012f',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '7b1cd1c0',
                          type: 'paragraph',
                          model: {
                            text: 'I need to include bulletpoints',
                            blocks: [
                              {
                                id: '60633e01',
                                type: 'fragment',
                                model: {
                                  text: 'I need to include bulletpoints',
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
                    id: '5ffdc35a',
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          id: '110c3e12',
                          type: 'paragraph',
                          model: {
                            text: 'I want to link to somebody',
                            blocks: [
                              {
                                id: '1371aa79',
                                type: 'fragment',
                                model: {
                                  text: 'I want to ',
                                  attributes: [],
                                },
                              },
                              {
                                id: 'b0c705da',
                                type: 'urlLink',
                                model: {
                                  text: 'link to somebody',
                                  blocks: [
                                    {
                                      id: '2aae7757',
                                      type: 'fragment',
                                      model: {
                                        text: 'link to somebody',
                                        attributes: [],
                                      },
                                    },
                                  ],
                                  locator: 'https://www.bbc.com/pidgin',
                                  isExternal: false,
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
