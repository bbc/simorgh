import 'jest-styled-components'; // eslint-disable-line import/no-extraneous-dependencies
import ShallowRenderer from 'react-test-renderer/shallow'; // eslint-disable-line import/no-extraneous-dependencies
import { render } from 'react-testing-library'; // eslint-disable-line import/no-extraneous-dependencies

export const shouldMatchSnapshot = (title, component) => {
  it(title, () => {
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });
};

export const shallowRender = component => {
  const shallowRenderer = new ShallowRenderer();
  shallowRenderer.render(component);
  const result = shallowRenderer.getRenderOutput();

  return result;
};

export const shouldShallowMatchSnapshot = (title, component) => {
  it(title, () => {
    const tree = shallowRender(component);
    expect(tree).toMatchSnapshot();
  });
};

export const isNull = component => {
  it('should return null', () => {
    const { container } = render(component);
    expect(container.firstChild).toBeNull();
  });
};
