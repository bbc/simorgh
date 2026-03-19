export const samplePost = {
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
          type: 'paragraph',
          model: {
            text: 'Text',
            blocks: [
              {
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

export const twitterSamplePost = {
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
                        text: 'X Post (Twitter)',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'X Post (Twitter)',
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
                        text: 'X twitter post',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'X twitter post',
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
            text: 'Social - X (Twitter)',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Social - X (Twitter)',
                  attributes: ['bold'],
                },
              },
            ],
          },
        },
        {
          type: 'social',
          model: {
            source:
              'https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet',
            blocks: [
              {
                type: 'renditions',
                model: {
                  locator: '',
                  blocks: [
                    {
                      type: 'aresOEmbed',
                      model: {
                        oembed: {
                          provider_name: 'twitter',
                          url: 'https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet',
                          html: '\u003Cblockquote class="twitter-tweet"\u003E\u003Ca href=https://twitter.com/bbcnewspidgin/status/1670883488562569216?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1670883488562569216%7Ctwgr%5Ed30de9a475cd9b9a73cc4e79ef778e5655a79963%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2Fbbcnewspidgin2Fstatus2F1670883488562569216widget%3DTweet\u003EView original content on Twitter\u003C/a\u003E\u003C/blockquote\u003E',
                          indexOfType: 0,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'paragraph',
          model: {
            text: 'Social X (Twitter) 2',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Social X (Twitter) 2',
                  attributes: ['bold'],
                },
              },
            ],
          },
        },
        {
          type: 'social',
          model: {
            source:
              'https://twitter.com/bbcnewspidgin/status/1700039661874282772',
            blocks: [
              {
                type: 'renditions',
                model: {
                  locator: '',
                  blocks: [
                    {
                      type: 'aresOEmbed',
                      model: {
                        oembed: {
                          provider_name: 'twitter',
                          url: 'https://twitter.com/bbcnewspidgin/status/1700039661874282772',
                          html: '\u003Cblockquote class="twitter-tweet"\u003E\u003Ca href=https://twitter.com/bbcnewspidgin/status/1700039661874282772\u003EView original content on Twitter\u003C/a\u003E\u003C/blockquote\u003E',
                          indexOfType: 1,
                        },
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
  link: null,
  urn: 'asset:35f240a5-1fb2-4ed3-9c2a-657c4599fc0b',
  type: 'POST',
  options: {
    isBreakingNews: false,
  },
  dates: {
    firstPublished: '2023-09-08T10:07:36+00:00',
    lastPublished: '2023-09-08T10:07:36+00:00',
    time: null,
    curated: '2023-09-08T10:07:36.652Z',
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

export const videoSamplePost = {
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
                        text: 'Video',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Video',
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
                        text: 'Video player',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Video player',
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
            text: 'Video',
            blocks: [
              {
                type: 'fragment',
                model: { text: 'Video', attributes: ['bold'] },
              },
            ],
          },
        },
        {
          type: 'video',
          model: {
            locator: 'urn:bbc:pips:pid:p01thw20',
            blocks: [
              {
                type: 'clipMedia',
                model: {
                  urns: {
                    pipsPid: 'urn:bbc:pips:pid:p01thw20',
                  },
                  images: [
                    {
                      url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg',
                      urlTemplate:
                        'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg',
                      altText:
                        'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                      type: 'socialImage',
                      source: 'pipsImage',
                    },
                    {
                      url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01thw3g.jpg',
                      urlTemplate:
                        'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01thw3g.jpg',
                      altText:
                        'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                      type: 'promoImage',
                      source: 'pipsImage',
                    },
                  ],
                  assetPath: 'p01thw20',
                  type: 'video',
                  headlines: {
                    primaryHeadline:
                      "BBC launch trailer for We Know Our Place women's sport campaign",
                    seoHeadline:
                      "BBC launch trailer for We Know Our Place women's sport campaign",
                    promoHeadline:
                      "BBC launch trailer for We Know Our Place women's sport campaign",
                    socialHeadline:
                      "BBC launch trailer for We Know Our Place women's sport campaign",
                  },
                  analytics: {
                    page: {
                      name: 'programmes.av.p01thw20.page',
                      contentId: 'urn:bbc:pips:pid:p01thw20',
                      producer: 'PROGRAMMES',
                    },
                  },
                  description:
                    'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                  summary: {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                                  attributes: [],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  lastPublished: '2022-07-01T08:56:56Z',
                  firstPublished: null,
                  video: {
                    title:
                      "BBC launch trailer for We Know Our Place women's sport campaign",
                    holdingImage: {
                      altText:
                        'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                    },
                    version: {
                      duration: 'PT54S',
                      kind: 'programme',
                      guidance: null,
                      territories: ['nonuk', 'uk'],
                    },
                    isAdvertisingAllowed: true,
                    isEmbeddingAllowed: true,
                    isUnavailable: false,
                  },
                  attributions: null,
                  link: { path: '/programmes/p01thw20' },
                  section: null,
                  isSharingAllowed: true,
                },
              },
              {
                type: 'caption',
                model: {
                  blocks: [
                    {
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            type: 'paragraph',
                            model: {
                              text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
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
  link: null,
  urn: 'asset:d25690d5-6df5-4a79-9fee-5549ac8a141b',
  type: 'POST',
  options: { isBreakingNews: false },
  dates: {
    firstPublished: '2023-09-08T09:58:44+00:00',
    lastPublished: '2023-09-08T10:09:41+00:00',
    time: null,
    curated: '2023-09-08T09:58:44.896Z',
  },
  titles: [{ title: null, source: 'primary' }],
  descriptions: [{ text: null, source: 'summary' }],
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

export const audioSamplePost = {
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
                        text: 'Post with embedded audio',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Post with embedded audio',
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
            text: 'Audio',
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: 'Audio',
                  attributes: [],
                },
              },
            ],
          },
        },
        {
          type: 'audio',
          model: {
            locator: 'urn:bbc:pips:pid:p01vqk5l',
            blocks: [
              {
                type: 'clipMedia',
                model: {
                  urns: {
                    pipsPid: 'urn:bbc:pips:pid:p01vqk5l',
                  },
                  images: [
                    {
                      url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01vkjg8.png',
                      urlTemplate:
                        'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01vkjg8.png',
                      altText: 'BBC flat logo 2023 default image',
                      type: 'socialImage',
                      source: 'pipsImage',
                    },
                    {
                      url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01vkjg8.png',
                      urlTemplate:
                        'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01vkjg8.png',
                      altText: 'BBC flat logo 2023 default image',
                      type: 'promoImage',
                      source: 'pipsImage',
                    },
                  ],
                  assetPath: 'p01vqk5l',
                  type: 'audio',
                  headlines: {
                    primaryHeadline: 'a',
                    seoHeadline: 'a',
                    promoHeadline: 'a',
                    socialHeadline: 'a',
                  },
                  analytics: {
                    page: {
                      name: 'programmes.av.p01vqk5l.page',
                      contentId: 'urn:bbc:pips:pid:p01vqk5l',
                      producer: 'PROGRAMMES',
                    },
                  },
                  description: 'a',
                  summary: {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'a',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'a',
                                  attributes: [],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  lastPublished: '2023-10-10T11:48:18Z',
                  firstPublished: null,
                  video: {
                    title: 'a',
                    holdingImage: {
                      altText: 'BBC flat logo 2023 default image',
                    },
                    version: {
                      duration: 'PT27S',
                      kind: 'audio',
                      guidance: null,
                      territories: ['nonuk', 'uk'],
                    },
                    isAdvertisingAllowed: false,
                    isEmbeddingAllowed: true,
                    isUnavailable: false,
                  },
                  attributions: null,
                  link: {
                    path: '/programmes/p01vqk5l',
                  },
                  section: null,
                  isSharingAllowed: true,
                },
              },
              {
                type: 'caption',
                model: {
                  blocks: [
                    {
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            type: 'paragraph',
                            model: {
                              text: 'caption for audio',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'caption for audio',
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
  link: null,
  urn: 'asset:c40c0735-cff0-415f-95fa-b72a8f5a97a3',
  type: 'POST',
  options: {
    isBreakingNews: false,
  },
  dates: {
    firstPublished: '2023-11-17T16:30:52.000Z',
    lastPublished: '2023-12-05T15:55:18.000Z',
    time: null,
    curated: '2023-11-17T16:30:53.254Z',
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
};

export const bylineSamplePost = {
  typeCode: null,
  header: {
    model: {
      blocks: [
        {
          id: 'e10c0e32',
          type: 'headline',
          model: {
            blocks: [
              {
                id: '623789d6',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: 'e61a8ee3',
                      type: 'paragraph',
                      model: {
                        text: 'A post with contributors',
                        blocks: [
                          {
                            id: 'a2d95df7',
                            type: 'fragment',
                            model: {
                              text: 'A post with contributors',
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
          id: 'a88789fd',
          type: 'subheadline',
          model: {
            blocks: [
              {
                id: '559ef7f2',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: '87e0eb44',
                      type: 'paragraph',
                      model: {
                        text: 'This is the sub-headline',
                        blocks: [
                          {
                            id: '60de97dc',
                            type: 'fragment',
                            model: {
                              text: 'This is the sub-headline',
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
          id: '0d73cf94',
          type: 'contributor',
          model: {
            name: 'Gahuza contributor',
            link: null,
            subtitle: 'gahuza contributor',
            external: 'false',
            blocks: [
              {
                id: 'b0a50b26',
                type: 'image',
                model: {
                  blocks: [
                    {
                      id: '88183c7a',
                      type: 'rawImage',
                      model: {
                        width: 100,
                        height: 100,
                        locator:
                          '/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.jpg',
                        originCode: 'cpsdevpb',
                        copyrightHolder: 'BBC',
                      },
                    },
                    {
                      id: '3048f752',
                      type: 'altText',
                      model: {
                        blocks: [
                          {
                            id: '3d9385ab',
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  id: 'e22dcf20',
                                  type: 'paragraph',
                                  model: {
                                    text: '',
                                    blocks: [
                                      {
                                        id: '9c923ea2',
                                        type: 'fragment',
                                        model: {
                                          text: '',
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
  content: {
    model: {
      blocks: [
        {
          id: '6a3690a1',
          type: 'fragment',
          model: {
            text: '\n      ',
            attributes: [],
          },
        },
        {
          id: '6d24c155',
          type: 'paragraph',
          model: {
            text: "This is the post's body text",
            blocks: [
              {
                id: '857bec2b',
                type: 'fragment',
                model: {
                  text: "This is the post's body text",
                  attributes: [],
                },
              },
            ],
          },
        },
        {
          id: 'dca0a027',
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
  urn: 'asset:d69557ee-183e-4c79-b69a-5a04c00de8ac',
  type: 'POST',
  options: {
    isBreakingNews: false,
  },
  dates: {
    firstPublished: '2026-01-12T09:00:01.000Z',
    lastPublished: '2026-01-12T09:00:01.000Z',
    time: null,
    curated: '2026-01-12T09:00:02.378Z',
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
};

export const bylinesSamplePostWithoutImage = {
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
                        text: 'A post with contributors without an image',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'A post with contributors without an image',
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
                        text: 'This is the sub-headline',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'This is the sub-headline',
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
          type: 'contributor',
          model: {
            name: 'new contributor in test',
            link: null,
            subtitle: 'contributor',
            external: 'false',
            blocks: [],
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
            text: "This is the post's body text",
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: "This is the post's body text",
                  attributes: [],
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
  urn: 'asset:4a12e039-abaa-4556-a706-f0a6b98c64d8',
  type: 'POST',
  options: {
    isBreakingNews: false,
    includeComments: false,
  },
  dates: {
    firstPublished: '2026-03-16T16:17:28.000Z',
    lastPublished: '2026-03-16T16:17:28.000Z',
    time: null,
    curated: '2026-03-16T16:17:29.538Z',
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
};

export const bylinesSamplePostWithoutSubtitle = {
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
                        text: 'A second post with contributors',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'A second post with contributors',
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
                        text: 'This is the sub-headline',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'This is the sub-headline',
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
          type: 'contributor',
          model: {
            name: 'John Doe',
            link: 'https://google.com',
            subtitle: null,
            external: 'false',
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 100,
                        height: 100,
                        locator:
                          '/vivo/test/images/2015/1/20/d3be9c18-8975-4e20-9923-5c309c2dc00d.gif',
                        originCode: 'cpsdevpb',
                        copyrightHolder: 'BBC',
                      },
                    },
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
            text: "This is the post's body text",
            blocks: [
              {
                type: 'fragment',
                model: {
                  text: "This is the post's body text",
                  attributes: [],
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
  urn: 'asset:1f798a3d-d31b-4577-b761-101b434c81a7',
  type: 'POST',
  options: {
    isBreakingNews: false,
    includeComments: false,
  },
  dates: {
    firstPublished: '2026-03-10T14:29:15.000Z',
    lastPublished: '2026-03-16T09:40:53.000Z',
    time: null,
    curated: '2026-03-10T14:29:16.587Z',
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
};

export const bylineSamplePostWithUnsupportedImage = {
  typeCode: null,
  header: {
    model: {
      blocks: [
        {
          id: 'e10c0e32',
          type: 'headline',
          model: {
            blocks: [
              {
                id: '623789d6',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: 'e61a8ee3',
                      type: 'paragraph',
                      model: {
                        text: 'A post with contributors',
                        blocks: [
                          {
                            id: 'a2d95df7',
                            type: 'fragment',
                            model: {
                              text: 'A post with contributors',
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
          id: 'a88789fd',
          type: 'subheadline',
          model: {
            blocks: [
              {
                id: '559ef7f2',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: '87e0eb44',
                      type: 'paragraph',
                      model: {
                        text: 'This is the sub-headline',
                        blocks: [
                          {
                            id: '60de97dc',
                            type: 'fragment',
                            model: {
                              text: 'This is the sub-headline',
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
          id: '0d73cf94',
          type: 'contributor',
          model: {
            name: 'Gahuza contributor',
            link: null,
            subtitle: 'gahuza contributor',
            external: 'false',
            blocks: [
              {
                id: 'b0a50b26',
                type: 'image',
                model: {
                  blocks: [
                    {
                      id: '88183c7a',
                      type: 'rawImage',
                      model: {
                        width: 100,
                        height: 100,
                        locator:
                          '/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.svg',
                        originCode: 'cpsdevpb',
                        copyrightHolder: 'BBC',
                      },
                    },
                    {
                      id: '3048f752',
                      type: 'altText',
                      model: {
                        blocks: [
                          {
                            id: '3d9385ab',
                            type: 'text',
                            model: {
                              blocks: [
                                {
                                  id: 'e22dcf20',
                                  type: 'paragraph',
                                  model: {
                                    text: '',
                                    blocks: [
                                      {
                                        id: '9c923ea2',
                                        type: 'fragment',
                                        model: {
                                          text: '',
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
  content: {
    model: {
      blocks: [
        {
          id: '6a3690a1',
          type: 'fragment',
          model: {
            text: '\n      ',
            attributes: [],
          },
        },
        {
          id: '6d24c155',
          type: 'paragraph',
          model: {
            text: "This is the post's body text",
            blocks: [
              {
                id: '857bec2b',
                type: 'fragment',
                model: {
                  text: "This is the post's body text",
                  attributes: [],
                },
              },
            ],
          },
        },
        {
          id: 'dca0a027',
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
  urn: 'asset:d69557ee-183e-4c79-b69a-5a04c00de8ac',
  type: 'POST',
  options: {
    isBreakingNews: false,
  },
  dates: {
    firstPublished: '2026-01-12T09:00:01.000Z',
    lastPublished: '2026-01-12T09:00:01.000Z',
    time: null,
    curated: '2026-01-12T09:00:02.378Z',
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
};
