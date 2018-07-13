import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import TextContainer from './index';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TextContainer />);
  });

  describe('with data', () => {
    const paragraphBlock = (blockId, text) => ({
      blockId,
      type: 'paragraph',
      model: {
        text,
      },
    });

    const data = {
      blocks: [
        paragraphBlock(
          '01',
          "It was designed by London-based florist Philippa Craddock, who also created the floral displays for St George's Chapel and St George's Hall using locally sourced foliage, [which were later donated to local hospices](/news/articles/c000000000ro).",
        ),
        paragraphBlock(
          '02',
          'This is another paragraph with some **bold** text.',
        ),
        paragraphBlock('03', 'This is a paragraph with __italic__ text.'),
        paragraphBlock(
          '04',
          '~~This is a paragraph with some strike-through text~~.',
        ),
        paragraphBlock('05', 'This is a paragraph with some `inline code.`'),
      ],
    };

    shouldMatchSnapshot('should render correctly', <TextContainer {...data} />);
  });
});
