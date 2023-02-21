export const contentBlockWithByline = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'name',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: 'Mary Harper',
                                    blocks: [
                                      {
                                        type: 'fragment',
                                        model: {
                                          text: 'Mary Harper',
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
                    {
                      type: 'role',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: 'Africa Editor, BBC World Service',
                                    blocks: [
                                      {
                                        type: 'fragment',
                                        model: {
                                          text: 'Africa Editor, BBC World Service',
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
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@mary_harper',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@mary_harper',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/mary_harper',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@mary_harper',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
                    {
                      type: 'location',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: 'London',
                                    blocks: [
                                      {
                                        type: 'fragment',
                                        model: {
                                          text: 'London',
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
        },
      ],
    },
  },
};

export const contentBlockWithEmptyLinkFragment = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@mary_harper',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@mary_harper',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/mary_harper',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
      ],
    },
  },
};

export const contentBlockWithMultipleBylines = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@mary_harper',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@mary_harper',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/mary_harper',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@mary_harper',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@dpenhalewick0',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@dpenhalewick0',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/dpenhalewick0',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@dpenhalewick0',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
      ],
    },
  },
};

export const contentBlockWithMultipleContributors = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@cwatters1q',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@cwatters1q',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@cwatters1q',
                                          locator:
                                            'https://twitter.com/cwatters1q',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@cwatters1q',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@rdawidsohn2k',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@rdawidsohn2k',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@rdawidsohn2k',
                                          locator:
                                            'https://twitter.com/rdawidsohn2k',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@rdawidsohn2k',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
      ],
    },
  },
};

export const contentBlockWithNoByline = {
  content: {
    model: {
      blocks: [
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'Suspendisse ornare consequat lectus.',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'Suspendisse ornare consequat lectus.',
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
};

export const contentBlockWithNoBylineLink = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'name',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: 'Mary Harper',
                                    blocks: [
                                      {
                                        type: 'fragment',
                                        model: {
                                          text: 'Mary Harper',
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
                    {
                      type: 'role',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: 'Africa Editor, BBC World Service',
                                    blocks: [
                                      {
                                        type: 'fragment',
                                        model: {
                                          text: 'Africa Editor, BBC World Service',
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
        },
      ],
    },
  },
};

export const contentBlockWithMultipleHandlePrefixes = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@mary_harper',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@mary_harper',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/mary_harper',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: '@@@@mary_harper',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
      ],
    },
  },
};

export const contentBlockWithNoHandlePrefixes = {
  content: {
    model: {
      blocks: [
        {
          type: 'byline',
          model: {
            blocks: [
              {
                type: 'contributor',
                model: {
                  blocks: [
                    {
                      type: 'link',
                      locator: 'urn:bbc:twitter:user:@mary_harper',
                      model: {
                        blocks: [
                          {
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  type: 'paragraph',
                                  model: {
                                    text: '@mary_harper',
                                    blocks: [
                                      {
                                        type: 'urlLink',
                                        model: {
                                          text: '@mary_harper',
                                          locator:
                                            'https://twitter.com/mary_harper',
                                          blocks: [
                                            {
                                              type: 'fragment',
                                              model: {
                                                text: 'mary_harper',
                                                attributes: [],
                                              },
                                            },
                                          ],
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
        },
      ],
    },
  },
};
