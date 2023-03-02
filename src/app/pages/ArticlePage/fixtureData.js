import {
  blockContainingText,
  bylineBlock,
  singleTextBlock,
  textBlock,
} from '#models/blocks';

const blocksWithHeadlineAndText = blockValues => {
  const [headlineText, paragraphText] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    singleTextBlock(paragraphText, 2),
    {
      id: 'ef3a6bbd',
      type: 'wsoj',
      model: {
        type: 'recommendations',
      },
      position: [9],
    },
  ];
};

const blocksWithHeadlineTexAndByline = blockValues => {
  const [headlineText, paragraphText, twitterHandle] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    bylineBlock(twitterHandle, 2),
    singleTextBlock(paragraphText, 3),
  ];
};

const articleDataBuilder = (
  id,
  createdBy,
  passportLanguage,
  home,
  blockValues,
  seoHeadline,
  promoHeadline,
  summary,
  things,
  allowAdvertising = false,
  articleBlocksPopulator = blocksWithHeadlineAndText,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    analyticsLabels: {
      contentId: 'urn:bbc:optimo:c0000000001o',
    },
    type: 'article',
    createdBy,
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514815200000,
    passport: {
      language: passportLanguage,
      home,
      category: 'news',
      genre: null,
    },
    tags: things,
    allowAdvertising,
  },
  content: {
    model: {
      blocks: articleBlocksPopulator(blockValues),
    },
  },
  promo: {
    id: `urn:bbc:ares::article:${id}`,
    headlines: {
      seoHeadline,
      promoHeadline,
    },
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    summary: textBlock(summary),
    timestamp: 1514811600000,
  },
});

const presetThings = {
  about: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
      topicId: 'cpwpy79d6dxt',
      topicName: 'Royal Wedding 2018',
      curationType: ['vivo-stream'],
      thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
      thingLabel: 'Royal Wedding 2018',
      thingEnglishLabel: 'Royal Wedding 2018',
      thingType: ['Thing', 'Event'],
      thingSameAs: [
        'http://dbpedia.org/resource/Queen_Victoria',
        'http://rdf.freebase.com/ns/m.0cw10',
      ],
    },
    {
      thingUri:
        'http://www.bbc.co.uk/things/803eaeb9-c0c3-4f1b-9a66-90efac3df2dc#id',
      topicId: 'cg3mq45zq4xt',
      topicName: 'Duchess of Sussex',
      curationType: ['vivo-stream'],
      thingId: '803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
      thingLabel: 'Duchess of Sussex',
      thingEnglishLabel: 'Duchess of Sussex',
      thingType: ['Person'],
      thingSameAs: [],
    },
  ],
  mentions: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/1efbf3e5-b330-49a1-b531-b507ab027c96#id',
      thingId: '1efbf3e5-b330-49a1-b531-b507ab027c96',
      thingLabel: 'Queen Victoria',
      thingEnglishLabel: 'Queen Victoria',
      thingType: ['Person', 'Thing'],
    },
  ],
};

const emptyThings = {
  about: null,
  mentions: null,
};

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'News',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  ['Article Headline', 'A paragraph.'],
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
  presetThings,
);

export const articleDataPersian = articleDataBuilder(
  'c4vlle3q337o',
  'Persian',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  ['سرصفحه مقاله', 'یک پاراگراف.'],
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
  emptyThings,
);

export const articleDataPidgin = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
);

export const articleDataPidginWithAds = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
  true,
);

export const articleDataPidginWithByline = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.', 'mary_harper'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
  undefined,
  blocksWithHeadlineTexAndByline,
);

