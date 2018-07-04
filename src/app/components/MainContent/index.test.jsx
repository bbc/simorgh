import React from 'react';
import renderer from 'react-test-renderer';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
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

  shouldMatchSnapshot('should render correctly', <MainContent {...validData} />);

  const invalidData = {
    blocks: [
      {
        type: 'text',
        blockId: '1',
        model: {
          blocks: [
            {
              blockId: '1',
              type: 'paragraph',
              model: {
                text: 'This is some text content!',
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
              blockId: '2-1',
              type: 'paragraph',
              model: {
                text: 'This is some test content!',
              },
            },
          ],
        },
      },
    ],
  };

  it('should render incorrectly', () => {
    const tree = renderer.create(<MainContent {...invalidData} />).toJSON();
    expect(tree).toThrowErrorMatchingSnapshot();
  });

});
