import {
  blockContainingText,
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

export const hybridV1RecommendationsSample = [
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
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: 'd1e530c8',
          type: 'wsoj',
          model: {
            type: 'recommendations',
            path: '/api/recommend?recSys=2&limit=4&assetUri=/portuguese/brasil-54196636',
          },
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
    createdBy: 'brasil-v6',
    id: 'urn:bbc:ares::asset:portuguese/brasil-54196636',
    language: 'pt-BR',
    locators: {
      assetId: '54196636',
      assetUri: '/portuguese/brasil-54196636',
    },
    options: {
      allowAdvertising: true,
    },
    siteUri: '/portuguese',
    timestamp: 1600370390000,
    type: 'STY',
    version: 'v1.3.7',
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
