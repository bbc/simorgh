/**
 * Will store mappings between query selectors and event handler functions
 * @param {object} _map a datastore for mapping query selectors to array of event handler functions
 */
const useHandlerMap = (_map) => (e) => {
  if (e && e.target) {
    const attrs = Object.keys(_map).filter((attr) => e.target.matches(attr));

    attrs.forEach((attr) => {
      const handlers = _map[attr] || [];
      handlers.forEach((handler) => {
        if (typeof handler === 'function') {
          handler(e);
        }
      });
    });
  }
};

export default useHandlerMap;
