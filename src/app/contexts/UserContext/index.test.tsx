import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { UserContext, UserContextProvider } from '.';
import { getCookiePolicy, personalisationEnabled } from './cookies';
import * as chartbeat from './Chartbeat';

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

jest.mock('./Chartbeat');

const mockChartbeat = (chartbeat.default as jest.Mock).mockReturnValue(
  'chartbeat',
);

const DummyComponent = () => {
  useContext(UserContext);
  return null;
};

const DummyComponentWithContext = () => (
  <UserContextProvider>
    <DummyComponent />
  </UserContextProvider>
);

describe('UserContext', () => {
  beforeEach(() => {
    (getCookiePolicy as jest.Mock).mockReturnValue('111');
    (personalisationEnabled as jest.Mock).mockReturnValue(true);
    jest.clearAllMocks();
  });

  it('should provide cookie values, state function and render chartbeat', () => {
    render(<DummyComponentWithContext />);

    expect(personalisationEnabled).toHaveBeenCalledWith('111');

    expect(React.useContext).toHaveBeenCalledTimes(1);
    expect(React.useContext).toHaveReturnedWith({
      cookiePolicy: '111',
      personalisationEnabled: true,
      updateCookiePolicy: expect.any(Function),
      sendCanonicalChartbeatBeacon: expect.any(Function),
    });
    expect(mockChartbeat).toHaveBeenCalledTimes(1);
    expect(mockChartbeat).toHaveBeenCalledWith(
      {
        config: null,
      },
      {},
    );
  });
});
