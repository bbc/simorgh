import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { singleTextBlock } from '../../models/blocks';

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
              singleTextBlock(
                'The residents of Ligsalz8 believe they have found the answer to the expensive cost of renting in Munich',
              ),
            ],
          },
          type: 'caption',
        },
        {
          model: {
            blocks: [singleTextBlock('group of residents')],
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
        singleTextBlock(
          'This video shows Marks and Spencer CEO talking about the announcement earlier this morning',
        ),
      ],
    },
  },
];

const videoBlockWithCaption = [...videoBlock];
videoBlockWithCaption.push({
  type: 'caption',
  model: {
    blocks: [
      singleTextBlock(
        'Former embroider Pauline Clayton described the gift as "lovely"',
      ),
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
