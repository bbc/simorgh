// expected output of transformer given fixture: pidgin/23248703
module.exports = {
  content: {
    blocks: [
      {
        advertising: true,
        caption: 'this is the caption',
        embedding: false,
        format: 'video',
        id: 'p01kx42s',
        imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p012zl0f.jpg',
        subType: 'clip',
        synopses: {
          long: 'トランプ氏、香港人権法案に署名　中国は反発',
          medium: 'トランプ氏、香港人権法案に署名　中国は反発',
          short: 'トランプ氏、香港人権法案に署名　中国は反発',
        },
        title: 'トランプ氏、香港人権法案に署名　中国は反発',
        type: 'media',
        versions: [
          {
            availableFrom: 1545304011000,
            availableTerritories: {
              nonUk: true,
              uk: true,
              world: false,
            },
            duration: 5,
            durationISO8601: 'PT5S',
            types: ['Original'],
            versionId: 'p01kx42v',
            warnings: {},
          },
        ],
      },
      {
        markupType: 'plain_text',
        text: 'DO NOT UPDATE THIS PAGE - IT IS AN AUTOMATED TEST  ',
        type: 'heading',
      },
      {
        markupType: 'plain_text',
        role: 'introduction',
        text: 'This is an introduction ',
        type: 'paragraph',
      },
      {
        markupType: 'plain_text',
        text: 'This is a heading ',
        type: 'heading',
      },
      {
        markupType: 'plain_text',
        text: 'This is a subheading ',
        type: 'subheading',
      },
      {
        markupType: 'plain_text',
        text: 'This is a crosshead ',
        type: 'crosshead',
      },
      {
        markupType: 'candy_xml',
        meta: [
          {
            headlines: {
              headline: 'Lorem ipsum dolor sit amet, consectetur',
              overtyped: '<Media Asset Page 1>',
              shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
            },
            id: 'urn:bbc:ares::asset:afrique/23248423',
            locators: {
              href: 'http://www.bbc.com/afrique/23248423',
            },
            passport: {
              category: {
                categoryId: '',
                categoryName: '',
              },
              taggings: [],
            },
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            timestamp: 1568218735000,
            type: 'cps',
          },
        ],
        text:
          '<link><caption>&lt;Media Asset Page 1&gt;</caption><altText>&lt;Media Asset Page 1&gt;</altText><url href="http://www.bbc.com/afrique/23248423" platform="highweb"/><url href="http://www.bbc.com/afrique/23248423" platform="enhancedmobile"/></link>',
        type: 'paragraph',
      },
      {
        markupType: 'candy_xml',
        meta: [
          {
            headlines: {
              headline: 'Lorem ipsum dolor sit amet, consectetur',
              overtyped: '<Media Asset Page 2>',
              shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
            },
            id: 'urn:bbc:ares::asset:afrique/23248423',
            locators: {
              href: 'http://www.bbc.com/afrique/23248423',
            },
            passport: {
              category: {
                categoryId: '',
                categoryName: '',
              },
              taggings: [],
            },
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            timestamp: 1568218735000,
            type: 'cps',
          },
        ],
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu <link><caption>&lt;Media Asset Page 2&gt;</caption><altText>&lt;Media Asset Page 2&gt;</altText><url href="http://www.bbc.com/afrique/23248423" platform="highweb"/><url href="http://www.bbc.com/afrique/23248423" platform="enhancedmobile"/></link> fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        type: 'paragraph',
      },
      {
        items: [
          {
            markupType: 'candy_xml',
            meta: [
              {
                headlines: {
                  headline: 'Lorem ipsum dolor sit amet, consectetur',
                  overtyped: '<Media Asset Page 3>',
                  shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
                },
                id: 'urn:bbc:ares::asset:afrique/23248423',
                locators: {
                  href: 'http://www.bbc.com/afrique/23248423',
                },
                passport: {
                  category: {
                    categoryId: '',
                    categoryName: '',
                  },
                  taggings: [],
                },
                summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                timestamp: 1568218735000,
                type: 'cps',
              },
            ],
            text:
              '<link><caption>&lt;Media Asset Page 3&gt;</caption><altText>&lt;Media Asset Page 3&gt;</altText><url href="http://www.bbc.com/afrique/23248423" platform="highweb"/><url href="http://www.bbc.com/afrique/23248423" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
          {
            markupType: 'candy_xml',
            meta: [
              {
                headlines: {
                  headline: 'Lorem ipsum dolor sit amet, consectetur',
                  overtyped: '<Media Asset Page 4>',
                  shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
                },
                id: 'urn:bbc:ares::asset:afrique/23248423',
                locators: {
                  href: 'http://www.bbc.com/afrique/23248423',
                },
                passport: {
                  category: {
                    categoryId: '',
                    categoryName: '',
                  },
                  taggings: [],
                },
                summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                timestamp: 1568218735000,
                type: 'cps',
              },
            ],
            text:
              '<link><caption>&lt;Media Asset Page 4&gt;</caption><altText>&lt;Media Asset Page 4&gt;</altText><url href="http://www.bbc.com/afrique/23248423" platform="highweb"/><url href="http://www.bbc.com/afrique/23248423" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
          {
            markupType: 'candy_xml',
            meta: [
              {
                headlines: {
                  headline: 'Lorem ipsum dolor sit amet, consectetur',
                  overtyped: '<Media Asset Page 5>',
                  shortHeadline: 'Lorem ipsum dolor sit amet, consectetur',
                },
                id: 'urn:bbc:ares::asset:afrique/23248423',
                locators: {
                  href: 'http://www.bbc.com/afrique/23248423',
                },
                passport: {
                  category: {
                    categoryId: '',
                    categoryName: '',
                  },
                  taggings: [],
                },
                summary:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                timestamp: 1568218735000,
                type: 'cps',
              },
            ],
            text:
              '<link><caption>&lt;Media Asset Page 5&gt;</caption><altText>&lt;Media Asset Page 5&gt;</altText><url href="http://www.bbc.com/afrique/23248423" platform="highweb"/><url href="http://www.bbc.com/afrique/23248423" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
          {
            markupType: 'candy_xml',
            text:
              '<link><caption>this is the link text</caption><altText>this is the alt text </altText><url href="https://bbc.com/pidgin" platform="highweb"/><url href="https://bbc.com/pidgin" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
          {
            markupType: 'candy_xml',
            text:
              '<link><caption>this is the link text</caption><altText>this is the alt text </altText><url href="https://bbc.com/pidgin" platform="highweb"/><url href="https://bbc.com/pidgin" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
          {
            markupType: 'candy_xml',
            text:
              '<link><caption>this is the link text</caption><altText>this is the alt text </altText><url href="https://bbc.com/pidgin" platform="highweb"/><url href="https://bbc.com/pidgin" platform="enhancedmobile"/></link>',
            type: 'listItem',
          },
        ],
        numbered: false,
        type: 'list',
      },
      {
        markupType: 'candy_xml',
        role: 'transmission-info',
        text:
          ' Lorem ipsum dolor sit amet, <bold>consectetur</bold> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation<bold> ullamco laboris nisi ut aliquip </bold>ex ea commodo consequat. Duis aute irure dolor in reprehenderit<italic> in voluptate velit esse cillum </italic>dolore &quot;eu fugiat nulla&quot; pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        type: 'paragraph',
      },
      {
        altText: 'butterfly',
        caption: 'A pretty little butterfly & < >',
        copyrightHolder: 'Butterfly person',
        height: 360,
        href:
          'http://b.files.bbci.co.uk/292E/test/_63724501_6123f323-6a92-461f-9fe7-749c0ddea04d.jpg',
        id: '63724501',
        path:
          '/cpsdevpb/292E/test/_63724501_6123f323-6a92-461f-9fe7-749c0ddea04d.jpg',
        positionHint: 'full-width',
        subType: 'body',
        type: 'image',
        width: 640,
      },
      {
        altText: 'psammead',
        caption: 'Psammead was named after the mythical sand creature',
        copyrightHolder: 'Google',
        height: 576,
        href:
          'http://b.files.bbci.co.uk/5426/test/_63724512_psammead-closeup.jpg',
        id: '63724512',
        path: '/cpsdevpb/5426/test/_63724512_psammead-closeup.jpg',
        positionHint: 'full-width',
        subType: 'body',
        type: 'image',
        width: 1024,
      },
      {
        items: [
          {
            markupType: 'plain_text',
            text:
              'sunt in culpa qui officia deserunt mollit anim id est laborum',
            type: 'listItem',
          },
          {
            markupType: 'plain_text',
            text:
              'sunt in culpa qui officia deserunt mollit anim id est laborum',
            type: 'listItem',
          },
          {
            markupType: 'plain_text',
            text:
              'sunt in culpa qui officia deserunt mollit anim id est laborum',
            type: 'listItem',
          },
        ],
        numbered: false,
        type: 'list',
      },
      {
        markupType: 'plain_text',
        role: 'transmission-info',
        text: 'This is transmission info ',
        type: 'paragraph',
      },
      {
        markupType: 'plain_text',
        role: 'footer',
        text: 'This is the footer ',
        type: 'paragraph',
      },
    ],
  },
  metadata: {
    analyticsLabels: {
      counterName: 'pidgin.media_asset.23248703.page',
      cps_asset_id: '23248703',
      cps_asset_type: 'map',
    },
    blockTypes: [
      'media',
      'heading',
      'paragraph',
      'subheading',
      'crosshead',
      'list',
      'image',
    ],
    createdBy: 'pidgin-v6',
    firstPublished: 1568388704000,
    id: 'urn:bbc:ares::asset:pidgin/23248703',
    includeComments: false,
    language: 'pcm',
    lastPublished: 1578593119000,
    lastUpdated: 1578593129754,
    locators: {
      assetUri: '/pidgin/23248703',
      cpsUrn: 'urn:bbc:content:assetUri:pidgin/23248703',
      curie: 'http://www.bbc.co.uk/asset/5679389a-3ea6-0b40-9de4-f4d33d6bcd9f',
    },
    options: {
      allowDateStamp: true,
      allowHeadline: false,
      allowPrintingSharingLinks: true,
      allowRelatedStoriesBox: true,
      allowRightHandSide: true,
      hasNewsTracker: false,
      includeComments: false,
      isBreakingNews: false,
      isFactCheck: false,
      isIgorSeoTagsEnabled: false,
      isKeyContent: false,
    },
    passport: {
      campaigns: [
        {
          campaignId: '5ad8625ac93a9f000eecb253',
          campaignName: 'Inspire me',
        },
        {
          campaignId: '5ad86285c93a9f000eecb256',
          campaignName: 'Give me perspective',
        },
        {
          campaignId: '5ad86291c93a9f000eecb257',
          campaignName: 'Keep me on trend',
        },
      ],
      category: {
        categoryId:
          'http://www.bbc.co.uk/ontologies/applicationlogic-news/Opinion',
        categoryName: 'Opinion',
      },
      taggings: [],
    },
    tags: {},
    timestamp: 1578406676000,
    type: 'MAP',
    version: 'v1.1.4',
  },
  promo: {
    headlines: {
      headline:
        "DO NOT EDIT THIS IS AN AUTOMATED TEST dolor sit amet, consectetur Lorem 'ipsum' dolor sit amet, consectetur Lorem ipsum dolor sit<em>amet</em>, consectetur",
      shortHeadline:
        'DO NOT EDIT THIS IS AN AUTOMATED TEST - Lorem ipsum dolor sit amet, þ ¼',
    },
    id: 'urn:bbc:ares::asset:pidgin/23248703',
    indexImage: {
      altText: 'connectionAltText',
      copyrightHolder: 'BBC',
      height: 360,
      href: 'http://b.files.bbci.co.uk/6FC4/test/_63721682_p01kx435.jpg',
      id: '63721682',
      path: '/cpsdevpb/6FC4/test/_63721682_p01kx435.jpg',
      subType: 'index',
      type: 'image',
      width: 640,
    },
    locators: {
      assetUri: '/pidgin/23248703',
      cpsUrn: 'urn:bbc:content:assetUri:pidgin/23248703',
      curie: 'http://www.bbc.co.uk/asset/5679389a-3ea6-0b40-9de4-f4d33d6bcd9f',
    },
    media: {
      advertising: true,
      caption: 'this is the caption',
      embedding: false,
      format: 'video',
      id: 'p01kx42s',
      imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p012zl0f.jpg',
      subType: 'clip',
      synopses: {
        long: 'トランプ氏、香港人権法案に署名　中国は反発',
        medium: 'トランプ氏、香港人権法案に署名　中国は反発',
        short: 'トランプ氏、香港人権法案に署名　中国は反発',
      },
      title: 'トランプ氏、香港人権法案に署名　中国は反発',
      type: 'media',
      versions: [
        {
          availableFrom: 1545304011000,
          availableTerritories: {
            nonUk: true,
            uk: true,
            world: false,
          },
          duration: 5,
          durationISO8601: 'PT5S',
          types: ['Original'],
          versionId: 'p01kx42v',
          warnings: {},
        },
      ],
    },
    passport: {
      campaigns: [
        {
          campaignId: '5ad8625ac93a9f000eecb253',
          campaignName: 'Inspire me',
        },
        {
          campaignId: '5ad86285c93a9f000eecb256',
          campaignName: 'Give me perspective',
        },
        {
          campaignId: '5ad86291c93a9f000eecb257',
          campaignName: 'Keep me on trend',
        },
      ],
      category: {
        categoryId:
          'http://www.bbc.co.uk/ontologies/applicationlogic-news/Opinion',
        categoryName: 'Opinion',
      },
      taggings: [],
    },
    summary: 'Lorem ipsum dolor sit amet, consectetur this is a change',
    timestamp: 1578406676000,
    type: 'cps',
  },
  relatedContent: {
    groups: [
      {
        promos: [
          {
            cpsType: 'STY',
            headlines: {
              headline: 'Police Arrest 3 ontop Anambra Church Attack',
              shortHeadline: 'Anambra Church: Police Arrest 3',
            },
            id: 'urn:bbc:ares::asset:pidgin/tori-23145776',
            indexImage: {
              altText:
                'One gun enter St. Phillips Church for Ozubulu, Anambra and shoot and kill 11 people, injure 18 others',
              caption:
                'Di attack happen for inside St. Philip Catholic Chirch Ozubulu',
              copyrightHolder: 'BBC',
              height: 351,
              href:
                'http://b.files.bbci.co.uk/5C06/test/_63585532_ozubuluchurch.jpg',
              id: '63585532',
              path: '/cpsdevpb/5C06/test/_63585532_ozubuluchurch.jpg',
              subType: 'index',
              type: 'image',
              width: 624,
            },
            locators: {
              assetUri: '/pidgin/tori-23145776',
              cpsUrn: 'urn:bbc:content:assetUri:/pidgin/tori-23145776',
            },
            summary:
              'Governor Willie Obiano of Anambra State bin don promise say government go handle the matter sharp, sharp',
            timestamp: 1502217403000,
            type: 'cps',
          },
          {
            cpsType: 'STY',
            headlines: {
              headline:
                "Lagos 'Gay' men Appear for Court, say Dem no dey Guilty",
              shortHeadline: "Lagos don carry 'gay' men go court",
            },
            id: 'urn:bbc:ares::asset:pidgin/tori-23143754',
            indexImage: {
              altText: 'Two homosexual men',
              caption: 'Homosexuality dey illegal for Nigeria',
              copyrightHolder: 'AFP',
              height: 351,
              href:
                'http://b.files.bbci.co.uk/13644/test/_63582497_black-gay.jpg',
              id: '63582497',
              path: '/cpsdevpb/13644/test/_63582497_black-gay.jpg',
              subType: 'index',
              type: 'image',
              width: 624,
            },
            locators: {
              assetUri: '/pidgin/tori-23143754',
              cpsUrn: 'urn:bbc:content:assetUri:/pidgin/tori-23143754',
            },
            summary:
              'The men wey dem arrest almost one week ago don say dem no dey guilty, as court order dem to go for sexual rehabilitation.',
            timestamp: 1502195579000,
            type: 'cps',
          },
          {
            cpsType: 'PGL',
            headlines: {
              headline: 'Kenya Elections Pictures: 8 August 2017',
              shortHeadline: 'Kenya Decides 2017 in Pictures',
            },
            id: 'urn:bbc:ares::asset:pidgin/23146654',
            locators: {
              assetUri: '/pidgin/23146654',
              cpsUrn: 'urn:bbc:content:assetUri:/pidgin/23146654',
            },
            summary:
              'This na some of the picture wey our eye see as Kenya people go vote for election today',
            timestamp: 1502222360000,
            type: 'cps',
          },
          {
            cpsType: 'MAP',
            headlines: {
              headline: 'BBC News Pidgin One Minute News',
              shortHeadline: 'BBC News Pidgin One Minute News',
            },
            id: 'urn:bbc:ares::asset:pidgin/media-23147054',
            indexImage: {
              altText: 'BBC MInute',
              caption: 'BBC Pidgin minute',
              copyrightHolder: 'BBC',
              height: 576,
              href:
                'http://b.files.bbci.co.uk/B7E8/test/_63708074_mediaitem63708073.png',
              id: '63708074',
              path: '/cpsdevpb/B7E8/test/_63708074_mediaitem63708073.png',
              subType: 'index',
              type: 'image',
              width: 1024,
            },
            locators: {
              assetUri: '/pidgin/media-23147054',
              cpsUrn: 'urn:bbc:content:assetUri:/pidgin/media-23147054',
            },
            media: {
              advertising: true,
              caption: "The Wold's most interesting stories",
              embedding: false,
              format: 'audio',
              id: 'p01cqycr',
              imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01cqz13.jpg',
              subType: 'clip',
              synopses: {
                long: "The Wold's most interesting stories",
                medium: "The Wold's most interesting stories",
                short: "The Wold's most interesting stories",
              },
              title: 'BBC News Piding One Minute News',
              type: 'media',
              versions: [
                {
                  availableFrom: 1502288512000,
                  availableTerritories: {
                    nonUk: true,
                    uk: true,
                    world: false,
                  },
                  duration: 15,
                  durationISO8601: 'PT15S',
                  types: ['Original'],
                  versionId: 'p01cqyct',
                  warnings: {},
                },
              ],
            },
            mediaType: 'Audio',
            summary:
              'All di local and world tori wey you suppose know in 60 seconds!',
            timestamp: 1502963087000,
            type: 'cps',
          },
        ],
        type: 'see-alsos',
      },
    ],
    section: {
      name: 'Domot',
      subType: 'index',
      type: 'simple',
      uri: '/pidgin/front_page',
    },
    site: {
      name: 'BBC Pidgin',
      subType: 'site',
      type: 'simple',
      uri: '/pidgin',
    },
  },
};
