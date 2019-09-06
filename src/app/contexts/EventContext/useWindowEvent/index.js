import { useEffect } from 'react';

export const useWindowEvent = (
  event,
  handler,
  passive = false,
  _window = null,
) => {
  useEffect(() => {
    // initiate the event handler
    (_window || window).addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      (_window || window).removeEventListener(event, handler);
    };
  });
};

export default useWindowEvent;
