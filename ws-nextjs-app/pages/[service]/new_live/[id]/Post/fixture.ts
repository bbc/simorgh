const samplePost = {
  typeCode: null,
  header: {
    model: {
      blocks: [
        {
          type: 'headline',
          model: {
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'Number 3',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Number 3',
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
          type: 'subheadline',
          model: {
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'Sub',
                        blocks: [
                          {
                            id: 'ea16e578',
                            type: 'fragment',
                            model: {
                              text: 'Sub',
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
  content: {
    model: {
      blocks: [
        {
          id: '79798933',
          type: 'paragraph',
          model: {
            text: 'Text',
            blocks: [
              {
                id: '2c03e6e8',
                type: 'fragment',
                model: {
                  text: 'Text',
                  attributes: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
  link: null,
  urn: 'asset:c0166a3e-82f3-4ba2-ab47-cbf614fcbe5e',
  type: 'POST',
  options: {
    isBreakingNews: false,
  },
  titles: [
    {
      title: null,
      source: 'primary',
    },
  ],
  descriptions: [
    {
      text: null,
      source: 'summary',
    },
  ],
  images: [
    {
      url: null,
      originalUrl: null,
      urlTemplate: null,
      altText: null,
      copyright: null,
    },
  ],
};

export default samplePost;
