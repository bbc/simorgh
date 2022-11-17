import Cookie from 'js-cookie';
import getOptimizelyUserId from './index';

describe('getOptimizelyUserId', () => {
  const cookieSetterSpy = jest.spyOn(Cookie, 'set');

  afterEach(() => {
    jest.clearAllMocks();
    Cookie.remove('ckns_mvt');
  });

  it('should return the optimizely user id if the cookie exists', () => {
    Cookie.set('ckns_mvt', 'random-uuid');

    const optimizelyUserId = getOptimizelyUserId();

    expect(optimizelyUserId).toEqual('random-uuid');
  });

  it('should create and return optimizely user id if it does not exist', () => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const optimizelyUserId = getOptimizelyUserId();
    const [[cookieName, cookieValue, cookieOptions]] =
      cookieSetterSpy.mock.calls;

    expect(optimizelyUserId).toMatch(uuidRegex);
    expect(cookieName).toEqual('ckns_mvt');
    expect(cookieValue).toEqual(optimizelyUserId);
    expect(cookieOptions).toEqual({ expires: 365, path: '/', secure: true });
    expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
  });
});
