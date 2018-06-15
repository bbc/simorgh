import React from 'react';
import renderer from 'react-test-renderer';

const shouldMatchSnapshot = Component => {
  test(`should render correctly`, () => {
    const root = renderer.create(<Component />);
    expect(root).toMatchSnapshot();
  });
};

export default {
  shouldMatchSnapshot,
};
