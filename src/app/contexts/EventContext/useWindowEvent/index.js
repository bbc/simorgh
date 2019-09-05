import { useEffect } from 'react';

export const useWindowEvent = (
  event,
  handler,
  passive = false,
  _window = window,
) => {
  useEffect(() => {
    // initiate the event handler
    _window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      _window.removeEventListener(event, handler);
    };
  });
};

export default useWindowEvent;
