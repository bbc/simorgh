import React, { useContext, useEffect, useState } from 'react';
import { render, act } from '@testing-library/react';
import { func } from 'prop-types';
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
    useState: jest.fn().mockImplementation(original.useState),
    useEffect: jest.fn().mockImplementation(original.useEffect),
  };
});

jest.mock('./useWindowEvent', () => {
  const { useWindowEvent: _useWindowEvent } = jest.requireActual(
    './useWindowEvent',
  );
  return {
    useWindowEvent: jest.fn().mockImplementation(_useWindowEvent),
  };
});
jest.mock('./useHandlerMap', () => {
  const { useHandlerMap: _useHandlerMap } = jest.requireActual(
    './useHandlerMap',
  );
  return {
    useHandlerMap: jest.fn().mockImplementation(_useHandlerMap),
  };
});

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

  it('should useState', () => {
    render(
      <EventContextProvider>
        <Component />
      </EventContextProvider>,
    );

    expect(useState).toHaveBeenCalled();
  });

  describe('useClickTracker', () => {
    const ClickComponent = ({ handler }) => {
      const { useClickTracker, handlerMap } = useContext(EventContext);
      useClickTracker('my-test-component', handler);
      return (
        <ul>
          {Object.entries(handlerMap).map(([key, values]) => (
            <li key={key}>
              {key}:{values.map(v => v.toString()).join('\n')}
            </li>
          ))}
        </ul>
      );
    };

    ClickComponent.propTypes = {
      handler: func.isRequired,
    };

    it('should useEffect and match snapshot', () => {
      const handler = jest.fn();
      const { container } = render(
        <EventContextProvider>
          <ClickComponent handler={handler} />
        </EventContextProvider>,
      );

      expect(useEffect).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should call handler', () => {
      const handler = jest.fn();
      const { container } = render(
        <EventContextProvider>
          <ClickComponent handler={handler} />
        </EventContextProvider>,
      );

      window.matches = selector => ['my-test-component'].includes(selector);
      window.dispatchEvent(new Event('click'));

      expect(useEffect).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
      expect(handler).toHaveBeenCalled();
    });

    describe('cleanup()', () => {
      let jestHandlerMap = {};
      let jestCleanup = () => {};
      const ClickCleanupComponent = ({ handler }) => {
        const { useClickTracker, handlerMap } = useContext(EventContext);
        const cleanup = useClickTracker('my-test-component', handler);
        jestCleanup = cleanup;
        jestHandlerMap = handlerMap;
        return (
          <ul>
            {Object.entries(handlerMap).map(([key, values]) => (
              <li key={key}>
                {key}:{values.map(v => v.toString()).join('\n')}
              </li>
            ))}
          </ul>
        );
      };

      ClickCleanupComponent.propTypes = {
        handler: func.isRequired,
      };

      it('should cleanup', () => {
        const handler = jest.fn();
        render(
          <EventContextProvider>
            <ClickCleanupComponent handler={handler} />
          </EventContextProvider>,
        );

        expect(jestHandlerMap).toEqual({
          'my-test-component': [handler],
        });

        act(() => jestCleanup());

        expect(jestHandlerMap).toEqual({
          'my-test-component': [],
        });
      });
    });
  });
});
