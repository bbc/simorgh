import React from 'react';
import renderer from 'react-test-renderer';
import Text from './index';

describe('Text', () => {
  describe('with data', () => {
    const paragraphBlock = (blockId, text) => ({
      blockId,
      model: {
        text,
      },
    });

    const data = {
      model: {
        blocks: [
          paragraphBlock('01', 'This is a text block.'),
          paragraphBlock('02', 'This is another text block.'),
          paragraphBlock('03', 'This is the final text block.'),
        ],
      },
    };

    it('should render correctly', () => {
      const tree = renderer.create(<Text {...data} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
