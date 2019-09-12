import React from 'react';
import Loadable from 'react-loadable';

const createLoadableContext = (Context, loadableConfig) =>
  Loadable({
    ...loadableConfig,
    loading: () => null,
    render(loaded, { children, configKey }) {
      const value = configKey ? loaded.default[configKey] : loaded.default;

      return <Context.Provider value={value}>{children}</Context.Provider>;
    },
  });

export default createLoadableContext;
