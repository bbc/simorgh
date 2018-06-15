import React from 'react';
import renderer from 'react-test-renderer';
import MainContent from './index';

describe('Article', () => {
  describe('Component', () => {
    describe('with passed data', () => {
      const data = {
        blocks: [
          {
            type: 'headline',
            blockId: '1',
          },
          {
            type: 'test',
            blockId: '2',
          },
        ],
      };

      it('should render correctly', () => {
        const tree = renderer.create(<MainContent data={data} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
