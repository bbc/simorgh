import React from 'react';
import { MediaBlock } from '#app/components/MediaLoader/types';
import AvEmbedsPage from './AvEmbedsPageLayout';

const fixtureData = {
  data: {
    article: {
      metadata: {
        id: 'urn:bbc:ares::article:c1xv2q1gewvo',
        locators: {
          optimoUrn: 'urn:bbc:optimo:asset:c1xv2q1gewvo',
          canonicalUrl: 'https://www.bbc.com/mundo/articles/c1xv2q1gewvo',
        },
        type: 'article',
        createdBy: 'Mundo',
        language: 'es',
        lastUpdated: 1721666895000,
        firstPublished: 1710243691008,
        lastPublished: 1710243691008,
        timestamp: 1710243691008,
        options: {
          includeComments: false,
        },
        analyticsLabels: {
          contentId: 'urn:bbc:optimo:asset:c1xv2q1gewvo',
          producer: 'Mundo',
          page: 'mundo.articles.c1xv2q1gewvo.page',
          irisKeyword: null,
        },
      },
      content: {
        model: {
          blocks: [
            {
              type: 'aresMedia',
              model: {
                blocks: [
                  {
                    blockId: 'urn:bbc:ares::clip:p01w67hw',
                    type: 'aresMediaMetadata',
                    model: {
                      id: 'p01w67hw',
                      subType: 'clip',
                      format: 'video',
                      title: 'test landscape',
                      synopses: {
                        short: 'landscape summary',
                      },
                      imageUrl:
                        'ichef.test.bbci.co.uk/images/ic/$recipe/p01w67j6.jpg',
                      imageCopyright: 'BBC',
                      embedding: true,
                      advertising: true,
                      versions: [
                        {
                          versionId: 'p01w67hy',
                          types: ['Original'],
                          duration: 30,
                          durationISO8601: 'PT30S',
                          warnings: {},
                          availableTerritories: {
                            uk: true,
                            nonUk: true,
                          },
                          availableFrom: 1721654872000,
                        },
                      ],
                      syndication: {
                        destinations: [],
                      },
                      smpKind: 'programme',
                      webcastVersions: [],
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
                              'ichef.test.bbci.co.uk/images/ic/$widthxn/p01w67j6.jpg',
                            originCode: 'mpv',
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
    },
  },
};

const Component = () => {
  return (
    <AvEmbedsPage
      pageData={{
        mediaBlock: fixtureData.data.article.content.model
          .blocks as unknown as MediaBlock[],
      }}
    />
  );
};

export default {
  title: 'Pages/AvEmbeds Page',
  Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => <Component />;
