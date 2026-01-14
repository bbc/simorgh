/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
// eslint-disable-next-line no-restricted-imports
import createCache from '@emotion/cache';
// eslint-disable-next-line no-restricted-imports
import { CacheProvider } from '@emotion/react';

const PluginCacheProvider = ({ children, container }) => {
  const cacheRef = useRef(null);

  if (!cacheRef.current) {
    const key = 'plugincss';
    const cache = createCache({ key, container });
    cache.compat = true;

    cacheRef.current = cache;
  }

  return <CacheProvider value={cacheRef.current}>{children}</CacheProvider>;
};

// eslint-disable-next-line import/prefer-default-export
export { PluginCacheProvider };
