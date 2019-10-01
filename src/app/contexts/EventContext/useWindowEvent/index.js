const useWindowEvent = (event, handler, passive = false) => () => {
  window.addEventListener(event, handler, passive);
  const cleanup = () => {
    window.removeEventListener(event, handler, passive);
  };
  return cleanup;
};

export default useWindowEvent;
