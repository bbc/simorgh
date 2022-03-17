import { useRef, useEffect } from 'react';

var useEvent = function useEvent(event, callbackFunction) {
  var cb = useRef(callbackFunction);
  useEffect(function () {
    var callback = cb.current;
    window.addEventListener(event, callback);
    return function () {
      return window.removeEventListener(event, callback);
    };
  }, [cb]);
};

export default useEvent;