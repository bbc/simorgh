export default () => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
    })),
    writable: true,
  });
};
