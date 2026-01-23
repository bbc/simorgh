export const aresMediaCaptionBlock = {
  id: '31318aec',
  type: 'caption',
  model: {
    blocks: [
      {
        id: '8ac45ed2',
        type: 'text',
        model: {
          blocks: [
            {
              id: '935f130e',
              type: 'paragraph',
              model: {
                text: 'This is a caption!',
                blocks: [
                  {
                    id: 'deaf6139',
                    type: 'fragment',
                    model: {
                      text: 'This is a caption!',
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

export const buildAresMediaPlayerBlock = ({ types }: { types: string[] }) => ({
  id: 'c77c0598',
  blockId: 'urn:bbc:ares::clip:p01k6msm',
  type: 'aresMediaMetadata',
  model: {
    id: 'p01k6msm',
    subType: 'clip',
    format: 'video',
    title: 'Five things ants can teach us about management',
    synopses: {
      short:
        'They may be tiny, but us humans could learn a thing or two from ants.',
    },
    imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
    imageCopyright: 'BBC',
    embedding: true,
    advertising: true,
    versions: [
      {
        versionId: 'p01k6msp',
        types,
        duration: 191,
        durationISO8601: 'PT3M11S',
        warnings: {
          short: 'Contains strong language and adult humour.',
          long: 'Contains strong language and adult humour.',
        },
        availableTerritories: {
          uk: true,
          nonUk: true,
        },
        availableFrom: 1540218932000,
      },
    ],
    syndication: {
      destinations: [],
    },
    smpKind: 'programme',
  },
  position: [5, 2, 1],
});

export const aresMediaPortraitBlock = {
  id: '80e150c0',
  type: 'aresMedia',
  model: {
    blocks: [
      buildAresMediaPlayerBlock({ types: ['Portrait'] }),
      {
        id: 'd8f26383',
        type: 'image',
        model: {
          blocks: [
            {
              id: 'fcdba133',
              type: 'rawImage',
              model: {
                width: 1920,
                height: 1080,
                locator:
                  'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg',
                originCode: 'mpv',
                copyrightHolder: 'BBC',
              },
            },
            {
              id: '63679c9e',
              type: 'altText',
              model: {
                blocks: [
                  {
                    id: '33876888',
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          id: '26dbfca2',
                          type: 'paragraph',
                          model: {
                            text: 'Ants',
                            blocks: [
                              {
                                id: 'ed9f30c9',
                                type: 'fragment',
                                model: {
                                  text: 'Ants',
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
};

export const aresMediaBlock = {
  id: '80e150c0',
  type: 'aresMedia',
  model: {
    blocks: [
      buildAresMediaPlayerBlock({ types: ['Original'] }),
      {
        id: 'd8f26383',
        type: 'image',
        model: {
          blocks: [
            {
              id: 'fcdba133',
              type: 'rawImage',
              model: {
                width: 1920,
                height: 1080,
                locator:
                  'ichef.test.bbci.co.uk/images/ic/$widthxn/p01k6mtv.jpg',
                originCode: 'mpv',
                copyrightHolder: 'BBC',
              },
            },
            {
              id: '63679c9e',
              type: 'altText',
              model: {
                blocks: [
                  {
                    id: '33876888',
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          id: '26dbfca2',
                          type: 'paragraph',
                          model: {
                            text: 'Ants',
                            blocks: [
                              {
                                id: 'ed9f30c9',
                                type: 'fragment',
                                model: {
                                  text: 'Ants',
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
};

export const livePageCaptionBlock = {
  id: '60db696a',
  type: 'caption',
  model: {
    blocks: [
      {
        id: 'ea8e7d84',
        type: 'text',
        model: {
          blocks: [
            {
              id: 'c7ca4de7',
              type: 'paragraph',
              model: {
                text: 'BBC launch trailer for We Know Our Place women\'s sport campaign"',
                blocks: [
                  {
                    id: 'b33e4302',
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
};

export const livePageVideoClipMediaBlock = {
  id: '1ce4d114',
  type: 'clipMedia',
  model: {
    id: 'urn:bbc:pips:pid:p01thw20',
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
      id: 'p01thw20',
      title: "BBC launch trailer for We Know Our Place women's sport campaign",
      holdingImage: {
        id: 'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01thw3g.jpg',
        altText:
          'BBC launch trailer for We Know Our Place women\'s sport campaign"',
      },
      version: {
        id: 'p01thw22',
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
    link: {
      path: '/programmes/p01thw20',
    },
    section: null,
    isSharingAllowed: true,
  },
};

export const livePageAudioClipMediaBlock = {
  id: '60207517',
  type: 'clipMedia',
  model: {
    id: 'urn:bbc:pips:pid:p01vqk5l',
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
        height: 1080,
        width: 1920,
        orientation: 'landscape',
      },
      {
        url: 'https://ichef.test.bbci.co.uk/images/ic/1024xn/p01vkjg8.png',
        urlTemplate:
          'https://ichef.test.bbci.co.uk/images/ic/{width}xn/p01vkjg8.png',
        altText: 'BBC flat logo 2023 default image',
        type: 'promoImage',
        source: 'pipsImage',
        height: 1080,
        width: 1920,
        orientation: 'landscape',
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
      id: 'p01vqk5l',
      title: 'a',
      holdingImage: {
        id: 'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01vkjg8.png',
        altText: 'BBC flat logo 2023 default image',
        width: 1920,
        height: 1080,
        orientation: 'landscape',
      },
      version: {
        id: 'p01vqk5n',
        duration: 'PT27S',
        kind: 'audio',
        guidance: null,
        territories: ['nonuk', 'uk'],
        orientation: 'landscape',
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
    reactions: null,
  },
};

export const homePagePortraitClipMediaBlocks = [
  {
    type: 'portraitClipMedia',
    model: {
      video: {
        id: 'p0abc001',
        title: 'Portrait Video 1',
        isEmbeddingAllowed: true,
        holdingImageURL:
          'https://ichef.bbci.co.uk/images/ic/512xn/p0abc001.jpg',
        version: {
          id: 'p0abc002',
          duration: 'PT1M',
          kind: 'programme',
          territories: ['bbc_world_service'],
        },
      },
      images: [
        {},
        {
          urlTemplate: 'https://ichef.bbci.co.uk/images/ic/512xn/p0abc001.jpg',
          source: 'www.test.bbc.com/aportraitmediathing',
        },
      ],
    },
  },
  {
    type: 'portraitClipMedia',
    model: {
      video: {
        id: 'p0abc003',
        title: 'Portrait Video 2',
        isEmbeddingAllowed: true,
        holdingImageURL:
          'https://ichef.bbci.co.uk/images/ic/512xn/p0abc002.jpg',
        version: {
          id: 'p0abc004',
          duration: 'PT2M',
          kind: 'programme',
          territories: ['bbc_world_service'],
        },
      },
      images: [
        {},
        {
          urlTemplate: 'https://ichef.bbci.co.uk/images/ic/512xn/p0abc002.jpg',
          source: 'www.test.bbc.com/aportraitmediathing',
        },
      ],
    },
  },
];

export const onDemandTvBlock = {
  type: 'tv',
  model: {
    id: 'w172zm8b4tlpzxh',
    subType: 'episode',
    format: 'Video',
    title: '06/09/2024 GMT',
    synopses: {
      short:
        'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया',
      medium:
        'ताज़ा अंतरराष्ट्रीय, क्षेत्रीय ख़बरों और विश्लेषण के लिए देखिए बीबीसी दुनिया',
    },
    imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p0hfjjfk.png',
    embedding: false,
    advertising: false,
    versions: [
      {
        versionId: 'w1mskypb14t285q',
        types: ['Original'],
        duration: 1192,
        durationISO8601: 'PT19M52S',
        warnings: {},
        availableTerritories: {
          uk: true,
          nonUk: true,
          world: false,
        },
        availableFrom: 1725641390000,
        availabilityStatus: 'available',
      },
    ],
    availability: 'available',
    smpKind: 'programme',
    episodeTitle: 'दुनिया',
    type: 'media',
  },
};

export const legacyMediaBlock = [
  {
    type: 'legacyMedia',
    content: {
      id: '28780250',
      subType: 'primary',
      format: 'video',
      image: {
        id: '28780250',
        subType: 'thumbnail',
        href: 'http://a.files.bbci.co.uk/worldservice/live/assets/images/2013/12/08/131208135805_iraq_blast_640x360_bbc_nocredit.jpg',
        path: '/amz/worldservice/live/assets/images/2013/12/08/131208135805_iraq_blast_640x360_bbc_nocredit.jpg',
        height: 360,
        width: 640,
        altText: 'اثار التفجير على احدى السيارات في بغداد',
        copyrightHolder: '',
      },
      aspectRatio: '16:9',
      live: false,
      href: 'http://www.bbc.co.uk/arabic/meta/dps/2013/12/emp/131208_iraq_blast_.emp.xml',
      playlist: [
        {
          format: '3gp',
          bitrate: '80000',
          url: 'https://wsodprogrf.akamaized.net/arabic/3gp/2013/12/iraqblast_16x9_lo.3gp',
        },
        {
          format: '3gp',
          bitrate: '160000',
          url: 'https://wsodprogrf.akamaized.net/zhongwen/simp/3gp/2013/12/iraqblast_16x9_hi.3gp',
        },
        {
          format: 'mp4',
          bitrate: '168000',
          url: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_lo.mp4',
        },
        {
          format: 'mp4',
          bitrate: '320000',
          url: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_med.mp4',
        },
        {
          format: 'mp4',
          bitrate: '904000',
          url: 'https://wsodprogrf.akamaized.net/arabic/dps/2013/12/iraqblast_16x9_hi.mp4',
        },
      ],
    },
  },
];

export const mediaOverridesBlock = {
  model: {
    language: 'hi',
    pageIdentifierOverride: 'hindi.bbc_hindi_tv.tv.w172zm8b4tlpzxh.page',
    pageTitleOverride: 'दुनिया',
  },
  type: 'mediaOverrides',
};

export const afriqueMediaOverridesBlock = {
  model: {
    language: 'fr',
    pageIdentifierOverride: 'afrique.bbc_afrique_radio.w172zn0kxd65h3g.page',
    pageTitleOverride: "Bulletin D'informations",
  },
  type: 'mediaOverrides',
};

export const aresMediaLiveStreamBlocks = [
  {
    id: '3e29a5f5',
    type: 'aresMedia',
    model: {
      blocks: [
        {
          id: 'd67fb17d',
          type: 'aresMediaMetadata',
          blockId: 'urn:bbc:ares::primary:108540166',
          model: {
            live: true,
            embedding: false,
            subType: 'primary',
            id: '108540166',
            available: true,
            format: 'audio_video',
            title: 'مباشر: تلفزيون بي بي سي عربي',
            imageCopyright: 'BBC',
            imageUrl:
              'http://c.files.bbci.co.uk/CF4E/production/_111607035_arabic_16_9_updated.png',
            synopses: {
              short: 'مباشر: تلفزيون بي بي سي عربي',
              medium: 'مباشر: تلفزيون بي بي سي عربي',
              long: 'مباشر: تلفزيون بي بي سي عربي',
            },
            versions: [
              {
                kind: 'programme',
                live: true,
                versionId: 'bbc_arabic_tv',
              },
            ],
          },
        },
      ],
    },
  },
  aresMediaCaptionBlock,
];

export const liveTvPageMediaBlock = {
  type: 'liveMedia',
  model: {
    urn: 'urn:bbc:pips:sid:bbc_arabic_tv',
    title: '04/11/2025 19:05 GMT',
    type: 'episode',
    synopses: {
      short:
        'Latif Al Ani is known as the father of Iraqi photography. In this film he searches for the people and places he shot from the 1950s onwards. Iraqis now can’t imagine the world in his photos was real.',
      medium:
        'Latif Al Ani is known as the father of Iraqi photography. In this film he searches for the people and places he shot from the 1950s onwards. Iraqis now can’t imagine the world in his photos was real.',
      long: 'Latif Al Ani is known as the father of Iraqi photography. In this film he searches for the people and places he shot from the 1950s onwards. Iraqis now can’t imagine the world in his photos was real.',
    },
    mediaType: 'audio_video',
    imageUrlTemplate:
      'https://ichef.bbci.co.uk/ace/standard/$recipe/cpsdevpb/9f44/test/1703f820-b025-11f0-8c86-5d50166f9cdc.png',
    masterbrand: {
      id: 'bbc_arabic_tv',
      name: 'BBC Arabic TV',
      networkName: 'BBC Arabic TV',
      type: 'tv',
      imageUrlTemplate: 'ichef.bbci.co.uk/images/ic/$recipe/p0m9xygc.png',
    },
    version: {
      vpid: 'n4pdm42036',
      duration: 'PT55M',
      availabilityType: 'simulcast',
      versionTypes: [
        {
          type: 'Original',
          name: 'Original version',
        },
      ],
      schedule: {
        start: null,
      },
      serviceId: 'bbc_arabic_tv',
      authToken: null,
      status: 'LIVE',
      warnings: null,
    },
    overTypedTitle: 'BBC Arabic TV',
    leadMedia: true,
  },
};

export const aresMediaBlocks = [aresMediaBlock, aresMediaCaptionBlock];
export const videoClipMediaBlocks = [
  livePageVideoClipMediaBlock,
  livePageCaptionBlock,
];
export const audioClipMediaBlocks = [
  livePageAudioClipMediaBlock,
  livePageCaptionBlock,
];
export const aresMediaPortraitBlocks = [
  aresMediaPortraitBlock,
  aresMediaCaptionBlock,
];
export const onDemandTvBlocks = [onDemandTvBlock];
export const onDemandTvBlocksWithOverrides = [
  onDemandTvBlock,
  mediaOverridesBlock,
  afriqueMediaOverridesBlock,
];
