import React from 'react';
import renderer from 'react-test-renderer';

const shouldMatchSnapshot = (ComponentName, Component) => {
  describe(`"${ComponentName}"`, () => {
    test(`should render correctly`, () => {
      const root = renderer.create(<Component />);
      expect(root).toMatchSnapshot();
    });
  });
};

export default {
  shouldMatchSnapshot,
};
