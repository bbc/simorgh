import React from 'react';
import snapshotTestHelper from '../../../__test__/snapshotTestHelper';
import Text from './index';

describe('Text', () => {
  describe('with no data', () => {
    snapshotTestHelper.shouldMatchSnapshot(
      'should not render anything',
      <Text />,
    );
  });

  describe('with data', () => {
    const paragraphBlock = (blockId, text) => ({
      blockId,
      model: {
        text,
      },
    });

    const data = {
      blocks: [
        paragraphBlock('01', 'This is a text block.'),
        paragraphBlock('02', 'This is another text block.'),
        paragraphBlock('03', 'This is the final text block.'),
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should render correctly',
      <Text {...data} />,
    );
  });
});
