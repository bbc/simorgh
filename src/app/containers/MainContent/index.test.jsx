import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import MainContentContainer from './index';

describe('MainContent', () => {
  const blocks = [
    {
      type: 'headline',
      blockId: 'b-1',
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
      type: 'subheading',
      blockId: '1',
      model: {
        blocks: [
          {
            type: 'text',
            blockId: 't-1',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  blockId: 'p-1',
                  model: {
                    text: 'This is a subheading!',
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
    'should render correctly',
    <MainContentContainer blocks={blocks} />,
  );
});
