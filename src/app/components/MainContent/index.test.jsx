import React from 'react';
import renderer from 'react-test-renderer';
import MainContent from './index';
// import { isNull } from '../../helpers/tests/testHelpers';

describe('MainContent', () => {
  const data = {
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

  it('should render correctly', () => {
    const tree = renderer.create(<MainContent data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('with no data', () => {
  //   isNull('should return null', <MainContent />);
  // });

  // describe('with data', () => {
  //   isNull('should return null', <MainContent data={[]} />);
  // });
});
