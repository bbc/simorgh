import React from 'react';
import Loadable from 'react-loadable';

const createLoadableContext = (Context, loadableConfig) =>
  Loadable({
    ...loadableConfig,
    loading: () => null,
    render(Loaded, { children }) {
      return <Loaded.default>{children}</Loaded.default>;
    },
  });

export default createLoadableContext;
