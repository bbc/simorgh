import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './index';

describe('Footer', () => {
  it('renders the component', () => {
    const tree = renderer.create(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