export const bylineWithNoRole = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '/news/topics/c8qx38nq177t',
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
                        text: 'Single Byline (all values)',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Single Byline (all values)',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'test',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'test',
                              locator: 'https://twitter.com/test',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'test',
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
        {
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png',
                        originCode: 'cpsprodpb',
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

export const bylineWithNoAuthor = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '',
      blocks: [
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
                        text: 'Test',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Test',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'test',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'test',
                              locator: 'https://twitter.com/test',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'test',
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
        {
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png',
                        originCode: 'cpsprodpb',
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

export const bylineWithNoAuthorAndRole = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '',
      blocks: [
        {
          type: 'link',
          model: {
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'test',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'test',
                              locator: 'https://twitter.com/test',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'test',
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
        {
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png',
                        originCode: 'cpsprodpb',
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

export const bylineWithNameAndRole = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '',
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
                        text: 'Single Byline (all values)',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Single Byline (all values)',
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
                        text: 'Test',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Test',
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

export const bylineWithLink = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '/news/topics/c8qx38nq177t',
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
                        text: 'Single Byline (all values)',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Single Byline (all values)',
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
                        text: 'Test',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Test',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'test',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'test',
                              locator: 'https://twitter.com/test',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'test',
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
];

export const bylineWithLinkAndLocation = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '',
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
                        text: 'Single Byline (all values)',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Single Byline (all values)',
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
                        text: 'Test',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Test',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'test',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'test',
                              locator: 'https://twitter.com/test',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'test',
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
];

export const bylineWithNonPngPhoto = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '',
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
                        text: 'Clark Kent',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Clark Kent',
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
                        text: 'Journalist',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Journalist',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'superman',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'superman',
                              locator: 'https://twitter.com/Superman',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'superman',
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
                        text: 'Metropolis, US',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Metropolis, US',
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
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'https://scarletjourney.rutgers.edu/crm/wp-content/uploads/sites/393/2017/12/christopher-reeve-superman.jpg',
                        originCode: 'cpsdevpb',
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

export const bylineWithPngPhoto = [
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
                        text: 'Mayeni Jones',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Mayeni Jones',
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
                        text: 'Journalist',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Journalist',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'MayeniJones',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'MayeniJones',
                              locator: 'https://twitter.com/MayeniJones',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'MayeniJones',
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
                        text: 'Lagos, Nigeria',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Lagos, Nigeria',
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
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png',
                        originCode: 'cpsprodpb',
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

export const bylineWithAllData = [
  {
    type: 'contributor',
    model: {
      topicId: '',
      topicUrl: '/news/topics/c8qx38nq177t',
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
                        text: 'Mayeni Jones',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Mayeni Jones',
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
                        text: 'Journalist',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Journalist',
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
            blocks: [
              {
                type: 'text',
                model: {
                  blocks: [
                    {
                      type: 'paragraph',
                      model: {
                        text: 'MayeniJones',
                        blocks: [
                          {
                            type: 'urlLink',
                            model: {
                              text: 'MayeniJones',
                              locator: 'https://twitter.com/MayeniJones',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text: 'MayeniJones',
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
                        text: 'Lagos, Nigeria',
                        blocks: [
                          {
                            type: 'fragment',
                            model: {
                              text: 'Lagos, Nigeria',
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
          type: 'images',
          model: {
            blocks: [
              {
                type: 'image',
                model: {
                  blocks: [
                    {
                      type: 'rawImage',
                      model: {
                        width: 640,
                        height: 562,
                        locator:
                          'f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png',
                        originCode: 'cpsprodpb',
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

export const sampleRecommendations = [
  {
    locators: {
      optimoUrn: 'urn:bbc:optimo:asset:sample_1',
      canonicalUrl: 'https://www.bbc.com/turkce/articles/sample_1',
    },
    timestamp: 1673623343213,
    language: 'tr',
    headlines: {
      promoHeadline: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: 'SAMPLE RECOMMENDATION 1 - HEADLINE',
                    blocks: [
                      {
                        type: 'fragment',
                        model: {
                          text: 'SAMPLE RECOMMENDATION 1 - HEADLINE',
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
    images: {
      defaultPromoImage: {
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
                          text: 'SAMPLE RECOMMENDATION 1',
                          blocks: [
                            {
                              type: 'fragment',
                              model: {
                                text: 'SAMPLE RECOMMENDATION 1',
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
              width: 1024,
              height: 576,
              locator: '536b/live/62a1ce50-92c4-11ed-af5e-49f6c6402e4d.jpg',
              originCode: 'cpsprodpb',
              copyrightHolder: 'Getty Images',
              suitableForSyndication: true,
            },
          },
        ],
      },
    },
    summary: {
      blocks: [
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'SAMPLE RECOMMENDATION 1 - IMAGE TEXT',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'SAMPLE RECOMMENDATION 1 - IMAGE TEXT',
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
    id: 'urn:bbc:ares::article:sample_1',
    type: 'optimo',
  },
  {
    locators: {
      optimoUrn: 'urn:bbc:optimo:asset:sample_2',
      canonicalUrl: 'https://www.bbc.com/turkce/articles/sample_2',
    },
    timestamp: 1673623343213,
    language: 'tr',
    headlines: {
      promoHeadline: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: 'SAMPLE RECOMMENDATION 2 - HEADLINE',
                    blocks: [
                      {
                        type: 'fragment',
                        model: {
                          text: 'SAMPLE RECOMMENDATION 2 - HEADLINE',
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
    images: {
      defaultPromoImage: {
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
                          text: 'SAMPLE RECOMMENDATION 2',
                          blocks: [
                            {
                              type: 'fragment',
                              model: {
                                text: 'SAMPLE RECOMMENDATION 2',
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
              width: 1024,
              height: 576,
              locator: '536b/live/62a1ce50-92c4-11ed-af5e-49f6c6402e4d.jpg',
              originCode: 'cpsprodpb',
              copyrightHolder: 'Getty Images',
              suitableForSyndication: true,
            },
          },
        ],
      },
    },
    summary: {
      blocks: [
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'SAMPLE RECOMMENDATION 2 - IMAGE TEXT',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'SAMPLE RECOMMENDATION 2 - IMAGE TEXT',
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
    id: 'urn:bbc:ares::article:sample_2',
    type: 'optimo',
  },
];

export const samplePageData = {
  content: {
    model: {
      blocks: [
        {
          id: '86e5ef99',
          model: {
            blocks: [
              {
                id: 'fd2f27cc',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: '719bcd14',
                      type: 'paragraph',
                      model: {
                        text: '3 perguntas que a PF deve fazer a Bolsonaro em inquérito após denúncias de Sergio Moro',
                        blocks: [
                          {
                            id: 'dd23c121',
                            type: 'fragment',
                            model: {
                              text: '3 perguntas que a PF deve fazer a Bolsonaro em inquérito após denúncias de Sergio Moro',
                              attributes: [],
                            },
                            position: [1, 1, 1, 1],
                          },
                        ],
                      },
                      position: [1, 1, 1],
                    },
                  ],
                },
                position: [1, 1],
              },
            ],
          },
          type: 'headline',
          position: [1],
        },
        {
          id: 'b4a5871f',
          type: 'timestamp',
          model: {
            firstPublished: 1600370390000,
            lastPublished: 1600370390000,
          },
          position: [2],
        },
        {
          id: '8f86ad3e',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'e9e4ef37',
                type: 'caption',
                model: {
                  blocks: [
                    {
                      id: 'dadc2355',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: 'e1d7b65d',
                            type: 'paragraph',
                            model: {
                              text: 'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
                              blocks: [
                                {
                                  id: '1f178a0f',
                                  type: 'fragment',
                                  model: {
                                    text: 'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
                                    attributes: [],
                                  },
                                  position: [3, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [3, 1, 1, 1],
                          },
                        ],
                      },
                      position: [3, 1, 1],
                    },
                  ],
                },
                position: [3, 1],
              },
              {
                id: '00f12737',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: 'c3d93580',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '157f2805',
                            type: 'paragraph',
                            model: {
                              text: 'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
                              blocks: [
                                {
                                  id: '1fa5d43e',
                                  type: 'fragment',
                                  model: {
                                    text: 'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
                                    attributes: [],
                                  },
                                  position: [3, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [3, 2, 1, 1],
                          },
                        ],
                      },
                      position: [3, 2, 1],
                    },
                  ],
                },
                position: [3, 2],
              },
              {
                id: 'db5dc3f0',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'AFP',
                  height: 549,
                  locator: '3B73/production/_112291251_whatsubject.jpg',
                  originCode: 'cpsprodpb',
                  width: 976,
                },
                position: [3, 3],
              },
            ],
          },
          position: [3],
        },
        {
          id: '02ee46f6',
          type: 'text',
          model: {
            blocks: [
              {
                id: '5ae54d84',
                type: 'paragraph',
                model: {
                  text: 'O presidente Jair Bolsonaro foi intimado a depor à Polícia Federal (PF) em inquérito sobre as acusações de interferência na própria organização feitas pelo então ministro Sergio Moro (Justiça), no fim de abril deste ano. ',
                  blocks: [
                    {
                      id: 'b685b4cc',
                      type: 'fragment',
                      model: {
                        text: 'O presidente Jair Bolsonaro foi intimado a depor à Polícia Federal (PF) em inquérito sobre as acusações de interferência na própria organização feitas pelo então ministro Sergio Moro (Justiça), no fim de abril deste ano. ',
                        attributes: ['bold'],
                      },
                      position: [4, 1, 1],
                    },
                  ],
                },
                position: [4, 1],
              },
            ],
          },
          position: [4],
        },
        {
          id: '766f6486',
          type: 'text',
          model: {
            blocks: [
              {
                id: '285e9125',
                type: 'paragraph',
                model: {
                  text: 'Ao deixar o cargo, Moro acusou Bolsonaro de querer trocar o diretor-geral da Polícia Federal, Maurício Valeixo, para proteger seus familiares e aliados de investigações. Uma delas seria o "inquérito das fake news" no Supremo Tribunal Federal (STF), que investiga ataques a ministros da Corte e atingiu mais de dez bolsonaristas.',
                  blocks: [
                    {
                      id: 'cc53b0db',
                      type: 'fragment',
                      model: {
                        text: 'Ao deixar o cargo, Moro acusou Bolsonaro de querer trocar o diretor-geral da Polícia Federal, Maurício Valeixo, para proteger seus familiares e aliados de investigações. Uma delas seria o "inquérito das fake news" no Supremo Tribunal Federal (STF), que investiga ataques a ministros da Corte e atingiu mais de dez bolsonaristas.',
                        attributes: [],
                      },
                      position: [5, 1, 1],
                    },
                  ],
                },
                position: [5, 1],
              },
            ],
          },
          position: [5],
        },
        {
          id: 'e3c644f0',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'fee391d6',
                type: 'paragraph',
                model: {
                  text: 'Em paralelo, há uma disputa sobre o formato do depoimento do presidente à PF nos próximos dias, se ele será feito pessoalmente ou por escrito. ',
                  blocks: [
                    {
                      id: 'eb92000e',
                      type: 'fragment',
                      model: {
                        text: 'Em paralelo, há uma disputa sobre o formato do depoimento do presidente à PF nos próximos dias, se ele será feito pessoalmente ou por escrito. ',
                        attributes: [],
                      },
                      position: [6, 1, 1],
                    },
                  ],
                },
                position: [6, 1],
              },
            ],
          },
          position: [6],
        },
        {
          id: '70c6fec9',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'adb54e44',
                type: 'paragraph',
                model: {
                  text: 'O relator do caso, o ministro Celso de Mello, determinou que fosse presencial, mas a Advocacia-Geral da União recorreu e teve seu pedido acatado pelo ministro Marco Aurélio de Mello. Ele determinou que o formato do depoimento deverá ser decidido pelo Plenário da Corte e, até lá, o inquérito fica suspenso.  ',
                  blocks: [
                    {
                      id: '03f73ce9',
                      type: 'fragment',
                      model: {
                        text: 'O relator do caso, o ministro Celso de Mello, determinou que fosse presencial, mas a Advocacia-Geral da União recorreu e teve seu pedido acatado pelo ministro Marco Aurélio de Mello. Ele determinou que o formato do depoimento deverá ser decidido pelo Plenário da Corte e, até lá, o inquérito fica suspenso.  ',
                        attributes: [],
                      },
                      position: [7, 1, 1],
                    },
                  ],
                },
                position: [7, 1],
              },
            ],
          },
          position: [7],
        },
        { id: '7345082b', type: 'mpu', model: {}, position: [8] },
        {
          id: '8f30b245',
          type: 'text',
          model: {
            blocks: [
              {
                id: '42e8acd1',
                type: 'paragraph',
                model: {
                  text: 'Historicamente, a regra sempre foi o depoimento presencial dos investigados, inclusive de presidentes da República. Mas em 2017, o ministro Edson Fachin abriu uma exceção para Michel Temer.',
                  blocks: [
                    {
                      id: 'afd64c92',
                      type: 'fragment',
                      model: {
                        text: 'Historicamente, a regra sempre foi o depoimento presencial dos investigados, inclusive de presidentes da República. Mas em 2017, o ministro Edson Fachin abriu uma exceção para Michel Temer.',
                        attributes: [],
                      },
                      position: [9, 1, 1],
                    },
                  ],
                },
                position: [9, 1],
              },
            ],
          },
          position: [9],
        },
        {
          id: 'd1e530c8',
          type: 'wsoj',
          model: {
            type: 'recommendations',
            path: '/api/recommend?recSys=2&limit=4&assetUri=/portuguese/brasil-54196636',
          },
          position: [10],
        },
        {
          id: '5ab60659',
          type: 'text',
          model: {
            blocks: [
              {
                id: '7b93195d',
                type: 'paragraph',
                model: {
                  text: 'Já no caso de Bolsonaro, Celso de Mello entendeu que era importante dar aos advogados de Moro o direito de questionar o presidente — o ex-juiz da Lava Jato também é investigado no inquérito.',
                  blocks: [
                    {
                      id: 'e6474521',
                      type: 'fragment',
                      model: {
                        text: 'Já no caso de Bolsonaro, Celso de Mello entendeu que era importante dar aos advogados de Moro o direito de questionar o presidente — o ex-juiz da Lava Jato também é investigado no inquérito.',
                        attributes: [],
                      },
                      position: [11, 1, 1],
                    },
                  ],
                },
                position: [11, 1],
              },
            ],
          },
          position: [11],
        },
        {
          id: 'a9b4d428',
          type: 'text',
          model: {
            blocks: [
              {
                id: '3f0f0634',
                type: 'paragraph',
                model: {
                  text: 'De todo modo, há pelo menos três perguntas centrais que a PF deve fazer a Bolsonaro no depoimento, na mesma linha do que foi questionado a outras autoridades ouvidas na investigação.',
                  blocks: [
                    {
                      id: '5d63052f',
                      type: 'fragment',
                      model: {
                        text: 'De todo modo, há pelo menos três perguntas centrais que a PF deve fazer a Bolsonaro no depoimento, na mesma linha do que foi questionado a outras autoridades ouvidas na investigação.',
                        attributes: [],
                      },
                      position: [12, 1, 1],
                    },
                  ],
                },
                position: [12, 1],
              },
            ],
          },
          position: [12],
        },
        {
          id: 'e4184928',
          type: 'text',
          model: {
            blocks: [
              {
                id: '9363a6b8',
                type: 'paragraph',
                model: {
                  text: 'A Procuradoria-Geral da República, que pediu a investigação, apura os possíveis crimes de "falsidade ideológica, coação no curso do processo, advocacia administrativa, prevaricação, obstrução de justiça, corrupção passiva privilegiada, denunciação caluniosa e crime contra a honra", que podem ter sido cometidos por Bolsonaro ou por Moro, neste caso se as acusações não se mostrarem verdadeiras.',
                  blocks: [
                    {
                      id: '0d034a17',
                      type: 'fragment',
                      model: {
                        text: 'A Procuradoria-Geral da República, que pediu a investigação, apura os possíveis crimes de "falsidade ideológica, coação no curso do processo, advocacia administrativa, prevaricação, obstrução de justiça, corrupção passiva privilegiada, denunciação caluniosa e crime contra a honra", que podem ter sido cometidos por Bolsonaro ou por Moro, neste caso se as acusações não se mostrarem verdadeiras.',
                        attributes: [],
                      },
                      position: [13, 1, 1],
                    },
                  ],
                },
                position: [13, 1],
              },
            ],
          },
          position: [13],
        },
        {
          id: 'f1cd1587',
          type: 'subheadline',
          model: {
            blocks: [
              {
                id: 'a9016fdf',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: '3797564d',
                      type: 'paragraph',
                      model: {
                        text: '1. Por que Bolsonaro queria trocar o diretor-geral da PF e o superintendente do órgão no Rio de Janeiro? Era para proteger familiares e aliados?',
                        blocks: [
                          {
                            id: '3c69aac7',
                            type: 'fragment',
                            model: {
                              text: '1. Por que Bolsonaro queria trocar o diretor-geral da PF e o superintendente do órgão no Rio de Janeiro? Era para proteger familiares e aliados?',
                              attributes: [],
                            },
                            position: [14, 1, 1, 1],
                          },
                        ],
                      },
                      position: [14, 1, 1],
                    },
                  ],
                },
                position: [14, 1],
              },
            ],
          },
          position: [14],
        },
        {
          id: 'a3727f10',
          type: 'text',
          model: {
            blocks: [
              {
                id: '9e640e43',
                type: 'paragraph',
                model: {
                  text: 'O principal ponto da acusação de Moro é a decisão de Bolsonaro de trocar o comando da PF no Rio de Janeiro e o diretor-geral do órgão, Maurício Valeixo. ',
                  blocks: [
                    {
                      id: '582f05ad',
                      type: 'fragment',
                      model: {
                        text: 'O principal ponto da acusação de Moro é a decisão de Bolsonaro de trocar o comando da PF no Rio de Janeiro e o diretor-geral do órgão, Maurício Valeixo. ',
                        attributes: [],
                      },
                      position: [15, 1, 1],
                    },
                  ],
                },
                position: [15, 1],
              },
            ],
          },
          position: [15],
        },
        {
          id: '4e65fec2',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'a76c39f4',
                type: 'paragraph',
                model: {
                  text: 'Moro afirmou que o presidente vinha lhe pressionando para trocar o superintendente fluminense e o diretor-geral sem apresentar justificativas convincentes.',
                  blocks: [
                    {
                      id: '1f0faedf',
                      type: 'fragment',
                      model: {
                        text: 'Moro afirmou que o presidente vinha lhe pressionando para trocar o superintendente fluminense e o diretor-geral sem apresentar justificativas convincentes.',
                        attributes: [],
                      },
                      position: [16, 1, 1],
                    },
                  ],
                },
                position: [16, 1],
              },
            ],
          },
          position: [16],
        },
        {
          id: '900feb9b',
          type: 'image',
          model: {
            blocks: [
              {
                id: '8abf0097',
                type: 'caption',
                model: {
                  blocks: [
                    {
                      id: '0cab91c2',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '31341aac',
                            type: 'paragraph',
                            model: {
                              text: 'O presidente disse que tem a prerrogativa legal de trocar o comando da PF',
                              blocks: [
                                {
                                  id: '3d047498',
                                  type: 'fragment',
                                  model: {
                                    text: 'O presidente disse que tem a prerrogativa legal de trocar o comando da PF',
                                    attributes: [],
                                  },
                                  position: [17, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [17, 1, 1, 1],
                          },
                        ],
                      },
                      position: [17, 1, 1],
                    },
                  ],
                },
                position: [17, 1],
              },
              {
                id: '85119056',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: 'b4411db0',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '2fcc927e',
                            type: 'paragraph',
                            model: {
                              text: 'Jair Bolsonaro faz pronunciamento',
                              blocks: [
                                {
                                  id: 'd8d0d73e',
                                  type: 'fragment',
                                  model: {
                                    text: 'Jair Bolsonaro faz pronunciamento',
                                    attributes: [],
                                  },
                                  position: [17, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [17, 2, 1, 1],
                          },
                        ],
                      },
                      position: [17, 2, 1],
                    },
                  ],
                },
                position: [17, 2],
              },
              {
                id: 'fef9517e',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'Reuters',
                  height: 549,
                  locator:
                    '1471F/production/_111934738_2456f983-f9f6-4168-b397-7d0c1d9ec37f.jpg',
                  originCode: 'cpsprodpb',
                  width: 976,
                },
                position: [17, 3],
              },
            ],
          },
          position: [17],
        },
        {
          id: '6bdcf1f3',
          type: 'podcastPromo',
          model: {},
          position: [18],
        },
        {
          id: '90169fd5',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'e443209a',
                type: 'paragraph',
                model: {
                  text: 'Bolsonaro já havia criado uma crise interna na PF em agosto de 2019, quando decidiu trocar o então superintendente fluminense, Ricardo Saadi, por problemas não detalhados de "gestão e produtividade". ',
                  blocks: [
                    {
                      id: '839df37f',
                      type: 'fragment',
                      model: {
                        text: 'Bolsonaro já havia criado uma crise interna na PF em agosto de 2019, quando decidiu trocar o então superintendente fluminense, Ricardo Saadi, por problemas não detalhados de "gestão e produtividade". ',
                        attributes: [],
                      },
                      position: [19, 1, 1],
                    },
                  ],
                },
                position: [19, 1],
              },
            ],
          },
          position: [19],
        },
        {
          id: '37c31d32',
          type: 'text',
          model: {
            blocks: [
              {
                id: '2996a38b',
                type: 'paragraph',
                model: {
                  text: 'Deu-se início então a uma queda de braço entre o presidente e o diretor-geral, Valeixo, que acabaria escolhendo um novo chefe da PF no Rio ligado a ele, e não a Bolsonaro. ',
                  blocks: [
                    {
                      id: 'dba5962c',
                      type: 'fragment',
                      model: {
                        text: 'Deu-se início então a uma queda de braço entre o presidente e o diretor-geral, Valeixo, que acabaria escolhendo um novo chefe da PF no Rio ligado a ele, e não a Bolsonaro. ',
                        attributes: [],
                      },
                      position: [20, 1, 1],
                    },
                  ],
                },
                position: [20, 1],
              },
            ],
          },
          position: [20],
        },
        {
          id: '0a0ad8e9',
          type: 'text',
          model: {
            blocks: [
              {
                id: '1b6ffdb9',
                type: 'paragraph',
                model: {
                  text: 'Essa troca irritou o presidente. "Onze (superintendentes) foram trocados e ninguém falou nada. Sugiro o cara de um Estado para ir para lá: \'Está interferindo\'. Espera aí. Se eu não posso trocar o superintendente, eu vou trocar o diretor-geral", disse Bolsonaro naquele mesmo agosto de 2019. ',
                  blocks: [
                    {
                      id: 'e51a82be',
                      type: 'fragment',
                      model: {
                        text: 'Essa troca irritou o presidente. "Onze (superintendentes) foram trocados e ninguém falou nada. Sugiro o cara de um Estado para ir para lá: \'Está interferindo\'. Espera aí. Se eu não posso trocar o superintendente, eu vou trocar o diretor-geral", disse Bolsonaro naquele mesmo agosto de 2019. ',
                        attributes: [],
                      },
                      position: [21, 1, 1],
                    },
                  ],
                },
                position: [21, 1],
              },
            ],
          },
          position: [21],
        },
        {
          id: 'db3c758a',
          type: 'text',
          model: {
            blocks: [
              {
                id: '274bd007',
                type: 'paragraph',
                model: {
                  text: 'A mudança do diretor-geral, e por extensão do superintendente no Rio, acabaria se concretizando mesmo em abril de 2020, no episódio que levaria ao pedido de demissão de Moro. ',
                  blocks: [
                    {
                      id: '14b3243a',
                      type: 'fragment',
                      model: {
                        text: 'A mudança do diretor-geral, e por extensão do superintendente no Rio, acabaria se concretizando mesmo em abril de 2020, no episódio que levaria ao pedido de demissão de Moro. ',
                        attributes: [],
                      },
                      position: [22, 1, 1],
                    },
                  ],
                },
                position: [22, 1],
              },
            ],
          },
          position: [22],
        },
        {
          id: '3d765711',
          type: 'text',
          model: {
            blocks: [
              {
                id: '1d6a149f',
                type: 'paragraph',
                model: {
                  text: '"Passou a haver uma insistência (do presidente Jair Bolsonaro) pela troca do comando da PF. (...) Não é aceitável que se façam indicações políticas. E quando se começa a preencher cargos por questões político-partidárias, o resultado não é bom para a corporação", disse o ex-ministro ao se demitir publicamente.',
                  blocks: [
                    {
                      id: '660be115',
                      type: 'fragment',
                      model: {
                        text: '"Passou a haver uma insistência (do presidente Jair Bolsonaro) pela troca do comando da PF. (...) Não é aceitável que se façam indicações políticas. E quando se começa a preencher cargos por questões político-partidárias, o resultado não é bom para a corporação", disse o ex-ministro ao se demitir publicamente.',
                        attributes: [],
                      },
                      position: [23, 1, 1],
                    },
                  ],
                },
                position: [23, 1],
              },
            ],
          },
          position: [23],
        },
        {
          id: '9f44d7d3',
          type: 'text',
          model: {
            blocks: [
              {
                id: '96639294',
                type: 'paragraph',
                model: {
                  text: 'Ainda segundo Moro, "estaria claro que haveria uma interferência política na Polícia Federal, que gera um abalo à credibilidade minha, mas também do governo", além de "gerar uma desorganização na Polícia Federal".',
                  blocks: [
                    {
                      id: 'a9c34793',
                      type: 'fragment',
                      model: {
                        text: 'Ainda segundo Moro, "estaria claro que haveria uma interferência política na Polícia Federal, que gera um abalo à credibilidade minha, mas também do governo", além de "gerar uma desorganização na Polícia Federal".',
                        attributes: [],
                      },
                      position: [24, 1, 1],
                    },
                  ],
                },
                position: [24, 1],
              },
            ],
          },
          position: [24],
        },
        {
          id: '821b35e4',
          type: 'text',
          model: {
            blocks: [
              {
                id: '2acc79d0',
                type: 'paragraph',
                model: {
                  text: 'Moro afirmou que o presidente lhe enviou a seguinte mensagem no WhatsApp: "Moro, você tem 27 superintendências, eu quero apenas uma, a do Rio de Janeiro."',
                  blocks: [
                    {
                      id: 'ac859401',
                      type: 'fragment',
                      model: {
                        text: 'Moro afirmou que o presidente lhe enviou a seguinte mensagem no WhatsApp: "Moro, você tem 27 superintendências, eu quero apenas uma, a do Rio de Janeiro."',
                        attributes: [],
                      },
                      position: [25, 1, 1],
                    },
                  ],
                },
                position: [25, 1],
              },
            ],
          },
          position: [25],
        },
        {
          id: 'b6926af8',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'b622e661',
                type: 'paragraph',
                model: {
                  text: 'Depois da queda de Valeixo da chefia da PF, o presidente colocou em seu lugar Alexandre Ramagem, então chefe da Abin (Agência Brasileira de Inteligência). Este já tratava da troca da chefia do Rio antes mesmo de ser nomeado oficialmente como diretor-geral da PF.',
                  blocks: [
                    {
                      id: '499d50e3',
                      type: 'fragment',
                      model: {
                        text: 'Depois da queda de Valeixo da chefia da PF, o presidente colocou em seu lugar Alexandre Ramagem, então chefe da Abin (Agência Brasileira de Inteligência). Este já tratava da troca da chefia do Rio antes mesmo de ser nomeado oficialmente como diretor-geral da PF.',
                        attributes: [],
                      },
                      position: [26, 1, 1],
                    },
                  ],
                },
                position: [26, 1],
              },
            ],
          },
          position: [26],
        },
        {
          id: '32f8affa',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'd53b3753',
                type: 'paragraph',
                model: {
                  text: 'O problema é que a proximidade pessoal de Ramagem com a família Bolsonaro levaria o STF a barrar a nomeação dele, mas a mudança do comando da PF no Rio acabou acontecendo mesmo assim. ',
                  blocks: [
                    {
                      id: '859b0381',
                      type: 'fragment',
                      model: {
                        text: 'O problema é que a proximidade pessoal de Ramagem com a família Bolsonaro levaria o STF a barrar a nomeação dele, mas a mudança do comando da PF no Rio acabou acontecendo mesmo assim. ',
                        attributes: [],
                      },
                      position: [27, 1, 1],
                    },
                  ],
                },
                position: [27, 1],
              },
            ],
          },
          position: [27],
        },
        {
          id: '045cf2a9',
          type: 'text',
          model: {
            blocks: [
              {
                id: '54797415',
                type: 'paragraph',
                model: {
                  text: 'Até agora não ficou claro por que Bolsonaro fez as mudanças, que são prerrogativas de um presidente da República.  ',
                  blocks: [
                    {
                      id: 'ac42a8d7',
                      type: 'fragment',
                      model: {
                        text: 'Até agora não ficou claro por que Bolsonaro fez as mudanças, que são prerrogativas de um presidente da República.  ',
                        attributes: [],
                      },
                      position: [28, 1, 1],
                    },
                  ],
                },
                position: [28, 1],
              },
            ],
          },
          position: [28],
        },
        {
          id: 'c2db43c0',
          type: 'image',
          model: {
            blocks: [
              {
                id: '9983b865',
                type: 'caption',
                model: {
                  blocks: [
                    {
                      id: '16379ffb',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '916630fb',
                            type: 'paragraph',
                            model: {
                              text: 'Em abril, Bolsonaro fez o pronunciamento contra Moro acompanhado de seus ministros',
                              blocks: [
                                {
                                  id: '8613f2f5',
                                  type: 'fragment',
                                  model: {
                                    text: 'Em abril, Bolsonaro fez o pronunciamento contra Moro acompanhado de seus ministros',
                                    attributes: [],
                                  },
                                  position: [29, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [29, 1, 1, 1],
                          },
                        ],
                      },
                      position: [29, 1, 1],
                    },
                  ],
                },
                position: [29, 1],
              },
              {
                id: 'eb5b18ed',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '4f0aff6a',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '144945f8',
                            type: 'paragraph',
                            model: {
                              text: 'Jair Bolsonaro faz pronunciamento',
                              blocks: [
                                {
                                  id: '381ff228',
                                  type: 'fragment',
                                  model: {
                                    text: 'Jair Bolsonaro faz pronunciamento',
                                    attributes: [],
                                  },
                                  position: [29, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [29, 2, 1, 1],
                          },
                        ],
                      },
                      position: [29, 2, 1],
                    },
                  ],
                },
                position: [29, 2],
              },
              {
                id: 'c55d346d',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'Getty Images',
                  height: 549,
                  locator:
                    '16E2F/production/_111934739_6731cf1d-ee61-4ebe-8677-9e1785f7d9d4.jpg',
                  originCode: 'cpsprodpb',
                  width: 976,
                },
                position: [29, 3],
              },
            ],
          },
          simorghMetadata: { clear: true },
          position: [29],
        },
        {
          id: '9000839f',
          type: 'text',
          model: {
            blocks: [
              {
                id: '06bcd2dc',
                type: 'paragraph',
                model: {
                  text: 'Vale lembrar que o Rio de Janeiro é o berço eleitoral da família Bolsonaro e o suplente de Flávio Bolsonaro no Senado, Paulo Marinho, afirmou à PF que um delegado da instituição avisou os Bolsonaro sobre a investigação de um suposto esquema de corrupção no gabinete de Flávio. ',
                  blocks: [
                    {
                      id: '7b2292e1',
                      type: 'fragment',
                      model: {
                        text: 'Vale lembrar que o Rio de Janeiro é o berço eleitoral da família Bolsonaro e o suplente de Flávio Bolsonaro no Senado, Paulo Marinho, afirmou à PF que um delegado da instituição avisou os Bolsonaro sobre a investigação de um suposto esquema de corrupção no gabinete de Flávio. ',
                        attributes: [],
                      },
                      position: [30, 1, 1],
                    },
                  ],
                },
                position: [30, 1],
              },
            ],
          },
          position: [30],
        },
        {
          id: '200595af',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'dbeb094a',
                type: 'paragraph',
                model: {
                  text: 'O agente também teria dito que a operação seria adiada para evitar danos à candidatura de Bolsonaro em 2018. ',
                  blocks: [
                    {
                      id: '4cdfbf82',
                      type: 'fragment',
                      model: {
                        text: 'O agente também teria dito que a operação seria adiada para evitar danos à candidatura de Bolsonaro em 2018. ',
                        attributes: [],
                      },
                      position: [31, 1, 1],
                    },
                  ],
                },
                position: [31, 1],
              },
            ],
          },
          position: [31],
        },
        {
          id: '27753623',
          type: 'text',
          model: {
            blocks: [
              {
                id: '904f4136',
                type: 'paragraph',
                model: {
                  text: 'Essa mesma operação daria depois origem às acusações formais contra Flávio Bolsonaro por lavagem de dinheiro e desvio de dinheiro público. O filho do presidente nega ter cometido qualquer crime. ',
                  blocks: [
                    {
                      id: '9289a338',
                      type: 'fragment',
                      model: {
                        text: 'Essa mesma operação daria depois origem às acusações formais contra Flávio Bolsonaro por lavagem de dinheiro e desvio de dinheiro público. O filho do presidente nega ter cometido qualquer crime. ',
                        attributes: [],
                      },
                      position: [32, 1, 1],
                    },
                  ],
                },
                position: [32, 1],
              },
            ],
          },
          position: [32],
        },
        {
          id: '816f44e6',
          type: 'subheadline',
          model: {
            blocks: [
              {
                id: '691af4a2',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: 'b32fd559',
                      type: 'paragraph',
                      model: {
                        text: '2. Que relatórios de inteligência afinal o presidente Jair Bolsonaro desejava obter e que supostamente lhes estariam sendo negados? ',
                        blocks: [
                          {
                            id: '4468861d',
                            type: 'fragment',
                            model: {
                              text: '2. Que relatórios de inteligência afinal o presidente Jair Bolsonaro desejava obter e que supostamente lhes estariam sendo negados? ',
                              attributes: [],
                            },
                            position: [33, 1, 1, 1],
                          },
                        ],
                      },
                      position: [33, 1, 1],
                    },
                  ],
                },
                position: [33, 1],
              },
            ],
          },
          position: [33],
        },
        {
          id: '33737d2f',
          type: 'text',
          model: {
            blocks: [
              {
                id: '7a4b15be',
                type: 'paragraph',
                model: {
                  text: 'Bolsonaro disse que precisava de um relatório diário da PF para "poder bem decidir o futuro dessa nação", mas não está claro que tipo de informações o presidente busca. Para ele, o sistema federal de inteligência é aparelhado e ineficaz.',
                  blocks: [
                    {
                      id: '5d1d8244',
                      type: 'fragment',
                      model: {
                        text: 'Bolsonaro disse que precisava de um relatório diário da PF para "poder bem decidir o futuro dessa nação", mas não está claro que tipo de informações o presidente busca. Para ele, o sistema federal de inteligência é aparelhado e ineficaz.',
                        attributes: [],
                      },
                      position: [34, 1, 1],
                    },
                  ],
                },
                position: [34, 1],
              },
            ],
          },
          position: [34],
        },
        {
          id: 'b7be739e',
          type: 'text',
          model: {
            blocks: [
              {
                id: '4dcf48d0',
                type: 'paragraph',
                model: {
                  text: 'Segundo reportagens da emissora CNN Brasil e do jornal O Globo, a Abin recebeu desde janeiro de 2019 pelo menos 1.300 relatórios de inteligência de diversos órgãos do governo. Cabe ao órgão repassar as informações ao Gabinete de Segurança Institucional (GSI) da Presidência da República. ',
                  blocks: [
                    {
                      id: '1b44cb39',
                      type: 'fragment',
                      model: {
                        text: 'Segundo reportagens da emissora CNN Brasil e do jornal O Globo, a Abin recebeu desde janeiro de 2019 pelo menos 1.300 relatórios de inteligência de diversos órgãos do governo. Cabe ao órgão repassar as informações ao Gabinete de Segurança Institucional (GSI) da Presidência da República. ',
                        attributes: [],
                      },
                      position: [35, 1, 1],
                    },
                  ],
                },
                position: [35, 1],
              },
            ],
          },
          position: [35],
        },
        {
          id: '9821116f',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'b53b73d7',
                type: 'paragraph',
                model: {
                  text: 'O ritmo de relatórios enviados pela PF à Abin aumentou de 2,5 por mês entre 2016 e 2018 para 4,8 mensais entre 2019 e meados de 2020. Os documentos tratam de crime organizado, extremismo, conflitos, entre outros temas. Não há detalhes sobre o conteúdo de cada um deles. ',
                  blocks: [
                    {
                      id: '31083698',
                      type: 'fragment',
                      model: {
                        text: 'O ritmo de relatórios enviados pela PF à Abin aumentou de 2,5 por mês entre 2016 e 2018 para 4,8 mensais entre 2019 e meados de 2020. Os documentos tratam de crime organizado, extremismo, conflitos, entre outros temas. Não há detalhes sobre o conteúdo de cada um deles. ',
                        attributes: [],
                      },
                      position: [36, 1, 1],
                    },
                  ],
                },
                position: [36, 1],
              },
            ],
          },
          position: [36],
        },
        {
          id: 'ea968286',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'c6cb0c9f',
                type: 'paragraph',
                model: {
                  text: 'Em seu depoimento à Polícia Federal, Moro afirmou que que o presidente "relatou verbalmente no Palácio do Planalto que precisava de pessoas de sua confiança (na Polícia Federal), para que pudesse interagir, telefonar e obter relatórios de inteligência".',
                  blocks: [
                    {
                      id: 'bd4daf98',
                      type: 'fragment',
                      model: {
                        text: 'Em seu depoimento à Polícia Federal, Moro afirmou que que o presidente "relatou verbalmente no Palácio do Planalto que precisava de pessoas de sua confiança (na Polícia Federal), para que pudesse interagir, telefonar e obter relatórios de inteligência".',
                        attributes: [],
                      },
                      position: [37, 1, 1],
                    },
                  ],
                },
                position: [37, 1],
              },
            ],
          },
          position: [37],
        },
        {
          id: 'fdb17d1e',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'addb06cf',
                type: 'paragraph',
                model: {
                  text: 'Moro disse seguir a praxe de ministros da Justiça sobre investigações da Polícia Federal. Segundo ele, o presidente recebia apenas informações não sigilosas e era notificado sobre operações somente após as deflagrações de buscas e prisões. ',
                  blocks: [
                    {
                      id: '6223d6e0',
                      type: 'fragment',
                      model: {
                        text: 'Moro disse seguir a praxe de ministros da Justiça sobre investigações da Polícia Federal. Segundo ele, o presidente recebia apenas informações não sigilosas e era notificado sobre operações somente após as deflagrações de buscas e prisões. ',
                        attributes: [],
                      },
                      position: [38, 1, 1],
                    },
                  ],
                },
                position: [38, 1],
              },
            ],
          },
          position: [38],
        },
        {
          id: '2c2300ed',
          type: 'text',
          model: {
            blocks: [
              {
                id: '297cfc6e',
                type: 'paragraph',
                model: {
                  text: 'Ele cita como exemplo uma ação que envolvia o ministro do Turismo, Marcelo Álvaro Antônio, acusado de liderar um esquema de laranjas no então partido do presidente, PSL, durante a eleição de 2018. ',
                  blocks: [
                    {
                      id: '51b7610f',
                      type: 'fragment',
                      model: {
                        text: 'Ele cita como exemplo uma ação que envolvia o ministro do Turismo, Marcelo Álvaro Antônio, acusado de liderar um esquema de laranjas no então partido do presidente, PSL, durante a eleição de 2018. ',
                        attributes: [],
                      },
                      position: [39, 1, 1],
                    },
                  ],
                },
                position: [39, 1],
              },
            ],
          },
          position: [39],
        },
        {
          id: '11a62eb1',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'da906c6e',
                type: 'caption',
                model: {
                  blocks: [
                    {
                      id: '8e5af5f8',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '46ed1b05',
                            type: 'paragraph',
                            model: {
                              text: "'Estaria claro que haveria uma interferência política na Polícia Federal, que gera um abalo à credibilidade minha, mas também do governo. Ia gerar uma desorganização na Polícia Federal'",
                              blocks: [
                                {
                                  id: 'b3f3c324',
                                  type: 'fragment',
                                  model: {
                                    text: "'Estaria claro que haveria uma interferência política na Polícia Federal, que gera um abalo à credibilidade minha, mas também do governo. Ia gerar uma desorganização na Polícia Federal'",
                                    attributes: [],
                                  },
                                  position: [40, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [40, 1, 1, 1],
                          },
                        ],
                      },
                      position: [40, 1, 1],
                    },
                  ],
                },
                position: [40, 1],
              },
              {
                id: '913e0b49',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '7f1a9481',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '7828395e',
                            type: 'paragraph',
                            model: {
                              text: 'Moro nesta sexta',
                              blocks: [
                                {
                                  id: '14b23128',
                                  type: 'fragment',
                                  model: {
                                    text: 'Moro nesta sexta',
                                    attributes: [],
                                  },
                                  position: [40, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [40, 2, 1, 1],
                          },
                        ],
                      },
                      position: [40, 2, 1],
                    },
                  ],
                },
                position: [40, 2],
              },
              {
                id: '34ee1d4a',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'Agência Brasil',
                  height: 549,
                  locator:
                    '10857/production/_114417676_206a619b-a2c0-4ce3-b442-1a016eda6c45.png',
                  originCode: 'cpsprodpb',
                  width: 976,
                },
                position: [40, 3],
              },
            ],
          },
          position: [40],
        },
        {
          id: 'a4126853',
          type: 'text',
          model: {
            blocks: [
              {
                id: '635f0932',
                type: 'paragraph',
                model: {
                  text: 'Ainda segundo Moro, o ministro Augusto Heleno (Gabinete de Segurança Institucional - GSI) afirmou que esse tipo de relatório que o presidente queria "não tinha como ser fornecido". Questionado pela PF, Heleno não se recorda de ter dito essa frase. ',
                  blocks: [
                    {
                      id: 'a38d201f',
                      type: 'fragment',
                      model: {
                        text: 'Ainda segundo Moro, o ministro Augusto Heleno (Gabinete de Segurança Institucional - GSI) afirmou que esse tipo de relatório que o presidente queria "não tinha como ser fornecido". Questionado pela PF, Heleno não se recorda de ter dito essa frase. ',
                        attributes: [],
                      },
                      position: [41, 1, 1],
                    },
                  ],
                },
                position: [41, 1],
              },
            ],
          },
          position: [41],
        },
        {
          id: 'b7080e7a',
          type: 'text',
          model: {
            blocks: [
              {
                id: '3d94874a',
                type: 'paragraph',
                model: {
                  text: 'Moro fez acusações semelhantes no dia em que pediu demissão do cargo. ',
                  blocks: [
                    {
                      id: 'a5c659b1',
                      type: 'fragment',
                      model: {
                        text: 'Moro fez acusações semelhantes no dia em que pediu demissão do cargo. ',
                        attributes: [],
                      },
                      position: [42, 1, 1],
                    },
                  ],
                },
                position: [42, 1],
              },
            ],
          },
          position: [42],
        },
        {
          id: '43acc322',
          type: 'text',
          model: {
            blocks: [
              {
                id: '67065baa',
                type: 'paragraph',
                model: {
                  text: '"Não é o papel da PF prestar esse tipo de informação. As investigações têm que ser preservadas. A autonomia da PF é um valor fundamental que temos que preservar. (...) Então quem (entra nessas condições), eu fico na dúvida se vai conseguir dizer não (a pedidos de interferência do presidente)."',
                  blocks: [
                    {
                      id: 'b419598b',
                      type: 'fragment',
                      model: {
                        text: '"Não é o papel da PF prestar esse tipo de informação. As investigações têm que ser preservadas. A autonomia da PF é um valor fundamental que temos que preservar. (...) Então quem (entra nessas condições), eu fico na dúvida se vai conseguir dizer não (a pedidos de interferência do presidente)."',
                        attributes: [],
                      },
                      position: [43, 1, 1],
                    },
                  ],
                },
                position: [43, 1],
              },
            ],
          },
          position: [43],
        },
        {
          id: 'c7bed343',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'ddf421d8',
                type: 'paragraph',
                model: {
                  text: 'Horas depois, Bolsonaro fez um discurso rebatendo alguns pontos da fala de Moro. ',
                  blocks: [
                    {
                      id: 'd30453b0',
                      type: 'fragment',
                      model: {
                        text: 'Horas depois, Bolsonaro fez um discurso rebatendo alguns pontos da fala de Moro. ',
                        attributes: [],
                      },
                      position: [44, 1, 1],
                    },
                  ],
                },
                position: [44, 1],
              },
            ],
          },
          position: [44],
        },
        {
          id: 'd4e6211d',
          type: 'text',
          model: {
            blocks: [
              {
                id: '0433cf14',
                type: 'paragraph',
                model: {
                  text: 'Sobre os relatórios de inteligência, Bolsonaro afirmou: "Sempre falei para ele: \'Moro, não tenho informações da Polícia Federal. Eu tenho que todo dia ter um relatório do que aconteceu, em especial nas últimas 24 horas, para poder bem decidir o futuro dessa nação\'. Eu nunca pedi para ele o andamento de qualquer processo, até porque a Inteligência com ele perdeu espaço na Justiça. Quase que implorando informações."',
                  blocks: [
                    {
                      id: '2d3ef13f',
                      type: 'fragment',
                      model: {
                        text: 'Sobre os relatórios de inteligência, Bolsonaro afirmou: "Sempre falei para ele: \'Moro, não tenho informações da Polícia Federal. Eu tenho que todo dia ter um relatório do que aconteceu, em especial nas últimas 24 horas, para poder bem decidir o futuro dessa nação\'. Eu nunca pedi para ele o andamento de qualquer processo, até porque a Inteligência com ele perdeu espaço na Justiça. Quase que implorando informações."',
                        attributes: [],
                      },
                      position: [45, 1, 1],
                    },
                  ],
                },
                position: [45, 1],
              },
            ],
          },
          position: [45],
        },
        {
          id: '586b91a4',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'bc0a7940',
                type: 'paragraph',
                model: {
                  text: 'Outro ponto que a Polícia Federal pode tentar esclarecer com o Bolsonaro é o que ele chamou de "serviço de informações particular". ',
                  blocks: [
                    {
                      id: 'b7e1dc70',
                      type: 'fragment',
                      model: {
                        text: 'Outro ponto que a Polícia Federal pode tentar esclarecer com o Bolsonaro é o que ele chamou de "serviço de informações particular". ',
                        attributes: [],
                      },
                      position: [46, 1, 1],
                    },
                  ],
                },
                position: [46, 1],
              },
            ],
          },
          position: [46],
        },
        {
          id: 'f7dc0c83',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'cde91620',
                type: 'paragraph',
                model: {
                  text: 'Em entrevista à rádio Jovem Pan, ele afirmou que este é formado informalmente por militares e policiais que lhe enviam informações sobre fronteiras, por exemplo, mas não as detalhou.',
                  blocks: [
                    {
                      id: '4b6c9609',
                      type: 'fragment',
                      model: {
                        text: 'Em entrevista à rádio Jovem Pan, ele afirmou que este é formado informalmente por militares e policiais que lhe enviam informações sobre fronteiras, por exemplo, mas não as detalhou.',
                        attributes: [],
                      },
                      position: [47, 1, 1],
                    },
                  ],
                },
                position: [47, 1],
              },
            ],
          },
          position: [47],
        },
        {
          id: '0762e4b6',
          type: 'subheadline',
          model: {
            blocks: [
              {
                id: '763e3616',
                type: 'text',
                model: {
                  blocks: [
                    {
                      id: '68a161d8',
                      type: 'paragraph',
                      model: {
                        text: '3. O presidente tentou interferir ou obter informações sobre as investigações do chamado "inquérito das fake news", em tramitação no STF?',
                        blocks: [
                          {
                            id: '61793fc3',
                            type: 'fragment',
                            model: {
                              text: '3. O presidente tentou interferir ou obter informações sobre as investigações do chamado "inquérito das fake news", em tramitação no STF?',
                              attributes: [],
                            },
                            position: [48, 1, 1, 1],
                          },
                        ],
                      },
                      position: [48, 1, 1],
                    },
                  ],
                },
                position: [48, 1],
              },
            ],
          },
          position: [48],
        },
        {
          id: 'a375ea25',
          type: 'text',
          model: {
            blocks: [
              {
                id: '65f2e391',
                type: 'paragraph',
                model: {
                  text: 'Ao longo do inquérito acerca das acusações de interferência na PF, os investigadores perguntaram em depoimentos a autoridades sobre a relação entre o presidente da República e o caso que corre no STF conhecido como "inquérito das fake news", que respingou em bolsonaristas. ',
                  blocks: [
                    {
                      id: '654f0625',
                      type: 'fragment',
                      model: {
                        text: 'Ao longo do inquérito acerca das acusações de interferência na PF, os investigadores perguntaram em depoimentos a autoridades sobre a relação entre o presidente da República e o caso que corre no STF conhecido como "inquérito das fake news", que respingou em bolsonaristas. ',
                        attributes: [],
                      },
                      position: [49, 1, 1],
                    },
                  ],
                },
                position: [49, 1],
              },
            ],
          },
          position: [49],
        },
        {
          id: '96a00c96',
          type: 'text',
          model: {
            blocks: [
              {
                id: '2a7c8180',
                type: 'paragraph',
                model: {
                  text: 'As acusações também partiram de Moro. ',
                  blocks: [
                    {
                      id: '99bd4724',
                      type: 'fragment',
                      model: {
                        text: 'As acusações também partiram de Moro. ',
                        attributes: [],
                      },
                      position: [50, 1, 1],
                    },
                  ],
                },
                position: [50, 1],
              },
            ],
          },
          position: [50],
        },
        {
          id: '0d2cb1a4',
          type: 'text',
          model: {
            blocks: [
              {
                id: '19884a17',
                type: 'paragraph',
                model: {
                  text: 'Segundo o ex-ministro, Bolsonaro lhe enviou uma mensagem em abril de 2020 com um link de uma reportagem do site O Antagonista sobre o inquérito no STF. O título era "PF na cola de 10 a 12 deputados bolsonaristas".',
                  blocks: [
                    {
                      id: 'd9922df2',
                      type: 'fragment',
                      model: {
                        text: 'Segundo o ex-ministro, Bolsonaro lhe enviou uma mensagem em abril de 2020 com um link de uma reportagem do site O Antagonista sobre o inquérito no STF. O título era "PF na cola de 10 a 12 deputados bolsonaristas".',
                        attributes: [],
                      },
                      position: [51, 1, 1],
                    },
                  ],
                },
                position: [51, 1],
              },
            ],
          },
          position: [51],
        },
        {
          id: 'd5640660',
          type: 'text',
          model: {
            blocks: [
              {
                id: 'bd0ce2a6',
                type: 'paragraph',
                model: {
                  text: 'Em mensagem a Moro, Bolsonaro escreveu que a investigação era  "mais um motivo para a troca na PF".',
                  blocks: [
                    {
                      id: 'e1b74a8d',
                      type: 'fragment',
                      model: {
                        text: 'Em mensagem a Moro, Bolsonaro escreveu que a investigação era  "mais um motivo para a troca na PF".',
                        attributes: [],
                      },
                      position: [52, 1, 1],
                    },
                  ],
                },
                position: [52, 1],
              },
            ],
          },
          position: [52],
        },
        {
          id: '8e9783b0',
          type: 'text',
          model: {
            blocks: [
              {
                id: '5d119e03',
                type: 'paragraph',
                model: {
                  text: 'Moro respondeu ao presidente que a instituição Federal cumpria ordens do STF nesse inquérito aberto pelo presidente do tribunal, Dias Toffoli, acerca de ataques a ministros do STF. ',
                  blocks: [
                    {
                      id: '0147e2ee',
                      type: 'fragment',
                      model: {
                        text: 'Moro respondeu ao presidente que a instituição Federal cumpria ordens do STF nesse inquérito aberto pelo presidente do tribunal, Dias Toffoli, acerca de ataques a ministros do STF. ',
                        attributes: [],
                      },
                      position: [53, 1, 1],
                    },
                  ],
                },
                position: [53, 1],
              },
            ],
          },
          position: [53],
        },
        {
          id: 'a1580513',
          type: 'text',
          model: {
            blocks: [
              {
                id: '2ed3fec5',
                type: 'paragraph',
                model: {
                  text: 'Questionado sobre o interesse de Bolsonaro no inquérito, Moro afirmou aos investigadores que caberia ao presidente explicar "os motivos dessa mensagem e o que ele queria dizer". ',
                  blocks: [
                    {
                      id: '58480e1e',
                      type: 'fragment',
                      model: {
                        text: 'Questionado sobre o interesse de Bolsonaro no inquérito, Moro afirmou aos investigadores que caberia ao presidente explicar "os motivos dessa mensagem e o que ele queria dizer". ',
                        attributes: [],
                      },
                      position: [54, 1, 1],
                    },
                  ],
                },
                position: [54, 1],
              },
            ],
          },
          position: [54],
        },
        {
          id: 'dc12c2bb',
          type: 'text',
          model: {
            blocks: [
              {
                id: '3c3a085b',
                type: 'paragraph',
                model: {
                  text: 'Ramagem também foi questionado pela PF, especificamente se sua indicação para o comando da instituição estava associado, entre outros pontos, ao repasse de informações sobre o inquérito das fake news. ',
                  blocks: [
                    {
                      id: '72b00240',
                      type: 'fragment',
                      model: {
                        text: 'Ramagem também foi questionado pela PF, especificamente se sua indicação para o comando da instituição estava associado, entre outros pontos, ao repasse de informações sobre o inquérito das fake news. ',
                        attributes: [],
                      },
                      position: [55, 1, 1],
                    },
                  ],
                },
                position: [55, 1],
              },
            ],
          },
          position: [55],
        },
        {
          id: 'eb0ef7b4',
          type: 'text',
          model: {
            blocks: [
              {
                id: '7b6d968e',
                type: 'paragraph',
                model: {
                  text: 'O chefe da Abin respondeu que "o presidente da República nunca chegou a conversar com ele, sob a forma de intromissão, sobre investigações específicas da Polícia Federal que pudessem, de alguma forma, atingir pessoas a ele ligadas".',
                  blocks: [
                    {
                      id: '3e63b6ff',
                      type: 'fragment',
                      model: {
                        text: 'O chefe da Abin respondeu que "o presidente da República nunca chegou a conversar com ele, sob a forma de intromissão, sobre investigações específicas da Polícia Federal que pudessem, de alguma forma, atingir pessoas a ele ligadas".',
                        attributes: [],
                      },
                      position: [56, 1, 1],
                    },
                  ],
                },
                position: [56, 1],
              },
            ],
          },
          position: [56],
        },
        {
          id: '0931cadc',
          type: 'image',
          model: {
            blocks: [
              {
                id: '0e0bb939',
                type: 'caption',
                model: {
                  blocks: [
                    {
                      id: '5a7fe8e3',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: 'c09bdebd',
                            type: 'paragraph',
                            model: {
                              text: 'Agora ex-ministro da Justiça diz que interferência política pretendida por Bolsonaro atrapalharia funcionamento da Polícia Federal',
                              blocks: [
                                {
                                  id: 'a6c5ae56',
                                  type: 'fragment',
                                  model: {
                                    text: 'Agora ex-ministro da Justiça diz que interferência política pretendida por Bolsonaro atrapalharia funcionamento da Polícia Federal',
                                    attributes: [],
                                  },
                                  position: [57, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [57, 1, 1, 1],
                          },
                        ],
                      },
                      position: [57, 1, 1],
                    },
                  ],
                },
                position: [57, 1],
              },
              {
                id: 'e2aea599',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '17c6bce4',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: '2db299e1',
                            type: 'paragraph',
                            model: {
                              text: 'Sérgio Moro em foto de arquivo',
                              blocks: [
                                {
                                  id: '1e8f2fde',
                                  type: 'fragment',
                                  model: {
                                    text: 'Sérgio Moro em foto de arquivo',
                                    attributes: [],
                                  },
                                  position: [57, 2, 1, 1, 1],
                                },
                              ],
                            },
                            position: [57, 2, 1, 1],
                          },
                        ],
                      },
                      position: [57, 2, 1],
                    },
                  ],
                },
                position: [57, 2],
              },
              {
                id: 'a7ed8a09',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'Marcelo Camargo /Ag Brasil',
                  height: 549,
                  locator:
                    '11C58/production/_111929727_d04b7d6e-ac9e-4184-9d58-772d17662c6e.jpg',
                  originCode: 'cpsprodpb',
                  width: 976,
                },
                position: [57, 3],
              },
            ],
          },
          position: [57],
        },
        {
          id: '6f1926e2',
          type: 'text',
          model: {
            blocks: [
              {
                id: '1a2050b7',
                type: 'paragraph',
                model: {
                  text: 'Envolto em controvérsias, o chamado inquérito das fake news foi aberto pelo STF em março de 2019 sem participação do Ministério Público e distribuído ao ministro Alexandre de Moraes sem sorteio prévio entre os ministros da Corte.',
                  blocks: [
                    {
                      id: '2f252616',
                      type: 'fragment',
                      model: {
                        text: 'Envolto em controvérsias, o chamado inquérito das fake news foi aberto pelo STF em março de 2019 sem participação do Ministério Público e distribuído ao ministro Alexandre de Moraes sem sorteio prévio entre os ministros da Corte.',
                        attributes: [],
                      },
                      position: [58, 1, 1],
                    },
                  ],
                },
                position: [58, 1],
              },
            ],
          },
          position: [58],
        },
        {
          id: '8e046f40',
          type: 'text',
          model: {
            blocks: [
              {
                id: '3a4c9745',
                type: 'paragraph',
                model: {
                  text: 'A investigação não tinha limites nem objetos claros. Mais de um ano depois da abertura dela, o plenário do STF decidiu em junho de 2020 referendar o inquérito em meio à intensificação dos ataques ao Supremo por apoiadores de Bolsonaro. ',
                  blocks: [
                    {
                      id: '849425a1',
                      type: 'fragment',
                      model: {
                        text: 'A investigação não tinha limites nem objetos claros. Mais de um ano depois da abertura dela, o plenário do STF decidiu em junho de 2020 referendar o inquérito em meio à intensificação dos ataques ao Supremo por apoiadores de Bolsonaro. ',
                        attributes: [],
                      },
                      position: [59, 1, 1],
                    },
                  ],
                },
                position: [59, 1],
              },
            ],
          },
          position: [59],
        },
        {
          id: 'ceec9e6f',
          type: 'text',
          model: {
            blocks: [
              {
                id: '1448990b',
                type: 'paragraph',
                model: {
                  text: 'Moraes também determinou que os delegados da PF responsáveis por dois inquéritos (o das fake news e o que investigava ações antidemocráticas) não poderiam ser substituídos. ',
                  blocks: [
                    {
                      id: 'f6035333',
                      type: 'fragment',
                      model: {
                        text: 'Moraes também determinou que os delegados da PF responsáveis por dois inquéritos (o das fake news e o que investigava ações antidemocráticas) não poderiam ser substituídos. ',
                        attributes: [],
                      },
                      position: [60, 1, 1],
                    },
                  ],
                },
                position: [60, 1],
              },
            ],
          },
          position: [60],
        },
        {
          id: '83e62172',
          type: 'image',
          model: {
            blocks: [
              {
                id: 'c2fb0154',
                type: 'altText',
                model: {
                  blocks: [
                    {
                      id: '986909e1',
                      type: 'text',
                      model: {
                        blocks: [
                          {
                            id: 'b93ed1d5',
                            type: 'paragraph',
                            model: {
                              text: 'Línea',
                              blocks: [
                                {
                                  id: '45253abf',
                                  type: 'fragment',
                                  model: {
                                    text: 'Línea',
                                    attributes: [],
                                  },
                                  position: [61, 1, 1, 1, 1],
                                },
                              ],
                            },
                            position: [61, 1, 1, 1],
                          },
                        ],
                      },
                      position: [61, 1, 1],
                    },
                  ],
                },
                position: [61, 1],
              },
              {
                id: '4a75063a',
                type: 'rawImage',
                model: {
                  copyrightHolder: 'BBC',
                  height: 2,
                  locator: '1683C/production/_104602229_line976.jpg',
                  originCode: 'cpsprodpb',
                  width: 464,
                },
                position: [61, 2],
              },
            ],
          },
          position: [61],
        },
        {
          id: '1e4b7660',
          type: 'text',
          model: {
            blocks: [
              {
                id: '05c8b455',
                type: 'paragraph',
                model: {
                  text: 'Já assistiu aos nossos novos vídeos no YouTube? Inscreva-se no nosso canal! ',
                  blocks: [
                    {
                      id: 'a41050ae',
                      type: 'fragment',
                      model: {
                        text: 'Já assistiu aos nossos novos vídeos no ',
                        attributes: ['bold'],
                      },
                      position: [62, 1, 1],
                    },
                    {
                      id: '059ae83e',
                      type: 'urlLink',
                      model: {
                        text: 'YouTube',
                        locator:
                          'https://www.youtube.com/channel/UCthbIFAxbXTTQEC7EcQvP1Q',
                        blocks: [
                          {
                            id: '9f144ca5',
                            type: 'fragment',
                            model: { text: 'YouTube', attributes: [] },
                            position: [62, 1, 2, 1],
                          },
                        ],
                        isExternal: true,
                      },
                      position: [62, 1, 2],
                    },
                    {
                      id: '610a4fe6',
                      type: 'fragment',
                      model: {
                        text: '? Inscreva-se no nosso canal! ',
                        attributes: ['bold'],
                      },
                      position: [62, 1, 3],
                    },
                  ],
                },
                position: [62, 1],
              },
            ],
          },
          position: [62],
        },
        {
          id: 'bc8e9fbc',
          type: 'social_embed',
          model: {
            blocks: [
              {
                id: '08ae3079',
                type: 'youtube',
                indexOfType: 0,
                model: {
                  embed: {
                    fallback_image: {
                      alt_text:
                        'YouTube post by BBC News Brasil: Como o Peru se tornou o país com a maior taxa de mortes por covid-19 no mundo',
                      fallback_image_height: 269,
                      fallback_image_width: 500,
                    },
                    oembed: {
                      author_name: 'BBC News Brasil',
                      author_url: 'https://www.youtube.com/user/BBCBrasil',
                      height: 270,
                      html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/3IcrMCmty64?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                      provider_name: 'YouTube',
                      provider_url: 'https://www.youtube.com/',
                      thumbnail_height: 360,
                      thumbnail_url:
                        'https://i.ytimg.com/vi/3IcrMCmty64/hqdefault.jpg',
                      thumbnail_width: 480,
                      title:
                        'Como o Peru se tornou o país com a maior taxa de mortes por covid-19 no mundo',
                      version: '1.0',
                      width: 480,
                    },
                  },
                  href: 'https://www.youtube.com/watch?v=3IcrMCmty64',
                  id: '3IcrMCmty64',
                },
                position: [63, 1],
              },
            ],
          },
          position: [63],
        },
        {
          id: '097dbf97',
          type: 'social_embed',
          model: {
            blocks: [
              {
                id: '200496d0',
                type: 'youtube',
                indexOfType: 1,
                model: {
                  embed: {
                    fallback_image: {
                      alt_text:
                        'YouTube post by BBC News Brasil: Se não tem arroz, que comam macarrão? O que considerar, do valor nutritivo aos preços',
                      fallback_image_height: 269,
                      fallback_image_width: 500,
                    },
                    oembed: {
                      author_name: 'BBC News Brasil',
                      author_url: 'https://www.youtube.com/user/BBCBrasil',
                      height: 270,
                      html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/9Vnt45ZrWCI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                      provider_name: 'YouTube',
                      provider_url: 'https://www.youtube.com/',
                      thumbnail_height: 360,
                      thumbnail_url:
                        'https://i.ytimg.com/vi/9Vnt45ZrWCI/hqdefault.jpg',
                      thumbnail_width: 480,
                      title:
                        'Se não tem arroz, que comam macarrão? O que considerar, do valor nutritivo aos preços',
                      version: '1.0',
                      width: 480,
                    },
                  },
                  href: 'https://www.youtube.com/watch?v=9Vnt45ZrWCI',
                  id: '9Vnt45ZrWCI',
                },
                position: [64, 1],
              },
            ],
          },
          position: [64],
        },
        {
          id: 'e19489a5',
          type: 'social_embed',
          model: {
            blocks: [
              {
                id: 'd7afda3f',
                type: 'youtube',
                indexOfType: 2,
                model: {
                  embed: {
                    fallback_image: {
                      alt_text:
                        'YouTube post by BBC News Brasil: Os 5 fatores que podem levar Trump a reverter desvantagem e vencer eleição nos EUA',
                      fallback_image_height: 269,
                      fallback_image_width: 500,
                    },
                    oembed: {
                      author_name: 'BBC News Brasil',
                      author_url: 'https://www.youtube.com/user/BBCBrasil',
                      height: 270,
                      html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/n0OuHLyHhQ4?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                      provider_name: 'YouTube',
                      provider_url: 'https://www.youtube.com/',
                      thumbnail_height: 360,
                      thumbnail_url:
                        'https://i.ytimg.com/vi/n0OuHLyHhQ4/hqdefault.jpg',
                      thumbnail_width: 480,
                      title:
                        'Os 5 fatores que podem levar Trump a reverter desvantagem e vencer eleição nos EUA',
                      version: '1.0',
                      width: 480,
                    },
                  },
                  href: 'https://www.youtube.com/watch?v=n0OuHLyHhQ4',
                  id: 'n0OuHLyHhQ4',
                },
                position: [65, 1],
              },
            ],
          },
          position: [65],
        },
      ],
    },
  },
  metadata: {
    firstPublished: 1600370390000,
    lastPublished: 1600370390000,
    lastUpdated: 1600421278537,
    analyticsLabels: {
      counterName: 'portuguese.brasil.story.54196636.page',
      cps_asset_id: '54196636',
      cps_asset_type: 'sty',
    },
    atiAnalytics: { producerId: '33', producerName: 'BRASIL' },
    blockTypes: ['image', 'paragraph', 'crosshead', 'social_embed'],
    createdBy: 'brasil-v6',
    id: 'urn:bbc:ares::asset:portuguese/brasil-54196636',
    includeComments: false,
    language: 'pt-BR',
    locators: {
      assetId: '54196636',
      assetUri: '/portuguese/brasil-54196636',
      cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-54196636',
      curie: 'http://www.bbc.co.uk/asset/f60377cf-fdf8-4e86-bd0e-cfc221210ffd',
    },
    options: {
      allowAdvertising: true,
      allowDateStamp: true,
      allowHeadline: true,
      allowPrintingSharingLinks: true,
      allowRelatedStoriesBox: true,
      allowRightHandSide: true,
      hasContentWarning: false,
      hasNewsTracker: false,
      includeComments: false,
      isBreakingNews: false,
      isFactCheck: false,
      isIgorSeoTagsEnabled: false,
      isKeyContent: false,
      suitableForSyndication: true,
    },
    passport: {
      campaigns: [
        {
          campaignId: '5a988e3739461b000e9dabfa',
          campaignName: 'WS - Give me perspective',
        },
      ],
      category: {
        categoryId:
          'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
        categoryName: 'News',
      },
      taggings: [],
    },
    readTime: 7,
    siteUri: '/portuguese',
    tags: {
      about: [
        {
          thingEnglishLabel: 'Politics',
          thingId: '75612fa6-147c-4a43-97fa-fcf70d9cced3',
          thingLabel: 'Politics',
          thingSameAs: ['http://dbpedia.org/resource/Politics'],
          thingType: ['tagging:TagConcept', 'core:Theme', 'core:Thing'],
          thingUri:
            'http://www.bbc.co.uk/things/75612fa6-147c-4a43-97fa-fcf70d9cced3#id',
        },
        {
          thingEnglishLabel: 'Sergio Moro',
          thingId: 'e779a8e4-2c8b-4767-a931-6aab82d78535',
          thingLabel: 'Sergio Moro',
          thingSameAs: [
            'http://dbpedia.org/resource/S%C3%A9rgio_Moro',
            'http://www.wikidata.org/entity/Q19607958',
          ],
          thingType: [
            'core:Thing',
            'tagging:AmbiguousTerm',
            'core:Person',
            'tagging:Agent',
            'tagging:TagConcept',
          ],
          thingUri:
            'http://www.bbc.co.uk/things/e779a8e4-2c8b-4767-a931-6aab82d78535#id',
        },
        {
          thingEnglishLabel: 'Jair Bolsonaro',
          thingId: 'f21d4493-e3bd-47df-b23c-1d57f0e3e818',
          thingLabel: 'Jair Bolsonaro',
          thingSameAs: [
            'http://dbpedia.org/resource/Jair_Bolsonaro',
            'http://www.wikidata.org/entity/Q10304982',
          ],
          thingType: [
            'core:Thing',
            'tagging:TagConcept',
            'tagging:Agent',
            'core:Person',
            'tagging:AmbiguousTerm',
          ],
          thingUri:
            'http://www.bbc.co.uk/things/f21d4493-e3bd-47df-b23c-1d57f0e3e818#id',
        },
      ],
    },
    timestamp: 1600370390000,
    type: 'STY',
    version: 'v1.3.7',
  },
  relatedContent: {
    groups: [
      {
        promos: [
          {
            cpsType: 'STY',
            headlines: {
              headline:
                "O que descobri após ler todos os livros 'reveladores' sobre Trump",
              shortHeadline:
                "O que descobri após ler todos os livros 'reveladores' sobre Trump",
            },
            id: 'urn:bbc:ares::asset:portuguese/internacional-54187602',
            indexImage: {
              altText:
                'A composite showing President Trump and some of the books written about him',
              copyrightHolder: 'BBC',
              height: 549,
              href: 'http://c.files.bbci.co.uk/9199/production/_114337273_41694e7c-8bae-4fa8-a954-d8bde0365e15.jpg',
              id: '114337273',
              path: '/cpsprodpb/9199/production/_114337273_41694e7c-8bae-4fa8-a954-d8bde0365e15.jpg',
              subType: 'index',
              type: 'image',
              width: 976,
            },
            language: 'pt-BR',
            locators: {
              assetUri: '/portuguese/internacional-54187602',
              cpsUrn:
                'urn:bbc:content:assetUri:/portuguese/internacional-54187602',
            },
            summary:
              'Raros são os dias sem um novo livro sobre o presidente americano e a Casa Branca assinado por ex-assessor devoto ou desafeto do mandatário; mas que história eles contam juntos?',
            timestamp: 1600354421000,
            type: 'cps',
          },
          {
            cpsType: 'STY',
            headlines: {
              headline: "O polêmico 'sorteio de avião presidencial' no México",
              shortHeadline:
                "O polêmico 'sorteio de avião presidencial' no México",
            },
            id: 'urn:bbc:ares::asset:portuguese/internacional-54177672',
            indexImage: {
              altText: 'Sorteo del avión presidencial',
              caption:
                'Tras una intensa campaña mediática por parte del gobierno, el conocido como sorteo del avión presidencial se celebró este martes.',
              copyrightHolder: 'Reuters',
              height: 549,
              href: 'http://c.files.bbci.co.uk/148FB/production/_114391248_1cec6859-3a6c-4e85-9901-71f88fffa262.jpg',
              id: '114391248',
              path: '/cpsprodpb/148FB/production/_114391248_1cec6859-3a6c-4e85-9901-71f88fffa262.jpg',
              subType: 'index',
              type: 'image',
              width: 976,
            },
            language: 'pt-BR',
            locators: {
              assetUri: '/portuguese/internacional-54177672',
              cpsUrn:
                'urn:bbc:content:assetUri:/portuguese/internacional-54177672',
            },
            summary:
              'Um dos pontos controversos é que governo gastou seu próprio dinheiro para que hospitais pudessem concorrer em rifa em vez destinar valor diretamente ao setor de saúde.',
            timestamp: 1600266060000,
            type: 'cps',
          },
          {
            cpsType: 'STY',
            headlines: {
              headline:
                'Violência nos EUA: O impactante momento do ataque a tiros contra policiais em Los Angeles',
              shortHeadline:
                'O impactante momento do ataque a tiros contra policiais em Los Angeles',
            },
            id: 'urn:bbc:ares::asset:portuguese/internacional-54152487',
            indexImage: {
              altText: 'Video del ataquue contra policías en Los Ángeles.',
              caption: 'El video muestra el momento del ataque.',
              copyrightHolder: 'Reuters',
              height: 549,
              href: 'http://c.files.bbci.co.uk/5858/production/_114361622_hi063303195.jpg',
              id: '114361622',
              path: '/cpsprodpb/5858/production/_114361622_hi063303195.jpg',
              subType: 'index',
              type: 'image',
              width: 976,
            },
            language: 'pt-BR',
            locators: {
              assetUri: '/portuguese/internacional-54152487',
              cpsUrn:
                'urn:bbc:content:assetUri:/portuguese/internacional-54152487',
            },
            summary:
              'Dois policiais foram atacados dentro de uma viatura. Um deles está em estado grave.',
            timestamp: 1600102519000,
            type: 'cps',
          },
          {
            cpsType: 'STY',
            headlines: {
              headline:
                "'Papai, nós vamos morrer?': o desespero de uma família após megaincêndio em campo de migrantes na Grécia",
              shortHeadline:
                "'Papai, nós vamos morrer?': o desespero de uma família após megaincêndio em campo de migrantes na Grécia",
            },
            id: 'urn:bbc:ares::asset:portuguese/internacional-54120473',
            indexImage: {
              altText: 'Talibshah Hosseini with his wife and three daughters',
              caption:
                'This is now home for the Hosseini family after their tent was destroyed in the fire at Moria camp',
              copyrightHolder: 'Talibshah Hosseini',
              height: 549,
              href: 'http://c.files.bbci.co.uk/D535/production/_114318545_afghanfamilylesbos.jpg',
              id: '114318545',
              path: '/cpsprodpb/D535/production/_114318545_afghanfamilylesbos.jpg',
              subType: 'index',
              type: 'image',
              width: 976,
            },
            language: 'pt-BR',
            locators: {
              assetUri: '/portuguese/internacional-54120473',
              cpsUrn:
                'urn:bbc:content:assetUri:/portuguese/internacional-54120473',
            },
            summary:
              'Talibshah Hosseini fugiu com sua família enquanto o fogo consumia o campo com milhares de migrantes de quase 70 nacionalidades, a maioria do Afeganistão.',
            timestamp: 1599832603000,
            type: 'cps',
          },
        ],
        type: 'see-alsos',
      },
    ],
    section: {
      name: 'Brasil',
      subType: 'index',
      type: 'simple',
      uri: '/portuguese/brasil',
    },
    site: {
      name: 'BBC Brasil',
      subType: 'site',
      type: 'simple',
      uri: '/portuguese',
    },
  },
  promo: {
    headlines: {
      headline:
        '3 perguntas que a PF deve fazer a Bolsonaro em inquérito após denúncias de Sergio Moro',
      shortHeadline:
        '3 perguntas que a PF deve fazer a Bolsonaro em inquérito após denúncias de Sergio Moro',
    },
    id: 'urn:bbc:ares::asset:portuguese/brasil-54196636',
    indexImage: {
      altText:
        'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
      caption:
        'Bolsonaro e Moro vivem intensa troca de acusações desde que o ministro deixou o governo, no fim de abril',
      copyrightHolder: 'AFP',
      height: 549,
      href: 'http://c.files.bbci.co.uk/3B73/production/_112291251_whatsubject.jpg',
      id: '112291251',
      path: '/cpsprodpb/3B73/production/_112291251_whatsubject.jpg',
      subType: 'index',
      type: 'image',
      width: 976,
    },
    language: 'pt-BR',
    locators: {
      assetId: '54196636',
      assetUri: '/portuguese/brasil-54196636',
      cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-54196636',
      curie: 'http://www.bbc.co.uk/asset/f60377cf-fdf8-4e86-bd0e-cfc221210ffd',
    },
    passport: {
      campaigns: [
        {
          campaignId: '5a988e3739461b000e9dabfa',
          campaignName: 'WS - Give me perspective',
        },
      ],
      category: {
        categoryId:
          'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
        categoryName: 'News',
      },
      taggings: [],
    },
    summary:
      'Em paralelo, há uma disputa sobre o formato do depoimento do presidente à PF nos próximos dias, se ele será feito pessoalmente ou por escrito.',
    timestamp: 1600370390000,
    type: 'cps',
  },
  mostRead: {
    generated: '2019-11-06T17:03:28.745Z',
    lastRecordTimeStamp: '2100-11-06T16:57:00Z',
    firstRecordTimeStamp: '2019-11-06T16:42:00Z',
    totalRecords: 100,
    records: [
      {
        id: '720aa71d-96ef-a349-827f-c1dbb84616bd',
        count: 1208,
        urn: 'urn:bbc:curie:asset:720aa71d-96ef-a349-827f-c1dbb84616bd',
        promo: {
          headlines: {
            shortHeadline:
              '6 pontos da reforma econômica de Paulo Guedes que podem te afetar diretamente',
            headline:
              '6 pontos da reforma econômica de Paulo Guedes que podem te afetar diretamente',
          },
          locators: {
            assetUri: '/portuguese/brasil-50319850',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50319850',
            curie:
              'http://www.bbc.co.uk/asset/720aa71d-96ef-a349-827f-c1dbb84616bd',
          },
          summary:
            'Ministro do governo Bolsonaro entregou ao Congresso três propostas de alteração da Constituição que têm como objetivo reduzir gastos públicos.',
          timestamp: 1573051751579,
          byline: {
            name: 'Nathalia Passarinho - @npassarinho',
            title: 'Da BBC News Brasil em Londres',
            persons: [
              {
                name: 'Nathalia Passarinho',
                function: 'Da BBC News Brasil em Londres',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109552984',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/BF1D/production/_109552984_9258c2f6-3e50-4608-a93f-d00edadde3da.jpg',
            path: '/cpsprodpb/BF1D/production/_109552984_9258c2f6-3e50-4608-a93f-d00edadde3da.jpg',
            height: 549,
            width: 976,
            altText: 'Bolsonaro e Paulo Guedes',
            caption:
              'O ministro da Economia entregou ao Congresso Nacional três PECs com objetivo de reduzir gastos públicos',
            copyrightHolder: 'Ueslei Marcelino/Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50319850',
        },
      },
      {
        id: 'c3dcdb0b-675b-da45-9aac-4350936766ee',
        count: 320,
        urn: 'urn:bbc:curie:asset:c3dcdb0b-675b-da45-9aac-4350936766ee',
        promo: {
          headlines: {
            shortHeadline:
              'Revolta contra Igreja Universal gera morte e crise diplomática em país africano',
            headline:
              'Revolta contra Igreja Universal gera morte e crise diplomática em país africano',
          },
          locators: {
            assetUri: '/portuguese/brasil-50270551',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50270551',
            curie:
              'http://www.bbc.co.uk/asset/c3dcdb0b-675b-da45-9aac-4350936766ee',
          },
          summary:
            'Conflitos, que mobilizam congressistas e diplomatas brasileiros, tiveram início após prisão de um pastor que teria denunciado abusos da igreja contra africanos; em reação, manifestantes depredaram templos da Universal em São Tomé e Príncipe.',
          timestamp: 1573043782265,
          byline: {
            name: 'João Fellet - @joaofellet',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'João Fellet - @joaofellet',
                function: 'Da BBC Brasil em Brasília',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '109499739',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/16E67/production/_109499739_8b25f2e8-a90e-4172-8381-85b3d63da17b.jpg',
            path: '/cpsprodpb/16E67/production/_109499739_8b25f2e8-a90e-4172-8381-85b3d63da17b.jpg',
            height: 432,
            width: 768,
            altText: 'Templo da Universal em São Tomé',
            caption:
              'Polícia Militar interveio para conter a depredação de templos da Universal em São Tomé e Príncipe',
            copyrightHolder: 'IGREJA UNIVERSAL - DIVULGAÇÃO',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50270551',
        },
      },
      {
        id: '53982910-acf7-634c-a689-5cb6644f027f',
        count: 265,
        urn: 'urn:bbc:curie:asset:53982910-acf7-634c-a689-5cb6644f027f',
        promo: {
          headlines: {
            shortHeadline:
              'Massacre abala comunidade mórmon que imigrou para o México no século 19',
            headline:
              'Massacre abala comunidade mórmon que imigrou para o México no século 19',
          },
          locators: {
            assetUri: '/portuguese/geral-50314220',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50314220',
            curie:
              'http://www.bbc.co.uk/asset/53982910-acf7-634c-a689-5cb6644f027f',
          },
          summary:
            'Colônias começaram a surgir a partir dos anos 1880, quando os Estados Unidos aumentaram a repressão contra a poligamia; Igreja posteriormente abandonou a prática, que só é mantida por alguns grupos fundamentalistas.',
          timestamp: 1573034228970,
          byline: {
            name: 'Alessandra Corrêa',
            title: 'De Winston-Salem (EUA) para a BBC News Brasil',
            persons: [
              {
                name: 'Alessandra Corrêa',
                function: 'De Winston-Salem (EUA) para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109539762',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/68A9/production/_109539762_blurred_mara-ronita-miller-whole-family.jpg',
            path: '/cpsprodpb/68A9/production/_109539762_blurred_mara-ronita-miller-whole-family.jpg',
            height: 549,
            width: 976,
            altText: 'Rhonita Miller e sua família',
            caption:
              'Rhonita Miller e quatro de seus filhos foram assassinados em ataque contra veículos em que viajavam',
            copyrightHolder: 'CBS news ',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50314220',
        },
      },
      {
        id: 'b3d99f40-40e0-794a-ab1c-4ae017c4c785',
        count: 195,
        urn: 'urn:bbc:curie:asset:b3d99f40-40e0-794a-ab1c-4ae017c4c785',
        promo: {
          headlines: {
            shortHeadline:
              'Por que professores de ioga podem sofrer graves problemas no quadril',
            headline:
              'Por que professores de ioga podem sofrer graves problemas no quadril',
          },
          locators: {
            assetUri: '/portuguese/geral-50297654',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50297654',
            curie:
              'http://www.bbc.co.uk/asset/b3d99f40-40e0-794a-ab1c-4ae017c4c785',
          },
          summary:
            'Forçar seus corpos a repetir as mesmas posições de ioga está provocando um aumento nos problemas de quadril entre os professores, alerta um importante fisioterapeuta.',
          timestamp: 1573058232260,
          byline: {
            name: 'Caroline Parkinson',
            title: 'Editora de Saúde, BBC News ',
            persons: [
              {
                name: 'Caroline Parkinson',
                function: 'Health editor, BBC News website',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
            ],
          },
          indexImage: {
            id: '109368828',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/143C6/production/_109368828_yoga.jpg',
            path: '/cpsprodpb/143C6/production/_109368828_yoga.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher fazendo ioga',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50297654',
        },
      },
      {
        id: 'ded3d08e-d686-ce42-9ce1-7b399bd009ff',
        count: 184,
        urn: 'urn:bbc:curie:asset:ded3d08e-d686-ce42-9ce1-7b399bd009ff',
        promo: {
          headlines: {
            shortHeadline: "'Fui demitido por me apaixonar no trabalho'",
            headline: "'Fui demitido por me apaixonar no trabalho'",
          },
          locators: {
            assetUri: '/portuguese/geral-50311500',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50311500',
            curie:
              'http://www.bbc.co.uk/asset/ded3d08e-d686-ce42-9ce1-7b399bd009ff',
          },
          summary:
            'Gary Lyon perdeu seu emprego como gerente de uma empresa por namorar uma subordinada, um caso que lança uma luz sobre as dificuldades que funcionários podem enfrentar com romances no local de trabalho.',
          timestamp: 1573057002009,
          byline: {
            name: 'Robert Plummer',
            title: 'BBC News',
            persons: [
              {
                name: 'Robert Plummer',
                function: 'Business reporter, BBC News',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109517103',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/75DB/production/_109517103_img_8461.jpg',
            path: '/cpsprodpb/75DB/production/_109517103_img_8461.jpg',
            height: 549,
            width: 976,
            altText: 'Gary and Tamra Lyon',
            copyrightHolder: 'Gary Lyon',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50311500',
        },
      },
      {
        id: 'b6c56409-cadb-754e-ad63-ff7c543836e1',
        count: 146,
        urn: 'urn:bbc:curie:asset:b6c56409-cadb-754e-ad63-ff7c543836e1',
        promo: {
          headlines: {
            shortHeadline:
              'Quais países produzem mais petróleo e o que isso representa no xadrez mundial',
            headline:
              'Quais países produzem mais petróleo e o que isso representa no xadrez mundial',
          },
          locators: {
            assetUri: '/portuguese/internacional-49763991',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-49763991',
            curie:
              'http://www.bbc.co.uk/asset/b6c56409-cadb-754e-ad63-ff7c543836e1',
          },
          summary:
            'Preço, inflação, relações diplomáticas e até a religião influenciam na cotação do barril do petróleo, alterada nos últimos dias pelos ataques a instalações do segundo maior produtor mundial, a Arábia Saudita.',
          timestamp: 1569536756323,
          byline: {
            name: 'Cristina J. Orgaz',
            title: 'BBC News Mundo',
            persons: [
              { name: 'Cristina J. Orgaz', function: 'BBC News Mundo' },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '108860242',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/5E8E/production/_108860242_gettyimages-1726904.jpg',
            path: '/cpsprodpb/5E8E/production/_108860242_gettyimages-1726904.jpg',
            height: 549,
            width: 976,
            altText: 'Campos de petróleo',
            caption:
              'El lunes, cuando abrieron los mercados bursátiles, el precio del barril de crudo aumentó entre un 15% y un 20%, con el Brent alcanzando un pico del US$71,95 en un determinado momento.',
            copyrightHolder: 'Joe Raedle',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-49763991',
        },
      },
      {
        id: '324d1edb-7e98-9e40-a117-2a510b1f38d6',
        count: 114,
        urn: 'urn:bbc:curie:asset:324d1edb-7e98-9e40-a117-2a510b1f38d6',
        promo: {
          headlines: {
            shortHeadline:
              "'Emagreci 20 quilos durante a gravidez e os médicos não entendiam por quê'",
            headline:
              "'Emagreci 20 quilos durante a gravidez e os médicos não entendiam por quê'",
          },
          locators: {
            assetUri: '/portuguese/geral-50268015',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50268015',
            curie:
              'http://www.bbc.co.uk/asset/324d1edb-7e98-9e40-a117-2a510b1f38d6',
          },
          summary:
            'Michelle Munhoz ficou tão fraca que sequer conseguia segurar seu bebê recém-nascido, e diagnóstico correto só chegou após o fim da gestação, quando doença estava em estágio avançado.',
          timestamp: 1572943814447,
          byline: {
            name: 'Vinícius Lemos',
            title: 'De Cuiabá para BBC News Brasil',
            persons: [
              {
                name: 'Vinícius Lemos',
                function: 'De Cuiabá para BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109524321',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/3036/production/_109524321_michelle3.jpg',
            path: '/cpsprodpb/3036/production/_109524321_michelle3.jpg',
            height: 549,
            width: 976,
            altText: 'Michelle e o marido, durante o chá de bebê do filho',
            caption:
              "Michelle e o marido, durante o chá de bebê do filho; convidados 'estranhavam a minha aparência, porque eu estava muito mal', conta",
            copyrightHolder: 'Arquivo pessoal',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50268015',
        },
      },
      {
        id: '12feae81-b95f-124f-b2a5-488274fb9ea8',
        count: 105,
        urn: 'urn:bbc:curie:asset:12feae81-b95f-124f-b2a5-488274fb9ea8',
        promo: {
          headlines: {
            shortHeadline:
              'Quais são os países com as maiores reservas de petróleo e por que isso não é sempre um sinal de riqueza',
            headline:
              'Quais são os países com as maiores reservas de petróleo e por que isso não é sempre um sinal de riqueza',
          },
          locators: {
            assetUri: '/portuguese/internacional-47795371',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-47795371',
            curie:
              'http://www.bbc.co.uk/asset/12feae81-b95f-124f-b2a5-488274fb9ea8',
          },
          summary:
            'Recurso natural continua a ser principal fonte de energia do mundo e fator determinante na política internacional, mas nem sempre o chamado ouro negro se traduz em bonança. Entenda algumas das razões.',
          timestamp: 1554647218365,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Analysis',
              categoryName: 'Analysis',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '106258066',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/10225/production/_106258066_pumps-2.jpg',
            path: '/cpsprodpb/10225/production/_106258066_pumps-2.jpg',
            height: 549,
            width: 976,
            altText: 'Grua de extração de petróleo',
            caption:
              'A facilidade de extração de petróleo, as relações comerciais e externas do país e sua política tributária influenciam a rentabilidade da produção',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-47795371',
        },
      },
      {
        id: '9fe755bc-7fa5-db49-a1d5-1b5b6ea33821',
        count: 89,
        urn: 'urn:bbc:curie:asset:9fe755bc-7fa5-db49-a1d5-1b5b6ea33821',
        promo: {
          headlines: {
            shortHeadline:
              'Presidente do Chile nega renúncia, mas admite mudar Constituição de Pinochet',
            headline:
              'Protestos no Chile: presidente Sebastian Piñera diz à BBC que não renuncia, mas admite mudar Constituição da ditadura',
          },
          locators: {
            assetUri: '/portuguese/internacional-50300490',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50300490',
            curie:
              'http://www.bbc.co.uk/asset/9fe755bc-7fa5-db49-a1d5-1b5b6ea33821',
          },
          summary:
            'Em entrevista à BBC, a primeira desde que a crise se instalou, Piñera defende sua decisão de decretar estado de emergência (e assim colocar militares nas ruas), trata das divisões políticas e econômicas no Chile e assegura que, apesar dos pedidos por sua renúncia, não pensa em fazê-lo.',
          timestamp: 1572969751237,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109528813',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/7C8A/production/_109528813_piera-entrevista-bbc02.png',
            path: '/cpsprodpb/7C8A/production/_109528813_piera-entrevista-bbc02.png',
            height: 549,
            width: 976,
            altText: 'Sebastián Piñera.',
            caption:
              'El presidente de Chile, Sebastián Piñera, habló con la BBC y dijo que no piensa renunciar tras la ola de protestas en el país.',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50300490',
        },
      },
      {
        id: 'cde119db-492d-fd4c-b488-89601607c5ae',
        count: 87,
        urn: 'urn:bbc:curie:asset:cde119db-492d-fd4c-b488-89601607c5ae',
        promo: {
          headlines: {
            shortHeadline:
              "McDonald’s pede desculpas por promoção 'Sundae Sangrento'",
            headline:
              "McDonald’s pede desculpas por promoção 'Sundae Sangrento'",
          },
          locators: {
            assetUri: '/portuguese/internacional-50243190',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50243190',
            curie:
              'http://www.bbc.co.uk/asset/cde119db-492d-fd4c-b488-89601607c5ae',
          },
          summary:
            'Slogan faz trocadilho com termo usado para se referir a um dos dias mais trágicos dos confrontos na Irlanda do Norte; rede afirma que se tratava apenas de promoção de Halloween e que intenção não era ofender.',
          timestamp: 1572550787500,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '108216676',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1084D/production/_108216676_mcdonalds.jpg',
            path: '/cpsprodpb/1084D/production/_108216676_mcdonalds.jpg',
            height: 549,
            width: 976,
            altText: "McDonald's sign",
            copyrightHolder: 'PA Media',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50243190',
        },
      },
      {
        id: '386bf56a-cddb-4c44-a2f9-fd99097a4c14',
        count: 68,
        urn: 'urn:bbc:curie:asset:386bf56a-cddb-4c44-a2f9-fd99097a4c14',
        promo: {
          headlines: {
            shortHeadline:
              'De salários menores para servidores a menos municípios, os desafios do megapacote de Guedes no Congresso',
            headline:
              'De salários menores para servidores a menos municípios, os desafios do megapacote de Guedes no Congresso',
          },
          locators: {
            assetUri: '/portuguese/brasil-50311515',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50311515',
            curie:
              'http://www.bbc.co.uk/asset/386bf56a-cddb-4c44-a2f9-fd99097a4c14',
          },
          summary:
            'Governo Bolsonaro lança Plano Mais Brasil com promessa de equilibrar contas públicas e recuperar investimentos no país, mas depende da articulação com parlamentares para aprovar pontos mais controvertidos.',
          timestamp: 1572993870751,
          byline: {
            name: 'Mariana Schreiber - @marischreiber',
            title: 'Da BBC News Brasil em Brasília',
            persons: [
              {
                name: 'Mariana Schreiber - @marischreiber',
                function: 'Da BBC News Brasil em Brasília',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109543072',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/699A/production/_109543072_hi057797824.jpg',
            path: '/cpsprodpb/699A/production/_109543072_hi057797824.jpg',
            height: 549,
            width: 976,
            altText:
              'Paulo Guedes e Jair Bolsonaro aparecem abraçados e de perfil',
            caption:
              'O ministro da Economia, Paulo Guedes, e o presidente Jair Bolsonaro; projeto foi entregue ao Congresso nessa terça-feira',
            copyrightHolder: 'REUTERS/Ueslei Marcelino',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50311515',
        },
      },
      {
        id: '4c1092da-6f30-3247-b8da-a787b59607d4',
        count: 67,
        urn: 'urn:bbc:curie:asset:4c1092da-6f30-3247-b8da-a787b59607d4',
        promo: {
          headlines: {
            shortHeadline: "'A selfie que revelou que fui roubada quando bebê'",
            headline: "'A selfie que revelou que fui roubada quando bebê'",
          },
          locators: {
            assetUri: '/portuguese/internacional-50215071',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50215071',
            curie:
              'http://www.bbc.co.uk/asset/4c1092da-6f30-3247-b8da-a787b59607d4',
          },
          summary:
            'Aos 17 anos, Miché Solomon descobriu que tinha duas mães – uma verdadeira e outra falsa.',
          timestamp: 1572695107205,
          byline: {
            name: 'Sarah McDermott',
            title: 'BBC World Service',
            persons: [
              { name: 'Sarah McDermott', function: 'BBC World Service' },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e2139461b000e9dabf7',
                campaignName: 'WS - Inspire me',
              },
              {
                campaignId: '5a988e3139461b000e9dabf9',
                campaignName: 'WS - Divert me',
              },
            ],
          },
          indexImage: {
            id: '109373368',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/15141/production/_109373368_micheselfie976.jpg',
            path: '/cpsprodpb/15141/production/_109373368_micheselfie976.jpg',
            height: 549,
            width: 976,
            altText: 'Miche and Cassidy',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50215071',
        },
      },
      {
        id: '2847ad7a-378c-624b-a282-43c9db44bd28',
        count: 65,
        urn: 'urn:bbc:curie:asset:2847ad7a-378c-624b-a282-43c9db44bd28',
        promo: {
          headlines: {
            shortHeadline:
              'O drama das araras-azuis e outros animais sob risco de extinção e acuados pelo fogo no Pantanal',
            headline:
              'O drama das araras-azuis e outros animais sob risco de extinção e acuados pelo fogo no Pantanal',
          },
          locators: {
            assetUri: '/portuguese/brasil-50311305',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50311305',
            curie:
              'http://www.bbc.co.uk/asset/2847ad7a-378c-624b-a282-43c9db44bd28',
          },
          summary:
            'Dados do Inpe mostram que, em números absolutos, os incêndios em todo o bioma Pantanal saltaram de 1.147 entre agosto e outubro de 2018 para 6.958 no mesmo período de 2019',
          timestamp: 1573059525330,
          byline: {
            name: 'Evanildo da Silveira',
            title: 'De São Paulo para a BBC News Brasil',
            persons: [
              {
                name: 'Evanildo da Silveira',
                function: 'De São Paulo para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109542884',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/BEB8/production/_109542884_ararascomendococonocho.fotoneivaguedes.jpg',
            path: '/cpsprodpb/BEB8/production/_109542884_ararascomendococonocho.fotoneivaguedes.jpg',
            height: 549,
            width: 976,
            altText: 'Araras comem cocos no chão',
            caption:
              'Araras comem cocos no chão; fogo aumenta ainda mais o risco de que algumas espécies ameaçadas de extinção desapareçam',
            copyrightHolder: 'Cezar Corrêa',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50311305',
        },
      },
      {
        id: 'bf28fed4-e701-104d-92b3-dfbc74182a47',
        count: 62,
        urn: 'urn:bbc:curie:asset:bf28fed4-e701-104d-92b3-dfbc74182a47',
        promo: {
          headlines: {
            shortHeadline: '4 pontos para entender os protestos no Chile',
            headline: '4 pontos para entender os protestos no Chile',
          },
          locators: {
            assetUri: '/portuguese/internacional-50130830',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50130830',
            curie:
              'http://www.bbc.co.uk/asset/bf28fed4-e701-104d-92b3-dfbc74182a47',
          },
          summary:
            'A desigualdade social, a resposta tardia do governo às mobilizações, as expectativas não cumpridas e o papel dos estudantes explicam parte do que está acontecendo hoje no país sul-americano.',
          timestamp: 1571857747243,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '109346395',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/E7E4/production/_109346395_chileepa.jpg',
            path: '/cpsprodpb/E7E4/production/_109346395_chileepa.jpg',
            height: 549,
            width: 976,
            altText: 'Manifestantes nas ruas de Santiago nesta quarta-feira',
            caption:
              'Manifestantes nas ruas de Santiago nesta quarta-feira, sexto dia consecutivo de protestos no país',
            copyrightHolder: 'EPA',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50130830',
        },
      },
      {
        id: '7e3509dd-c51f-3c45-bc85-4905193fc087',
        count: 54,
        urn: 'urn:bbc:curie:asset:7e3509dd-c51f-3c45-bc85-4905193fc087',
        promo: {
          headlines: {
            shortHeadline:
              'Como a Europa multiplicou suas florestas (e por que isso pode ser um problema)',
            headline:
              'Como a Europa multiplicou suas florestas (e por que isso pode ser um problema)',
          },
          locators: {
            assetUri: '/portuguese/internacional-50162105',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50162105',
            curie:
              'http://www.bbc.co.uk/asset/7e3509dd-c51f-3c45-bc85-4905193fc087',
          },
          summary:
            'Só nos últimos 30 anos, a área florestal europeia foi ampliada em uma área equivalente ao tamanho do Uruguai, mas isso não é de todo benéfico, apontam estudos recentes.',
          timestamp: 1572790496395,
          byline: {
            name: 'Rafael Barifouse',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Felipe Souza e Rafael Barifouse',
                function: 'Da BBC Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109348312',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/5388/production/_109348312_gettyimages-1038870630.jpg',
            path: '/cpsprodpb/5388/production/_109348312_gettyimages-1038870630.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher diante de floresta na Europa',
            caption:
              'Florestas cobrem hoje uma área 10% maior do que antes da Revolução Industrial na Europa',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50162105',
        },
      },
      {
        id: '2bef1663-722f-a847-9a69-659424248576',
        count: 54,
        urn: 'urn:bbc:curie:asset:2bef1663-722f-a847-9a69-659424248576',
        promo: {
          headlines: {
            shortHeadline:
              'Quando ser preguiçoso pode ser bom para a saúde, segundo a ciência',
            headline:
              '‘Orgulho de ser preguiçosa’: não fazer nada pode ser bom para a saúde, segundo a ciência',
          },
          locators: {
            assetUri: '/portuguese/geral-50294614',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50294614',
            curie:
              'http://www.bbc.co.uk/asset/2bef1663-722f-a847-9a69-659424248576',
          },
          summary:
            'Lucy Gransbury admite que é preguiçosa – e diz que pessoas como ela deveriam ser mais valorizadas, já que muitas invenções são motivadas pelo desejo de fazer menos esforço.',
          timestamp: 1572962385305,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e1739461b000e9dabf6',
                campaignName: 'WS - CS',
              },
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109527678',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/15678/production/_109527678_mediaitem109449952.jpg',
            path: '/cpsprodpb/15678/production/_109527678_mediaitem109449952.jpg',
            height: 549,
            width: 976,
            altText: 'Lucy com preguiça deitada no sofá',
            caption: 'Lucy diz que o ócio aumenta a criatividade',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50294614',
        },
      },
      {
        id: '5af47c6b-5a1a-7146-93be-a599c73634a0',
        count: 52,
        urn: 'urn:bbc:curie:asset:5af47c6b-5a1a-7146-93be-a599c73634a0',
        promo: {
          headlines: {
            shortHeadline:
              '‘Megaleilão’ do pré-sal pode inaugurar ‘era de ouro’ do petróleo brasileiro?',
            headline:
              '‘Megaleilão’ do pré-sal pode inaugurar ‘era de ouro’ do petróleo brasileiro?',
          },
          locators: {
            assetUri: '/portuguese/brasil-50310835',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50310835',
            curie:
              'http://www.bbc.co.uk/asset/5af47c6b-5a1a-7146-93be-a599c73634a0',
          },
          summary:
            'Governo espera arrecadar valor recorde de R$ 106,5 bilhões em oferta por quatro campos da Bacia de Santos nesta quarta-feira; perfil das áreas em leilão, onde as reservas já são conhecidas, é característica inédita em disputas no setor de óleo e gás no país.',
          timestamp: 1573057865857,
          byline: {
            name: 'Vitor Hugo Brandalise',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Vitor Hugo Brandalise',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '98391113',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/798F/production/_98391113_33e3bdeb-259b-466a-a128-90a32b827db6.jpg',
            path: '/cpsprodpb/798F/production/_98391113_33e3bdeb-259b-466a-a128-90a32b827db6.jpg',
            height: 549,
            width: 976,
            altText: 'Plataforma offshore da Petrobras em Angra dos Reis',
            caption:
              'Na maioria dos leilões, o vencedor ganha o direito de explorar uma área em que há reservatórios, mas sem a certeza de que de fato encontrará petróleo; um fato inédito da disputa desta quarta é que já se conhecem as reservas',
            copyrightHolder: 'AFP',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50310835',
        },
      },
      {
        id: '033be422-7e73-11e5-8974-248c3db9bd6e',
        count: 48,
        urn: 'urn:bbc:curie:asset:033be422-7e73-11e5-8974-248c3db9bd6e',
        promo: {
          headlines: {
            shortHeadline: 'A curiosa origem do Dia das Bruxas',
            headline: 'A curiosa origem do Dia das Bruxas',
          },
          locators: {
            assetUri: '/portuguese/noticias/2015/10/151029_origem_halloween_rb',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2015/10/151029_origem_halloween_rb',
            curie:
              'http://www.bbc.co.uk/asset/033be422-7e73-11e5-8974-248c3db9bd6e',
          },
          summary:
            'Normalmente associado aos Estados Unidos, festival pagão começou há séculos atrás no Reino Unido; hoje, é o principal feriado não cristão em diversos países.',
          timestamp: 1550184540343,
          passport: {},
          indexImage: {
            id: 'd5e205',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2014/10/31/141031212700_halloween_promo_144x81_epa_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2014/10/31/141031212700_halloween_promo_144x81_epa_nocredit.jpg',
            height: 81,
            width: 144,
            altText: 'EPA',
            copyrightHolder: 'EPA',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2015/10/151029_origem_halloween_rb',
        },
      },
      {
        id: '03dc7c00-e383-e34c-a2cc-75adc76b8a12',
        count: 46,
        urn: 'urn:bbc:curie:asset:03dc7c00-e383-e34c-a2cc-75adc76b8a12',
        promo: {
          headlines: {
            shortHeadline:
              'A organização americana por trás dos protestos contra o aborto em frente a hospital de São Paulo',
            headline:
              'A organização americana por trás dos protestos contra o aborto em frente a hospital de São Paulo',
          },
          locators: {
            assetUri: '/portuguese/brasil-50267577',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50267577',
            curie:
              'http://www.bbc.co.uk/asset/03dc7c00-e383-e34c-a2cc-75adc76b8a12',
          },
          summary:
            'Hospital Pérola Byington dá atendimento ginecológico e psicológico a pacientes que foram vítimas de estupro, para quem aborto é legal no Brasil em caso de gravidez decorrente do crime.',
          timestamp: 1572641980274,
          byline: {
            name: 'Letícia Mori - @_leticiamori',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Letícia Mori',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109496438',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1460D/production/_109496438_whatsappimage2019-11-01at12.31.00.jpg',
            path: '/cpsprodpb/1460D/production/_109496438_whatsappimage2019-11-01at12.31.00.jpg',
            height: 549,
            width: 976,
            altText: 'Barraca do grupo "40 Dias pela Vida"',
            caption:
              'O grupo contratou dois "guardas" para acompanhar a barraca durante a campanha',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50267577',
        },
      },
      {
        id: '22361fd9-aaf0-cb4a-9c90-02bea1043cd1',
        count: 43,
        urn: 'urn:bbc:curie:asset:22361fd9-aaf0-cb4a-9c90-02bea1043cd1',
        promo: {
          headlines: {
            shortHeadline:
              'Desinstalar o WhatsApp pode deixar o celular mais seguro?',
            headline:
              'Golpe de hackers no WhatsApp: desinstalar o app deixa o celular mais seguro?',
          },
          locators: {
            assetUri: '/portuguese/geral-50314341',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50314341',
            curie:
              'http://www.bbc.co.uk/asset/22361fd9-aaf0-cb4a-9c90-02bea1043cd1',
          },
          summary:
            'Com a confirmação oficial do WhatsApp de que o aplicativo foi usado para instalar um programa espião em celulares, muitos passaram a cogitar apagar o popular aplicativo de mensagens. Mas especialistas afirmam que o caminho não é esse.',
          timestamp: 1573042160642,
          passport: {},
          indexImage: {
            id: '109515301',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/286F/production/_109515301_gettyimages-1160105177.jpg',
            path: '/cpsprodpb/286F/production/_109515301_gettyimages-1160105177.jpg',
            height: 549,
            width: 976,
            altText:
              'WhatsApp is one of the biggest instant messaging apps in the world',
            caption:
              'WhatsApp is one of the biggest instant messaging apps in the world',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50314341',
        },
      },
      {
        id: '1c8af3df-d391-684e-9018-e578f4d282c9',
        count: 42,
        urn: 'urn:bbc:curie:asset:1c8af3df-d391-684e-9018-e578f4d282c9',
        promo: {
          headlines: {
            shortHeadline:
              'Desnutrição, abusos e mortes fazem da Amazônia o pior lugar do Brasil para ser criança',
            headline:
              'Desnutrição, abusos e mortes fazem da Amazônia o pior lugar do Brasil para ser criança',
          },
          locators: {
            assetUri: '/portuguese/brasil-50215491',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50215491',
            curie:
              'http://www.bbc.co.uk/asset/1c8af3df-d391-684e-9018-e578f4d282c9',
          },
          summary:
            'BBC News Brasil ouviu educadores, agentes de saúde, assistentes sociais, pesquisadores acadêmicos promotores de Justiça, ONGs e moradores da região, que alertam: não vai dar para salvar o meio ambiente sem preservar e fortalecer o futuro da população local, cuja vulnerabilidade favorece a cultura do ilegalismo.',
          timestamp: 1573053551531,
          byline: {
            name: 'Ligia Guimarães ',
            title: 'Da BBC News Brasil em São Paulo ',
            persons: [
              {
                name: 'Ligia Guimarães',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
            ],
          },
          indexImage: {
            id: '109519884',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/BEFB/production/_109519884_amazonia1.jpg',
            path: '/cpsprodpb/BEFB/production/_109519884_amazonia1.jpg',
            height: 549,
            width: 976,
            altText: 'ilustração de criança na amazônia',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50215491',
        },
      },
      {
        id: '5082ec55-a37a-6c44-bdef-cbf56badb5ce',
        count: 39,
        urn: 'urn:bbc:curie:asset:5082ec55-a37a-6c44-bdef-cbf56badb5ce',
        promo: {
          headlines: {
            shortHeadline:
              'Euforia, crise e megaleilão: os altos e baixos do pré-sal',
            headline:
              'Euforia, crise e megaleilão: os altos e baixos do pré-sal',
          },
          locators: {
            assetUri: '/portuguese/brasil-50311115',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50311115',
            curie:
              'http://www.bbc.co.uk/asset/5082ec55-a37a-6c44-bdef-cbf56badb5ce',
          },
          summary:
            'Governo espera arrecadar até R$ 106,6 bilhões em leilão de excedente da cessão onerosa.',
          timestamp: 1573041367348,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Analysis',
              categoryName: 'Analysis',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '109542692',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/73B8/production/_109542692_mediaitem109542691.jpg',
            path: '/cpsprodpb/73B8/production/_109542692_mediaitem109542691.jpg',
            height: 549,
            width: 976,
            altText: 'Sede da Petrobras',
            copyrightHolder: 'Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50311115',
        },
      },
      {
        id: 'ed6c5cfc-9b07-8144-abd0-b3609ea0646b',
        count: 37,
        urn: 'urn:bbc:curie:asset:ed6c5cfc-9b07-8144-abd0-b3609ea0646b',
        promo: {
          headlines: {
            shortHeadline:
              '‘Meu marido apertou minha mão para dizer que queria viver, então descobri um jeito de salvá-lo’',
            headline:
              '‘Meu marido apertou minha mão para dizer que queria viver, então descobri um jeito de salvá-lo’',
          },
          locators: {
            assetUri: '/portuguese/internacional-50295731',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50295731',
            curie:
              'http://www.bbc.co.uk/asset/ed6c5cfc-9b07-8144-abd0-b3609ea0646b',
          },
          summary:
            'Quando Tom Patterson contraiu superbactéria, sua mulher, Steffanie, teve que correr contra o tempo para descobrir como curá-lo.',
          timestamp: 1572949395524,
          byline: {
            name: 'Natasha Lipman',
            title: 'BBC',
            persons: [
              { name: 'Natasha Lipman', function: 'BBC World Service' },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e2139461b000e9dabf7',
                campaignName: 'WS - Inspire me',
              },
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109525479',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/17CAC/production/_109525479_tom_steffanie976700.jpg',
            path: '/cpsprodpb/17CAC/production/_109525479_tom_steffanie976700.jpg',
            height: 549,
            width: 976,
            altText: 'Tom Patterson e sua mulher, Steffanie',
            caption:
              'Patterson contraiu infecção por superbactéria durante viagem ao Egito',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50295731',
        },
      },
      {
        id: '7b8b0510-324c-624d-b6eb-282b703b6daa',
        count: 36,
        urn: 'urn:bbc:curie:asset:7b8b0510-324c-624d-b6eb-282b703b6daa',
        promo: {
          headlines: {
            shortHeadline:
              'Desigualdade na China: a jovem que se alimentou só de arroz e pimenta por 5 anos',
            headline:
              'Desigualdade na China: a jovem que se alimentou só de arroz e pimenta por 5 anos',
          },
          locators: {
            assetUri: '/portuguese/geral-50288203',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50288203',
            curie:
              'http://www.bbc.co.uk/asset/7b8b0510-324c-624d-b6eb-282b703b6daa',
          },
          summary:
            'Quando veio à tona, o caso da estudante Wu Huayan, 24, causou comoção e revolta na China contra autoridades por não terem identificado antes o quadro de dificuldade e desnutrição e prestado ajuda.',
          timestamp: 1572865665491,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109516112',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/52A9/production/_109516112_gettyimages-160200624.jpg',
            path: '/cpsprodpb/52A9/production/_109516112_gettyimages-160200624.jpg',
            height: 549,
            width: 976,
            altText:
              'La ciudad de Guiyang está en una de las regiones menos desarrolladas de China.',
            caption:
              'La ciudad de Guiyang está en una de las regiones menos desarrolladas de China.',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50288203',
        },
      },
      {
        id: '90048967-1d7e-0646-858d-d097c0d68979',
        count: 35,
        urn: 'urn:bbc:curie:asset:90048967-1d7e-0646-858d-d097c0d68979',
        promo: {
          headlines: {
            shortHeadline:
              'A espetacular imagem da Via Láctea refletida em deserto de sal que ganhou homenagem da Nasa',
            headline:
              'A espetacular imagem da Via Láctea refletida em deserto de sal que ganhou homenagem da Nasa',
          },
          locators: {
            assetUri: '/portuguese/internacional-50274440',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50274440',
            curie:
              'http://www.bbc.co.uk/asset/90048967-1d7e-0646-858d-d097c0d68979',
          },
          summary:
            'O fotógrafo peruano Jheison Huerta levou três anos para fazer essa imagem da nossa galáxia, vista do salar de Uyuni, a Bolivia',
          timestamp: 1572720371138,
          byline: {
            name: 'Alejandra Martins',
            title: 'BBC News Mundo',
            persons: [
              { name: 'Alejandra Martins', function: 'BBC News Mundo' },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109476426',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/F403/production/_109476426_jheison3.png',
            path: '/cpsprodpb/F403/production/_109476426_jheison3.png',
            height: 549,
            width: 976,
            altText: 'Foto de Jheison Huerta y la Vía Láctea',
            caption:
              'La NASA seleccionó como "foto astronómica del día" esta imagen de la Vía Láctea captada por Jheison Huerta en el Salar de Uyuni.',
            copyrightHolder: '© Jheison Huerta',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50274440',
        },
      },
      {
        id: '8e93bae6-5015-1946-aa89-c864ca0ceda5',
        count: 35,
        urn: 'urn:bbc:curie:asset:8e93bae6-5015-1946-aa89-c864ca0ceda5',
        promo: {
          headlines: {
            shortHeadline:
              'Acusados de assassinato fogem de prisão por buraco de 56 cm no teto',
            headline:
              'Acusados de assassinato fogem de prisão por buraco de 56 cm no teto',
          },
          locators: {
            assetUri: '/portuguese/geral-50314342',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50314342',
            curie:
              'http://www.bbc.co.uk/asset/8e93bae6-5015-1946-aa89-c864ca0ceda5',
          },
          summary:
            'As autoridades do Estado americano da Califórnia ofereceram uma recompensa de US$ 5 mil (quase R$ 20 mil) por informações sobre o paradeiro deles.',
          timestamp: 1573039510472,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '109543432',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/5B8A/production/_109543432_jailescape1.png',
            path: '/cpsprodpb/5B8A/production/_109543432_jailescape1.png',
            height: 549,
            width: 976,
            altText:
              'The 22in (55cm) wide hole the murder suspects cut and crawled through at the jail in Monterey County',
            caption:
              'The 22in (55cm) wide hole the murder suspects cut and crawled through at the jail in Monterey County',
            copyrightHolder: "Monterey County Sheriff's Office",
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50314342',
        },
      },
      {
        id: '7cbb8a1b-9f4d-d142-ae0f-2b973aeca99c',
        count: 34,
        urn: 'urn:bbc:curie:asset:7cbb8a1b-9f4d-d142-ae0f-2b973aeca99c',
        promo: {
          headlines: {
            shortHeadline:
              'Qual a diferença entre facebook e FACEBOOK - e por que a empresa usará as 2 marcas',
            headline:
              'Qual a diferença entre facebook e FACEBOOK - e por que a empresa usará as 2 marcas',
          },
          locators: {
            assetUri: '/portuguese/geral-50297509',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50297509',
            curie:
              'http://www.bbc.co.uk/asset/7cbb8a1b-9f4d-d142-ae0f-2b973aeca99c',
          },
          summary:
            'Em uma tentativa de distinguir a empresa de seu principal serviço de mídia social, outros serviços e aplicativos, como Instagram e WhatsApp, usarão a nova marca.',
          timestamp: 1573042366219,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109529537',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/11F78/production/_109529537_facebookfacebook.jpg',
            path: '/cpsprodpb/11F78/production/_109529537_facebookfacebook.jpg',
            height: 549,
            width: 976,
            altText: "Facebook logo with people's heads",
            copyrightHolder: 'Facebook',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50297509',
        },
      },
      {
        id: 'ceb4d19f-5748-1d41-b911-6307c4084d5b',
        count: 29,
        urn: 'urn:bbc:curie:asset:ceb4d19f-5748-1d41-b911-6307c4084d5b',
        promo: {
          headlines: {
            shortHeadline:
              "O missionário que virou ateu após viver com índios brasileiros e fez uma das maiores 'descobertas' da história da linguagem",
            headline:
              "O missionário que virou ateu após viver com índios brasileiros e fez uma das maiores 'descobertas' da história da linguagem",
          },
          locators: {
            assetUri: '/portuguese/geral-50256895',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50256895',
            curie:
              'http://www.bbc.co.uk/asset/ceb4d19f-5748-1d41-b911-6307c4084d5b',
          },
          summary:
            'Americano Daniel Everett criou hipótese sobre história da linguística que desafia a tese mais corrente, de Noam Chomsky, sob influência direta de suas 3 décadas passadas na Amazônia.',
          timestamp: 1572903507647,
          byline: {
            name: 'Paula Adamo Idoeta - @paulaidoeta',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Paula Adamo Idoeta',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
            ],
          },
          indexImage: {
            id: '109485340',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1106/production/_109485340_everett1.jpg',
            path: '/cpsprodpb/1106/production/_109485340_everett1.jpg',
            height: 549,
            width: 976,
            altText: 'Daniel Everett na Amazônia',
            caption:
              'Daniel Everett na Amazônia; ao conviver com índios pirahã, o então missionário se tornou ateu e criou teoria linguística que desafia a tese prevalente',
            copyrightHolder: 'Arquivo pessoal',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50256895',
        },
      },
      {
        id: '443a6ceb-428d-e04a-95bc-462dddf486c0',
        count: 29,
        urn: 'urn:bbc:curie:asset:443a6ceb-428d-e04a-95bc-462dddf486c0',
        promo: {
          headlines: {
            shortHeadline:
              'Como aliviar a tosse do bebê? Veja o que funciona, de acordo com a ciência',
            headline:
              'Como aliviar a tosse do bebê? Veja o que funciona, de acordo com a ciência',
          },
          locators: {
            assetUri: '/portuguese/geral-44853967',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-44853967',
            curie:
              'http://www.bbc.co.uk/asset/443a6ceb-428d-e04a-95bc-462dddf486c0',
          },
          summary:
            'Em casos mais graves de ataque de tosse, pode ser necessário levar a criança ao médico, mas, na maioria dos casos, a causa é bem menos preocupante, e os cuidados, relativamente simples.',
          timestamp: 1564753686824,
          byline: {
            name: 'Mariana Lenharo',
            title: 'De Nova York para BBC News Brasil',
            persons: [
              {
                name: 'Antoine Morel',
                function: 'De São Paulo para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '102556764',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/B6AD/production/_102556764_gettyimages-874940152.jpg',
            path: '/cpsprodpb/B6AD/production/_102556764_gettyimages-874940152.jpg',
            height: 549,
            width: 976,
            altText: 'Bebê chorando',
            caption:
              'Em casos graves de ataque de tosse, os pais devem levar o bebê ao médico',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-44853967',
        },
      },
      {
        id: '3e0a178c-8510-0d44-856a-5e4894d02e3e',
        count: 29,
        urn: 'urn:bbc:curie:asset:3e0a178c-8510-0d44-856a-5e4894d02e3e',
        promo: {
          headlines: {
            shortHeadline:
              'O que o Brasil ainda vende e compra da Venezuela em crise',
            headline:
              'O que o Brasil ainda vende e compra da Venezuela em crise',
          },
          locators: {
            assetUri: '/portuguese/brasil-50229367',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50229367',
            curie:
              'http://www.bbc.co.uk/asset/3e0a178c-8510-0d44-856a-5e4894d02e3e',
          },
          summary:
            'Apesar das críticas de Bolsonaro e das ameaças de sanções, hoje a Venezuela ainda é o 72º país do qual o Brasil mais importa e a 59º colocada nas nossas exportações',
          timestamp: 1572907158314,
          byline: {
            name: 'Talita Marchao',
            title: 'De São Paulo para a BBC News Brasil',
            persons: [
              {
                name: 'Talita Marchao',
                function: 'De São Paulo para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109262034',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/A812/production/_109262034_vene4.jpg',
            path: '/cpsprodpb/A812/production/_109262034_vene4.jpg',
            height: 549,
            width: 976,
            altText: 'Nicolás Maduro',
            caption:
              'Mesmo sem reconhecer o governo de Nicolás Maduro na Venezuela, o Brasil mantém negociações comerciais com o chavismo',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50229367',
        },
      },
      {
        id: '283af5b3-8b4f-684e-8300-75e87ee50459',
        count: 29,
        urn: 'urn:bbc:curie:asset:283af5b3-8b4f-684e-8300-75e87ee50459',
        promo: {
          headlines: {
            shortHeadline:
              'Suécia, o país onde deputados não têm assessores, dormem em quitinete e pagam pelo cafezinho',
            headline:
              'Suécia, o país onde deputados não têm assessores, dormem em quitinete e pagam pelo cafezinho',
          },
          locators: {
            assetUri: '/portuguese/internacional-47198240',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-47198240',
            curie:
              'http://www.bbc.co.uk/asset/283af5b3-8b4f-684e-8300-75e87ee50459',
          },
          summary:
            'Realidade de parlamentares do país escandivavo é bem diferente da vivida pelos legisladores brasileiros; lá, cada um tem direito não a um carro, mas a um bilhete para usar o transporte público.',
          timestamp: 1557580047327,
          byline: {
            name: 'Claudia Wallin*',
            title: 'De Estocolmo para a BBC News Brasil',
            persons: [
              {
                name: 'Claudia Wallin',
                function: 'De Estocolmo para a BBC Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '105601874',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/BAC2/production/_105601874_bbc.foto.deputado.per.arne.bandejao.parlamento.1.jpg',
            path: '/cpsprodpb/BAC2/production/_105601874_bbc.foto.deputado.per.arne.bandejao.parlamento.1.jpg',
            height: 549,
            width: 976,
            altText:
              'Deputado Per-Arne Håkansson no bandejão do Parlamento sueco',
            caption:
              'No país escandinavo, deputados como Per-Arne Håkansson encaram fila para almoçar no bandejão',
            copyrightHolder: 'Jonas Esbjörnsson',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-47198240',
        },
      },
      {
        id: '1b3d4396-917f-904a-a817-72129c62fa9f',
        count: 28,
        urn: 'urn:bbc:curie:asset:1b3d4396-917f-904a-a817-72129c62fa9f',
        promo: {
          headlines: {
            shortHeadline:
              'A trajetória do navio Bouboulina, suspeito de ser o responsável pelo vazamento de óleo no litoral brasileiro',
            headline:
              'A trajetória do navio Bouboulina, suspeito de ser o responsável pelo vazamento de óleo no litoral brasileiro',
          },
          locators: {
            assetUri: '/portuguese/brasil-50270037',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50270037',
            curie:
              'http://www.bbc.co.uk/asset/1b3d4396-917f-904a-a817-72129c62fa9f',
          },
          summary:
            'A pedido da BBC News Brasil, agência de geointeligência reuniu informações sobre o caminho que a embarcação fez e suas atividades desde que deixou a Venezuela.',
          timestamp: 1572636698609,
          byline: {
            name: 'Camilla Costa - @_camillacosta',
            title: 'Da BBC News Brasil em Londres',
            persons: [
              {
                name: 'Camilla Costa',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109499053',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/891B/production/_109499053_screenshot2019-11-01at12.50.56pm.png',
            path: '/cpsprodpb/891B/production/_109499053_screenshot2019-11-01at12.50.56pm.png',
            height: 1152,
            width: 2048,
            altText: 'Trajetória do navio Bouboulina',
            caption:
              'Navio grego esteve perto da costa brasileira durante 23 e 30 de julho, carregado de petróleo venezuelano',
            copyrightHolder: 'Kpler',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50270037',
        },
      },
      {
        id: 'ee7a507d-80fb-9741-99b1-8fc913708a14',
        count: 26,
        urn: 'urn:bbc:curie:asset:ee7a507d-80fb-9741-99b1-8fc913708a14',
        promo: {
          headlines: {
            shortHeadline:
              "O que é a 'emergência nazista' declarada por cidade alemã",
            headline:
              "O que é a 'emergência nazista' declarada por cidade alemã",
          },
          locators: {
            assetUri: '/portuguese/internacional-50270069',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50270069',
            curie:
              'http://www.bbc.co.uk/asset/ee7a507d-80fb-9741-99b1-8fc913708a14',
          },
          summary:
            "Resolução diz que 'atitudes e ações extremistas de direita... estão ocorrendo com crescente frequência' em Dresden e apela à cidade para ajudar vítimas de violência, proteger minorias e fortalecer a democracia.",
          timestamp: 1572904976370,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109499761',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/419F/production/_109499761_mediaitem109499760.jpg',
            path: '/cpsprodpb/419F/production/_109499761_mediaitem109499760.jpg',
            height: 1152,
            width: 2048,
            altText:
              'People attend an anti-immigration demonstration organised by right-wing movement Pegida in Dresden, Germany, 19 October, 2015',
            copyrightHolder: 'Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50270069',
        },
      },
      {
        id: 'd561a43c-e66a-e243-a0c3-336369305d6d',
        count: 25,
        urn: 'urn:bbc:curie:asset:d561a43c-e66a-e243-a0c3-336369305d6d',
        promo: {
          headlines: {
            shortHeadline:
              "Puçá ou siripoia? O manual que ensina a 'pescar óleo' no Nordeste unindo ciência e lições de pescadores",
            headline:
              "Puçá ou siripoia? O manual que ensina a 'pescar óleo' no Nordeste unindo ciência e lições de pescadores",
          },
          locators: {
            assetUri: '/portuguese/brasil-50297743',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50297743',
            curie:
              'http://www.bbc.co.uk/asset/d561a43c-e66a-e243-a0c3-336369305d6d',
          },
          summary:
            'Pesquisadores de universidades e pescadores de litoral do Nordeste criaram o manual "Como Pescar Petróleo", para orientar as pessoas sobre as melhores maneiras de retirar o óleo do oceano.',
          timestamp: 1572988232392,
          byline: {
            name: 'Victor Uchôa',
            title: 'De Salvador para a BBC News Brasil',
            persons: [
              {
                name: 'Victor Uchôa',
                function: 'De Salvador para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109542452',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/6350/production/_109542452_pescadoresdepetrleo_sosmanguemarcanes.jpg',
            path: '/cpsprodpb/6350/production/_109542452_pescadoresdepetrleo_sosmanguemarcanes.jpg',
            height: 549,
            width: 976,
            altText:
              'Pescadores têm se utilizado de uma manual para orientar ações de retirada de óleo do mar',
            caption:
              'Pescadores têm se utilizado de uma manual para orientar ações de retirada de óleo do mar',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50297743',
        },
      },
      {
        id: '6d6b9652-75ed-a94e-8bdc-7960a250bd01',
        count: 25,
        urn: 'urn:bbc:curie:asset:6d6b9652-75ed-a94e-8bdc-7960a250bd01',
        promo: {
          headlines: {
            shortHeadline:
              'Islandês transmite ao vivo pela internet sanduíche de fast food que não apodrece há 10 anos',
            headline:
              'Islandês transmite ao vivo pela internet sanduíche de fast food que não apodrece há 10 anos',
          },
          locators: {
            assetUri: '/portuguese/geral-50268009',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50268009',
            curie:
              'http://www.bbc.co.uk/asset/6d6b9652-75ed-a94e-8bdc-7960a250bd01',
          },
          summary:
            "Último lanche comprado no McDonald's do país nórdico é exibido como atração em um hostel.",
          timestamp: 1572640566580,
          byline: {
            name: 'Georgina Rannard',
            title: 'Da BBC News',
            persons: [{ name: 'Georgina Rannard', function: 'BBC News' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3139461b000e9dabf9',
                campaignName: 'WS - Divert me',
              },
            ],
          },
          indexImage: {
            id: '109493060',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1797/production/_109493060_eiqckowwkaif53m-5.jpg',
            path: '/cpsprodpb/1797/production/_109493060_eiqckowwkaif53m-5.jpg',
            height: 549,
            width: 976,
            altText:
              'Hjortur Smarason bought this McDonalds meal in 2009 to see how long it would take to decompose',
            caption:
              'Hjortur Smarason bought this McDonalds meal in 2009 to see how long it would take to decompose',
            copyrightHolder: 'AFP / Angelika OSIEWALSKA',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50268009',
        },
      },
      {
        id: '3fd216f1-23b9-b344-aff4-1231723537b4',
        count: 25,
        urn: 'urn:bbc:curie:asset:3fd216f1-23b9-b344-aff4-1231723537b4',
        promo: {
          headlines: {
            shortHeadline:
              'A impressionante vida secreta do meu filho gamer com doença degenerativa',
            headline:
              'A impressionante vida secreta em World of Warcraft de meu filho gamer com doença degenerativa',
          },
          locators: {
            assetUri: '/portuguese/geral-47289677',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-47289677',
            curie:
              'http://www.bbc.co.uk/asset/3fd216f1-23b9-b344-aff4-1231723537b4',
          },
          summary:
            'Quando Mats morreu, os pais descobriram que pessoas de toda a Europa acenderam velas em sua memória.',
          timestamp: 1553636351740,
          byline: {
            name: 'Vicky Schaubert*',
            title: 'De Oslo',
            persons: [{ name: 'Vicky Schaubert', function: 'Oslo' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2139461b000e9dabf7',
                campaignName: 'WS - Inspire me',
              },
            ],
          },
          indexImage: {
            id: '106189856',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1016A/production/_106189856_1920x1279-wow_049.jpg',
            path: '/cpsprodpb/1016A/production/_106189856_1920x1279-wow_049.jpg',
            height: 1152,
            width: 2048,
            altText:
              'Ibelin, personagem de Mats em World of Warcraft, e Robert Steen',
            caption:
              "Ibelin, personagem de Mats em World of Warcraft, ao lado do 'pai', Robert Steen",
            copyrightHolder: 'Blizzard Entertainment/Patrick Saether/NRK',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-47289677',
        },
      },
      {
        id: '9e2c3c01-8bf1-3848-a4d0-a7fbd9bbe6ab',
        count: 24,
        urn: 'urn:bbc:curie:asset:9e2c3c01-8bf1-3848-a4d0-a7fbd9bbe6ab',
        promo: {
          headlines: {
            shortHeadline:
              'Abolição da escravidão em 1888 foi votada pela elite evitando a reforma agrária, diz historiador',
            headline:
              'Abolição da escravidão em 1888 foi votada pela elite evitando a reforma agrária, diz historiador',
          },
          locators: {
            assetUri: '/portuguese/brasil-44091474',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-44091474',
            curie:
              'http://www.bbc.co.uk/asset/9e2c3c01-8bf1-3848-a4d0-a7fbd9bbe6ab',
          },
          summary:
            'Em entrevista para a BBC Brasil, o historiador Luiz Felipe de Alencastro, um dos maiores especialistas em escravidão, afirma ainda que a violência contra o escravo contamina a sociedade até hoje.',
          timestamp: 1558435744016,
          byline: {
            name: 'Amanda Rossi',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'Amanda Rossi',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '101305531',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/34EE/production/_101305531_nypl.digitalcollections.bfc8d8be-cc97-94e2-e040-e00a18065961.001.w.jpg',
            path: '/cpsprodpb/34EE/production/_101305531_nypl.digitalcollections.bfc8d8be-cc97-94e2-e040-e00a18065961.001.w.jpg',
            height: 549,
            width: 976,
            altText: 'Escravos trabalham em uma plantação de café no Brasil',
            caption: 'Escravos trabalham em uma plantação de café no Brasil',
            copyrightHolder: 'The New York Public Library',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-44091474',
        },
      },
      {
        id: '603c8625-550a-994d-a534-07de51f4bbd7',
        count: 23,
        urn: 'urn:bbc:curie:asset:603c8625-550a-994d-a534-07de51f4bbd7',
        promo: {
          headlines: {
            shortHeadline:
              'Busca por aborto caseiro na internet dobrou na última década',
            headline:
              'Busca por aborto caseiro na internet dobrou na última década',
          },
          locators: {
            assetUri: '/portuguese/brasil-44389143',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-44389143',
            curie:
              'http://www.bbc.co.uk/asset/603c8625-550a-994d-a534-07de51f4bbd7',
          },
          summary:
            'Pesquisa por pílulas abortivas na internet é maior onde a legislação é mais restritiva, de acordo com uma análise de dados do Google feita pela BBC News.',
          timestamp: 1558434880782,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '101904424',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/A5C8/production/_101904424_tablet.jpg',
            path: '/cpsprodpb/A5C8/production/_101904424_tablet.jpg',
            height: 549,
            width: 976,
            altText: 'Hand over tablet computer',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-44389143',
        },
      },
      {
        id: '38525d35-c4f0-774c-b1ef-ed426a369c8c',
        count: 23,
        urn: 'urn:bbc:curie:asset:38525d35-c4f0-774c-b1ef-ed426a369c8c',
        promo: {
          headlines: {
            shortHeadline: "'A vida de influencer me levou à exaustão'",
            headline: "'A vida de influencer me levou à exaustão'",
          },
          locators: {
            assetUri: '/portuguese/vert-cap-50243501',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/vert-cap-50243501',
            curie:
              'http://www.bbc.co.uk/asset/38525d35-c4f0-774c-b1ef-ed426a369c8c',
          },
          summary:
            'O estilo de vida do influenciador pode parecer incrível, mas a renda incerta, a exposição e a o trabalho de buscar patrocínio podem acabar pesando. Conheça as pessoas que viraram as costas para essa carreira.',
          timestamp: 1572955628427,
          byline: {
            name: 'Sam Blum',
            title: 'BBC Worklife',
            persons: [{ name: 'BBC Capital', function: '' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109470140',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/100B/production/_109470140_60d12feb-a7e0-4ee8-bf52-42bb790b2647.jpg',
            path: '/cpsprodpb/100B/production/_109470140_60d12feb-a7e0-4ee8-bf52-42bb790b2647.jpg',
            height: 900,
            width: 1600,
            altText: 'Jessica Zollman',
            caption:
              'Com o aumento da competição e do estresse psicológico, alguns influenciadores como Jessica Zollman deixaram suas plataformas de mídia social',
            copyrightHolder: 'Jessica Zollman',
          },
          id: 'urn:bbc:ares::asset:portuguese/vert-cap-50243501',
        },
      },
      {
        id: '0c183246-b4c8-e545-9a77-ec65126a74e9',
        count: 23,
        urn: 'urn:bbc:curie:asset:0c183246-b4c8-e545-9a77-ec65126a74e9',
        promo: {
          headlines: {
            shortHeadline:
              'Paulo Coelho: Vou perder leitores, mas criticar Bolsonaro é compromisso histórico',
            headline:
              'Paulo Coelho: Vou perder leitores, mas criticar Bolsonaro é compromisso histórico',
          },
          locators: {
            assetUri: '/portuguese/brasil-49665128',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-49665128',
            curie:
              'http://www.bbc.co.uk/asset/0c183246-b4c8-e545-9a77-ec65126a74e9',
          },
          summary:
            'Em entrevista exclusiva à BBC News Brasil, em sua casa em Genebra, escritor relembra tortura, diz que o passado da ditadura está se tornando presente no Brasil e afirma que país assiste horrorizado a seu esfacelamento com Bolsonaro.',
          timestamp: 1569436298144,
          byline: {
            name: 'Ricardo Senra e Elisa Kriezis',
            title: 'Enviados da BBC News Brasil a Genebra',
            persons: [{ name: 'Ricardo Senra', function: 'BBC News Brasil' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '108958733',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/83F9/production/_108958733_97ffbaea-5bc1-4b4a-962c-3eeeb53363fa.jpg',
            path: '/cpsprodpb/83F9/production/_108958733_97ffbaea-5bc1-4b4a-962c-3eeeb53363fa.jpg',
            height: 549,
            width: 976,
            altText: 'Paulo Coelho',
            caption:
              '"O evangélico já não tolera o católico, o cara de esquerda não tolera o de direita, o de direita odeia todo mundo", diz Paulo Coelho',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-49665128',
        },
      },
      {
        id: '06080ca4-e737-be4f-902b-010d71a93c31',
        count: 23,
        urn: 'urn:bbc:curie:asset:06080ca4-e737-be4f-902b-010d71a93c31',
        promo: {
          headlines: {
            shortHeadline:
              "'Sou um ser humano, não só um hímen': mulheres relatam como noite de núpcias arruinou seus casamentos",
            headline:
              "'Sou um ser humano, não só um hímen': mulheres relatam como noite de núpcias arruinou seus casamentos",
          },
          locators: {
            assetUri: '/portuguese/internacional-50221255',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50221255',
            curie:
              'http://www.bbc.co.uk/asset/06080ca4-e737-be4f-902b-010d71a93c31',
          },
          summary:
            'Em vários países árabes e muçulmanos, espera-se que mulheres sejam virgens antes de se casarem; caso isso não aconteça, seu destino pode ser até a morte',
          timestamp: 1572865456177,
          byline: {
            name: 'Hevar Hasan ',
            title: 'BBC',
            persons: [{ name: 'هيفار حسن', function: 'بي بي سي - لندن' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e1739461b000e9dabf6',
                campaignName: 'WS - CS',
              },
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109237142',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/5E6D/production/_109237142_8749d8b6-a89a-4556-8429-b5b1598c9674.jpg',
            path: '/cpsprodpb/5E6D/production/_109237142_8749d8b6-a89a-4556-8429-b5b1598c9674.jpg',
            height: 549,
            width: 976,
            altText: 'Bride in wedding gown',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50221255',
        },
      },
      {
        id: 'ac8725c0-a3de-b84d-970a-94c5cc2685f3',
        count: 19,
        urn: 'urn:bbc:curie:asset:ac8725c0-a3de-b84d-970a-94c5cc2685f3',
        promo: {
          headlines: {
            shortHeadline:
              "'Dizem que não carrego a bandeira, mas a bandeira sou eu', diz Ney Matogrosso sobre movimento gay",
            headline:
              "'Dizem que não carrego a bandeira, mas a bandeira sou eu', diz Ney Matogrosso sobre movimento gay",
          },
          locators: {
            assetUri: '/portuguese/brasil-50240781',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50240781',
            curie:
              'http://www.bbc.co.uk/asset/ac8725c0-a3de-b84d-970a-94c5cc2685f3',
          },
          summary:
            "Em entrevista à BBC News Brasil, Ney Matogrosso diz que Bolsonaro 'acha que pode determinar a sexualidade das pessoas’.",
          timestamp: 1572613494275,
          byline: {
            name: 'Laís Alegretti - @laisalegretti',
            title: 'Da BBC News Brasil em Londres',
            persons: [
              {
                name: 'Laís Alegretti',
                function: 'Da BBC News Brasil em Londres',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109482649',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/171A4/production/_109482649_ney1.jpg',
            path: '/cpsprodpb/171A4/production/_109482649_ney1.jpg',
            height: 549,
            width: 976,
            altText: 'Ney Matogrosso',
            caption:
              "Ney Matogrosso diz que ninguém pode cobrá-lo por mais ativismo: 'Eu sou a bandeira, eu não preciso carregar uma'.",
            copyrightHolder: 'Elisa Kriezis/BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50240781',
        },
      },
      {
        id: '2be124fc-3d33-5f48-9bd8-42e451c252e2',
        count: 17,
        urn: 'urn:bbc:curie:asset:2be124fc-3d33-5f48-9bd8-42e451c252e2',
        promo: {
          headlines: {
            shortHeadline:
              'Os bombeiros particulares que protegem casas de ricos e famosos dos incêndios na Califórnia',
            headline:
              'Os bombeiros particulares que protegem casas de ricos e famosos dos incêndios na Califórnia',
          },
          locators: {
            assetUri: '/portuguese/internacional-50297734',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50297734',
            curie:
              'http://www.bbc.co.uk/asset/2be124fc-3d33-5f48-9bd8-42e451c252e2',
          },
          summary:
            'Com incêndios que a cada ano se tornam mais frequentes e devastadores, um fenômeno vem se tornando comum nos Estados Unidos: o uso de bombeiros privados contratados por moradores ricos para proteger suas casas.',
          timestamp: 1572947010584,
          byline: {
            name: 'Alessandra Corrêa',
            title: 'De Winston-Salem (EUA) para a BBC News Brasil',
            persons: [
              {
                name: 'Alessandra Corrêa',
                function: 'De Winston-Salem (EUA) para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '109527749',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/17234/production/_109527749_foto1-crdito_divulgao_firebreakprotectionsystems.jpg',
            path: '/cpsprodpb/17234/production/_109527749_foto1-crdito_divulgao_firebreakprotectionsystems.jpg',
            height: 549,
            width: 976,
            altText: 'Casa da Califórnia com incêndio',
            caption:
              'A proteção de bombeiros privados começou a ser oferecida por seguradoras há pouco mais de uma década, tanto na Califórnia quanto em outros Estados americanos que costumam enfrentar incêndios florestais',
            copyrightHolder: 'Divulgação',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50297734',
        },
      },
      {
        id: '00e63566-2f19-a444-8446-4f99a0fe4179',
        count: 17,
        urn: 'urn:bbc:curie:asset:00e63566-2f19-a444-8446-4f99a0fe4179',
        promo: {
          headlines: {
            shortHeadline:
              "Novos dados sobre violência mostram que 'não há lugar seguro para mulheres no Brasil'",
            headline:
              "Violência contra a mulher: novos dados mostram que 'não há lugar seguro no Brasil'",
          },
          locators: {
            assetUri: '/portuguese/brasil-47365503',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-47365503',
            curie:
              'http://www.bbc.co.uk/asset/00e63566-2f19-a444-8446-4f99a0fe4179',
          },
          summary:
            'Pesquisa encomendada por ONG revela que houve 536 casos por hora de violência contra mulheres nos últimos 12 meses, e que quase 4 milhões de mulheres foram assediadas no transporte público.',
          timestamp: 1551262227897,
          byline: {
            name: 'Luiza Franco',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Luiza Franco',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '105797537',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/11F6B/production/_105797537_fba1cd95-dd86-4649-9531-236dd1865d8b.jpg',
            path: '/cpsprodpb/11F6B/production/_105797537_fba1cd95-dd86-4649-9531-236dd1865d8b.jpg',
            height: 351,
            width: 624,
            altText: 'Mulheres dando as mãos',
            caption:
              'Apenas 8% dos municípios brasileiros têm delegacias da mulher',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-47365503',
        },
      },
      {
        id: 'c7ed942b-5331-7b47-beda-8fe9e6fc88bc',
        count: 16,
        urn: 'urn:bbc:curie:asset:c7ed942b-5331-7b47-beda-8fe9e6fc88bc',
        promo: {
          headlines: {
            shortHeadline:
              "De 'limpo' a 'tem muito óleo': as duas realidades paralelas na crise do petróleo do Nordeste",
            headline:
              "De 'limpo' a 'tem muito óleo': as duas realidades paralelas na crise do petróleo do Nordeste",
          },
          locators: {
            assetUri: '/portuguese/brasil-50257407',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50257407',
            curie:
              'http://www.bbc.co.uk/asset/c7ed942b-5331-7b47-beda-8fe9e6fc88bc',
          },
          summary:
            "De um lado, gestores e órgãos públicos afirmam que praias estão 'limpas'. De outro, especialistas dizem que limpeza 'visual' não quer dizer muita coisa, pois o maior perigo está naquilo que não dá para enxergar.",
          timestamp: 1572689457589,
          byline: {
            name: 'Victor Uchôa',
            title: 'De Salvador para a BBC News Brasil',
            persons: [
              {
                name: 'Leandro Machado',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '109344832',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/5D24/production/_109344832_hi057473737.jpg',
            path: '/cpsprodpb/5D24/production/_109344832_hi057473737.jpg',
            height: 549,
            width: 976,
            altText: 'Homem limpando uma praia em Camaçari, Bahia',
            caption:
              'O óleo chegou a várias praias da Bahia, como as do município de Camaçari, a 41 quilômetros de Salvador',
            copyrightHolder: 'Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50257407',
        },
      },
      {
        id: 'c4fe42ab-e9e6-a34a-bb2d-503e088245a5',
        count: 16,
        urn: 'urn:bbc:curie:asset:c4fe42ab-e9e6-a34a-bb2d-503e088245a5',
        promo: {
          headlines: {
            shortHeadline:
              "A vida secreta dos brasileiros que trabalham no 'Uber do pornô'",
            headline:
              "A vida secreta dos brasileiros que trabalham no 'Uber do pornô'",
          },
          locators: {
            assetUri: '/portuguese/brasil-49886712',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-49886712',
            curie:
              'http://www.bbc.co.uk/asset/c4fe42ab-e9e6-a34a-bb2d-503e088245a5',
          },
          summary:
            "O 'camming', apresentações sexuais por webcam para internautas, é mercado consolidado no exterior; no Brasil, é cada vez mais fonte de renda para milhares de mulheres e homens.",
          timestamp: 1571080467452,
          byline: {
            name: 'Leandro Machado (@machadoleandro) e Mariana Alvim (@marianaalvim)',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Leandro Machado',
                function: 'Da BBC Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109096440',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1175/production/_109096440_gettyimages-1125420574.jpg',
            path: '/cpsprodpb/1175/production/_109096440_gettyimages-1125420574.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher na cama de sutiã segura cédulas de dinheiro',
            caption:
              'Em sites de camming nacionais e estrangeiros, usuários compram créditos que permitem acessar diferentes tipos de chat - com taxas distintas também',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-49886712',
        },
      },
      {
        id: 'b91f0529-a509-0a47-aefa-d05c87c3bb2d',
        count: 16,
        urn: 'urn:bbc:curie:asset:b91f0529-a509-0a47-aefa-d05c87c3bb2d',
        promo: {
          headlines: {
            shortHeadline:
              "Mia Khalifa: ‘Achei que pudesse fazer do pornô o meu segredinho, mas o tiro saiu pela culatra'",
            headline:
              "Mia Khalifa: ‘Achei que pudesse fazer do pornô o meu segredinho, mas o tiro saiu pela culatra'",
          },
          locators: {
            assetUri: '/portuguese/geral-49491755',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-49491755',
            curie:
              'http://www.bbc.co.uk/asset/b91f0529-a509-0a47-aefa-d05c87c3bb2d',
          },
          summary:
            'Com 21 anos, ao aparecer de véu islâmico em uma cena de sexo, a libanesa se tornou uma das mais famosas atrizes pornôs. Hoje, aos 26, Khalifa diz que falta de maturidade e insegurança a motivaram a aceitar o trabalho.',
          timestamp: 1567005398513,
          byline: {
            name: 'Stephen Sackur',
            title: 'HARDtalk',
            persons: [{ name: 'Stephen Sackur', function: 'HARDtalk' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '108507091',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/4A7E/production/_108507091_e0a7cb00-edaa-48d5-8f52-2d42f603a11c.jpg',
            path: '/cpsprodpb/4A7E/production/_108507091_e0a7cb00-edaa-48d5-8f52-2d42f603a11c.jpg',
            height: 549,
            width: 976,
            altText: 'Mia Khalifa em entrevista à BBC',
            caption:
              'Mia Khalifa teve uma breve mas exitosa passagem pela indústria pornográfica dos EUA',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-49491755',
        },
      },
      {
        id: '43a00812-562e-3746-8a8c-a736aa50b3b6',
        count: 16,
        urn: 'urn:bbc:curie:asset:43a00812-562e-3746-8a8c-a736aa50b3b6',
        promo: {
          headlines: {
            shortHeadline:
              "'Logo você poderá ter outro': as frases que mais ferem as mães que perdem seus bebês",
            headline:
              "'Logo você poderá ter outro': as frases que mais ferem as mães que perdem seus bebês",
          },
          locators: {
            assetUri: '/portuguese/geral-50225692',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50225692',
            curie:
              'http://www.bbc.co.uk/asset/43a00812-562e-3746-8a8c-a736aa50b3b6',
          },
          summary:
            "Mulheres que passam por perdas gestacionais ou neonatais relatam 'luto invisível' e 'isolamento' em relação a familiares e equipes médicas; psicóloga tenta implementar protocolo de luto em maternidades.",
          timestamp: 1572888247146,
          byline: {
            name: 'Paula Adamo Idoeta -@paulaidoeta',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Paula Adamo Idoeta',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
            ],
          },
          indexImage: {
            id: '109452215',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/C819/production/_109452215_gettyimages-680795672.jpg',
            path: '/cpsprodpb/C819/production/_109452215_gettyimages-680795672.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher grávida chorando',
            caption:
              '"A maioria das falas machucam ou ofendem, com seu conteúdo religioso e moral, ou acabam culpando a mãe"',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50225692',
        },
      },
      {
        id: '7807d3bc-2cb1-764a-b9e2-af409870a6eb',
        count: 15,
        urn: 'urn:bbc:curie:asset:7807d3bc-2cb1-764a-b9e2-af409870a6eb',
        promo: {
          headlines: {
            shortHeadline:
              'As dicas ao Brasil do iraquiano por trás da estratégia de petróleo da Noruega',
            headline:
              'As dicas ao Brasil do iraquiano que ajudou a Noruega a dar volta por cima com petróleo',
          },
          locators: {
            assetUri: '/portuguese/geral-49299120',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-49299120',
            curie:
              'http://www.bbc.co.uk/asset/7807d3bc-2cb1-764a-b9e2-af409870a6eb',
          },
          summary:
            'As riquezas do petróleo da Noruega e a administração responsável desse dinheiro garantiram ao país acumular o maior fundo soberano do mundo, com cerca de US$ 1 trilhão; só 3% do total pode ser usado a cada ano; objetivo é garantir o futuro das próximas gerações, quando o petróleo deixar de existir.',
          timestamp: 1565857068454,
          byline: {
            name: 'Nathalia Passarinho - @npassarinho',
            title: 'Da BBC News Brasil em Londres',
            persons: [
              {
                name: 'Nathalia Passarinho',
                function: 'Da BBC News Brasil em Londres',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2139461b000e9dabf7',
                campaignName: 'WS - Inspire me',
              },
            ],
          },
          indexImage: {
            id: '108285246',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/FB02/production/_108285246_1958.faroukal-kasimasresidentgeologistatawildcateastofiraq.jpg',
            path: '/cpsprodpb/FB02/production/_108285246_1958.faroukal-kasimasresidentgeologistatawildcateastofiraq.jpg',
            height: 549,
            width: 976,
            altText:
              'Al-Kasim quando ainda trabalhava no setor de petróleo no Iraque',
            caption:
              'Al-Kasim estava progredindo como funcionário da Empresa Iraquiana de Petróleo, mas decidiu se mudar para a Noruega e recomeçar a vida profissional lá para garantir tratamento ao filho',
            copyrightHolder: 'Cortesia Al-Kasim',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-49299120',
        },
      },
      {
        id: '3f7095c0-fe6a-11e4-a7bb-4cde3db9bd6e',
        count: 15,
        urn: 'urn:bbc:curie:asset:3f7095c0-fe6a-11e4-a7bb-4cde3db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              'Ibuprofeno ou paracetamol? Saiba quando tomar um ou outro. ',
            headline:
              'Ibuprofeno ou paracetamol? Saiba quando tomar um ou outro',
          },
          locators: {
            assetUri:
              '/portuguese/noticias/2015/05/150518_ibuprofeno_paracetamol_pai',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2015/05/150518_ibuprofeno_paracetamol_pai',
            curie:
              'http://www.bbc.co.uk/asset/3f7095c0-fe6a-11e4-a7bb-4cde3db9bd6e',
          },
          summary:
            'Os dois costumam ser eficazes contra dores, mas têm suas diferenças. Entenda-as.',
          timestamp: 1550147607604,
          passport: {},
          indexImage: {
            id: 'd5e212',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2015/05/18/150518113859_analgesico_144x81_thinkstock_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2015/05/18/150518113859_analgesico_144x81_thinkstock_nocredit.jpg',
            height: 81,
            width: 144,
            altText: 'Foto: Thinkstock',
            copyrightHolder: ' Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2015/05/150518_ibuprofeno_paracetamol_pai',
        },
      },
      {
        id: 'a65a32dd-2c31-574f-a1b7-96249a0615a0',
        count: 14,
        urn: 'urn:bbc:curie:asset:a65a32dd-2c31-574f-a1b7-96249a0615a0',
        promo: {
          headlines: {
            shortHeadline:
              'Políticos de PSC e PT estão na frente na disputa pelas redes sociais, diz estudo',
            headline:
              'Políticos de PSC e PT estão na frente na disputa pelas redes sociais, diz estudo',
          },
          locators: {
            assetUri: '/portuguese/brasil-41131773',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-41131773',
            curie:
              'http://www.bbc.co.uk/asset/a65a32dd-2c31-574f-a1b7-96249a0615a0',
          },
          summary:
            'Dos dez congressistas mais influentes nas redes sociais no mês de agosto, só Jandira Feghali (PC do B-RJ) não é de um dos dois partidos.',
          timestamp: 1549910010915,
          byline: {
            name: 'André Shalders - @shaldim',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'André Shalders - @shaldim',
                function: 'Da BBC Brasil em São Paulo',
              },
            ],
          },
          passport: {},
          indexImage: {
            id: '97668477',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/12EAE/production/_97668477_debc1564-75db-4925-ba14-f700e5f0cdf2.jpg',
            path: '/cpsprodpb/12EAE/production/_97668477_debc1564-75db-4925-ba14-f700e5f0cdf2.jpg',
            height: 549,
            width: 976,
            altText:
              'Montagem com os retratos dos deputados Jair Bolsonaro (PSC-RJ) e Paulo Pimenta (PT-RS)',
            caption:
              'Os deputados Jair Bolsonaro (PSC-RJ, à esq.) e Paulo Pimenta (PT-RS) são os mais influentes nas redes',
            copyrightHolder: 'Agência Brasil e Agência PT',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-41131773',
        },
      },
      {
        id: 'a1bcfa3d-3c7b-4748-8e38-e0840846fa36',
        count: 14,
        urn: 'urn:bbc:curie:asset:a1bcfa3d-3c7b-4748-8e38-e0840846fa36',
        promo: {
          headlines: {
            shortHeadline:
              'Negros e negras brasileiros que deveriam ser mais estudados nas escolas',
            headline:
              'Negros e negras brasileiros que deveriam ser mais estudados nas escolas',
          },
          locators: {
            assetUri: '/portuguese/brasil-42033622',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-42033622',
            curie:
              'http://www.bbc.co.uk/asset/a1bcfa3d-3c7b-4748-8e38-e0840846fa36',
          },
          summary:
            'Escritores, líderes, engenheiros e políticos pioneiros ainda são pouco conhecidos de alunos e até dos professores.',
          timestamp: 1558434178269,
          byline: {
            name: 'Laís Modelli',
            title: 'De São Paulo para a BBC Brasil',
            persons: [
              {
                name: 'Laís Modelli',
                function: 'De São Paulo para a BBC Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '98805759',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/17606/production/_98805759_befunkycollage.jpg',
            path: '/cpsprodpb/17606/production/_98805759_befunkycollage.jpg',
            height: 549,
            width: 976,
            altText: 'Negros e negras brasileiros',
            caption:
              'Apesar de obrigatória no currículo escolar, história de negros brasileiros ainda é deixada de lado nos livros e nas aulas, segundo atividas',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-42033622',
        },
      },
      {
        id: '8840a6a5-ffec-2642-99b6-535fe7381a45',
        count: 14,
        urn: 'urn:bbc:curie:asset:8840a6a5-ffec-2642-99b6-535fe7381a45',
        promo: {
          headlines: {
            shortHeadline: 'Halloween: a curiosa origem do Dia das Bruxas',
            headline: 'Halloween: a curiosa origem do Dia das Bruxas',
          },
          locators: {
            assetUri: '/portuguese/curiosidades-41778799',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/curiosidades-41778799',
            curie:
              'http://www.bbc.co.uk/asset/8840a6a5-ffec-2642-99b6-535fe7381a45',
          },
          summary:
            'Normalmente associado aos Estados Unidos, festival pagão começou séculos atrás no Reino Unido e, hoje, é o principal feriado não cristão em diversos países, inclusive no Brasil.',
          timestamp: 1572520881536,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '104019137',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/11DE7/production/_104019137_gettyimages-844232562.jpg',
            path: '/cpsprodpb/11DE7/production/_104019137_gettyimages-844232562.jpg',
            height: 549,
            width: 976,
            altText:
              'Caveiras, abóboras e chamas com tema de Halloween, ou Dia das Bruxas',
            caption:
              'Dia das Bruxas é um festival ligado à cultura americana, mas celebrado atualmente em diversos países',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/curiosidades-41778799',
        },
      },
      {
        id: '1dee6c63-74f0-f841-9571-7b40b952f2d0',
        count: 14,
        urn: 'urn:bbc:curie:asset:1dee6c63-74f0-f841-9571-7b40b952f2d0',
        promo: {
          headlines: {
            shortHeadline:
              'Estatal, privado, misto: os diferentes tipos de exploração de petróleo, e qual o impacto da opção brasileira',
            headline:
              'Estatal, privado, misto: os diferentes tipos de exploração de petróleo, e qual o impacto da opção brasileira',
          },
          locators: {
            assetUri: '/portuguese/geral-49743153',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-49743153',
            curie:
              'http://www.bbc.co.uk/asset/1dee6c63-74f0-f841-9571-7b40b952f2d0',
          },
          summary:
            'O Brasil realiza nesta quarta o megaleilão do pré-sal e espera arrecadar mais de R$ 100 bi. Licitação ocorre em meio à tentativa do governo de privatizar subsidiárias da Petrobras e alterar o regime de partilha. Que modelos de exploração de petróleo existem no mundo e qual seria a melhor alternativa para o Brasil?',
          timestamp: 1572979016373,
          byline: {
            name: 'Nathalia Passarinho - @npassarinho',
            title: 'Da BBC News Brasil em Londres',
            persons: [
              {
                name: 'Nathalia Passarinho',
                function: 'Da BBC News Brasil em Londres',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
            ],
          },
          indexImage: {
            id: '109151380',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/207B/production/_109151380_gettyimages-958697544.jpg',
            path: '/cpsprodpb/207B/production/_109151380_gettyimages-958697544.jpg',
            height: 549,
            width: 976,
            altText: 'Refinaria',
            caption:
              'A exploração desse recurso natural no Brasil já passou pelo monopólio total para um modelo de concorrência restrita, por causa da força da Petrobras e, agora, o governo que privatizar subsidiárias da estatal',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-49743153',
        },
      },
      {
        id: 'acc256a9-6f28-cf40-8370-b07aca6b101b',
        count: 13,
        urn: 'urn:bbc:curie:asset:acc256a9-6f28-cf40-8370-b07aca6b101b',
        promo: {
          headlines: {
            shortHeadline:
              "'O boi teve o rabo arrancado': proibição da vaquejada abre polêmica",
            headline:
              "'O boi teve o rabo arrancado': proibição da vaquejada abre polêmica",
          },
          locators: {
            assetUri: '/portuguese/brasil-37830658',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-37830658',
            curie:
              'http://www.bbc.co.uk/asset/acc256a9-6f28-cf40-8370-b07aca6b101b',
          },
          summary:
            'Crueldade ou respeito a tradição? Decisão do STF divide opiniões e ameaça uso de animais em festas populares no Brasil.',
          timestamp: 1558434578062,
          byline: {
            name: 'Mario Bittencourt',
            title: 'De Vitória da Conquista (BA) para a BBC Brasil',
            persons: [
              {
                name: 'Mario Bittencourt',
                function: 'De Vitória da Conquista (BA) para a BBC NewsBrasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '92203881',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/498E/production/_92203881_vaquejada_7952997814_4bc49358eb_o.jpg',
            path: '/cpsprodpb/498E/production/_92203881_vaquejada_7952997814_4bc49358eb_o.jpg',
            height: 549,
            width: 976,
            altText: 'Vaquejada na Bahia',
            caption:
              'Nas vaquejadas, cavaleiros derrubam bois em busca de prêmios; tradição no Nordeste está em xeque após decisão do STF',
            copyrightHolder: 'Divulgação/Tatiana Azeviche',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-37830658',
        },
      },
      {
        id: '480ff0bc-1673-9b45-b5c8-4cc461626cb3',
        count: 13,
        urn: 'urn:bbc:curie:asset:480ff0bc-1673-9b45-b5c8-4cc461626cb3',
        promo: {
          headlines: {
            shortHeadline:
              'As rachaduras no modelo econômico do Chile expostas pelos protestos',
            headline:
              'Protestos no Chile: as rachaduras no modelo econômico do país expostas pelas manifestações',
          },
          locators: {
            assetUri: '/portuguese/internacional-50214126',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50214126',
            curie:
              'http://www.bbc.co.uk/asset/480ff0bc-1673-9b45-b5c8-4cc461626cb3',
          },
          summary:
            'No Chile, milhões de pessoas protestaram contra a desigualdade gerada por um modelo econômico que faz parte da herança do regime militar de Pinochet.',
          timestamp: 1572536725135,
          byline: {
            name: 'Ana María Roura',
            title: 'Da BBC News Mundo',
            persons: [{ name: 'Ana María Roura', function: 'BBC News Mundo' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '109449193',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/991A/production/_109449193_gettyimages-1178411541-3.jpg',
            path: '/cpsprodpb/991A/production/_109449193_gettyimages-1178411541-3.jpg',
            height: 1152,
            width: 2048,
            altText: 'Chile',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50214126',
        },
      },
      {
        id: '03b47078-0af6-3849-b7d8-2b88f7c94af6',
        count: 13,
        urn: 'urn:bbc:curie:asset:03b47078-0af6-3849-b7d8-2b88f7c94af6',
        promo: {
          headlines: {
            shortHeadline:
              'Menina de 10 anos grava seu próprio estupro para que adultos acreditem em denúncia',
            headline:
              'Menina de 10 anos grava seu próprio estupro para que adultos acreditem em denúncia',
          },
          locators: {
            assetUri: '/portuguese/internacional-41436317',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-41436317',
            curie:
              'http://www.bbc.co.uk/asset/03b47078-0af6-3849-b7d8-2b88f7c94af6',
          },
          summary:
            'Caso chocou sociedade uruguaia e evidenciou, segundo especialistas, que é preciso escutar as crianças e "aceitar que o abuso existe".',
          timestamp: 1558434441326,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '98066548',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/14A56/production/_98066548_92e16ca9-0086-4cf3-901e-2ddb9ed2f732.jpg',
            path: '/cpsprodpb/14A56/production/_98066548_92e16ca9-0086-4cf3-901e-2ddb9ed2f732.jpg',
            height: 549,
            width: 976,
            altText: 'Menina assustada',
            caption:
              'Caso chocou a sociedade uruguaia e promotora pediu que ele sirva de alerta para que as crianças sejam escutadas com mais atenção',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-41436317',
        },
      },
      {
        id: 'ff04a31f-183a-f744-89de-6b82300917e1',
        count: 12,
        urn: 'urn:bbc:curie:asset:ff04a31f-183a-f744-89de-6b82300917e1',
        promo: {
          headlines: {
            shortHeadline:
              "Por que historiadores concordam que monarquia sofreu um 'golpe' com a Proclamação da República",
            headline:
              "15 de novembro, Proclamação da República: por que historiadores concordam que monarquia sofreu um 'golpe'",
          },
          locators: {
            assetUri: '/portuguese/brasil-41991813',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-41991813',
            curie:
              'http://www.bbc.co.uk/asset/ff04a31f-183a-f744-89de-6b82300917e1',
          },
          summary:
            'Em meio à crise política, debate sobre movimento que rompeu com a monarquia volta a gerar discussões entre historiadores, ativistas e membros da Família Real.',
          timestamp: 1558434165732,
          byline: {
            name: 'Vinícius Mendes',
            title: 'De São Paulo para a BBC Brasil',
            persons: [
              {
                name: 'Vinícius Mendes',
                function: 'De São Paulo para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '98755302',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/4F83/production/_98755302_proclamacao1.jpg',
            path: '/cpsprodpb/4F83/production/_98755302_proclamacao1.jpg',
            height: 549,
            width: 976,
            altText: "O quadro 'Proclamação da República', de Benedito Calixto",
            caption:
              "O quadro 'Proclamação da República', de Benedito Calixto; movimento que questiona rompimento com a monarquia ganhou força com as redes sociais | Imagem: Centro Cultural São Paulo",
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-41991813',
        },
      },
      {
        id: '89da90f6-5af0-b04a-bf61-30ec7de7fe0a',
        count: 12,
        urn: 'urn:bbc:curie:asset:89da90f6-5af0-b04a-bf61-30ec7de7fe0a',
        promo: {
          headlines: {
            shortHeadline:
              'Herpes-zóster, a doença causada pelo vírus da catapora que pode ser ativada pelo estresse',
            headline:
              'Herpes-zóster, a doença causada pelo vírus da catapora que pode ser ativada pelo estresse',
          },
          locators: {
            assetUri: '/portuguese/brasil-42333161',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-42333161',
            curie:
              'http://www.bbc.co.uk/asset/89da90f6-5af0-b04a-bf61-30ec7de7fe0a',
          },
          summary:
            'Doença infecciosa é causada pelo vírus varicela-zóster, que fica latente nos gânglios do paciente e pode se manifestar em formato de bolhas dolorosas a qualquer momento da vida, especialmente quando a imunidade está baixa.',
          timestamp: 1558434293847,
          byline: {
            name: 'Keila Guimarães',
            title: 'De São Paulo para a BBC Brasil',
            persons: [
              {
                name: 'Keila Guimarães',
                function: 'De São Paulo para a BBC Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '99225892',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/749C/production/_99225892_gettyimages-495765256.jpg',
            path: '/cpsprodpb/749C/production/_99225892_gettyimages-495765256.jpg',
            height: 549,
            width: 976,
            altText: 'Ilustração de herpes-zóster',
            caption:
              'Médica diz que vírus fica alojado na região do tórax ou do abdômen e se manifesta quando há queda da imunidade',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-42333161',
        },
      },
      {
        id: 'b31b343b-ec55-9446-82c2-6d86a608e7cf',
        count: 11,
        urn: 'urn:bbc:curie:asset:b31b343b-ec55-9446-82c2-6d86a608e7cf',
        promo: {
          headlines: {
            shortHeadline:
              'A batalha para manter a internet grátis e aberta a todos',
            headline:
              'A batalha para manter a internet grátis e aberta a todos',
          },
          locators: {
            assetUri: '/portuguese/vert-fut-50226471',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/vert-fut-50226471',
            curie:
              'http://www.bbc.co.uk/asset/b31b343b-ec55-9446-82c2-6d86a608e7cf',
          },
          summary:
            'Conectar o mundo é algo visto como uma missão humanitária para alguns, mas garantir uma rede acessível a qualquer pessoa é um desafio mais difícil de resolver.',
          timestamp: 1572597052523,
          byline: {
            name: 'Frank Swain ',
            title: 'BBC Future',
            persons: [
              {
                name: 'Victor Uchôa',
                function: 'De Salvador para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109486175',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/DF50/production/_109486175_gettyimages-1020456586.jpg',
            path: '/cpsprodpb/DF50/production/_109486175_gettyimages-1020456586.jpg',
            height: 549,
            width: 976,
            altText:
              'Ilustração de pessoa digitando em computador com cadeados',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/vert-fut-50226471',
        },
      },
      {
        id: '273a6d34-20ee-cd43-bdf2-d95b6a782e34',
        count: 11,
        urn: 'urn:bbc:curie:asset:273a6d34-20ee-cd43-bdf2-d95b6a782e34',
        promo: {
          headlines: {
            shortHeadline:
              'Quem são e o que pensam os brasileiros que acreditam que a Terra é plana',
            headline:
              'Quem são e o que pensam os brasileiros que acreditam que a Terra é plana',
          },
          locators: {
            assetUri: '/portuguese/brasil-41261724',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-41261724',
            curie:
              'http://www.bbc.co.uk/asset/273a6d34-20ee-cd43-bdf2-d95b6a782e34',
          },
          summary:
            "'Os globalistas acham que a gente não foi para a escola, que não temos conhecimento e somos facilmente enganados; sendo que é bem o contrário', diz um dos defensores de teoria.",
          timestamp: 1558434384332,
          byline: {
            name: 'Mariana Alvim - @marianaalvim',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'Mariana Alvim',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '97826489',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1809E/production/_97826489_terraplana-1.jpg',
            path: '/cpsprodpb/1809E/production/_97826489_terraplana-1.jpg',
            height: 549,
            width: 976,
            altText:
              'Ilustração mostrando a Terra em formato de disco, coberta por um domo',
            caption:
              'Para os terraplanistas, o planeta seria um disco e o céu, uma cúpula em formato circular | Ilustração: Raphael Salimena',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-41261724',
        },
      },
      {
        id: '22f53ab4-fdc6-ca42-ba52-1ff9327a8ccf',
        count: 11,
        urn: 'urn:bbc:curie:asset:22f53ab4-fdc6-ca42-ba52-1ff9327a8ccf',
        promo: {
          headlines: {
            shortHeadline:
              'Como ler uma mensagem no WhatsApp sem que a pessoa que enviou saiba',
            headline:
              'Como ler uma mensagem no WhatsApp sem que a pessoa que enviou saiba',
          },
          locators: {
            assetUri: '/portuguese/geral-36492202',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-36492202',
            curie:
              'http://www.bbc.co.uk/asset/22f53ab4-fdc6-ca42-ba52-1ff9327a8ccf',
          },
          summary:
            'Dicas ajudam a evitar reclamações por parte de amigos e parentes caso você decida deixar para responder depois.',
          timestamp: 1558434414135,
          byline: {
            name: 'Redação  ',
            title: 'BBC Mundo',
            persons: [{ name: 'Redação', function: 'BBC Mundo' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '89941675',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/E10E/production/_89941675_160301143106_whatsapp_950x633_afp.jpg',
            path: '/cpsprodpb/E10E/production/_89941675_160301143106_whatsapp_950x633_afp.jpg',
            height: 549,
            width: 976,
            altText: 'AFP',
            caption:
              'WhatsApp é prático, mas o excesso de mensagens pode transformar o aplicativo em fonte de irritação',
            copyrightHolder: 'AFP',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-36492202',
        },
      },
      {
        id: '1e7fc01e-fb32-11e5-a01b-0f9c3db9bd6e',
        count: 11,
        urn: 'urn:bbc:curie:asset:1e7fc01e-fb32-11e5-a01b-0f9c3db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              'Como escrever em negrito, itálico ou riscar palavras no Whatsapp',
            headline:
              'Como escrever em negrito, itálico ou riscar palavras no Whatsapp',
          },
          locators: {
            assetUri:
              '/portuguese/noticias/2016/04/160405_italico_negrito_whatsapp_rm',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2016/04/160405_italico_negrito_whatsapp_rm',
            curie:
              'http://www.bbc.co.uk/asset/1e7fc01e-fb32-11e5-a01b-0f9c3db9bd6e',
          },
          summary:
            'Nova atualização de aplicativo traz novidades que o aproximam de teclados de computador.',
          timestamp: 1550146706679,
          passport: {},
          indexImage: {
            id: 'd5e208',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/03/01/160301194225_whatsapp_144x81_allanwhitefotospblicas_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2016/03/01/160301194225_whatsapp_144x81_allanwhitefotospblicas_nocredit.jpg',
            height: 81,
            width: 144,
            altText: '',
            copyrightHolder: 'Allan White Fotos Pblicas',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2016/04/160405_italico_negrito_whatsapp_rm',
        },
      },
      {
        id: 'e6edfaa6-9887-5b44-80bd-6dbe0624e1d6',
        count: 10,
        urn: 'urn:bbc:curie:asset:e6edfaa6-9887-5b44-80bd-6dbe0624e1d6',
        promo: {
          headlines: {
            shortHeadline:
              "'O Chile acordou': autora da foto viral que marcou protestos conta o que sentiu ao capturar imagem",
            headline:
              "'O Chile acordou': autora da foto viral que marcou protestos conta o que sentiu ao capturar imagem",
          },
          locators: {
            assetUri: '/portuguese/brasil-50229216',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50229216',
            curie:
              'http://www.bbc.co.uk/asset/e6edfaa6-9887-5b44-80bd-6dbe0624e1d6',
          },
          summary:
            'Susana Hidalgo, atriz chilena de 33 anos, relembra o momento em que fez com seu celular uma das imagens mais emblemáticas das manifestações no país.',
          timestamp: 1572384237424,
          byline: {
            name: 'Marcia Carmo',
            title: 'De Buenos Aires para a BBC News Brasil',
            persons: [
              {
                name: 'Marcia Carmo',
                function: 'BBC News Brasil, Buenos Aires',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '109454260',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1865/production/_109454260_mapuche2.jpg',
            path: '/cpsprodpb/1865/production/_109454260_mapuche2.jpg',
            height: 465,
            width: 827,
            altText: 'Manifestantes sobre estátua militar no centro do Chile',
            caption:
              'Imagem de manifestante com bandeira Mapuche no topo de estátua militar em Santiago se tornou símbolo dos protestos no Chile por reformas sociais',
            copyrightHolder: 'Susana Hidalgo',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50229216',
        },
      },
      {
        id: 'ddb60609-e72b-a84e-958e-7450e071fb7f',
        count: 10,
        urn: 'urn:bbc:curie:asset:ddb60609-e72b-a84e-958e-7450e071fb7f',
        promo: {
          headlines: {
            shortHeadline: 'STF aprova a criminalização da homofobia',
            headline: 'STF aprova a criminalização da homofobia',
          },
          locators: {
            assetUri: '/portuguese/brasil-47206924',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-47206924',
            curie:
              'http://www.bbc.co.uk/asset/ddb60609-e72b-a84e-958e-7450e071fb7f',
          },
          summary:
            'Oito dos onze ministros do Supremo votaram para que a discriminação por orientação sexual e identidade de gênero seja punida pela Lei de Racismo.',
          timestamp: 1560885566718,
          byline: {
            name: 'Rafael Barifouse',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Rafael Barifouse',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'WS - Educate me',
              },
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'WS - Update me',
              },
            ],
          },
          indexImage: {
            id: '105609645',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/D5A2/production/_105609645_gettyimages-481086498.jpg',
            path: '/cpsprodpb/D5A2/production/_105609645_gettyimages-481086498.jpg',
            height: 549,
            width: 976,
            altText: 'Martelo de madeira sobre bandeira do arco-íris',
            caption:
              'STF não pode criar lei penal, porque função é exclusiva da Câmara e do Senado, dizem críticos da ações judiciais',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-47206924',
        },
      },
      {
        id: 'd36741b9-34a1-4649-b956-1301155479ab',
        count: 10,
        urn: 'urn:bbc:curie:asset:d36741b9-34a1-4649-b956-1301155479ab',
        promo: {
          headlines: {
            shortHeadline:
              'Danos do óleo no litoral do Nordeste vão durar décadas, dizem oceanógrafos',
            headline:
              'Danos do óleo no litoral do Nordeste vão durar décadas, dizem oceanógrafos',
          },
          locators: {
            assetUri: '/portuguese/brasil-50131560',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50131560',
            curie:
              'http://www.bbc.co.uk/asset/d36741b9-34a1-4649-b956-1301155479ab',
          },
          summary:
            'Após deixar um rastro tóxico por milhares de quilômetros, óleo chega a mangues e corais na costa da Bahia em um estágio mais difícil de ser limpo e com alto risco de contaminar o meio ambiente durante anos, segundo especialistas.',
          timestamp: 1571734427735,
          byline: {
            name: 'Victor Uchôa',
            title: 'De Salvador para a BBC News Brasil',
            persons: [
              {
                name: 'Victor Uchôa',
                function: 'De Salvador para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109318840',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1311/production/_109318840_fotodevictorucha-12-2.jpg',
            path: '/cpsprodpb/1311/production/_109318840_fotodevictorucha-12-2.jpg',
            height: 549,
            width: 976,
            altText:
              'Voluntários e funcionários públicos limpam manchas de óleo em pedras',
            caption:
              'Oceanógrafos, químicos e autoridades estaduais avaliaram o impacto da movimentação da mancha pela costa do Nordeste',
            copyrightHolder: 'Victor Uchôa/BBC Brasil News',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50131560',
        },
      },
      {
        id: 'cada37ba-12f5-11e6-9645-f3d43db9bd6e',
        count: 10,
        urn: 'urn:bbc:curie:asset:cada37ba-12f5-11e6-9645-f3d43db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              'O legado dos 13 anos do PT no poder em seis indicadores internacionais',
            headline:
              'O legado dos 13 anos do PT no poder em seis indicadores internacionais',
          },
          locators: {
            assetUri: '/portuguese/noticias/2016/05/160505_legado_pt_ru',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2016/05/160505_legado_pt_ru',
            curie:
              'http://www.bbc.co.uk/asset/cada37ba-12f5-11e6-9645-f3d43db9bd6e',
          },
          summary:
            'Do Índice de Desenvolvimento Humano da ONU à pesquisa do Fórum Econômico Mundial que avalia o ambiente para negócios: onde avançamos, estagnamos e retrocedemos. ',
          timestamp: 1550152108482,
          byline: {
            name: 'Ruth Costas*',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'Ruth Costas*',
                function: 'Da BBC Brasil em São Paulo',
              },
            ],
          },
          passport: {},
          indexImage: {
            id: 'd5e225',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/03/18/160318042306_rousseff_lula_appointment_144x81_getty_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2016/03/18/160318042306_rousseff_lula_appointment_144x81_getty_nocredit.jpg',
            height: 81,
            width: 144,
            altText: '',
            copyrightHolder: 'Getty',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2016/05/160505_legado_pt_ru',
        },
      },
      {
        id: '8e9e923b-f41d-1942-a4fd-26dfafe17edc',
        count: 10,
        urn: 'urn:bbc:curie:asset:8e9e923b-f41d-1942-a4fd-26dfafe17edc',
        promo: {
          headlines: {
            shortHeadline:
              "Mariana, 4 anos: estudo que guiará reparações por danos à saúde está 'na gaveta' há 6 meses",
            headline:
              "Mariana, 4 anos: estudo que guiará reparações por danos à saúde está 'na gaveta' há 6 meses",
          },
          locators: {
            assetUri: '/portuguese/brasil-50309184',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50309184',
            curie:
              'http://www.bbc.co.uk/asset/8e9e923b-f41d-1942-a4fd-26dfafe17edc',
          },
          summary:
            "Financiado pela Fundação Renova, documento foi concluído em março e hoje se encontra na Secretaria de Saúde de Minas Gerais, onde está sendo 'analisado por uma equipe multisetorial'. Ministério Público afirma que as populações atingidas têm direito às informações.",
          timestamp: 1572983130172,
          byline: {
            name: 'Camilla Veras Mota',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'Camilla Veras Mota',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '100572834',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/AB33/production/_100572834_ibama_mariana051.jpg',
            path: '/cpsprodpb/AB33/production/_100572834_ibama_mariana051.jpg',
            height: 549,
            width: 976,
            altText: 'Distrito de Gesteira',
            caption:
              'Lama da barragem de Fundão percorreu mais de 600 km - Gesteira (acima), distrito rural de Barra Longa, foi soterrado pela avalanche',
            copyrightHolder: 'Felipe Werneck/Ascom/Ibama',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50309184',
        },
      },
      {
        id: '7e993a75-d501-2e43-a323-95146cf7e77f',
        count: 10,
        urn: 'urn:bbc:curie:asset:7e993a75-d501-2e43-a323-95146cf7e77f',
        promo: {
          headlines: {
            shortHeadline: 'Cinco mitos e verdades sobre ossos quebrados',
            headline: 'Cinco mitos e verdades sobre ossos quebrados',
          },
          locators: {
            assetUri: '/portuguese/vert-fut-46089905',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/vert-fut-46089905',
            curie:
              'http://www.bbc.co.uk/asset/7e993a75-d501-2e43-a323-95146cf7e77f',
          },
          summary:
            'Dor lancinante? Nem sempre. Se você não consegue mexer, é porque quebrou? A BBC esclarece algumas informações imprecisas divulgadas sobre o tema.',
          timestamp: 1558434952031,
          byline: {
            name: 'Claudia Hammond',
            title: 'BBC Future',
            persons: [{ name: 'Claudia Hammond', function: 'BBC Future' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '103835761',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/4171/production/_103835761_8b9ae671-2275-4974-8650-e10b9bb8c6f7.jpg',
            path: '/cpsprodpb/4171/production/_103835761_8b9ae671-2275-4974-8650-e10b9bb8c6f7.jpg',
            height: 549,
            width: 976,
            altText: 'Médico olhando radiografia',
            caption:
              'Os três principais sinais de um osso quebrado são dor, inchaço e deformidade',
            copyrightHolder: 'Fairfax Media via Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/vert-fut-46089905',
        },
      },
      {
        id: '6a5c6d39-1a2d-9c48-a068-0b3bf6ec1515',
        count: 10,
        urn: 'urn:bbc:curie:asset:6a5c6d39-1a2d-9c48-a068-0b3bf6ec1515',
        promo: {
          headlines: {
            shortHeadline:
              'Os sintomas muitas vezes ignorados da pneumonia, a doença que mais mata crianças com menos de cinco anos',
            headline:
              'Os sintomas muitas vezes ignorados da pneumonia, a doença que mais mata crianças com menos de cinco anos',
          },
          locators: {
            assetUri: '/portuguese/geral-41907363',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-41907363',
            curie:
              'http://www.bbc.co.uk/asset/6a5c6d39-1a2d-9c48-a068-0b3bf6ec1515',
          },
          summary:
            'Diagnóstico com raio-X é eficaz para observar inflamação dos pulmões, porém, em muitos casos, o médico consegue identificar a doença no consultório; quanto antes for identificada a pneumonia, mais rápida será recuperação.',
          timestamp: 1558434139579,
          byline: {
            name: 'Adriana  Stock',
            title: 'Do Rio de Janeiro para a BBC Brasil',
            persons: [
              {
                name: 'Adriana Stock',
                function: 'Do Rio de Janeiro para a BBC Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '98697857',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/12867/production/_98697857_gettyimages-170286208.jpg',
            path: '/cpsprodpb/12867/production/_98697857_gettyimages-170286208.jpg',
            height: 549,
            width: 976,
            altText: 'Mãe com filha',
            caption:
              'Recuperação da pneumonia em crianças é garantida por diagnóstico mais rápido | Foto: Getty Images',
            copyrightHolder: 'MAURICIO LIMA',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-41907363',
        },
      },
      {
        id: '352272db-3885-c447-8f08-b98523730e6a',
        count: 10,
        urn: 'urn:bbc:curie:asset:352272db-3885-c447-8f08-b98523730e6a',
        promo: {
          headlines: {
            shortHeadline: 'A vida das mulheres viciadas em pornografia',
            headline: 'A vida das mulheres viciadas em pornografia',
          },
          locators: {
            assetUri: '/portuguese/geral-47629952',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-47629952',
            curie:
              'http://www.bbc.co.uk/asset/352272db-3885-c447-8f08-b98523730e6a',
          },
          summary:
            'O impacto do conteúdo pornográfico sobre homens já foi amplamente estudado, mas pouco se sabe sobre os seus efeitos entre mulheres.',
          timestamp: 1553547073091,
          byline: {
            name: 'Alexandra Jones',
            title: 'Da BBC Three',
            persons: [{ name: 'Alexandra Jones', function: 'BBC Three' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e1739461b000e9dabf6',
                campaignName: 'WS - CS',
              },
            ],
          },
          indexImage: {
            id: '106064538',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1465A/production/_106064538_6.p073jt3g.jpg',
            path: '/cpsprodpb/1465A/production/_106064538_6.p073jt3g.jpg',
            height: 549,
            width: 976,
            altText:
              'Abstract image composition - woman falling, computer screens, purple and bright pink background',
            caption:
              'What are the effects of porn on the female brain? There are hardly any studies about it',
            copyrightHolder: 'BBC/ISTOCK',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-47629952',
        },
      },
      {
        id: '0d3f3b4a-de30-224b-834e-b64ba6e0754f',
        count: 10,
        urn: 'urn:bbc:curie:asset:0d3f3b4a-de30-224b-834e-b64ba6e0754f',
        promo: {
          headlines: {
            shortHeadline:
              'Orgasmo feminino: 8 motivos pelos quais algumas mulheres não atingem o clímax',
            headline:
              'Orgasmo feminino: 8 motivos pelos quais algumas mulheres não atingem o clímax',
          },
          locators: {
            assetUri: '/portuguese/geral-46520261',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-46520261',
            curie:
              'http://www.bbc.co.uk/asset/0d3f3b4a-de30-224b-834e-b64ba6e0754f',
          },
          summary:
            'Diversos fatores - psicológicos, emocionais, físicos e até hormonais - podem impedir a mulher de chegar ao orgasmo.',
          timestamp: 1558435560499,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '104724636',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/F89A/production/_104724636_gettyimages-160997427.jpg',
            path: '/cpsprodpb/F89A/production/_104724636_gettyimages-160997427.jpg',
            height: 549,
            width: 976,
            altText: 'Mujer con los ojos cerrados',
            caption:
              'En el orgasmo influyen factores psicológicos, emocionales, físicos y hormonales.',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-46520261',
        },
      },
      {
        id: '06af887f-db4d-454c-811b-72896dbe9803',
        count: 10,
        urn: 'urn:bbc:curie:asset:06af887f-db4d-454c-811b-72896dbe9803',
        promo: {
          headlines: {
            shortHeadline:
              'Óleo no Nordeste: quais órgãos são responsáveis por limpar, investigar e punir',
            headline:
              'Vazamento de óleo no Nordeste: quais órgãos são responsáveis por limpar, investigar e punir',
          },
          locators: {
            assetUri: '/portuguese/geral-50191420',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-50191420',
            curie:
              'http://www.bbc.co.uk/asset/06af887f-db4d-454c-811b-72896dbe9803',
          },
          summary:
            'Segundo a legislação, órgãos federais têm responsabilidade primordial em incidentes ambientais de grande escala; para especialista, porém, governo falha em coordenar esforços de limpeza e de investigação.',
          timestamp: 1572359919484,
          byline: {
            name: 'João Fellet - @joaofellet',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'João Fellet - @joaofellet',
                function: 'Da BBC Brasil em Brasília',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '109445430',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/0D7E/production/_109445430_marinha.jpg',
            path: '/cpsprodpb/0D7E/production/_109445430_marinha.jpg',
            height: 549,
            width: 976,
            altText: 'Ibama e Marinha',
            caption:
              'Militares da Marinha e agentes do Ibama trabalham para retirar óleo da foz do rio Jaboatão, em Pernambuco',
            copyrightHolder: 'Marinha',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-50191420',
        },
      },
      {
        id: 'c79bd076-7677-1441-8365-effa269fcffe',
        count: 9,
        urn: 'urn:bbc:curie:asset:c79bd076-7677-1441-8365-effa269fcffe',
        promo: {
          headlines: {
            shortHeadline:
              'Pequeno dicionário para xingar sem perder a erudição',
            headline: 'Pequeno dicionário para xingar sem perder a erudição',
          },
          locators: {
            assetUri: '/portuguese/geral-43517662',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-43517662',
            curie:
              'http://www.bbc.co.uk/asset/c79bd076-7677-1441-8365-effa269fcffe',
          },
          summary:
            'Bate-boca entre ministros do STF foi lição involuntária de como discutir (quase) sem perder a pompa e uma amostra de como a língua portuguesa tem um repertório rico de ofensas que vão muito além dos palavrões.',
          timestamp: 1558435648208,
          byline: {
            name: 'Rafael Barifouse',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'Rafael Barifouse',
                function: 'Da BBC News Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '100549406',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/EC4E/production/_100549406_9f1dd5bd-a402-4e39-a337-26d205b74660.jpg',
            path: '/cpsprodpb/EC4E/production/_100549406_9f1dd5bd-a402-4e39-a337-26d205b74660.jpg',
            height: 549,
            width: 976,
            altText: 'Gilmar Mendes e Luís Barroso',
            caption:
              'Sessão no STF foi interrompida após discussão entre ministros',
            copyrightHolder: 'AFP/EPA',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-43517662',
        },
      },
      {
        id: '9ef0f7ab-5c44-304d-ac26-06f2fef62659',
        count: 9,
        urn: 'urn:bbc:curie:asset:9ef0f7ab-5c44-304d-ac26-06f2fef62659',
        promo: {
          headlines: {
            shortHeadline:
              'Seus cabelos estão caindo? Saiba quando você deve se preocupar',
            headline:
              'Seus cabelos estão caindo? Saiba quando você deve se preocupar',
          },
          locators: {
            assetUri: '/portuguese/internacional-37960465',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-37960465',
            curie:
              'http://www.bbc.co.uk/asset/9ef0f7ab-5c44-304d-ac26-06f2fef62659',
          },
          summary:
            'Médico afirma que o cabelo se renova diariamente e explica em qual situação pode ser o sinal de alguma doença.',
          timestamp: 1558433911389,
          passport: {},
          indexImage: {
            id: '92410563',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/8E95/production/_92410563_cabe1.jpg',
            path: '/cpsprodpb/8E95/production/_92410563_cabe1.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher vê cabelos acumulados em sua escova',
            caption:
              'Médicos explicam fatores que podem explicar a queda de cabelo',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-37960465',
        },
      },
      {
        id: '970d07ef-3376-fb49-9375-a17fcea37007',
        count: 9,
        urn: 'urn:bbc:curie:asset:970d07ef-3376-fb49-9375-a17fcea37007',
        promo: {
          headlines: {
            shortHeadline:
              'O cenário de guerra no México após prisão (e soltura) de filho de El Chapo',
            headline:
              'O cenário de guerra no México após prisão (e soltura) de filho de El Chapo',
          },
          locators: {
            assetUri: '/portuguese/internacional-50095938',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50095938',
            curie:
              'http://www.bbc.co.uk/asset/970d07ef-3376-fb49-9375-a17fcea37007',
          },
          summary:
            "Onda de violência após detenção de filho de 'El Chapo' atingiu norte do país",
          timestamp: 1571393490234,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2139461b000e9dabf7',
                campaignName: 'WS - Inspire me',
              },
            ],
          },
          indexImage: {
            id: '109279876',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/10939/production/_109279876_mediaitem109279875.jpg',
            path: '/cpsprodpb/10939/production/_109279876_mediaitem109279875.jpg',
            height: 549,
            width: 976,
            altText:
              'A burning bus, set alight by cartel gunmen to block a road, is pictured during clashes in Culiacán',
            caption:
              'A burning bus, set alight by cartel gunmen to block a road, is pictured during clashes in Culiacán',
            copyrightHolder: 'Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50095938',
        },
      },
      {
        id: '6fb70033-01f2-fb44-a5f4-3b60d751156f',
        count: 9,
        urn: 'urn:bbc:curie:asset:6fb70033-01f2-fb44-a5f4-3b60d751156f',
        promo: {
          headlines: {
            shortHeadline:
              "Mais conversa, menos exames e remédios: o que propõe o movimento por 'Medicina sem Pressa'",
            headline:
              "Mais conversa, menos exames e remédios: o que propõe o movimento por 'Medicina sem Pressa'",
          },
          locators: {
            assetUri: '/portuguese/brasil-38409486',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-38409486',
            curie:
              'http://www.bbc.co.uk/asset/6fb70033-01f2-fb44-a5f4-3b60d751156f',
          },
          summary:
            'Recém-chegada ao Brasil, filosofia recebe críticas de médicos ao condenar campanhas de conscientização do câncer de mama e próstata, que classificada de ação "de marketing" que leva a procedimentos invasivos desnecessários.',
          timestamp: 1558433997962,
          byline: {
            name: 'Tomás Chiaverini',
            title: 'De São Paulo para a BBC Brasil',
            persons: [
              {
                name: 'Tomás Schiaverini',
                function: 'De São Paulo para a BBC Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '93099566',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/10427/production/_93099566_thinkstockphotos-629781630.jpg',
            path: '/cpsprodpb/10427/production/_93099566_thinkstockphotos-629781630.jpg',
            height: 549,
            width: 976,
            altText: 'Médico em consulta',
            caption:
              'A Slow Medicine faz parte do movimento que começou na gastronomia italiana em 1986 e tem milhares de adeptos em todo o mundo',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-38409486',
        },
      },
      {
        id: '63622800-1ce2-0d46-91a6-93e9116e3e77',
        count: 9,
        urn: 'urn:bbc:curie:asset:63622800-1ce2-0d46-91a6-93e9116e3e77',
        promo: {
          headlines: {
            shortHeadline:
              'Como saber se você tem testosterona baixa demais - e como tratar o problema',
            headline:
              'Como saber se você tem testosterona baixa demais - e como tratar o problema',
          },
          locators: {
            assetUri: '/portuguese/geral-39353571',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-39353571',
            curie:
              'http://www.bbc.co.uk/asset/63622800-1ce2-0d46-91a6-93e9116e3e77',
          },
          summary:
            'Hipogonadismo, como é conhecido o problema da produção de hormônio fundamental para bem-estar de homens, pode ser mais comum do que se imagina.',
          timestamp: 1558434042360,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '92433133',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/816D/production/_92433133_thinkstockphotos-526668973.jpg',
            path: '/cpsprodpb/816D/production/_92433133_thinkstockphotos-526668973.jpg',
            height: 549,
            width: 976,
            altText: 'Homem fraco com braços desenhados',
            caption:
              'Hipogonadismo afeta cinco em cada mil homens, segundo o NHS',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-39353571',
        },
      },
      {
        id: '61b5d4a7-6e65-164b-af82-b264be72bbce',
        count: 9,
        urn: 'urn:bbc:curie:asset:61b5d4a7-6e65-164b-af82-b264be72bbce',
        promo: {
          headlines: {
            shortHeadline:
              "Como ator da série 'Stranger Things' se tornou exemplo para pessoas com doença rara",
            headline:
              "Como ator da série 'Stranger Things' se tornou exemplo para pessoas com doença rara",
          },
          locators: {
            assetUri: '/portuguese/geral-37392046',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-37392046',
            curie:
              'http://www.bbc.co.uk/asset/61b5d4a7-6e65-164b-af82-b264be72bbce',
          },
          summary:
            'Gaten Matarazzo, que interpreta Dustin Henderson na série do Netflix, tem displasia cleidocraniana.',
          timestamp: 1558433897704,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '91277226',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/F345/production/_91277226_st.jpg',
            path: '/cpsprodpb/F345/production/_91277226_st.jpg',
            height: 549,
            width: 976,
            altText: 'Gaten Matarazzo',
            caption:
              'Ator de Stranger Things revela que possui doença rara durante série',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-37392046',
        },
      },
      {
        id: '601b0256-1b3d-11e6-805d-468c3db9bd6e',
        count: 9,
        urn: 'urn:bbc:curie:asset:601b0256-1b3d-11e6-805d-468c3db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              '5 benefícios da masturbação que talvez você não conheça',
            headline: '5 benefícios da masturbação que talvez você não conheça',
          },
          locators: {
            assetUri:
              '/portuguese/geral/2016/05/160516_beneficios_masturbacao_lab',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/geral/2016/05/160516_beneficios_masturbacao_lab',
            curie:
              'http://www.bbc.co.uk/asset/601b0256-1b3d-11e6-805d-468c3db9bd6e',
          },
          summary:
            'Vista com reserva no passado, prática pode ajudar a reduzir dores menstruais e combater insônia. ',
          timestamp: 1550148506973,
          passport: {},
          indexImage: {
            id: 'd5e217',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/05/16/160516082956_masturbacao_144x81_thinkstock_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2016/05/16/160516082956_masturbacao_144x81_thinkstock_nocredit.jpg',
            height: 81,
            width: 144,
            altText: 'Thinkstock',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral/2016/05/160516_beneficios_masturbacao_lab',
        },
      },
      {
        id: '5dd981aa-347f-ae4b-9112-7f67db3178c4',
        count: 9,
        urn: 'urn:bbc:curie:asset:5dd981aa-347f-ae4b-9112-7f67db3178c4',
        promo: {
          headlines: {
            shortHeadline: 'Entenda a polêmica sobre o Brexit em 11 perguntas',
            headline:
              'O que é o Brexit? Entenda a polêmica saída do Reino Unido da União Europeia com esta e outras 10 questões',
          },
          locators: {
            assetUri: '/portuguese/internacional-46335938',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-46335938',
            curie:
              'http://www.bbc.co.uk/asset/5dd981aa-347f-ae4b-9112-7f67db3178c4',
          },
          summary:
            'O Parlamento britânico já rejeitou três vezes planos para a saída do Reino Unido da União Europeia, um tema que já levou à renúncia de dois primeiros-ministros. Agora, parlamentares se mobilizam para impedir uma saída sem acordo.',
          timestamp: 1568054567356,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Explainer',
              categoryName: 'Explainer',
            },
            campaigns: [
              {
                campaignId: '5a988e4739461b000e9dabfc',
                campaignName: 'Update me',
              },
            ],
          },
          indexImage: {
            id: '104467888',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/15B2C/production/_104467888_hi050750881.jpg',
            path: '/cpsprodpb/15B2C/production/_104467888_hi050750881.jpg',
            height: 549,
            width: 976,
            altText: 'A man waves both a Union Jack and an Eu flag',
            copyrightHolder: 'AFP',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-46335938',
        },
      },
      {
        id: '460df053-fb3e-5e4c-925e-264a96ffce51',
        count: 9,
        urn: 'urn:bbc:curie:asset:460df053-fb3e-5e4c-925e-264a96ffce51',
        promo: {
          headlines: {
            shortHeadline:
              'O segredo para reduzirmos a ansiedade antes de fazermos algo importante',
            headline:
              'O segredo para reduzirmos a ansiedade antes de fazermos algo importante',
          },
          locators: {
            assetUri: '/portuguese/geral-39929910',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-39929910',
            curie:
              'http://www.bbc.co.uk/asset/460df053-fb3e-5e4c-925e-264a96ffce51',
          },
          summary:
            'Realizar pequenos rituais antes de vivenciarmos situações estressantes nos torna menos ansiosos e melhora nosso desempenho, dizem pesquisadores de Harvard.',
          timestamp: 1549892906812,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '96131096',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/10D95/production/_96131096_gettyimages-515174319.jpg',
            path: '/cpsprodpb/10D95/production/_96131096_gettyimages-515174319.jpg',
            height: 549,
            width: 976,
            altText: 'Homem desesperado',
            caption:
              'Um dos fatores que geram ansiedade antes de situações estressantes é justamente a falta de controle',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-39929910',
        },
      },
      {
        id: '425f4842-68ed-11e5-a406-397a3db9bd6e',
        count: 9,
        urn: 'urn:bbc:curie:asset:425f4842-68ed-11e5-a406-397a3db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              'Por que fezes de baleia podem valer milhares de dólares?',
            headline:
              'Por que fezes de baleia podem valer milhares de dólares?',
          },
          locators: {
            assetUri:
              '/portuguese/noticias/2015/10/151002_ambar_cinza_baleia_dinheiro_fn',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2015/10/151002_ambar_cinza_baleia_dinheiro_fn',
            curie:
              'http://www.bbc.co.uk/asset/425f4842-68ed-11e5-a406-397a3db9bd6e',
          },
          summary:
            'Baleia cachalote apenas produz substância chamada âmbar cinza - que é considerado um produto de luxo - quando sofre indigestão.',
          timestamp: 1550441940410,
          byline: {
            name: 'Laura Plitt',
            title: 'Da BBC Mundo',
            persons: [{ name: 'Laura Plitt', function: 'Da BBC Mundo' }],
          },
          passport: {},
          indexImage: {
            id: 'd5e220',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2015/10/02/151002135637_whale_pa144.jpg',
            path: '/amz/worldservice/live/assets/images/2015/10/02/151002135637_whale_pa144.jpg',
            height: 81,
            width: 144,
            altText: 'PA',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2015/10/151002_ambar_cinza_baleia_dinheiro_fn',
        },
      },
      {
        id: '2bf66934-21f4-7f44-9dff-7d80683afab9',
        count: 9,
        urn: 'urn:bbc:curie:asset:2bf66934-21f4-7f44-9dff-7d80683afab9',
        promo: {
          headlines: {
            shortHeadline:
              'A ex-diplomata de quase 90 anos que luta há décadas para ser readmitida no Itamaraty',
            headline:
              'A ex-diplomata de quase 90 anos que luta há décadas para ser readmitida no Itamaraty',
          },
          locators: {
            assetUri: '/portuguese/brasil-50133221',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50133221',
            curie:
              'http://www.bbc.co.uk/asset/2bf66934-21f4-7f44-9dff-7d80683afab9',
          },
          summary:
            'Cecília Prada foi obrigada a pedir demissão do Ministério das Relações Exteriores em 1958 por um motivo: havia se casado com um colega diplomata.',
          timestamp: 1572086956671,
          byline: {
            name: 'Talita Marchao',
            title: 'De São Paulo para a BBC News Brasil',
            persons: [
              {
                name: 'Talita Marchao',
                function: 'De São Paulo para a BBC News Brasil',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '109319645',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/D5A3/production/_109319645_ceciliaentranoitamaraty.jpg',
            path: '/cpsprodpb/D5A3/production/_109319645_ceciliaentranoitamaraty.jpg',
            height: 549,
            width: 976,
            altText:
              "Reportagem do jornal 'A Gazeta' fala sobre a entrada de Cecília Prada no Itamaraty",
            caption:
              'Cecília Prada foi notícia quando entrou para o Itamaraty, em 1955; ela teve de abandonar a carreira porque se casou',
            copyrightHolder: 'Arquivo pessoal',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50133221',
        },
      },
      {
        id: 'ff5b8d44-1be3-b444-b9ce-6afb9b489f16',
        count: 8,
        urn: 'urn:bbc:curie:asset:ff5b8d44-1be3-b444-b9ce-6afb9b489f16',
        promo: {
          headlines: {
            shortHeadline: 'O que é a Área 51 e o que existe lá?',
            headline: 'O que é a Área 51 e o que existe lá?',
          },
          locators: {
            assetUri: '/portuguese/brasil-49763499',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-49763499',
            curie:
              'http://www.bbc.co.uk/asset/ff5b8d44-1be3-b444-b9ce-6afb9b489f16',
          },
          summary:
            'Base secreta da Força Aérea americana é alvo de teorias da conspiração há décadas.',
          timestamp: 1569009440197,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3739461b000e9dabfa',
                campaignName: 'WS - Give me perspective',
              },
            ],
          },
          indexImage: {
            id: '108891519',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/1657F/production/_108891519_area.jpg',
            path: '/cpsprodpb/1657F/production/_108891519_area.jpg',
            height: 549,
            width: 976,
            altText: 'Área 51',
            caption:
              'Entrada da Área 51, onde é prometida uma chegada massiva de pessoas',
            copyrightHolder: 'Reuters',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-49763499',
        },
      },
      {
        id: 'e7fe3e06-c347-1845-83f4-cc34f00cb7d0',
        count: 8,
        urn: 'urn:bbc:curie:asset:e7fe3e06-c347-1845-83f4-cc34f00cb7d0',
        promo: {
          headlines: {
            shortHeadline:
              'A época em que o imperador japonês era mais venerado no Brasil do que no Japão',
            headline:
              'A época em que o imperador japonês era mais venerado no Brasil do que no Japão',
          },
          locators: {
            assetUri: '/portuguese/brasil-50104588',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-50104588',
            curie:
              'http://www.bbc.co.uk/asset/e7fe3e06-c347-1845-83f4-cc34f00cb7d0',
          },
          summary:
            'Distantes da pátria-mãe e iludidos sobre o desfecho da Segunda Guerra Mundial, imigrantes nipônicos no Brasil deram sobrevida a doutrina que associava o imperador a poderes divinos.',
          timestamp: 1571668413483,
          byline: {
            name: 'João Fellet - @joaofellet',
            title: 'Da BBC News Brasil em São Paulo',
            persons: [
              {
                name: 'João Fellet - @joaofellet',
                function: 'Da BBC Brasil em Brasília',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '109314445',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/D4A9/production/_109314445_colonia_hirano_national_diet_library_japan.jpg',
            path: '/cpsprodpb/D4A9/production/_109314445_colonia_hirano_national_diet_library_japan.jpg',
            height: 549,
            width: 976,
            altText: 'Escola japonesa na colônia Hirano',
            caption:
              'Escola japonesa na colônia Hirano, em Cafelândia (SP), em 1938; instituições transmitiam valores nipônicos aos filhos dos imigrantes',
            copyrightHolder: 'National Diet Library Japan',
          },
          id: 'urn:bbc:ares::asset:portuguese/brasil-50104588',
        },
      },
      {
        id: 'e6456977-3a6c-de48-ad98-db87b307a429',
        count: 8,
        urn: 'urn:bbc:curie:asset:e6456977-3a6c-de48-ad98-db87b307a429',
        promo: {
          headlines: {
            shortHeadline:
              "Médica explica o que ocorre ao corpo no fim da vida: 'Morrer não é tão ruim quanto se pensa'",
            headline:
              "Médica explica o que ocorre ao corpo no fim da vida: 'Morrer não é tão ruim quanto se pensa'",
          },
          locators: {
            assetUri: '/portuguese/geral-43690170',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-43690170',
            curie:
              'http://www.bbc.co.uk/asset/e6456977-3a6c-de48-ad98-db87b307a429',
          },
          summary:
            'Pioneira em cuidados paliativos, britânica Kathryn Mannix defende que deixemos de usar eufemismos ao falar da morte e passemos a conhecer os estágios naturais do processo para aprendermos a lidar com eles.',
          timestamp: 1558435799232,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '100350284',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/BC4D/production/_100350284_gettyimages-826807066.jpg',
            path: '/cpsprodpb/BC4D/production/_100350284_gettyimages-826807066.jpg',
            height: 549,
            width: 976,
            altText: 'Mulher diante de uma escada para o céu',
            caption:
              'Eufemismos dificultam a perda de um ente querido, diz Mannix',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-43690170',
        },
      },
      {
        id: 'd5b4aad4-0e3a-2849-8aab-38c0b7fed21e',
        count: 8,
        urn: 'urn:bbc:curie:asset:d5b4aad4-0e3a-2849-8aab-38c0b7fed21e',
        promo: {
          headlines: {
            shortHeadline:
              'De vítima de pornô de vingança a aliada do PornHub: as vidas sexuais real e fake de Bella Thorne',
            headline:
              'De vítima de pornô de vingança a aliada do PornHub: as vidas sexuais real e fake de Bella Thorne',
          },
          locators: {
            assetUri: '/portuguese/internacional-50092330',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-50092330',
            curie:
              'http://www.bbc.co.uk/asset/d5b4aad4-0e3a-2849-8aab-38c0b7fed21e',
          },
          summary:
            'Ex-estrela da Disney divulgou as fotos íntimas que recebeu no celular para seus 30 milhões de seguidores após ser vítima de extorsão.',
          timestamp: 1571527214257,
          byline: {
            name: 'Megha Mohan e Yousef Eldin',
            title: 'BBC World',
            persons: [
              {
                name: 'Christian Jarrett',
                function: 'Especial para BBC Future',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
              categoryName: 'Feature',
            },
            campaigns: [
              {
                campaignId: '5a988e1739461b000e9dabf6',
                campaignName: 'WS - CS',
              },
            ],
          },
          indexImage: {
            id: '109260914',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/A3B2/production/_109260914_bella_toppic976b_getty.jpg',
            path: '/cpsprodpb/A3B2/production/_109260914_bella_toppic976b_getty.jpg',
            height: 549,
            width: 976,
            altText: 'Bella Thorne',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-50092330',
        },
      },
      {
        id: 'd26e9cce-1daf-11e4-8cf4-50d33db9bd6e',
        count: 8,
        urn: 'urn:bbc:curie:asset:d26e9cce-1daf-11e4-8cf4-50d33db9bd6e',
        promo: {
          headlines: {
            shortHeadline:
              '10 perguntas para entender o conflito entre israelenses e palestinos',
            headline:
              '10 perguntas para entender o conflito entre israelenses e palestinos',
          },
          locators: {
            assetUri: '/portuguese/noticias/2014/08/140730_gaza_entenda_gf_lk',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2014/08/140730_gaza_entenda_gf_lk',
            curie:
              'http://www.bbc.co.uk/asset/d26e9cce-1daf-11e4-8cf4-50d33db9bd6e',
          },
          summary:
            'Entenda as origens e os interesses envolvidos nos combates na Faixa de Gaza.',
          timestamp: 1550150308333,
          passport: {},
          indexImage: {
            id: 'd5e213',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2014/08/06/140806213610_israeli_tank_112x63_epa_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2014/08/06/140806213610_israeli_tank_112x63_epa_nocredit.jpg',
            height: 63,
            width: 112,
            altText:
              'Tanque israelense próximo à fronteira da Faixa de Gaza (foto: EPA)',
            copyrightHolder: 'EPA',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2014/08/140730_gaza_entenda_gf_lk',
        },
      },
      {
        id: 'c209d3a5-ddcd-f440-aa4e-3d62de5f9721',
        count: 8,
        urn: 'urn:bbc:curie:asset:c209d3a5-ddcd-f440-aa4e-3d62de5f9721',
        promo: {
          headlines: {
            shortHeadline:
              'O que é o chamado ‘sangue dourado’, o tipo sanguíneo mais raro do mundo',
            headline:
              'RH nulo: O que é o chamado ‘sangue dourado’, o tipo sanguíneo mais raro do mundo',
          },
          locators: {
            assetUri: '/portuguese/geral-46931709',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-46931709',
            curie:
              'http://www.bbc.co.uk/asset/c209d3a5-ddcd-f440-aa4e-3d62de5f9721',
          },
          summary:
            'Só são conhecidas cerca de 40 pessoas que possuem o Rh nulo. Esse raro tipo sanguíneo pode salvar vidas, mas também representa grandes riscos a quem é portador.',
          timestamp: 1558434590792,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Explainer',
              categoryName: 'Explainer',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '105197103',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/75E3/production/_105197103_gettyimsangre-1.jpg',
            path: '/cpsprodpb/75E3/production/_105197103_gettyimsangre-1.jpg',
            height: 549,
            width: 976,
            altText: 'sangre',
            caption:
              'La "sangre dorada" es uno de los tipos de sangre más extraños que existen.',
            copyrightHolder: 'Getty',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-46931709',
        },
      },
      {
        id: 'bfe5bd9b-c53b-d849-80ea-433b2e90dcc2',
        count: 8,
        urn: 'urn:bbc:curie:asset:bfe5bd9b-c53b-d849-80ea-433b2e90dcc2',
        promo: {
          headlines: {
            shortHeadline: 'Quatro coisas que você deve saber sobre o Viagra',
            headline: 'Quatro coisas que você deve saber sobre o Viagra',
          },
          locators: {
            assetUri: '/portuguese/geral-43577974',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-43577974',
            curie:
              'http://www.bbc.co.uk/asset/bfe5bd9b-c53b-d849-80ea-433b2e90dcc2',
          },
          summary:
            'Como qualquer outro remédio, o Viagra pode ter efeitos colaterais e contraindicações; segundo a Anvisa, o medicamento é um dos mais falsificados no Brasil.',
          timestamp: 1558435659488,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '97100222',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/56B8/production/_97100222_mediaitem97100221.jpg',
            path: '/cpsprodpb/56B8/production/_97100222_mediaitem97100221.jpg',
            height: 549,
            width: 976,
            altText: 'Pílulas de Viagra',
            caption:
              'A Viagra deve ser usado apenas por homens maiores de 18 anos.',
            copyrightHolder: 'Getty Images',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-43577974',
        },
      },
      {
        id: 'a7abe7cb-b119-7642-9963-b506ee429bca',
        count: 8,
        urn: 'urn:bbc:curie:asset:a7abe7cb-b119-7642-9963-b506ee429bca',
        promo: {
          headlines: {
            shortHeadline:
              "'Fiz dois abortos em sete meses e não me arrependo'",
            headline: "'Fiz dois abortos em sete meses e não me arrependo'",
          },
          locators: {
            assetUri: '/portuguese/geral-48848900',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-48848900',
            curie:
              'http://www.bbc.co.uk/asset/a7abe7cb-b119-7642-9963-b506ee429bca',
          },
          summary:
            'As atitudes do Reino Unido em relação ao aborto estão se tornando mais liberais, de acordo com uma nova pesquisa. Mais pessoas apoiam a interrupção da gravidez até 24 semanas ou mais.',
          timestamp: 1562188958499,
          byline: {
            name: 'Anna Adams e Pete Walker',
            title: 'Programa Victoria Derbyshire, BBC',
            persons: [
              {
                name: 'Anna Adams and Pete Walker',
                function: 'BBC Victoria Derbyshire programme',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '107710257',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/125C1/production/_107710257_sam-2.jpg',
            path: '/cpsprodpb/125C1/production/_107710257_sam-2.jpg',
            height: 549,
            width: 976,
            altText: 'Sam',
            caption:
              'Sam diz que se sentiu burra e envergonhada por ter que fazer um segundo aborto',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-48848900',
        },
      },
      {
        id: '9ef1d096-a74c-a64f-8252-2d2e1a5ea2ef',
        count: 8,
        urn: 'urn:bbc:curie:asset:9ef1d096-a74c-a64f-8252-2d2e1a5ea2ef',
        promo: {
          headlines: {
            shortHeadline:
              "'Como um suplemento alimentar me colocou na fila do transplante de fígado' ",
            headline:
              "'Como um suplemento alimentar me colocou na fila do transplante de fígado' ",
          },
          locators: {
            assetUri: '/portuguese/geral-45975898',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-45975898',
            curie:
              'http://www.bbc.co.uk/asset/9ef1d096-a74c-a64f-8252-2d2e1a5ea2ef',
          },
          summary:
            'Aos 50 anos, Jim McCants tomava cápsulas de chá verde para se manter saudável, mas acabou com uma grave lesão hepática.',
          timestamp: 1550450907786,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e2939461b000e9dabf8',
                campaignName: 'Educate me',
              },
            ],
          },
          indexImage: {
            id: '104018143',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/8585/production/_104018143_hospital976549b.jpg',
            path: '/cpsprodpb/8585/production/_104018143_hospital976549b.jpg',
            height: 549,
            width: 976,
            altText: 'Jim McCants in hospital',
            copyrightHolder: 'Jim McCants',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-45975898',
        },
      },
      {
        id: '8b1907b9-fb47-8445-a3ea-e6b4133898aa',
        count: 8,
        urn: 'urn:bbc:curie:asset:8b1907b9-fb47-8445-a3ea-e6b4133898aa',
        promo: {
          headlines: {
            shortHeadline:
              '5 exemplos da escravidão moderna, que atinge mais de 160 mil brasileiros',
            headline:
              '5 exemplos da escravidão moderna, que atinge mais de 160 mil brasileiros',
          },
          locators: {
            assetUri: '/portuguese/internacional-36429539',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-36429539',
            curie:
              'http://www.bbc.co.uk/asset/8b1907b9-fb47-8445-a3ea-e6b4133898aa',
          },
          summary:
            'Segundo relatório da Fundação Walk Free, mais de 45,8 milhões de pessoas são submetidas a trabalho forçado atualmente em todo o mundo',
          timestamp: 1558434403072,
          passport: {},
          indexImage: {
            id: '89877305',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/C4C9/production/_89877305_9217df2e-b4df-47c3-bc2e-7513c3800b69.jpg',
            path: '/cpsprodpb/C4C9/production/_89877305_9217df2e-b4df-47c3-bc2e-7513c3800b69.jpg',
            height: 549,
            width: 976,
            altText:
              'A maioria dos casos de escravidão moderna acontece na Ásia',
            caption:
              'A maioria dos casos de escravidão moderna acontece na Ásia',
            copyrightHolder: 'AFP',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-36429539',
        },
      },
      {
        id: '8277e93e-4253-0f49-8bc5-f869f6e253ac',
        count: 8,
        urn: 'urn:bbc:curie:asset:8277e93e-4253-0f49-8bc5-f869f6e253ac',
        promo: {
          headlines: {
            shortHeadline:
              '5 mitos sobre o sexo oral relacionados com doenças sexualmente transmissíveis',
            headline:
              '5 mitos sobre o sexo oral relacionados com doenças sexualmente transmissíveis',
          },
          locators: {
            assetUri: '/portuguese/geral-39549220',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-39549220',
            curie:
              'http://www.bbc.co.uk/asset/8277e93e-4253-0f49-8bc5-f869f6e253ac',
          },
          summary:
            'Há quem acredite que o sexo oral seja uma prática 100% segura, mas especialistas explicam riscos de contágio e como evitá-los.',
          timestamp: 1558434274081,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '94880016',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/EE50/production/_94880016_thinkstockphotos-638902152.jpg',
            path: '/cpsprodpb/EE50/production/_94880016_thinkstockphotos-638902152.jpg',
            height: 549,
            width: 976,
            altText: 'Hombre y mujer',
            caption: 'El sexo es considerada una práctica sexual muy saludable',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-39549220',
        },
      },
      {
        id: '6f4befaf-6146-5f45-b90e-5933a26e2f67',
        count: 8,
        urn: 'urn:bbc:curie:asset:6f4befaf-6146-5f45-b90e-5933a26e2f67',
        promo: {
          headlines: {
            shortHeadline:
              'Aluna de escola pública inventa monitor cardíaco para sonâmbulos',
            headline:
              'Aluna de escola pública inventa monitor cardíaco para sonâmbulos',
          },
          locators: {
            assetUri: '/portuguese/geral-39930541',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-39930541',
            curie:
              'http://www.bbc.co.uk/asset/6f4befaf-6146-5f45-b90e-5933a26e2f67',
          },
          summary:
            'Em projeto de iniciação científica, Nathália Souza desenvolveu protótipo que será testado em pacientes com ajuda de empresa estrangeira.',
          timestamp: 1572865772361,
          byline: {
            name: 'Camilla Costa',
            title: 'Da BBC Brasil em São Paulo',
            persons: [
              {
                name: 'Camilla Costa',
                function: 'da BBC Brasil em São Paulo',
              },
            ],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '96081681',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/48BA/production/_96081681_whatsappimage2017-05-15at14.17.20.jpg',
            path: '/cpsprodpb/48BA/production/_96081681_whatsappimage2017-05-15at14.17.20.jpg',
            height: 549,
            width: 976,
            altText: 'Nathália Souza de Oliveira',
            caption:
              'Estudante usou iniciação científica escolar para ajudar pessoas que sofrem com distúrbio do sono',
            copyrightHolder: 'Arquivo pessoal',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-39930541',
        },
      },
      {
        id: '654790b7-b6b6-e643-bce6-888ed90970f1',
        count: 8,
        urn: 'urn:bbc:curie:asset:654790b7-b6b6-e643-bce6-888ed90970f1',
        promo: {
          headlines: {
            shortHeadline:
              '7 mitos e verdades sobre datas de validade de remédios e cosméticos',
            headline:
              '7 mitos e verdades sobre datas de validade de remédios e cosméticos',
          },
          locators: {
            assetUri: '/portuguese/internacional-37913546',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-37913546',
            curie:
              'http://www.bbc.co.uk/asset/654790b7-b6b6-e643-bce6-888ed90970f1',
          },
          summary:
            'Especialistam explicam lógica por trás de prazos e o que devemos fazer para não prejudicar nossa saúde.',
          timestamp: 1561987332027,
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '91032073',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/909F/production/_91032073_5.jpg',
            path: '/cpsprodpb/909F/production/_91032073_5.jpg',
            height: 549,
            width: 976,
            altText: 'Científico',
            caption:
              'Cuando una medicina sale al mercado ha cumplido con una serie de estudios rigurosos, en los cuales se determina hasta cuándo su principio activo funcionará adecuadamente.',
            copyrightHolder: 'Thinkstock',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-37913546',
        },
      },
      {
        id: '5b781c6d-0402-b04c-86c7-26f50e421724',
        count: 8,
        urn: 'urn:bbc:curie:asset:5b781c6d-0402-b04c-86c7-26f50e421724',
        promo: {
          headlines: {
            shortHeadline:
              'Por que a América Latina é a região mais violenta do mundo',
            headline:
              'Por que a América Latina é a região mais violenta do mundo',
          },
          locators: {
            assetUri: '/portuguese/internacional-48988559',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/internacional-48988559',
            curie:
              'http://www.bbc.co.uk/asset/5b781c6d-0402-b04c-86c7-26f50e421724',
          },
          summary:
            'A América Latina sangra com as piores taxas de homicídio do planeta, mas as explicações para níveis tão elevados de violência não estão relacionadas a investimentos escassos em segurança ou falta de políticas mais duras para combater a criminalidade.',
          timestamp: 1563785793768,
          byline: {
            name: 'Gerardo Lissardy',
            title: 'BBC News Mundo',
            persons: [{ name: 'Gerardo Lissardy', function: 'BBC News Mundo' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
            campaigns: [
              {
                campaignId: '5a988e3e39461b000e9dabfb',
                campaignName: 'WS - Keep me on trend',
              },
            ],
          },
          indexImage: {
            id: '107845162',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/662A/production/_107845162_gettyimages-944976640-1.jpg',
            path: '/cpsprodpb/662A/production/_107845162_gettyimages-944976640-1.jpg',
            height: 549,
            width: 976,
            altText: 'homens armados',
            caption:
              'Civis armados contra o crime organizado são uma resposta extrema na América Latina diante da falta de soluções do Estado para o problema da violência crescente',
            copyrightHolder: 'AFP',
          },
          id: 'urn:bbc:ares::asset:portuguese/internacional-48988559',
        },
      },
      {
        id: '52d1eef7-2641-b049-b128-3550e419328e',
        count: 8,
        urn: 'urn:bbc:curie:asset:52d1eef7-2641-b049-b128-3550e419328e',
        promo: {
          headlines: {
            shortHeadline:
              'O que é a ‘masculinidade suave’, que está cada vez mais na moda',
            headline:
              'O que é a ‘masculinidade suave’, que está cada vez mais na moda',
          },
          locators: {
            assetUri: '/portuguese/geral-45434713',
            cpsUrn: 'urn:bbc:content:assetUri:portuguese/geral-45434713',
            curie:
              'http://www.bbc.co.uk/asset/52d1eef7-2641-b049-b128-3550e419328e',
          },
          summary:
            'Na Coreia do Sul, o conceito mais flexível de estética masculina, introduzido pelo fenômeno K-pop, está mudando a atitude de muitos homens e influenciando o mundo.',
          timestamp: 1549884806194,
          byline: {
            name: 'Saira Asher',
            title: 'BBC News',
            persons: [{ name: 'Saira Asher', function: 'BBC News' }],
          },
          passport: {
            category: {
              categoryId:
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
              categoryName: 'News',
            },
          },
          indexImage: {
            id: '100195959',
            subType: 'index',
            href: 'http://c.files.bbci.co.uk/176D7/production/_100195959_q49c6333.jpg',
            path: '/cpsprodpb/176D7/production/_100195959_q49c6333.jpg',
            height: 549,
            width: 976,
            altText: 'Hombre coreano maquillado.',
            copyrightHolder: 'BBC',
          },
          id: 'urn:bbc:ares::asset:portuguese/geral-45434713',
        },
      },
      {
        id: '1107e59e-ba78-11e3-a6ef-04bf3db9bd6e',
        count: 8,
        urn: 'urn:bbc:curie:asset:1107e59e-ba78-11e3-a6ef-04bf3db9bd6e',
        promo: {
          headlines: {
            shortHeadline: 'Conheça os cinco terremotos mais fortes do mundo',
            headline: 'Conheça os cinco terremotos mais fortes do mundo',
          },
          locators: {
            assetUri:
              '/portuguese/noticias/2014/04/140402_cinco_maiores_terremotos_lgb',
            cpsUrn:
              'urn:bbc:content:assetUri:portuguese/noticias/2014/04/140402_cinco_maiores_terremotos_lgb',
            curie:
              'http://www.bbc.co.uk/asset/1107e59e-ba78-11e3-a6ef-04bf3db9bd6e',
          },
          summary:
            'Chile lidera a lista dos tremores por magnitude; em 1960, sismo atingiu 9,5 na escala e matou 1,6 mil pessoas.   ',
          timestamp: 1550252007489,
          passport: {},
          indexImage: {
            id: 'd5e225',
            subType: 'index',
            href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2014/04/02/140402124135_chile_boat_112x63_ff_nocredit.jpg',
            path: '/amz/worldservice/live/assets/images/2014/04/02/140402124135_chile_boat_112x63_ff_nocredit.jpg',
            height: 63,
            width: 112,
            altText: 'Terremoto no Chile | Crédito: FF',
            copyrightHolder: 'ff',
          },
          id: 'urn:bbc:ares::asset:portuguese/noticias/2014/04/140402_cinco_maiores_terremotos_lgb',
        },
      },
    ],
  },
  recommendations: [
    {
      headlines: {
        shortHeadline:
          'PL das fake news pode acirrar polarização política, diz pesquisador',
        headline:
          'PL das fake news pode acirrar polarização política, diz pesquisador',
      },
      locators: {
        assetUri: '/portuguese/brasil-53418555',
        cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-53418555',
        curie:
          'http://www.bbc.co.uk/asset/ee63ad3c-400f-4b0b-8e83-f421e38af54b',
        assetId: '53418555',
      },
      summary:
        "Diretor do InternetLab, Francisco Brito Cruz vê perigos em projeto de lei aprovado 'na correria'; depois de passar pelo Senado, texto agora tramita na Câmara.",
      timestamp: 1594976485000,
      language: 'pt-BR',
      byline: {
        name: 'Juliana Gragnani - @julianagragnani',
        title: 'Da BBC News Brasil em Londres',
        persons: [
          {
            name: 'Juliana Gragnani',
            function: 'Da BBC News Brasil em Londres',
            twitterName: 'julianagragnani',
          },
        ],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e3739461b000e9dabfa',
            campaignName: 'WS - Give me perspective',
          },
        ],
        taggings: [],
      },
      indexImage: {
        id: '113174534',
        subType: 'index',
        href: 'http://c.files.bbci.co.uk/AA1B/production/_113174534_gettyimages-1209693436.jpg',
        path: '/cpsprodpb/AA1B/production/_113174534_gettyimages-1209693436.jpg',
        height: 549,
        width: 976,
        altText: 'Pessoas mexendo em seus celulares',
        caption:
          'Caso seja aprovado pelos deputados e sancionada por Bolsonaro, o projeto criará a Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet',
        copyrightHolder: 'Getty Images',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:portuguese/brasil-53418555',
      type: 'cps',
    },
    {
      headlines: {
        shortHeadline:
          "Críticas sobre suposta 'censura' e 'falta de transparência' do Facebook unem petistas e bolsonaristas",
        headline:
          "Críticas sobre suposta 'censura' e 'falta de transparência' do Facebook unem petistas e bolsonaristas",
      },
      locators: {
        assetUri: '/portuguese/brasil-53364255',
        cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-53364255',
        curie:
          'http://www.bbc.co.uk/asset/44b8d983-c228-4ad0-998c-1fdebc0b61b9',
        assetId: '53364255',
      },
      summary:
        "Contas ligadas a assessores da família Bolsonaro e de apoiadores foram derrubadas na rede social, depois de terem sido acusadas de agir para 'para enganar o público'; PT diz ter tido nove contas desativadas no WhatsApp.",
      timestamp: 1594405557000,
      language: 'pt-BR',
      byline: {
        name: 'Ricardo Senra - @ricksenra',
        title: 'Da BBC News Brasil em Londres',
        persons: [{ name: 'Ricardo Senra', function: 'BBC News Brasil' }],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e3e39461b000e9dabfb',
            campaignName: 'WS - Keep me on trend',
          },
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
        taggings: [],
      },
      indexImage: {
        id: '113324881',
        subType: 'index',
        href: 'http://c.files.bbci.co.uk/499A/production/_113324881_untitledcollage.jpg',
        path: '/cpsprodpb/499A/production/_113324881_untitledcollage.jpg',
        height: 549,
        width: 976,
        altText: 'Eduardo Bolsonaro e Gleisi',
        caption:
          'Bolsonaristas e petistas foram atingidos de formas distintas por investigações recentes do Facebook',
        copyrightHolder: 'AFP/Agência Brasil',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:portuguese/brasil-53364255',
      type: 'cps',
    },
    {
      headlines: {
        shortHeadline:
          'Senado adia votação do PL das Fake News, alvo de críticas de bolsonaristas a organizações de direito digital; entenda',
        headline:
          'Senado adia votação do PL das Fake News, alvo de críticas de bolsonaristas a organizações de direito digital; entenda',
      },
      locators: {
        assetUri: '/portuguese/brasil-52888697',
        cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-52888697',
        curie:
          'http://www.bbc.co.uk/asset/9d320d55-e016-4388-b195-b049f5f4257d',
        assetId: '52888697',
      },
      summary:
        'Autores da proposta negam que projeto de lei provoque censura, mas críticos apontam ameaça à liberdade de expressão',
      timestamp: 1591095974000,
      language: 'pt-BR',
      byline: {
        name: 'Mariana Schreiber - @marischreiber',
        title: 'Da BBC News Brasil em Brasília',
        persons: [
          {
            name: 'Mariana Schreiber - @marischreiber',
            function: 'Da BBC News Brasil em Brasília',
          },
        ],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e3739461b000e9dabfa',
            campaignName: 'WS - Give me perspective',
          },
        ],
        taggings: [],
      },
      indexImage: {
        id: '105158368',
        subType: 'index',
        href: 'http://c.files.bbci.co.uk/15171/production/_105158368_fake.jpg',
        path: '/cpsprodpb/15171/production/_105158368_fake.jpg',
        height: 371,
        width: 660,
        altText: 'Celulares',
        caption:
          'Pesquisadores estão tentando medir o impacto que disseminação de notícias falsas teve em eleições recentes',
        copyrightHolder: 'Getty Images',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:portuguese/brasil-52888697',
      type: 'cps',
    },
    {
      headlines: {
        shortHeadline:
          'O avanço das escolas cívico-militares na rede particular de ensino',
        headline:
          'O avanço das escolas cívico-militares na rede particular de ensino',
      },
      locators: {
        assetUri: '/portuguese/brasil-51822924',
        cpsUrn: 'urn:bbc:content:assetUri:portuguese/brasil-51822924',
        curie:
          'http://www.bbc.co.uk/asset/7ea59781-4876-fb43-b08f-2b82489c388f',
        assetId: '51822924',
      },
      summary:
        "Administrados por policiais ou empresários que viram o avanço do conservadorismo como oportunidade de negócio, elas incentivam a 'disciplina e o respeito à hierarquia' como método para melhorar o desempenho escolar.",
      timestamp: 1592157829000,
      language: 'pt-BR',
      byline: {
        name: 'Camilla Veras Mota e Leandro Machado',
        title: 'Da BBC News Brasil em São Paulo',
        persons: [
          { name: 'Leandro Machado', function: 'BBC Brasil, Sao Paulo' },
        ],
      },
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e3739461b000e9dabfa',
            campaignName: 'WS - Give me perspective',
          },
        ],
        taggings: [],
      },
      indexImage: {
        id: '111754340',
        subType: 'index',
        href: 'http://c.files.bbci.co.uk/10F9/production/_111754340_dsc_0999.jpg',
        path: '/cpsprodpb/10F9/production/_111754340_dsc_0999.jpg',
        height: 549,
        width: 976,
        altText:
          'Militar colocando uma boina vermelha em uma aluna do colégio Vila Militar, de Curitiba',
        caption:
          'Em Curitiba, pais de estudantes do Colégio Vila Militar elogiam método de ensino da unidade',
        copyrightHolder: 'Colégio Vila Militar/Divulgação',
        type: 'image',
      },
      id: 'urn:bbc:ares::asset:portuguese/brasil-51822924',
      type: 'cps',
    },
  ],
};
export const passportTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/format',
    value:
      'http://www.bbc.co.uk/things/b3c67683-6ada-46da-a329-16fbd4a12c96#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/75612fa6-147c-4a43-97fa-fcf70d9cced3#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/8b04c2e8-5409-4e7d-9877-3ccaf04727af#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/audience/motivation',
    value:
      'http://www.bbc.co.uk/things/bf928ac3-b3bd-4d47-924e-cca1bdc29174#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/667ecf35-a325-4eed-adf9-80aac7d58eaf#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
    value:
      'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/df5b7d56-4f82-4fd9-a627-2c5ee1427422#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/2465d7e4-05d0-4062-9a12-cb0eb10b24c1#id',
  },
];

export const passportPredicatesFormats = [
  {
    value:
      'http://www.bbc.co.uk/things/b3c67683-6ada-46da-a329-16fbd4a12c96#id',
    thingLabel: 'Interview',
    thingUri:
      'http://www.bbc.co.uk/things/b3c67683-6ada-46da-a329-16fbd4a12c96#id',
    thingId: 'b3c67683-6ada-46da-a329-16fbd4a12c96',
    thingType: ['tagging:TagConcept', 'tagging:Format'],
    thingSameAs: [
      'http://www.wikidata.org/entity/Q178651',
      'http://dbpedia.org/resource/Interview',
    ],
    thingEnglishLabel: 'Interview',
    thingPreferredLabel: 'Interview',
    thingLabelLanguage: 'ky',
    type: 'formats',
  },
];
