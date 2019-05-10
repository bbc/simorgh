import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { singleTextBlock, blockArrayModel } from '../../models/blocks';

const aresMediaBlock = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01k6msm',
        model: {
          advertising: true,
          caption: null,
          embedding: true,
          format: 'audio_video',
          id: 'p01k6msm',
          image: null,
          imageCopyright: 'BBC',
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          subType: 'clip',
          syndication: {
            destinations: [],
          },
          synopses: {
            short:
              'They may be tiny, but us humans could learn a thing or two from ants.',
          },
          title: 'Five things ants can teach us about management',
          versions: [
            {
              availableTerritories: {
                nonUk: true,
                uk: true,
              },
              availableUntil: null,
              duration: 191,
              types: ['Original'],
              versionId: 'p01k6msp',
              warnings: {
                long: 'Contains strong language and adult humour.',
                short: 'Contains strong language and adult humour.',
              },
            },
          ],
        },
        type: 'aresMediaMetadata',
      },
      {
        model: {
          blocks: [
            {
              model: {
                copyrightHolder: 'BBC',
                height: 1080,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
                originCode: null,
                width: 1920,
              },
              type: 'rawImage',
            },
            {
              model: {
                blocks: [singleTextBlock('Ants')],
              },
              type: 'altText',
            },
          ],
        },
        type: 'image',
      },
    ],
  },
  type: 'aresMedia',
};

const captionBlock = {
  model: {
    blocks: [
      singleTextBlock(
        'p01k6msm: Video, Clip, UK and non-UK, guidance, subtitles (about bees)',
      ),
    ],
  },
  type: 'caption',
};

const portraitVideoBlock = {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01m7hmc',
        type: 'aresMediaMetadata',
        model: {
          id: 'p01m7hmc',
          subType: 'clip',
          format: 'audio_video',
          title: 'Test vertical video',
          synopses: {
            short: 'This is a really plain green test vertical video',
          },
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01m7hny.jpg',
          imageCopyright: null,
          embedding: true,
          advertising: true,
          caption: null,
          versions: [
            {
              versionId: 'p01m7hmf',
              types: ['Portrait'],
              duration: 11,
              warnings: {},
              availableTerritories: {
                uk: true,
                nonUk: true,
              },
              availableUntil: null,
            },
          ],
          image: null,
          syndication: {
            destinations: [],
          },
        },
      },
      {
        type: 'image',
        model: {
          blocks: [
            {
              type: 'rawImage',
              model: {
                width: null,
                height: null,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01m7hny.jpg',
                originCode: null,
                copyrightHolder: null,
              },
            },
          ],
        },
      },
    ],
  },
  type: 'aresMedia',
};

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

export const VideoWithCaption = generateFixtureData(
  blockArrayModel([aresMediaBlock, captionBlock]),
);

export const VideoWithoutCaption = generateFixtureData(
  blockArrayModel([aresMediaBlock]),
);

export const VideoPortrait = generateFixtureData(
  blockArrayModel([portraitVideoBlock]),
);
