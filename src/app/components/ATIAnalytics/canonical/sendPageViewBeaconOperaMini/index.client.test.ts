/* eslint-disable no-eval */
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import sendPageViewBeaconOperaMini from '.';

let XMLHttpRequestSpy: jest.SpyInstance<XMLHttpRequest | undefined, []>;
let documentReferrerSpy: jest.SpyInstance;

describe('sendPageViewBeaconOperaMini', () => {
  class OperaMiniMock {
    // eslint-disable-next-line class-methods-use-this
    get [Symbol.toStringTag]() {
      return 'OperaMini';
    }
  }

  const XMLHttpRequestMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    withCredentials: false,
    send: jest.fn(),
  };

  eval(addSendStaticBeaconToWindow());

  beforeEach(() => {
    documentReferrerSpy = jest.spyOn(document, 'referrer', 'get');
    XMLHttpRequestSpy = (
      jest.spyOn(window, 'XMLHttpRequest') as jest.Mock
    ).mockImplementation(() => XMLHttpRequestMock as XMLHttpRequest);
  });

  afterEach(() => {
    XMLHttpRequestSpy.mockRestore();
    documentReferrerSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('when browser is Opera Mini', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'operamini', {
        writable: true,
        value: new OperaMiniMock(),
      });
      Object.defineProperty(window, 'hasOperaMiniScriptRan', {
        writable: true,
        value: false,
      });
    });

    afterEach(() => {
      // @ts-expect-error Property 'operamini' does not exist on type 'Window & typeof globalThis'.
      delete window.operamini;
      // @ts-expect-error Property 'hasOperaMiniScriptRan' does not exist on type 'Window & typeof globalThis'.
      delete window.hasOperaMiniScriptRan;
    });

    it('should send beacon with XHR', () => {
      eval(sendPageViewBeaconOperaMini('https://ati-host.example.com'));

      expect(XMLHttpRequestMock.open).toHaveBeenCalledWith(
        'GET',
        'https://ati-host.example.com',
        true,
      );
    });

    it('should send beacon including the referrer with XHR', () => {
      documentReferrerSpy.mockReturnValue('https://client.referrer.com');

      eval(sendPageViewBeaconOperaMini('https://ati-host.example.com'));

      expect(XMLHttpRequestMock.open).toHaveBeenCalledWith(
        'GET',
        'https://ati-host.example.com&ref=https://client.referrer.com',
        true,
      );
    });

    it('should NOT send more than 1 beacon with XHR', () => {
      const multipleCalls =
        sendPageViewBeaconOperaMini('https://ati-host.example.com') +
        sendPageViewBeaconOperaMini('https://ati-host.example.com') +
        sendPageViewBeaconOperaMini('https://ati-host.example.com');

      eval(multipleCalls);

      expect(XMLHttpRequestMock.open).toHaveBeenCalledTimes(1);
    });
  });

  it('should not send beacon with XHR, when browser is not Opera Mini', () => {
    eval(sendPageViewBeaconOperaMini('https://ati-host.example.com'));

    expect(XMLHttpRequestMock.open).not.toHaveBeenCalled();
  });
});
