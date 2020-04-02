import React from 'react';
import { render } from '@testing-library/react';
import { func } from 'prop-types';
import * as useWindowEvent from './useWindowEvent';
import * as useHandlerMap from './useHandlerMap';

const useContextSpy = jest.spyOn(React, 'useContext');
const useStateSpy = jest.spyOn(React, 'useState');
const useEffectSpy = jest.spyOn(React, 'useEffect');
const useWindowEventSpy = jest.spyOn(useWindowEvent, 'default');
const useHandlerMapSpy = jest.spyOn(useHandlerMap, 'default');

const { EventContextProvider, EventContext } = require('./index');

const Component = () => {
  React.useContext(EventContext);
  return null;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('EventContext', () => {
  it('should call hooks', () => {
    render(
      <EventContextProvider>
        <Component />
      </EventContextProvider>,
    );

    expect(useWindowEventSpy).toHaveBeenCalled();

    expect(useHandlerMapSpy).toHaveBeenCalled();

    expect(useContextSpy).toHaveBeenCalledWith(EventContext);

    expect(useStateSpy).toHaveBeenCalledWith({});
  });

  describe('useClickTracker', () => {
    const ClickComponent = ({ handler }) => {
      const { useClickTracker, handlerMap } = React.useContext(EventContext);
      useClickTracker('my-test-component', handler);
      return (
        <ul>
          {Object.entries(handlerMap).map(([key, values]) => (
            <li key={key}>
              {key}:{values.map((v) => v.toString()).join('\n')}
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

      expect(useEffectSpy).toHaveBeenCalled();
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

      window.matches = (selector) => ['my-test-component'].includes(selector);
      window.dispatchEvent(new Event('click'));

      expect(useEffectSpy).toHaveBeenCalled();
      expect(container).toMatchSnapshot();
      expect(handler).toHaveBeenCalled();
    });
  });
});
