import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { useWindowEvent } from './useWindowEvent';

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
        setHandlerMap(handlerMap);
      };
    }, []);
  };

  const value = {
    useWindowEvent,
    useClickTracker,
  };

  useWindowEvent('click', e => {
    if (e && e.target) {
      const attrs = Object.keys(handlerMap).filter(attr =>
        e.target.matches(attr),
      );

      attrs.forEach(attr => {
        const handlers = handlerMap[attr] || [];
        handlers.forEach(handler => {
          if (typeof handler === 'function') {
            handler(e);
          }
        });
      });
    }
  });

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

EventContextProvider.propTypes = {
  children: node.isRequired,
};

EventContextProvider.defaultProps = {};
