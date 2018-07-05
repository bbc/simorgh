import React from 'react';
import { shouldMatchSnapshot, isNull } from '../../helpers/tests/testHelpers';
import MainContent from './index';

describe('MainContent', () => {
  const validData = {
    blocks: [
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
        type: 'text',
        blockId: '3',
        model: {
          blocks: [
            {
              type: 'paragraph',
              blockId: '2-1',
              model: {
                text: 'This is some test content!',
              },
            },
          ],
        },
      },
    ],
  };

  shouldMatchSnapshot(
    'should render correctly',
    <MainContent {...validData} />,
  );

  shouldMatchSnapshot(
    'should render correctly',
    <MainContent {...validData} />,
  );

  describe('with no data', () => {
    isNull('should return null', <MainContent />);
  });

  describe('with data', () => {
    isNull('should return null', <MainContent blocks={[]} />);
  });
});
