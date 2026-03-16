import addIdsToPost from '.';

const postFixture = {
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
                        text: 'Breaking news',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Breaking news',
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
          type: 'paragraph',
          model: {
            text: 'Breaking news',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Breaking news',
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
  urn: 'asset:2aa3edd0-abe6-4cf3-a2fe-a1a5e98aa71e',
  type: 'POST',
  options: {
    isBreakingNews: true,
  },
  dates: {
    firstPublished: '2023-05-09T16:24:16+00:00',
    lastPublished: '2023-05-09T16:24:16+00:00',
    time: null,
    curated: '2023-05-09T16:24:18.631Z',
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

jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('addIdsToSummaryContent', () => {
  it('should add ids to all blocks', () => {
    const summaryContentWithIds = addIdsToPost(postFixture);
    expect(summaryContentWithIds).toMatchInlineSnapshot(`
      {
        "content": {
          "model": {
            "blocks": [
              {
                "id": "00000000",
                "model": {
                  "blocks": [
                    {
                      "id": "00000000",
                      "model": {
                        "attributes": [],
                        "text": "Breaking news",
                      },
                      "type": "fragment",
                    },
                  ],
                  "text": "Breaking news",
                },
                "type": "paragraph",
              },
            ],
          },
        },
        "dates": {
          "curated": "2023-05-09T16:24:18.631Z",
          "firstPublished": "2023-05-09T16:24:16+00:00",
          "lastPublished": "2023-05-09T16:24:16+00:00",
          "time": null,
        },
        "descriptions": [
          {
            "source": "summary",
            "text": null,
          },
        ],
        "header": {
          "model": {
            "blocks": [
              {
                "id": "00000000",
                "model": {
                  "blocks": [
                    {
                      "id": "00000000",
                      "model": {
                        "blocks": [
                          {
                            "id": "00000000",
                            "model": {
                              "blocks": [
                                {
                                  "id": "00000000",
                                  "model": {
                                    "attributes": [],
                                    "text": "Breaking news",
                                  },
                                  "type": "fragment",
                                },
                              ],
                              "text": "Breaking news",
                            },
                            "type": "paragraph",
                          },
                        ],
                      },
                      "type": "text",
                    },
                  ],
                },
                "type": "headline",
              },
            ],
          },
        },
        "images": [
          {
            "altText": null,
            "copyright": null,
            "originalUrl": null,
            "url": null,
            "urlTemplate": null,
          },
        ],
        "link": null,
        "options": {
          "isBreakingNews": true,
        },
        "titles": [
          {
            "source": "primary",
            "title": null,
          },
        ],
        "type": "POST",
        "typeCode": null,
        "urn": "asset:2aa3edd0-abe6-4cf3-a2fe-a1a5e98aa71e",
      }
    `);
  });
});
