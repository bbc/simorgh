import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import {
  videoBlock,
  rawVideoModel,
  rawVideoBlock,
  imageBlock,
} from '../../models/blocks';
import Video from './index';

describe('Video', () => {
  const rVB = rawVideoBlock(
    rawVideoModel('urn:bbc:pips:pid:p064nsyw', 'p064nsz3', 'clip', 299),
  );

  describe('with no data', () => {
    shouldMatchSnapshot('should not render anything', <Video />);
  });

  describe('with data', () => {
    const videoData = {
      type: 'video',
      model: {
        locator: 'urn:bbc:pips:pid:p064nsyw',
        blocks: [
          {
            type: 'rawVideo',
            model: {
              locator: 'urn:bbc:pips:pid:p064nsyw',
              versionID: 'p064nsz3',
              kind: 'clip',
              duration: 299,
            },
          },
          {
            type: 'image',
            model: {
              blocks: [
                {
                  type: 'rawImage',
                  model: {
                    locator: '/cpsprodpb/5BD5/production/_101690532_2.jpg',
                  },
                },
              ],
            },
          },
        ],
      },
    };

    shouldMatchSnapshot(
      'should render the important props in divs',
      <Video {...videoData} />,
    );
  });

  describe('with data but no image', () => {
    const data = videoBlock(rVB, null);

    shouldMatchSnapshot('should only render the video', <Video {...data} />);
  });

  describe('with data but no raw image', () => {
    const rIB = null;
    const img = imageBlock(rIB);
    const data = videoBlock(rVB, img);

    isNull('should be null', <Video {...data} />);
  });
});
