import { redirectScript } from '.';

describe('LiteRedirect', () => {
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
      const mockWindow = {
        navigator: {
          connection: {
            effectiveType,
          },
        },
        location: {
          replace: jest.fn(),
          href: 'https://www.somepath.com/',
          pathname: '/pidgin/articles/czrzwn80zjmo',
        },
      } as unknown as Window;

      redirectScript(mockWindow);
      const replaceCallStack = (mockWindow.location.replace as jest.Mock).mock
        .calls[0]?.[0];

      const hasRedirected = Boolean(replaceCallStack);

      expect(hasRedirected).toBe(expectedRedirect);
    },
  );
});
