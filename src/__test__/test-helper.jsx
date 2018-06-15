import React from 'react';
import renderer from 'react-test-renderer';

const shouldMatchSnapshot = (Name, Component) => {
  test(`"${Name}" should render correctly`, () => {
    const root = renderer.create(<Component />);
    expect(root).toMatchSnapshot();
  });
};

export default {
  shouldMatchSnapshot,
};
