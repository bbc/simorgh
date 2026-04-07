export default {
  data: {
    results: [
      {
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
                              text: 'Post with Flourish story',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'Post with Flourish story',
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
                type: 'fragment',
                model: {
                  text: '\n      ',
                  attributes: [],
                },
              },
              {
                type: 'paragraph',
                model: {
                  text: '',
                  blocks: [
                    {
                      type: 'flourishEmbed',
                      model: {
                        locator: 'urn:flourish:embed:story:3577809',
                        provider: 'flourish-story',
                        attributes: ['story'],
                      },
                    },
                  ],
                },
              },
              {
                type: 'fragment',
                model: {
                  text: '\n    ',
                  attributes: [],
                },
              },
            ],
          },
        },
        link: null,
        urn: 'asset:d3c85250-8d80-4aeb-add4-4ad85eb4b856',
        type: 'POST',
        options: {
          isBreakingNews: false,
          includeComments: false,
        },
        dates: {
          firstPublished: '2026-02-06T12:01:32.000Z',
          lastPublished: '2026-02-06T12:01:32.000Z',
          time: null,
          curated: '2026-02-06T12:01:33.939Z',
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
            originalUrl: null,
            altText: null,
            copyright: null,
            urlTemplate: null,
            url: null,
          },
        ],
      },
    ],
    page: {
      index: 1,
      total: 1,
    },
  },
};
