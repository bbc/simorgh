import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Text from './index';

const paragraphBlock = (blockId, text) => ({
  blockId,
  model: {
    text,
  },
});

const props = {
  blocks: [
    paragraphBlock('01', 'This is a text block.'),
    paragraphBlock('02', 'This is another text block.'),
    paragraphBlock('03', 'This is the final text block.'),
  ],
};

storiesOf('Text', module).add('default', () => <Text {...props} />);
