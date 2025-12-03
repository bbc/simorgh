import { optOutScript, redirectScript } from '.';

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
        localStorage: {
          setItem: jest.fn(),
        },
      } as unknown as Window;

      redirectScript(mockWindow);
      const replaceCallStack = (mockWindow.location.replace as jest.Mock).mock
        .calls[0]?.[0];

      const hasRedirected = Boolean(replaceCallStack);

      expect(hasRedirected).toBe(expectedRedirect);
    },
  );

  it('should set the isOptedIntoLiteRedirect cache value to true on inital redirect', () => {
    const mockWindow = {
      navigator: {
        connection: {
          effectiveType: '2g',
        },
      },
      location: {
        replace: jest.fn(),
        href: 'https://www.somepath.com/',
        pathname: '/pidgin/articles/czrzwn80zjmo',
      },
      localStorage: {
        setItem: jest.fn(),
      },
    } as unknown as Window;

    redirectScript(mockWindow);
    const setItemCallStack = (mockWindow.localStorage.setItem as jest.Mock).mock
      .calls[0];

    expect(setItemCallStack).toStrictEqual(['isOptedIntoLiteRedirect', 'true']);
  });

  it('should set the isOptedIntoLiteRedirect cache value to false on when the user clicks on the go-back-to-canonical-link link', () => {
    const mockWindow = {
      localStorage: {
        setItem: jest.fn(),
      },
    } as unknown as Window;

    const mockEvent = {
      target: {
        tagName: 'A',
        getAttribute: jest
          .fn()
          .mockReturnValueOnce('go-back-to-canonical-link'),
      },
    } as unknown as MouseEvent;

    optOutScript(mockWindow, mockEvent);
    const setItemCallStack = (mockWindow.localStorage.setItem as jest.Mock).mock
      .calls[0];

    expect(setItemCallStack).toStrictEqual([
      'isOptedIntoLiteRedirect',
      'false',
    ]);
  });
});
