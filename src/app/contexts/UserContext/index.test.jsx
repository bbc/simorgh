import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
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

let container;

describe('UserContext', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    getCookiePolicy.mockReturnValue('111');
    personalisationEnabled.mockReturnValue(true);
    jest.clearAllMocks();
  });

  it('should provide cookie values and state function', () => {
    act(() => {
      ReactDOM.render(<DummyComponentWithContext />, container);
    });

    expect(personalisationEnabled).toHaveBeenCalledWith('111');

    expect(React.useContext).toHaveBeenCalledTimes(1);
    expect(React.useContext).toHaveReturnedWith({
      cookiePolicy: '111',
      personalisationEnabled: true,
      updateCookiePolicy: expect.any(Function),
    });
  });
});
