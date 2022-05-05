import React from 'react';
import loadable from '@loadable/component';
import isLive from '#lib/utilities/isLive';

const LazyRUM = loadable(() =>
  import(
    /* webpackChunkName: "CloudWatchRUM" */
    './lazy'
  ),
);

const RUMLoader = Component => {
  const withRum = props => {
    const { isAmp } = props;

    const shouldLoadRUM = !isLive() && !isAmp;

    return (
      <>
        {shouldLoadRUM && <LazyRUM />}
        <Component {...props} />
      </>
    );
  };

  return withRum;
};

export default RUMLoader;
