import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Image from './index';

describe('Image', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Image />,
    );
  });
  describe('contains data', () => {
    const data = {
      blocks: [
        {
          blockId: '',
          type: 'image',
          model: {
            blocks: [
              {
                blockId: '',
                type: 'rawImage',
                model: {
                  width: 640,
                  height: 420,
                  locator:
                    '/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png',
                  originCode: null,
                  copyrightHolder: 'BBC',
                },
              },
            ],
          },
        },
      ],
    };
    snapshotTestHelper.shouldMatchSnapshot(
      'should render an image',
      <Image {...data} />,
    );
  });
});
