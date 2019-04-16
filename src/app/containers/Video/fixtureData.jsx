import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';

const videoBlock = [
  {
    content: {
      model: {
        blocks: [
          {
            type: 'video',
            model: {
              locator: 'urn:bbc:pips:pid:p067gq6h',
              blocks: [
                {
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
                                  'Duis vitae ipsum hendrerit, commodo metus vel, mattis sapien. Proin eleifend vulputate porta. Curabitur mollis nunc nec felis ultricies, vitae tempor metus imperdiet.',
                                blocks: [
                                  {
                                    type: 'fragment',
                                    model: {
                                      text:
                                        'Duis vitae ipsum hendrerit, commodo metus vel, mattis sapien. Proin eleifend vulputate porta. Curabitur mollis nunc nec felis ultricies, vitae tempor metus imperdiet.',
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
                  type: 'aresMedia',
                  model: {
                    id: 'p067gq6h',
                    subType: 'clip',
                    format: 'audio_video',
                    title: 'Mark and Isla Royal Wedding',
                    synopses: {
                      short:
                        'Stop the press! It’s a Mark and Isla Royal Wedding special…',
                      medium: null,
                      long: null,
                    },
                    imageUrl: 'ichef.bbci.co.uk/images/ic/$recipe/p067grwg.jpg',
                    embedding: true,
                    warnings: {},
                    advertising: false,
                    versions: [
                      {
                        versionId: 'p067gq6k',
                        types: ['Original'],
                        duration: 94,
                        availableTerritories: {
                          uk: true,
                          nonUk: false,
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
];

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
export const VideoWithCaption = generateFixtureData({ blocks: videoBlock });
export const VideoAmpWithoutCaption = generateFixtureData({
  platform: 'amp',
  blocks: videoBlock,
});
export const VideoAmpWithCaption = generateFixtureData({
  platform: 'amp',
  blocks: videoBlock,
});
