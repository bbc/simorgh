export const useHandlerMap = _map => e => {
  if (e && e.target) {
    const attrs = Object.keys(_map).filter(attr => e.target.matches(attr));

    attrs.forEach(attr => {
      const handlers = _map[attr] || [];
      handlers.forEach(handler => {
        if (typeof handler === 'function') {
          handler(e);
        }
      });
    });
  }
};

export default useHandlerMap;
