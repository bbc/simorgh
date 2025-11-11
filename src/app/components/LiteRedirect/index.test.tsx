import { redirectScript } from '.';

describe('LiteRedirect', () => {
  beforeEach(() => {
    // I've tried mocking the replace function like this, but it still won't work.
    // Object.defineProperty(window, 'location', {
    //   configurable: true,
    //   writable: true,
    //   value: { replace: jest.fn() },
    // });
  });
  it.each([
    {
      effectiveType: 'randomValue',
      expectedRedirect: false,
    },
    {
      effectiveType: 'slow-2g',
      expectedRedirect: true,
    },
    {
      effectiveType: '2g',
      expectedRedirect: true,
    },
    {
      effectiveType: '3g',
      expectedRedirect: true,
    },
    {
      effectiveType: '4g',
      expectedRedirect: false,
    },
  ])(
    `When the client is on $effectiveType then expect redirect should be $expectRedirect`,
    ({ effectiveType, expectedRedirect }) => {
      const isLite = false;
      const testLitePath = '/testLitePath';

      // Strangely enough, this works for mocking the navigator.
      // Object.defineProperty(window, 'navigator', {
      //   writable: true,
      //   value: {
      //     connection: {
      //       effectiveType,
      //     },
      //   },
      // });

      const mockWindow = {
        navigator: {
          connection: {
            effectiveType,
          },
        },
        location: {
          replace: jest.fn(),
        },
      } as unknown as Window;

      redirectScript(mockWindow, isLite, testLitePath);
      const replaceCallStack = (mockWindow.location.replace as jest.Mock).mock
        .calls[0]?.[0];

      const hasRedirected = Boolean(replaceCallStack);

      expect(hasRedirected).toBe(expectedRedirect);
    },
  );
});
