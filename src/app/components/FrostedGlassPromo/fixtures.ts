import { PromoProps } from './types';

export const promoProps = {
  children:
    'Además de sus decenas de museos tradicionales, Ciudad de México es una galería al aire libre de arte callejero, en la que exponen artistas nacionales y extranjeros. Lo invitamos a un recorrido.',
  footer: '4 mayo 2021',
  url: '/mundo/internacional-23038380',
  image: {
    ratio: 52,
    src: 'https://ichef.bbci.co.uk/news/400/cpsdevpb/DDFC/test/_63482865_orange2.jpg',
    alt: 'Orange 2',
    width: 976,
  },
};

export const linkPromoFixture = {
  item: {
    name: 'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
    summary:
      'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
    indexImage: {
      id: '63731494',
      subType: 'index',
      href: 'http://b.files.bbci.co.uk/C105/test/_63731494__110870927_climategrief5.jpg',
      path: '/cpsdevpb/C105/test/_63731494__110870927_climategrief5.jpg',
      height: 351,
      width: 624,
      altText: 'E dey good for your',
      caption: 'E dey good for your wellbeing to reconnect wit nature',
      copyrightHolder: 'BBC',
      type: 'image',
    },
    uri: 'https://www.bbc.com/pidgin/sport-51434980',
    contentType: 'RadioBulletin',
    assetTypeCode: 'PRO',
    timestamp: 1581941235000,
    type: 'link',
  },
  dir: 'ltr',
  displayImage: true,
  displaySummary: false,
  eventTrackingData: {
    block: {
      componentName: 'features',
    },
  },
};

export const cpsPromoFixture = {
  item: {
    headlines: {
      headline: 'El colorido encanto del arte callejero chilango 17',
    },
    locators: {
      assetUri: '/mundo/internacional-23038380',
      cpsUrn: 'urn:bbc:content:assetUri:mundo/internacional-23038380',
      assetId: '23038380',
    },
    summary:
      'Además de sus decenas de museos tradicionales, Ciudad de México es una galería al aire libre de arte callejero, en la que exponen artistas nacionales y extranjeros. Lo invitamos a un recorrido.',
    timestamp: 1462445134000,
    language: 'es',
    byline: {
      name: 'Aled Scourfield',
      title: 'BBC News, Wales',
      persons: [
        {
          name: 'Aled Scourfield',
          function: 'BBC News, Wales',
        },
      ],
    },
    cpsType: 'STY',
    indexImage: {
      id: '63482865',
      subType: 'index',
      href: 'http://b.files.bbci.co.uk/DDFC/test/_63482865_orange2.jpg',
      path: '/cpsdevpb/DDFC/test/_63482865_orange2.jpg',
      height: 549,
      width: 976,
      altText: 'naranja 2',
      caption: 'naranja 2',
      copyrightHolder: 'BBC',
      type: 'image',
    },
    options: {
      isBreakingNews: false,
      isFactCheck: false,
    },
    id: 'urn:bbc:ares::asset:mundo/internacional-23038380',
    type: 'cps',
  },
  dir: 'ltr',
  displayImage: true,
  displaySummary: false,
  eventTrackingData: {
    block: {
      componentName: 'features',
    },
  },
};

export const cpsNewsPromoFixture = {
  item: {
    headlines: {
      headline: 'The colorful charm of chilango street art 17',
    },
    locators: {
      assetUri: '/mundo/internacional-23038380',
      cpsUrn: 'urn:bbc:content:assetUri:mundo/internacional-23038380',
      assetId: '23038380',
    },
    summary:
      'In addition to its dozens of traditional museums, Mexico City is an open-air gallery of street art, in which national and foreign artists exhibit. We invite you on a tour.',
    timestamp: 1462445134000,
    language: 'en',
    byline: {
      name: 'Aled Scourfield',
      title: 'BBC News, Wales',
      persons: [
        {
          name: 'Aled Scourfield',
          function: 'BBC News, Wales',
        },
      ],
    },
    cpsType: 'STY',
    indexImage: {
      id: '63482865',
      subType: 'index',
      href: 'http://b.files.bbci.co.uk/DDFC/test/_63482865_orange2.jpg',
      path: '/cpsdevpb/DDFC/test/_63482865_orange2.jpg',
      height: 549,
      width: 976,
      altText: 'Orange 2',
      caption: 'Orange 2',
      copyrightHolder: 'BBC',
      type: 'image',
    },
    options: {
      isBreakingNews: false,
      isFactCheck: false,
    },
    id: 'urn:bbc:ares::asset:mundo/internacional-23038380',
    type: 'cps',
  },
  dir: 'ltr',
  displayImage: true,
  displaySummary: false,
  eventTrackingData: {
    block: {
      componentName: 'features',
    },
  },
};

