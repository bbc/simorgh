/* eslint-disable no-eval */
import sendStaticBeacon from './sendStaticBeacon';

let XMLHttpRequestSpy: jest.SpyInstance<XMLHttpRequest | undefined, []>;

describe('sendStaticBeacon', () => {
  const XMLHttpRequestMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    withCredentials: false,
    send: jest.fn(),
  };

  beforeEach(() => {
    XMLHttpRequestSpy = jest.spyOn(window, 'XMLHttpRequest');
  });

  afterEach(() => {
    XMLHttpRequestSpy.mockRestore();
    jest.clearAllMocks();
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
