import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

describe('Header', () => {
  describe('Component', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<Header />);
      expect(tree).toMatchSnapshot();
    });
  });
});
