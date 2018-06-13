import React from 'react';
import renderer from 'react-test-renderer';

import Header from './index';

describe('Header', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
