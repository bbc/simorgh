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
        paragraphBlock('01', 'It was designed by London-based florist Philippa Craddock, who also created the floral displays for St George\'s Chapel and St George\'s Hall using locally sourced foliage, [which were later donated to local hospices](/news/articles/c000000000ro).'),
        paragraphBlock('02', 'This is another paragraph with some **bold** text.'),
        paragraphBlock('03', 'This is a final paragraph with *italic* text.'),
      ],
    };

    snapshotTestHelper.shouldMatchSnapshot(
      'should render correctly',
      <Text {...data} />,
    );
  });
});
