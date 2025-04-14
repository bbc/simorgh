import {
  Article,
  OptimoBylineContributorBlock,
} from '#app/models/types/optimo';
import {
  blockContainingText,
  bylineBlock,
  singleTextBlock,
  textBlock,
} from '#models/blocks';

const blocksWithHeadlineAndText = (blockValues: (object | string)[]) => {
  const [headlineText, paragraphText, ...additional] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    // @ts-expect-error - type checking not added for block helpers
    singleTextBlock(paragraphText, 2),
    ...additional,
  ];
};

const blocksWithHeadlineTexAndByline = (blockValues: (object | string)[]) => {
  const [headlineText, paragraphText, twitterHandle] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    // @ts-expect-error - type checking not added for block helpers
    bylineBlock(twitterHandle, 2),
    // @ts-expect-error - type checking not added for block helpers
    singleTextBlock(paragraphText, 3),
  ];
};

const articleDataBuilder = (
  id: string,
  createdBy: string,
  language: string,
  home: string,
  blockValues: (object | string)[],
  seoHeadline: string,
  promoHeadline: string,
  summary: string,
  things: object,
  allowAdvertising = false,
  articleBlocksPopulator = blocksWithHeadlineAndText,
  atiAnalytics = {},
  type = 'article',
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    atiAnalytics,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    analyticsLabels: {
      contentId: 'urn:bbc:optimo:c0000000001o',
    },
    type,
    createdBy,
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514815200000,
    language,
    passport: {
      language,
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
  [
    'Article Headline',
    'A paragraph.',
    {
      id: 'ef3a6bbd',
      type: 'wsoj',
      model: {
        type: 'recommendations',
      },
      position: [9],
    },
    {
      id: 'c9043147',
      type: 'podcastPromo',
      model: {
        type: 'podcastPromo',
      },
      position: [9],
    },
    {
      id: '044a8578',
      type: 'oEmbed',
      model: {
        oembed: {
          version: '1.0',
          provider_name: 'riddle',
          provider_url: 'https://www.riddle.com',
          url: 'https://www.riddle.com/view/SAVstNdh',
          html: '<div class="riddle2-wrapper" data-rid-id="SAVstNdh" data-auto-scroll="true" data-is-fixed-height-enabled="false" data-bg="#fff" data-fg="#00205b" style="margin:0 auto; max-width:100%; width:640px;" ><script src="https://www.riddle.com/embed/build-embedjs/embedV2.js"></script><iframe src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false" allow="autoplay" referrerpolicy="strict-origin"><section data-block="SingleChoice"><h2>How silly is Abby?</h2><p>&lt;p&gt;Babby&lt;/p&gt;</p><ul><li>Extremely silly</li><li>Not silly at all</li><li>Not very silly</li><li>Very silly</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness level?</h3><ul><li>High</li><li>Low</li><li>Medium</li><li>None</li></ul></section><section data-block="SingleChoice"><h3>How often is Abby silly?</h3><ul><li>Never</li><li>Rarely</li><li>Always</li><li>Sometimes</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness like?</h3><ul><li>Outrageous</li><li>Non-existent</li><li>Mild</li><li>Moderate</li></ul></section><section data-block="SingleChoice"><h3>How would you describe Abby&#039;s silliness?</h3><ul><li>Crazy</li><li>Calm</li><li>Boring</li><li>Sensible</li></ul></section></iframe></div>',
          type: 'rich',
          aresType: 'aresRiddle',
        },
      },
      position: [5],
    },
    {
      id: 'ec2cc789',
      type: 'image',
      model: {
        blocks: [
          {
            id: '2b420fde',
            type: 'altText',
            model: {
              blocks: [
                {
                  id: '845446c2',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        id: '65e99201',
                        type: 'paragraph',
                        model: {
                          text: 'Shiroo buddeen waliin',
                          blocks: [
                            {
                              id: 'b58767fc',
                              type: 'fragment',
                              model: {
                                text: 'Shiroo buddeen waliin',
                                attributes: [],
                              },
                              position: [11, 1, 1, 1, 1],
                            },
                          ],
                        },
                        position: [11, 1, 1, 1],
                      },
                    ],
                  },
                  position: [11, 1, 1],
                },
              ],
            },
            position: [11, 1],
          },
          {
            id: '8d3a8c2c',
            type: 'rawImage',
            model: {
              width: 951,
              height: 535,
              locator: '157c/live/d5c6e520-16dd-11ef-9b12-1ba8f95c4917.jpg',
              originCode: 'cpsprodpb',
              copyrightHolder: 'BBC',
              suitableForSyndication: true,
            },
            position: [11, 2],
          },
        ],
      },
      position: [11],
    },
  ],
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
  presetThings,
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: 'Royal+Wedding+2018~Duchess+of+Sussex',
    contentId: 'urn:bbc:optimo:c0000000001o',
    contentType: 'article',
    language: 'en-gb',
    ldpThingIds:
      '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
    ldpThingLabels: 'Royal+Wedding+2018~Duchess+of+Sussex',
    nationsProducer: null,
    pageIdentifier: 'news.articles.c0000000001o.page',
    pageTitle: 'Article Headline for SEO',
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
  },
) as unknown as Article;

