export const defaultIds = {
  list: 'list',
  media: 'media',
  group: 'group',
  headline: 'headline',
  paragraph: 'paragraph',
  text: 'text',
  links: 'links',
};

export const paragraphBlock = ({ id = defaultIds.paragraph } = {}) => ({
  type: 'paragraph',
  id,
  model: {
    text: 'Example Paragraph',
    blocks: [
      {
        type: 'fragment',
        model: {
          text: 'Example Paragraph',
          attributes: [],
        },
      },
    ],
  },
});

export const emptyParagraphBlock = ({ id = defaultIds.paragraph } = {}) => ({
  type: 'paragraph',
  id,
  model: {
    text: '',
    blocks: [
      {
        type: 'fragment',
        model: {
          text: '',
          attributes: [],
        },
      },
    ],
  },
});

export const unorderedListBlock = ({ id = defaultIds.list } = {}) => ({
  type: 'unorderedList',
  id,
  model: {
    blocks: [
      {
        type: 'listItem',
        model: {
          blocks: [paragraphBlock()],
        },
      },
    ],
  },
});

export const textBlock = ({
  id = defaultIds.text,
  blocks = [paragraphBlock()],
} = {}) => ({
  type: 'text',
  id,
  model: {
    blocks,
  },
});

export const headlineBlock = ({
  id = defaultIds.headline,
  blocks = [textBlock()],
} = {}) => ({
  type: 'headline',
  id,
  model: {
    blocks,
  },
});

export const promoBlock = (id = defaultIds.links) => ({
  type: 'links',
  id,
  model: {
    blocks: [
      {
        type: 'title',
        model: {
          blocks: [
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: 'Show all links (no images)',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Show all links (no images)',
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
        model: {
          locator:
            'urn:bbc:content:url-promo:https%3A%2F%2Fwww.bbc.co.uk%2Fpidgin',
          blocks: [
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'altText',
                    model: {
                      blocks: [
                        {
                          type: 'text',
                          model: {
                            blocks: [
                              {
                                type: 'paragraph',
                                model: {
                                  text: 'Image to ignore',
                                  blocks: [
                                    {
                                      type: 'fragment',
                                      model: {
                                        text: 'Image to ignore',
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
                    type: 'rawImage',
                    model: {
                      width: 976,
                      height: 549,
                      locator:
                        '37e1/test/80c445c0-5431-11ec-b75b-9f9fe566903d.jpg',
                      imageType: 'background',
                      originCode: 'cpsdevpb',
                      copyrightHolder: 'BBC',
                    },
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
                    model: {
                      text: 'Show headline',
                      blocks: [
                        {
                          type: 'urlLink',
                          model: {
                            text: 'Show headline',
                            locator: 'https://www.bbc.co.uk/pidgin',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Show headline',
                                  attributes: [],
                                },
                              },
                            ],
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
      {
        type: 'link',
        model: {
          locator:
            'urn:bbc:content:url-promo:https%3A%2F%2Fwww.bbc.com%2Fmundo',
          blocks: [
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: 'Link with Headline',
                      blocks: [
                        {
                          type: 'urlLink',
                          model: {
                            text: 'Link with Headline',
                            locator: 'https://www.bbc.com/mundo',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Link with Headline',
                                  attributes: [],
                                },
                              },
                            ],
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
      {
        type: 'link',
        model: {
          locator:
            'urn:bbc:content:url-promo:https%3A%2F%2Fwww.bbc.com%2Fbrasil',
          blocks: [
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: 'https://www.bbc.com/brasil',
                      blocks: [
                        {
                          type: 'urlLink',
                          model: {
                            text: 'https://www.bbc.com/brasil',
                            locator: 'https://www.bbc.com/brasil',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'https://www.bbc.com/brasil',
                                  attributes: [],
                                },
                              },
                            ],
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
});

export const mediaBlock = ({ id = defaultIds.media, type = 'image' } = {}) => ({
  type,
  id,
  model: {
    blocks: [
      {
        type: 'caption',
        model: {
          blocks: [textBlock()],
        },
      },
      {
        type: 'altText',
        model: {
          blocks: [textBlock()],
        },
      },
      {
        type: 'rawImage',
        model: {
          width: 800,
          height: 450,
          locator: '40a8/live/8d1da7c0-f046-11eb-a30b-49309ad24755.jpg',
          originCode: 'cpsprodpb',
          copyrightHolder: 'BBC',
          suitableForSyndication: true,
        },
      },
    ],
  },
});

export const groupBlock = ({
  id = defaultIds.group,
  intentType = 'overview',
  blocks = [textBlock({ blocks: unorderedListBlock() })],
} = {}) => ({
  type: 'group',
  id,
  model: {
    intentType,
    relationshipType: 'optional',
    blocks,
  },
});

export const buildFixture = blocks => ({
  metadata: {},
  content: {
    model: {
      blocks,
    },
  },
  promo: {},
  relatedContent: {},
});
