import React from 'react';
import {shouldMatchSnapshot, isNull} from '../../helpers/tests/testHelpers';
import Text from './index';

describe('Text', () => {
  describe('with no data', () => {
    isNull(
      'should return null',
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
        paragraphBlock('03', 'This is a paragraph with *italic* text.'),
        paragraphBlock('04', '~~This is a paragraph with some strike-through text~~.'),
        paragraphBlock('05', "This is a paragraph with some `inline code.`")
      ],
    };

    shouldMatchSnapshot(
      'should render correctly',
      <Text {...data} />,
    );
  });
});
