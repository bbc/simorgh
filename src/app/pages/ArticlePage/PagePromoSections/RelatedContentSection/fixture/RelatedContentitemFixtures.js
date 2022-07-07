export const RelatedContentData = {
  type: 'link',
  model: {
    locator: 'urn:bbc:cps:curie:asset:0f35c912-afc7-1a4b-9518-7853401c1149',
    blocks: [
      {
        type: 'image',
        model: {
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
                            text: 'Keyframe #2',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Keyframe #2',
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
                locator: 'B935/test/_63731474_p01p5ql9.jpg',
                originCode: 'cpsdevpb',
                copyrightHolder: 'AFP',
                suitableForSyndication: true,
              },
            },
          ],
        },
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                blocks: [
                  {
                    type: 'urlLink',
                    model: {
                      text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                      locator: 'https://www.test.bbc.com/pidgin/media-23267821',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                            attributes: [],
                          },
                        },
                      ],
                      isExternal: false,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: 'aresLink',
        model: {
          blocks: [
            {
              type: 'cpsLinkMetadata',
              model: {
                assetType: 'MAP',
                timestamp: 1581940273000,
              },
            },
            {
              type: 'aresMedia',
              model: {
                blocks: [
                  {
                    blockId: 'urn:bbc:ares::clip:p01p5qfc',
                    type: 'aresMediaMetadata',
                    model: {
                      id: 'p01p5qfc',
                      subType: 'clip',
                      format: 'audio_video',
                      title:
                        'Justin Trudeau wins Canadian election with minority government',
                      synopses: {
                        short:
                          'Voters take to the polls in the Canadian election',
                        long: "Justin Trudeau has been re-elected prime minister of Canada with a reduced share of the vote.Th BBC's Lyce Ducette reports.",
                        medium:
                          'Justin Trudeau has been re-elected prime minister of Canada with a reduced share of the vote.',
                      },
                      imageUrl:
                        'ichef.test.bbci.co.uk/images/ic/$recipe/p01p5ql9.jpg',
                      embedding: true,
                      advertising: true,
                      caption:
                        "Canada's general election took place on Monday 22 October",
                      versions: [
                        {
                          versionId: 'p01p5qff',
                          types: ['Original'],
                          duration: 67,
                          durationISO8601: 'PT1M7S',
                          warnings: {},
                          availableTerritories: {
                            uk: true,
                            nonUk: true,
                          },
                          availableFrom: 1571751302000,
                        },
                      ],
                      syndication: {
                        destinations: [],
                      },
                      smpKind: 'programme',
                    },
                  },
                  {
                    type: 'image',
                    model: {
                      blocks: [
                        {
                          type: 'rawImage',
                          model: {
                            width: 1920,
                            height: 1080,
                            locator:
                              'ichef.test.bbci.co.uk/images/ic/$widthxn/p01p5ql9.jpg',
                            originCode: 'mpv',
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
                                        text: 'Keyframe #2',
                                        blocks: [
                                          {
                                            type: 'fragment',
                                            model: {
                                              text: 'Keyframe #2',
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
    ],
  },
};

export const RelatedContentWithNoImage = {
  type: 'link',
  model: {
    locator: 'urn:bbc:cps:curie:asset:0f35c912-afc7-1a4b-9518-7853401c1149',
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                blocks: [
                  {
                    type: 'urlLink',
                    model: {
                      text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                      locator: 'https://www.test.bbc.com/pidgin/media-23267821',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                            attributes: [],
                          },
                        },
                      ],
                      isExternal: false,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: 'aresLink',
        model: {
          blocks: [
            {
              type: 'cpsLinkMetadata',
              model: {
                assetType: 'MAP',
                timestamp: 1581940273000,
              },
            },
            {
              type: 'aresMedia',
              model: {
                blocks: [
                  {
                    blockId: 'urn:bbc:ares::clip:p01p5qfc',
                    type: 'aresMediaMetadata',
                    model: {
                      id: 'p01p5qfc',
                      subType: 'clip',
                      format: 'audio_video',
                      title:
                        'Justin Trudeau wins Canadian election with minority government',
                      synopses: {
                        short:
                          'Voters take to the polls in the Canadian election',
                        long: "Justin Trudeau has been re-elected prime minister of Canada with a reduced share of the vote.Th BBC's Lyce Ducette reports.",
                        medium:
                          'Justin Trudeau has been re-elected prime minister of Canada with a reduced share of the vote.',
                      },
                      imageUrl:
                        'ichef.test.bbci.co.uk/images/ic/$recipe/p01p5ql9.jpg',
                      embedding: true,
                      advertising: true,
                      caption:
                        "Canada's general election took place on Monday 22 October",
                      versions: [
                        {
                          versionId: 'p01p5qff',
                          types: ['Original'],
                          duration: 67,
                          durationISO8601: 'PT1M7S',
                          warnings: {},
                          availableTerritories: {
                            uk: true,
                            nonUk: true,
                          },
                          availableFrom: 1571751302000,
                        },
                      ],
                      syndication: {
                        destinations: [],
                      },
                      smpKind: 'programme',
                    },
                  },
                  {
                    type: 'image',
                    model: {
                      blocks: [
                        {
                          type: 'rawImage',
                          model: {
                            width: 1920,
                            height: 1080,
                            locator:
                              'ichef.test.bbci.co.uk/images/ic/$widthxn/p01p5ql9.jpg',
                            originCode: 'mpv',
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
                                        text: 'Keyframe #2',
                                        blocks: [
                                          {
                                            type: 'fragment',
                                            model: {
                                              text: 'Keyframe #2',
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
    ],
  },
};

export const RelatedContentWithNoTimestamp = {
  type: 'link',
  model: {
    locator: 'urn:bbc:cps:curie:asset:0f35c912-afc7-1a4b-9518-7853401c1149',
    blocks: [
      {
        type: 'image',
        model: {
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
                            text: 'Keyframe #2',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Keyframe #2',
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
                locator: 'B935/test/_63731474_p01p5ql9.jpg',
                originCode: 'cpsdevpb',
                copyrightHolder: 'AFP',
                suitableForSyndication: true,
              },
            },
          ],
        },
      },
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                blocks: [
                  {
                    type: 'urlLink',
                    model: {
                      text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                      locator: 'https://www.test.bbc.com/pidgin/media-23267821',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
                            attributes: [],
                          },
                        },
                      ],
                      isExternal: false,
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
