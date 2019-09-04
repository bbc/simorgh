import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { useWindowEvent } from './useWindowEvent';
import { useHandlerMap } from './useHandlerMap';

const { EventContextProvider, EventContext } = require('./index');

const Component = () => {
  useContext(EventContext);
  return null;
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

jest.mock('./useWindowEvent');
jest.mock('./useHandlerMap');

describe('EventContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call hooks', () => {
    render(
      <EventContextProvider>
        <Component />
      </EventContextProvider>,
    );

    expect(useWindowEvent).toHaveBeenCalled();

    expect(useHandlerMap).toHaveBeenCalled();

    expect(React.useContext).toHaveBeenCalled();
  });
});
