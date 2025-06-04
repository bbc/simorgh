import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import Cookie from 'js-cookie';
import * as onClient from '#app/lib/utilities/onClient';
import * as isOperaProxy from '#app/lib/utilities/isOperaProxy';
import setCookie from '#app/lib/utilities/setCookie';
import { UserContext, UserContextProvider } from '.';
import { getCookiePolicy, personalisationEnabled } from './cookies';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

jest.mock('./cookies', () => ({
  getCookiePolicy: jest.fn(),
  personalisationEnabled: jest.fn(),
}));

const DummyComponent = () => {
  useContext(UserContext);
  return null;
};

const DummyComponentWithContext = () => (
  <UserContextProvider>
    <DummyComponent />
  </UserContextProvider>
);

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => '12345678-abcd-1fed-0123-a1b2c3d4e5f6'),
);

describe('UserContext', () => {
  beforeEach(() => {
    (getCookiePolicy as jest.Mock).mockReturnValue('111');
    (personalisationEnabled as jest.Mock).mockReturnValue(true);
    jest.clearAllMocks();
  });

  it('should provide cookie values and state function', () => {
    render(<DummyComponentWithContext />);

    expect(personalisationEnabled).toHaveBeenCalledWith('111');

    expect(React.useContext).toHaveBeenCalledTimes(1);
    expect(React.useContext).toHaveReturnedWith({
      cookiePolicy: '111',
      personalisationEnabled: true,
      updateCookiePolicy: expect.any(Function),
    });
  });

  describe('ckns_mvt cookie', () => {
    const cookieSetterSpy = jest.spyOn(Cookie, 'set');
    const cookieGetterSpy = jest.spyOn(Cookie, 'get');
    const isOperaProxySpy = jest.spyOn(isOperaProxy, 'default');
    const onClientSpy = jest.spyOn(onClient, 'default');

    beforeEach(() => {
      jest.clearAllMocks();
      Cookie.remove('ckns_mvt');
    });

    it('should call cookie logic when not opera mini and is on client', () => {
      onClientSpy.mockImplementationOnce(() => true as unknown as Location);
      isOperaProxySpy.mockImplementationOnce(() => false);

      render(<DummyComponentWithContext />);

      expect(cookieGetterSpy).toHaveBeenCalled();
    });

    it('should not call cookie logic when on opera mini and is on client', () => {
      onClientSpy.mockImplementationOnce(() => true as unknown as Location);
      isOperaProxySpy.mockImplementationOnce(() => true);

      render(<DummyComponentWithContext />);

      expect(cookieGetterSpy).not.toHaveBeenCalled();
    });

    it('should not call cookie logic when not on opera mini and is not on client', () => {
      onClientSpy.mockImplementationOnce(() => false);
      isOperaProxySpy.mockImplementationOnce(() => false);

      render(<DummyComponentWithContext />);

      expect(cookieGetterSpy).not.toHaveBeenCalled();
    });

    it('should not set cookie when ckns_mvt cookie already exists', () => {
      onClientSpy.mockImplementationOnce(() => true as unknown as Location);
      isOperaProxySpy.mockImplementationOnce(() => false);
      setCookie({ name: 'ckns_mvt', value: 'foo' });
      cookieSetterSpy.mockClear();

      render(<DummyComponentWithContext />);

      expect(cookieGetterSpy).toHaveReturnedWith('foo');
      expect(cookieSetterSpy).not.toHaveBeenCalled();
    });

    it('should set cookie when no ckns_mvt cookie exists', () => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      onClientSpy.mockImplementationOnce(() => true as unknown as Location);
      isOperaProxySpy.mockImplementationOnce(() => false);
      // @ts-expect-error This should be able to be mocked as a string or undefined
      cookieGetterSpy.mockImplementationOnce(() => undefined);

      render(<DummyComponentWithContext />);

      const [[cookieName, cookieValue, cookieOptions]] =
        cookieSetterSpy.mock.calls;

      expect(cookieValue).toMatch(uuidRegex);
      expect(cookieName).toEqual('ckns_mvt');
      expect(cookieOptions).toEqual({
        expires: 365,
        domain: 'localhost',
        sameSite: 'Lax',
      });
      expect(cookieSetterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
