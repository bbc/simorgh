import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';

const videoBlock = [
  {
    model: {
      blocks: [
        {
          model: {
            copyrightHolder: '@twitterhandle',
            height: 549,
            locator: 'e49c/test/a0b28560-50a9-11e9-8100-2defb9ff0749.jpg',
            originCode: 'cpsdevpb',
            width: 976,
          },
          type: 'rawImage',
        },
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        blocks: [
                          {
                            model: {
                              attributes: [],
                              text:
                                'The residents of Ligsalz8 believe they have found the answer to the expensive cost of renting in Munich',
                            },
                            type: 'fragment',
                          },
                        ],
                        text:
                          'The residents of Ligsalz8 believe they have found the answer to the expensive cost of renting in Munich',
                      },
                      type: 'paragraph',
                    },
                  ],
                },
                type: 'text',
              },
            ],
          },
          type: 'caption',
        },
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        blocks: [
                          {
                            model: {
                              attributes: [],
                              text: 'group of residents',
                            },
                            type: 'fragment',
                          },
                        ],
                        text: 'group of residents',
                      },
                      type: 'paragraph',
                    },
                  ],
                },
                type: 'text',
              },
            ],
          },
          type: 'altText',
        },
      ],
    },
    type: 'image',
  },
  {
    type: 'rawVideo',
    model: {
      guidance: null,
      isLive: false,
      duration: 'PT2H34M25S',
      allowOffsiteEmbedding: false,
      locator: 'urn:bbc:pips:pid:p064nsyw',
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
                  text:
                    'This video shows Marks and Spencer CEO talking about the announcement earlier this morning',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text:
                          'This video shows Marks and Spencer CEO talking about the announcement earlier this morning',
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
          type: 'image',
          model: {
            blocks: [
              {
                type: 'rawImage',
                model: {
                  width: 1024,
                  height: 576,
                  locator: '5BD5/production/_101690532_2.jpg',
                  originCode: 'cpsprodpb',
                  copyrightHolder: 'NASA',
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
                              text:
                                'Cras accumsan rhoncus ipsum, et consequat ex commodo pulvinar.',
                              blocks: [
                                {
                                  type: 'fragment',
                                  model: {
                                    text:
                                      'Cras accumsan rhoncus ipsum, et consequat ex commodo pulvinar.',
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
];

const videoBlockWithCaption = [...videoBlock];
videoBlockWithCaption.push({
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
                text:
                  'Former embroider Pauline Clayton described the gift as "lovely"',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text:
                        'Former embroider Pauline Clayton described the gift as "lovely"',
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
});

const generateFixtureData = ({ platform, blocks }) => (
  <RequestContextProvider platform={platform}>
    <VideoContainer blocks={blocks} />
  </RequestContextProvider>
);

generateFixtureData.propTypes = {
  platform: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.any),
};

generateFixtureData.defaultProps = {
  platform: 'canonical',
  blocks: '',
};

export const VideoWithoutCaption = generateFixtureData({ blocks: videoBlock });
export const VideoWithCaption = generateFixtureData({
  blocks: videoBlockWithCaption,
});
export const VideoAmpWithoutCaption = generateFixtureData({
  platform: 'amp',
  blocks: videoBlock,
});
export const VideoAmpWithCaption = generateFixtureData({
  platform: 'amp',
  blocks: videoBlockWithCaption,
});
