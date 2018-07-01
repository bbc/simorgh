import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies
import 'jest-styled-components'; // eslint-disable-line import/no-extraneous-dependencies

export const shouldMatchSnapshot = (title, component) => {
  it(title, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
};

export const isNull = (title, component) => {
  it(title, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toBeNull();
  });
};

