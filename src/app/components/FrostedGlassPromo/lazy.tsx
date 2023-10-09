import React from 'react';
import loadable from '@loadable/component';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "frosted_promo" */
      '.'
    ),
  { fallback: <span data-testid="frosted-promo-loader" /> },
);
