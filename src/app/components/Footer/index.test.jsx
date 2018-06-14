import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './index';

describe('Footer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
