import React from 'react';
import renderer from 'react-test-renderer';

import BBCNewsBanner from './BBCNewsBanner';

describe('BBCNewsBanner', () => {
  describe('Component', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<BBCNewsBanner />);
      expect(tree).toMatchSnapshot();
    });
  });
});
