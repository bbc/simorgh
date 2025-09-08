export const beforeAll = () => {
  const windowLocation = window.location;

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
};
