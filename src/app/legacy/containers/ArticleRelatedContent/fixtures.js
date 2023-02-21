export const optimoRelatedContent = [
  {
    id: '9478991a',
    type: 'link',
    model: {
      locator: 'urn:bbc:cps:curie:asset:b5c53243-a695-e059-e040-850a02846523',
      blocks: [
        {
          id: 'c18a8bfd',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'd79f587f',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: 'a9704175',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '0e6212c9',
                            type: 'paragraph',
                            model: {
                              text: 'BBC Test Image',
                              blocks: [
                                {
                                  id: 'b8148ffc',
                                  type: 'fragment',
                                  model: {
                                    text: 'BBC Test Image',
                                    attributes: [],
                                  },
                                  position: [16, 2, 1, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [16, 2, 1, 1, 1, 1],
                          },
                        ],
                      },
                      position: [16, 2, 1, 1, 1],
                    },
                  ],
                },
                position: [16, 2, 1, 1],
              },
              {
                id: '31b94c7d',
                type: 'rawImage',
                model: {
                  width: 640,
                  height: 562,
                  locator: '72c5/test/47abb9d0-5431-11ec-b75b-9f9fe566903d.png',
                  imageType: 'background',
                  originCode: 'cpsdevpb',
                  copyrightHolder: 'BBC',
                },
                position: [16, 2, 1, 2],
              },
            ],
          },
          position: [16, 2, 1],
        },
        {
          id: '77c6d902',
          type: 'text',
          model: {
            blocks: [
              {
                id: '8c22c3cc',
                type: 'paragraph',
                model: {
                  text: 'News homepage',
                  blocks: [
                    {
                      id: '59406597',
                      type: 'urlLink',
                      model: {
                        text: 'News homepage',
                        locator: 'https://www.bbc.co.uk/news',
                        blocks: [
                          {
                            id: '76350868',
                            type: 'fragment',
                            model: {
                              text: 'News homepage',
                              attributes: [],
                            },
                            position: [16, 2, 2, 1, 1, 1],
                          },
                        ],
                        isExternal: false,
                      },
                      position: [16, 2, 2, 1, 1],
                    },
                  ],
                },
                position: [16, 2, 2, 1],
              },
            ],
          },
          position: [16, 2, 2],
        },
      ],
    },
    position: [16, 2],
  },
];

export const titleBlock = {
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
                text: 'This is my title',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'This is my title',
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
};

export const relatedContentBlock = {
  type: 'relatedContent',
  model: { blocks: optimoRelatedContent },
};
export const relatedContentBlockWithTitle = {
  type: 'relatedContent',
  model: { blocks: [titleBlock, ...optimoRelatedContent] },
};

export const storyPromoContent = [
  {
    headingTag: 'div',
    id: '9478991a',
    headlines: {
      headline: 'News homepage',
    },
    locators: {
      assetUri: 'https://www.bbc.co.uk/news',
    },
    indexImage: {
      path: '/cpsdevpb/72c5/test/47abb9d0-5431-11ec-b75b-9f9fe566903d.png',
      height: 562,
      width: 999,
      altText: 'BBC Test Image',
      copyrightHolder: 'BBC',
    },
  },
];
