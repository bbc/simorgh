import { Window } from 'happy-dom';

export const getOverrideWindow = () => {
  return new Window();
};

export const overrideWindow = () => {
  // @ts-expect-error set original window
  global.originalWindow = global.window;

  // @ts-expect-error delete window object
  delete global.window;

  const window = getOverrideWindow();

  // @ts-expect-error set window
  global.window = window;

  return { window };
};

export const resetWindow = () => {
  // @ts-expect-error reset original window
  global.window = global.originalWindow;
};

export const beforeAll = () => {
  const windowLocation = global.window.location;

  const { window } = overrideWindow();

  // @ts-expect-error store original window.location
  global.windowLocation = windowLocation;

  // @ts-expect-error allow deletion of window.location for tests
  delete window.location;

  // @ts-expect-error allow definition of window.location for tests
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(windowLocation),
      pathname: {
        configurable: true,
        value: '/',
        writable: true,
      },
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  );
};

export const afterAll = () => {
  // @ts-expect-error reset original window.location
  window.location = global.windowLocation;
  resetWindow();
};
