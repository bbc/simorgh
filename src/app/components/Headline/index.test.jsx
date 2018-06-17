import React from 'react';
import renderer from 'react-test-renderer';
import Headline from './index';

describe('Headline', () => {
  describe('with no data', () => {
    it('should not render anything', () => {
      const tree = renderer.create(<Headline />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('with data', () => {
    const data = {
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
    };

    it('should render correctly', () => {
      const tree = renderer.create(<Headline {...data} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
