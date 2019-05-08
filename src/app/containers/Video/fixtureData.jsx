import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { singleTextBlock, blockArrayModel } from '../../models/blocks';

export const aresMediaBlock = {
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
