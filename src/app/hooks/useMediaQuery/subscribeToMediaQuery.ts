type MediaQueryHandler = (event: MediaQueryList | MediaQueryListEvent) => void;

/**
 * Subscribes to a MediaQueryList's `change` event, falling back to the
 * older `addListener`/`removeListener` pair on browsers (and test
 * environments) that don't support `addEventListener` on it. Returns a
 * function that removes the subscription again.
 */
const subscribeToMediaQuery = (
  mediaQueryList: MediaQueryList,
  handler: MediaQueryHandler,
) => {
  if (mediaQueryList.addEventListener) {
    mediaQueryList.addEventListener('change', handler);
  } else {
    mediaQueryList.addListener(handler);
  }

  return () => {
    if (mediaQueryList.removeEventListener) {
      mediaQueryList.removeEventListener('change', handler);
    } else {
      mediaQueryList.removeListener(handler);
    }
  };
};

export default subscribeToMediaQuery;
