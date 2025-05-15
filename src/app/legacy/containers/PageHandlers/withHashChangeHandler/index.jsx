import React, { memo, useEffect } from 'react';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

import isHashChangeOnSamePath from './isHashChangeOnSamePath';

const useHashChangeHandler = hash => {
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);

      element?.scrollIntoView();
      element?.focus();
    }
  }, [hash]);
};

const getHashProp = path(['location', 'hash']);

const withHashChangeHandler = Component => props => {
  const hash = decodeURIComponent(getHashProp(props));

  useHashChangeHandler(hash);

  return <Component {...props} />;
};

const withMemoization = Component => memo(Component, isHashChangeOnSamePath);

export default pipe(withMemoization, withHashChangeHandler);
