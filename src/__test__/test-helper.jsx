import React from 'react';
import renderer from 'react-test-renderer';

const shouldMatchSnapshot = (Name, Component) => {
  describe(`"${Name}"`, () => {
    test(`should render correctly`, () => {
      const root = renderer.create(<Component />);
      expect(root).toMatchSnapshot();
    });
  });
};

export default {
  shouldMatchSnapshot,
};
