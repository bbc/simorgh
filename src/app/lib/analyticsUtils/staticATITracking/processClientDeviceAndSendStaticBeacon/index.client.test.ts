import { addProcessClientDeviceAndSendStaticBeaconToWindow } from '.';

describe('addProcessClientDeviceAndSendStaticBeaconToWindow script', () => {
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
  });

  beforeEach(() => {
    jest.clearAllMocks();
    document.cookie = '';
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    window.sendStaticBeacon = jest.fn();

    addProcessClientDeviceAndSendStaticBeaconToWindow();
  });

  it('Does not call sendBeacon if the event has no data-ati-tracking parameter', () => {
    window.processClientDeviceAndSendStaticBeacon('');
    expect(window.sendStaticBeacon).toHaveBeenCalledTimes(0);
  });

  it('Does not add userId cookie if crypto is unsupported, but still calls sendBeacon', () => {
    const originalWindowCrypto = window.crypto;
    Object.defineProperty(window, 'crypto', {
      writable: true,
      value: undefined,
    });

    window.processClientDeviceAndSendStaticBeacon(
      'https://logws1363.ati-host.net/?',
    );
    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    const parsedATIParams = Object.fromEntries(new URLSearchParams(callParam));
    expect(parsedATIParams.idclient).toBeUndefined();

    window.crypto = originalWindowCrypto;
  });

  it('Sets a new cookie if there is no atuserid cookie on the user browser', () => {
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('randomUniqueId');

    window.processClientDeviceAndSendStaticBeacon(
      'https://logws1363.ati-host.net/?',
    );

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
    window.processClientDeviceAndSendStaticBeacon(
      'https://logws1363.ati-host.net/?',
    );

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
    window.processClientDeviceAndSendStaticBeacon(
      'https://logws1363.ati-host.net/?',
    );

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(callParam).toContain('idclient=oldCookieId');
  });

  it('Reuses the atuserid cookie if there are already multiple atuserid cookies on the user browser', () => {
    document.cookie =
      'random-cookie=blah; atuserid={"name":"atuserid", "val":"oldCookieId"}; atuserid={"val":"oldCookieId"}; path=/; max-age=397; Secure;';
    (crypto.randomUUID as jest.Mock).mockReturnValueOnce('newCookieId');
    window.processClientDeviceAndSendStaticBeacon(
      'https://logws1363.ati-host.net/?',
    );

    const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
    expect(callParam).toContain('idclient=oldCookieId');
  });

  describe('on lite pages', () => {
    beforeEach(() => {
      jest
        .spyOn(window.location, 'pathname', 'get')
        .mockImplementation(() => '/persian.lite');
    });

    it.each([
      {
        atiUrl: 'https://logws1363.ati-host.net/?',
        reverbUrl: undefined,
        expectedParsedParams: {
          idclient: 'userCookieId',
          hl: `${testHour}x${testMinute}x${testSecond}`,
          lng: 'en-GB',
          r: '100x400x24x24',
          re: '4060x1080',
          app_type: 'lite',
          ref: 'https://www.bbc.com',
        },
      },
      {
        atiUrl: 'https://logws1363.ati-host.net/?',
        reverbUrl:
          'https://a1.api.bbc.co.uk/hit.xiti?idclient={idclient}&s=598343&s2=69&p=persian.articles.c4vlle3q337o.page&r={screenResolutionColourDepth}&re={browserViewportResolution}&hl={timestamp}&lng={language}&x1=[urn%3Abbc%3Aoptimo%3Aasset%3Ac4vlle3q337o]&x2=[lite]&x3=[news-persian]&x4=[fa]&x5=[http%25253A%25252F%25252Flocalhost%25253A7080%25252Fpersian%25252Farticles%25252Fc4vlle3q337o]&x6=[{referrer}]&x7=[article]&x8=[simorgh]&x9=[%D9%BE%D9%87%D9%BE%D8%A7%D8%AF%DB%8C%2520%DA%A9%D9%87%2520%D8%A8%D8%B1%D8%A7%DB%8C%D8%AA%D8%A7%D9%86%2520%D9%82%D9%87%D9%88%D9%87%2520%D9%85%DB%8C%E2%80%8C%D8%A2%D9%88%D8%B1%D8%AF]&x11=[2019-05-28T13%3A42%3A44.996Z]&x12=[2019-07-23T15%3A47%3A11.893Z]&app_type=lite&ref={referrer}',
        expectedParsedParams: {
          idclient: 'userCookieId',
          hl: `${testHour}x${testMinute}x${testSecond}`,
          lng: 'en-GB',
          r: '100x400x24x24',
          re: '4060x1080',
          app_type: 'lite',
          x6: '[https://www.bbc.com]',
          ref: 'https://www.bbc.com',
        },
      },
    ])(
      'Calls sendStaticBeacon() with the correct url when ati url is $atiUrl and reverb url is $reverbUrl',
      ({ atiUrl, reverbUrl, expectedParsedParams }) => {
        document.cookie =
          'atuserid={"val":"userCookieId"}; path=/; max-age=397; Secure;';

        Object.defineProperty(document, 'referrer', {
          value: 'https://www.bbc.com',
        });

        jest.replaceProperty(window.screen, 'width', 100);
        jest.replaceProperty(window.screen, 'height', 400);
        jest.replaceProperty(window.screen, 'colorDepth', 24);
        jest.replaceProperty(window.screen, 'pixelDepth', 24);

        jest.spyOn(window, 'innerWidth', 'get').mockReturnValue(4060);
        jest.spyOn(window, 'innerHeight', 'get').mockReturnValue(1080);

        window.processClientDeviceAndSendStaticBeacon(atiUrl, reverbUrl);

        const callParam = (window.sendStaticBeacon as jest.Mock).mock
          .calls[0][0];

        const { searchParams } = new URL(callParam);
        const parsedATIParams = Object.fromEntries(searchParams);

        expect(parsedATIParams).toMatchObject(expectedParsedParams);
      },
    );

    it('Adds marketing parameters to the beacon URL on lite page', () => {
      window.location.search =
        '?at_campaign=tactical&at_medium=display_ad&at_campaign_type=paid&at_content=ls&at_marketing_tactic=tactical&at_product=persian&at_genre=politics&at_ptr_name=bbc&at_objective=acquisition&at_audience_motivation=gmp&at_demographic=A9&at_format=image&at_creation=tactical_psiphon_a9&at_bbc_team=8ms&utm_source=mktg&utm_campaign=tacticalps';
      window.location.pathname = '/persian.lite';

      window.processClientDeviceAndSendStaticBeacon(
        'https://logws1363.ati-host.net/?',
      );

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
    });

    it('Does not add garbage params as marketing parameters to the beacon URL on lite page', () => {
      window.location.search =
        '?at_campaign=tactical&at_medium=display_ad&at_campaign_type=paid&at_content=ls&at_marketing_tactic=tactical&at_product=persian&at_genre=politics&at_ptr_name=bbc&at_objective=acquisition&at_audience_motivation=gmp&at_demographic=A9&at_format=image&at_creation=tactical_psiphon_a9&at_bbc_team=8ms&utm_source=mktg&utm_campaign=tacticalps&garbage=should_not_be_included';
      window.location.pathname = '/persian.lite';

      window.processClientDeviceAndSendStaticBeacon(
        'https://logws1363.ati-host.net/?',
      );

      const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(callParam),
      );
      expect(parsedATIParams).not.toEqual(
        expect.objectContaining({
          garbage: 'should_not_be_included',
        }),
      );
    });

    it('Calls sendStaticBeacon() with the correct url', () => {
      document.cookie =
        'atuserid={"val":"userCookieId"}; path=/; max-age=397; Secure;';

      Object.defineProperty(document, 'referrer', {
        value: 'https://www.bbc.com',
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

      window.processClientDeviceAndSendStaticBeacon(
        'https://logws1363.ati-host.net/?',
      );

      const callParam = (window.sendStaticBeacon as jest.Mock).mock.calls[0][0];
      const parsedATIParams = Object.fromEntries(
        new URLSearchParams(callParam),
      );
      expect(parsedATIParams).toMatchObject({
        idclient: 'userCookieId',
        hl: `${testHour}x${testMinute}x${testSecond}`,
        lng: 'en-GB',
        r: '100x400x24x24',
        re: '4060x1080',
        app_type: 'lite',
        ref: 'https://www.bbc.com',
      });
    });
  });
});
