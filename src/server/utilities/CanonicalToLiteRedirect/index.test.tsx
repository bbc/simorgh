import { addSetAtUserIdCookie } from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import { redirectScript } from '.';

describe('LiteRedirect', () => {
  let defaultWindow = {};
  const testSystemTime = new Date('2024-11-13T16:30:02.000Z');
  const testHour = testSystemTime.getHours();
  const testMinute = testSystemTime.getMinutes();
  const testSecond = testSystemTime.getSeconds();

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(testSystemTime);
    addSetAtUserIdCookie();
    let mockCookie = '';
    Object.defineProperty(document, 'cookie', {
      get() {
        return mockCookie;
      },
      set(cookieValue) {
        mockCookie = cookieValue;
      },
    });
  });

  beforeEach(() => {
    window.sendStaticBeacon = jest.fn();
    defaultWindow = {
      ...window,
      location: {
        replace: jest.fn(),
        href: 'https://www.somepath.com/',
        pathname: '/pidgin/articles/czrzwn80zjmo',
      },
    } as unknown as Window;
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
      const mockWindow = {
        ...defaultWindow,
        navigator: {
          connection: {
            effectiveType,
          },
        },
      } as unknown as Window;

      redirectScript(mockWindow, '');
      const replaceCallStack = (mockWindow.location.replace as jest.Mock).mock
        .calls[0]?.[0];

      const hasRedirected = Boolean(replaceCallStack);

      expect(hasRedirected).toBe(expectedRedirect);
    },
  );

  it('For a valid redirect, it should send a reverb track with the expected parameters', () => {
    const reverbUrl =
      'https://logws1363.ati-host.net/hit.xiti?idclient={idclient}&s=596068&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&x6=[{referrer}]&app_type=lite&ref={referrer}&app_name=undefined&language=undefined&content_type=undefined&events=%5B%7B%22name%22%3A%22viewability.view%22%2C%22data%22%3A%7B%22item%22%3A%7B%22name%22%3A%22~COMPONENT_NAME_PLACEHOLDER~%22%2C%22link%22%3A%22{forwardingLink}%22%7D%2C%22event%22%3A%7B%22category%22%3A%22viewability%22%2C%22action%22%3A%22view%22%7D%2C%22group%22%3A%7B%22type%22%3A%22~COMPONENT_NAME_PLACEHOLDER~%22%7D%2C%22user%22%3A%7B%22id%22%3Anull%7D%2C%22app%22%3A%7B%22type%22%3A%22lite%22%7D%7D%7D%5D&context=%5B%7B%22data%22%3A%7B%22page%22%3A%7B%7D%2C%22site%22%3A%7B%22level2_id%22%3A%22%22%7D%7D%7D%5D';

    document.cookie =
      'atuserid={"val":"userCookieId"}; path=/; max-age=397; Secure;';

    const mockWindow = {
      ...defaultWindow,
      navigator: {
        connection: {
          effectiveType: '2g',
        },
      },
    } as unknown as Window;

    redirectScript(mockWindow, reverbUrl);

    const expectedParsedParams = {
      idclient: 'userCookieId',
      s: '596068',
      r: 'undefined',
      re: 'undefined',
      hl: `${testHour}x${testMinute}x${testSecond}`,
      ts: '1731515402000',
      lng: 'undefined',
      x6: '[undefined]',
      app_type: 'lite',
      ref: 'undefined',
      app_name: 'undefined',
      language: 'undefined',
      content_type: 'undefined',
      events:
        '[{"name":"viewability.view","data":{"item":{"name":"REDIRECT-2g","link":"undefined"},"event":{"category":"viewability","action":"view"},"group":{"type":"REDIRECT-2g"},"user":{"id":null},"app":{"type":"lite"}}}]',
      context: '[{"data":{"page":{},"site":{"level2_id":""}}}]',
    };

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    const { searchParams } = new URL(callParam);
    const parsedTrackingParams = Object.fromEntries(searchParams);

    expect(parsedTrackingParams).toMatchObject(expectedParsedParams);
  });
});