export const makeOptimoPromoFixture = (imageData: unknown) =>
  ({
    item: {
      locators: {
        optimoUrn: 'urn:bbc:optimo:asset:cemg3359nwro',
        canonicalUrl: 'https://www.bbc.com/kyrgyz/articles/cemg3359nwro',
      },
      timestamp: 1675332417156,
      suitableForSyndication: true,
      language: 'ky',
      headlines: {
        seoHeadline:
          '“Баланы сабады деп аялымды камап салышарын өзүм да билген эмесмин”. Кадамжайда токмоктолгон наристенин атасы\r',
        promoHeadline: {
          blocks: [
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: '“Баланы сабады деп аялымды камап салышарын өзүм да билген эмесмин”',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: '“Баланы сабады деп аялымды камап салышарын өзүм да билген эмесмин”',
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
                            text: 'test',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'test',
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
            imageData && imageData,
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
      passport: {
        language: 'ky',
        home: 'http://www.bbc.co.uk/ontologies/passport/home/Kyrgyz',
        locator: 'urn:bbc:optimo:asset:cemg3359nwro',
        availability: 'AVAILABLE',
        taggings: [
          {
            predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
            value:
              'http://www.bbc.co.uk/things/839cfd32-9a3d-47eb-a591-bf0e136d1f4b#id',
          },
          {
            predicate:
              'http://www.bbc.co.uk/ontologies/bbc/editorialSensitivity',
            value:
              'http://www.bbc.co.uk/things/c6979033-cb72-4d07-9897-adc348a4332e#id',
          },
          {
            predicate: 'http://www.bbc.co.uk/ontologies/creativework/format',
            value:
              'http://www.bbc.co.uk/things/bb3ead7c-eb94-453b-b9de-34a59aba2fbf#id',
          },
          {
            predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
            value:
              'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
          },
          {
            predicate: 'http://www.bbc.co.uk/ontologies/audience/motivation',
            value:
              'http://www.bbc.co.uk/things/bf928ac3-b3bd-4d47-924e-cca1bdc29174#id',
          },
          {
            predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
            value:
              'http://www.bbc.co.uk/things/5566b81b-8509-44c1-8503-018a0eab317d#id',
          },
        ],
        schemaVersion: '1.4.0',
        publishedState: 'PUBLISHED',
        predicates: {
          primaryMediaType: [
            {
              value:
                'http://www.bbc.co.uk/things/5566b81b-8509-44c1-8503-018a0eab317d#id',
              type: 'primaryMediaType',
            },
          ],
          motivation: [],
          infoClass: [
            {
              value:
                'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
              type: 'infoClass',
            },
          ],
          formats: [
            {
              value:
                'http://www.bbc.co.uk/things/bb3ead7c-eb94-453b-b9de-34a59aba2fbf#id',
              thingLabel: 'Explainer',
              thingUri:
                'http://www.bbc.co.uk/things/bb3ead7c-eb94-453b-b9de-34a59aba2fbf#id',
              thingId: 'bb3ead7c-eb94-453b-b9de-34a59aba2fbf',
              thingType: ['tagging:Format', 'tagging:TagConcept'],
              thingSameAs: [
                'http://www.bbc.co.uk/ontologies/applicationlogic-news/Explainer',
              ],
              thingEnglishLabel: 'Explainer',
              thingPreferredLabel: 'Explainer',
              thingLabelLanguage: 'ky',
              type: 'formats',
            },
          ],
          editorialSensitivity: [
            {
              value:
                'http://www.bbc.co.uk/things/c6979033-cb72-4d07-9897-adc348a4332e#id',
              type: 'editorialSensitivity',
            },
          ],
          about: [
            {
              value:
                'http://www.bbc.co.uk/things/839cfd32-9a3d-47eb-a591-bf0e136d1f4b#id',
              thingLabel: 'Океанды булгоо',
              thingUri:
                'http://www.bbc.co.uk/things/839cfd32-9a3d-47eb-a591-bf0e136d1f4b#id',
              thingId: '839cfd32-9a3d-47eb-a591-bf0e136d1f4b',
              thingType: ['tagging:TagConcept', 'core:Theme', 'core:Thing'],
              thingSameAs: [
                'http://www.wikidata.org/entity/Q1058325',
                'http://dbpedia.org/resource/Marine_pollution',
              ],
              thingEnglishLabel: 'Ocean pollution',
              type: 'about',
            },
          ],
        },
      },
      id: 'urn:bbc:ares::article:cemg3359nwro',
      type: 'optimo',
    },
  }) as PromoProps;
