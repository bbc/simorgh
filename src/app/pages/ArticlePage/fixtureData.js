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
