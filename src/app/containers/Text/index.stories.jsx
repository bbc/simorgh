import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextContainer from './index';

const paragraphBlock = (blockId, text) => ({
  blockId,
  model: {
    text,
  },
});

const props = {
  blocks: [
    paragraphBlock(
      '01',
      "It was designed by London-based florist Philippa Craddock, who also created the floral displays for St George's Chapel and St George's Hall using locally sourced foliage, [which were later donated to local hospices](/news/articles/c000000000ro).",
    ),
    paragraphBlock('02', 'This is another paragraph with some **bold** text.'),
    paragraphBlock('03', 'This is a paragraph with _italic_ text.'),
    paragraphBlock(
      '04',
      '~~This is a paragraph with some strike-through text~~.',
    ),
    paragraphBlock('05', 'This is a paragraph with some `inline code.`'),
  ],
};

storiesOf('TextContainer', module).add('default', () => (
  <TextContainer {...props} />
));
