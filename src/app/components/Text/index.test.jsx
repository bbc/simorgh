import React from 'react';
import snapshotTestHelper from '../../helpers/tests/snapshotTestHelper';
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
        paragraphBlock('01', 'This is a paragraph.'),
        paragraphBlock('02', 'This is another paragraph.'),
        paragraphBlock('03', 'This is a final paragraph.'),
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should render correctly',
      <Text {...data} />,
    );
  });
});
