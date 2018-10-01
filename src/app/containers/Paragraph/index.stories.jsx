import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ParagraphContainer from './index';

const fragmentBlock = (text, attributes = []) => ({
  type: 'fragment',
  model: {
    text,
    attributes,
  },
});

const blocks = [
  fragmentBlock('This is '),
  fragmentBlock('some bold text', ['bold']),
  fragmentBlock(', and this... '),
  fragmentBlock('is some italic text!', ['italic']),
];

storiesOf('ParagraphContainer', module).add('default', () => (
  <ParagraphContainer blocks={blocks} />
));
