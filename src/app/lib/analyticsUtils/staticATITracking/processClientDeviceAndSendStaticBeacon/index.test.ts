import { addProcessClientDeviceAndSendStaticBeaconToWindow } from '.';

describe('addProcessClientDeviceAndSendStaticBeaconToWindow script', () => {
  const originalWindowLocation = window.location;
  const testSystemTime = new Date('2024-11-13T16:30:02.000Z');
  const testHour = testSystemTime.getHours();
  const testMinute = testSystemTime.getMinutes();
  const testSecond = testSystemTime.getSeconds();

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(testSystemTime);
    let mockCookie = '';
    Object.defineProperty(document, 'cookie', {
      get() {
        return mockCookie;
      },
      set(cookieValue) {
        mockCookie = cookieValue;
      },
    });

    Object.defineProperty(navigator, 'language', {
      get() {
        return 'en-GB';
      },
    });

    addProcessClientDeviceAndSendStaticBeaconToWindow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = '';
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    window.sendStaticBeacon = jest.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, search: '' },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalWindowLocation,
      },
    });
  });

  it('Does not call sendBeacon if the event has no data-ati-tracking parameter', () => {
    window.processClientDeviceAndSendStaticBeacon({ reverbUrl: '' });
    expect(window.sendStaticBeacon).toHaveBeenCalledTimes(0);
  });

  it('Does not add userId cookie if crypto is unsupported, but still calls sendBeacon', () => {
    const originalWindowCrypto = window.crypto;
    Object.defineProperty(window, 'crypto', {
      writable: true,
      value: undefined,
    });

    window.processClientDeviceAndSendStaticBeacon({
      reverbUrl: 'https://logws1363.ati-host.net/?idclient={idclient}',
    });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    const parsedATIParams = Object.fromEntries(new URLSearchParams(callParam));
    expect(parsedATIParams.idclient).toBeUndefined();

    window.crypto = originalWindowCrypto;
  });

  it('Sets a new cookie if there is no atuserid cookie on the user browser', () => {
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('randomUniqueId');

    window.processClientDeviceAndSendStaticBeacon({
      reverbUrl: 'https://logws1363.ati-host.net/?idclient={idclient}',
    });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(document.cookie).toBe(
      'atuserid=%7B%22val%22%3A%22randomUniqueId%22%7D; path=/; max-age=34300800; Secure;',
    );
    expect(callParam).toContain('idclient=randomUniqueId');
  });

  it('Overwrites content in atuserid cookie if it already exists', () => {
    const oldCookieId = 'oldCookieId';
    document.cookie = `atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%22${oldCookieId}%22%2C%22options%22%3A%7B%22end%22%3A%222026-03-11T10%3A23%3A55.442Z%22%2C%22path%22%3A%22%2F%22%7D%7D; path=/; max-age=397; Secure;`;
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    window.processClientDeviceAndSendStaticBeacon({
      reverbUrl: 'https://logws1363.ati-host.net/?idclient={idclient}',
    });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(document.cookie).toBe(
      `atuserid=%7B%22val%22%3A%22${oldCookieId}%22%7D; path=/; max-age=34300800; Secure;`,
    );
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it('Reuses the atuserid cookie if there is 1 atuserid cookie on the user browser', () => {
    document.cookie =
      'atuserid={"val":"oldCookieId"}; path=/; max-age=397; Secure;';
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    window.processClientDeviceAndSendStaticBeacon({
      reverbUrl: 'https://logws1363.ati-host.net/?idclient={idclient}',
    });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it('Reuses the atuserid cookie if there are already multiple atuserid cookies on the user browser', () => {
    document.cookie =
      'random-cookie=blah; atuserid={"name":"atuserid", "val":"oldCookieId"}; atuserid={"val":"oldCookieId"}; path=/; max-age=397; Secure;';
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    window.processClientDeviceAndSendStaticBeacon({
      reverbUrl: 'https://logws1363.ati-host.net/?idclient={idclient}',
    });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it.each([
    {
      title:
        'Prioritises ATI url, when an ATI url is provided and a reverb url is not',
      atiUrl: 'https://logws1363.ati-host.net/?',
      reverbUrl: undefined,
      expectedParsedParams: {
        idclient: 'userCookieId',
        hl: `${testHour}x${testMinute}x${testSecond}`,
        lng: 'en-GB',
        r: '0x0x24x24',
        re: '4060x1080',
        app_type: 'lite',
        ref: 'https://www.bbc.com',
      },
    },
    {
      title:
        'Prioritises the reverb url, when both an ATI url and reverb url is provided - Reverb',
      atiUrl: 'https://logws1363.ati-host.net/?',
      reverbUrl:
        'https://a1.api.bbc.co.uk/hit.xiti?idclient={idclient}&s=598343&s2=69&p=persian.articles.c4vlle3q337o.page&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&lng={language}&x1=[urn%3Abbc%3Aoptimo%3Aasset%3Ac4vlle3q337o]&x2=[lite]&x3=[news-persian]&x4=[fa]&x5=[http%25253A%25252F%25252Flocalhost%25253A7080%25252Fpersian%25252Farticles%25252Fc4vlle3q337o]&x6=[{referrer}]&x7=[article]&x8=[simorgh]&x9=[%D9%BE%D9%87%D9%BE%D8%A7%D8%AF%DB%8C%2520%DA%A9%D9%87%2520%D8%A8%D8%B1%D8%A7%DB%8C%D8%AA%D8%A7%D9%86%2520%D9%82%D9%87%D9%88%D9%87%2520%D9%85%DB%8C%E2%80%8C%D8%A2%D9%88%D8%B1%D8%AF]&x11=[2019-05-28T13%3A42%3A44.996Z]&x12=[2019-07-23T15%3A47%3A11.893Z]&app_type=lite&ref={referrer}',
      expectedParsedParams: {
        idclient: 'userCookieId',
        hl: `${testHour}x${testMinute}x${testSecond}`,
        lng: 'en-GB',
        r: '0x0x24x24',
        re: '4060x1080',
        app_type: 'lite',
        x6: '[https://www.bbc.com]',
        ref: 'https://www.bbc.com',
      },
    },
    {
      title:
        'Calls sendStaticBeacon() with the event parameter formatted for the viewability model - Reverb',
      atiUrl: 'https://logws1363.ati-host.net/?',
      reverbUrl:
        'https://logws1363.ati-host.net/hit.xiti?idclient={idclient}&s=598343&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&ts={epochTimestamp}&lng={language}&x6=[{referrer}]&app_type=lite&ref={referrer}&app_name=news-gahuza&language=rw&content_type=article&events=%5B%7B%22name%22%3A%22viewability.view%22%2C%22data%22%3A%7B%22item%22%3A%7B%22name%22%3A%22scrollable-navigation%22%2C%22link%22%3A%22{forwardingLink}%22%7D%2C%22event%22%3A%7B%22category%22%3A%22viewability%22%2C%22action%22%3A%22view%22%7D%2C%22group%22%3A%7B%22name%22%3A%22article%22%7D%2C%22user%22%3A%7B%22id%22%3Anull%7D%2C%22app%22%3A%7B%22type%22%3A%22lite%22%2C%22name%22%3A%22news-gahuza%22%7D%7D%7D%5D&context=%5B%7B%22data%22%3A%7B%22page%22%3A%7B%22%24%22%3A%22gahuza.articles.cy4849j0jyzo.page%22%7D%7D%7D%5D',
      expectedParsedParams: {
        idclient: 'userCookieId',
        s: '598343',
        r: '0x0x24x24',
        re: '4060x1080',
        hl: '16x30x2',
        ts: '1731515402000',
        lng: 'en-GB',
        x6: '[https://www.bbc.com]',
        app_type: 'lite',
        ref: 'https://www.bbc.com',
        app_name: 'news-gahuza',
        language: 'rw',
        content_type: 'article',
        events:
          '[{"name":"viewability.view","data":{"item":{"name":"scrollable-navigation","link":""},"event":{"category":"viewability","action":"view"},"group":{"name":"article"},"user":{"id":null},"app":{"type":"lite","name":"news-gahuza"}}}]',
        context:
          '[{"data":{"page":{"$":"gahuza.articles.cy4849j0jyzo.page"}}}]',
      },
    },
  ])('$title', ({ atiUrl, reverbUrl, expectedParsedParams }) => {
    document.cookie =
      'atuserid={"val":"userCookieId"}; path=/; max-age=397; Secure;';

    Object.defineProperty(document, 'referrer', {
      value: 'https://www.bbc.com',
    });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: 'gahuza/popular/read.lite', search: '' },
    });

    window.screen = {
      width: 100,
      height: 400,
      colorDepth: 24,
      pixelDepth: 24,
      availWidth: 400,
      availHeight: 100,
      orientation: 'landscape' as unknown as ScreenOrientation,
    };
    window.innerWidth = 4060;
    window.innerHeight = 1080;

    window.processClientDeviceAndSendStaticBeacon({ atiUrl, reverbUrl });

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];

    const { searchParams } = new URL(callParam);
    const parsedTrackingParams = Object.fromEntries(searchParams);

    expect(parsedTrackingParams).toMatchObject(expectedParsedParams);
  });

  it.each([
    {
      type: 'reverb',
      sendBeaconProps: {
        reverbUrl: 'https://logws1363.xiti.net/?',
      },
    },
    {
      type: 'ati',
      sendBeaconProps: {
        atiUrl: 'https://logws1363.ati-host.net/?',
      },
    },
  ])(
    'Adds marketing parameters to the beacon URL on lite page - $type',
    ({ sendBeaconProps }) => {
      window.location.search =
        '?at_campaign=tactical&at_medium=display_ad&at_campaign_type=paid&at_content=ls&at_marketing_tactic=tactical&at_product=persian&at_genre=politics&at_ptr_name=bbc&at_objective=acquisition&at_audience_motivation=gmp&at_demographic=A9&at_format=image&at_creation=tactical_psiphon_a9&at_bbc_team=8ms&utm_source=mktg&utm_campaign=tacticalps';
      window.location.pathname = '/persian.lite';

      window.processClientDeviceAndSendStaticBeacon(sendBeaconProps);

      const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(callParam),
      );
      expect(parsedATIParams).toEqual(
        expect.objectContaining({
          src_campaign: 'tactical',
          src_medium: 'display_ad',
          src_campaign_type: 'paid',
          src_content: 'ls',
          src_marketing_tactic: 'tactical',
          src_product: 'persian',
          src_genre: 'politics',
          src_ptr_name: 'bbc',
          src_objective: 'acquisition',
          src_audience_motivation: 'gmp',
          src_demographic: 'A9',
          src_format: 'image',
          src_creation: 'tactical_psiphon_a9',
          src_bbc_team: '8ms',
          utm_source: 'mktg',
          utm_campaign: 'tacticalps',
        }),
      );
    },
  );

  it.each([
    {
      type: 'reverb',
      sendBeaconProps: {
        reverbUrl: 'https://logws1363.xiti.net/?',
      },
    },
    {
      type: 'ati',
      sendBeaconProps: {
        atiUrl: 'https://logws1363.ati-host.net/?',
      },
    },
  ])(
    'Does not add garbage params as marketing parameters to the beacon URL on lite page - $type',
    ({ sendBeaconProps }) => {
      window.location.search =
        '?at_campaign=tactical&at_medium=display_ad&at_campaign_type=paid&at_content=ls&at_marketing_tactic=tactical&at_product=persian&at_genre=politics&at_ptr_name=bbc&at_objective=acquisition&at_audience_motivation=gmp&at_demographic=A9&at_format=image&at_creation=tactical_psiphon_a9&at_bbc_team=8ms&utm_source=mktg&utm_campaign=tacticalps&garbage=should_not_be_included';
      window.location.pathname = '/persian.lite';

      window.processClientDeviceAndSendStaticBeacon(sendBeaconProps);

      const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(callParam),
      );
      expect(parsedATIParams).not.toEqual(
        expect.objectContaining({
          garbage: 'should_not_be_included',
        }),
      );
    },
  );
});
