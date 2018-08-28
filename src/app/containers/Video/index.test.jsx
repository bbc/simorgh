import React from 'react';
import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';
import {
  blockArrayModel,
  rawVideoModel,
  rawVideoBlock,
  imageBlock,
} from '../../models/blocks';
import VideoContainer from './index';

describe('Video', () => {
  const rVB = rawVideoBlock(
    rawVideoModel('urn:bbc:pips:pid:p064nsyw', 'p064nsz3', 'clip', '299'),
  );

  describe('with no data', () => {
    shouldShallowMatchSnapshot(
      'should not render anything',
      <VideoContainer />,
    );
  });

  describe('with data', () => {
    const videoData = {
      blocks: [
        {
          type: 'rawVideo',
          model: {
            locator: 'urn:bbc:pips:pid:p064nsyw',
            versionID: 'p064nsz3',
            kind: 'clip',
            duration: '299',
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
    };

    shouldShallowMatchSnapshot(
      'should render the important props in divs',
      <VideoContainer {...videoData} />,
    );
  });

  describe('with data but no image', () => {
    const data = blockArrayModel([rVB, null]);

    shouldShallowMatchSnapshot(
      'should only render the video',
      <VideoContainer {...data} />,
    );
  });

  describe('with data but no raw image', () => {
    const rIB = null;
    const img = imageBlock(rIB);
    const data = blockArrayModel([rVB, img]);

    isNull('should be null', <VideoContainer {...data} />);
  });
});
