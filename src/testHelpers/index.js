import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ShallowRenderer from 'react-test-renderer/shallow';
import deepClone from 'ramda/src/clone';
import nodeLogger from '../app/lib/logger.node';

export const shouldMatchSnapshot = (title, component) => {
  it(title, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
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

export const isNull = (title, component) => {
  it(title, () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toBeNull();
  });
};

export const setWindowValue = (key, value) => {
  const windowValue = window[key];
  delete window[key];

  let newValue = value;

  if (value && typeof value === 'object') {
    newValue = {
      ...deepClone(windowValue),
      ...value,
    };
  }

  Object.defineProperty(window, key, {
    value: newValue,
    writable: true,
  });
};

export const resetWindowValue = (key, value) => {
  Object.defineProperty(window, key, {
    value,
    writable: true,
  });
};

const mocks = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  verbose: jest.fn(),
  debug: jest.fn(),
  silly: jest.fn(),
};

jest.mock('../app/lib/logger.node', () => jest.fn());
nodeLogger.mockImplementation(() => mocks);

export const loggerMock = mocks;
