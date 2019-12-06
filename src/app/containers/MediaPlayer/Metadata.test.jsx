import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Metadata from './Metadata';

const validAresMediaBlocks = [
  {
    blockId: 'urn:bbc:ares::clip:p01k6msm',
    model: {
      advertising: true,
      embedding: true,
      format: 'audio_video',
      id: 'p01k6msm',
      imageCopyright: 'BBC',
      imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
      subType: 'clip',
      syndication: [Object],
      synopses: [Object],
      title: 'Five things ants can teach us about management',
      versions: [Array],
    },
    type: 'aresMediaMetadata',
    id: 'f17766a8-8370-407a-8fa6-20cb49a91c57',
    position: [4, 2, 1],
  },
  {
    model: { blocks: [Array] },
    type: 'image',
    id: 'e90653c0-2bd1-4f17-a231-b012145780c6',
    position: [4, 2, 2],
  },
];

describe('Metadata', () => {
  const aresMediaBlockWithNoMetadata = {
    model: {
      blocks: [],
    },
  };
  const aresMediaBlockWithMetadata = {
    model: {
      blocks: validAresMediaBlocks,
    },
  };

  const embedSource =
    'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

  shouldMatchSnapshot(
    'should render Metadata correctly when aresMedia has no metadata block ',
    <Metadata
      aresMediaBlock={aresMediaBlockWithNoMetadata}
      embedSource={embedSource}
    />,
  );
  shouldMatchSnapshot(
    'should render Metadata correctly when aresMedia has a metadata block',
    <Metadata
      aresMediaBlock={aresMediaBlockWithMetadata}
      embedSource={embedSource}
    />,
  );
});
