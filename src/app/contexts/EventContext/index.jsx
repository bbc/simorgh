import React, { useState, useEffect, useRef } from 'react';
import { node } from 'prop-types';
import useWindowEvent from './useWindowEvent';
import useHandlerMap from './useHandlerMap';

export const EventContext = React.createContext({
  useWindowEvent,
  useClickTracker: (selector, handler) => ({ selector, handler }),
});

export const EventContextProvider = ({ children }) => {
  const [handlerMap, setHandlerMap] = useState({});

  const useClickTracker = (selector, handler) => {
    const selectorRef = useRef(selector).current;
    const handlerRef = useRef(handler).current;
    useEffect(() => {
      setHandlerMap((_map) => ({
        ..._map,
        [selectorRef]: [...(_map[selectorRef] || []), handlerRef],
      }));

      return () => {
        setHandlerMap((_map) => ({
          ..._map,
          [selectorRef]: (_map[selectorRef] || []).filter(
            (h) => h !== handlerRef,
          ),
        }));
      };
    }, [selectorRef, handlerRef]);
  };

  const value = {
    useWindowEvent,
    useClickTracker,
    handlerMap,
  };

  useEffect(useWindowEvent('click', useHandlerMap(handlerMap)));

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

EventContextProvider.propTypes = {
  children: node.isRequired,
};

EventContextProvider.defaultProps = {};

export default EventContextProvider;
