/* eslint-disable no-eval */
import sendStaticBeacon, { addSendStaticBeaconToWindow } from '.';

let XMLHttpRequestSpy: jest.SpyInstance<XMLHttpRequest | undefined, []>;

describe('sendStaticBeacon', () => {
  const XMLHttpRequestMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    withCredentials: false,
    send: jest.fn(),
  };

  beforeEach(() => {
    XMLHttpRequestSpy = jest.spyOn(window, 'XMLHttpRequest');
    eval(addSendStaticBeaconToWindow());
  });

  afterEach(() => {
    XMLHttpRequestSpy.mockRestore();
    jest.clearAllMocks();
    // @ts-expect-error cleanup
    delete window.sendStaticBeacon;
  });

  it('should load the sendStaticBeacon script onto window', () => {
    expect(typeof window.sendStaticBeacon).toBe('function');
  });

  it('should send beacon with XHR', () => {
    XMLHttpRequestSpy.mockImplementation(
      () => XMLHttpRequestMock as XMLHttpRequest,
    );

    eval(sendStaticBeacon('https://foobar.com'));

    expect(XMLHttpRequestMock.open).toHaveBeenCalledWith(
      'GET',
      'https://foobar.com',
      true,
    );
  });
});
