import React from 'react';
import renderer from 'react-test-renderer';
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
              model: {
                blocks: [
                  {
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
              blockId: '2-1',
              model: {
                text: 'This is some text content!',
              },
            },
          ],
        },
      },
      {
        type: 'test',
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
    ],
  };

  console.log(JSON.stringify(validData));

  it('should render correctly', () => {
    const tree = renderer.create(<MainContent data={validData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const invalidData = {
    blocks: [
      {
        type: 'test',
        blockId: '1',
        model: {
          blocks: [
            {
              blockId: '1',
              model: {
                text: 'This is some text content!',
              },
            },
          ],
        },
      },
      {
        type: 'test',
        blockId: '2',
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
    ],
  };

  it('should render incorrectly', () => {
    const tree = renderer.create(<MainContent data={invalidData} />).toJSON();
    expect(tree).toThrowErrorMatchingSnapshot();
  });

});
