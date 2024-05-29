/* eslint-disable global-require */
import sendBeaconOperaMiniScript from './sendBeaconOperaMiniScript';

interface WindowOperaMini extends Window {
  operamini?: object;
}

let windowSpy: jest.SpyInstance<Window | undefined, []>;
let XMLHttpRequestSpy: jest.SpyInstance<XMLHttpRequest | undefined, []>;

describe('sendBeaconOperaMini', () => {
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

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    XMLHttpRequestSpy = jest.spyOn(window, 'XMLHttpRequest');
  });

  afterEach(() => {
    windowSpy.mockRestore();
    XMLHttpRequestSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('should send beacon with XHR, when browser is Opera Mini', () => {
    windowSpy.mockImplementation(
      () =>
        ({
          operamini: new OperaMiniMock(),
        }) as WindowOperaMini,
    );
    XMLHttpRequestSpy.mockImplementation(
      () => XMLHttpRequestMock as XMLHttpRequest,
    );

    // eslint-disable-next-line no-eval
    eval(sendBeaconOperaMiniScript('https://foobar.com'));

    expect(XMLHttpRequestMock.open).toHaveBeenCalledWith(
      'GET',
      'https://foobar.com',
      true,
    );
  });

  it('should not send beacon with XHR, when browser is not Opera Mini', () => {
    XMLHttpRequestSpy.mockImplementation(
      () => XMLHttpRequestMock as XMLHttpRequest,
    );

    // eslint-disable-next-line no-eval
    eval(sendBeaconOperaMiniScript('https://foobar.com'));

    expect(XMLHttpRequestMock.open).not.toHaveBeenCalled();
  });
});
