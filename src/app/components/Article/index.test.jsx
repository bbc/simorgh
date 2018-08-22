import React from 'react';
import Article from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { textBlock } from '../../models/blocks';

const id = 'c0000000001o';
const title = 'This is a title!';
const lang = 'en-GB';

const blocks = [
  {
    type: 'headline',
    blockId: '1',
    model: textBlock('This is a headline!'),
  },
  {
    type: 'text',
    blockId: '2',
    model: {
      blocks: [
        {
          blockId: '2-1',
          type: 'paragraph',
          model: {
            text: 'This is some text content!',
          },
        },
        {
          blockId: '2-2',
          type: 'paragraph',
          model: {
            text: 'More text content!',
          },
        },
      ],
    },
  },
  {
    type: 'test', // causes prop validation errors
    blockId: '3',
    model: {
      blocks: [
        {
          blockId: '3-1',
          type: 'test-something',
          model: {
            text: 'This is some test content!',
          },
        },
      ],
    },
  },
];

describe('Article', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Article id={id} title={title} lang={lang} blocks={blocks} />,
  );
});
