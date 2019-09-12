import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { useWindowEvent } from './useWindowEvent';
import { useHandlerMap } from './useHandlerMap';

export const EventContext = React.createContext({
  useWindowEvent,
  useClickTracker: (selector, handler) => ({ selector, handler }),
});

export const EventContextProvider = ({ children }) => {
  const [handlerMap, setHandlerMap] = useState({});

  const useClickTracker = (selector, handler) => {
    const cleanup = () => {
      setHandlerMap(_map => ({
        ..._map,
        [selector]: (_map[selector] || []).filter(h => h !== handler),
      }));
    };
    useEffect(() => {
      setHandlerMap(_map => ({
        ..._map,
        [selector]: [...(_map[selector] || []), handler],
      }));

      return cleanup;
    }, [children]);
    return cleanup;
  };

  const value = {
    useWindowEvent,
    useClickTracker,
    handlerMap,
  };

  useWindowEvent('click', useHandlerMap(handlerMap));

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

EventContextProvider.propTypes = {
  children: node.isRequired,
};

EventContextProvider.defaultProps = {};

export default EventContextProvider;
