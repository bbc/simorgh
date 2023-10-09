export const emptyKeyPoints = {
  model: {
    blocks: [],
  },
};

export const singleKeyPoint = {
  model: {
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'I am the summary box single key point',
                            blocks: [
                              {
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
        type: 'text',
        model: {
          blocks: [
            {
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'I am the summary box',
                            blocks: [
                              {
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
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'I need to include bulletpoints',
                            blocks: [
                              {
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
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'I want to link to somebody',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'I want to ',
                                  attributes: [],
                                },
                              },
                              {
                                type: 'urlLink',
                                model: {
                                  text: 'link to somebody',
                                  blocks: [
                                    {
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