export const articleDataNewsWithEmbeds = articleDataBuilder(
  'c0000000001o',
  'News',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  [
    'Article Headline',
    'A paragraph.',
    {
      id: '044a8578',
      type: 'oEmbed',
      model: {
        oembed: {
          version: '1.0',
          provider_name: 'riddle',
          provider_url: 'https://www.riddle.com',
          url: 'https://www.riddle.com/view/SAVstNdh',
          html: '<div class="riddle2-wrapper" data-rid-id="SAVstNdh" data-auto-scroll="true" data-is-fixed-height-enabled="false" data-bg="#fff" data-fg="#00205b" style="margin:0 auto; max-width:100%; width:640px;" ><script src="https://www.riddle.com/embed/build-embedjs/embedV2.js"></script><iframe src="https://www.riddle.com/embed/a/SAVstNdh?lazyImages=true&staticHeight=false" allow="autoplay" referrerpolicy="strict-origin"><section data-block="SingleChoice"><h2>How silly is Abby?</h2><p>&lt;p&gt;Babby&lt;/p&gt;</p><ul><li>Extremely silly</li><li>Not silly at all</li><li>Not very silly</li><li>Very silly</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness level?</h3><ul><li>High</li><li>Low</li><li>Medium</li><li>None</li></ul></section><section data-block="SingleChoice"><h3>How often is Abby silly?</h3><ul><li>Never</li><li>Rarely</li><li>Always</li><li>Sometimes</li></ul></section><section data-block="SingleChoice"><h3>What is Abby&#039;s silliness like?</h3><ul><li>Outrageous</li><li>Non-existent</li><li>Mild</li><li>Moderate</li></ul></section><section data-block="SingleChoice"><h3>How would you describe Abby&#039;s silliness?</h3><ul><li>Crazy</li><li>Calm</li><li>Boring</li><li>Sensible</li></ul></section></iframe></div>',
          type: 'rich',
          aresType: 'aresRiddle',
        },
      },
      position: [5],
    },
    {
      id: '044a8579',
      type: 'embedHtml',
      model: {
        embeddableContent: '<html><h1>Embed HTML Component</h1></html>',
      },
    },
    {
      id: '19a21950',
      type: 'embedImages',
      model: {
        blocks: [
          {
            id: '926faa7f',
            type: 'image',
            model: {
              blocks: [
                {
                  id: '43aa3254',
                  type: 'altText',
                  model: {
                    blocks: [
                      {
                        id: '6ef09e8d',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: '786213cc',
                              type: 'paragraph',
                              model: {
                                text: 'CPS vs Optimo usage. .  .',
                                blocks: [
                                  {
                                    id: '7c3a571b',
                                    type: 'fragment',
                                    model: {
                                      text: 'CPS vs Optimo usage. .  .',
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
                  id: 'c035496c',
                  type: 'rawImage',
                  model: {
                    height: 852,
                    width: 920,
                    locator:
                      '/idt2/793f648b-b17f-489a-a473-9e5a71f12684/image/460',
                    href: null,
                    originCode: 'idt2',
                    copyrightHolder: 'bbc',
                    suitableForSyndication: true,
                  },
                },
              ],
            },
          },
          {
            id: '378245e5',
            type: 'image',
            model: {
              blocks: [
                {
                  id: '11e1fafa',
                  type: 'altText',
                  model: {
                    blocks: [
                      {
                        id: '1859ef48',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: 'dfcd0bd8',
                              type: 'paragraph',
                              model: {
                                text: 'CPS vs Optimo usage. .  .',
                                blocks: [
                                  {
                                    id: '373f5664',
                                    type: 'fragment',
                                    model: {
                                      text: 'CPS vs Optimo usage. .  .',
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
                  id: 'c95e2d51',
                  type: 'rawImage',
                  model: {
                    height: 1054,
                    width: 1280,
                    locator:
                      '/idt2/793f648b-b17f-489a-a473-9e5a71f12684/image/640',
                    href: null,
                    originCode: 'idt2',
                    copyrightHolder: 'bbc',
                    suitableForSyndication: true,
                  },
                },
              ],
            },
          },
          {
            id: '0b9d2ccb',
            type: 'image',
            model: {
              blocks: [
                {
                  id: '1be51985',
                  type: 'altText',
                  model: {
                    blocks: [
                      {
                        id: '4b3fa380',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: '73f75999',
                              type: 'paragraph',
                              model: {
                                text: 'CPS vs Optimo usage. .  .',
                                blocks: [
                                  {
                                    id: '3726fb5f',
                                    type: 'fragment',
                                    model: {
                                      text: 'CPS vs Optimo usage. .  .',
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
                  id: '86cd5681',
                  type: 'rawImage',
                  model: {
                    height: 1252,
                    width: 1632,
                    locator:
                      '/idt2/793f648b-b17f-489a-a473-9e5a71f12684/image/816',
                    href: null,
                    originCode: 'idt2',
                    copyrightHolder: 'bbc',
                    suitableForSyndication: true,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 'acfc77b6',
      type: 'embed',
      model: {
        locator: 'urn:bbc:telescope:vote:LDNXKfL',
        provider: 'telescope-vote',
        usageRights: { suitableForSyndication: true },
        blocks: [
          {
            id: '73f52c1a',
            type: 'aresTelescope',
            model: { isSignInRequired: false, wid: '15268' },
            position: [4, 1],
          },
        ],
      },
      position: [4],
    },
    {
      type: 'embedUploader',
      id: '044a8585',
      model: {
        blocks: [
          {
            id: '2488a6c7',
            type: 'aresUploader',
            model: {
              openingTime: '',
              closingTime: '',
              signinRequired: false,
              campaignStatus: 'open',
              blocks: [
                {
                  id: '7bc611ad',
                  type: 'title',
                  model: {
                    blocks: [
                      {
                        id: 'ff83ac2d',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: '5a40fc62',
                              type: 'paragraph',
                              model: {
                                text: 'Get involved',
                                blocks: [
                                  {
                                    id: 'e29b1166',
                                    type: 'fragment',
                                    model: {
                                      text: 'Get involved',
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
                  id: '84300d50',
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        id: '32cae5cf',
                        type: 'paragraph',
                        model: {
                          text: 'UGC Core Features 1 - Custom Form',
                          blocks: [
                            {
                              id: '059ad032',
                              type: 'fragment',
                              model: {
                                text: 'UGC Core Features 1 - Custom Form',
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
                  id: 'd220c862',
                  type: 'link',
                  model: {
                    locator:
                      'urn:bbc:content:url-promo:https%3A%2F%2Fwww.bbc.com%2Fsend%2Fu94753086',
                    blocks: [
                      {
                        id: 'f2c76b0a',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: '172eb0d5',
                              type: 'paragraph',
                              model: {
                                text: 'Send form',
                                blocks: [
                                  {
                                    id: '9e67d4d4',
                                    type: 'urlLink',
                                    model: {
                                      text: 'Send form',
                                      locator:
                                        'https://www.bbc.com/send/u94753086',
                                      blocks: [
                                        {
                                          id: 'b31d1113',
                                          type: 'fragment',
                                          model: {
                                            text: 'Send form',
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
                {
                  id: 'f21ce980',
                  type: 'aresSendCTA',
                  model: {
                    blocks: [
                      {
                        id: '075d32c5',
                        type: 'text',
                        model: {
                          blocks: [
                            {
                              id: 'd6deb3ba',
                              type: 'paragraph',
                              model: {
                                text: 'Send form',
                                blocks: [
                                  {
                                    id: 'b1cdac2a',
                                    type: 'fragment',
                                    model: {
                                      text: 'Send form',
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
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
  presetThings,
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: 'Royal+Wedding+2018~Duchess+of+Sussex',
    contentId: 'urn:bbc:optimo:c0000000001o',
    contentType: 'article',
    language: 'en-gb',
    ldpThingIds:
      '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa~803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
    ldpThingLabels: 'Royal+Wedding+2018~Duchess+of+Sussex',
    nationsProducer: null,
    pageIdentifier: 'news.articles.c0000000001o.page',
    pageTitle: 'Article Headline for SEO',
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
  },
) as unknown as Article;

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
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: null,
    contentId: 'urn:bbc:optimo:c0000000001o',
    contentType: 'article',
    language: 'en-gb',
    ldpThingIds: null,
    ldpThingLabels: null,
    nationsProducer: null,
    pageIdentifier: null,
    pageTitle: 'سرصفحه مقاله',
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
  },
) as unknown as Article;

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
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: null,
    contentId: 'urn:bbc:optimo:c0000000001o',
    language: 'en-gb',
    ldpThingIds: null,
    ldpThingLabels: null,
    nationsProducer: null,
    pageIdentifier: null,
    pageTitle: 'Article Headline for SEO in Pidgin',
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
  },
) as unknown as Article;

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
) as unknown as Article;

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
) as unknown as Article;

export const articlePglDataPidgin = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article PGL Headline for SEO in Pidgin',
  'Article PGL Headline for Promo in Pidgin',
  'Article PGL summary in Pidgin',
  emptyThings,
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: null,
    contentId: 'urn:bbc:optimo:c0000000001o',
    language: 'pcm',
    ldpThingIds: null,
    ldpThingLabels: null,
    nationsProducer: null,
    pageIdentifier: null,
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
    pageTitle: 'Article Headline for SEO in Pidgin',
  },
  'PGL',
) as unknown as Article;

export const articleStyDataPidgin = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article PGL Headline for SEO in Pidgin',
  'Article PGL Headline for Promo in Pidgin',
  'Article PGL summary in Pidgin',
  emptyThings,
  false,
  blocksWithHeadlineAndText,
  {
    categoryName: null,
    contentId: 'urn:bbc:optimo:c0000000001o',
    language: 'pcm',
    ldpThingIds: null,
    ldpThingLabels: null,
    nationsProducer: null,
    pageIdentifier: null,
    timePublished: '2018-01-01T12:01:00.000Z',
    timeUpdated: '2018-01-01T14:00:00.000Z',
    pageTitle: 'Article Headline for SEO in Pidgin',
  },
  'STY',
) as unknown as Article;

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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
] as OptimoBylineContributorBlock[];

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

export const promoSample = {
  headlines: {
    seoHeadline: 'Podcast Promo 8 Paragraphs (Valid)',
    promoHeadline: {
      blocks: [
        {
          type: 'text',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'Podcast Promo 8 text block Paragraphs (Valid)',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'Podcast Promo 8 text block Paragraphs (Valid)',
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
  summary: {
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
};
