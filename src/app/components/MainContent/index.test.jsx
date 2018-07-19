import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import MainContent from './index';

describe('MainContent', () => {
  const blocks = [
    {
      type: 'headline',
      blockId: '1',
      model: {
        blocks: [
          {
            type: 'text',
            blockId: '1-1',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  blockId: '1-1-1',
                  model: {
                    text: 'This is a headline!',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'text',
      blockId: '2',
      model: {
        blocks: [
          {
            type: 'paragraph',
            blockId: '2-1',
            model: {
              text: 'This is some text content!',
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
            model: {
              text: 'This is some test content!',
            },
          },
        ],
      },
    },
  ];

  shouldMatchSnapshot(
    'should render inline-code',
    <MainContent blocks={blocks} />,
  );
});
