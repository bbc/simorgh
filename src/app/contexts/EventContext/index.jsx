import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { useWindowEvent } from './useWindowEvent';
import { useHandlerMap } from './useHandlerMap';

export const EventContext = React.createContext({
  useWindowEvent,
  useClickTracker: () => {},
});

export const EventContextProvider = ({ children }) => {
  const [handlerMap, setHandlerMap] = useState({});

  const useClickTracker = (attr, handler) => {
    useEffect(() => {
      setHandlerMap(_map => ({
        ..._map,
        [attr]: [...(_map[attr] || []), handler],
      }));

      return function cleanup() {
        setHandlerMap(_map => ({
          ..._map,
          [attr]: (_map[attr] || []).filter(h => h !== handler),
        }));
      };
    }, []);
  };

  const value = {
    useWindowEvent,
    useClickTracker,
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
