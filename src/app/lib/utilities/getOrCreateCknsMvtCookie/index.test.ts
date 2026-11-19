import Cookie from 'js-cookie';
import getOrCreateCknsMvtCookie, { CKNS_MVT_COOKIE_NAME } from '.';

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => 'generated-uuid'),
);

describe('getOrCreateCknsMvtCookie', () => {
  let cookieSetterSpy: jest.SpyInstance;

  beforeEach(() => {
    Cookie.remove(CKNS_MVT_COOKIE_NAME);
    cookieSetterSpy = jest.spyOn(Cookie, 'set');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the existing cookie value without setting a new one', () => {
    Cookie.set(CKNS_MVT_COOKIE_NAME, 'existing-uuid');
    cookieSetterSpy.mockClear();

    expect(getOrCreateCknsMvtCookie()).toBe('existing-uuid');
    expect(cookieSetterSpy).not.toHaveBeenCalled();
  });

  it('should create the cookie and return its value when it does not exist', () => {
    expect(getOrCreateCknsMvtCookie()).toBe('generated-uuid');
    expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
    expect(cookieSetterSpy).toHaveBeenCalledWith(
      CKNS_MVT_COOKIE_NAME,
      'generated-uuid',
      expect.objectContaining({ expires: 365 }),
    );
    expect(Cookie.get(CKNS_MVT_COOKIE_NAME)).toBe('generated-uuid');
  });

  it('should only create the cookie once across repeated calls', () => {
    getOrCreateCknsMvtCookie();
    getOrCreateCknsMvtCookie();

    expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
  });

  it('should return null when the cookie cannot be written', () => {
    cookieSetterSpy.mockImplementation(() => undefined);

    expect(getOrCreateCknsMvtCookie()).toBeNull();
  });
});
