import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import { blockArrayModel, singleTextBlock } from '../../models/blocks';
import VideoContainer from './index';
import {
  VideoClipGlobalWithCaption,
  VideoClipGlobalWithoutCaption,
} from './fixtureData';

describe('Video', () => {
  describe('with no data', () => {
    shouldShallowMatchSnapshot(
      'should not render anything',
      <VideoContainer />,
    );
  });

  describe('with no aresMedia', () => {
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
    const data = blockArrayModel([captionBlock]);

    shouldShallowMatchSnapshot(
      'should only render the video',
      <VideoContainer {...data} />,
    );
  });

  describe('with data and a caption', () => {
    shouldShallowMatchSnapshot(
      'should render the video and caption',
      VideoClipGlobalWithCaption,
    );

    shouldShallowMatchSnapshot(
      'should render the video without a caption',
      VideoClipGlobalWithoutCaption,
    );
  });
});
